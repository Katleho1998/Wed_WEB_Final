/*
  # Wedding Photos Upload System

  1. New Tables
    - `wedding_photos`
      - `id` (uuid, primary key)
      - `file_name` (text, original filename)
      - `file_path` (text, storage path)
      - `file_size` (bigint, file size in bytes)
      - `mime_type` (text, file MIME type)
      - `uploaded_by_name` (text, uploader's name)
      - `uploaded_by_email` (text, uploader's email)
      - `caption` (text, optional photo caption)
      - `is_approved` (boolean, moderation status)
      - `uploaded_at` (timestamp)
      - `approved_at` (timestamp, when approved)

  2. Security
    - Enable RLS on `wedding_photos` table
    - Add policies for public read access to approved photos
    - Add policies for public photo uploads
    - Add policies for admin approval workflow

  3. Storage
    - Create storage bucket for wedding photos
    - Set up appropriate storage policies
*/

-- Create wedding_photos table if it doesn't exist
CREATE TABLE IF NOT EXISTS wedding_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  file_path text NOT NULL UNIQUE,
  file_size bigint NOT NULL,
  mime_type text NOT NULL,
  uploaded_by_name text NOT NULL,
  uploaded_by_email text NOT NULL,
  caption text,
  is_approved boolean DEFAULT false,
  uploaded_at timestamptz DEFAULT now(),
  approved_at timestamptz,
  
  -- Constraints
  CONSTRAINT valid_file_size CHECK (file_size > 0 AND file_size <= 10485760), -- 10MB max
  CONSTRAINT valid_mime_type CHECK (mime_type IN ('image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic')),
  CONSTRAINT valid_email CHECK (uploaded_by_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Enable Row Level Security
ALTER TABLE wedding_photos ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can view approved photos" ON wedding_photos;
  DROP POLICY IF EXISTS "Anyone can upload photos" ON wedding_photos;
  DROP POLICY IF EXISTS "Service role can manage all photos" ON wedding_photos;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Policy: Anyone can view approved photos
CREATE POLICY "Anyone can view approved photos"
  ON wedding_photos
  FOR SELECT
  TO public
  USING (is_approved = true);

-- Policy: Anyone can upload photos (for guest uploads)
CREATE POLICY "Anyone can upload photos"
  ON wedding_photos
  FOR INSERT
  TO public
  WITH CHECK (
    file_name IS NOT NULL AND
    file_path IS NOT NULL AND
    uploaded_by_name IS NOT NULL AND
    uploaded_by_email IS NOT NULL AND
    file_size > 0 AND
    file_size <= 10485760 AND
    mime_type IN ('image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic')
  );

-- Policy: Only service role can approve photos (for admin moderation)
CREATE POLICY "Service role can manage all photos"
  ON wedding_photos
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create storage bucket for wedding photos if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'wedding-photos',
  'wedding-photos',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic']
) ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist to avoid conflicts
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can upload wedding photos" ON storage.objects;
  DROP POLICY IF EXISTS "Anyone can view wedding photos" ON storage.objects;
  DROP POLICY IF EXISTS "Service role can manage wedding photos" ON storage.objects;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Storage policy: Anyone can upload to wedding-photos bucket
CREATE POLICY "Anyone can upload wedding photos"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (
    bucket_id = 'wedding-photos' AND
    (storage.foldername(name))[1] = 'uploads'
  );

-- Storage policy: Anyone can view wedding photos
CREATE POLICY "Anyone can view wedding photos"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'wedding-photos');

-- Storage policy: Service role can manage all wedding photos
CREATE POLICY "Service role can manage wedding photos"
  ON storage.objects
  FOR ALL
  TO service_role
  USING (bucket_id = 'wedding-photos');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_wedding_photos_approved ON wedding_photos(is_approved, uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_wedding_photos_uploader ON wedding_photos(uploaded_by_email);
CREATE INDEX IF NOT EXISTS idx_wedding_photos_upload_date ON wedding_photos(uploaded_at DESC);

-- Create a function to automatically set approved_at when is_approved is set to true
CREATE OR REPLACE FUNCTION set_approved_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_approved = true AND OLD.is_approved = false THEN
    NEW.approved_at = now();
  ELSIF NEW.is_approved = false THEN
    NEW.approved_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically set approved_at
DROP TRIGGER IF EXISTS trigger_set_approved_at ON wedding_photos;
CREATE TRIGGER trigger_set_approved_at
  BEFORE UPDATE ON wedding_photos
  FOR EACH ROW
  EXECUTE FUNCTION set_approved_at();
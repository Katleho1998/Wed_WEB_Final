/*
  # Add RLS policy for RSVP submissions

  1. Security Changes
    - Add policy to allow public users to insert RSVP records
    - Ensures anyone can submit an RSVP without authentication
    - Maintains data integrity with validation constraints

  This migration resolves the RLS policy violation error that prevents
  users from submitting their RSVPs through the wedding website.
*/

-- Allow public users to insert RSVP records
CREATE POLICY "Allow public RSVP submissions"
  ON rsvps
  FOR INSERT
  TO anon
  WITH CHECK (
    name IS NOT NULL AND 
    email IS NOT NULL AND 
    attending IS NOT NULL
  );
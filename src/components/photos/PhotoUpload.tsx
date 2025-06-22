import React, { useState, useCallback } from 'react';
import { Upload, X, Camera, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';
import { useToastContext } from '../../context/ToastContext';

interface PhotoUploadProps {
  onUploadSuccess?: () => void;
}

interface UploadingFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

const MAX_FILES_PER_UPLOAD = 30;

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onUploadSuccess }) => {
  const { showError, showInfo } = useToastContext();
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'];

    if (!allowedTypes.includes(file.type)) {
      return 'Please upload only JPEG, PNG, WebP, or HEIC images.';
    }

    if (file.size > maxSize) {
      return 'File size must be less than 10MB.';
    }

    return null;
  };

  const uploadFile = async (file: File, uploadId: string) => {
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Update progress
      setUploadingFiles(prev => 
        prev.map(f => f.id === uploadId ? { ...f, progress: 25 } : f)
      );

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('wedding-photos')
        .upload(filePath, file);

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Update progress
      setUploadingFiles(prev => 
        prev.map(f => f.id === uploadId ? { ...f, progress: 75 } : f)
      );

      // Save metadata to database with anonymous user info
      const { error: dbError } = await supabase
        .from('wedding_photos')
        .insert({
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
          uploaded_by_name: 'Anonymous Guest',
          uploaded_by_email: 'anonymous@wedding.guest',
        });

      if (dbError) {
        // If database insert fails, try to clean up the uploaded file
        await supabase.storage.from('wedding-photos').remove([filePath]);
        throw new Error(`Database error: ${dbError.message}`);
      }

      // Success
      setUploadingFiles(prev => 
        prev.map(f => f.id === uploadId ? { ...f, progress: 100, status: 'success' } : f)
      );

      // Remove from list after a delay
      setTimeout(() => {
        setUploadingFiles(prev => prev.filter(f => f.id !== uploadId));
      }, 2000);

      onUploadSuccess?.();

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setUploadingFiles(prev => 
        prev.map(f => f.id === uploadId ? { ...f, status: 'error', error: errorMessage } : f)
      );
    }
  };

  const handleFiles = useCallback((files: FileList) => {
    // Check if too many files are being uploaded
    if (files.length > MAX_FILES_PER_UPLOAD) {
      showError(`You can only upload up to ${MAX_FILES_PER_UPLOAD} photos at a time. Please select fewer files.`);
      return;
    }

    // Check if there are already files uploading
    const currentUploading = uploadingFiles.filter(f => f.status === 'uploading').length;
    if (currentUploading + files.length > MAX_FILES_PER_UPLOAD) {
      showError(`You can only upload up to ${MAX_FILES_PER_UPLOAD} photos at a time. Please wait for current uploads to finish or select fewer files.`);
      return;
    }

    const validFiles: File[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const error = validateFile(file);
      
      if (error) {
        showError(`${file.name}: ${error}`);
        continue;
      }
      
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // Show info about upload
    if (validFiles.length > 1) {
      showInfo(`Uploading ${validFiles.length} photos. Please wait for all uploads to complete.`);
    }

    // Add files to uploading list
    const newUploadingFiles: UploadingFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substring(2),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'uploading' as const,
    }));

    setUploadingFiles(prev => [...prev, ...newUploadingFiles]);

    // Start uploads
    newUploadingFiles.forEach(({ id, file }) => {
      uploadFile(file, id);
    });
  }, [showError, showInfo, onUploadSuccess, uploadingFiles]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    // Reset input
    e.target.value = '';
  }, [handleFiles]);

  const removeUploadingFile = (id: string) => {
    setUploadingFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const currentUploadingCount = uploadingFiles.filter(f => f.status === 'uploading').length;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blush-100 shadow-xl">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blush-400 to-blush-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-serif text-2xl text-sage-800 font-bold mb-2">Share Your Photos</h3>
        <p className="text-sage-600 mb-4">Upload your favorite moments from our special day</p>
        
        {/* Information Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <h4 className="font-semibold text-blue-800 text-sm mb-1">Photo Upload Information</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• You can upload up to <strong>{MAX_FILES_PER_UPLOAD} photos at a time</strong></li>
                <li>• Photos will be reviewed before appearing in the gallery</li>
                <li>• Supported formats: JPEG, PNG, WebP, HEIC (max 10MB each)</li>
                <li>• Help us capture every magical moment from our celebration!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-blush-400 bg-blush-50' 
            : 'border-sage-300 hover:border-blush-300 hover:bg-blush-25'
          }
          ${currentUploadingCount >= MAX_FILES_PER_UPLOAD ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <input
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp,image/heic"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={currentUploadingCount >= MAX_FILES_PER_UPLOAD}
        />
        
        <Upload className="w-12 h-12 text-sage-400 mx-auto mb-4" />
        <h4 className="text-lg font-semibold text-sage-700 mb-2">
          {currentUploadingCount >= MAX_FILES_PER_UPLOAD 
            ? 'Please wait for current uploads to finish'
            : 'Drop photos here or click to browse'
          }
        </h4>
        <p className="text-sage-500 text-sm mb-2">
          Supports JPEG, PNG, WebP, and HEIC files up to 10MB each
        </p>
        <p className="text-blush-600 text-sm font-medium">
          Upload limit: {MAX_FILES_PER_UPLOAD} photos at a time
        </p>
      </div>

      {/* Upload Progress Info */}
      {currentUploadingCount > 0 && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blush-50 text-blush-700 px-4 py-2 rounded-full text-sm">
            <div className="w-4 h-4 border-2 border-blush-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Uploading {currentUploadingCount} photo{currentUploadingCount !== 1 ? 's' : ''}...</span>
          </div>
        </div>
      )}

      {/* Uploading Files */}
      {uploadingFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sage-700">Upload Progress</h4>
            <span className="text-sm text-sage-500">
              {uploadingFiles.filter(f => f.status === 'success').length} of {uploadingFiles.length} completed
            </span>
          </div>
          
          <div className="max-h-64 overflow-y-auto space-y-2">
            {uploadingFiles.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-3 bg-sage-50 rounded-xl">
                <img
                  src={file.preview}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sage-700 truncate">
                    {file.file.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {file.status === 'uploading' && (
                      <>
                        <div className="flex-1 bg-sage-200 rounded-full h-2">
                          <div
                            className="bg-blush-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-sage-500">{file.progress}%</span>
                      </>
                    )}
                    
                    {file.status === 'success' && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs">Uploaded successfully</span>
                      </div>
                    )}
                    
                    {file.status === 'error' && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs">{file.error}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => removeUploadingFile(file.id)}
                  className="p-1 text-sage-400 hover:text-sage-600 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-xs text-sage-500">
          Photos will be reviewed before appearing in the gallery. Thank you for sharing your memories!
        </p>
      </div>
    </div>
  );
};

export default PhotoUpload;
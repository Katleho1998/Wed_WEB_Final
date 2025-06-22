import React, { useState, useCallback, useRef } from 'react';
import { Upload, X, Camera, CheckCircle, AlertCircle, Eye, Upload as UploadIcon } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';
import { useToastContext } from '../../context/ToastContext';

interface PhotoUploadProps {
  onUploadSuccess?: () => void;
}

interface SelectedFile {
  id: string;
  file: File;
  preview: string;
  error?: string;
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
  const { showError } = useToastContext();
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    // Check if adding these files would exceed the limit
    const currentUploadingCount = uploadingFiles.filter(f => f.status === 'uploading').length;
    const totalFilesAfterUpload = currentUploadingCount + selectedFiles.length + files.length;
    
    if (totalFilesAfterUpload > MAX_FILES_PER_UPLOAD) {
      showError(`You can only select up to ${MAX_FILES_PER_UPLOAD} photos at a time. You have ${selectedFiles.length} selected and ${currentUploadingCount} uploading. You can only add ${MAX_FILES_PER_UPLOAD - selectedFiles.length - currentUploadingCount} more.`);
      return;
    }

    const newSelectedFiles: SelectedFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const error = validateFile(file);
      
      // Check if file is already selected
      const isDuplicate = selectedFiles.some(sf => 
        sf.file.name === file.name && sf.file.size === file.size
      );
      
      if (isDuplicate) {
        showError(`${file.name} is already selected`);
        continue;
      }
      
      const selectedFile: SelectedFile = {
        id: Math.random().toString(36).substring(2),
        file,
        preview: URL.createObjectURL(file),
        error: error || undefined,
      };
      
      newSelectedFiles.push(selectedFile);
    }

    if (newSelectedFiles.length === 0) return;

    setSelectedFiles(prev => [...prev, ...newSelectedFiles]);
    setShowPreview(true);
  }, [showError, selectedFiles, uploadingFiles]);

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

  const removeSelectedFile = (id: string) => {
    setSelectedFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const removeUploadingFile = (id: string) => {
    setUploadingFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const confirmUpload = () => {
    const validFiles = selectedFiles.filter(f => !f.error);
    
    if (validFiles.length === 0) {
      showError('No valid files to upload');
      return;
    }

    // Move selected files to uploading
    const newUploadingFiles: UploadingFile[] = validFiles.map(file => ({
      id: file.id,
      file: file.file,
      preview: file.preview,
      progress: 0,
      status: 'uploading' as const,
    }));

    setUploadingFiles(prev => [...prev, ...newUploadingFiles]);
    
    // Clear selected files
    selectedFiles.forEach(file => {
      if (!validFiles.find(vf => vf.id === file.id)) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setSelectedFiles([]);
    setShowPreview(false);

    // Start uploads
    newUploadingFiles.forEach(({ id, file }) => {
      uploadFile(file, id);
    });
  };

  const cancelSelection = () => {
    selectedFiles.forEach(file => {
      URL.revokeObjectURL(file.preview);
    });
    setSelectedFiles([]);
    setShowPreview(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const currentUploadingCount = uploadingFiles.filter(f => f.status === 'uploading').length;
  const remainingSlots = MAX_FILES_PER_UPLOAD - currentUploadingCount - selectedFiles.length;
  const validSelectedFiles = selectedFiles.filter(f => !f.error);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blush-100 shadow-xl">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blush-400 to-blush-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-serif text-2xl text-sage-800 font-bold mb-2">Share Your Photos</h3>
        <p className="text-sage-600">Upload your favorite moments from our special day</p>
        {(currentUploadingCount > 0 || selectedFiles.length > 0) && (
          <p className="text-sm text-blush-600 mt-2">
            {selectedFiles.length > 0 && `${selectedFiles.length} selected • `}
            {currentUploadingCount > 0 && `${currentUploadingCount} uploading • `}
            {remainingSlots > 0 
              ? `${remainingSlots} slots remaining`
              : 'Upload limit reached'
            }
          </p>
        )}
      </div>

      {/* Hidden file input for direct access */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/jpg,image/png,image/webp,image/heic"
        onChange={handleFileInput}
        disabled={remainingSlots === 0}
        className="hidden"
      />

      {/* Upload Area - Only show if not in preview mode */}
      {!showPreview && (
        <div
          className={`
            relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
            ${remainingSlots === 0 
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed opacity-50' 
              : isDragOver 
                ? 'border-blush-400 bg-blush-50' 
                : 'border-sage-300 hover:border-blush-300 hover:bg-blush-25'
            }
          `}
          onDrop={remainingSlots > 0 ? handleDrop : undefined}
          onDragOver={(e) => {
            e.preventDefault();
            if (remainingSlots > 0) {
              setIsDragOver(true);
            }
          }}
          onDragLeave={() => setIsDragOver(false)}
        >
          <input
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp,image/heic"
            onChange={handleFileInput}
            disabled={remainingSlots === 0}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          
          <Upload className={`w-12 h-12 mx-auto mb-4 ${remainingSlots === 0 ? 'text-gray-400' : 'text-sage-400'}`} />
          <h4 className={`text-lg font-semibold mb-2 ${remainingSlots === 0 ? 'text-gray-500' : 'text-sage-700'}`}>
            {remainingSlots === 0 
              ? 'Upload limit reached - please wait for current uploads to complete'
              : 'Drop photos here or click to browse'
            }
          </h4>
          <p className={`text-sm ${remainingSlots === 0 ? 'text-gray-400' : 'text-sage-500'}`}>
            Supports JPEG, PNG, WebP, and HEIC files up to 10MB each
            <br />
            <span className="font-medium">Maximum {MAX_FILES_PER_UPLOAD} photos per upload session</span>
          </p>
        </div>
      )}

      {/* Photo Preview Section */}
      {showPreview && selectedFiles.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-sage-600" />
              <h4 className="font-semibold text-sage-700">
                Review Your Photos ({selectedFiles.length} selected)
              </h4>
            </div>
            <div className="text-sm text-sage-500">
              {validSelectedFiles.length} valid • {selectedFiles.length - validSelectedFiles.length} with errors
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-96 overflow-y-auto p-2">
            {selectedFiles.map((file) => (
              <div key={file.id} className="relative group">
                <div className={`
                  relative rounded-lg overflow-hidden border-2 transition-all duration-200
                  ${file.error 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-sage-200 hover:border-blush-300'
                  }
                `}>
                  <div className="aspect-square">
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Remove button */}
                  <button
                    onClick={() => removeSelectedFile(file.id)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  
                  {/* Error indicator */}
                  {file.error && (
                    <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                  )}
                </div>
                
                {/* File info */}
                <div className="mt-1 text-xs">
                  <p className="truncate text-sage-600" title={file.file.name}>
                    {file.file.name}
                  </p>
                  {file.error && (
                    <p className="text-red-600 text-xs mt-1">{file.error}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 justify-center pt-4 border-t border-sage-200">
            <button
              onClick={cancelSelection}
              className="px-6 py-2 border border-sage-300 text-sage-700 rounded-xl hover:bg-sage-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={triggerFileInput}
              disabled={remainingSlots === 0}
              className="px-6 py-2 border border-blush-300 text-blush-700 rounded-xl hover:bg-blush-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add More Photos
            </button>
            <button
              onClick={confirmUpload}
              disabled={validSelectedFiles.length === 0}
              className="px-6 py-2 bg-[#555c78] text-white rounded-xl hover:bg-[#4a5068] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <UploadIcon className="w-4 h-4" />
              Upload {validSelectedFiles.length} Photo{validSelectedFiles.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}

      {/* Uploading Files */}
      {uploadingFiles.length > 0 && (
        <div className={`${showPreview ? 'mt-8 pt-8 border-t border-sage-200' : 'mt-6'} space-y-3`}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sage-700">Uploading Photos</h4>
            <span className="text-sm text-sage-500">
              {uploadingFiles.filter(f => f.status === 'success').length} of {uploadingFiles.length} completed
            </span>
          </div>
          <div className="max-h-64 overflow-y-auto space-y-3">
            {uploadingFiles.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-3 bg-sage-50 rounded-xl">
                <img
                  src={file.preview}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded-lg"
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
                  className="p-1 text-sage-400 hover:text-sage-600 transition-colors"
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
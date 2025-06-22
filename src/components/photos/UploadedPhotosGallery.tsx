import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useToastContext } from '../../context/ToastContext';
import { Eye, Calendar, User } from 'lucide-react';

interface UploadedPhoto {
  id: string;
  file_name: string;
  file_path: string;
  uploaded_by_name: string;
  uploaded_at: string;
  caption?: string;
}

const UploadedPhotosGallery: React.FC = () => {
  const { showError } = useToastContext();
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<UploadedPhoto | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('wedding_photos')
        .select('*')
        .eq('is_approved', true)
        .order('uploaded_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
      showError('Failed to load uploaded photos');
    } finally {
      setLoading(false);
    }
  };

  const getPhotoUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('wedding-photos')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blush-500"></div>
        <p className="mt-4 text-sage-600">Loading uploaded photos...</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <Eye className="w-16 h-16 text-sage-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-sage-600 mb-2">No Photos Yet</h3>
        <p className="text-sage-500">
          Be the first to share your wedding memories! Upload photos above to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={getPhotoUrl(photo.file_path)}
                alt={photo.file_name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            
            {/* Overlay with info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-2 text-sm mb-1">
                  <User className="w-4 h-4" />
                  <span className="truncate">{photo.uploaded_by_name}</span>
                </div>
                <div className="flex items-center gap-2 text-xs opacity-80">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(photo.uploaded_at)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getPhotoUrl(selectedPhoto.file_path)}
              alt={selectedPhoto.file_name}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-sage-800 text-lg">
                    {selectedPhoto.file_name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-sage-600 mt-1">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{selectedPhoto.uploaded_by_name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(selectedPhoto.uploaded_at)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="text-sage-400 hover:text-sage-600 transition-colors p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {selectedPhoto.caption && (
                <p className="text-sage-700 bg-sage-50 p-3 rounded-lg">
                  {selectedPhoto.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadedPhotosGallery;
import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { GalleryImage } from '../../types';
// Replace with the correct import or define the type inline if not exported
type GalleryImage = {
  src: string;
  alt: string;
};

interface ImageModalProps {
  image: GalleryImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-2 sm:p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-blush-300 transition-colors duration-300"
        aria-label="Close modal"
      >
        <X size={32} />
      </button>

      {/* Navigation buttons */}
      <button
        onClick={onPrev}
        className="absolute left-4 text-white hover:text-blush-300 transition-colors duration-300"
        aria-label="Previous image"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 text-white hover:text-blush-300 transition-colors duration-300"
        aria-label="Next image"
      >
        <ChevronRight size={40} />
      </button>

      {/* Image */}
      <div className="max-w-full sm:max-w-3xl md:max-w-5xl max-h-[60vh] sm:max-h-[80vh] animate-fadeIn">
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[60vh] sm:max-h-[80vh] object-contain"
        />
        <p className="text-white text-center mt-2 sm:mt-4 text-xs sm:text-sm opacity-80">{image.alt}</p>
      </div>
    </div>
  );
};

export default ImageModal;
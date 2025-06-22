import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

const FloatingUploadButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down a bit (after hero section)
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToUpload = () => {
    const uploadSection = document.getElementById('photo-upload');
    if (uploadSection) {
      uploadSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Add inline styles to ensure maximum z-index */}
      <style jsx>{`
        .floating-upload-btn {
          position: fixed !important;
          bottom: 24px !important;
          right: 24px !important;
          z-index: 999999 !important;
          pointer-events: auto !important;
        }
        
        @media (max-width: 640px) {
          .floating-upload-btn {
            bottom: 20px !important;
            right: 20px !important;
          }
        }
      `}</style>
      
      <div className="floating-upload-btn">
        <button
          onClick={scrollToUpload}
          className="group relative bg-gradient-to-br from-blush-400 to-blush-500 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 animate-pulse"
          style={{
            position: 'relative',
            zIndex: 999999,
            pointerEvents: 'auto',
            background: 'linear-gradient(135deg, #f4a5a5 0%, #e6a4b4 100%)',
            boxShadow: '0 10px 25px rgba(244, 165, 165, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          }}
          aria-label="Upload photos"
        >
          <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-sm" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Share Your Photos
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default FloatingUploadButton;
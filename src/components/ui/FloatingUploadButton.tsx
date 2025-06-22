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
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none">
      <button
        onClick={scrollToUpload}
        className="group pointer-events-auto relative"
        aria-label="Upload photos"
      >
        {/* Main button */}
        <div className="relative">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blush-400 to-blush-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group-hover:scale-110 group-active:scale-95">
            <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          
          {/* Pulse animation */}
          <div className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 bg-blush-400 rounded-full animate-ping opacity-20"></div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Share Your Photos
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default FloatingUploadButton;
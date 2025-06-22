import React from 'react';
import { Camera } from 'lucide-react';

const FloatingUploadButton: React.FC = () => {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('photo-upload');
    if (uploadSection) {
      uploadSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {/* Add inline styles for circular text animation and positioning */}
      <style jsx>{`
        .floating-upload-btn {
          position: fixed !important;
          bottom: 24px !important;
          right: 24px !important;
          z-index: 999999 !important;
          pointer-events: auto !important;
        }
        
        .circular-text {
          animation: rotate 20s linear infinite;
          transform-origin: center;
        }
        
        .circular-text text {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          fill: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @media (max-width: 640px) {
          .floating-upload-btn {
            bottom: 20px !important;
            right: 20px !important;
          }
          
          .circular-text text {
            font-size: 9px;
            letter-spacing: 1.5px;
          }
        }
        
        .button-inner {
          position: relative;
          z-index: 2;
        }
        
        .button-bg {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #555c78;
          z-index: 1;
        }
      `}</style>
      
      <div className="floating-upload-btn">
        <button
          onClick={scrollToUpload}
          className="group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
          style={{
            position: 'relative',
            zIndex: 999999,
            pointerEvents: 'auto',
            background: 'transparent',
            boxShadow: '0 10px 25px rgba(85, 92, 120, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          }}
          aria-label="Upload your images"
        >
          {/* Background circle */}
          <div className="button-bg"></div>
          
          {/* Circular Text */}
          <svg 
            className="circular-text absolute inset-0 w-full h-full" 
            viewBox="0 0 100 100"
            style={{ zIndex: 1 }}
          >
            <defs>
              <path
                id="circle-path"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              />
            </defs>
            <text>
              <textPath href="#circle-path" startOffset="0%">
                UPLOAD YOUR IMAGES • SHARE MEMORIES • 
              </textPath>
            </text>
          </svg>
          
          {/* Camera Icon */}
          <div className="button-inner">
            <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
          </div>
          
          {/* Tooltip - Hidden on mobile since text is now visible */}
          <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Click to upload photos
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default FloatingUploadButton;
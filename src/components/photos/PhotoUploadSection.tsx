import React from 'react';
import PhotoUpload from './PhotoUpload';
import FlowersImg from '../../assets/Flowers-for-website.png';

const PhotoUploadSection: React.FC = () => {
  return (
    <section 
      id="photo-upload" 
      className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-cream-50 via-white to-sage-50"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          {/* Flowers decoration above heading - Responsive sizing */}
          <img
            src={FlowersImg}
            alt="Floral decoration"
            className="mx-auto mb-4 sm:mb-6 max-w-[120px] sm:max-w-[180px] md:max-w-[240px] lg:max-w-[300px] xl:max-w-[360px] drop-shadow-lg"
            style={{ objectFit: 'contain' }}
          />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-blush-700 mb-4 sm:mb-6 tracking-tight px-4">
            Share Your Memories
          </h2>
          <p className="text-base sm:text-lg text-sage-600 max-w-2xl mx-auto px-4 leading-relaxed">
            Help us capture every magical moment! Upload your photos from our wedding celebration 
            and let's create a beautiful collection of memories together.
          </p>
        </div>
        
        <PhotoUpload onUploadSuccess={() => {
          // Optional: Add any success handling here
          console.log('Photo uploaded successfully!');
        }} />
        
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Photo Guidelines</h3>
            <ul className="text-xs sm:text-sm text-blue-700 space-y-1 text-left leading-relaxed">
              <li>• Photos will be reviewed before appearing in the public gallery</li>
              <li>• Please only upload appropriate wedding-related photos</li>
              <li>• Maximum file size: 10MB per photo</li>
              <li>• <strong>Maximum 30 photos per upload session</strong></li>
              <li>• Supported formats: JPEG, PNG, WebP, HEIC</li>
              <li>• You can upload multiple photos at once</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blush-100 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-sage-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
};

export default PhotoUploadSection;
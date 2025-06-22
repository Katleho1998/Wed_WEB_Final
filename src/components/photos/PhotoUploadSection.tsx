import React from 'react';
import PhotoUpload from './PhotoUpload';

const PhotoUploadSection: React.FC = () => {
  return (
    <section 
      id="photo-upload" 
      className="py-24 bg-gradient-to-br from-cream-50 via-white to-sage-50"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-blush-700 mb-6 tracking-tight">
            Share Your Memories
          </h2>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto mb-8">
            Help us capture every magical moment! Upload your photos from our wedding celebration 
            and let's create a beautiful collection of memories together.
          </p>
          
          {/* Key Information */}
          <div className="bg-gradient-to-r from-blush-50 to-sage-50 border border-blush-200 rounded-2xl p-6 max-w-3xl mx-auto">
            <h3 className="font-serif text-xl text-sage-800 mb-4">📸 Photo Sharing Made Easy</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-blush-600 mb-1">Upload Limit</div>
                <div className="text-sage-600">30 photos at a time</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blush-600 mb-1">File Size</div>
                <div className="text-sage-600">Up to 10MB each</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blush-600 mb-1">Review Process</div>
                <div className="text-sage-600">Photos reviewed before publishing</div>
              </div>
            </div>
          </div>
        </div>
        
        <PhotoUpload onUploadSuccess={() => {
          // Optional: Add any success handling here
          console.log('Photo uploaded successfully!');
        }} />
        
        <div className="mt-12 text-center">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-amber-800 mb-3">📋 Photo Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-700">
              <ul className="space-y-2 text-left">
                <li>• Upload up to 30 photos per session</li>
                <li>• Photos reviewed before going live</li>
                <li>• Only wedding-related content please</li>
              </ul>
              <ul className="space-y-2 text-left">
                <li>• Maximum 10MB per photo</li>
                <li>• JPEG, PNG, WebP, HEIC formats</li>
                <li>• Multiple uploads supported</li>
              </ul>
            </div>
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
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-sage-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h3 className="font-serif text-2xl text-sage-700 mb-4 flex items-center gap-2">
            Thabi
            <span className="font-script text-lg text-mocha-500 leading-none mx-1">&</span>
            Trevor
          </h3>
          
          <div className="flex items-center justify-center mb-6">
            <span className="text-blush-500 mx-2">
              <Heart size={20} fill="currentColor" />
            </span>
            <p className="text-sage-600">September 27, 2025</p>
            <span className="text-blush-500 mx-2">
              <Heart size={20} fill="currentColor" />
            </span>
          </div>
          
          
          
          <p className="text-sage-400 text-xs text-center">
            &copy; {year} Design by Katleho - 065 897 4018. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
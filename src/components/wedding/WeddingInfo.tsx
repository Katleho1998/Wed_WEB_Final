import React from 'react';
import { MapPin } from 'lucide-react';
import paletteImg from '../../assets/pallete.jpg';

const WeddingInfo: React.FC = () => {
  const getDirectionsUrl = (address: string) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  };

  return (
    <section id="wedding-info" className="relative py-24 bg-gradient-to-br from-sage-50 via-cream-50 to-blush-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-blush-700 mb-10 tracking-tight">
          Wedding Information
        </h2>
        
        <div className="flex flex-col gap-12">
          {/* Saturday Events */}
          <div>
            <h4 className="font-serif text-2xl text-mocha-500 mb-6 text-center">Saturday, 27<sup>th</sup> September</h4>
            <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
              
              {/* Matrimony Card */}
              <div className="flex-1 bg-white/70 rounded-2xl p-6 shadow-lg border border-blush-100 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blush-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blush-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sage-700 text-xl">Matrimony</h5>
                    <p className="text-sage-600 text-sm">10:00 AM</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sage-700 font-medium mb-1">Church @ Allen Temple</p>
                  <p className="text-sage-600 text-sm mb-3">188 Ingedezi Street, Zone 7, Meadowlands</p>
                </div>
                
                <a
                  href={getDirectionsUrl("188 Ingedezi Street, Zone 7, Meadowlands")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blush-500 hover:bg-blush-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>

              {/* Reception Card */}
              <div className="flex-1 bg-white/70 rounded-2xl p-6 shadow-lg border border-blush-100 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-sage-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sage-700 text-xl">Reception</h5>
                    <p className="text-sage-600 text-sm">12:30 PM (for 1:00 PM)</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sage-700 font-medium mb-1">12278, Zone 9, Meadowlands</p>
                  <p className="text-sage-600 text-sm mb-3 italic">Use Mjakes Truckshop for directions</p>
                </div>
                
                <a
                  href={getDirectionsUrl("12278, Zone 9, Meadowlands, Mjakes Truckshop")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sage-500 hover:bg-sage-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* Sunday Event */}
          <div>
            <h4 className="font-serif text-2xl text-mocha-500 mb-4 text-center">Sunday, 28<sup>th</sup> September</h4>
            <div className="flex flex-col items-center">
              <div className="bg-white/70 rounded-2xl p-6 shadow-lg border border-blush-100 w-full md:w-2/3 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-cream-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-cream-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sage-700 text-xl">Celebration</h5>
                    <p className="text-sage-600 text-sm">12:30 PM for 1:00 PM</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sage-700 font-medium mb-1">Molapo Park</p>
                  <p className="text-sage-600 text-sm mb-4">Join us for the continuation of our celebration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gifts Section */}
          <div>
            <h4 className="font-serif text-2xl text-mocha-500 mb-4 text-center">Gifts</h4>
            <div className="flex flex-col items-center">
              <div className="bg-white/70 rounded-2xl p-6 shadow-lg border border-blush-100 w-full md:w-2/3 backdrop-blur-sm">
                <div className="text-center">
                  <p className="text-sage-700 mb-2">
                    <span className="font-semibold">Preferred gifts:</span> <span className="font-bold text-blush-600">Gift Cards</span>
                  </p>
                  <p className="text-sage-600 text-sm">
                    Suggested stores: Woolworths, @Home, Volpes, Coricraft
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Section */}
          <div className="text-center mt-8">
            <div className="mb-6">
              <p className="italic text-sage-600 text-base mb-2">Weekend Theme:</p>
              <h5 className="font-serif text-2xl font-bold text-mocha-500">Shades of Blue and Brown</h5>
            </div>
            <div className="flex justify-center">
              <img
                src={paletteImg}
                alt="Wedding color palette showing shades of blue and brown"
                className="rounded-xl max-w-2xl w-full shadow-lg border border-blush-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingInfo;
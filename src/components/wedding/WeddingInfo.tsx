import React from 'react';
import { MapPin, Clock, Calendar, Gift, Wine } from 'lucide-react';
import paletteImg from '../../assets/pallete.jpg';
import CosmicNebulaMastercard from '../ui/cursor-wander-card';

const WeddingInfo: React.FC = () => {
  const getDirectionsUrl = (address: string) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  };

  return (
    <section id="wedding-info" className="relative py-24 bg-gradient-to-br from-sage-50 via-cream-50 to-blush-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-blush-700 mb-16 tracking-tight">
          Wedding Information
        </h2>
        
        {/* Saturday Events - Side by Side Layout */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/80 rounded-full px-8 py-4">
              <Calendar className="w-6 h-6 text-mocha-500" />
              <h3 className="font-serif text-2xl text-mocha-500 font-semibold">Saturday, 27th September 2025</h3>
            </div>
          </div>
          
          {/* Two Column Grid - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Left Side - Matrimony Card */}
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blush-200/30 to-blush-300/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blush-100 hover:border-blush-200 transition-all duration-300 h-full flex flex-col">
                
                {/* Header with Icon - Centered */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blush-400 to-blush-500 rounded-2xl flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8 text-blush-500" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl text-sage-800 font-bold mb-2">Matrimony</h4>
                    <div className="flex items-center justify-center gap-2 text-sage-600">
                      <Clock className="w-4 h-4 text-mocha-500" />
                      <span className="font-medium text-mocha-500">10:00 AM</span>
                    </div>
                  </div>
                </div>
                
                {/* Venue Details - Centered */}
                <div className="mb-8 space-y-3 flex-grow text-center">
                  <h5 className="font-semibold text-sage-700 text-lg">Church @ Allen Temple</h5>
                  <div className="flex items-center justify-center gap-2">
                   
                    <span className="text-sage-600">188 Ingedezi Street, Zone 7, Meadowlands</span>
                  </div>
                </div>
                
                {/* Direction Button - Centered */}
                <div className="flex justify-center mt-auto">
                  <button
                    onClick={() => window.open(getDirectionsUrl("188 Ingedezi Street, Zone 7, Meadowlands"), '_blank')}
                    className="bg-[#555c78] hover:bg-[#4a5068] text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-white" />
                    <span>Directions</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Reception Card */}
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-200/30 to-sage-300/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-sage-100 hover:border-sage-200 transition-all duration-300 h-full flex flex-col">
                
                {/* Header with Icon - Centered */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-sage-400 to-sage-500 rounded-2xl flex items-center justify-center mb-4">
                    <Wine className="w-8 h-8 text-blush-500" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl text-sage-800 font-bold mb-2">Reception</h4>
                    <div className="flex items-center justify-center gap-2 text-sage-600">
                      <Clock className="w-4 h-4 text-mocha-500" />
                      <span className=" text-mocha-500 font-medium">12:30 PM (for 1:00 PM)</span>
                    </div>
                  </div>
                </div>
                
                {/* Venue Details - Centered */}
                <div className="mb-8 space-y-3 flex-grow text-center">
                  <h5 className="font-semibold text-sage-700 text-lg">12278, Zone 9, Meadowlands</h5>
                  <div className="flex items-center justify-center gap-2">
                    
                    <span className="text-sage-600 italic">Use Mjakes Truckshop for directions</span>
                  </div>
                </div>
                
                {/* Direction Button - Centered */}
                <div className="flex justify-center mt-auto">
                  <button
                    onClick={() => window.open(getDirectionsUrl("12278, Zone 9, Meadowlands, Mjakes Truckshop"), '_blank')}
                    className="bg-[#555c78] hover:bg-[#4a5068] text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-white" />
                    <span>Directions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sunday Event - Centered */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 bg-white/80 rounded-full px-6 py-3">
              <Calendar className="w-6 h-6 text-mocha-500" />
              <h3 className="font-serif text-2xl text-mocha-500 font-semibold">Sunday, 28th September 2025</h3>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="group relative max-w-md w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-cream-200/30 to-cream-300/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-cream-100 hover:border-cream-200 transition-all duration-300">
                
                {/* Header with Icon - Centered */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div>
                    <h4 className="font-serif text-2xl text-sage-800 font-bold mb-2"></h4>
                    <div className="flex items-center justify-center gap-2 text-sage-600">
                      <Clock className="w-4 h-4 text-mocha-500" />
                      <span className=" text-mocha-500 font-medium">12:30 PM for 1:00 PM</span>
                    </div>
                  </div>
                </div>
                
                {/* Venue Details - Centered */}
                <div className="text-center">
                  <h5 className="font-semibold text-sage-700 text-lg mb-2">Molapo Park</h5>
                  <p className="text-sage-600 text-sm">Join us for the continuation of our celebration</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Beverage Note */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-xl w-full">
              <div className="text-center">
                <p className="text-amber-800 font-medium text-sm">
                  <span className="font-bold">NOTE:</span> Attendees are encouraged to cater for their own beverage needs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gifts Section - Enhanced with Cosmic Gift Card and Detailed Information */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 bg-white/80 rounded-full px-6 py-3">
              <Gift className="w-6 h-6 text-mocha-500" />
              <h3 className="font-serif text-2xl text-mocha-500 font-semibold">Gifts</h3>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="group relative max-w-4xl w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blush-200/20 to-sage-200/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blush-100 hover:border-blush-200 transition-all duration-300 h-full flex flex-col">
                
                {/* Gift Details - Centered */}
                <div className="text-center space-y-8 flex-grow">
                  <div>
                    <p className="text-sage-700 text-xl mb-2">
                      <span className="font-semibold">Preferred gifts:</span> 
                    </p>
                    <h4 className="font-bold text-blush-600 text-3xl mb-6 font-serif">Gift Cards</h4>
                  </div>
                  
                  {/* Interactive Gift Card Display */}
                  <div className="flex justify-center my-8">
                    <CosmicNebulaMastercard
                      cardholderName="Woolworths, @Home, Volpes, Coricraft "
                      width="420px"
                      height="280px"
                      theme={{
                        primaryColor: "#555c78",
                        secondaryColor: "#555c78", 
                        glowColor: "rgba(85, 92, 120, 0.6)"
                      }}
                      logoText={{
                        topText: "Gift Card",
                        bottomText: "Suggested Stores"
                      }}
                      className="transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Detailed Information Section */}
                  <div className="bg-gradient-to-r from-blush-50 to-sage-50 rounded-2xl p-8 border border-blush-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      
                      {/* Left Column - Suggested Stores */}
                      <div>
                        <h5 className="font-semibold text-sage-700 text-lg mb-4 flex items-center gap-2">
                          <Gift className="w-5 h-5 text-blush-500" />
                          Suggested Stores
                        </h5>
                        <div className="grid grid-cols-1 gap-3">
                          <div className="bg-white rounded-lg p-4 border border-sage-200 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                            <span className="font-semibold text-sage-700 text-lg">Woolworths</span>
                            <p className="text-sage-500 text-sm mt-1">Home & lifestyle products</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-sage-200 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                            <span className="font-semibold text-sage-700 text-lg">@Home</span>
                            <p className="text-sage-500 text-sm mt-1">Furniture & home decor</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-sage-200 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                            <span className="font-semibold text-sage-700 text-lg">Volpes</span>
                            <p className="text-sage-500 text-sm mt-1">Quality furniture & appliances</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-sage-200 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                            <span className="font-semibold text-sage-700 text-lg">Coricraft</span>
                            <p className="text-sage-500 text-sm mt-1">Premium furniture & home accessories</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Column - Gift Information */}
                      <div className="space-y-6">
                        <div>
                          <h5 className="font-semibold text-sage-700 text-lg mb-3">Why Gift Cards?</h5>
                          <ul className="text-sage-600 space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-blush-500 mt-1">•</span>
                              <span>Allows us to choose exactly what we need for our new home</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blush-500 mt-1">•</span>
                              <span>No worry about duplicates or returns</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blush-500 mt-1">•</span>
                              <span>Perfect for building our life together</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 border border-blush-200">
                          <h6 className="font-semibold text-blush-700 mb-2">Gift Card Options:</h6>
                          <div className="text-sage-600 text-sm space-y-1">
                            <p>• <strong>Physical cards:</strong> Available at store locations</p>
                            <p>• <strong>Digital cards:</strong> Perfect for online shopping</p>
                            <p>• <strong>Any amount:</strong> Every contribution is appreciated</p>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blush-100 to-sage-100 rounded-lg p-4 border border-blush-200">
                          <p className="text-sage-700 text-sm text-center font-medium">
                            💝 Your presence is the greatest gift, but if you wish to give something, 
                            these gift cards would help us start our married life together! 💝
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sage-500 text-sm italic">
                    Hover over the gift card above to see the interactive effect!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Section - Centered */}
        <div className="text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 bg-white/80 rounded-full px-6 py-3 mb-6">
              <h3 className="font-serif text-2xl text-mocha-500 font-semibold">Weekend Theme</h3>
            </div>
            <h4 className="font-serif text-3xl text-sage-600 mb-6">Shades of Blue and Brown</h4>
          </div>
          
          <div className="flex justify-center">
            <div className="group relative max-w-3xl w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-amber-200/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src={paletteImg}
                  alt="Wedding color palette showing shades of blue and brown"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingInfo;
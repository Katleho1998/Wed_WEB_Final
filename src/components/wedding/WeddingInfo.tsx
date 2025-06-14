import React from 'react';
import paletteImg from '../../assets/pallete.jpg';

const WeddingInfo: React.FC = () => (
  <section id="wedding-info" className="relative py-24 bg-gradient-to-br from-sage-50 via-cream-50 to-blush-50">
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 className="font-serif text-4xl md:text-5xl text-center text-blush-700 mb-10 tracking-tight">
        Wedding Information
      </h2>
      {/* Remove card, present info as beautiful infographic/section */}
      <div className="flex flex-col gap-12">
        <div>
          <h4 className="font-serif text-2xl text-mocha-500 mb-4 text-center">Saturday, 27<sup>th</sup> September</h4>
          <div className="flex flex-col md:flex-row md:justify-between gap-8">
            <div className="flex-1 bg-white/60 rounded-2xl p-6 shadow border border-blush-100">
              <div className="font-semibold text-sage-700 text-lg mb-1">Matrimony</div>
              <div className="text-sage-600 mb-1">Time: <span className="font-bold">10:00 AM</span></div>
              <div className="text-sage-600 mb-1">
                Venue: <span className="font-bold">Church @ Allen Temple</span><br />
                188 Ingedezi Street, Zone 7, Meadowlands
              </div>
            </div>
            <div className="flex-1 bg-white/60 rounded-2xl p-6 shadow border border-blush-100">
              <div className="font-semibold text-sage-700 text-lg mb-1">Reception</div>
              <div className="text-sage-600 mb-1">Time: <span className="font-bold">12:30 PM (for 1:00 PM)</span></div>
              <div className="text-sage-600 mb-1">
                Venue: <span className="font-bold">12278, Zone 9, Meadowlands</span><br />
                <span className="italic">Use Mjakes Truckshop for directions</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-serif text-2xl text-mocha-500 mb-4 text-center">Sunday, 28<sup>th</sup> September</h4>
          <div className="flex flex-col items-center">
            <div className="bg-white/60 rounded-2xl p-6 shadow border border-blush-100 w-full md:w-2/3">
              <div className="font-semibold text-sage-700 text-lg mb-1">Celebration</div>
              <div className="text-sage-600 mb-1">Venue: <span className="font-bold">Molapo Park</span></div>
              <div className="text-sage-600 mb-1">Time: <span className="font-bold">12:30 PM for 1:00 PM</span></div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-serif text-2xl  text-mocha-500 mb-4 text-center">Gifts</h4>
          <h4 className="font-serif text-2xl text-mocha-500 mb-4 text-center hidden">Gifts</h4>
          <div className="flex flex-col items-center">
            <div className="bg-white/60 rounded-2xl p-6 shadow border border-blush-100 w-full md:w-2/3">
              <div className="text-sage-700 mb-1">Preferred gifts: <span className="font-bold">Gift Cards</span></div>
              <div className="text-sage-600">
                Suggested stores: Woolworths, @Home, Volpes, Coricraft
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <div className="italic text-sage-600 text-base mb-2">Weekend Theme:</div>
          <div className="font-serif text-2xl  font-bold">Shades of Blue and Brown</div>
          <img
            src={paletteImg}
            alt="Wedding color palette"
            className="mx-auto mt-4 rounded-xl max-w-2xl w-full"
          />
        </div>
      </div>
    </div>
  </section>
);

export default WeddingInfo;
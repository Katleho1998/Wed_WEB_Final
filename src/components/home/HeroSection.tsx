import React, { useEffect, useRef, useState } from 'react';
import FlowersImg from '../../assets/Flowers-for-website.png';
import AppaiyoNavbar from '../layout/AppaiyoNavbar';
import TextCursor from './TextCursor';
import SplitText from './SplitText';
import Particles from './Particles';


// Blue heart SVG as a React component
const BlueHeart = ({ style }: { style: React.CSSProperties }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" style={style} fill="none">
    <path
      d="M14 25s-7.5-6.2-10.2-9.1C1.1 14.1 0 12.2 0 10.2 0 6.7 2.7 4 6.2 4c1.9 0 3.7 1 4.8 2.6C12.1 5 13.9 4 15.8 4 19.3 4 22 6.7 22 10.2c0 2-1.1 3.9-3.8 5.7C21.5 18.8 14 25 14 25z"
      fill="#6EC1E4"
      opacity="0.7"
    />
  </svg>
);

const NUM_HEARTS = 18;


const HeroSection: React.FC = () => {
  // Blue heart floating animation logic
  const [hearts, setHearts] = useState<
    { id: number; left: number; delay: number; duration: number; size: number; drift: number }[]
  >([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: NUM_HEARTS }).map((_, i) => ({
        id: i,
        left: Math.random() * 100, // percent
        delay: Math.random() * 3, // seconds
        duration: 5 + Math.random() * 3, // seconds
        size: 18 + Math.random() * 18, // px
        drift: -20 + Math.random() * 40, // px, left/right drift
      }))
    );
  }, []);

 

  return (
    <section
      id="home"
      className="relative inset-0 w-full min-h-screen flex items-center justify-center bg-cream-50 overflow-hidden z-[100] px-2 sm:px-0"
    >
      {/* Particles background */}
      <Particles
        particleColors={['#555c78', '#555c78']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />

      {/* Navbar overlayed at the top */}
      <div className="absolute top-0 left-0 w-full z-50">
        <AppaiyoNavbar />
      </div>

      {/* Floating Flowers Background */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-10 overflow-hidden">
        {/* ...existing flower animation code... */}
      </div>

      {/* Main content, centered - Reduced mobile padding */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full px-2 sm:px-4 max-w-2xl mx-auto py-4 sm:py-12 text-center">
        <img
          src={FlowersImg}
          alt="Floral decoration"
          className="mx-auto mb-2 sm:mb-6 max-w-[100px] sm:max-w-[180px] md:max-w-[240px] lg:max-w-[300px] drop-shadow-lg"
          style={{ objectFit: 'contain' }}
        />

        <span className="block mb-1 sm:mb-2 text-[8px] sm:text-sm md:text-base lg:text-lg font-semibold text-mocha-500 tracking-wide text-center uppercase">
          PLEASE JOIN US FOR THE TRADITIONAL WEDDING OF
        </span>
        {/* Animated SplitText for names - Increased mobile size from text-2xl to text-4xl */}
        <SplitText
          text="Thabi & Trevor"
          className="font-serif text-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-dusty-800 mb-1 sm:mb-2 animate-fadeIn leading-tight flex items-center justify-center gap-2 sm:gap-4 text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />

        <div className="mb-3 sm:mb-8 mt-1 sm:mt-2 w-full flex flex-col items-center">
          <p className="text-sm sm:text-lg md:text-xl text-dusty-600 animatexfadeIn animation-delay-300 text-center">
            September 27th - 28th, 2025
          </p>
          <p className="text-xs sm:text-base md:text-lg text-mocha-500 animate-fadeIn animation-delay-600 text-center">
            Meadowlands • Soweto
          </p>
        </div>

        <a
          href="#rsvp"
          className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blush-400 via-blush-500 to-blush-600 rounded-full px-4 sm:px-12 py-2 sm:py-4 transition-colors duration-200 text-sm sm:text-xl animate-fadeIn animation-delay-900 uppercase tracking-wider border relative
            hover:bg-[#555c78] hover:from-[#555c78] hover:to-[#555c78]"
          style={{
            color: '#555c78',
            borderColor: '#555c78',
            borderWidth: '1px',
            textShadow: 'none',
            letterSpacing: '0.08em',
            boxShadow: 'none',
            transition: 'background 0.2s, color 0.2s'
          }}
        >
          <span className='hover:text-white'>RSVP Now</span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
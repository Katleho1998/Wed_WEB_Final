import React, { useEffect, useState } from 'react';
import FlowersImg from '../../assets/Flowers-for-website.png';
import AppaiyoNavbar from '../layout/AppaiyoNavbar';


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
      className="inset-0 w-screen h-screen flex items-center justify-center bg-cream-50 overflow-hidden z-[100] relative"
    >
      {/* Navbar overlayed at the top */}
      <div className="absolute top-0 left-0 w-full z-50 ">
        <AppaiyoNavbar />
      </div>

      {/* Floating Flowers Background */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-10 overflow-hidden">
        {/* ...existing flower animation code... */}
      </div>

      {/* Blue Heart Floating Particles */}
      <div
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
      >
        {hearts.map((heart) => (
          <span
            key={heart.id}
            style={{
              position: 'absolute',
              left: `${heart.left}%`,
              bottom: '-40px',
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              animation: `heart-float ${heart.duration}s linear ${heart.delay}s infinite`,
              transform: `translateX(0px)`,
              opacity: 0.7,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <BlueHeart style={{ width: '100%', height: '100%' }} />
          </span>
        ))}
      </div>

      <style>
        {`
        @keyframes heart-float {
          0% {
            opacity: 0.7;
            transform: translateY(0) scale(1) translateX(0);
          }
          60% {
            opacity: 0.7;
            transform: translateY(-60vh) scale(1.1) translateX(var(--drift, 0px));
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh) scale(1.15) translateX(var(--drift, 0px));
          }
        }
        `}
      </style>

      {/* Main content, centered */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full px-4 max-w-2xl mx-auto py-12 text-center">
        <img
          src={FlowersImg}
          alt="Floral decoration"
          className="mx-auto mb-6 max-w-[180px] md:max-w-[240px] lg:max-w-[300px] drop-shadow-lg"
          style={{ objectFit: 'contain' }}
        />

        <span className="block mb-2 text-xs md:text-sm lg:text-base font-semibold text-mocha-500 tracking-wide text-center uppercase">
          PLEASE JOIN US FOR THE TRADITIONAL WEDDING OF
        </span>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-dusty-800 mb-2 animate-fadeIn leading-tight flex items-center justify-center gap-4 text-center">
          Thabi
          <span className="font-script text-3xl md:text-4xl lg:text-5xl text-mocha-500 mx-2">&</span>
          Trevor
        </h1>

        <div className="mb-8 mt-2 w-full flex flex-col items-center">
          <p className="text-lg md:text-xl text-dusty-600 animate-fadeIn animation-delay-300 text-center">
            September 27th - 28th, 2025
          </p>
          <p className="text-base md:text-lg text-mocha-500 animate-fadeIn animation-delay-600 text-center">
            Meadowlands • Soweto
          </p>
        </div>

        <a
          href="#rsvp"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-blush-400 via-blush-500 to-blush-600  rounded-full px-12 py-4 transition-colors duration-200 text-xl animate-fadeIn animation-delay-900 uppercase tracking-wider border relative
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
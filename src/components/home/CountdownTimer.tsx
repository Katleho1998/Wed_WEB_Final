import React, { useEffect, useState } from 'react';

const WEDDING_DATE = new Date('2025-09-27T10:00:00+02:00');

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-8 flex flex-col items-center animate-fadeIn animation-delay-1000">
      <div className="backdrop-blur-xl bg-white/40 border border-blush-100 rounded-2xl px-8 py-5 shadow-lg flex gap-6 md:gap-10">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div key={item.label} className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-bold text-[#555c78] drop-shadow-sm tracking-wider">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-xs md:text-base font-medium text-mocha-500 uppercase tracking-widest mt-1">
              {item.label}
            </span>
            {idx < 3 && (
              <span className="hidden md:inline-block absolute mx-2 text-blush-400 text-2xl font-bold" style={{ top: '18px', right: '-18px' }}></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
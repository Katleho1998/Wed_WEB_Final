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
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[200] animate-fadeIn animation-delay-1000">
      <div className="backdrop-blur-xl bg-white/60 border border-blush-100 rounded-2xl px-6 md:px-8 py-4 md:py-5 shadow-2xl flex gap-4 md:gap-10">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div key={item.label} className="flex flex-col items-center">
            <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#555c78] drop-shadow-sm tracking-wider">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] md:text-sm lg:text-base font-medium text-mocha-500 uppercase tracking-widest mt-1">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
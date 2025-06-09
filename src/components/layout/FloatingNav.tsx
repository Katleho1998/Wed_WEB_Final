import React from 'react';
import { NAV_ITEMS } from '../../utils/constants';

const FloatingNav: React.FC = () => {
  return (
    <nav className="fixed left-1/2 top-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex items-center justify-center bg-white/90 rounded-full shadow-2xl px-6 py-3 gap-6 border border-blush-100 backdrop-blur-md">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-blush-50 hover:bg-blush-200 transition-colors duration-200 shadow text-blush-600 font-bold text-lg"
            style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
          >
            {item.label[0]}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default FloatingNav;

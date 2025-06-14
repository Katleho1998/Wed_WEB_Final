import React, { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../../utils/constants';

const AppaiyoNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleNavClick(href: string): void {
    setOpen(false);
    if (href && href !== '#') {
      window.location.href = href;
    }
  }

  function handleMenuMouseEnter() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function handleMenuMouseLeave() {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 2500);
  }

  return (
    <nav
      className="appaiyo-navbar fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-xs sm:max-w-3xl bg-white/80 rounded-full shadow-2xl px-3 py-4 flex items-center justify-between mx-auto mt-4 border border-blush-100 backdrop-blur-sm z-[9999] transition-all duration-300"
    >
      {/* Left: Logo and Brand */}
      <a href="#" className="flex items-center space-x-2 pl-8 py-1">
        <span className="font-serif text-xl text-mocha-500 tracking-tight">
          T & T
        </span>
      </a>

      {/* Dropdown Navigation */}
      <div className="relative flex-1 flex justify-end pr-4 ">
        <button
          className="p-2 transition-colors duration-300 text-sage-700 md:ml-4"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        {open && (
          <nav
            className="absolute right-0 mt-2 w-56 bg-cream-50 shadow-xl rounded-2xl z-[10000] border border-blush-100"
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
          >
            <ul className="flex flex-col py-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="w-full text-left px-6 py-3 text-sage-700 transition-colors duration-200 rounded-xl nav-link-hover"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <style>
              {`
                .nav-link-hover:hover {
                  color: #6EC1E4 !important;
                  background-color: #e6f6fb !important;
                }
              `}
            </style>
          </nav>
        )}
      </div>
    </nav>
  );
};

export default AppaiyoNavbar;
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../../utils/constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and site name */}
        <a 
          href="#home" 
          className="flex items-center space-x-3 group ml-16"
        >
          <span
            className="font-serif text-2xl transition-colors duration-300"
          >
            T & T
          </span>
        </a>

        {/* Desktop & Mobile Menu Button */}
        <button
          className="p-2 transition-colors duration-300 text-sage-700 md:ml-4"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Dropdown Navigation */}
        <div className="relative">
          {isOpen && (
            <nav className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-2xl z-50 border border-blush-100">
              <ul className="flex flex-col py-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="w-full text-left px-6 py-3 text-sage-700 hover:text-blush-500 hover:bg-blush-50 transition-colors duration-200 rounded-xl"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
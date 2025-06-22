import React from 'react';
import { trackExternalLink } from '../../utils/analytics';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=188+Ingedezi+Street,+Zone+7,+Meadowlands';
const GOOGLE_CALENDAR_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Thabi+%26+Trevor+Traditional+Wedding&dates=20250927T080000Z/20250928T170000Z&details=Traditional+Wedding+of+Thabi+and+Trevor%0A%0ASaturday+27th+Sep%3A+Matrimony+10%3A00+AM+at+Church+%40+Allen+Temple%2C+188+Ingedezi+Street%2C+Zone+7%2C+Meadowlands%0AReception+12%3A30+PM+at+12278%2C+Zone+9%2C+Meadowlands%0A%0ASunday+28th+Sep%3A+Molapo+Park+12%3A30+PM%0A%0ATheme%3A+Shades+of+Blue+and+Brown&location=188+Ingedezi+Street,+Zone+7,+Meadowlands';

const MapAndCalendar: React.FC = () => {
  const handleDirectionsClick = () => {
    trackExternalLink(GOOGLE_MAPS_URL, 'google_maps_directions');
    window.open(GOOGLE_MAPS_URL, '_blank', 'noopener,noreferrer');
  };

  const handleCalendarClick = () => {
    trackExternalLink(GOOGLE_CALENDAR_URL, 'google_calendar_add');
    window.open(GOOGLE_CALENDAR_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-sage-50 via-cream-50 to-blush-50">
      <div className="container mx-auto px-0 max-w-full">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-blush-700 mb-12 tracking-tight">
          Find Us & Save the Date
        </h2>
        <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-blush-100 mx-auto" style={{ maxWidth: '1200px' }}>
          {/* Full-width Map */}
          <iframe
            title="Wedding Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.3794364247406!2d27.88796307538281!3d-26.22069037708337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950e1e2e2e2e2b%3A0x2e2e2e2e2e2e2e2e!2s188%20Ingedezi%20St%2C%20Meadowlands%20Zone%207%2C%20Soweto%2C%201857!5e0!3m2!1sen!2sza!4v1718030000000!5m2!1sen!2sza"
            width="100%"
            height="420"
            style={{
              border: 0,
              borderRadius: '1.5rem',
              boxShadow: '0 4px 32px 0 rgba(230,164,180,0.10)',
              background: 'linear-gradient(135deg, #f9e7e7 0%, #f7f3ed 100%)',
              display: 'block'
            }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        {/* Buttons below the map */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
          <button
            onClick={handleDirectionsClick}
            className="bg-white text-blush-700 px-8 py-3 rounded-full font-serif text-lg shadow border-2 border-blush-400 hover:bg-blush-50 hover:text-blush-800 transition-colors duration-200 font-semibold"
            style={{
              letterSpacing: '0.03em',
            }}
          >
            Get Directions
          </button>
          <button
            onClick={handleCalendarClick}
            className="bg-white text-blush-700 px-8 py-3 rounded-full font-serif text-lg shadow border-2 border-blush-400 hover:bg-blush-50 hover:text-blush-800 transition-colors duration-200 font-semibold"
            style={{
              letterSpacing: '0.03em',
            }}
          >
            Add to Calendar
          </button>
        </div>
      </div>
    </section>
  );
};

export default MapAndCalendar;
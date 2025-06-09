import React from 'react';
import { MapPin, Clock, Gift, Shirt } from 'lucide-react';

const WEDDING_DETAILS = [
  {
    icon: <MapPin size={36} className="text-blush-500" />,
    title: 'Location',
    lines: [
      'Rosewood Estate',
      '123 Ocean Drive, Newport, RI',
    ],
    link: {
      href: 'https://maps.google.com',
      label: 'View Map',
    },
  },
  {
    icon: <Clock size={36} className="text-blush-500" />,
    title: 'When',
    lines: [
      'Sunday, June 15, 2025',
      'Ceremony begins at 4:00 PM',
      'Cocktails, dinner & dancing to follow',
    ],
  },
  {
    icon: <Shirt size={36} className="text-blush-500" />,
    title: 'Dress Code',
    lines: [
      'Formal / Black Tie Optional',
      'The ceremony and reception will be held outdoors, so please dress accordingly.',
    ],
  },
  {
    icon: <Gift size={36} className="text-blush-500" />,
    title: 'Registry',
    lines: [
      "Your presence is our present, but if you wish to give a gift, we've registered at:",
      "Crate & Barrel, West Elm",
    ],
    link: {
      href: '#',
      label: 'View Registry',
    },
  },
];

const WeddingInfoSection: React.FC = () => (
  <section id="wedding-info" className="py-24 bg-gradient-to-br from-cream-50 via-white to-sage-50">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-5xl md:text-6xl text-center text-blush-600 mb-16 tracking-tight drop-shadow-lg">
        Wedding Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {WEDDING_DETAILS.map((detail, idx) => (
          <div
            key={detail.title}
            className="bg-white/80 rounded-3xl shadow-xl border border-blush-100 p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-4">{detail.icon}</div>
            <h3 className={`font-serif text-2xl ${detail.title === 'When' ? 'text-mocha-500' : 'text-sage-700'} mb-3`}>
              {detail.title}
            </h3>
            <div className="mb-4 space-y-1">
              {detail.lines.map((line, i) => (
                <p key={i} className="text-sage-600 text-base">{line}</p>
              ))}
            </div>
            {detail.link && (
              <a
                href={detail.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-blush-500 border border-blush-200 rounded-full px-5 py-2 hover:bg-blush-500 hover:text-white transition-colors duration-300"
              >
                {detail.link.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WeddingInfoSection;

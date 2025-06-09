import React, { useEffect, useRef } from 'react';
import { TIMELINE_EVENTS } from '../../utils/constants';

const Timeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.timeline-item');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('opacity-100');
                el.classList.remove('translate-y-4');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  return (
    <div className="mb-20" ref={timelineRef}>
      <h3 className="font-serif text-2xl text-center text-sage-700 mb-10">
        Wedding Day Timeline
      </h3>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-blush-200 transform md:translate-x-px"></div>

        {/* Timeline Events */}
        <div className="space-y-12">
          {TIMELINE_EVENTS.map((event, index) => (
            <div 
              key={index} 
              className={`timeline-item relative flex flex-col md:flex-row transition-all duration-500 opacity-0 translate-y-4 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Time Bubble */}
              <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-blush-500 transform -translate-x-1/2 md:-translate-x-4 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </div>
              
              {/* Time */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                index % 2 === 0 ? 'md:pr-12 text-left' : 'md:pl-12 text-left'
              }`}>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="font-serif text-xl text-sage-700 mb-2">{event.time}</h4>
                  <h5 className="font-medium text-blush-500 mb-2">{event.title}</h5>
                  <p className="text-sage-600">{event.description}</p>
                </div>
              </div>
              
              {/* Spacer for offset layout */}
              <div className="hidden md:block w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
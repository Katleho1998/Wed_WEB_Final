import React, { useEffect, useRef } from 'react';
import { trackPageView, trackScrollDepth, trackTimeOnSite, trackDeviceInfo } from '../../utils/analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const startTimeRef = useRef<number>(Date.now());
  const scrollDepthTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname, document.title);
    
    // Track device info
    trackDeviceInfo();

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      // Track at 25%, 50%, 75%, and 100% scroll depths
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !scrollDepthTracked.current.has(milestone)) {
          scrollDepthTracked.current.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    // Track time on site when user leaves
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      trackTimeOnSite(timeSpent);
    };

    // Track visibility changes (when user switches tabs)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
        trackTimeOnSite(timeSpent);
      } else {
        startTimeRef.current = Date.now(); // Reset timer when user returns
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <>{children}</>;
};

export default AnalyticsProvider;
// Google Analytics 4 utility functions for tracking website traffic and user interactions

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Check if Google Analytics is loaded
export const isAnalyticsLoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

// Track page views
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (!isAnalyticsLoaded()) return;
  
  window.gtag('config', 'G-CFDW7XTEXN', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  });
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (!isAnalyticsLoaded()) return;
  
  window.gtag('event', eventName, {
    event_category: 'wedding_site',
    event_label: 'user_interaction',
    ...parameters,
  });
};

// Track RSVP submissions
export const trackRSVP = (attending: boolean, guestCount: number) => {
  trackEvent('rsvp_submission', {
    event_category: 'rsvp',
    event_label: attending ? 'attending' : 'not_attending',
    value: guestCount,
    custom_parameter_1: 'rsvp_form',
  });
};

// Track photo uploads
export const trackPhotoUpload = (photoCount: number) => {
  trackEvent('photo_upload', {
    event_category: 'engagement',
    event_label: 'guest_photos',
    value: photoCount,
    custom_parameter_1: 'photo_sharing',
  });
};

// Track navigation clicks
export const trackNavigation = (destination: string) => {
  trackEvent('navigation_click', {
    event_category: 'navigation',
    event_label: destination,
    custom_parameter_1: 'site_navigation',
  });
};

// Track gallery interactions
export const trackGalleryView = (viewMode: 'circular' | 'grid') => {
  trackEvent('gallery_view', {
    event_category: 'engagement',
    event_label: `gallery_${viewMode}_view`,
    custom_parameter_1: 'gallery_interaction',
  });
};

// Track external link clicks
export const trackExternalLink = (linkUrl: string, linkType: string) => {
  trackEvent('external_link_click', {
    event_category: 'outbound',
    event_label: linkType,
    link_url: linkUrl,
    custom_parameter_1: 'external_navigation',
  });
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `scroll_${percentage}%`,
    value: percentage,
    custom_parameter_1: 'page_engagement',
  });
};

// Track time spent on site
export const trackTimeOnSite = (timeInSeconds: number) => {
  trackEvent('time_on_site', {
    event_category: 'engagement',
    event_label: 'session_duration',
    value: timeInSeconds,
    custom_parameter_1: 'user_engagement',
  });
};

// Track device type
export const trackDeviceInfo = () => {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
  const isDesktop = window.innerWidth > 1024;
  
  let deviceType = 'unknown';
  if (isMobile) deviceType = 'mobile';
  else if (isTablet) deviceType = 'tablet';
  else if (isDesktop) deviceType = 'desktop';
  
  trackEvent('device_info', {
    event_category: 'technical',
    event_label: deviceType,
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    custom_parameter_1: 'device_analytics',
  });
};
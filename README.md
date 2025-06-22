# Thabi & Trevor's Wedding Website

A modern, elegant RSVP and information site for the traditional wedding of Thabi & Trevor with comprehensive analytics tracking.

## Features

- Beautiful hero section with animated hearts and countdown timer
- RSVP form with email uniqueness check
- Partner RSVP support
- Photo upload system for guest memories
- Success and error feedback for guests
- Responsive, mobile-friendly design
- Built with React, TypeScript, and Tailwind CSS
- Supabase backend for RSVP storage and photo management
- **Google Analytics 4 integration for comprehensive traffic tracking**

## Analytics & Traffic Tracking

This website includes comprehensive analytics tracking to monitor daily traffic and user engagement:

### What's Tracked:
- **Daily visitors and page views**
- **User device types** (mobile, tablet, desktop)
- **RSVP submissions** (attending vs not attending)
- **Photo uploads** by guests
- **Navigation patterns** and section visits
- **Gallery interactions** (3D vs Grid view preferences)
- **External link clicks** (directions, calendar)
- **Scroll depth** and time spent on site
- **User engagement metrics**

### Setting Up Analytics:

1. **Get Google Analytics 4 Measurement ID:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property for your wedding website
   - Copy your Measurement ID (format: G-XXXXXXXXXX)

2. **Configure the Analytics:**
   - Open `index.html`
   - Replace `GA_MEASUREMENT_ID` with your actual Measurement ID in two places:
     ```html
     <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_MEASUREMENT_ID"></script>
     ```
     ```javascript
     gtag('config', 'YOUR_MEASUREMENT_ID', {
     ```

3. **View Your Analytics:**
   - Visit your Google Analytics dashboard
   - Navigate to Reports > Realtime to see live traffic
   - Check Reports > Engagement > Events to see custom wedding events
   - Use Reports > Audience > Demographics for visitor insights

### Custom Events Tracked:
- `rsvp_submission` - When guests submit RSVPs
- `photo_upload` - When guests upload photos
- `navigation_click` - Menu navigation usage
- `gallery_view` - Gallery viewing preferences
- `external_link_click` - Directions/calendar clicks
- `scroll_depth` - How far users scroll (25%, 50%, 75%, 100%)
- `time_on_site` - Session duration tracking

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Wedding_Site-main
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure Supabase:
   - Copy your Supabase project URL and anon/public key into `src/utils/supabaseClient.ts`.

4. Configure Google Analytics:
   - Replace `GA_MEASUREMENT_ID` in `index.html` with your actual GA4 Measurement ID

5. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
  components/
    analytics/
      AnalyticsProvider.tsx    # Analytics tracking wrapper
    home/
      HeroSection.tsx
      CountdownTimer.tsx
    layout/
      AppaiyoNavbar.tsx
    rsvp/
      RSVPForm.tsx
    photos/
      PhotoUpload.tsx          # Guest photo upload system
      PhotoUploadSection.tsx
    gallery/
      Gallery.tsx
  utils/
    analytics.ts               # Analytics utility functions
    supabaseClient.ts
  App.tsx
  index.tsx
```

## Analytics Dashboard

Once configured, you can monitor:

1. **Daily Traffic:**
   - Unique visitors per day
   - Page views and session duration
   - Peak traffic times

2. **User Behavior:**
   - Most visited sections
   - RSVP conversion rates
   - Photo upload engagement
   - Mobile vs desktop usage

3. **Wedding-Specific Metrics:**
   - RSVP attendance ratio
   - Guest photo sharing activity
   - Calendar/directions click-through rates

## Customization

- **Wedding Date:** Change the date in `CountdownTimer.tsx` and `HeroSection.tsx`.
- **RSVP Table:** Ensure your Supabase table `rsvps` matches the fields used in the RSVP form.
- **Analytics Events:** Modify tracking events in `src/utils/analytics.ts` for custom metrics.
- **Email Function:** Update the email function endpoint if needed.

## Deployment

You can deploy this site to Vercel, Netlify, or any static hosting provider. The analytics will work automatically once deployed with your GA4 Measurement ID configured.

## Privacy & GDPR Compliance

The analytics implementation respects user privacy:
- No personally identifiable information is tracked
- Only aggregated usage data is collected
- Users can opt-out through browser settings
- Compliant with Google Analytics privacy policies

## License

MIT

---

**With love, for Thabi & Trevor's special day!**

*Now with comprehensive analytics to track your wedding website's success and guest engagement.*
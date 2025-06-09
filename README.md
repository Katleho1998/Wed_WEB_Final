# Thabi & Trevor's Wedding Website

A modern, elegant RSVP and information site for the traditional wedding of Thabi & Trevor.

## Features

- Beautiful hero section with animated hearts and countdown timer
- RSVP form with email uniqueness check
- Partner RSVP support
- Success and error feedback for guests
- Responsive, mobile-friendly design
- Built with React, TypeScript, and Tailwind CSS
- Supabase backend for RSVP storage and email notifications

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

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
  components/
    home/
      HeroSection.tsx
      CountdownTimer.tsx
    layout/
      AppaiyoNavbar.tsx
    rsvp/
      RSVPForm.tsx
  assets/
  utils/
    supabaseClient.ts
  App.tsx
  index.tsx
```

## Customization

- **Wedding Date:** Change the date in `CountdownTimer.tsx` and `HeroSection.tsx`.
- **RSVP Table:** Ensure your Supabase table `rsvps` matches the fields used in the RSVP form.
- **Email Function:** Update the email function endpoint if needed.

## Deployment

You can deploy this site to Vercel, Netlify, or any static hosting provider.

## License

MIT

---

**With love, for Thabi & Trevor's special day!**

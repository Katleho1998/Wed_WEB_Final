import HeroSection from './components/home/HeroSection';
import OurStory from './components/couple/OurStory';
import WeddingInfo from './components/wedding/WeddingInfo';
import RSVPForm from './components/rsvp/RSVPForm';
import MapAndCalendar from './components/wedding/MapAndCalendar';
import Footer from './components/layout/Footer';
import Gallery from './components/gallery/Gallery';
import CountdownTimer from './components/home/CountdownTimer';
import WeddingPhotos from './components/photos/WeddingPhotos';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <div className="relative font-sans text-gray-800 min-h-screen w-full">
        <main>
          <HeroSection />
          {/* Modern Countdown Timer - Moved up more */}
          <div className="-mt-20 mb-(0) w-full flex flex-col items-center bg-cream-50">
            <CountdownTimer />
          </div>
          <OurStory />
          <WeddingInfo />
          <Gallery />
          <RSVPForm />
          <MapAndCalendar />
          <WeddingPhotos />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;
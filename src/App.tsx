import HeroSection from './components/home/HeroSection';
import OurStory from './components/couple/OurStory';
import WeddingInfo from './components/wedding/WeddingInfo';
import RSVPForm from './components/rsvp/RSVPForm';
import MapAndCalendar from './components/wedding/MapAndCalendar';
import Footer from './components/layout/Footer';
import Gallery from './components/gallery/Gallery';
import CountdownTimer from './components/home/CountdownTimer';
import TextCursor from './components/home/TextCursor';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <div className="relative font-sans text-gray-800 min-h-screen w-full">
        {/* Global TextCursor overlay 
        <div className="absolute inset-0 z-[9999]">
          <TextCursor
            text="❤️"
            delay={0.01}
            spacing={80}
            followMouseDirection={true}
            randomFloat={true}
            exitDuration={0.3}
            removalInterval={20}
            maxPoints={10}
          />
        </div>*/}
        
        <main>
          <HeroSection />
          {/* Modern Countdown Timer - Moved up more */}
          <div className="-mt-18 mb-(14) w-full flex flex-col items-center">
            <CountdownTimer />
          </div>
          <OurStory />
          <WeddingInfo />
          <Gallery />
          <RSVPForm />
          <MapAndCalendar />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;
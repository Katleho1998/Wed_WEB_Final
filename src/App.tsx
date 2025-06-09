import HeroSection from './components/home/HeroSection';
import OurStory from './components/couple/OurStory';
import WeddingInfo from './components/wedding/WeddingInfo';
import RSVPForm from './components/rsvp/RSVPForm';
import MapAndCalendar from './components/wedding/MapAndCalendar';
import Footer from './components/layout/Footer';
import Gallery from './components/gallery/Gallery';
import CountdownTimer from './components/home/CountdownTimer';

function App() {
  return (
    <div className="font-sans text-gray-800">
      <main>
        <HeroSection />
        {/* Modern Countdown Timer */}
        <div className=" mb-10 w-full flex flex-col items-center">
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
  );
}

export default App;
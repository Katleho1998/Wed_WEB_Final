import React, { useState } from 'react';
import ImageModal from './ImageModal';
import CircularGallery from './CircularGallery';

// Import all couple images
import img1 from '../../assets/Couple/image 1.jpg';
import img2 from '../../assets/Couple/image 2.jpg';
import img3 from '../../assets/Couple/image 3.jpg';
import img4 from '../../assets/Couple/image 4.jpg';
import img5 from '../../assets/Couple/image 5.jpg';
import img6 from '../../assets/Couple/image 6.jpg';
import img7 from '../../assets/Couple/image 7.jpg';

// Masonry-style grid data with captions for overlays
const COUPLE_IMAGES = [
  { id: 1, src: img1, alt: 'Couple photo 1', caption: 'Thabi & Trevor', size: 'row-span-2 col-span-2' },
  { id: 2, src: img2, alt: 'Couple photo 2', caption: 'Thabi & Trevor', size: '' },
  { id: 3, src: img3, alt: 'Couple photo 3', caption: 'Thabi & Trevor', size: '' },
  { id: 4, src: img4, alt: 'Couple photo 4', caption: 'Thabi & Trevor', size: 'row-span-2' },
  { id: 5, src: img5, alt: 'Couple photo 5', caption: 'Thabi & Trevor', size: '' },
  { id: 6, src: img6, alt: 'Couple photo 6', caption: 'Thabi & Trevor', size: '' },
  { id: 7, src: img7, alt: 'Couple photo 7', caption: 'Thabi & Trevor', size: 'col-span-2' },
  // Add more images as needed, alternating size for masonry effect
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'circular' | 'grid'>('circular');

  const openModal = (imageId: number) => setSelectedImage(imageId);
  const closeModal = () => setSelectedImage(null);

  const navigateImages = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const currentIndex = COUPLE_IMAGES.findIndex(img => img.id === selectedImage);
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : COUPLE_IMAGES.length - 1;
    } else {
      newIndex = currentIndex < COUPLE_IMAGES.length - 1 ? currentIndex + 1 : 0;
    }
    setSelectedImage(COUPLE_IMAGES[newIndex].id);
  };

  return (
    <section
      id="gallery"
      className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 relative"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-5xl md:text-6xl text-center mb-8 text-blush-600 tracking-tight drop-shadow-sm">
          Gallery
        </h2>
        
        {/* View Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 rounded-full p-1 shadow-lg border border-blush-100">
            <button
              onClick={() => setViewMode('circular')}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                viewMode === 'circular'
                  ? 'bg-[#555c78] text-white shadow-md'
                  : 'text-[#555c78] hover:bg-blush-50'
              }`}
            >
              3D View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                viewMode === 'grid'
                  ? 'bg-[#555c78] text-white shadow-md'
                  : 'text-[#555c78] hover:bg-blush-50'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>

        {/* Circular Gallery View */}
        {viewMode === 'circular' && (
          <div className="mb-16">
            {/* Responsive container for 3D gallery */}
            <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] relative overflow-hidden rounded-2xl bg-gradient-to-br from-blush-50/30 to-sage-50/30">
              <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
              
              {/* Mobile instruction overlay */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
                <div className="bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                  Swipe or drag to navigate
                </div>
              </div>
              
              {/* Desktop instruction overlay */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:block">
                <div className="bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                  Click and drag or use mouse wheel to navigate
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid Gallery View */}
        {viewMode === 'grid' && (
          <div
            className="
              columns-1 sm:columns-2 md:columns-3 gap-6
              [column-fill:_balance]
              max-w-5xl mx-auto mb-16
            "
          >
            {COUPLE_IMAGES.map((image, idx) => (
              <div
                key={image.id}
                className={`
                  mb-6 break-inside-avoid
                  group relative cursor-pointer
                  rounded-2xl border border-blush-100 shadow-[0_4px_32px_0_rgba(230,164,180,0.08)]
                  overflow-hidden bg-white/80
                  transition-all duration-300
                  hover:shadow-[0_8px_40px_0_rgba(182,196,162,0.18)]
                  ${image.size}
                `}
                style={{
                  aspectRatio: idx % 4 === 0 ? '4/5' : idx % 3 === 0 ? '3/4' : '1/1',
                }}
                onClick={() => openModal(image.id)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  style={{
                    filter: 'brightness(0.98) contrast(1.03)',
                    transition: 'filter 0.4s cubic-bezier(.4,0,.2,1)',
                  }}
                />
                {/* Soft overlay with caption */}
                <div
                  className="
                    absolute inset-0 bg-gradient-to-t from-blush-400/40 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    flex items-end
                  "
                >
                  <span
                    className="
                      w-full text-center pb-6 text-[1.5rem] md:text-2xl font-serif
                      text-white drop-shadow-lg tracking-wide
                      bg-gradient-to-r from-blush-400/70 via-sage-200/60 to-cream-50/0
                      rounded-b-2xl
                      px-4
                    "
                    style={{
                      letterSpacing: '0.04em',
                      fontWeight: 500,
                      textShadow: '0 2px 12px rgba(230,164,180,0.18)',
                    }}
                  >
                    {image.caption}
                  </span>
                </div>
                {/* Delicate border highlight */}
                <div className="absolute inset-0 rounded-2xl border-2 border-blush-100 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <p className="text-blush-600 text-lg font-serif opacity-80">
            More magical moments coming soon. <span className="italic">Check back for our full wedding story!</span>
          </p>
        </div>
        
        {selectedImage !== null && (
          <ImageModal
            image={COUPLE_IMAGES.find(img => img.id === selectedImage)!}
            onClose={closeModal}
            onPrev={() => navigateImages('prev')}
            onNext={() => navigateImages('next')}
          />
        )}
      </div>
      
      {/* Soft blush floating circles for luxury accent */}
      <div className="pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blush-100 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-sage-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-20 h-20 bg-cream-50 rounded-full opacity-20 blur-2xl"></div>
      </div>
    </section>
  );
};

export default Gallery;
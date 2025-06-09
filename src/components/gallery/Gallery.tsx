import React, { useState } from 'react';
import ImageModal from './ImageModal';

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
        <h2 className="font-serif text-5xl md:text-6xl text-center mb-16 text-blush-600 tracking-tight drop-shadow-sm">
          Gallery
        </h2>
        {/* Masonry grid */}
        <div
          className="
            columns-1 sm:columns-2 md:columns-3 gap-6
            [column-fill:_balance]
            max-w-5xl mx-auto
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
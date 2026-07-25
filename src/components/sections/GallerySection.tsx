'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const imgContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // List of all FB_IMG images (unnamed pictures downloaded)
  const fbImages = [
    '/images/FB_IMG_1784914464872.jpg',
    '/images/FB_IMG_1784914468658.jpg',
    '/images/FB_IMG_1784914472528.jpg',
    '/images/FB_IMG_1784914476411.jpg',
    '/images/FB_IMG_1784914480264.jpg',
    '/images/FB_IMG_1784914484107.jpg',
    '/images/FB_IMG_1784914487987.jpg',
    '/images/FB_IMG_1784914491843.jpg',
    '/images/FB_IMG_1784914495722.jpg',
    '/images/FB_IMG_1784914499585.jpg',
    '/images/FB_IMG_1784914503452.jpg',
    '/images/FB_IMG_1784914507306.jpg',
    '/images/FB_IMG_1784914511187.jpg',
    '/images/FB_IMG_1784914515052.jpg',
    '/images/FB_IMG_1784914518913.jpg',
    '/images/FB_IMG_1784914522778.jpg',
    '/images/FB_IMG_1784914526638.jpg',
    '/images/FB_IMG_1784914530502.jpg',
    '/images/FB_IMG_1784914534362.jpg',
    '/images/FB_IMG_1784914538224.jpg',
    '/images/FB_IMG_1784914542088.jpg',
    '/images/FB_IMG_1784914545952.jpg',
    '/images/FB_IMG_1784914549816.jpg',
    '/images/FB_IMG_1784914553680.jpg',
    '/images/FB_IMG_1784914557544.jpg',
    '/images/FB_IMG_1784914561408.jpg',
    '/images/FB_IMG_1784914565272.jpg',
    '/images/FB_IMG_1784914569136.jpg',
    '/images/FB_IMG_1784914573000.jpg',
    '/images/FB_IMG_1784914576864.jpg',
    '/images/FB_IMG_1784914580728.jpg',
    '/images/FB_IMG_1784914584592.jpg',
    '/images/FB_IMG_1784914588456.jpg',
    '/images/FB_IMG_1784914592320.jpg',
    '/images/FB_IMG_1784914596184.jpg',
    '/images/FB_IMG_1784914600048.jpg',
    '/images/FB_IMG_1784914603912.jpg',
    '/images/FB_IMG_1784914607776.jpg',
    '/images/FB_IMG_1784914611640.jpg',
    '/images/FB_IMG_1784914615504.jpg',
    '/images/FB_IMG_1784914619368.jpg',
    '/images/FB_IMG_1784914623232.jpg',
    '/images/FB_IMG_1784914627096.jpg',
    '/images/FB_IMG_1784914630960.jpg',
    '/images/FB_IMG_1784914634824.jpg',
    '/images/FB_IMG_1784914638688.jpg',
    '/images/FB_IMG_1784914642552.jpg',
    '/images/FB_IMG_1784914646416.jpg',
    '/images/FB_IMG_1784914650280.jpg',
    '/images/FB_IMG_1784914654144.jpg',
    '/images/FB_IMG_1784914658008.jpg',
    '/images/FB_IMG_1784914661872.jpg',
    '/images/FB_IMG_1784914665736.jpg',
    '/images/FB_IMG_1784914669600.jpg',
    '/images/FB_IMG_1784914673464.jpg',
    '/images/FB_IMG_1784914677328.jpg',
    '/images/FB_IMG_1784914681192.jpg',
    '/images/FB_IMG_1784914685056.jpg',
    '/images/FB_IMG_1784914688920.jpg',
    '/images/FB_IMG_1784914692784.jpg',
    '/images/FB_IMG_1784914696648.jpg',
    '/images/FB_IMG_1784914700512.jpg',
    '/images/FB_IMG_1784914704376.jpg',
    '/images/FB_IMG_1784914708240.jpg',
    '/images/FB_IMG_1784914712104.jpg',
    '/images/FB_IMG_1784914715968.jpg',
    '/images/FB_IMG_1784914719832.jpg',
    '/images/FB_IMG_1784914723696.jpg',
    '/images/FB_IMG_1784914727560.jpg',
    '/images/FB_IMG_1784914731424.jpg',
    '/images/FB_IMG_17849147352835288.jpg',
    '/images/FB_IMG_1784914839152.jpg',
    '/images/FB_IMG_1784914843016.jpg',
    '/images/FB_IMG_1784914846880.jpg',
    '/images/FB_IMG_1784914850744.jpg',
    '/images/FB_IMG_1784914854608.jpg',
    '/images/FB_IMG_1784914858472.jpg',
    '/images/FB_IMG_1784914862336.jpg',
    '/images/FB_IMG_1784914866200.jpg',
    '/images/FB_IMG_1784914870064.jpg',
    '/images/FB_IMG_1784914873928.jpg',
    '/images/FB_IMG_1784914877792.jpg',
    '/images/FB_IMG_1784914881656.jpg',
    '/images/FB_IMG_1784914885520.jpg',
    '/images/FB_IMG_1784914889384.jpg',
    '/images/FB_IMG_1784914893248.jpg',
    '/images/FB_IMG_1784914897112.jpg',
    '/images/FB_IMG_1784914900976.jpg'
  ];

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (fbImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fbImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [fbImages.length]);

  // Handle image load to start fade-in
  const handleImageLoad = (index: number) => {
    if (imgContainerRefs.current[index]) {
      const imgElement = imgContainerRefs.current[index].querySelector('img');
      if (imgElement) {
        imgElement.style.opacity = '1';
        imgElement.style.transition = 'opacity 1s ease-in-out';
      }
    }
  };

  return (
    <section id="gallery" className="relative bg-luxury-black overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionTitle
          badge="Visual Stories"
          title="Gallery"
          subtitle="Visual Stories of Elegance"
        />

        {/* Slideshow Container */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
          {/* Current Image */}
          <div
            ref={(ref) => {
              if (ref) imgContainerRefs.current[currentIndex] = ref;
            }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <img
              src={fbImages[currentIndex]}
              alt={`Gallery slide ${currentIndex + 1}`}
              className="object-cover w-full h-full opacity-0"
              onLoad={() => {
                setTimeout(() => {
                  setIsVisible(true);
                }, 50);
              }}
            />
          </div>

          {/* Next Image (for crossfade) */}
          <div
            ref={(ref) => {
              if (ref) {
                const nextIndex = (currentIndex + 1) % fbImages.length;
                imgContainerRefs.current[nextIndex] = ref;
              }
            }}
            className="absolute inset-0 z-20 flex items-center justify-center opacity-0"
          >
            <img
              src={fbImages[(currentIndex + 1) % fbImages.length]}
              alt={`Gallery slide ${(currentIndex + 2) % fbImages.length + 1}`}
              className="object-cover w-full h-full opacity-0"
            />
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-300" />

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {fbImages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex
                    ? 'bg-white/70'
                    : 'bg-white/30 hover:bg-white/50 transition-colors'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
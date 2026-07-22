'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';

const galleryCategories = ['All', 'Rooms', 'Restaurant', 'Spa', 'Pool', 'Events'];

const galleryItems = [
  { id: 1, src: '/images/gallery/lobby.jpg', category: 'All', aspect: 'aspect-[4/3]' },
  { id: 2, src: '/images/rooms/presidential-1.jpg', category: 'Rooms', aspect: 'aspect-[3/4]' },
  { id: 3, src: '/images/restaurant/main.jpg', category: 'Restaurant', aspect: 'aspect-square' },
  { id: 4, src: '/images/spa/entrance.jpg', category: 'Spa', aspect: 'aspect-[4/3]' },
  { id: 5, src: '/images/pool/night.jpg', category: 'Pool', aspect: 'aspect-[16/9]' },
  { id: 6, src: '/images/events/gala.jpg', category: 'Events', aspect: 'aspect-[4/3]' },
  { id: 7, src: '/images/rooms/suite-2.jpg', category: 'Rooms', aspect: 'aspect-square' },
  { id: 8, src: '/images/restaurant/bar.jpg', category: 'Restaurant', aspect: 'aspect-[3/4]' },
  { id: 9, src: '/images/spa/treatment.jpg', category: 'Spa', aspect: 'aspect-[4/3]' },
  { id: 10, src: '/images/pool/day.jpg', category: 'Pool', aspect: 'aspect-[16/9]' },
  { id: 11, src: '/images/events/boardroom.jpg', category: 'Events', aspect: 'aspect-[4/3]' },
  { id: 12, src: '/images/gallery/exterior.jpg', category: 'All', aspect: 'aspect-square' },
];

export function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-black overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Visual Stories"
          title="Gallery"
          subtitle="Visual Stories of Elegance"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {galleryCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm transition-all duration-500 ${
                activeCategory === category
                  ? 'bg-gold-500 text-black'
                  : 'bg-white/5 text-cream/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={`${item.aspect} relative rounded-xl overflow-hidden cursor-pointer group`}
                onClick={() => setSelectedImage(item.src)}
              >
                <div className="absolute inset-0 bg-[url('/images/gallery/lobby.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-5xl w-full aspect-[16/10] rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute inset-0 bg-[url('/images/gallery/lobby.jpg')] bg-cover bg-center" />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="luxury" size="lg">
            View Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
}
'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';

const galleryCategories = ['All', 'Rooms', 'Restaurant', 'Spa', 'Pool', 'Events'];

const galleryItems = [
  { id: 1, category: 'All', aspect: 'aspect-[4/3]', image: '/images/lobby/lobby-1.jpg' },
  { id: 2, category: 'Rooms', aspect: 'aspect-[3/4]', image: '/images/rooms/standard-1.jpg' },
  { id: 3, category: 'Restaurant', aspect: 'aspect-square', image: '/images/restaurant/dining-1.jpg' },
  { id: 4, category: 'Spa', aspect: 'aspect-[4/3]', image: '/images/rooms/deluxe-1.jpg' },
  { id: 5, category: 'Pool', aspect: 'aspect-[16/9]', image: '/images/pool/pool-1.jpg' },
  { id: 6, category: 'Events', aspect: 'aspect-[4/3]', image: '/images/lobby/lobby-1.jpg' },
  { id: 7, category: 'Rooms', aspect: 'aspect-square', image: '/images/rooms/executive-1.jpg' },
  { id: 8, category: 'Restaurant', aspect: 'aspect-[3/4]', image: '/images/restaurant/terrace-1.jpg' },
  { id: 9, category: 'Spa', aspect: 'aspect-[4/3]', image: '/images/rooms/junior-suite-1.jpg' },
  { id: 10, category: 'Pool', aspect: 'aspect-[16/9]', image: '/images/pool/pool-1.jpg' },
  { id: 11, category: 'Events', aspect: 'aspect-[4/3]', image: '/images/restaurant/terrace-1.jpg' },
  { id: 12, category: 'All', aspect: 'aspect-square', image: '/images/rooms/deluxe-2.jpg' },
];

export function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');

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
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
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
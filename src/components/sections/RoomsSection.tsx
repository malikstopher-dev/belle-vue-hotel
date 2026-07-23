'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { rooms } from '@/config/data';
import { formatCurrency } from '@/lib/utils';
import { useLocale } from '@/context/LocaleContext';

export function RoomsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeRoom, setActiveRoom] = useState(0);
  const { t, locale } = useLocale();

  const getRoomName = (room: typeof rooms[0]) => locale === 'fr' && room.nameFr ? room.nameFr : locale === 'pt' && room.namePt ? room.namePt : room.name;
  const getRoomDesc = (room: typeof rooms[0]) => locale === 'fr' && room.descriptionFr ? room.descriptionFr : locale === 'pt' && room.descriptionPt ? room.descriptionPt : room.description;

  return (
    <section id="rooms" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark via-luxury-black to-luxury-dark" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/3 rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge={t('rooms.badge')}
          title={t('rooms.title')}
          subtitle={t('rooms.subtitle')}
        />

        {/* Room Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 md:mb-16">
          {rooms.map((room, i) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(i)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm transition-all duration-500 ${
                activeRoom === i
                  ? 'bg-gold-500 text-black'
                  : 'bg-white/5 text-cream/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              {getRoomName(room)}
            </button>
          ))}
        </div>

        {/* Room Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRoom}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Room Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${rooms[activeRoom].images[0]})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-4 right-4 glass-card px-4 py-2">
                  <span className="text-2xl font-display text-gold-500">
                    {formatCurrency(rooms[activeRoom].price)}
                  </span>
                  <span className="text-xs text-cream/60 ml-1">/ {t('rooms.perNight')}</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-3xl md:text-4xl font-display text-cream mb-2">
                    {getRoomName(rooms[activeRoom])}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-cream/70">
                    <span>{rooms[activeRoom].size} m²</span>
                    <span className="w-1 h-1 bg-gold-500 rounded-full" />
                    <span>{rooms[activeRoom].maxGuests} {t('rooms.guests')}</span>
                    <span className="w-1 h-1 bg-gold-500 rounded-full" />
                    <span>{rooms[activeRoom].bedType}</span>
                  </div>
                </div>
              </div>

              {/* Room Details */}
              <div>
                <h4 className="text-xl md:text-2xl font-display text-cream mb-4">
                  {getRoomName(rooms[activeRoom])}
                </h4>
                <p className="text-cream/70 font-light leading-relaxed mb-8">
                  {getRoomDesc(rooms[activeRoom])}
                </p>

                <div className="mb-8">
                  <h5 className="text-sm font-medium text-gold-500 tracking-wider uppercase mb-4">
                    {t('rooms.amenities')}
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    {rooms[activeRoom].amenities.map((amenity, i) => (
                      <motion.div
                        key={amenity}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="flex items-center gap-2 text-sm text-cream/70"
                      >
                        <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                        {amenity}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="flex-1">
                    {t('rooms.bookNow')}
                  </Button>
                  <Button variant="luxury" size="lg" className="flex-1">
                    {t('rooms.viewGallery')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Room Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 md:mt-20">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <GlassCard className="group cursor-pointer overflow-hidden" hover padding="none">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${room.images[0]})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {room.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gold-500 text-black text-xs font-medium rounded-full">
                      {t('rooms.featured')}
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-lg font-display text-cream mb-1">
                      {getRoomName(room)}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-cream/60">
                        {room.size} m² • {room.maxGuests} {t('rooms.guests')}
                      </span>
                      <span className="text-gold-500 font-display">
                        {formatCurrency(room.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

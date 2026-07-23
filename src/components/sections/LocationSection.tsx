'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { useLocale } from '@/context/LocaleContext';

const nearbyAttractions = [
  { name: 'Kinshasa Golf Club', distance: '2.5 km', categoryKey: 'leisure' as const },
  { name: 'National Museum', distance: '3.1 km', categoryKey: 'culture' as const },
  { name: 'Grand Marché', distance: '4.2 km', categoryKey: 'shopping' as const },
  { name: 'Congo River', distance: '1.8 km', categoryKey: 'nature' as const },
  { name: 'Stade des Martyrs', distance: '5.5 km', categoryKey: 'sports' as const },
  { name: 'Académie des Beaux-Arts', distance: '3.8 km', categoryKey: 'culture' as const },
];

export function LocationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { t } = useLocale();

  return (
    <section id="location" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-dark overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-500 text-xs tracking-[0.2em] uppercase border border-gold-500/20">
            {t('location.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-cream mb-4">
            {t('location.title')}
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">{t('location.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-luxury-gray">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.765432109876!2d15.3122!3d-4.3216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMTknMTcuNyJTIDE1wrAxOCc0My45IkU!5e0!3m2!1sen!2scd!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.8) contrast(1.1) brightness(0.8)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-cream text-sm">Belle Vie Hotel</div>
                  <div className="text-xs text-cream/60">16 Avenue Tombalbaye, Gombe</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-display text-cream mb-6">{t('location.nearby')}</h3>
            
            <div className="space-y-3">
              {nearbyAttractions.map((attraction, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                >
                  <GlassCard className="flex items-center justify-between p-4 group cursor-pointer" hover padding="sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gold-500 rounded-full" />
                      <div>
                        <div className="text-sm font-medium text-cream group-hover:text-gold-500 transition-colors">
                          {attraction.name}
                        </div>
                        <div className="text-xs text-cream/50">{t(`location.${attraction.categoryKey}`)}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gold-500/70">{attraction.distance}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            <GlassCard className="mt-6 p-4" variant="subtle">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚗</span>
                <div>
                  <div className="text-sm font-medium text-cream">{t('location.transportation')}</div>
                  <div className="text-xs text-cream/60">
                    {t('location.airportDesc')}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

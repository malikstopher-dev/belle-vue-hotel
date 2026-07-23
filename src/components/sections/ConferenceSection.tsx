'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { conferenceInfo } from '@/config/data';
import { useLocale } from '@/context/LocaleContext';

export function ConferenceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { t } = useLocale();

  return (
    <section id="conference" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-dark overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-500 text-xs tracking-[0.2em] uppercase border border-gold-500/20">
            {t('conference.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-cream mb-4">
            {t('conference.title')}
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">{t('conference.subtitle')}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-12"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/lobby/lobby-1.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-lg p-8 md:p-12">
              <h3 className="text-2xl md:text-4xl font-display text-cream mb-4">
                {t('conference.boardToGalas')}
              </h3>
              <p className="text-cream/70 font-light mb-6">
                {t('conference.boardDesc')}
              </p>
              <Button size="lg">{t('conference.planEvent')}</Button>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {conferenceInfo.venues.map((venue, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
            >
              <GlassCard className="h-full group cursor-pointer text-center" hover>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors duration-500">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h4 className="text-lg font-display text-cream mb-2 group-hover:text-gold-500 transition-colors">
                  {venue.name}
                </h4>
                <div className="space-y-1 text-sm text-cream/60">
                  <p>{t('conference.upToGuests').replace('{{capacity}}', String(venue.capacity))}</p>
                  <p>{venue.size}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-cream/60 mb-4">{t('conference.needHelp')}</p>
          <Button variant="luxury" size="lg">
            {t('conference.contactEvents')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

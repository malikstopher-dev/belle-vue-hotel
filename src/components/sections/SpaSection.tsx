'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { spaTreatments } from '@/config/data';
import { useLocale } from '@/context/LocaleContext';

export function SpaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { t, locale } = useLocale();

  const getTreatmentName = (treatment: typeof spaTreatments[0]) =>
    locale === 'fr' && treatment.nameFr ? treatment.nameFr :
    locale === 'pt' && treatment.namePt ? treatment.namePt :
    treatment.name;

  return (
    <section id="spa" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/3 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-luxury-accent/3 rounded-full blur-[150px]" />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/10"
              initial={{ width: 0, height: 0, opacity: 0.5 }}
              animate={{ width: [0, 800], height: [0, 800], opacity: [0.3, 0] }}
              transition={{ duration: 8, repeat: Infinity, delay: i * 2.5, ease: 'easeOut' }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-500 text-xs tracking-[0.2em] uppercase border border-gold-500/20">
            {t('spa.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-cream mb-4">
            {t('spa.title')}
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">{t('spa.subtitle')}</p>
        </div>

        {/* Spa Feature */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="relative aspect-[4/3] lg:aspect-square max-w-lg mx-auto overflow-hidden rounded-2xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/spa/spa-hero.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-8 right-8 w-16 h-16 bg-gold-500/20 rounded-full blur-xl" />
            <div className="absolute bottom-12 left-8 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl md:text-3xl font-display text-cream mb-6">
              {t('spa.sanctuary')}
            </h3>
            <p className="text-cream/70 font-light leading-relaxed mb-8">
              {t('spa.sanctuaryDesc')}
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                t('spa.feature1'),
                t('spa.feature2'),
                t('spa.feature3'),
                t('spa.feature4'),
                t('spa.feature5'),
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gold-500 rounded-full" />
                  <span className="text-sm text-cream/70">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">{t('spa.bookTreatment')}</Button>
              <Button variant="luxury" size="lg">{t('spa.viewAllTreatments')}</Button>
            </div>
          </motion.div>
        </div>

        {/* Treatments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {spaTreatments.map((treatment, i) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
            >
              <GlassCard className="h-full group cursor-pointer" hover padding="none">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${treatment.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 right-4 glass-card px-3 py-1">
                    <span className="text-xs text-gold-500">{treatment.duration} {t('spa.min')}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-xs text-gold-500/70 mb-1">{treatment.category}</div>
                    <h4 className="text-lg font-display text-cream mb-2 group-hover:text-gold-500 transition-colors">
                      {getTreatmentName(treatment)}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-gold-500 font-display">${treatment.price}</span>
                      <Button variant="ghost" size="sm">
                        {t('spa.book')}
                      </Button>
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

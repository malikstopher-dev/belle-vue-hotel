'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { experiences } from '@/config/data';
import { useLocale } from '@/context/LocaleContext';

export function ExperiencesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { t, locale } = useLocale();

  const getExpName = (exp: typeof experiences[0]) => locale === 'fr' && exp.nameFr ? exp.nameFr : locale === 'pt' && exp.namePt ? exp.namePt : exp.name;
  const getExpDesc = (exp: typeof experiences[0]) => locale === 'fr' && exp.descriptionFr ? exp.descriptionFr : locale === 'pt' && exp.descriptionPt ? exp.descriptionPt : exp.description;

  return (
    <section id="experiences" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-dark overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gold-500/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-luxury-accent/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-500 text-xs tracking-[0.2em] uppercase border border-gold-500/20">
            {t('experiences.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-cream mb-4">
            {t('experiences.title')}
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">{t('experiences.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience, i) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <GlassCard className="h-full group cursor-pointer" hover padding="none">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${experience.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 right-4 glass-card px-3 py-1">
                    <span className="text-xs text-cream/80">{experience.duration}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-xl font-display text-cream mb-2 group-hover:text-gold-500 transition-colors">
                      {getExpName(experience)}
                    </h4>
                    <p className="text-sm text-cream/60 mb-4 line-clamp-2">
                      {getExpDesc(experience)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-display text-gold-500">
                        {t('experiences.from')} ${experience.price}
                      </span>
                      <Button variant="ghost" size="sm">
                        {t('experiences.bookNow')}
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <GlassCard className="inline-block px-8 py-6">
            <p className="text-cream/70 mb-4">
              {t('experiences.customDesc')}
            </p>
            <Button variant="luxury" size="lg">
              {t('experiences.contactConcierge')}
            </Button>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

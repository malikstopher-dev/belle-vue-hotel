'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { gymInfo } from '@/config/data';
import { useLocale } from '@/context/LocaleContext';

export function GymSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { t } = useLocale();

  return (
    <section id="gym" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/3 rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-500 text-xs tracking-[0.2em] uppercase border border-gold-500/20">
            {t('gym.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-cream mb-4">
            {t('gym.title')}
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">{t('gym.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { name: t('gym.technogym'), icon: '🏋️', desc: t('gym.technogymDesc') },
              { name: t('gym.yogaStudio'), icon: '🧘', desc: t('gym.yogaDesc') },
              { name: t('gym.personalTraining'), icon: '💪', desc: t('gym.trainingDesc') },
              { name: t('gym.steamSauna'), icon: '♨️', desc: t('gym.steamDesc') },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="text-center p-6 md:p-8" hover>
                  <div className="text-4xl md:text-5xl mb-4">{item.icon}</div>
                  <h4 className="text-lg font-display text-cream mb-1">{item.name}</h4>
                  <p className="text-xs text-cream/50">{item.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-display text-cream mb-6">
              {t('gym.elevateTitle')}
            </h3>
            <p className="text-cream/70 font-light leading-relaxed mb-8">
              {t('gym.elevateDesc')}
            </p>

            <div className="space-y-4 mb-8">
              {gymInfo.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gold-500 rounded-full" />
                  <span className="text-sm text-cream/70">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-cream/70">{t('gym.open247')}</span>
            </div>

            <Button size="lg">{t('gym.meetTrainers')}</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

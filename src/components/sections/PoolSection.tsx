'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { poolInfo } from '@/config/data';
import { useLocale } from '@/context/LocaleContext';

export function PoolSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { t } = useLocale();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="pool" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-dark overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-dark to-luxury-black" />
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                left: '-100%',
                right: '-100%',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-500 text-xs tracking-[0.2em] uppercase border border-gold-500/20">
              {t('pool.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-cream mb-6 leading-tight">
              {t('pool.title')}
              <span className="block text-gold-500 mt-2">{t('pool.subtitle')}</span>
            </h2>
            <p className="text-cream/70 font-light leading-relaxed mb-8">
              {poolInfo.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {poolInfo.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                  <span className="text-sm text-cream/70">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-cream/70">{t('pool.open')}: {poolInfo.hours}</span>
            </div>
          </motion.div>

          <motion.div style={{ y }} className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/images/pool/pool-1.jpg)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/60 to-transparent" />
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gold-500/10 to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3], scaleY: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>

            <motion.div
              className="absolute -bottom-6 -left-4 md:left-8 glass-card p-4 max-w-[200px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="text-sm text-cream/70">{t('pool.floatingDesc')}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

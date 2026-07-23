'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useLocale } from '@/context/LocaleContext';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { t, locale } = useLocale();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const titleParts = t('hero.title').split(' ');

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] overflow-hidden bg-luxury-black"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div style={{ y: y1, scale }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/exterior/exterior-1.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y: y2 }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 md:pt-36"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 md:mb-8"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white text-xs md:text-sm tracking-[0.2em] uppercase">
              {locale === 'fr' ? 'Hôtel de Luxe 5 Étoiles' : 'Five Star Luxury Hotel'}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-white leading-[0.95] tracking-tight mb-6"
          >
            {titleParts.length > 3 ? (
              <>
                <span className="block">{titleParts.slice(0, 3).join(' ')}</span>
                <span className="block mt-2">{titleParts.slice(3).join(' ')}</span>
              </>
            ) : (
              <span className="block">{t('hero.title')}</span>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl mx-auto text-base md:text-lg text-white/80 font-light leading-relaxed mb-10"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="min-w-[200px]">
              {t('hero.cta')}
            </Button>
            <Button variant="luxury" size="lg" className="min-w-[200px]">
              {t('hero.ctaSecondary')}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 md:mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto"
          >
            {[
              { value: '5 Star', label: locale === 'fr' ? 'Classement' : 'Rating' },
              { value: '120+', label: locale === 'fr' ? 'Chambres' : 'Rooms' },
              { value: '24/7', label: locale === 'fr' ? 'Service' : 'Service' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl md:text-2xl font-display text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs text-white/60 tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/50 tracking-widest uppercase">
            {locale === 'fr' ? 'Défiler' : 'Scroll'}
          </span>
          <div className="w-[1px] h-8 bg-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}

'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useMousePosition } from '@/hooks';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition();
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const smoothX = useSpring(x, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] overflow-hidden bg-luxury-black"
    >
      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* Main Background Image with Parallax */}
        <motion.div
          style={{ y: y1, scale }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
        </motion.div>

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-luxury-accent/5 animate-gradient-flow" />

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.03%22/%3E%3C/svg%3E')]" />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold-500/30 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              }}
              animate={{
                y: [null, -1000],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Lens Flare Effect */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px]"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            x: useTransform(smoothX, [-500, 500], [-30, 30]),
            y: useTransform(smoothY, [-500, 500], [-30, 30]),
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y: y2 }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/5 text-gold-500 text-xs tracking-[0.3em] uppercase">
              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse" />
              Five Star Luxury Hotel
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-cream leading-[0.95] tracking-tight mb-6"
          >
            <span className="block">Where Luxury</span>
            <span className="block mt-2">
              Meets{' '}
              <span className="relative inline-block">
                <span className="gold-gradient-text">Serenity</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={isLoaded ? { scaleX: 1 } : {}}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-cream/70 font-light leading-relaxed mb-12"
          >
            An intimate sanctuary in the heart of Kinshasa, where every moment is crafted with elegance and every detail whispers luxury.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="group min-w-[200px]">
              <span className="relative z-10 flex items-center gap-2">
                Explore Our World
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </Button>
            <Button variant="luxury" size="lg" className="min-w-[200px]">
              Book Your Stay
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: '5★', label: 'Luxury Rating' },
              { value: '120+', label: 'Premium Rooms' },
              { value: '24/7', label: 'Concierge' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-display text-gold-500 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-cream/50 tracking-wider uppercase">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-cream/40 tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold-500/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Side Decorative Elements */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isLoaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
          <span className="text-xs text-gold-500/50 tracking-widest [writing-mode:vertical-lr] rotate-180">
            EST. 2020
          </span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
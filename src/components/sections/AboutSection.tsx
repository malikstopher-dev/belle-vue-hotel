'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';

const stats = [
  { value: '2020', label: 'Year Established' },
  { value: '119', label: 'Rooms & Suites' },
  { value: '3★', label: 'Star Rating' },
  { value: '7.5', label: 'Guest Rating' },
];

const features = [
  {
    title: 'Prime Location',
    description: 'Located in the heart of Gombe, Kinshasa\'s diplomatic and business district, steps from the Botanic Garden and Central Market.',
    icon: '🏛️',
    image: '/images/lobby/lobby-1.jpg',
  },
  {
    title: 'Dining & Bar',
    description: 'Enjoy Indian and international cuisine at our restaurant, complimentary buffet breakfast, and refreshing cocktails at the bar.',
    icon: '🍽️',
    image: '/images/restaurant/dining-1.jpg',
  },
  {
    title: 'Pool & Garden',
    description: 'Relax at our outdoor swimming pool with waterslide, surrounded by a lush garden oasis in the city.',
    icon: '🧖',
    image: '/images/pool/pool-1.jpg',
  },
  {
    title: 'Business & Events',
    description: 'Full conference center, meeting rooms, and banquet hall for corporate events, weddings, and celebrations.',
    icon: '✨',
    image: '/images/restaurant/terrace-1.jpg',
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-dark overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-luxury-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Our Story"
          title="A Legacy of Elegance"
          subtitle="The Art of Luxury Hospitality"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/images/exterior/exterior-1.jpg)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Floating Card */}
            <motion.div
              style={{ y }}
              className="hidden md:block absolute -bottom-8 -right-4 md:right-8 glass-card p-6 max-w-[280px]"
            >
              <div className="text-4xl font-display text-gold-500 mb-2">5+</div>
              <div className="text-sm text-cream/70">Years of excellence in luxury hospitality, creating unforgettable experiences for discerning travelers.</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-2xl md:text-3xl font-display text-cream mb-6 leading-relaxed">
              Nestled in the prestigious Gombe district of Kinshasa, Belle Vie Hotel is a beacon of refined luxury.
            </h3>
            <div className="space-y-4 text-cream/70 font-light leading-relaxed">
              <p>
                Our intimate collection of suites and world-class amenities create an atmosphere where sophistication meets warmth, and every guest becomes part of our story.
              </p>
              <p>
                From the moment you step through our doors, you are embraced by an ambiance of understated elegance. Every detail, from the hand-selected artworks to the bespoke furnishings, has been carefully curated to create an experience that transcends the ordinary.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                >
                  <div className="text-2xl md:text-3xl font-display text-gold-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-cream/50 tracking-wider uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
            >
              <GlassCard className="h-full group cursor-pointer overflow-hidden" hover padding="none">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${feature.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <h4 className="text-base font-display text-cream mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-cream/60 font-light leading-relaxed">
                      {feature.description}
                    </p>
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
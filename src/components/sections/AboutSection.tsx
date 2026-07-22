'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';

const stats = [
  { value: '2020', label: 'Year Established' },
  { value: '120+', label: 'Luxury Rooms' },
  { value: '5★', label: 'Star Rating' },
  { value: '50+', label: 'Awards Won' },
];

const features = [
  {
    title: 'Architectural Marvel',
    description: 'A masterpiece of contemporary African design, blending local artistry with international luxury standards.',
    icon: '🏛️',
  },
  {
    title: 'World-Class Dining',
    description: 'Three distinct restaurants offering culinary journeys from Congolese traditions to international fine dining.',
    icon: '🍽️',
  },
  {
    title: 'Wellness Sanctuary',
    description: 'A 2,000 sqm spa featuring treatments inspired by African healing traditions and modern wellness science.',
    icon: '🧖',
  },
  {
    title: 'Exclusive Experiences',
    description: 'From private Congo River cruises to curated city tours, every moment is designed to create lasting memories.',
    icon: '✨',
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
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/about.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Floating Card */}
            <motion.div
              style={{ y }}
              className="absolute -bottom-8 -right-4 md:right-8 glass-card p-6 max-w-[280px]"
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
              <GlassCard className="h-full group cursor-pointer" hover>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-display text-cream mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-cream/60 font-light leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
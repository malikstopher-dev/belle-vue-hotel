'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { gymInfo } from '@/config/data';

export function GymSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="gym" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/3 rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Fitness"
          title="Fitness Center"
          subtitle="State-of-the-Art Wellness"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Equipment Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { name: 'Technogym', icon: '🏋️', desc: 'Premium Equipment' },
              { name: 'Yoga Studio', icon: '🧘', desc: 'Daily Classes' },
              { name: 'Personal Training', icon: '💪', desc: 'Expert Trainers' },
              { name: 'Steam & Sauna', icon: '♨️', desc: 'Full Recovery' },
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

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-display text-cream mb-6">
              Elevate Your Fitness Journey
            </h3>
            <p className="text-cream/70 font-light leading-relaxed mb-8">
              Our state-of-the-art fitness center features the latest Technogym equipment, personal training services, and a dedicated yoga studio. Whether you&apos;re maintaining your routine or starting fresh, our expert trainers are here to guide you.
            </p>

            {/* Features */}
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
              <span className="text-sm text-cream/70">Open 24/7 for hotel guests</span>
            </div>

            <Button size="lg">Meet Our Trainers</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
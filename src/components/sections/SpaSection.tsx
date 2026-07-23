'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { spaTreatments } from '@/config/data';

export function SpaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);

  return (
    <section id="spa" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/3 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-luxury-accent/3 rounded-full blur-[150px]" />
        
        {/* Water Ripple Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/10"
              initial={{ width: 0, height: 0, opacity: 0.5 }}
              animate={{
                width: [0, 800],
                height: [0, 800],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Wellness"
          title="Spa & Wellness"
          subtitle="Rejuvenate Your Body & Soul"
        />

        {/* Spa Feature */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 md:mb-20">
          {/* 3D Stone Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="relative aspect-square max-w-sm md:max-w-lg mx-auto"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
              style={{ backgroundImage: 'url(/images/lobby/lobby-1.jpg)' }}
            />
            {/* Floating Stones */}
            {[
              { x: '30%', y: '20%', size: 120, delay: 0 },
              { x: '60%', y: '35%', size: 80, delay: 0.5 },
              { x: '45%', y: '65%', size: 100, delay: 1 },
              { x: '25%', y: '75%', size: 60, delay: 1.5 },
              { x: '70%', y: '70%', size: 70, delay: 2 },
            ].map((stone, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-luxury-gray to-luxury-dark border border-white/10 shadow-luxury"
                style={{
                  left: stone.x,
                  top: stone.y,
                  width: stone.size,
                  height: stone.size,
                }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: stone.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
            
            {/* Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold-500/20 rounded-full blur-3xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl md:text-3xl font-display text-cream mb-6">
              A Sanctuary of Tranquility
            </h3>
            <p className="text-cream/70 font-light leading-relaxed mb-8">
              Our 2,000 sqm spa is a haven of peace, where ancient African healing traditions meet modern wellness science. Each treatment is a journey, designed to restore balance and revitalize your spirit.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                'Heated treatment rooms with ambient lighting',
                'Private couples\' suites with jacuzzi',
                'Traditional Congolese healing rituals',
                'Premium skincare by Bamford',
                'Dedicated relaxation lounge',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gold-500 rounded-full" />
                  <span className="text-sm text-cream/70">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">Book Treatment</Button>
              <Button variant="luxury" size="lg">View All Treatments</Button>
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
              <GlassCard
                className="h-full group cursor-pointer"
                hover
                padding="none"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-luxury-gray to-luxury-dark transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 right-4 glass-card px-3 py-1">
                    <span className="text-xs text-gold-500">{treatment.duration} min</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-xs text-gold-500/70 mb-1">{treatment.category}</div>
                    <h4 className="text-lg font-display text-cream mb-2 group-hover:text-gold-500 transition-colors">
                      {treatment.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-gold-500 font-display">${treatment.price}</span>
                      <Button variant="ghost" size="sm">
                        Book
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
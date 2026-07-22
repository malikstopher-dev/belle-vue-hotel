'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { experiences } from '@/config/data';

export function ExperiencesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="experiences" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gold-500/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-luxury-accent/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Curated Experiences"
          title="Discover Kinshasa"
          subtitle="Curated Moments of Discovery"
        />

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
                  <div className="absolute inset-0 bg-[url('/images/experiences/transfer.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 glass-card px-3 py-1">
                    <span className="text-xs text-cream/80">{experience.duration}</span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-xl font-display text-cream mb-2 group-hover:text-gold-500 transition-colors">
                      {experience.name}
                    </h4>
                    <p className="text-sm text-cream/60 mb-4 line-clamp-2">
                      {experience.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-display text-gold-500">
                        From ${experience.price}
                      </span>
                      <Button variant="ghost" size="sm">
                        Book Now →
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <GlassCard className="inline-block px-8 py-6">
            <p className="text-cream/70 mb-4">
              Need a custom experience? Our concierge team can create a bespoke itinerary just for you.
            </p>
            <Button variant="luxury" size="lg">
              Contact Concierge
            </Button>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
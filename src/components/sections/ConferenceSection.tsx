'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { conferenceInfo } from '@/config/data';

export function ConferenceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="conference" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Events"
          title="Events & Meetings"
          subtitle="Corporate Luxury Redefined"
        />

        {/* Main Feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-12"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/lobby/lobby-1.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-lg p-8 md:p-12">
              <h3 className="text-2xl md:text-4xl font-display text-cream mb-4">
                From Board Meetings to Grand Galas
              </h3>
              <p className="text-cream/70 font-light mb-6">
                Our versatile spaces accommodate 10 to 500 guests, with cutting-edge technology and impeccable service.
              </p>
              <Button size="lg">Plan Your Event</Button>
            </div>
          </div>
        </motion.div>

        {/* Venues Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {conferenceInfo.venues.map((venue, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
            >
              <GlassCard className="h-full group cursor-pointer text-center" hover>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors duration-500">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h4 className="text-lg font-display text-cream mb-2 group-hover:text-gold-500 transition-colors">
                  {venue.name}
                </h4>
                <div className="space-y-1 text-sm text-cream/60">
                  <p>Up to {venue.capacity} guests</p>
                  <p>{venue.size}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-cream/60 mb-4">Need help planning your event?</p>
          <Button variant="luxury" size="lg">
            Contact Events Team
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
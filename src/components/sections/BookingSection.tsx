'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';

export function BookingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    roomType: '',
    specialRequests: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
  };

  return (
    <section id="booking" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/booking-bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark via-luxury-dark/95 to-luxury-dark" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Reservations"
          title="Reserve Your Experience"
          subtitle="Begin Your Journey"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <GlassCard className="p-6 md:p-10 lg:p-12" variant="strong">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Check-in */}
                <div>
                  <label className="block text-xs text-gold-500 tracking-wider uppercase mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold-500/50 transition-colors"
                  />
                </div>

                {/* Check-out */}
                <div>
                  <label className="block text-xs text-gold-500 tracking-wider uppercase mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold-500/50 transition-colors"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs text-gold-500 tracking-wider uppercase mb-2">
                    Guests
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cream hover:bg-white/10 transition-colors"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-cream font-medium">{formData.adults}</span>
                      <span className="text-xs text-cream/50 ml-1">adults</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, adults: Math.min(10, formData.adults + 1) })}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cream hover:bg-white/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-xs text-gold-500 tracking-wider uppercase mb-2">
                    Room Type
                  </label>
                  <select
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold-500/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-luxury-dark">Select Room</option>
                    <option value="deluxe" className="bg-luxury-dark">Deluxe Room - $280</option>
                    <option value="premium" className="bg-luxury-dark">Premium Suite - $450</option>
                    <option value="executive" className="bg-luxury-dark">Executive Suite - $680</option>
                    <option value="presidential" className="bg-luxury-dark">Presidential Suite - $1,500</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="mb-8">
                <label className="block text-xs text-gold-500 tracking-wider uppercase mb-2">
                  Special Requests
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  rows={3}
                  placeholder="Anniversary, dietary requirements, early check-in..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-cream/50">
                  <span className="text-gold-500">Best Rate Guarantee</span> • Free cancellation up to 24 hours
                </div>
                <Button type="submit" size="xl" className="w-full sm:w-auto">
                  Check Availability
                </Button>
              </div>
            </form>
          </GlassCard>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-8"
        >
          {[
            'Secure Booking',
            'Best Price Guarantee',
            'Free Cancellation',
            '24/7 Support',
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-cream/50">
              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
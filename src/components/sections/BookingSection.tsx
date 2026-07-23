'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { rooms } from '@/config/data';
import { useLocale } from '@/context/LocaleContext';

export function BookingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { t } = useLocale();
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
  };

  return (
    <section id="booking" ref={sectionRef} className="relative py-24 md:py-32 bg-luxury-dark overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-luxury-gray to-luxury-dark opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark via-luxury-dark/95 to-luxury-dark" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-500 text-xs tracking-[0.2em] uppercase border border-gold-500/20">
            {t('booking.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-cream mb-4">
            {t('booking.title')}
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">{t('booking.subtitle')}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <GlassCard className="p-6 md:p-10 lg:p-12" variant="strong">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div>
                  <label className="block text-xs text-gold-500 tracking-wider uppercase mb-2">
                    {t('booking.checkIn')}
                  </label>
                  <input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gold-500 tracking-wider uppercase mb-2">
                    {t('booking.checkOut')}
                  </label>
                  <input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gold-500 tracking-wider uppercase mb-2">
                    {t('booking.adults')}
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
                      <span className="text-xs text-cream/50 ml-1">{t('booking.adults').toLowerCase()}</span>
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

                <div>
                  <label className="block text-xs text-gold-500 tracking-wider uppercase mb-2">
                    {t('booking.roomType')}
                  </label>
                  <select
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold-500/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-luxury-dark">{t('booking.selectRoom')}</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.slug} className="bg-luxury-dark">
                        {room.name} - ${room.price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xs text-gold-500 tracking-wider uppercase mb-2">
                  {t('booking.specialRequests')}
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  rows={3}
                  placeholder={t('booking.specialPlaceholder')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-cream/50">
                  <span className="text-gold-500">{t('booking.bestRate')}</span> • {t('booking.freeCancellation')}
                </div>
                <Button type="submit" size="xl" className="w-full sm:w-auto">
                  {t('booking.availability')}
                </Button>
              </div>
            </form>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-8"
        >
          {[
            t('booking.secureBooking'),
            t('booking.bestPrice'),
            t('booking.freeCancel'),
            t('booking.support247'),
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

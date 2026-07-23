'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { rooms } from '@/config/data';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

const allAmenities = [
  'Free WiFi',
  'Air Conditioning',
  'Smart TV 42"',
  'Minibar',
  'Select Comfort Mattress',
  'Daily Housekeeping',
  '24hr Room Service',
  'Free Breakfast',
];

const amenityIcons: Record<string, string> = {
  'Free WiFi': '📶',
  'Air Conditioning': '❄️',
  'Smart TV 42"': '📺',
  'Minibar': '🍷',
  'Select Comfort Mattress': '🛏️',
  'Daily Housekeeping': '✨',
  '24hr Room Service': '🍽️',
  'Free Breakfast': '🥐',
};

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/images/exterior/exterior-1.jpg"
          alt="Hotel Belle Vie Exterior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-block mb-6 px-5 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 backdrop-blur-sm">
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">
              Hotel Belle Vie Kinshasa
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-luxury-cream text-center leading-[0.9] tracking-tight"
        >
          <span className="block">Luxury</span>
          <span className="block text-gold-500 italic font-light mt-2">Rooms & Suites</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 text-luxury-silver text-lg md:text-xl max-w-xl text-center font-light leading-relaxed"
        >
          Exquisite sanctuaries crafted for the discerning traveler. Every detail whispers elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-10"
        >
          <Button variant="luxury" size="lg">
            Explore Our Rooms
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-luxury-silver/50 text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-[1px] h-8 bg-gradient-to-b from-gold-500 to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function RoomCard({ room, index }: { room: (typeof rooms)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      <GlassCard variant="strong" padding="none" className="group overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="relative h-64 sm:h-72 lg:h-[420px] lg:w-1/2 overflow-hidden">
            <Image
              src={room.images[0]}
              alt={room.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />
            {room.featured && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-gold-500 text-black text-xs font-bold tracking-wider uppercase rounded-full">
                Most Popular
              </div>
            )}
            <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
              <div className="text-gold-400 text-xs tracking-[0.2em] uppercase mb-1">
                From
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl lg:text-5xl font-display text-luxury-cream font-bold">
                  ${room.price}
                </span>
                <span className="text-luxury-silver text-sm">/night</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-2xl lg:text-3xl text-luxury-cream mb-1">
                    {room.name}
                  </h3>
                  <div className="flex items-center gap-3 text-luxury-silver text-sm">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                      {room.size}m²
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gold-500/50" />
                    <span>{room.bedType}</span>
                    <span className="w-1 h-1 rounded-full bg-gold-500/50" />
                    <span>Up to {room.maxGuests} guests</span>
                  </div>
                </div>
              </div>
              <p className="text-luxury-silver leading-relaxed mb-6 text-sm lg:text-base">
                {room.description}
              </p>

              {/* Amenities */}
              <div className="mb-6">
                <h4 className="text-xs text-gold-500/70 tracking-[0.15em] uppercase mb-3">
                  Room Amenities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 6).map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-luxury-silver"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 6 && (
                    <span className="px-3 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-full text-xs text-gold-400">
                      +{room.amenities.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="default" size="lg" className="flex-1">
                Reserve Now
              </Button>
              <Button variant="luxury" size="lg" className="flex-1">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const comparisonAmenities = [
    'Free WiFi',
    'Air Conditioning',
    'Smart TV 42"',
    'Minibar',
    'Select Comfort Mattress',
    'Daily Housekeeping',
    '24hr Room Service',
    'Free Breakfast',
    'Sitting Area',
    'Private Study',
    'Premium Butler',
    'Bose Sound System',
  ];

  const roomAmenityMap: Record<string, string[]> = {
    'standard-room': [
      'Free WiFi',
      'Air Conditioning',
      'Smart TV 42"',
      'Minibar',
      'Daily Housekeeping',
      '24hr Room Service',
    ],
    'deluxe-room': [
      'Free WiFi',
      'Air Conditioning',
      'Smart TV 42"',
      'Minibar',
      'Select Comfort Mattress',
      'Sitting Area',
      'Daily Housekeeping',
      '24hr Room Service',
    ],
    'junior-suite': [
      'Free WiFi',
      'Air Conditioning',
      'Smart TV 42"',
      'Minibar',
      'Select Comfort Mattress',
      'Daily Housekeeping',
      '24hr Room Service',
      'Free Breakfast',
    ],
    'executive-suite': [
      'Free WiFi',
      'Air Conditioning',
      'Smart TV 42"',
      'Minibar',
      'Select Comfort Mattress',
      'Private Study',
      'Premium Butler',
      'Bose Sound System',
      'Daily Housekeeping',
      '24hr Room Service',
      'Free Breakfast',
    ],
  };

  return (
    <section ref={ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionTitle
        badge="Room Comparison"
        title="Find Your Perfect Match"
        subtitle="Compare our rooms side by side to find the ideal sanctuary for your stay."
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <GlassCard variant="strong" padding="none" className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-5 text-luxury-silver text-xs tracking-wider uppercase font-medium">
                  Amenities
                </th>
                {rooms.map((room) => (
                  <th
                    key={room.id}
                    className="p-5 text-center"
                  >
                    <div className="text-luxury-cream font-display text-sm">{room.name}</div>
                    <div className="text-gold-400 text-lg font-display mt-1">${room.price}</div>
                    <div className="text-luxury-silver/60 text-xs">/night</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonAmenities.map((amenity, i) => (
                <tr
                  key={amenity}
                  className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
                >
                  <td className="p-4 text-luxury-silver text-sm pl-5">{amenity}</td>
                  {rooms.map((room) => (
                    <td key={room.id} className="p-4 text-center">
                      {roomAmenityMap[room.id]?.includes(amenity) ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gold-500/15">
                          <svg
                            className="w-4 h-4 text-gold-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/5">
                          <svg
                            className="w-4 h-4 text-white/15"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </motion.div>
    </section>
  );
}

function AmenitiesOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionTitle
        badge="Hotel Amenities"
        title="Curated for Your Comfort"
        subtitle="Every room includes our signature collection of premium amenities and services."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {allAmenities.map((amenity, i) => (
          <motion.div
            key={amenity}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <GlassCard className="text-center group hover:border-gold-500/30 h-full">
              <div className="text-3xl md:text-4xl mb-4">{amenityIcons[amenity]}</div>
              <h3 className="text-luxury-cream text-sm md:text-base font-medium mb-2">{amenity}</h3>
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto mt-3 group-hover:w-12 transition-all duration-500" />
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function BookingCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-16">
          {/* Background image */}
          <Image
            src="/images/exterior/exterior-1.jpg"
            alt="Hotel Belle Vie"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="absolute inset-0 border border-gold-500/10 rounded-3xl" />

          <div className="relative z-10">
            <div className="inline-block mb-6 px-5 py-2 rounded-full border border-gold-500/30 bg-gold-500/10">
              <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">
                Book Your Escape
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-luxury-cream mb-6 leading-tight">
              Reserve Your Stay
            </h2>

            <p className="text-luxury-silver text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
              Experience the pinnacle of hospitality in Kinshasa. Your dream room awaits.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="default" size="xl">
                Book Direct & Save
              </Button>
              <Button variant="luxury" size="xl">
                Call Reservations
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-luxury-silver/60 text-sm">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                Best Rate Guarantee
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Free Cancellation
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                </svg>
                Secure Booking
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function RoomsPage() {
  return (
    <main className="relative bg-luxury-dark min-h-screen">
      {/* Fixed Back Button */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-luxury-cream hover:border-gold-500/30 hover:text-gold-400 transition-all duration-300 group"
      >
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span className="text-sm font-medium">Home</span>
      </Link>

      {/* Hero */}
      <HeroSection />

      {/* 3D Scene */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark via-[#0d0d0d] to-luxury-dark" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Immersive Preview"
            title="Step Inside"
            subtitle="Experience our rooms in an entirely new dimension."
          />
          <div className="h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-white/5">
            <Scene3D />
          </div>
        </div>
      </section>

      {/* Room Categories */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionTitle
          badge="Our Collection"
          title="Rooms & Suites"
          subtitle="Each room is a masterpiece of design, blending contemporary African elegance with world-class comfort."
        />
        <div className="space-y-8">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Amenities Overview */}
      <AmenitiesOverview />

      {/* Booking CTA */}
      <BookingCTA />

      {/* Footer */}
      <footer className="relative bg-luxury-dark border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <img src="/images/logo.svg" alt="Hotel Belle Vie" className="h-10 w-auto" />
                <div>
                  <div className="font-display text-xl text-luxury-cream tracking-wider">
                    {siteConfig.name}
                  </div>
                  <div className="text-[10px] text-gold-500/70 tracking-[0.3em] uppercase">
                    Kinshasa
                  </div>
                </div>
              </Link>
              <p className="text-sm text-luxury-silver leading-relaxed">
                Where luxury meets serenity. An intimate sanctuary in the heart of Kinshasa, crafting unforgettable moments since 2020.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-luxury-cream tracking-wider uppercase mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'About Us', href: '/' },
                  { label: 'Rooms & Suites', href: '/rooms' },
                  { label: 'Restaurant', href: '/' },
                  { label: 'Spa & Wellness', href: '/' },
                  { label: 'Gallery', href: '/' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-luxury-silver hover:text-gold-500 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-luxury-cream tracking-wider uppercase mb-6">
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="text-sm text-luxury-silver">
                  {siteConfig.contact.address}
                </li>
                <li>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-sm text-luxury-silver hover:text-gold-500 transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-luxury-silver hover:text-gold-500 transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-luxury-cream tracking-wider uppercase mb-6">
                Reservation
              </h3>
              <p className="text-sm text-luxury-silver mb-4">
                Ready to experience luxury? Contact our reservations team.
              </p>
              <Button variant="luxury" size="lg" className="w-full">
                Book Now
              </Button>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-luxury-silver/60">
                © 2024 Belle Vie Hotel. All rights reserved.
              </p>
              <div className="flex gap-6">
                {['Privacy Policy', 'Terms of Service', 'Cancellation Policy'].map((label) => (
                  <span
                    key={label}
                    className="text-xs text-luxury-silver/60 hover:text-gold-500 transition-colors duration-300 cursor-pointer"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

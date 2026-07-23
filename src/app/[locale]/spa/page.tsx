'use client';

import React, { useRef, useEffect, Suspense, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { siteConfig } from '@/config/site';
import dynamic from 'next/dynamic';

const SpaCanvas = dynamic(() => import('@/components/three/SpaCanvas'), { ssr: false });

const spaTreatments = [
  {
    id: 'congolese-stone',
    name: 'Congolese Hot Stone Massage',
    description: 'Ancient healing tradition meets modern luxury. Warm volcanic stones melt away tension while aromatic oils nourish the skin.',
    duration: 90,
    price: 180,
    category: 'Massage',
    image: '/images/spa/stone-massage.jpg',
  },
  {
    id: 'diamond-facial',
    name: 'Diamond Radiance Facial',
    description: 'Indulge in our signature facial featuring diamond-infused serums that leave your skin luminous and youthful.',
    duration: 75,
    price: 250,
    category: 'Facial',
    image: '/images/spa/diamond-facial.jpg',
  },
  {
    id: 'river-ritual',
    name: 'Congo River Ritual',
    description: 'A holistic body treatment inspired by the mighty Congo River. Exfoliation, wrap, and massage in perfect harmony.',
    duration: 120,
    price: 320,
    category: 'Body Treatment',
    image: '/images/spa/river-ritual.jpg',
  },
  {
    id: 'bamboo-balance',
    name: 'Bamboo Balance Therapy',
    description: 'Eastern wisdom meets African soul. Bamboo sticks are used to release deep-seated tension and restore energy flow.',
    duration: 60,
    price: 140,
    category: 'Massage',
    image: '/images/spa/bamboo.jpg',
  },
  {
    id: 'shea-body-wrap',
    name: 'African Shea Body Wrap',
    description: 'Pure African shea butter and botanical extracts cocoon your body in deep hydration and radiant nourishment.',
    duration: 90,
    price: 160,
    category: 'Body Treatment',
    image: '/images/spa/shea-wrap.jpg',
  },
  {
    id: 'volcanic-scrub',
    name: 'Volcanic Ash Scrub',
    description: 'Mineral-rich volcanic ash gently exfoliates and detoxifies, revealing smooth, revitalized skin beneath.',
    duration: 45,
    price: 120,
    category: 'Body Treatment',
    image: '/images/spa/volcanic-scrub.jpg',
  },
];

const wellnessFeatures = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    title: 'Heated Treatment Rooms',
    description: 'Individually climate-controlled rooms with ambient lighting for optimal comfort.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Private Couples' Suites",
    description: 'Intimate treatment suites with private jacuzzi for shared relaxation experiences.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: 'Traditional Congolese Healing',
    description: 'Authentic healing rituals passed down through generations of Congolese healers.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'Premium Skincare by Bamford',
    description: 'Exclusive use of Bamford organic skincare for unparalleled results.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: 'Dedicated Relaxation Lounge',
    description: 'A serene space to unwind before and after treatments with herbal teas.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Sauna & Steam Room',
    description: 'Finnish sauna and eucalyptus steam room for deep detoxification and renewal.',
  },
];

export default function SpaPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const treatmentsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.15], [0, -80]);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const storyInView = useInView(storyRef, { once: true, amount: 0.2 });
  const treatmentsInView = useInView(treatmentsRef, { once: true, amount: 0.1 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.15 });
  const bookingInView = useInView(bookingRef, { once: true, amount: 0.2 });
  const footerInView = useInView(footerRef, { once: true, amount: 0.2 });

  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);

  return (
    <main className="relative bg-luxury-black min-h-screen">
      {/* Back to Home */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 group flex items-center gap-2 glass-card px-4 py-2.5 rounded-full hover:border-gold-500/30 transition-all duration-500"
      >
        <svg
          className="w-4 h-4 text-gold-500 group-hover:-translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span className="text-sm text-cream/80 font-light tracking-wide hidden sm:inline">Home</span>
      </Link>

      {/* ═══════════════════════════════════════════ HERO ═══════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/spa/spa-hero.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/70 via-luxury-black/40 to-luxury-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/50 via-transparent to-luxury-black/50" />
        </div>

        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          style={{ y: heroTextY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-block mb-6 px-6 py-2 rounded-full bg-gold-500/10 border border-gold-500/20">
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-gold-400">
                Hotel Belle Vie · Spa & Wellness
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-cream leading-[0.95] tracking-tight mb-8"
          >
            <span className="block">Where</span>
            <span className="block bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
              Stillness
            </span>
            <span className="block">Begins</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg sm:text-xl text-cream/60 font-light max-w-2xl mx-auto leading-relaxed mb-10"
          >
            A 2,000 sqm sanctuary where ancient African healing traditions converge with modern wellness science. Your journey to renewal begins here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="min-w-[200px]">
              Book Treatment
            </Button>
            <Button variant="luxury" size="lg" className="min-w-[200px]">
              Explore Rituals
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-gold-500/60 tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-8 bg-gradient-to-b from-gold-500/60 to-transparent"
          />
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════ 3D SCENE ═══════════════════════════════════ */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-dark to-luxury-black" />
        <SpaCanvas />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center px-4"
          >
            <p className="text-sm tracking-[0.4em] uppercase text-gold-400/60 mb-3 font-light">
              Immerse Yourself
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-cream/90 font-medium">
              A Realm of <span className="text-gold-400">Tranquility</span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════ SPA STORY ═══════════════════════════════════ */}
      <section ref={storyRef} className="relative py-24 md:py-32 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/3 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left: Visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/images/spa/spa-story.jpg)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-luxury-black/20" />
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -bottom-8 -right-4 sm:right-8 glass-card-strong p-6 rounded-2xl"
              >
                <div className="text-center">
                  <span className="block text-4xl font-display text-gold-500 font-medium">2,000</span>
                  <span className="text-xs text-cream/60 tracking-wider uppercase mt-1 block">Square Metres</span>
                </div>
              </motion.div>

              {/* Decorative Circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-6 -left-6 w-24 h-24 border border-gold-500/20 rounded-full pointer-events-none"
              />
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <SectionTitle
                badge="Our Philosophy"
                title="The Art of Healing"
                subtitle="Where Ancient Wisdom Meets Modern Luxury"
                align="left"
              />

              <div className="space-y-6 text-cream/70 font-light leading-relaxed">
                <p>
                  Nestled within Hotel Belle Vie, our spa is a 2,000 square metre sanctuary dedicated to the art of holistic wellness. Here, the time-honoured healing traditions of the Congo are woven seamlessly with contemporary spa science.
                </p>
                <p>
                  Each treatment draws from the richness of African botanicals — volcanic minerals from the Rift Valley, nourishing shea from the Congo Basin, and rare essential oils harvested from the rainforest canopy. Our therapists are trained in both traditional Congolese healing rituals and modern therapeutic techniques.
                </p>
                <p>
                  From the moment you step through our doors, every detail is curated to guide you into a state of profound relaxation. The soft glow of ambient lighting, the gentle fragrance of lemongrass and vetiver, and the quiet rhythm of water features create an atmosphere where time slows and healing begins.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  { value: '15+', label: 'Signature Treatments' },
                  { value: '8', label: 'Treatment Rooms' },
                  { value: '12', label: 'Expert Therapists' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={storyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                    className="text-center sm:text-left"
                  >
                    <span className="block text-2xl md:text-3xl font-display text-gold-500 font-medium">{stat.value}</span>
                    <span className="text-xs text-cream/50 tracking-wider uppercase mt-1 block">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ TREATMENTS ═══════════════════════════════════ */}
      <section ref={treatmentsRef} className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/3 rounded-full blur-[300px] pointer-events-none" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Signature Rituals"
            title="Curated Treatments"
            subtitle="Each experience is a journey designed to restore balance and revitalize your spirit"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {spaTreatments.map((treatment, i) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 40 }}
                animate={treatmentsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <GlassCard
                  className="h-full group cursor-pointer"
                  hover
                  padding="none"
                  onClick={() => setSelectedTreatment(selectedTreatment === treatment.id ? null : treatment.id)}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${treatment.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 glass-card px-3 py-1 rounded-full">
                      <span className="text-[10px] font-medium tracking-wider uppercase text-gold-400">{treatment.category}</span>
                    </div>

                    {/* Duration */}
                    <div className="absolute top-4 right-4 glass-card px-3 py-1 rounded-full">
                      <span className="text-[10px] font-medium tracking-wider text-cream/70">{treatment.duration} min</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-display text-cream mb-2 group-hover:text-gold-500 transition-colors duration-500">
                      {treatment.name}
                    </h3>
                    <p className="text-sm text-cream/50 font-light leading-relaxed mb-4 line-clamp-2">
                      {treatment.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div>
                        <span className="text-2xl font-display text-gold-500">${treatment.price}</span>
                        <span className="text-xs text-cream/40 ml-1">/ session</span>
                      </div>
                      <Button variant="ghost" size="sm" className="group/btn">
                        <span>Book Now</span>
                        <svg className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ WELLNESS FEATURES ═══════════════════════════════════ */}
      <section ref={featuresRef} className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold-500/2 rounded-full blur-[200px] pointer-events-none" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="The Experience"
            title="Wellness Features"
            subtitle="Every detail curated for your ultimate comfort and rejuvenation"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {wellnessFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <GlassCard className="h-full group" hover padding="lg">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 group-hover:bg-gold-500/20 group-hover:border-gold-500/30 transition-all duration-500">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-display text-cream mb-2 group-hover:text-gold-500 transition-colors duration-500">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-cream/50 font-light leading-relaxed">
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

      {/* ═══════════════════════════════════ BOOKING CTA ═══════════════════════════════════ */}
      <section ref={bookingRef} className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
            style={{ backgroundImage: 'url(/images/spa/spa-booking-bg.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-dark/90 to-luxury-black" />
        </div>

        {/* Decorative Water Ripples */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/5"
              initial={{ width: 0, height: 0, opacity: 0.4 }}
              animate={{
                width: [0, 600, 800],
                height: [0, 600, 800],
                opacity: [0.3, 0.1, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: i * 2.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={bookingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-block mb-6 px-6 py-2 rounded-full bg-gold-500/10 border border-gold-500/20">
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-gold-400">
                Begin Your Journey
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-cream mb-6 leading-tight">
              Book Your{' '}
              <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
                Treatment
              </span>
            </h2>

            <p className="text-lg text-cream/60 font-light max-w-2xl mx-auto leading-relaxed mb-10">
              Your path to renewal awaits. Reserve your signature treatment and let our expert therapists guide you into a state of profound tranquility and renewal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" className="min-w-[240px]">
                Reserve Now
              </Button>
              <Button variant="luxury" size="xl" className="min-w-[240px]">
                Call +243 976 050 000
              </Button>
            </div>

            <p className="mt-8 text-xs text-cream/30 font-light">
              Open daily from 7:00 AM to 9:00 PM · Complimentary consultation for first-time guests
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════ FOOTER ═══════════════════════════════════ */}
      <footer ref={footerRef} className="relative bg-luxury-dark border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <img src="/images/logo.svg" alt="Hotel Belle Vie" className="h-10 w-auto" />
                <div>
                  <div className="font-display text-xl text-cream tracking-wider">
                    {siteConfig.name}
                  </div>
                  <div className="text-[10px] text-gold-500/70 tracking-[0.3em] uppercase">
                    Kinshasa
                  </div>
                </div>
              </Link>
              <p className="text-sm text-luxury-silver leading-relaxed mb-6">
                Where luxury meets serenity. An intimate sanctuary in the heart of Kinshasa, crafting unforgettable moments since 2020.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {[
                  { name: 'Instagram', href: siteConfig.social.instagram, icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                  { name: 'Facebook', href: siteConfig.social.facebook, icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { name: 'WhatsApp', href: siteConfig.social.whatsapp, icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-luxury-silver hover:text-gold-500 hover:border-gold-500/50 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Spa Links */}
            <div>
              <h3 className="text-sm font-medium text-cream tracking-wider uppercase mb-6">
                Spa & Wellness
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Signature Treatments', href: '#treatments' },
                  { label: 'Couples\' Suites', href: '#features' },
                  { label: 'Sauna & Steam', href: '#features' },
                  { label: 'Wellness Menu', href: '#treatments' },
                  { label: 'Gift Vouchers', href: '#booking' },
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

            {/* Hotel Links */}
            <div>
              <h3 className="text-sm font-medium text-cream tracking-wider uppercase mb-6">
                Hotel
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'About Us', href: '/#about' },
                  { label: 'Rooms & Suites', href: '/#rooms' },
                  { label: 'Dining', href: '/#restaurant' },
                  { label: 'Gallery', href: '/#gallery' },
                  { label: 'Contact', href: '/#contact' },
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

            {/* Contact */}
            <div>
              <h3 className="text-sm font-medium text-cream tracking-wider uppercase mb-6">
                Contact
              </h3>
              <div className="space-y-4 text-sm text-luxury-silver">
                <p className="leading-relaxed">
                  {siteConfig.contact.address}
                </p>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="block hover:text-gold-500 transition-colors duration-300"
                >
                  {siteConfig.contact.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="block hover:text-gold-500 transition-colors duration-300"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-luxury-silver/60">
                © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
              </p>
              <div className="flex gap-6">
                {[
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Service', href: '/terms' },
                  { label: 'Cancellation Policy', href: '/cancellation' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs text-luxury-silver/60 hover:text-gold-500 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

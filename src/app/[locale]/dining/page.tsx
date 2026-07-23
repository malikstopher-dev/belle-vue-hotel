'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { restaurantMenu } from '@/config/data';
import { siteConfig } from '@/config/site';
import { ArrowLeft, ChevronDown, Clock, MapPin, Phone, Star, Utensils, Wine } from 'lucide-react';

const DiningScene = dynamic(
  () => import('@/components/three/DiningScene').then((mod) => mod.DiningScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-luxury-black" /> }
);

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] overflow-hidden bg-luxury-black"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/restaurant/dining-1.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-luxury-rose/5" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-500/30 rounded-full"
            initial={{ x: (i * 137.5) % 1920, y: (i * 137.5) % 1080 }}
            animate={{ y: [null, -1000], opacity: [0, 1, 0] }}
            transition={{
              duration: 12 + (i * 137.5) % 18,
              repeat: Infinity,
              delay: (i * 137.5) % 8,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold-500/30 bg-gold-500/5 text-gold-500 text-xs tracking-[0.3em] uppercase">
              <Utensils className="w-3.5 h-3.5" />
              Fine Dining Experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-cream leading-[0.9] tracking-tight mb-6"
          >
            <span className="block">La Belle</span>
            <span className="block mt-2">
              <span className="gold-gradient-text">Cuisine</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-cream/70 font-light leading-relaxed mb-10"
          >
            A symphony of Indian, Congolese, and Continental flavours crafted with passion
            in the heart of Kinshasa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="min-w-[200px]">
              <span className="relative z-10 flex items-center gap-2">
                View Menu
                <ChevronDown className="w-4 h-4" />
              </span>
            </Button>
            <Button variant="luxury" size="lg" className="min-w-[200px]">
              Reserve a Table
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-cream/40 tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold-500/50 to-transparent" />
        </motion.div>
      </motion.div>

      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 hidden lg:block z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
          <span className="text-xs text-gold-500/50 tracking-widest [writing-mode:vertical-lr] rotate-180">
            EST. 2020
          </span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

function ThreeSceneSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="relative h-[60vh] md:h-[70vh] bg-luxury-black overflow-hidden">
      <DiningScene />

      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="text-center px-4"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-gold-500/20 bg-black/40 backdrop-blur-md">
            <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
            <span className="text-xs text-gold-500/80 tracking-[0.25em] uppercase">Immersive Experience</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-4">
            Art Meets <span className="gold-gradient-text">Culinary</span>
          </h2>
          <p className="text-cream/50 text-sm md:text-base max-w-md mx-auto">
            Where every dish is a masterpiece and every moment is curated luxury
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-black to-transparent z-10" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-luxury-black to-transparent z-10" />
    </section>
  );
}

function RestaurantStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-luxury-black overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-luxury-gray to-luxury-dark opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark via-transparent to-luxury-dark" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Our Story"
          title="A Legacy of Flavour"
          subtitle="Three cuisines, one extraordinary experience"
        />

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div style={{ y: imgY }} className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/images/restaurant/dining-1.jpg)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 text-gold-500 text-sm tracking-wider uppercase">
                  <Star className="w-4 h-4" />
                  <span>Fine Dining Since 2020</span>
                </div>
              </div>
            </motion.div>

            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-gold-500/10 rounded-2xl hidden md:block" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border border-gold-500/10 rounded-2xl hidden md:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-display text-3xl md:text-4xl text-cream mb-6 leading-tight">
              Where Three Worlds
              <br />
              <span className="gold-gradient-text">Converge</span>
            </h3>

            <p className="text-cream/70 text-lg leading-relaxed mb-8">
              At La Belle Cuisine, we celebrate the rich tapestry of flavours that define our culinary
              identity. From the aromatic spices of India to the hearty traditions of Congo and the
              refined elegance of Continental cuisine, every dish tells a story of heritage and innovation.
            </p>

            <div className="space-y-5 mb-10">
              {[
                {
                  icon: <Utensils className="w-5 h-5" />,
                  title: 'Congolese Heritage',
                  desc: 'Authentic dishes passed down through generations, reimagined with modern techniques.',
                },
                {
                  icon: <Star className="w-5 h-5" />,
                  title: 'Indian Spices',
                  desc: 'Aromatic curries, tandoori specialties, and bold flavour combinations.',
                },
                {
                  icon: <Wine className="w-5 h-5" />,
                  title: 'Continental Elegance',
                  desc: 'Refined European-inspired dishes with the finest imported ingredients.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                  className="flex gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-gold-500/20 transition-all duration-500 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-cream text-lg mb-1">{item.title}</h4>
                    <p className="text-cream/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm text-cream/50">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-500/70" />
                <span>Daily: 7:00 AM - 11:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-500/70" />
                <span>Ground Floor</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FullMenu() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState(restaurantMenu[0]?.id || 'starters');

  const activeItems = restaurantMenu.find((cat) => cat.id === activeCategory)?.items || [];

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative py-24 md:py-32 bg-luxury-black overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark via-luxury-charcoal/30 to-luxury-dark" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Full Menu"
          title="Curated With Passion"
          subtitle="Every dish is a journey through flavour, texture, and artistry"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
        >
          {restaurantMenu.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 md:px-7 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-500 ${
                activeCategory === category.id
                  ? 'bg-gold-500 text-black shadow-gold'
                  : 'bg-white/5 text-cream/60 hover:bg-white/10 border border-white/10 hover:border-gold-500/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {activeItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard
                  className="h-full group cursor-pointer overflow-hidden"
                  hover
                  padding="none"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    <div className="absolute top-4 right-4 flex gap-2">
                      {item.dietary.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[10px] rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-gold-400 font-medium"
                        >
                          {tag === 'VG' ? 'Vegetarian' : tag === 'GF' ? 'Gluten Free' : tag}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="text-lg md:text-xl font-display text-cream group-hover:text-gold-500 transition-colors duration-300">
                          {item.name}
                        </h4>
                        <span className="text-xl font-display text-gold-500 flex-shrink-0">
                          ${item.price}
                        </span>
                      </div>
                      <p className="text-sm text-cream/50 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
            <div className="flex items-center gap-2 text-cream/40 text-sm">
              <Phone className="w-4 h-4 text-gold-500/60" />
              <span>For special dietary requirements, please contact us</span>
            </div>
            <p className="text-gold-500/70 text-xs tracking-wider">
              Prices are in USD. Service charge of 10% applies. All prices are subject to change.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ChefSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-luxury-black overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-luxury-dark to-luxury-black opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div style={{ y: textY }}>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-gold-500/20 bg-gold-500/5">
                <Star className="w-3.5 h-3.5 text-gold-500" />
                <span className="text-xs text-gold-500 tracking-[0.2em] uppercase">Executive Chef</span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight">
                Chef Antoine
                <br />
                <span className="gold-gradient-text">Mbala</span>
              </h2>

              <p className="text-cream/70 text-lg leading-relaxed mb-8">
                With three decades of culinary mastery spanning the kitchens of Paris, Mumbai, and
                Lagos, Chef Antoine brings a rare alchemy of tradition and innovation to La Belle
                Cuisine. His philosophy is simple: honour the ingredient, respect the tradition,
                and create something that transcends both.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  { value: '30+', label: 'Years Experience' },
                  { value: '15', label: 'Countries Trained' },
                  { value: '3', label: 'Cuisine Styles' },
                  { value: '50K+', label: 'Guests Served' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                  >
                    <div className="text-2xl font-display text-gold-500 mb-1">{stat.value}</div>
                    <div className="text-xs text-cream/40 tracking-wider uppercase">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-cream/50">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <span className="italic font-display text-cream/60">
                  &ldquo;Cooking is not just about food. It is about emotion, memory, and the soul of a culture.&rdquo;
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <motion.div style={{ y: imgY }} className="relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: 'url(/images/restaurant/dining-1.jpg)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                  <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    <span className="text-xs text-gold-400 tracking-wider">Head Chef</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    <span className="text-xs text-cream/70 tracking-wider">Since 2020</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-[1px] bg-gold-500" />
                    <span className="text-xs text-gold-500 tracking-[0.2em] uppercase">
                      Philosophy
                    </span>
                  </div>
                  <p className="font-display text-xl text-cream italic leading-relaxed">
                    &ldquo;Every plate should tell a story of where it came from and where it aspires to be.&rdquo;
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 w-full h-full border border-gold-500/10 rounded-2xl -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReservationCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-luxury-black overflow-hidden"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: 'url(/images/restaurant/dining-1.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-black/90 to-luxury-black" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full border border-gold-500/20 bg-gold-500/5">
            <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
            <span className="text-xs text-gold-500 tracking-[0.25em] uppercase">Reserve Your Table</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight">
            An Evening Awaits
          </h2>

          <p className="text-lg md:text-xl text-cream/60 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            Secure your place at Kinshasa&apos;s most distinguished dining destination. For parties of 8 or more,
            our concierge team will curate a bespoke experience tailored to your preferences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="xl" className="min-w-[240px]">
              <span className="relative z-10 flex items-center gap-2">
                Make a Reservation
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </Button>
            <Button variant="luxury" size="lg" className="min-w-[200px]">
              Call {siteConfig.contact.phoneReservations}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              {
                icon: <Clock className="w-5 h-5" />,
                title: 'Opening Hours',
                detail: '7:00 AM - 11:00 PM Daily',
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                title: 'Location',
                detail: 'Ground Floor, Main Lobby',
              },
              {
                icon: <Phone className="w-5 h-5" />,
                title: 'Reservations',
                detail: siteConfig.contact.phoneReservations,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-gold-500/20 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-500">
                  {item.icon}
                </div>
                <h4 className="font-display text-cream text-sm">{item.title}</h4>
                <p className="text-xs text-cream/40">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-12 bg-luxury-black border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center">
              <span className="text-gold-500 font-display text-sm">B</span>
            </div>
            <div>
              <span className="font-display text-cream text-sm">{siteConfig.name}</span>
              <span className="text-cream/30 text-xs ml-2">| La Belle Cuisine</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-cream/40 text-xs hover:text-gold-500 transition-colors duration-300 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Home
            </Link>
            <span className="text-cream/20">|</span>
            <span className="text-cream/30 text-xs">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function DiningPage() {
  return (
    <main className="relative">
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 group"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-gold-500/30 transition-all duration-500"
        >
          <ArrowLeft className="w-4 h-4 text-cream/60 group-hover:text-gold-500 transition-colors" />
          <span className="text-xs text-cream/60 group-hover:text-cream transition-colors tracking-wider uppercase hidden sm:inline">
            Home
          </span>
        </motion.div>
      </Link>

      <HeroSection />
      <ThreeSceneSection />
      <RestaurantStory />
      <FullMenu />
      <ChefSection />
      <ReservationCTA />
      <Footer />
    </main>
  );
}

'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { LocaleProvider } from '@/context/LocaleContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/animations/CustomCursor';
import { Preloader } from '@/components/animations/Preloader';
import { ScrollProgress } from '@/components/animations/ScrollProgress';
import { BackToTop } from '@/components/animations/BackToTop';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { RoomsSection } from '@/components/sections/RoomsSection';
import { RestaurantSection } from '@/components/sections/RestaurantSection';
import { SpaSection } from '@/components/sections/SpaSection';
import { PoolSection } from '@/components/sections/PoolSection';
import { GymSection } from '@/components/sections/GymSection';
import { ConferenceSection } from '@/components/sections/ConferenceSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ExperiencesSection } from '@/components/sections/ExperiencesSection';
import { BookingSection } from '@/components/sections/BookingSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { LocationSection } from '@/components/sections/LocationSection';

export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LocaleProvider initialLocale="en">
      <main className="relative">
        <Preloader />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <RoomsSection />
        <RestaurantSection />
        <SpaSection />
        <PoolSection />
        <GymSection />
        <ConferenceSection />
        <GallerySection />
        <TestimonialsSection />
        <ExperiencesSection />
        <BookingSection />
        <ContactSection />
        <LocationSection />
        <Footer />
        <BackToTop />
      </main>
    </LocaleProvider>
  );
}

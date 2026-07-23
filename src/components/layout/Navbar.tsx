'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useScrollPosition } from '@/hooks';
import { siteConfig } from '@/config/site';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  locale?: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Rooms', href: '/rooms' },
  { label: 'Dining', href: '/dining' },
  { label: 'Spa', href: '/spa' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ locale = 'en' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScrollPosition();
  const isScrolled = scrollY > 50;

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 border border-gold-500/50 rotate-45 group-hover:border-gold-500 transition-colors duration-500" />
                <div className="absolute inset-1 border border-gold-500/30 rotate-45 group-hover:border-gold-500/50 transition-colors duration-500" />
                <span className="absolute inset-0 flex items-center justify-center font-display text-gold-500 text-lg md:text-xl font-bold -rotate-0">
                  BV
                </span>
              </div>
              <div className="hidden sm:block">
                <div className="font-display text-xl md:text-2xl text-cream tracking-wider">
                  {siteConfig.name}
                </div>
                <div className="text-[10px] md:text-xs text-gold-500/70 tracking-[0.3em] uppercase">
                  Kinshasa
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 text-sm tracking-wide transition-all duration-300 relative',
                    activeSection === item.href.replace('#', '')
                      ? 'text-gold-500'
                      : 'text-cream/70 hover:text-cream'
                  )}
                >
                  {item.label}
                  <span className={cn(
                    'absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-gold-500 transition-all duration-500',
                    activeSection === item.href.replace('#', '') ? 'w-full' : 'w-0'
                  )} />
                </Link>
              ))}
            </div>

            {/* CTA & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <Button variant="luxury" size="sm" className="hidden md:inline-flex">
                Book Now
              </Button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-1.5">
                  <span className={cn(
                    'w-6 h-[1px] bg-cream transition-all duration-300 origin-center',
                    isOpen && 'rotate-45 translate-y-[3.5px]'
                  )} />
                  <span className={cn(
                    'w-6 h-[1px] bg-cream transition-all duration-300',
                    isOpen && 'opacity-0'
                  )} />
                  <span className={cn(
                    'w-6 h-[1px] bg-cream transition-all duration-300 origin-center',
                    isOpen && '-rotate-45 -translate-y-[3.5px]'
                  )} />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className={cn(
        'fixed inset-0 z-40 lg:hidden transition-all duration-500',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setIsOpen(false)} />
        <div className={cn(
          'absolute right-0 top-0 h-full w-full max-w-sm bg-black/80 backdrop-blur-3xl border-l border-white/5 transition-transform duration-500',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'text-2xl font-display tracking-wider transition-all duration-300',
                  activeSection === item.href.replace('#', '')
                    ? 'text-gold-500'
                    : 'text-cream/70 hover:text-cream',
                  isOpen ? 'animate-slide-up opacity-100' : 'opacity-0'
                )}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <div className={cn(
              'mt-4',
              isOpen ? 'animate-slide-up opacity-100' : 'opacity-0'
            )}
            style={{ animationDelay: `${navItems.length * 100}ms` }}
            >
              <Button size="lg">
                Book Your Stay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
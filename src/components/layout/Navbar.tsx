'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useScrollPosition } from '@/hooks';
import { siteConfig } from '@/config/site';
import { useLocale } from '@/context/LocaleContext';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface NavItem {
  label: string;
  href: string;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScrollPosition();
  const isScrolled = scrollY > 50;
  const { t, locale } = useLocale();

  const navItems: NavItem[] = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.rooms'), href: `/${locale}/rooms` },
    { label: t('nav.restaurant'), href: `/${locale}/dining` },
    { label: t('nav.spa'), href: `/${locale}/spa` },
    { label: t('nav.gallery'), href: `/${locale}/gallery` },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'contact'];
      for (const section of sections) {
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
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2 group">
              <img
                src="/images/logo.svg"
                alt="Hotel Belle Vie"
                className="h-8 md:h-10 w-auto"
              />
              <div className="block">
                <div className="font-display text-xs md:text-sm text-cream tracking-wider leading-tight">
                  {siteConfig.name}
                </div>
                <div className="text-[7px] md:text-[9px] text-gold-500/70 tracking-[0.15em] uppercase">
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
                    'px-3 py-2 text-sm tracking-wide transition-all duration-300 relative',
                    activeSection === item.href.replace('#', '').split('/').pop()!
                      ? 'text-gold-500'
                      : 'text-cream/70 hover:text-cream'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA, Language Switcher & Mobile Menu */}
            <div className="flex items-center gap-2 md:gap-3">
              <LanguageSwitcher />
              <Button variant="luxury" size="sm" className="hidden md:inline-flex">
                {t('nav.book')}
              </Button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-9 h-9 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-1.5">
                  <span className={cn(
                    'w-5 h-[1px] bg-cream transition-all duration-300 origin-center',
                    isOpen && 'rotate-45 translate-y-[3.5px]'
                  )} />
                  <span className={cn(
                    'w-5 h-[1px] bg-cream transition-all duration-300',
                    isOpen && 'opacity-0'
                  )} />
                  <span className={cn(
                    'w-5 h-[1px] bg-cream transition-all duration-300 origin-center',
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
                  activeSection === item.href.replace('#', '').split('/').pop()!
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
                {t('nav.book')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

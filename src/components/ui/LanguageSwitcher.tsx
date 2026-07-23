'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';

export function LanguageSwitcher() {
  const { locale } = useLocale();

  const nextLocale = locale === 'fr' ? 'en' : 'fr';
  const nextLabel = locale === 'fr' ? 'English' : 'Français';
  const nextFlag = locale === 'fr' ? '🇬🇧' : '🇫🇷';

  const handleSwitch = () => {
    const path = window.location.pathname;
    const segments = path.split('/');
    if (['en', 'fr'].includes(segments[1])) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }
    window.location.href = segments.join('/');
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs text-cream/80 tracking-wider"
      title={`Switch to ${nextLabel}`}
    >
      <span className="text-sm">{nextFlag}</span>
      <span className="hidden sm:inline">{nextLabel}</span>
    </button>
  );
}

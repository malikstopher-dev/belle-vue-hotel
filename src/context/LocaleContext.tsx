'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { getDictionary, type Locale } from '@/i18n/dictionaries';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
  dict: ReturnType<typeof getDictionary>;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
      // Update URL to reflect new locale
      const path = window.location.pathname;
      const segments = path.split('/');
      if (['en', 'fr'].includes(segments[1])) {
        segments[1] = newLocale;
      } else {
        segments.splice(1, 0, newLocale);
      }
      window.location.href = segments.join('/');
    }
  }, []);

  const dict = getDictionary(locale);

  const t = useCallback(
    (path: string) => {
      const keys = path.split('.');
      let result: unknown = dict;
      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = (result as Record<string, unknown>)[key];
        } else {
          return path;
        }
      }
      return typeof result === 'string' ? result : path;
    },
    [dict]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, dict }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    // Fallback for components rendered outside provider
    const locale: Locale = 'en';
    const dict = getDictionary(locale);
    const t = (path: string) => {
      const keys = path.split('.');
      let result: unknown = dict;
      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = (result as Record<string, unknown>)[key];
        } else {
          return path;
        }
      }
      return typeof result === 'string' ? result : path;
    };
    return { locale, setLocale: () => {}, t, dict };
  }
  return context;
}

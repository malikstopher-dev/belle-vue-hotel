'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { dictionaries, type Locale } from '@/i18n/dictionaries';

interface CmsContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  getCmsValue: (key: string) => string;
}

const CmsContext = createContext<CmsContextType>({
  locale: 'en',
  setLocale: () => {},
  getCmsValue: () => '',
});

export function CmsProvider({ children, initialLocale = 'en' }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [cmsData, setCmsData] = useState<Record<string, string>>({});

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('hotel-locale', l);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('hotel-locale') as Locale;
    if (saved && ['en', 'fr', 'pt'].includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('site_content')
      .select('key, value')
      .eq('locale', locale)
      .then(({ data }) => {
        const map: Record<string, string> = {};
        for (const row of data || []) {
          map[row.key] = typeof row.value === 'string' ? row.value : JSON.stringify(row.value);
        }
        setCmsData(map);
      });
  }, [locale]);

  const dict = dictionaries[locale] || dictionaries.en;

  const getCmsValue = useCallback((key: string) => {
    if (cmsData[key]) return cmsData[key];

    const parts = key.split('.');
    let result: unknown = dict;
    for (const part of parts) {
      if (result && typeof result === 'object' && part in result) {
        result = (result as Record<string, unknown>)[part];
      } else {
        return key;
      }
    }
    return typeof result === 'string' ? result : key;
  }, [cmsData, dict]);

  return (
    <CmsContext.Provider value={{ locale, setLocale, getCmsValue }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  return useContext(CmsContext);
}

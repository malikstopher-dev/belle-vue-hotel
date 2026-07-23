'use client';

import React, { useEffect, useState } from 'react';
import { LocaleProvider } from '@/context/LocaleContext';
import type { Locale } from '@/i18n/dictionaries';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    params.then((p) => {
      setLocale(p.locale === 'fr' ? 'fr' : 'en');
    });
  }, [params]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>;
}

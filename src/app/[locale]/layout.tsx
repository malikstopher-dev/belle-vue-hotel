'use client';

import React from 'react';
import { LocaleProvider } from '@/context/LocaleContext';
import type { Locale } from '@/i18n/dictionaries';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Use React.use() to unwrap the Promise synchronously in client component
  const { locale: rawLocale } = React.use(params);
  const locale: Locale = rawLocale === 'fr' ? 'fr' : rawLocale === 'pt' ? 'pt' : 'en';

  return <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>;
}

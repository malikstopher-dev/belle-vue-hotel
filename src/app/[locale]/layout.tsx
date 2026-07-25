'use client';

import { useParams } from 'next/navigation';
import { LocaleProvider } from '@/context/LocaleContext';
import type { Locale } from '@/i18n/dictionaries';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale: rawLocale } = useParams<{ locale: string }>();
  const locale: Locale = rawLocale === 'fr' ? 'fr' : rawLocale === 'pt' ? 'pt' : 'en';

  return <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>;
}

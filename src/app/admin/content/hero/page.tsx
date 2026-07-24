'use client';

import { ContentEditor } from '@/components/admin/ContentEditor';

export default function HeroEditor() {
  return (
    <ContentEditor
      section="hero"
      title="Hero Section"
      fields={[
        { key: 'badge', label: 'Badge Text' },
        { key: 'title', label: 'Headline' },
        { key: 'subtitle', label: 'Subtitle', textarea: true, rows: 3 },
        { key: 'cta', label: 'Primary CTA Button' },
        { key: 'ctaSecondary', label: 'Secondary CTA Button' },
        { key: 'scroll', label: 'Scroll Text' },
      ]}
    />
  );
}

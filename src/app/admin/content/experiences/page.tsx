'use client';

import { ContentEditor } from '@/components/admin/ContentEditor';

export default function ExperiencesContentEditor() {
  return (
    <ContentEditor
      section="experiences"
      title="Experiences Section"
      fields={[
        { key: 'badge', label: 'Badge' },
        { key: 'title', label: 'Title' },
        { key: 'subtitle', label: 'Subtitle' },
        { key: 'book', label: 'Book Experience Button' },
        { key: 'bookNow', label: 'Book Now Text' },
        { key: 'customDesc', label: 'Custom Experience CTA', textarea: true, rows: 2 },
        { key: 'contactConcierge', label: 'Contact Concierge Button' },
        { key: 'from', label: 'From Text' },
      ]}
    />
  );
}

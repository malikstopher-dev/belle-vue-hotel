'use client';

import { ContentEditor } from '@/components/admin/ContentEditor';

export default function ConferenceContentEditor() {
  return (
    <ContentEditor
      section="conference"
      title="Conference Section"
      fields={[
        { key: 'badge', label: 'Badge' },
        { key: 'title', label: 'Title' },
        { key: 'subtitle', label: 'Subtitle' },
        { key: 'boardToGalas', label: 'Hero Heading' },
        { key: 'boardDesc', label: 'Hero Description', textarea: true, rows: 3 },
        { key: 'planEvent', label: 'Plan Event Button' },
        { key: 'upToGuests', label: 'Up To Guests Text' },
        { key: 'needHelp', label: 'CTA Text' },
        { key: 'contactEvents', label: 'Contact Events Button' },
      ]}
    />
  );
}

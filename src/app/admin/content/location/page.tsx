'use client';

import { ContentEditor } from '@/components/admin/ContentEditor';

export default function LocationContentEditor() {
  return (
    <ContentEditor
      section="location"
      title="Location Section"
      fields={[
        { key: 'badge', label: 'Badge' },
        { key: 'title', label: 'Title' },
        { key: 'subtitle', label: 'Subtitle' },
        { key: 'nearby', label: 'Nearby Attractions Header' },
        { key: 'transportation', label: 'Transportation Header' },
        { key: 'airportDesc', label: 'Airport Description' },
        { key: 'leisure', label: 'Category: Leisure' },
        { key: 'culture', label: 'Category: Culture' },
        { key: 'shopping', label: 'Category: Shopping' },
        { key: 'nature', label: 'Category: Nature' },
        { key: 'sports', label: 'Category: Sports' },
      ]}
    />
  );
}

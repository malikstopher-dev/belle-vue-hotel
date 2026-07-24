'use client';

import { ContentEditor } from '@/components/admin/ContentEditor';

export default function SpaContentEditor() {
  return (
    <ContentEditor
      section="spa"
      title="Spa Section"
      fields={[
        { key: 'badge', label: 'Badge' },
        { key: 'title', label: 'Title' },
        { key: 'subtitle', label: 'Subtitle' },
        { key: 'sanctuary', label: 'Sanctuary Heading' },
        { key: 'sanctuaryDesc', label: 'Sanctuary Description', textarea: true, rows: 4 },
        { key: 'feature1', label: 'Feature 1' },
        { key: 'feature2', label: 'Feature 2' },
        { key: 'feature3', label: 'Feature 3' },
        { key: 'feature4', label: 'Feature 4' },
        { key: 'feature5', label: 'Feature 5' },
        { key: 'bookTreatment', label: 'Book Treatment Button' },
        { key: 'viewAllTreatments', label: 'View All Button' },
        { key: 'min', label: 'Minutes Abbrev' },
        { key: 'book', label: 'Book Button' },
      ]}
    />
  );
}

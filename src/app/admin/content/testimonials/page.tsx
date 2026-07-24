'use client';

import { ContentEditor } from '@/components/admin/ContentEditor';

export default function TestimonialsContentEditor() {
  return (
    <ContentEditor
      section="testimonials"
      title="Testimonials Section"
      fields={[
        { key: 'badge', label: 'Badge' },
        { key: 'title', label: 'Title' },
        { key: 'subtitle', label: 'Subtitle' },
        { key: 'reviews', label: 'Reviews Text' },
      ]}
    />
  );
}

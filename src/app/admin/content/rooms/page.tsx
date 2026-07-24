'use client';

import { ContentEditor } from '@/components/admin/ContentEditor';

export default function RoomsContentEditor() {
  return (
    <ContentEditor
      section="rooms"
      title="Rooms Section"
      fields={[
        { key: 'badge', label: 'Badge' },
        { key: 'title', label: 'Title' },
        { key: 'subtitle', label: 'Subtitle' },
        { key: 'viewAll', label: 'View All Button' },
        { key: 'bookNow', label: 'Book Now Button' },
        { key: 'perNight', label: 'Per Night Text' },
        { key: 'guests', label: 'Guests Text' },
        { key: 'amenities', label: 'Amenities Header' },
        { key: 'featured', label: 'Featured Badge' },
        { key: 'viewGallery', label: 'View Gallery Button' },
      ]}
    />
  );
}

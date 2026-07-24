'use client';

import { ContentEditor } from '@/components/admin/ContentEditor';

export default function AboutEditor() {
  return (
    <ContentEditor
      section="about"
      title="About Section"
      fields={[
        { key: 'badge', label: 'Badge' },
        { key: 'title', label: 'Title' },
        { key: 'subtitle', label: 'Subtitle' },
        { key: 'description', label: 'Description', textarea: true, rows: 4 },
        { key: 'description2', label: 'Description 2', textarea: true, rows: 3 },
        { key: 'stats.year', label: 'Year Label' },
        { key: 'stats.rooms', label: 'Rooms Label' },
        { key: 'stats.rating', label: 'Rating Label' },
        { key: 'stats.guest', label: 'Guest Rating Label' },
        { key: 'features.location', label: 'Feature: Location' },
        { key: 'features.locationDesc', label: 'Location Description', textarea: true, rows: 2 },
        { key: 'features.dining', label: 'Feature: Dining' },
        { key: 'features.diningDesc', label: 'Dining Description', textarea: true, rows: 2 },
        { key: 'features.pool', label: 'Feature: Pool' },
        { key: 'features.poolDesc', label: 'Pool Description', textarea: true, rows: 2 },
        { key: 'features.events', label: 'Feature: Events' },
        { key: 'features.eventsDesc', label: 'Events Description', textarea: true, rows: 2 },
      ]}
    />
  );
}

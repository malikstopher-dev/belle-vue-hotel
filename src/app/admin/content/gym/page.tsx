'use client';

import { ContentEditor } from '@/components/admin/ContentEditor';

export default function GymContentEditor() {
  return (
    <ContentEditor
      section="gym"
      title="Gym Section"
      fields={[
        { key: 'badge', label: 'Badge' },
        { key: 'title', label: 'Title' },
        { key: 'subtitle', label: 'Subtitle' },
        { key: 'elevateTitle', label: 'Main Heading' },
        { key: 'elevateDesc', label: 'Description', textarea: true, rows: 4 },
        { key: 'open247', label: 'Open 24/7 Text' },
        { key: 'meetTrainers', label: 'Meet Trainers Button' },
        { key: 'technogym', label: 'Card 1 Name' },
        { key: 'technogymDesc', label: 'Card 1 Desc' },
        { key: 'yogaStudio', label: 'Card 2 Name' },
        { key: 'yogaDesc', label: 'Card 2 Desc' },
        { key: 'personalTraining', label: 'Card 3 Name' },
        { key: 'trainingDesc', label: 'Card 3 Desc' },
        { key: 'steamSauna', label: 'Card 4 Name' },
        { key: 'steamDesc', label: 'Card 4 Desc' },
      ]}
    />
  );
}

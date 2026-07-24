'use client';

import { ContentEditor } from '@/components/admin/ContentEditor';

export default function PoolContentEditor() {
  return (
    <ContentEditor
      section="pool"
      title="Pool Section"
      fields={[
        { key: 'badge', label: 'Badge' },
        { key: 'title', label: 'Title' },
        { key: 'subtitle', label: 'Subtitle' },
        { key: 'open', label: 'Open Label' },
        { key: 'floatingDesc', label: 'Floating Card Description', textarea: true, rows: 2 },
      ]}
    />
  );
}

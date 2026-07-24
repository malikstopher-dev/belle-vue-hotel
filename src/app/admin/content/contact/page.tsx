'use client';

import { ContentEditor } from '@/components/admin/ContentEditor';

export default function ContactContentEditor() {
  return (
    <ContentEditor
      section="contact"
      title="Contact Section"
      fields={[
        { key: 'badge', label: 'Badge' },
        { key: 'title', label: 'Title' },
        { key: 'subtitle', label: 'Subtitle' },
        { key: 'letsTalk', label: 'Let\'s Talk Heading' },
        { key: 'letsTalkDesc', label: 'Let\'s Talk Description', textarea: true, rows: 3 },
        { key: 'addressLabel', label: 'Address Label' },
        { key: 'phoneLabel', label: 'Phone Label' },
        { key: 'emailLabel', label: 'Email Label' },
        { key: 'whatsapp', label: 'WhatsApp Label' },
        { key: 'fastest', label: 'Fastest Response Text' },
        { key: 'nameLabel', label: 'Form: Name Label' },
        { key: 'namePlaceholder', label: 'Form: Name Placeholder' },
        { key: 'emailFieldLabel', label: 'Form: Email Label' },
        { key: 'emailPlaceholder', label: 'Form: Email Placeholder' },
        { key: 'subjectLabel', label: 'Form: Subject Label' },
        { key: 'subjectPlaceholder', label: 'Form: Subject Placeholder' },
        { key: 'messageLabel', label: 'Form: Message Label' },
        { key: 'messagePlaceholder', label: 'Form: Message Placeholder' },
        { key: 'send', label: 'Send Button' },
      ]}
    />
  );
}

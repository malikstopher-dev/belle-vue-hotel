'use client';

import { ContentEditor } from '@/components/admin/ContentEditor';

export default function RestaurantContentEditor() {
  return (
    <ContentEditor
      section="restaurant"
      title="Restaurant Section"
      fields={[
        { key: 'badge', label: 'Badge' },
        { key: 'title', label: 'Title' },
        { key: 'subtitle', label: 'Subtitle' },
        { key: 'menu', label: 'Menu Header' },
        { key: 'reservations', label: 'Reservation Button' },
        { key: 'executiveChef', label: 'Executive Chef Label' },
        { key: 'chefName', label: 'Chef Name' },
        { key: 'chefDesc', label: 'Chef Description', textarea: true, rows: 2 },
        { key: 'threeDining', label: 'Three Dining Header' },
        { key: 'leJardin', label: 'Le Jardin Name' },
        { key: 'leJardinDesc', label: 'Le Jardin Description', textarea: true, rows: 2 },
        { key: 'leJardinTime', label: 'Le Jardin Hours' },
        { key: 'terrace', label: 'Terrace Name' },
        { key: 'terraceDesc', label: 'Terrace Description', textarea: true, rows: 2 },
        { key: 'terraceTime', label: 'Terrace Hours' },
        { key: 'privateDining', label: 'Private Dining Name' },
        { key: 'privateDiningDesc', label: 'Private Dining Description', textarea: true, rows: 2 },
        { key: 'privateDiningTime', label: 'Private Dining Hours' },
        { key: 'vegetarian', label: 'Vegetarian Tag' },
        { key: 'glutenFree', label: 'Gluten Free Tag' },
      ]}
    />
  );
}

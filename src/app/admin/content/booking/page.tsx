'use client';

import { ContentEditor } from '@/components/admin/ContentEditor';

export default function BookingContentEditor() {
  return (
    <ContentEditor
      section="booking"
      title="Booking Section"
      fields={[
        { key: 'badge', label: 'Badge' },
        { key: 'title', label: 'Title' },
        { key: 'subtitle', label: 'Subtitle' },
        { key: 'checkIn', label: 'Check-in Label' },
        { key: 'checkOut', label: 'Check-out Label' },
        { key: 'adults', label: 'Adults Label' },
        { key: 'children', label: 'Children Label' },
        { key: 'roomType', label: 'Room Type Label' },
        { key: 'specialRequests', label: 'Special Requests Label' },
        { key: 'specialPlaceholder', label: 'Special Requests Placeholder' },
        { key: 'book', label: 'Reserve Button' },
        { key: 'availability', label: 'Check Availability Button' },
        { key: 'selectRoom', label: 'Select Room Placeholder' },
        { key: 'bestRate', label: 'Best Rate Text' },
        { key: 'freeCancellation', label: 'Free Cancellation Text' },
        { key: 'secureBooking', label: 'Trust: Secure Booking' },
        { key: 'bestPrice', label: 'Trust: Best Price' },
        { key: 'freeCancel', label: 'Trust: Free Cancel' },
        { key: 'support247', label: 'Trust: 24/7 Support' },
      ]}
    />
  );
}

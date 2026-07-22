export interface NavLink {
  label: string;
  labelFr: string;
  labelPt: string;
  href: string;
  children?: NavLink[];
}

export interface Room {
  id: string;
  name: string;
  nameFr: string;
  namePt: string;
  description: string;
  descriptionFr: string;
  descriptionPt: string;
  price: number;
  currency: string;
  size: number;
  maxGuests: number;
  bedType: string;
  amenities: string[];
  images: string[];
  featured: boolean;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  textFr: string;
  textPt: string;
  date: string;
  avatar: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

export interface SpaTreatment {
  id: string;
  name: string;
  nameFr: string;
  namePt: string;
  description: string;
  descriptionFr: string;
  descriptionPt: string;
  duration: number;
  price: number;
  category: string;
  image: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  nameFr: string;
  namePt: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  nameFr: string;
  namePt: string;
  description: string;
  descriptionFr: string;
  descriptionPt: string;
  price: number;
  dietary: string[];
  image?: string;
}

export interface Experience {
  id: string;
  name: string;
  nameFr: string;
  namePt: string;
  description: string;
  descriptionFr: string;
  descriptionPt: string;
  price: number;
  duration: string;
  image: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  phoneReservations: string;
  email: string;
  website: string;
}

export interface FAQ {
  id: string;
  question: string;
  questionFr: string;
  questionPt: string;
  answer: string;
  answerFr: string;
  answerPt: string;
}

export interface BookingFormData {
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  roomType: string;
  specialRequests: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type Locale = 'en' | 'fr' | 'pt';

export interface Dictionary {
  nav: {
    home: string;
    about: string;
    rooms: string;
    restaurant: string;
    spa: string;
    pool: string;
    gym: string;
    conference: string;
    gallery: string;
    experiences: string;
    contact: string;
    book: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
  };
  rooms: {
    title: string;
    subtitle: string;
    viewAll: string;
    bookNow: string;
    perNight: string;
    guests: string;
    amenities: string;
  };
  restaurant: {
    title: string;
    subtitle: string;
    menu: string;
    reservations: string;
  };
  spa: {
    title: string;
    subtitle: string;
    treatments: string;
    bookTreatment: string;
  };
  pool: {
    title: string;
    subtitle: string;
  };
  gym: {
    title: string;
    subtitle: string;
  };
  conference: {
    title: string;
    subtitle: string;
    bookVenue: string;
  };
  gallery: {
    title: string;
    subtitle: string;
  };
  experiences: {
    title: string;
    subtitle: string;
    book: string;
  };
  contact: {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    send: string;
  };
  booking: {
    title: string;
    subtitle: string;
    checkIn: string;
    checkOut: string;
    adults: string;
    children: string;
    roomType: string;
    specialRequests: string;
    book: string;
    availability: string;
  };
  footer: {
    rights: string;
    followUs: string;
    newsletter: string;
    subscribe: string;
    emailPlaceholder: string;
  };
}
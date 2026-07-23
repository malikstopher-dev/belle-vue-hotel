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
    badge: string;
    scroll: string;
  };
  about: {
    title: string;
    subtitle: string;
    badge: string;
    description: string;
    description2: string;
    stats: {
      year: string;
      rooms: string;
      rating: string;
      guest: string;
    };
    features: {
      location: string;
      locationDesc: string;
      dining: string;
      diningDesc: string;
      pool: string;
      poolDesc: string;
      events: string;
      eventsDesc: string;
    };
  };
  rooms: {
    title: string;
    subtitle: string;
    badge: string;
    viewAll: string;
    bookNow: string;
    perNight: string;
    guests: string;
    amenities: string;
    featured: string;
    viewGallery: string;
  };
  restaurant: {
    title: string;
    subtitle: string;
    badge: string;
    menu: string;
    reservations: string;
    executiveChef: string;
    chefName: string;
    chefDesc: string;
    threeDining: string;
    leJardin: string;
    leJardinDesc: string;
    leJardinTime: string;
    terrace: string;
    terraceDesc: string;
    terraceTime: string;
    privateDining: string;
    privateDiningDesc: string;
    privateDiningTime: string;
    vegetarian: string;
    glutenFree: string;
  };
  spa: {
    title: string;
    subtitle: string;
    badge: string;
    treatments: string;
    bookTreatment: string;
    viewAllTreatments: string;
    sanctuary: string;
    sanctuaryDesc: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
    feature5: string;
    min: string;
    book: string;
  };
  pool: {
    title: string;
    subtitle: string;
    badge: string;
    open: string;
    floatingDesc: string;
  };
  gym: {
    title: string;
    subtitle: string;
    badge: string;
    elevateTitle: string;
    elevateDesc: string;
    open247: string;
    meetTrainers: string;
    technogym: string;
    technogymDesc: string;
    yogaStudio: string;
    yogaDesc: string;
    personalTraining: string;
    trainingDesc: string;
    steamSauna: string;
    steamDesc: string;
  };
  conference: {
    title: string;
    subtitle: string;
    badge: string;
    bookVenue: string;
    boardToGalas: string;
    boardDesc: string;
    planEvent: string;
    upToGuests: string;
    needHelp: string;
    contactEvents: string;
  };
  gallery: {
    title: string;
    subtitle: string;
  };
  experiences: {
    title: string;
    subtitle: string;
    badge: string;
    book: string;
    bookNow: string;
    customDesc: string;
    contactConcierge: string;
    from: string;
  };
  booking: {
    title: string;
    subtitle: string;
    badge: string;
    checkIn: string;
    checkOut: string;
    adults: string;
    children: string;
    roomType: string;
    specialRequests: string;
    book: string;
    availability: string;
    selectRoom: string;
    bestRate: string;
    freeCancellation: string;
    secureBooking: string;
    bestPrice: string;
    freeCancel: string;
    support247: string;
    specialPlaceholder: string;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    reviews: string;
  };
  location: {
    badge: string;
    title: string;
    subtitle: string;
    nearby: string;
    transportation: string;
    airportDesc: string;
    leisure: string;
    culture: string;
    shopping: string;
    nature: string;
    sports: string;
  };
  contact: {
    title: string;
    subtitle: string;
    badge: string;
    address: string;
    phone: string;
    email: string;
    send: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    whatsapp: string;
    fastest: string;
    letsTalk: string;
    letsTalkDesc: string;
    nameLabel: string;
    emailFieldLabel: string;
    subjectLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
  };
  footer: {
    rights: string;
    followUs: string;
    newsletter: string;
    subscribe: string;
    emailPlaceholder: string;
    hotel: string;
    services: string;
    newsletterDesc: string;
    privacy: string;
    terms: string;
  };
}

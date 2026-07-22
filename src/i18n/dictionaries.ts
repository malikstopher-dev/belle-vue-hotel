import { Dictionary, Locale } from '@/types';

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      rooms: 'Rooms & Suites',
      restaurant: 'Restaurant',
      spa: 'Spa & Wellness',
      pool: 'Pool',
      gym: 'Fitness',
      conference: 'Events',
      gallery: 'Gallery',
      experiences: 'Experiences',
      contact: 'Contact',
      book: 'Book Now',
    },
    hero: {
      title: 'Where Luxury Meets Serenity',
      subtitle: 'An intimate sanctuary in the heart of Kinshasa, where every moment is crafted with elegance and every detail whispers luxury.',
      cta: 'Explore Our World',
      ctaSecondary: 'Book Your Stay',
    },
    about: {
      title: 'A Legacy of Elegance',
      subtitle: 'The Art of Luxury Hospitality',
      description: 'Nestled in the prestigious Gombe district of Kinshasa, Belle Vie Hotel is a beacon of refined luxury. Our intimate collection of suites and world-class amenities create an atmosphere where sophistication meets warmth, and every guest becomes part of our story.',
    },
    rooms: {
      title: 'Rooms & Suites',
      subtitle: 'Private Sanctuaries of Refined Luxury',
      viewAll: 'View All Rooms',
      bookNow: 'Reserve Now',
      perNight: 'per night',
      guests: 'guests',
      amenities: 'Amenities',
    },
    restaurant: {
      title: 'Fine Dining',
      subtitle: 'A Culinary Journey Through Flavors',
      menu: 'Our Menu',
      reservations: 'Make a Reservation',
    },
    spa: {
      title: 'Spa & Wellness',
      subtitle: 'Rejuvenate Your Body & Soul',
      treatments: 'Our Treatments',
      bookTreatment: 'Book Treatment',
    },
    pool: {
      title: 'Infinity Pool',
      subtitle: 'Where Water Meets the Sky',
    },
    gym: {
      title: 'Fitness Center',
      subtitle: 'State-of-the-Art Wellness',
    },
    conference: {
      title: 'Events & Meetings',
      subtitle: 'Corporate Luxury Redefined',
      bookVenue: 'Book Venue',
    },
    gallery: {
      title: 'Gallery',
      subtitle: 'Visual Stories of Elegance',
    },
    experiences: {
      title: 'Experiences',
      subtitle: 'Curated Moments of Discovery',
      book: 'Book Experience',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We\'re Here for You',
      address: '16 Avenue Tombalbaye, Gombe, Kinshasa, DRC',
      phone: '+243 976 050 000',
      email: 'reservation@belleviehotel.com',
      send: 'Send Message',
    },
    booking: {
      title: 'Reserve Your Experience',
      subtitle: 'Begin Your Journey',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      adults: 'Adults',
      children: 'Children',
      roomType: 'Room Type',
      specialRequests: 'Special Requests',
      book: 'Reserve Now',
      availability: 'Check Availability',
    },
    footer: {
      rights: '© 2024 Belle Vie Hotel. All rights reserved.',
      followUs: 'Follow Us',
      newsletter: 'Stay Connected',
      subscribe: 'Subscribe',
      emailPlaceholder: 'Your email address',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      rooms: 'Chambres & Suites',
      restaurant: 'Restaurant',
      spa: 'Spa & Bien-être',
      pool: 'Piscine',
      gym: 'Fitness',
      conference: 'Événements',
      gallery: 'Galerie',
      experiences: 'Expériences',
      contact: 'Contact',
      book: 'Réserver',
    },
    hero: {
      title: 'Où le Luxe Rencontre la Sérénité',
      subtitle: 'Un sanctuaire intime au cœur de Kinshasa, où chaque moment est façonné avec élégance et chaque détail murmure le luxe.',
      cta: 'Découvrir Notre Monde',
      ctaSecondary: 'Réserver Votre Séjour',
    },
    about: {
      title: 'Un Héritage d\'Élégance',
      subtitle: 'L\'Art de l\'Hospitalité de Luxe',
      description: 'Niché dans le prestigieux quartier de la Gombe à Kinshasa, le Belle Vie Hotel est un phare de luxe raffiné. Notre collection intime de suites et nos équipements de classe mondiale créent une atmosphère où la sophistication rencontre la chaleur.',
    },
    rooms: {
      title: 'Chambres & Suites',
      subtitle: 'Sanctuaires Privés de Luxe Raffiné',
      viewAll: 'Voir Toutes les Chambres',
      bookNow: 'Réserver Maintenant',
      perNight: 'par nuit',
      guests: 'personnes',
      amenities: 'Équipements',
    },
    restaurant: {
      title: 'Gastronomie',
      subtitle: 'Un Voyage Culinaire à Travers les Saveurs',
      menu: 'Notre Menu',
      reservations: 'Faire une Réservation',
    },
    spa: {
      title: 'Spa & Bien-être',
      subtitle: 'Régénérez Votre Corps & Âme',
      treatments: 'Nos Soins',
      bookTreatment: 'Réserver un Soin',
    },
    pool: {
      title: 'Piscine à Débordement',
      subtitle: 'Où l\'Eau Rencontre le Ciel',
    },
    gym: {
      title: 'Salle de Sport',
      subtitle: 'Bien-être de Pointe',
    },
    conference: {
      title: 'Événements & Réunions',
      subtitle: 'Le Luxe Corporate Redéfini',
      bookVenue: 'Réserver l\'Espace',
    },
    gallery: {
      title: 'Galerie',
      subtitle: 'Histoires Visuelles d\'Élégance',
    },
    experiences: {
      title: 'Expériences',
      subtitle: 'Moments de Découverte Sur Mesure',
      book: 'Réserver une Expérience',
    },
    contact: {
      title: 'Contactez-Nous',
      subtitle: 'Nous Sommes Là Pour Vous',
      address: '16 Avenue Tombalbaye, Gombe, Kinshasa, RDC',
      phone: '+243 976 050 000',
      email: 'reservation@belleviehotel.com',
      send: 'Envoyer le Message',
    },
    booking: {
      title: 'Réservez Votre Expérience',
      subtitle: 'Commencez Votre Voyage',
      checkIn: 'Arrivée',
      checkOut: 'Départ',
      adults: 'Adultes',
      children: 'Enfants',
      roomType: 'Type de Chambre',
      specialRequests: 'Demandes Spéciales',
      book: 'Réserver Maintenant',
      availability: 'Vérifier la Disponibilité',
    },
    footer: {
      rights: '© 2024 Belle Vie Hotel. Tous droits réservés.',
      followUs: 'Suivez-Nous',
      newsletter: 'Restez Connecté',
      subscribe: 'S\'abonner',
      emailPlaceholder: 'Votre adresse email',
    },
  },
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre',
      rooms: 'Quartos & Suítes',
      restaurant: 'Restaurante',
      spa: 'Spa & Bem-estar',
      pool: 'Piscina',
      gym: 'Fitness',
      conference: 'Eventos',
      gallery: 'Galeria',
      experiences: 'Experiências',
      contact: 'Contato',
      book: 'Reservar',
    },
    hero: {
      title: 'Onde o Luxo Encontra a Serenidade',
      subtitle: 'Um santuário íntimo no coração de Kinshasa, onde cada momento é elaborado com elegância e cada detalhe sussurra luxo.',
      cta: 'Explorar Nosso Mundo',
      ctaSecondary: 'Reserve Sua Estadia',
    },
    about: {
      title: 'Um Legado de Elegância',
      subtitle: 'A Arte da Hospitalidade de Luxo',
      description: 'Localizado no prestigioso bairro da Gombe em Kinshasa, o Belle Vie Hotel é um farol de luxo refinado. Nossa coleção íntima de suítes e amenidades de classe mundial criam uma atmosfera onde a sofisticação encontra o calor.',
    },
    rooms: {
      title: 'Quartos & Suítes',
      subtitle: 'Santuários Privados de Luxo Refinado',
      viewAll: 'Ver Todos os Quartos',
      bookNow: 'Reservar Agora',
      perNight: 'por noite',
      guests: 'hóspedes',
      amenities: 'Comodidades',
    },
    restaurant: {
      title: 'Gastronomia',
      subtitle: 'Uma Jornada Culinária Através dos Sabores',
      menu: 'Nosso Cardápio',
      reservations: 'Fazer uma Reserva',
    },
    spa: {
      title: 'Spa & Bem-estar',
      subtitle: 'Rejuvenesça Seu Corpo & Alma',
      treatments: 'Nossos Tratamentos',
      bookTreatment: 'Reservar Tratamento',
    },
    pool: {
      title: 'Piscina Infinita',
      subtitle: 'Onde a Água Encontra o Céu',
    },
    gym: {
      title: 'Academia',
      subtitle: 'Bem-estar de Última Geração',
    },
    conference: {
      title: 'Eventos & Reuniões',
      subtitle: 'Luxo Corporativo Redefinido',
      bookVenue: 'Reservar Espaço',
    },
    gallery: {
      title: 'Galeria',
      subtitle: 'Histórias Visuais de Elegância',
    },
    experiences: {
      title: 'Experiências',
      subtitle: 'Momentos de Descoberta Planejados',
      book: 'Reservar Experiência',
    },
    contact: {
      title: 'Fale Conosco',
      subtitle: 'Estamos Aqui Para Você',
      address: '16 Avenue Tombalbaye, Gombe, Kinshasa, RDC',
      phone: '+243 976 050 000',
      email: 'reservation@belleviehotel.com',
      send: 'Enviar Mensagem',
    },
    booking: {
      title: 'Reserve Sua Experiência',
      subtitle: 'Comece Sua Jornada',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      adults: 'Adultos',
      children: 'Crianças',
      roomType: 'Tipo de Quarto',
      specialRequests: 'Pedidos Especiais',
      book: 'Reservar Agora',
      availability: 'Verificar Disponibilidade',
    },
    footer: {
      rights: '© 2024 Belle Vie Hotel. Todos os direitos reservados.',
      followUs: 'Siga-nos',
      newsletter: 'Mantenha-se Conectado',
      subscribe: 'Inscrever-se',
      emailPlaceholder: 'Seu endereço de email',
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}

export function getTranslation(locale: Locale, path: string): string {
  const dict = getDictionary(locale);
  const keys = path.split('.');
  let result: unknown = dict;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  
  return typeof result === 'string' ? result : path;
}

export { dictionaries };
export type { Locale, Dictionary };
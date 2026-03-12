// Site-wide configuration
export interface SiteConfig {
  language: string;
  siteName: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "fr",
  siteName: "Versailles à Cheval",
  siteDescription: "Découvrez Versailles à cheval - Visite privée du Château et promenade équestre dans les jardins royaux. Une expérience unique au cœur de l'histoire française.",
};

// English Site Config
export const siteConfigEn: SiteConfig = {
  language: "en",
  siteName: "Versailles Horse Riding",
  siteDescription: "Discover Versailles on horseback - Private Château visit and horseback ride through the Royal Gardens. A unique experience in the heart of French history.",
};

// Hero Section
export interface HeroConfig {
  backgroundImage: string;
  backgroundAlt: string;
  title: string;
  subtitle: string;
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-real.jpg",
  backgroundAlt: "Deux cavaliers dans les allées du parc de Versailles",
  title: "Versailles à Cheval",
  subtitle: "L'EXPÉRIENCE ROYALE UNIQUE",
};

export const heroConfigEn: HeroConfig = {
  backgroundImage: "/hero-real.jpg",
  backgroundAlt: "Two riders in the Versailles park alleys",
  title: "Versailles Horse Riding",
  subtitle: "THE UNIQUE ROYAL EXPERIENCE",
};

// Narrative Text Section
export interface NarrativeTextConfig {
  line1: string;
  line2: string;
  line3: string;
}

export const narrativeTextConfig: NarrativeTextConfig = {
  line1: "Une expérience royale inoubliable",
  line2: "Visite privée du Château & Balade à cheval",
  line3: "Vivez une journée d'exception à la découverte de Versailles. Commencez par une visite privée de 1h30 du Château avec un guide expert, puis enfourchez votre monture pour une balade de 2 heures à travers les jardins royaux, le Grand Canal et les bosquets cachés. Une expérience unique qui combine histoire, élégance et aventure.",
};

export const narrativeTextConfigEn: NarrativeTextConfig = {
  line1: "An unforgettable royal experience",
  line2: "Private Château Visit & Horseback Ride",
  line3: "Live an exceptional day discovering Versailles. Start with a 1.5-hour private guided visit of the Palace with an expert guide, then mount your noble steed for a 2-hour ride through the Royal Gardens, Grand Canal, and hidden groves. A unique experience combining history, elegance, and adventure.",
};

// ZigZag Grid Section
export interface ZigZagGridItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse: boolean;
}

export interface ZigZagGridConfig {
  sectionLabel: string;
  sectionTitle: string;
  items: ZigZagGridItem[];
}

export const zigZagGridConfig: ZigZagGridConfig = {
  sectionLabel: "VOTRE JOURNÉE ROYALE",
  sectionTitle: "Une expérience complète",
  items: [
    {
      id: "chateau",
      title: "Visite Privée du Château",
      subtitle: "1H30 • GUIDE EXPERT",
      description: "Découvrez les trésors du Château de Versailles lors d'une visite privée de 1h30. Votre guide expert vous emmènera à travers les points forts du palais, y compris la célèbre Galerie des Glaces, en partageant des histoires fascinantes sur la vie royale et l'architecture. Un site classé au patrimoine mondial de l'UNESCO.",
      image: "/grid-gardens.jpg",
      imageAlt: "Jardins du Château de Versailles",
      reverse: false,
    },
    {
      id: "cheval",
      title: "Balade à Cheval dans les Jardins",
      subtitle: "2H • ÉQUIPEMENT FOURNI",
      description: "Les jardins royaux sont immenses et incroyablement beaux. Vous monterez à cheval et, accompagné d'un guide expérimenté, explorerez les bosquets cachés, les fontaines spectaculaires et les vastes paysages entourant le Grand Canal. C'est le meilleur moyen d'apprécier l'échelle et la tranquillité de ce domaine historique.",
      image: "/grid-real-1.jpg",
      imageAlt: "Cavaliers dans les allées bordées de haies du château",
      reverse: true,
    },
    {
      id: "service",
      title: "Service Conciergerie Dédié",
      subtitle: "SUR MESURE",
      description: "Profitez d'un service personnalisé tout au long de votre expérience. De la réservation à la fin de votre journée, notre équipe s'occupe de chaque détail pour vous offrir une expérience sans stress et mémorable.",
      image: "/grid-real-2.jpg",
      imageAlt: "Deux cavaliers dans la verdure du parc",
      reverse: false,
    },
  ],
};

export const zigZagGridConfigEn: ZigZagGridConfig = {
  sectionLabel: "YOUR ROYAL DAY",
  sectionTitle: "A complete experience",
  items: [
    {
      id: "chateau",
      title: "Private Château Visit",
      subtitle: "1.5H • EXPERT GUIDE",
      description: "Discover the treasures of the Palace of Versailles during a 1.5-hour private visit. Your expert guide will take you through the palace highlights, including the famous Hall of Mirrors, sharing fascinating stories of royal life and architecture. A UNESCO World Heritage site.",
      image: "/e3191d77048ce717ddfb0a2470c3bbac5ac55ec0df9c584b61537c991c8adfef (1).jpeg",
      imageAlt: "Hall of Mirrors at Versailles Palace",
      reverse: false,
    },
    {
      id: "cheval",
      title: "Horseback Ride in the Gardens",
      subtitle: "2H • EQUIPMENT PROVIDED",
      description: "The Royal Gardens are immense and incredibly beautiful. You will mount a noble steed and, accompanied by an experienced guide, explore the hidden groves, spectacular fountains, and vast landscapes surrounding the Grand Canal. This is the ultimate way to appreciate the scale and tranquility of this historical estate.",
      image: "/grid-real-1.jpg",
      imageAlt: "Riders in the château hedge-lined alleys",
      reverse: true,
    },
    {
      id: "service",
      title: "Dedicated Concierge Service",
      subtitle: "TAILOR-MADE",
      description: "Enjoy personalized service throughout your experience. From booking to the end of your day, our team takes care of every detail to offer you a stress-free and memorable experience.",
      image: "/grid-real-2.jpg",
      imageAlt: "Two riders in the park greenery",
      reverse: false,
    },
  ],
};

// Breath Section
export interface BreathSectionConfig {
  backgroundImage: string;
  backgroundAlt: string;
  title: string;
  subtitle: string;
  description: string;
}

export const breathSectionConfig: BreathSectionConfig = {
  backgroundImage: "/breath-real.jpg",
  backgroundAlt: "Cavalier au bord du Grand Canal de Versailles",
  title: "Versailles",
  subtitle: "COMME VOUS NE L'AVEZ JAMAIS VU",
  description: "Cette expérience soigneusement conçue offre l'équilibre parfait entre découverte historique et aventure immersive. Votre journée commence par une visite privée du Château de Versailles, puis la magie opère lorsque vous enfourchez votre cheval pour explorer les jardins royaux. Le meilleur moyen d'apprécier l'échelle et la tranquillité de ce domaine historique.",
};

export const breathSectionConfigEn: BreathSectionConfig = {
  backgroundImage: "/breath-real.jpg",
  backgroundAlt: "Rider by the Grand Canal of Versailles",
  title: "Versailles",
  subtitle: "LIKE YOU'VE NEVER SEEN IT",
  description: "This carefully curated experience offers the perfect balance between historical discovery and immersive adventure. Your day begins with a private visit of the Palace of Versailles, then the magic happens as you mount your horse to explore the Royal Gardens. The ultimate way to appreciate the scale and tranquility of this historical estate.",
};

// Add-on Options
export interface AddOnOption {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
}

export const addOnOptions: AddOnOption[] = [
  {
    id: "transport",
    name: "Transport depuis votre hôtel",
    nameEn: "Transport from your hotel",
    description: "Transport privé de luxe depuis et vers votre hébergement à Paris",
    descriptionEn: "Private luxury transportation to and from your Paris accommodation",
    price: 100,
  },
];

// Card Stack Section
export interface CardStackItem {
  id: number;
  image: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  rotation: number;
  priceId?: string;
  basePrice: number;
}

export interface CardStackConfig {
  sectionTitle: string;
  sectionTitleEn: string;
  sectionSubtitle: string;
  sectionSubtitleEn: string;
  cards: CardStackItem[];
}

export const cardStackConfig: CardStackConfig = {
  sectionTitle: "Notre Formule",
  sectionTitleEn: "Our Package",
  sectionSubtitle: "L'EXPÉRIENCE COMPLÈTE",
  sectionSubtitleEn: "THE COMPLETE EXPERIENCE",
  cards: [
    {
      id: 1,
      image: "/card-real-1.jpg",
      title: "L'Expérience Royale Complète",
      titleEn: "The Complete Royal Experience",
      description: "1h30 de visite privée du Château + 2h de balade à cheval dans les jardins. À partir de 490€ par personne.",
      descriptionEn: "1.5-hour private Château visit + 2-hour horseback ride in the gardens. From €490 per person.",
      rotation: -2,
      priceId: "price_royal_complete",
      basePrice: 490,
    },
  ],
};

// Footer Section
export interface FooterContactItem {
  type: "email" | "phone";
  label: string;
  value: string;
  href: string;
}

export interface FooterSocialItem {
  platform: string;
  href: string;
}

export interface FooterConfig {
  heading: string;
  headingEn: string;
  description: string;
  descriptionEn: string;
  ctaText: string;
  ctaTextEn: string;
  contact: FooterContactItem[];
  locationLabel: string;
  locationLabelEn: string;
  address: string[];
  socialLabel: string;
  socialLabelEn: string;
  socials: FooterSocialItem[];
  logoText: string;
  copyright: string;
  links: { label: string; labelEn: string; href: string }[];
}

export const footerConfig: FooterConfig = {
  heading: "Prêt à vivre l'expérience royale ?",
  headingEn: "Ready to live the royal experience?",
  description: "Réservez votre journée d'exception dès maintenant. Visite privée du Château et balade à cheval dans les jardins royaux de Versailles.",
  descriptionEn: "Book your exceptional day now. Private Château visit and horseback ride in the Royal Gardens of Versailles.",
  ctaText: "Réserver mon expérience",
  ctaTextEn: "Book my experience",
  contact: [
    {
      type: "phone",
      label: "+33 6 25 75 79 95",
      value: "+33625757995",
      href: "tel:+33625757995",
    },
    {
      type: "email",
      label: "parisdreamhunt@gmail.com",
      value: "parisdreamhunt@gmail.com",
      href: "mailto:parisdreamhunt@gmail.com",
    },
  ],
  locationLabel: "Où nous trouver",
  locationLabelEn: "Where to find us",
  address: [
    "Château de Versailles",
    "Place d'Armes",
    "78000 Versailles",
    "France",
  ],
  socialLabel: "Suivez-nous",
  socialLabelEn: "Follow us",
  socials: [
    {
      platform: "instagram",
      href: "https://instagram.com/versaillesacheval",
    },
    {
      platform: "facebook",
      href: "https://facebook.com/versaillesacheval",
    },
  ],
  logoText: "Versailles à Cheval",
  copyright: "© 2024 Versailles à Cheval. Tous droits réservés.",
  links: [
    { label: "Mentions légales", labelEn: "Legal Notice", href: "#" },
    { label: "CGV", labelEn: "Terms & Conditions", href: "#" },
  ],
};

// Stripe Configuration - Utilise les variables d'environnement
export const stripeConfig = {
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
  prices: {
    royal: { id: "price_royal_complete", amount: 49000, name: "L'Expérience Royale Complète" },
  },
};

// Firebase Configuration - Utilise les variables d'environnement
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

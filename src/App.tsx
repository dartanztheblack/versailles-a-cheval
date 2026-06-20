import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';
import { Seo } from './components/Seo';

// Sections
import Hero from './sections/Hero';
import NarrativeText from './sections/NarrativeText';
import CardStack from './sections/CardStack';
import BreathSection from './sections/BreathSection';
import ZigZagGrid from './sections/ZigZagGrid';
import Footer from './sections/Footer';

// Pages
import { Reservation } from './pages/Reservation';
import { Blog } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPost';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/admin/Dashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Chatbot } from './components/chatbot/Chatbot';

gsap.registerPlugin(ScrollTrigger);

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Versailles à Cheval - Balades Équestres dans les Jardins du Château",
    description: "Balade à cheval à Versailles - Découvrez les jardins du Château de Versailles à cheval avec un guide expert. Expérience unique et mémorable.",
    url: "https://www.versaillesacheval.fr",
    image: "https://www.versaillesacheval.fr/hero-real.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Versailles",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
      postalCode: "78000",
    },
    geo: { "@type": "GeoCoordinates", latitude: "48.8044", longitude: "2.1230" },
    priceRange: "€€€",
    isAccessibleForFree: false,
    publicAccess: true,
    touristType: ["Familles", "Couples", "Groupes", "Solo"],
    additionalType: ["https://schema.org/HorseRiding", "https://schema.org/TouristActivity"],
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Versailles à Cheval",
    description: "Centre équestre proposant des balades à cheval dans les jardins du Château de Versailles",
    url: "https://www.versaillesacheval.fr",
    telephone: "+33-6-25-75-79-95",
    email: "parisdreamhunt@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Versailles",
      addressRegion: "Île-de-France",
      postalCode: "78000",
      addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 48.8044, longitude: 2.123 },
    priceRange: "€€€",
    image: "https://www.versaillesacheval.fr/hero-real.jpg",
    sameAs: [
      "https://www.instagram.com/versaillesacheval",
      "https://www.facebook.com/versaillesacheval",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Où faire une balade à cheval à Versailles ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Versailles à Cheval propose des balades à cheval dans les jardins du Château de Versailles, à proximité immédiate du domaine royal.",
        },
      },
      {
        "@type": "Question",
        name: "Combien coûte une balade à cheval à Versailles ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Notre formule L'Expérience Royale Complète (visite privée du Château + balade à cheval dans les jardins) est proposée à partir de 490€ par personne.",
        },
      },
      {
        "@type": "Question",
        name: "Comment réserver une balade à cheval à Versailles ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La réservation se fait directement en ligne sur versaillesacheval.fr/reservation : choisissez votre date et le nombre de participants, puis confirmez par paiement sécurisé.",
        },
      },
    ],
  },
];

function HomePage() {
  // Initialize Lenis smooth scrolling
  useLenis();

  useEffect(() => {
    // Set document language if configured
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }

    // Refresh ScrollTrigger after all content is loaded
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);

    // Also refresh after a short delay to ensure images are loaded
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(refreshTimeout);
    };
  }, []);

  return (
    <div className="relative bg-kaleo-sand">
      <Seo
        title="Balade à Cheval Versailles | Expérience Unique dans les Jardins du Château"
        description="Balade à cheval à Versailles - Découvrez les jardins du Château de Versailles à cheval. Expérience unique, guide expert, chevaux dressés. Réservez votre promenade équestre dès maintenant !"
        path="/"
        jsonLd={homeJsonLd}
      />
      {/* Hero Section */}
      <Hero />

      {/* Narrative Text Section */}
      <NarrativeText />

      {/* Card Stack Parallax Gallery */}
      <CardStack />

      {/* BREATH Video Mask Section */}
      <BreathSection />

      {/* Zig-Zag Grid Section */}
      <ZigZagGrid />

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';

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
  );
}

export default App;

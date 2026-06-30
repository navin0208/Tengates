import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Overview from './components/Overview';
import InfiniteMarquee from './components/InfiniteMarquee';
import ImpactStats from './components/ImpactStats';
import AnimatedSlideshow from './components/AnimatedSlideshow';
import Showcase from './components/Showcase';
import Timeline from './components/Timeline';
import NightOps from './components/NightOps';
import LogoMarquee from './components/LogoMarquee';
import Questions from './components/Questions';
import ProjectMap from './components/ProjectMap';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PageHero from './components/PageHero';

// New dedicated pages
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

import './App.css';

import Sustainability from './components/Sustainability';

// Scroll to top on page change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
};

const Home = () => (
  <div className="content-layers">
    <Overview />
    <InfiniteMarquee />
    <ImpactStats />
    <AnimatedSlideshow />
    <Showcase />
    <Timeline />

    <NightOps />
    <LogoMarquee />
    <ProjectMap />
    <Sustainability />
    <Questions />
    <CTA />
  </div>
);

const ServicesRoute = () => (
  <>
    <PageHero
      label="Our Expertise"
      title="Precision Engineering Services"
      subtitle="End-to-end construction services — foundations, flooring, warehousing, and turnkey project delivery."
      image="https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80&w=2400"
    />
    <div className="content-layers">
      <AnimatedSlideshow />
      <ServicesPage />
      <CTA />
    </div>
  </>
);

const ProjectsRoute = () => (
  <>
    <PageHero
      label="Portfolio"
      title="Our Projects"
      subtitle="Projects we've delivered across Maharashtra, Madhya Pradesh, and Karnataka."
      image="https://images.unsplash.com/photo-1590495958611-3e4e9791404f?auto=format&fit=crop&q=80&w=2400"
    />
    <div className="content-layers">
      <ProjectsPage />
      <CTA />
    </div>
  </>
);

const AboutRoute = () => (
  <>
    <PageHero
      label="About Us"
      title="Building Legacies"
      subtitle="Since 2023, Ten Gates has been building industrial infrastructure — factories, warehouses, and processing facilities that get the job done."
      image="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=2400"
    />
    <div className="content-layers">
      <AboutPage />
    </div>
  </>
);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={
            <div className="app-container">
              <Header />
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <Home />
                  </>
                } />
                <Route path="/services" element={<ServicesRoute />} />
                <Route path="/projects" element={<ProjectsRoute />} />
                <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                <Route path="/about" element={<AboutRoute />} />
              </Routes>
              <Footer />
            </div>
          } />
          
          {/* Admin Routes - No layout wrapper */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

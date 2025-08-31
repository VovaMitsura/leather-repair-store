import React, { useEffect, useMemo, useState } from 'react';

import NavBar from './components/NavBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import GallerySection from './components/GallerySection.jsx';
import TestimonialsSection from './components/TestimonialsSection.jsx';
import AboutSection from './components/AboutSection.jsx';
// import PricingSection from './components/PricingSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import ServiceDetail from './components/ServiceDetail.jsx';
import FaqPage from './components/FaqPage.jsx';

function parseRoute(hash) {
  if (hash && hash.startsWith('#/service/')) {
    const slug = hash.replace('#/service/', '').trim();
    return { name: 'service', slug };
  }
  if (hash === '#/faq') {
    return { name: 'faq' };
  }
  return { name: 'home' };
}

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));

  useEffect(() => {
    function onHashChange() {
      setRoute(parseRoute(window.location.hash));
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const isService = route.name === 'service';
  const isFaq = route.name === 'faq';

  return (
    <div className="app">
      <a className="skip-link" href="#contact">Skip to Contact</a>
      <NavBar />
      {isService ? (
        <ServiceDetail slug={route.slug} />
      ) : isFaq ? (
        <FaqPage />
      ) : (
        <>
          <HeroSection />
          <main>
            <AboutSection />
            <ServicesSection />
            <GallerySection />
            <TestimonialsSection />
            <ContactSection />
          </main>
        </>
      )}
      <Footer />
    </div>
  );
}

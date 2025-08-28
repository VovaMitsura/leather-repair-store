import React from 'react';

import HeroSection from './components/HeroSection.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import GallerySection from './components/GallerySection.jsx';
import TestimonialsSection from './components/TestimonialsSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import PricingSection from './components/PricingSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#contact">Skip to Contact</a>
      <HeroSection />
      <main>
        <ServicesSection />
        <GallerySection />
        <TestimonialsSection />
        <AboutSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}


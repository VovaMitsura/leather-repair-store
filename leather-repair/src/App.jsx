import { useEffect, useRef, useState } from 'react';

import NavBar from './components/NavBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import ProcessStrip from './components/ProcessStrip.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import WhyUs from './components/WhyUs.jsx';
import ServiceArea from './components/ServiceArea.jsx';
import GallerySection from './components/GallerySection.jsx';
import CtaBanner from './components/CtaBanner.jsx';
import TestimonialsSection from './components/TestimonialsSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import ServiceDetail from './components/ServiceDetail.jsx';
import FaqPage from './components/FaqPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import CallWidget from './components/CallWidget.jsx';

const TITLE_BASE = 'Mitsura Leather Repair';

function parseRoute(hash) {
  if (hash && hash.startsWith('#/service/')) {
    const slug = hash.replace('#/service/', '').trim();
    return { name: 'service', slug };
  }
  if (hash === '#/faq') return { name: 'faq' };
  // Any other "/" route is treated as 404. Bare anchors like #contact fall through to home.
  if (hash && hash.startsWith('#/')) return { name: 'notfound' };
  return { name: 'home' };
}

function titleFor(route) {
  switch (route.name) {
    case 'faq': return `FAQ — ${TITLE_BASE}`;
    case 'service': {
      const human = route.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      return `${human} — ${TITLE_BASE}`;
    }
    case 'notfound': return `Page Not Found — ${TITLE_BASE}`;
    default: return 'Leather Repair & Restoration – Philadelphia | Mitsura';
  }
}

// Anchor in the URL (e.g. "#contact") vs route hash (e.g. "#/faq").
function bareAnchorFromHash(hash) {
  if (!hash || hash.startsWith('#/') || hash.length < 2) return null;
  return hash.slice(1);
}

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  const pendingAnchor = useRef(bareAnchorFromHash(window.location.hash));

  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash;
      pendingAnchor.current = bareAnchorFromHash(hash);
      setRoute(parseRoute(hash));
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Per-route document title, and scroll behavior on route change.
  useEffect(() => {
    document.title = titleFor(route);

    // Allow the new route to render before we measure/scroll.
    const id = setTimeout(() => {
      const anchor = pendingAnchor.current;
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          pendingAnchor.current = null;
          return;
        }
        pendingAnchor.current = null;
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 0);

    return () => clearTimeout(id);
  }, [route]);

  return (
    <div className="app">
      <a className="skip-link" href="#contact">Skip to Contact</a>
      <NavBar />
      {route.name === 'service' ? (
        <ServiceDetail slug={route.slug} />
      ) : route.name === 'faq' ? (
        <FaqPage />
      ) : route.name === 'notfound' ? (
        <NotFoundPage />
      ) : (
        <>
          <HeroSection />
          <main>
            <ProcessStrip />
            <AboutSection />
            <ServicesSection />
            <WhyUs />
            <ServiceArea />
            <GallerySection />
            <CtaBanner />
            <TestimonialsSection />
            <ContactSection />
          </main>
        </>
      )}
      <CallWidget />
      <Footer />
    </div>
  );
}

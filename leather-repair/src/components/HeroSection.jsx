import { BUSINESS } from '../config/business.js';

export default function HeroSection() {
  const bg =
    "linear-gradient(0deg, rgba(0,0,0,.78), rgba(0,0,0,.42)), url('https://cdn.b12.io/client_media/tF1eDyDV/0e736718-8689-11f0-8573-0242ac110002-jpg-hero_image.jpeg')";

  return (
    <header
      id="home"
      className="hero hero--dark hero--image"
      style={{
        backgroundImage: bg,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero__ribbon" aria-label="Free estimates">Free Estimates</div>
      <div className="container hero__content hero__content--left">
        <p className="hero__eyebrow">{BUSINESS.serviceArea.join(' · ')}</p>
        <h1 className="hero__title">Bring your leather back to life.</h1>
        <p className="hero__subtitle">
          Sofas, recliners, car interiors, boat and RV upholstery —
          leather, vinyl, and leather-match. On-site across the {BUSINESS.serviceArea[0]} area.
        </p>
        <div className="hero__cta-row">
          <a href="#contact" className="btn btn--primary btn--lg">Get a free estimate</a>
          <a href={`tel:${BUSINESS.phone.e164}`} className="btn btn--ghost btn--lg">
            <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z" fill="currentColor"/>
            </svg>
            Call {BUSINESS.phone.display}
          </a>
        </div>
      </div>
    </header>
  );
}

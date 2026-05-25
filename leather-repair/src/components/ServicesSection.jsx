import { SERVICES } from '../config/services.js';

// Compact inline icon set. Kept here so the whole component is one file to scan.
function Icon({ name }) {
  const common = { viewBox: '0 0 24 24', 'aria-hidden': 'true', fill: 'currentColor' };
  switch (name) {
    case 'scratch':
      return (
        <svg {...common}><path d="M3 21 21 3l-1.4-1.4L18 3.2 16.4 1.6 15 3l-1.6-1.6L12 2.8l-1.6-1.6L9 2.6 7.4 1 6 2.4 4.4 0.8 3 2.2 1.6 0.8.2 2.2 1.6 3.6 3 5l-1.4 1.4L3 7.8 1.6 9.2 3 10.6 1.6 12 3 13.4 1.6 14.8 3 16.2 1.6 17.6 3 19l-1.4 1.4L3 21z" /></svg>
      );
    case 'tear':
      return (
        <svg {...common}><path d="M12 2 6 14a6 6 0 1 0 12 0L12 2zm0 4.84L15.84 14a3.84 3.84 0 1 1-7.68 0L12 6.84z" /></svg>
      );
    case 'palette':
      return (
        <svg {...common}><path d="M12 2A10 10 0 0 0 2 12c0 5.52 4.48 10 10 10a2 2 0 0 0 2-2c0-.55-.22-1.05-.57-1.41-.36-.36-.57-.86-.57-1.41 0-1.11.9-2 2-2h2.36A4.64 4.64 0 0 0 22 10.5C22 5.81 17.52 2 12 2zm-5.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" /></svg>
      );
    case 'shine':
      return (
        <svg {...common}><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5v3m0 14v3M2 12h3m14 0h3M4.22 4.22l2.12 2.12m11.32 11.32 2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
      );
    case 'thread':
      return (
        <svg {...common}><path d="M6 3v2h2V3H6zm4 0v2h2V3h-2zm4 0v2h2V3h-2zM6 7v2h2V7H6zm4 0v2h2V7h-2zm4 0v2h2V7h-2zM6 11v2h2v-2H6zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zM4 17a3 3 0 1 0 6 0v-2H4v2zm10 0a3 3 0 1 0 6 0v-2h-6v2z" /></svg>
      );
    case 'cushion':
      return (
        <svg {...common}><path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8zm4-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8zm0 3h8v1H8V9zm0 5h8v1H8v-1z" /></svg>
      );
    case 'drop':
      return (
        <svg {...common}><path d="M12 2.5S5 10 5 14a7 7 0 1 0 14 0c0-4-7-11.5-7-11.5zm0 3.96C13.5 8.41 17 13.04 17 14a5 5 0 1 1-10 0c0-.96 3.5-5.59 5-7.54z" /></svg>
      );
    case 'swatch':
      return (
        <svg {...common}><path d="M3 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4zm10 .59 4.24-4.24 4.95 4.95L17.95 9.5l-4.95-4.95-.83.83 4.95 4.95L13 14.5V4.59zM5 5v3h4V5H5z" /></svg>
      );
    default:
      return null;
  }
}

function Card({ s }) {
  return (
    <li className="svc-grid__item">
      <a className="svc-grid__body" href={s.href} aria-label={s.featured ? `Learn more about ${s.title}` : `Get a quote for ${s.title}`}>
        <span className="svc-grid__icon" aria-hidden="true"><Icon name={s.icon} /></span>
        <div className="svc-grid__content">
          <h3 className="svc-grid__title">{s.title}</h3>
          <p className="svc-grid__desc">{s.desc}</p>
          <span className="svc-grid__link">
            {s.featured ? 'Learn more' : 'Get a quote'}
            <svg viewBox="0 0 10 10" aria-hidden="true" className="svc-grid__arrow">
              <path d="M1 5h7M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </span>
        </div>
      </a>
    </li>
  );
}

export default function ServicesSection() {
  const featured = SERVICES.filter((s) => s.featured);
  const others = SERVICES.filter((s) => !s.featured);

  return (
    <section className="section section--dim" id="services" aria-labelledby="services-title">
      <div className="container">
        <h2 className="section__title" id="services-title">What we repair</h2>
        <p className="lead">From a single scratch to a full recolor — leather, vinyl, and upholstery across sofas, cars, boats, motorcycles, and RVs.</p>

        {featured.length > 0 && (
          <>
            <h3 className="svc-subhead">Featured services <span className="svc-subhead__hint">— click to see process &amp; photos</span></h3>
            <ul className="svc-grid svc-grid--featured">
              {featured.map((s) => <Card key={s.key} s={s} />)}
            </ul>
          </>
        )}

        {others.length > 0 && (
          <>
            <h3 className="svc-subhead">Also available <span className="svc-subhead__hint">— get a free estimate</span></h3>
            <ul className="svc-grid">
              {others.map((s) => <Card key={s.key} s={s} />)}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

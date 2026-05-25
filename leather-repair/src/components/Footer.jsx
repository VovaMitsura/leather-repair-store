import { BUSINESS } from '../config/business.js';

const QUICK_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
  { href: '#/faq', label: 'FAQ' },
];

// Compact "M–F 9–10" / "Sat 9–6" / "Sun 9–12" summary derived from hours data.
function hoursSummary(hours) {
  // Group consecutive days with identical open/close times.
  const groups = [];
  for (const h of hours) {
    const last = groups[groups.length - 1];
    if (last && last.open === h.open && last.close === h.close) {
      last.days.push(h.day);
    } else {
      groups.push({ days: [h.day], open: h.open, close: h.close });
    }
  }
  return groups.map((g) => {
    const range = g.days.length === 1
      ? g.days[0].slice(0, 3)
      : `${g.days[0].slice(0, 3)}–${g.days[g.days.length - 1].slice(0, 3)}`;
    return `${range} ${g.open}–${g.close}`;
  });
}

export default function Footer() {
  const year = new Date().getFullYear();
  const hours = hoursSummary(BUSINESS.hours);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <div className="footer__brand">{BUSINESS.name}</div>
          <a className="footer__phone" href={`tel:${BUSINESS.phone.e164}`}>
            {BUSINESS.phone.display}
          </a>
          <a className="footer__email" href={`mailto:${BUSINESS.email}`}>
            {BUSINESS.email}
          </a>
          <p className="footer__tagline">{BUSINESS.freeEstimateTagline}</p>
        </div>

        <div className="footer__col">
          <div className="footer__col-title">Quick links</div>
          <ul className="footer__links">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <div className="footer__col-title">Hours</div>
          <ul className="footer__hours">
            {hours.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </div>

        <div className="footer__col">
          <div className="footer__col-title">Service area</div>
          <ul className="footer__area">
            {BUSINESS.serviceArea.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <span>© {year} {BUSINESS.legalName}. All rights reserved.</span>
          <span className="footer__bar-right">{BUSINESS.tagline} · {BUSINESS.address.locality}, {BUSINESS.address.region}</span>
        </div>
      </div>
    </footer>
  );
}

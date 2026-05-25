import { BUSINESS } from '../config/business.js';

export default function CtaBanner() {
  return (
    <section className="section section--dark cta-banner" aria-labelledby="cta-banner-title">
      <div className="container cta-banner__inner">
        <div className="cta-banner__text">
          <h2 className="cta-banner__title" id="cta-banner-title">See something you'd like restored?</h2>
          <p className="cta-banner__sub">Send a few photos — free estimate, no obligation, usually same day.</p>
        </div>
        <div className="cta-banner__actions">
          <a href="#contact" className="btn btn--primary btn--lg">Get a free estimate</a>
          <a href={`tel:${BUSINESS.phone.e164}`} className="btn btn--ghost btn--lg">
            Call {BUSINESS.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}

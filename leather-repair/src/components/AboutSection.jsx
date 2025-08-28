import React from 'react';

export default function AboutSection() {
  return (
    <section className="section section--narrow" id="about" aria-labelledby="about-title">
      <div className="container">
        <h2 className="section__title" id="about-title">About</h2>
        <div className="about">
          <p className="about__lead">
            Leather Repair & Restoration in Philadelphia. We repair, recolor, and restore leather for furniture and automotive interiors with durable, color‑matched finishes.
          </p>

          <div className="about__highlight">Cost‑effective alternative to replacement.</div>

          <ul className="about__list" aria-label="Services overview">
            <li>Furniture: sofas, recliners, office chairs, ottomans, headboards</li>
            <li>Automotive: car seats, steering wheels, interior panels</li>
            <li>Scratch, crack, and scuff repair</li>
            <li>Leather recoloring, conditioning, and protection</li>
          </ul>

          <div className="about__meta">
            <div className="about__meta-item">
              <span className="about__meta-label">Service Area</span>
              <span className="about__meta-value">Philadelphia</span>
            </div>
            <div className="about__meta-item">
              <span className="about__meta-label">Hours</span>
              <span className="about__meta-value">Mon–Sat, 9:00 AM – 7:00 PM</span>
            </div>
            <div className="about__meta-item">
              <span className="about__meta-label">Contact</span>
              <span className="about__meta-value">(267) 267‑8681 — Free estimates, call or text</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

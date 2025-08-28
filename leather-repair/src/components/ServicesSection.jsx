import React from 'react';

const services = [
  {
    title: 'Furniture',
    details: 'sofas, recliners, office chairs, ottomans, headboards',
    bullets: [
      'Seam repairs and panel replacement',
      'Foam/padding rebuild and cushion work',
      'Pet scratch and claw mark blending',
      'Deep clean, condition, and protection',
      'Custom dye and color matching',
    ],
  },
  {
    title: 'Automotive',
    details: 'car seats, steering wheels, interiors',
    bullets: [
      'Bolster wear and crack stabilization',
      'Perforated seat-safe recolor and repair',
      'Stitching touch-ups and seam fixes',
      'Steering wheel leather refinishing',
      'Spot dye and panel blending',
    ],
  },
  {
    title: 'Leather recoloring & restoration',
    details: 'bring back original color and finish',
    bullets: [
      'UV fade correction and color revival',
      'Full/partial recolor with finish options (matte–gloss)',
      'Topcoat protection for durability',
      'Crease and wear blending',
    ],
  },
  {
    title: 'Scratch, crack, and scuff repair',
    details: 'targeted blends for durable results',
    bullets: [
      'Minor scratch leveling and recolor',
      'Crack fill and reinforcement',
      'Edge wear and scuff restoration',
      'Texture and grain re-creation where needed',
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <h2 className="section__title" id="services-title">Services</h2>
        <div className="grid grid--cards">
          {services.map((s) => (
            <details className="card card--service" key={s.title}>
              <summary className="service__summary">
                <div>
                  <h3 className="card__title">{s.title}</h3>
                  <p className="card__body">{s.details}</p>
                </div>
              </summary>
              <div className="service__content">
                <ul className="service__list">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

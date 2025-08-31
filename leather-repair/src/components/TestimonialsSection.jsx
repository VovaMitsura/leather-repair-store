import React from 'react';

const testimonials = [
  {
    name: 'Brandon Vega',
    company: 'Private',
    photo: 'https://cdn.b12.io/media/91a8a7de-3cb4-11e8-9f2d-0242ac11000f-jpg-regular_image.jpeg',
    text:
      "Mitsura LLC transformed my worn-out leather sofa into a stunning centerpiece. Meticulous attention to detail and outstanding quality.",
  },
  {
    name: 'Chris Wei',
    company: 'Auto Revival',
    photo: 'https://cdn.b12.io/media/932aba5c-3cb4-11e8-9f2d-0242ac11000f-jpg-regular_image.jpeg',
    text:
      'They brought back the original color and texture of my car seats. On-site service in Philadelphia was super convenient.',
  },
  {
    name: 'Karen Weiss',
    company: 'Corporate Solutions',
    photo: 'https://cdn.b12.io/media/9e81eae2-3cb4-11e8-9f2d-0242ac11000f-jpg-regular_image.jpeg',
    text:
      'Our office chairs look fresh and inviting again. Smooth process, communicative team, exceptional craftsmanship.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section section--dim" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <h2 className="section__title" id="testimonials-title">Client satisfaction</h2>
        <p className="lead">Hear from our happy customers!</p>
        <ul className="simple-cards">
          {testimonials.map((t) => (
            <li key={t.name} className="simple-cards__item">
              <blockquote className="simple-cards__body">
                <div className="simple-cards__image">
                  <img src={t.photo} alt={t.name} loading="lazy" />
                </div>
                <p className="simple-cards__quote">{t.text}</p>
                <footer className="simple-cards__footer">
                  <div className="simple-cards__name">{t.name}</div>
                  <div className="simple-cards__company">{t.company}</div>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

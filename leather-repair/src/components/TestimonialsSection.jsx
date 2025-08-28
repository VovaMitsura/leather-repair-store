import React from 'react';

const testimonials = [
  {
    name: 'Monica R.',
    text: 'They restored my leather sofa beautifully. Looks brand new and saved me a fortune vs. replacing!',
  },
  {
    name: 'David K.',
    text: 'Fast turnaround on my car seat repair. Color match is spot-on. Highly recommend!',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <h2 className="section__title" id="testimonials-title">Testimonials</h2>
        <div className="grid grid--cards">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="card card--quote" aria-label={`Testimonial from ${t.name}`}>
              <p className="card__body">“{t.text}”</p>
              <footer className="card__footer">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}


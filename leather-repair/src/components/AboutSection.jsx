import React from 'react';

export default function AboutSection() {
  return (
    <section className="section section--dark" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="text-image text-image--right">
          <div className="text-image__content">
            <h2 className="section__title" id="about-title">CRAFTING LEATHER EXCELLENCE</h2>
            <p className="lead">Your trusted leather restoration partner</p>
            <p>
              At Mitsura LLC, we specialize in transforming tired leather into stunning, revitalized pieces. Our expert
              team is dedicated to providing top-notch restoration services for furniture and automotive interiors,
              ensuring every repair, recolor, and restoration meets the highest standards. With a focus on durable,
              color-matched finishes, we breathe new life into sofas, chairs, car interiors, and more. Experience the
              difference with our meticulous attention to detail and commitment to quality craftsmanship.
            </p>
            <div className="text-image__cta">
              <a href="#contact" className="btn btn--ghost">Get in touch</a>
            </div>
          </div>
          <div className="text-image__media">
            <img
              src="https://cdn.b12.io/client_media/tF1eDyDV/0e189e8d-8689-11f0-8cb4-0242ac110002-jpg-hero_image.jpeg"
              alt="Close up of beautifully restored leather"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

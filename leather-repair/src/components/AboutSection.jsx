export default function AboutSection() {
  return (
    <section className="section section--dark" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="text-image text-image--right">
          <div className="text-image__content">
            <h2 className="section__title" id="about-title">Leather, vinyl & upholstery — restored</h2>
            <p className="lead">Your trusted leather & upholstery restoration partner</p>
            <p>
              At Mitsura LLC, we restore tired furniture, automotive, and marine upholstery —
              leather, vinyl, bonded leather, and leather-match alike. From sofas, recliners, and
              office chairs to car and truck interiors, boat seats and helm chairs, motorcycle
              saddles, and RV captain's chairs — if it has an upholstered surface, we can usually
              repair it. With a focus on durable, color-matched finishes, we breathe new life
              into pieces that otherwise would be replaced.
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

import React from 'react';

export default function HeroSection() {
  const bg =
    "linear-gradient(0deg, rgba(0,0,0,.7), rgba(0,0,0,.3)), url('https://cdn.b12.io/client_media/tF1eDyDV/0e736718-8689-11f0-8573-0242ac110002-jpg-hero_image.jpeg')";

  return (
    <header
      id="home"
      className="hero hero--dark hero--image"
      style={{
        backgroundImage: bg,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="sticker" aria-label="Great pricing badge">Great Pricing!</div>
      <div className="container hero__content hero__content--left">
        <h1 className="hero__title">Revitalize your leather</h1>
        <p className="hero__subtitle">
          Expert <span className="highlight">restoration</span> services
        </p>
        <a href="#services" className="btn btn--primary">View services</a>
      </div>
    </header>
  );
}

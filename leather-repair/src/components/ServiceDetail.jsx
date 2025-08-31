import React from 'react';

const CONTENT = {
  'leather-scratch-repair': {
    title: 'LEATHER SCRATCH REPAIR',
    img: 'https://cdn.b12.io/client_media/tF1eDyDV/1332c3ca-8689-11f0-9956-0242ac110002-jpg-hero_image.jpeg',
    alt: 'Close-up leather scratch repair',
    body:
      `Scratches on leather can mar its beauty and reduce its lifespan. At Mitsura LLC, we specialize in professional leather scratch repair, ensuring that your furniture and automotive interiors look as good as new. Our skilled technicians meticulously assess the damage and use high-quality materials to seamlessly blend repairs with the original leather. We don't just fix scratches; we restore the elegance and durability of your leather surfaces. Trust us to revitalize your cherished items, allowing you to enjoy their beauty for years to come. Say goodbye to unsightly marks and hello to flawless leather!`,
  },
  'leather-recoloring': {
    title: 'LEATHER RECOLORING',
    img: 'https://cdn.b12.io/client_media/tF1eDyDV/131b6e32-8689-11f0-9b2d-0242ac110002-jpg-hero_image.jpeg',
    alt: 'Leather recoloring process',
    body:
      `Over time, leather can fade and lose its vibrant color, making it look worn and tired. Mitsura LLC offers exceptional leather recoloring services designed to restore the original hues of your furniture and automotive interiors. Our experts utilize advanced techniques and high-quality color-matched dyes to breathe new life into your leather. Whether it’s a faded sofa or a dull car seat, we ensure a flawless finish that enhances the overall appearance. Experience the transformation as we revive your leather's beauty, making it a stunning centerpiece once again. Trust us for a professional touch that lasts!`,
  },
  'leather-conditioning': {
    title: 'LEATHER CONDITIONING',
    img: 'https://cdn.b12.io/client_media/tF1eDyDV/13587761-8689-11f0-8e06-0242ac110002-jpg-hero_image.jpeg',
    alt: 'Leather conditioning',
    body:
      `Leather requires regular maintenance to keep it supple and prevent damage. At Mitsura LLC, we provide professional leather conditioning services that nourish and protect your leather furniture and automotive interiors. Our high-quality conditioners penetrate deep into the leather, restoring moisture and flexibility while preventing cracking and drying. Our team understands the unique needs of different leather types and uses tailored products to ensure optimal care. With our conditioning service, your leather will not only look stunning but will also remain durable and long-lasting. Invest in your leather’s health and enhance its life with our expert touch!`,
  },
};

export default function ServiceDetail({ slug }) {
  const data = CONTENT[slug];
  if (!data) {
    return (
      <main className="section section--narrow">
        <div className="container">
          <h2 className="section__title">Service not found</h2>
          <p className="lead">Please return to the <a href="#services">services</a> list.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section section--dark">
      <div className="container">
        <div className="detail">
          <div className="detail__media">
            <img src={data.img} alt={data.alt} loading="lazy" />
          </div>
          <div className="detail__content">
            <h1 className="detail__title">{data.title}</h1>
            <p className="detail__desc">{data.body}</p>
            <div className="detail__cta">
              <a className="btn btn--primary" href="#contact">Schedule appointment</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

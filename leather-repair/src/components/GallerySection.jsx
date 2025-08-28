import React from 'react';

const items = [
  { src: '/img/chair-before.png', label: 'Before', alt: 'Chair seat before leather repair' },
  { src: '/img/chair-after.png', label: 'After', alt: 'Chair seat after leather repair' },
  { src: '/img/seat-before.png', label: 'Before', alt: 'Car seat before leather repair' },
  { src: '/img/seat-after.png', label: 'After', alt: 'Car seat after leather repair' },
  { src: '/img/sofa-before.png', label: 'Before', alt: 'Sofa cushion before leather repair' },
  { src: '/img/sofa-after.png', label: 'After', alt: 'Sofa cushion after leather repair' },
];

export default function GallerySection() {
  return (
    <section className="section" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <h2 className="section__title" id="gallery-title">Before & After</h2>
        <div className="grid grid--gallery">
          {items.map((it, idx) => (
            <figure className="gallery__figure" key={idx}>
              <div className="gallery__media">
                <img className="gallery__img gallery__img--cover" src={it.src} alt={it.alt} loading="lazy" />
                <img className="gallery__img gallery__img--contain" src={it.src} alt="" aria-hidden="true" />
              </div>
              <figcaption className="gallery__caption">{it.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

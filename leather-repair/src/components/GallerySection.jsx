import React from 'react';
import BeforeAfter from './BeforeAfter.jsx';

export default function GallerySection() {
  return (
    <section className="section section--dark" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <h2 className="section__title" id="gallery-title">Our work</h2>
        <p className="lead">Exceptional leather restorations</p>
        <div className="before-after-grid">
          <BeforeAfter
            after="/img/chair-before.png"
            before="/img/chair-after.png"
            altBefore="Chair seat before leather repair"
            altAfter="Chair seat after leather repair"
            label="Chair repair"
          />
          <BeforeAfter
            after="/img/seat-before.png"
            before="/img/seat-after.png"
            altBefore="Car seat before leather repair"
            altAfter="Car seat after leather repair"
            label="Car seat repair"
          />
          <BeforeAfter
            after="/img/sofa-before.png"
            before="/img/sofa-after.png"
            altBefore="Sofa cushion before leather repair"
            altAfter="Sofa cushion after leather repair"
            label="Sofa repair"
          />
        </div>
      </div>
    </section>
  );
}

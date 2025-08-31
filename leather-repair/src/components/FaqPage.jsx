import React from 'react';

export default function FaqPage() {
  const bg =
    "linear-gradient(0deg, rgba(0,0,0,.7), rgba(0,0,0,.3)), url('https://cdn.b12.io/client_media/tF1eDyDV/0e736718-8689-11f0-8573-0242ac110002-jpg-hero_image.jpeg')";

  return (
    <>
      <header
        className="hero hero--dark hero--image hero--small"
        style={{
          backgroundImage: bg,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="container hero__content hero__content--left">
          <h1 className="hero__title">Your leather questions</h1>
          <p className="hero__subtitle">Get expert answers and insights</p>
        </div>
      </header>

      <main className="section faq-page" aria-labelledby="faq-title">
        <div className="container">
          <h2 className="section__title" id="faq-title">FAQ</h2>
          <div className="faq">
          <details className="faq__item">
            <summary>Do you come to my location? Can I drop off?</summary>
            <p>Yes. We offer mobile/on‑site service within the Philadelphia area. For certain items, you can also bring or drop off by appointment—whichever is easier for you.</p>
          </details>
          <details className="faq__item">
            <summary>Can torn or ripped leather be repaired or replaced?</summary>
            <p>Yes. Tears, rips, and worn panels can be reinforced and, when needed, replaced. We color‑match and texture‑blend so the repair looks natural and lasts.</p>
          </details>
          <details className="faq__item">
            <summary>What kinds of issues do you repair?</summary>
            <p>We handle scratches, cracks, scuffs, fading, stains, wear, seam/stitching issues, bolster wear, foam/cushion problems, recoloring, conditioning, and more.</p>
          </details>
          <details className="faq__item">
            <summary>How do I get a free estimate?</summary>
            <p>Send a few photos and a brief description of the issue via the contact form below or by call/text. We’ll reply with options and an estimate.</p>
          </details>
          <details className="faq__item">
            <summary>How long does a repair take?</summary>
            <p>Most small repairs are completed in 1–2 hours. Larger furniture projects can take a few hours. We’ll give you a timeline when we schedule the job.</p>
          </details>
          <details className="faq__item">
            <summary>What types of leather do you work with?</summary>
            <p>We restore genuine leather, bonded leather, vinyl, and leather-match surfaces. Each material requires a different approach.</p>
          </details>
          <details className="faq__item">
            <summary>Is the repair permanent?</summary>
            <p>Properly maintained, repairs last for years. We use professional-grade dyes, fillers, and coatings designed for durability.</p>
          </details>
          </div>
        </div>
      </main>
    </>
  );
}

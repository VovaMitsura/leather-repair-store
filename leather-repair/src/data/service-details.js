// Structured content for each service detail page.
// Slug must match the URL: /#/service/<slug>
// To add a new featured service:
//   1. Add an entry here
//   2. Mark `featured: true` for the matching item in src/config/services.js

export const SERVICE_DETAILS = {
  'leather-scratch-repair': {
    title: 'Leather scratch repair',
    lead:
      'From light surface marks to deep gouges on sofas, car seats, boat upholstery, and more — blended into the surrounding finish so the repair is invisible.',
    img: '/img/sofa-scratch-after2.jpg',
    imgAlt: 'Restored leather sofa armrest after scratch and finish repair',
    causes: {
      heading: 'What causes scratches',
      body:
        "Pets, keys, belts, buttons, and everyday wear. Scratches start as marks in the protective topcoat. Left alone, they collect dirt and deepen — eventually exposing the dyed leather underneath and making the repair more involved.",
    },
    process: {
      heading: 'What we do',
      steps: [
        'Assess depth and confirm color-match needs — in person or from photos.',
        'Clean and prep the area so dyes and fillers actually bond.',
        'Fill deeper marks with a leather-compatible filler, then sand flush.',
        'Color-match dye to the surrounding leather and apply in fine, even layers.',
        'Seal with a flexible topcoat that flexes with the leather instead of cracking.',
      ],
    },
    timeline: {
      heading: 'Typical timeline',
      body:
        'Most single-area scratch repairs take 1–2 hours on-site. Larger pieces with multiple repair zones can take a half day. You get a clear timeline with your estimate before we start.',
    },
    gallery: [
      { src: '/img/sofa-scratch-before1.jpg', alt: 'Sofa cushion with light surface marks before repair', kind: 'before' },
      { src: '/img/sofa-scratch-before2.jpg', alt: 'Sofa armrest with heavy finish peeling, before repair', kind: 'before' },
      { src: '/img/sofa-scratch-before3.jpg', alt: 'Sofa armrest close-up with white peeling damage, before repair', kind: 'before' },
      { src: '/img/sofa-scratch-before4.jpg', alt: 'Sofa armrest with crack and flaking finish, before repair', kind: 'before' },
      { src: '/img/sofa-scratch-before5.jpg', alt: 'Sofa backrest with light surface damage and dust, before repair', kind: 'before' },
      { src: '/img/sofa-scratch-before6.jpg', alt: 'Sofa armrest with severe finish failure and shiny coating, before repair', kind: 'before' },
      { src: '/img/sofa-scratch-after1.jpg', alt: 'Fully restored ornate chesterfield sofa', kind: 'after' },
      { src: '/img/sofa-scratch-after2.jpg', alt: 'Restored sofa armrest close-up after refinishing', kind: 'after' },
      { src: '/img/sofa-scratch-after3.jpg', alt: 'Restored chesterfield sofa shown in natural light', kind: 'after' },
      { src: '/img/sofa-scratch-after4.jpg', alt: 'Restored chesterfield loveseat alongside matching sofa', kind: 'after' },
    ],
  },

  'leather-recoloring': {
    title: 'Leather recoloring & dye match',
    lead:
      'Faded sofas, sun-damaged car seats, worn-out office chairs, boat and motorcycle seats — restored to their original color and depth on leather, vinyl, and leather-match.',
    img: '/img/sofa-scratch-after1.jpg',
    imgAlt: 'Full ornate chesterfield sofa fully restored with color-matched finish',
    causes: {
      heading: 'Why leather fades',
      body:
        'Sunlight, body oils, and friction break down the dye and topcoat over time. Most leather looks "tired" long before it actually wears through — recoloring brings the original tone back without replacing the leather itself.',
    },
    process: {
      heading: 'What we do',
      steps: [
        'Color-match against the original tone (or a swatch you provide) using professional dye samples.',
        'Strip the failing topcoat and clean down to a sound surface.',
        'Apply pigment in thin, layered coats so the color reads natural under different lighting.',
        'Texture-blend to keep the original grain pattern — recoloring should not flatten the leather.',
        'Seal with a durable, flexible finish that resists future fading.',
      ],
    },
    timeline: {
      heading: 'Typical timeline',
      body:
        'A single car seat or chair: a few hours. A full sofa or sectional: half day to a full day. We work mobile/on-site for most jobs, so you keep your furniture where it lives.',
    },
    gallery: [
      { src: '/img/chair-before.png', alt: 'Chair seat before leather recoloring and dye match', kind: 'before' },
      { src: '/img/chair-after.png',  alt: 'Chair seat after recoloring — color-matched and even',  kind: 'after' },
    ],
  },

  'leather-conditioning': {
    title: 'Leather cleaning & conditioning',
    lead:
      'Deep cleans and protective conditioning for sofas, recliners, car interiors, and boat seats — the maintenance most leather never gets, and the reason it cracks years too early.',
    img: '/img/sofa-scratch-after3.jpg',
    imgAlt: 'Restored leather sofa with deep clean and conditioning finish',
    causes: {
      heading: 'Why conditioning matters',
      body:
        'Leather dries out from the inside. Once the natural oils are gone, the fibers stiffen, then crack — and cracks are much harder (and pricier) to fix than dryness. Regular cleaning and conditioning is the single biggest thing you can do to extend leather life.',
    },
    process: {
      heading: 'What we do',
      steps: [
        'Identify the leather type — finished, aniline, nubuck, bonded, or leather-match — because each takes different care.',
        'Deep-clean to lift body oils, dye transfer, and ground-in dirt without stripping the finish.',
        'Apply a conditioner matched to the leather type so it absorbs without leaving residue.',
        'Buff to even sheen — no greasy feel, no sticky finish.',
        'Recommend a maintenance interval so you can keep it up between professional visits.',
      ],
    },
    timeline: {
      heading: 'Typical timeline',
      body:
        'A single chair or car interior: 1–2 hours. A full sofa: 2–3 hours. Most jobs can be done on-site while you wait.',
    },
  },
};

export default SERVICE_DETAILS;

import BeforeAfter from './BeforeAfter.jsx';

const ITEMS = [
  // Real customer sofa restoration — heavy peeling on the ornate chesterfield.
  // BEFORE shots are close-ups of the damage; AFTER shots show the finished sofa.
  {
    key: 'sofa-restore-1',
    label: 'Chesterfield sofa restoration',
    before: '/img/sofa-scratch-before6',
    after: '/img/sofa-scratch-after2',
    altBefore: 'Sofa armrest with severe finish failure and shiny coating, before repair',
    altAfter: 'Restored sofa armrest with deep glossy finish, after repair',
    ext: 'jpg',
    width: 1080,
    height: 1440,
    aspectRatio: '1 / 1',
  },
  {
    key: 'sofa-restore-2',
    label: 'Armrest crack and peeling repair',
    before: '/img/sofa-scratch-before4',
    after: '/img/sofa-scratch-after3',
    altBefore: 'Sofa armrest with crack and flaking finish, before repair',
    altAfter: 'Same sofa fully restored, tufted backrest and arm visible',
    ext: 'jpg',
    width: 1080,
    height: 1440,
    aspectRatio: '1 / 1',
  },
  {
    key: 'sofa-restore-3',
    label: 'Full sofa refinish',
    before: '/img/sofa-scratch-before5',
    after: '/img/sofa-scratch-after1',
    altBefore: 'Sofa backrest with light surface damage and dust, before repair',
    altAfter: 'Fully restored ornate chesterfield sofa with tufted back',
    ext: 'jpg',
    width: 1080,
    height: 1440,
    aspectRatio: '1 / 1',
  },
  // Template chair & seat pairs — keep until real photos are provided.
  {
    key: 'chair',
    label: 'Chair repair',
    before: '/img/chair-before',
    after: '/img/chair-after',
    altBefore: 'Chair seat before leather repair',
    altAfter: 'Chair seat after leather repair',
    width: 1162,
    height: 472,
  },
  {
    key: 'seat',
    label: 'Car seat repair',
    before: '/img/seat-before',
    after: '/img/seat-after',
    altBefore: 'Car seat before leather repair',
    altAfter: 'Car seat after leather repair',
    width: 1160,
    height: 402,
  },
];

export default function GallerySection() {
  return (
    <section className="section section--dark" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <h2 className="section__title" id="gallery-title">Our work</h2>
        <p className="lead">Real customer repairs — drag the slider to compare before and after.</p>
        <div className="before-after-grid">
          {ITEMS.map((it) => (
            <BeforeAfter
              key={it.key}
              before={it.before}
              after={it.after}
              altBefore={it.altBefore}
              altAfter={it.altAfter}
              label={it.label}
              ext={it.ext}
              width={it.width}
              height={it.height}
              aspectRatio={it.aspectRatio}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

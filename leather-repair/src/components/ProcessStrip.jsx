const STEPS = [
  {
    n: 1,
    title: 'Send a few photos',
    desc: 'Text or email pictures of the damage with a short description.',
  },
  {
    n: 2,
    title: 'Get a free estimate',
    desc: 'We reply with a price range and a realistic timeline — usually same day.',
  },
  {
    n: 3,
    title: 'We do the repair',
    desc: 'Mobile / on-site for most furniture and automotive jobs.',
  },
  {
    n: 4,
    title: 'Enjoy the result',
    desc: 'Color-matched and texture-blended so it looks like new — and lasts.',
  },
];

export default function ProcessStrip() {
  return (
    <section className="section process" aria-labelledby="process-title">
      <div className="container">
        <h2 className="section__title" id="process-title">How it works</h2>
        <p className="lead">From your photo to a finished repair — four simple steps.</p>
        <ol className="process__steps">
          {STEPS.map((s) => (
            <li key={s.n} className="process__step">
              <span className="process__num" aria-hidden="true">{s.n}</span>
              <h3 className="process__step-title">{s.title}</h3>
              <p className="process__step-desc">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

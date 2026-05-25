// Qualitative USPs only — no numbers we can't substantiate.

const USPS = [
  {
    title: 'Free estimates',
    desc: 'Send photos, get a quote. No site visit required, no obligation.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Mobile / on-site',
    desc: "We come to you for most furniture and automotive jobs in the Philly area.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 17V7h11v4h3l3 3v3h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3zm14 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zM7 18a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Color-match guarantee',
    desc: 'Professional dyes and texture-blending so the repair looks like original.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 4 11l8 8 8-8-8-8zm0 2.83L17.17 11 12 16.17 6.83 11 12 5.83z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Furniture & automotive',
    desc: 'One specialist for sofas, chairs, recliners, car seats, and steering wheels.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 18v-2h2v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3h2v2H4zm4-5v3h8v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1zM6 9V5h12v4h-2V7H8v2H6z" fill="currentColor" />
      </svg>
    ),
  },
];

export default function WhyUs() {
  return (
    <section className="section why" aria-labelledby="why-title">
      <div className="container">
        <h2 className="section__title" id="why-title">Why choose us</h2>
        <p className="lead">Specialists in leather restoration — not a general furniture shop.</p>
        <ul className="why__grid">
          {USPS.map((u) => (
            <li key={u.title} className="why__item">
              <span className="why__icon" aria-hidden="true">{u.icon}</span>
              <h3 className="why__item-title">{u.title}</h3>
              <p className="why__item-desc">{u.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

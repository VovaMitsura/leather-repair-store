// Item categories we work on. Reuses .why__ styles from App.css for visual consistency
// with the WhyUs section (no new CSS required).

const ITEMS = [
  {
    title: 'Furniture',
    desc: 'Sofas, sectionals, recliners, chairs, ottomans — leather and vinyl.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 11V8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3h4V8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3a3 3 0 0 1 3 3v3h-2v-2H3v2H1v-3a3 3 0 0 1 3-3z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Automotive',
    desc: 'Car & truck interiors — seats, dashboards, steering wheels, door panels.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11h1a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h1zm2 0h10l-1-3H8l-1 3zm0 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Marine & boats',
    desc: 'Boat seats, helm chairs, vinyl panels, exterior and interior cushions.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2 7 6v4h10V6l-5-4zM4 12l-2 5c0 2 4 4 10 4s10-2 10-4l-2-5H4zm8 1h3v3h-3v-3z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Motorcycle, RV & aviation',
    desc: "Motorcycle seats, RV captain's chairs and dinettes, aviation interiors.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 17a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm14 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM7 11l3-4h4l1 2h3l2 2h-2a4 4 0 0 0-4 4H9a4 4 0 0 0-2-4zm-2 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm14 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
      </svg>
    ),
  },
];

export default function ItemTypes() {
  return (
    <section className="section item-types" aria-labelledby="items-title">
      <div className="container">
        <h2 className="section__title" id="items-title">What we work on</h2>
        <p className="lead">Leather, vinyl, bonded leather, and leather-match — across furniture, automotive, marine, and more.</p>
        <ul className="why__grid">
          {ITEMS.map((it) => (
            <li key={it.title} className="why__item">
              <span className="why__icon" aria-hidden="true">{it.icon}</span>
              <h3 className="why__item-title">{it.title}</h3>
              <p className="why__item-desc">{it.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

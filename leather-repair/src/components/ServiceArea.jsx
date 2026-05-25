import { BUSINESS } from '../config/business.js';

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="area__pin">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill="currentColor" />
    </svg>
  );
}

export default function ServiceArea() {
  return (
    <section className="section area" id="service-area" aria-labelledby="area-title">
      <div className="container">
        <h2 className="section__title" id="area-title">Where we work</h2>
        <p className="lead">On-site service across the Philadelphia area and surrounding counties.</p>
        <ul className="area__list">
          {BUSINESS.serviceArea.map((place) => (
            <li key={place} className="area__chip">
              <PinIcon />
              <span>{place}</span>
            </li>
          ))}
        </ul>
        <p className="area__footnote">
          Don't see your area? <a href="#contact">Get in touch</a> — we may still cover it,
          or arrange drop-off / pickup.
        </p>
      </div>
    </section>
  );
}

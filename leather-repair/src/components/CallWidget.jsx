import { BUSINESS } from '../config/business.js';

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z" fill="currentColor"/>
    </svg>
  );
}

export default function CallWidget() {
  const ariaLabel = `Call ${BUSINESS.name}: ${BUSINESS.phone.display}`;
  const tel = `tel:${BUSINESS.phone.e164}`;

  return (
    <>
      {/* Floating button (desktop / tablet) */}
      <a href={tel} className="call-widget" aria-label={ariaLabel}>
        <span className="call-widget__icon"><PhoneIcon /></span>
        <span className="call-widget__text">Call us now</span>
      </a>

      {/* Sticky bottom bar (mobile only) */}
      <a href={tel} className="call-bar" aria-label={ariaLabel}>
        <span className="call-bar__icon"><PhoneIcon /></span>
        <span className="call-bar__text">
          <span className="call-bar__label">Call for a free estimate</span>
          <span className="call-bar__number">{BUSINESS.phone.display}</span>
        </span>
      </a>
    </>
  );
}

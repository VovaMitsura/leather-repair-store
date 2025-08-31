import React from 'react';

export default function CallWidget() {
  return (
    <a href="tel:+12672678681" className="call-widget" aria-label="Call us now">
      <svg className="call-widget__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z" fill="currentColor"/>
      </svg>
      <span className="call-widget__text">Call us now</span>
    </a>
  );
}


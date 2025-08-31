import React, { useState } from 'react';

export default function BeforeAfter({ before, after, altBefore, altAfter, label }) {
  const [pos, setPos] = useState(50); // percentage

  function onChange(e) {
    setPos(Number(e.target.value));
  }

  return (
    <div className="before-after" aria-label={label} role="group">
      <div className="before-after__viewport">
        <img className="before-after__img before-after__img--before" src={before} alt={altBefore} loading="lazy" />
        <img
          className="before-after__img before-after__img--after"
          src={after}
          alt={altAfter}
          loading="lazy"
          style={{ width: `${pos}%` }}
        />
        <div className="before-after__handle" style={{ left: `${pos}%` }} aria-hidden="true">
          <span />
        </div>
        <div className="before-after__tags" aria-hidden="true">
          <span className="before-after__tag before-after__tag--left">Before</span>
          <span className="before-after__tag before-after__tag--right">After</span>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={onChange}
        className="before-after__range"
        aria-label={`Reveal slider for ${label}`}
      />
    </div>
  );
}


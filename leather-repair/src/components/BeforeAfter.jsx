import { useState } from 'react';

// `before` and `after` are base paths WITHOUT extension (e.g. "/img/chair-before").
// The component renders <picture> with .webp and a fallback (PNG by default,
// override via `ext="jpg"` for photo-style sources).
export default function BeforeAfter({ before, after, altBefore, altAfter, label, width, height, ext = 'png', aspectRatio }) {
  const [pos, setPos] = useState(50);

  function onChange(e) {
    setPos(Number(e.target.value));
  }

  // `aspectRatio` overrides the default 4:3 — useful when before/after pairs
  // have mixed framing and you want a square or portrait crop.
  const viewportStyle = aspectRatio ? { aspectRatio } : undefined;

  return (
    <div className="before-after" aria-label={label} role="group">
      <div className="before-after__viewport" style={viewportStyle}>
        {/* AFTER is the base layer (always fully visible underneath) */}
        <picture>
          <source type="image/webp" srcSet={`${after}.webp`} />
          <img
            className="before-after__img before-after__img--after"
            src={`${after}.${ext}`}
            alt={altAfter}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
          />
        </picture>
        {/* BEFORE is the overlay anchored LEFT, clipped by the slider position */}
        <picture>
          <source type="image/webp" srcSet={`${before}.webp`} />
          <img
            className="before-after__img before-after__img--before"
            src={`${before}.${ext}`}
            alt={altBefore}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            style={{ width: `${pos}%` }}
          />
        </picture>
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

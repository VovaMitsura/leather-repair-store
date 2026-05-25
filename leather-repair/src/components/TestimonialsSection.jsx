import { TESTIMONIALS } from '../data/testimonials.js';

function initials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function Stars({ count = 5 }) {
  const safe = Math.max(0, Math.min(5, Math.round(count)));
  return (
    <span className="stars" aria-label={`${safe} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={i < safe ? 'stars__star stars__star--on' : 'stars__star'} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5l2.95 6.6 7.05.65-5.32 4.78 1.62 6.97L12 17.95l-6.3 3.55 1.62-6.97L2 9.75l7.05-.65L12 2.5z" fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}

function SourceBadge({ source }) {
  if (!source) return null;
  const label = source === 'google' ? 'via Google' : source === 'yelp' ? 'via Yelp' : `via ${source}`;
  return <span className="src-badge">{label}</span>;
}

export default function TestimonialsSection() {
  return (
    <section className="section section--dim" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <h2 className="section__title" id="testimonials-title">What customers say</h2>
        <p className="lead">Real feedback from people who've trusted us with their leather.</p>
        <ul className="reviews">
          {TESTIMONIALS.map((t) => (
            <li key={`${t.name}-${t.date}`} className="reviews__item">
              <article className="review">
                <header className="review__head">
                  <span className="avatar" aria-hidden="true">{initials(t.name)}</span>
                  <div className="review__who">
                    <div className="review__name">{t.name}</div>
                    <div className="review__meta">
                      <Stars count={t.rating} />
                      <span className="review__sep" aria-hidden="true">·</span>
                      <time className="review__date" dateTime={t.date}>{formatDate(t.date)}</time>
                      <SourceBadge source={t.source} />
                    </div>
                  </div>
                </header>
                <blockquote className="review__quote">"{t.text}"</blockquote>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

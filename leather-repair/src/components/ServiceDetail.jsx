import { BUSINESS } from '../config/business.js';
import { SERVICE_DETAILS } from '../data/service-details.js';
import NotFoundPage from './NotFoundPage.jsx';

export default function ServiceDetail({ slug }) {
  const data = SERVICE_DETAILS[slug];
  if (!data) return <NotFoundPage />;

  return (
    <article className="svc-page">
      <header className="svc-page__header section section--dark">
        <div className="container svc-page__header-inner">
          <div className="svc-page__header-text">
            <p className="svc-page__crumb">
              <a href="#services">Services</a> <span aria-hidden="true">›</span> {data.title}
            </p>
            <h1 className="svc-page__title">{data.title}</h1>
            <p className="svc-page__lead">{data.lead}</p>
            <div className="svc-page__cta-row">
              <a href="#contact" className="btn btn--primary btn--lg">Get a free estimate</a>
              <a href={`tel:${BUSINESS.phone.e164}`} className="btn btn--ghost btn--lg">
                Call {BUSINESS.phone.display}
              </a>
            </div>
          </div>
          <div className="svc-page__header-media">
            <img src={data.img} alt={data.imgAlt} loading="eager" decoding="async" fetchPriority="high" />
          </div>
        </div>
      </header>

      <section className="section svc-page__body" aria-label={data.title}>
        <div className="container svc-page__grid">

          <div className="svc-block">
            <h2 className="svc-block__title">{data.causes.heading}</h2>
            <p className="svc-block__body">{data.causes.body}</p>
          </div>

          <div className="svc-block">
            <h2 className="svc-block__title">{data.process.heading}</h2>
            <ol className="svc-block__steps">
              {data.process.steps.map((step, i) => (
                <li key={i}>
                  <span className="svc-block__step-num" aria-hidden="true">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="svc-block">
            <h2 className="svc-block__title">{data.timeline.heading}</h2>
            <p className="svc-block__body">{data.timeline.body}</p>
          </div>

        </div>
      </section>

      {data.gallery?.length > 0 && (
        <section className="section svc-page__gallery" aria-labelledby="svc-gallery-title">
          <div className="container">
            <h2 className="svc-block__title" id="svc-gallery-title">Real customer photos</h2>
            <p className="svc-block__body">
              A look at real customer work — the damage we see and the finished result.
            </p>
            <ul className={`svc-gallery${data.gallery.length <= 2 ? ' svc-gallery--small' : ''}`}>
              {data.gallery.map((g) => (
                <li key={g.src} className="svc-gallery__item">
                  <picture>
                    <source type="image/webp" srcSet={g.src.replace(/\.(jpe?g|png)$/i, '.webp')} />
                    <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
                  </picture>
                  <span className={`svc-gallery__badge svc-gallery__badge--${g.kind}`}>
                    {g.kind === 'before' ? 'Before' : 'After'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section section--dark svc-page__bottom-cta" aria-labelledby="svc-bottom-cta-title">
        <div className="container svc-page__bottom-cta-inner">
          <div>
            <h2 className="svc-page__bottom-title" id="svc-bottom-cta-title">Ready to bring it back to life?</h2>
            <p className="svc-page__bottom-sub">
              Send a few photos — free estimate, no obligation.
            </p>
          </div>
          <div className="svc-page__cta-row">
            <a href="#contact" className="btn btn--primary btn--lg">Get a free estimate</a>
            <a href={`tel:${BUSINESS.phone.e164}`} className="btn btn--ghost btn--lg">
              Call {BUSINESS.phone.display}
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}

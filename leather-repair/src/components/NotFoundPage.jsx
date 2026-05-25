import { BUSINESS } from '../config/business.js';

export default function NotFoundPage() {
  return (
    <main className="section section--dark not-found" aria-labelledby="not-found-title">
      <div className="container not-found__inner">
        <p className="not-found__code">404</p>
        <h1 className="not-found__title" id="not-found-title">Page not found</h1>
        <p className="not-found__body">
          The page you're looking for doesn't exist or has moved. From here you can return home,
          browse our services, or get in touch.
        </p>
        <div className="not-found__actions">
          <a className="btn btn--primary" href="#home">Back to home</a>
          <a className="btn btn--ghost" href={`tel:${BUSINESS.phone.e164}`}>
            Call {BUSINESS.phone.display}
          </a>
        </div>
      </div>
    </main>
  );
}

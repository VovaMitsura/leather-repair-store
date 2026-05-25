import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  // Close the menu on Esc, and on link click (handled via onClick below).
  useEffect(() => {
    if (!open) return;
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <nav className="nav" aria-label="Primary">
      <div className="container nav__inner">
        <a href="#home" className="nav__brand" aria-label="Home" onClick={() => setOpen(false)}>
          <picture>
            <source type="image/webp" srcSet="/img/logo-256.webp 1x, /img/logo-512.webp 2x" />
            <img
              className="nav__logo"
              src="/img/logo-256.png"
              srcSet="/img/logo-256.png 1x, /img/logo-512.png 2x"
              alt="Mitsura LLC logo"
              width="256"
              height="256"
              decoding="async"
            />
          </picture>
        </a>

        <ul className="nav__list nav__list--desktop">
          {LINKS.map((l) => {
            const isContact = l.label.toLowerCase() === 'contact';
            return (
              <li key={l.href} className="nav__item">
                <a className={`nav__link${isContact ? ' nav__link--contact' : ''}`} href={l.href}>
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className={`nav__burger${open ? ' nav__burger--open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        id="mobile-menu"
        className={`nav__mobile${open ? ' nav__mobile--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        hidden={!open}
      >
        <ul className="nav__mobile-list">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a className="nav__mobile-link" href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

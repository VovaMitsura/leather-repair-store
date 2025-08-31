import React from 'react';

export default function NavBar() {
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="nav" aria-label="Primary">
      <div className="container nav__inner">
        <a href="#home" className="nav__brand" aria-label="MITSURA LLC Home">
          <img className="nav__logo" src='/img/logo.png' alt="" />
          <span>MITSURA LLC</span>
        </a>
        <ul className="nav__list">
          {links.map((l) => {
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
      </div>
    </nav>
  );
}

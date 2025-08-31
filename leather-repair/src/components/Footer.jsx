import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__content">
        <div className="footer__left">
          <a className="footer__phone" href="tel:+12672678681"><strong>(267) 267-8681</strong></a>
          <span className="footer__tagline"> — Free Estimates · Call or Text</span>
        </div>
        <div className="footer__right"><a href="#/faq">FAQ</a></div>
      </div>
    </footer>
  );
}

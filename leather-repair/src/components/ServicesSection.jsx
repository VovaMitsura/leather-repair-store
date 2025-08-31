import React from 'react';

const items = [
  {
    title: 'Leather scratch repair',
    desc: "Restore your leather's pristine condition with expert scratch repair.",
    href: '#/service/leather-scratch-repair',
    img: 'https://cdn.b12.io/client_media/tF1eDyDV/1332c3ca-8689-11f0-9956-0242ac110002-jpg-hero_image.jpeg',
    alt: 'Technician repairing a leather surface close-up',
  },
  {
    title: 'Leather recoloring',
    desc: 'Revitalize your leather with our professional recoloring services.',
    href: '#/service/leather-recoloring',
    img: 'https://cdn.b12.io/client_media/tF1eDyDV/131b6e32-8689-11f0-9b2d-0242ac110002-jpg-hero_image.jpeg',
    alt: 'Leather recliner being recolored',
  },
  {
    title: 'Leather conditioning',
    desc: 'Nourish and protect your leather with expert conditioning.',
    href: '#/service/leather-conditioning',
    img: 'https://cdn.b12.io/client_media/tF1eDyDV/13587761-8689-11f0-8e06-0242ac110002-jpg-hero_image.jpeg',
    alt: 'Applying leather conditioner close-up',
  },
];

export default function ServicesSection() {
  return (
    <section className="section section--dim" id="services" aria-labelledby="services-title">
      <div className="container">
        <h2 className="section__title" id="services-title">Expert leather care</h2>
        <p className="lead">Revitalize your leather furnishings</p>
        <ul className="items-grid">
          {items.map((it) => (
            <li key={it.title} className="items-grid__item">
              <a className="items-grid__body" href={it.href} aria-label={`Learn more: ${it.title}`}>
                <figure className="items-grid__media">
                  <img src={it.img} alt={it.alt} loading="lazy" />
                </figure>
                <div className="items-grid__content">
                  <div className="items-grid__header">
                    {it.title}
                    <svg aria-hidden="true" viewBox="0 0 10 17" className="items-grid__arrow">
                      <path d="M1.25111 16.0843c-.320261 0-.640343-.1222-.88465-.3663-.488613-.4886-.488613-1.2807 0-1.7693l5.90679-5.90664L.36646 2.13545c-.488613-.48844-.488613-1.28069 0-1.769124.488434-.488435 1.28069-.488435 1.76912 0L8.92684 7.15759c.48844.48843.48844 1.28068 0 1.7693L2.13558 15.7181c-.24412.244-.56421.3662-.88447.3662Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div className="items-grid__desc">{it.desc}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

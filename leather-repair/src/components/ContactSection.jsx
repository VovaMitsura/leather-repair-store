import React, { useEffect, useRef, useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', consent: false, _hp: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, type: 'success', message: '' });
  const closeBtnRef = useRef(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }
    if (!form.consent) {
      setStatus({ type: 'error', message: 'Please accept the consent checkbox.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: form.message, _hp: form._hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        const msg = (data && (data.error || data.message)) || 'Failed to send. Please try again later.';
        setStatus({ type: 'error', message: msg });
        setModal({ open: true, type: 'error', message: msg });
      } else {
        const msg = 'Thanks! Your message was sent. We will reach out shortly.';
        setStatus({ type: 'success', message: msg });
        setModal({ open: true, type: 'success', message: msg });
        setForm({ name: '', email: '', phone: '', message: '', consent: false, _hp: '' });
      }
    } catch (err) {
      const msg = 'Network error. Please try again.';
      setStatus({ type: 'error', message: msg });
      setModal({ open: true, type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setModal((m) => ({ ...m, open: false }));
  }

  useEffect(() => {
    if (modal.open) setTimeout(() => closeBtnRef.current?.focus(), 0);
  }, [modal.open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && modal.open) closeModal();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal.open]);

  return (
    <section className="section section--dark" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact">
          <div className="contact__form">
            <h2 className="section__title" id="contact-title">Get in touch</h2>
            <p className="lead">We're here to assist you!</p>
            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="form__row">
                <label htmlFor="name">Name *</label>
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Jane Smith" />
              </div>
              <div className="form__row">
                <label htmlFor="email">Email address *</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="email@website.com" />
              </div>
              <div className="form__row">
                <label htmlFor="phone">Phone number *</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="555-555-5555" />
              </div>
              <div className="form__row">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="4" value={form.message} onChange={handleChange} placeholder="Tell us about your leather needs" />
              </div>
              {/* Honeypot field to deter bots */}
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <label htmlFor="_hp">Leave this field empty</label>
                <input id="_hp" name="_hp" type="text" value={form._hp} onChange={handleChange} tabIndex={-1} autoComplete="off" />
              </div>

              <button className="btn btn--primary" type="submit" disabled={loading}>
                {loading ? 'Sending…' : 'Submit'}
              </button>
              <div className="form__consent">
                <label htmlFor="consent" className="form__consent-label">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={!!form.consent}
                    onChange={handleChange}
                  />
                  <span>
                    I allow this website to store my submission so they can respond to my inquiry. <span title="This field is required">*</span>
                  </span>
                </label>
              </div>
              <span className="visually-hidden" aria-live="polite">{status.message}</span>
            </form>
          </div>
          <div className="contact__details">
            <div className="contact-details">
              <div className="contact-details__row">
                <div className="h3 contact-details__title">Get in touch</div>
                <div className="contact-details__email">
                  <a className="email" href="mailto:micuranikolaj@gmail.com">micuranikolaj@gmail.com</a>
                </div>
              </div>
              <div className="contact-details__row">
                <div className="h3 contact-details__title">Location</div>
                <p className="adr contact-details__address">
                  <a href="https://www.google.com/maps/place/+Philadelphia+PA+US" target="_blank" rel="noreferrer">
                    Philadelphia, PA US
                  </a>
                </p>
              </div>
              <div className="contact-details__row">
                <div className="h3 contact-details__title">Hours</div>
                <ol aria-label="Working hours" className="hours-list">
                  <li className="hours-list__item"><span>Monday</span><span>9:00am – 10:00pm</span></li>
                  <li className="hours-list__item"><span>Tuesday</span><span>9:00am – 10:00pm</span></li>
                  <li className="hours-list__item"><span>Wednesday</span><span>9:00am – 10:00pm</span></li>
                  <li className="hours-list__item"><span>Thursday</span><span>9:00am – 10:00pm</span></li>
                  <li className="hours-list__item"><span>Friday</span><span>9:00am – 10:00pm</span></li>
                  <li className="hours-list__item"><span>Saturday</span><span>9:00am – 6:00pm</span></li>
                  <li className="hours-list__item"><span>Sunday</span><span>9:00am – 12:00pm</span></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal.open && (
        <div className={`modal modal--${modal.type}`} role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
          <div className="modal__overlay" onClick={closeModal} />
          <div className="modal__dialog">
            <div className="modal__head">
              <span className="modal__icon" aria-hidden="true">{modal.type === 'success' ? '✓' : '!'}</span>
              <h3 className="modal__title" id="contact-modal-title">
                {modal.type === 'success' ? 'Message Sent' : 'Submission Error'}
              </h3>
            </div>
            <p className="modal__body">{modal.message}</p>
            <div className="modal__actions">
              <button ref={closeBtnRef} className="modal__close" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

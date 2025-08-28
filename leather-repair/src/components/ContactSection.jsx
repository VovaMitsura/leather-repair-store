import React, { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Placeholder submit – integrate with backend or email service as needed.
    setStatus('Thanks! We will reach out shortly.');
  }

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <h2 className="section__title" id="contact-title">Contact</h2>
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__row">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Your full name" />
          </div>
          <div className="form__row">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="(267) 267-8681" />
          </div>
          <div className="form__row">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" value={form.message} onChange={handleChange} required placeholder="Tell us about your leather repair needs" />
          </div>
          <button className="btn btn--primary" type="submit">Submit</button>
          {status && <p className="form__status" role="status">{status}</p>}
        </form>
      </div>
    </section>
  );
}


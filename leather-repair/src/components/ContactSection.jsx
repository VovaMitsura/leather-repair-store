import React, { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', message: '', _hp: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // simple front-end validation
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, message: form.message, _hp: form._hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        const msg = (data && (data.error || data.message)) || 'Failed to send. Please try again later.';
        setStatus({ type: 'error', message: msg });
      } else {
        setStatus({ type: 'success', message: 'Thanks! We will reach out shortly.' });
        setForm({ name: '', phone: '', message: '', _hp: '' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
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
          {/* Honeypot field to deter bots */}
          <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
            <label htmlFor="_hp">Leave this field empty</label>
            <input id="_hp" name="_hp" type="text" value={form._hp} onChange={handleChange} tabIndex={-1} autoComplete="off" />
          </div>

          <button className="btn btn--primary" type="submit" disabled={loading}>
            {loading ? 'Sending…' : 'Submit'}
          </button>
          {status.message && (
            <p className="form__status" role="status" style={{ color: status.type === 'error' ? '#b00020' : 'inherit' }}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

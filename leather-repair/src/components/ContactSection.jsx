import { useEffect, useRef, useState } from 'react';
import { BUSINESS } from '../config/business.js';
import { compressImage } from '../lib/compressImage.js';

const SUBMIT_COOLDOWN_MS = 30_000;
const MAX_PHOTOS = 4;
const MAX_RAW_BYTES = 12 * 1024 * 1024; // 12 MB per file pre-compression

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', consent: false, _hp: '' });
  const [photos, setPhotos] = useState([]); // [{ file, preview }]
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, type: 'success', message: '' });
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [nowTick, setNowTick] = useState(Date.now());

  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocusRef = useRef(null);
  const fileInputRef = useRef(null);

  // Cooldown countdown
  useEffect(() => {
    if (cooldownUntil <= Date.now()) return;
    const id = setInterval(() => setNowTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, [cooldownUntil]);

  const cooldownLeft = Math.max(0, Math.ceil((cooldownUntil - nowTick) / 1000));
  const inCooldown = cooldownLeft > 0;

  // Revoke preview URLs when photos change/unmount
  useEffect(() => {
    return () => photos.forEach((p) => URL.revokeObjectURL(p.preview));
  }, [photos]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleFilesPicked(e) {
    const picked = Array.from(e.target.files || []);
    const valid = [];
    const errors = [];

    for (const file of picked) {
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name}: not an image`);
        continue;
      }
      if (file.size > MAX_RAW_BYTES) {
        errors.push(`${file.name}: too large (max 12 MB)`);
        continue;
      }
      valid.push({ file, preview: URL.createObjectURL(file) });
    }

    setPhotos((prev) => {
      const merged = [...prev, ...valid].slice(0, MAX_PHOTOS);
      if (prev.length + valid.length > MAX_PHOTOS) {
        errors.push(`Only the first ${MAX_PHOTOS} photos will be sent`);
      }
      return merged;
    });

    if (errors.length) setStatus({ type: 'error', message: errors.join('. ') });
    else setStatus({ type: '', message: '' });

    // Reset native input so re-selecting the same file works
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function removePhoto(idx) {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[idx]?.preview);
      return prev.filter((_, i) => i !== idx);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (inCooldown) return;

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
      // Compress each photo. Show interim status so users know we're working.
      let attachments = [];
      if (photos.length) {
        setStatus({ type: '', message: `Preparing ${photos.length} photo${photos.length > 1 ? 's' : ''}…` });
        attachments = await Promise.all(
          photos.map(async (p) => {
            const { name, base64 } = await compressImage(p.file);
            return { filename: name, content: base64 };
          }),
        );
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          _hp: form._hp,
          attachments,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        const msg = (data && (data.error || data.message)) || 'Failed to send. Please try again later.';
        setStatus({ type: 'error', message: msg });
        openModal('error', msg);
        if (res.status === 429) setCooldownUntil(Date.now() + SUBMIT_COOLDOWN_MS);
      } else {
        const msg = 'Thanks! Your message was sent. We will reach out shortly.';
        setStatus({ type: 'success', message: msg });
        openModal('success', msg);
        setForm({ name: '', email: '', phone: '', message: '', consent: false, _hp: '' });
        photos.forEach((p) => URL.revokeObjectURL(p.preview));
        setPhotos([]);
        setCooldownUntil(Date.now() + SUBMIT_COOLDOWN_MS);
      }
    } catch (err) {
      const msg = err?.message?.includes('image')
        ? `Couldn't process one of the photos: ${err.message}`
        : 'Network error. Please try again.';
      setStatus({ type: 'error', message: msg });
      openModal('error', msg);
    } finally {
      setLoading(false);
    }
  }

  function openModal(type, message) {
    lastFocusRef.current = document.activeElement;
    setModal({ open: true, type, message });
  }

  function closeModal() {
    setModal((m) => ({ ...m, open: false }));
    // Restore focus to the element that opened the modal (typically the submit button).
    requestAnimationFrame(() => lastFocusRef.current?.focus?.());
  }

  // Focus the close button when the modal opens
  useEffect(() => {
    if (modal.open) setTimeout(() => closeBtnRef.current?.focus(), 0);
  }, [modal.open]);

  // Esc-to-close + focus trap inside dialog
  useEffect(() => {
    if (!modal.open) return;
    function onKey(e) {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal.open]);

  const photoCountLabel = photos.length
    ? `${photos.length} photo${photos.length > 1 ? 's' : ''} attached`
    : 'Add photos (optional, up to 4)';

  return (
    <section className="section section--dark" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact">
          <div className="contact__form">
            <h2 className="section__title" id="contact-title">Get a free estimate</h2>
            <p className="lead">Send a few photos and we'll get back to you with a price range — usually same day.</p>
            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="form__row">
                <label htmlFor="name">Name *</label>
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Jane Smith" autoComplete="name" />
              </div>
              <div className="form__row">
                <label htmlFor="email">Email address *</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" autoComplete="email" />
              </div>
              <div className="form__row">
                <label htmlFor="phone">Phone number *</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="(555) 555-5555" autoComplete="tel" />
              </div>
              <div className="form__row">
                <label htmlFor="message">What needs repair? *</label>
                <textarea id="message" name="message" rows="4" value={form.message} onChange={handleChange} required placeholder="e.g. Leather sofa with scratches on the armrest, would like an estimate for repair." />
              </div>

              {/* Photo upload */}
              <div className="form__row">
                <label htmlFor="photos" className="form__photos-label">Photos <span className="form__hint">(optional, up to {MAX_PHOTOS})</span></label>
                <input
                  ref={fileInputRef}
                  id="photos"
                  name="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="form__photos-input"
                  onChange={handleFilesPicked}
                />
                <label htmlFor="photos" className="form__photos-button">
                  <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                    <path d="M9 3h6l2 2h4a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4l2-2zm3 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="currentColor" />
                  </svg>
                  {photoCountLabel}
                </label>
                {photos.length > 0 && (
                  <ul className="form__photos-list">
                    {photos.map((p, i) => (
                      <li key={p.preview} className="form__photos-thumb">
                        <img src={p.preview} alt={`Photo ${i + 1}`} />
                        <button
                          type="button"
                          className="form__photos-remove"
                          onClick={() => removePhoto(i)}
                          aria-label={`Remove photo ${i + 1}`}
                        >×</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Honeypot */}
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <label htmlFor="_hp">Leave this field empty</label>
                <input id="_hp" name="_hp" type="text" value={form._hp} onChange={handleChange} tabIndex={-1} autoComplete="off" />
              </div>

              <button className="btn btn--primary btn--lg" type="submit" disabled={loading || inCooldown}>
                {loading ? 'Sending…' : inCooldown ? `Please wait ${cooldownLeft}s…` : 'Get a free estimate'}
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
                    By submitting, I agree to be contacted by {BUSINESS.name} about my request.
                    We never share your information.
                  </span>
                </label>
              </div>
              <span className="visually-hidden" aria-live="polite">{status.message}</span>
              {status.type === 'error' && (
                <p className="form__inline-error" role="alert">{status.message}</p>
              )}
              {status.type === '' && status.message && (
                <p className="form__inline-info">{status.message}</p>
              )}
            </form>
          </div>
          <div className="contact__details">
            <div className="contact-details">
              <div className="contact-details__row">
                <div className="h3 contact-details__title">Get in touch</div>
                <a className="contact-details__phone" href={`tel:${BUSINESS.phone.e164}`}>{BUSINESS.phone.display}</a>
                <div className="contact-details__email">
                  <a className="email" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                </div>
              </div>
              <div className="contact-details__row">
                <div className="h3 contact-details__title">Location</div>
                <p className="adr contact-details__address">
                  <a href={BUSINESS.mapUrl} target="_blank" rel="noreferrer">
                    {BUSINESS.address.full}
                  </a>
                </p>
              </div>
              <div className="contact-details__row">
                <div className="h3 contact-details__title">Hours</div>
                <ol aria-label="Working hours" className="hours-list">
                  {BUSINESS.hours.map((h) => (
                    <li key={h.day} className="hours-list__item">
                      <span>{h.day}</span>
                      <span>{h.open} – {h.close}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal.open && (
        <div className={`modal modal--${modal.type}`} role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
          <div className="modal__overlay" onClick={closeModal} />
          <div className="modal__dialog" ref={dialogRef}>
            <button
              type="button"
              className="modal__x"
              aria-label="Close dialog"
              onClick={closeModal}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </button>
            <div className="modal__head">
              <span className="modal__icon" aria-hidden="true">{modal.type === 'success' ? '✓' : '!'}</span>
              <h3 className="modal__title" id="contact-modal-title">
                {modal.type === 'success' ? 'Message sent' : 'Submission error'}
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

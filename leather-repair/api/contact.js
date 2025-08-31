// Vercel serverless function to handle contact form submissions.
// Sends an email via Resend HTTP API using RESEND_API_KEY.

const ALLOWED_METHOD = 'POST';

export default async function handler(req, res) {
  if (req.method !== ALLOWED_METHOD) {
    res.setHeader('Allow', ALLOWED_METHOD);
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const { name, phone, message, email, _hp } = req.body || {};

    // Honeypot: if filled, pretend success but do nothing
    if (typeof _hp === 'string' && _hp.trim() !== '') {
      return res.status(200).json({ ok: true, spam: true });
    }

    const errors = [];
    const safeName = typeof name === 'string' ? name.trim() : '';
    const safePhone = typeof phone === 'string' ? phone.trim() : '';
    const safeMessage = typeof message === 'string' ? message.trim() : '';

    if (!safeName) errors.push('Name is required');
    if (!safePhone) errors.push('Phone is required');
    if (!safeMessage) errors.push('Message is required');

    if (safeName.length > 120) errors.push('Name too long');
    if (safePhone.length > 40) errors.push('Phone too long');
    if (safeMessage.length > 4000) errors.push('Message too long');
    const safeEmail = typeof email === 'string' ? email.trim() : '';
    if (safeEmail && safeEmail.length > 200) errors.push('Email too long');
    if (safeEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) errors.push('Email looks invalid');

    // loose phone validation: at least 7 digits
    const digitCount = (safePhone.match(/\d/g) || []).length;
    if (digitCount < 7) errors.push('Phone number looks invalid');

    if (errors.length) {
      return res.status(400).json({ ok: false, error: errors.join(', ') });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.TO_EMAIL;
    const FROM_EMAIL = process.env.FROM_EMAIL || 'Leather Repair <onboarding@resend.dev>';

    if (!RESEND_API_KEY || !TO_EMAIL) {
      return res.status(500).json({ ok: false, error: 'Email is not configured. Set RESEND_API_KEY and TO_EMAIL.' });
    }

    const subject = `New contact form: ${safeName}`;
    const text = `New contact submission\n\nName: ${safeName}\nPhone: ${safePhone}\nEmail: ${safeEmail || '—'}\n\nMessage:\n${safeMessage}`;
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height:1.5;">
        <h2 style="margin:0 0 8px;">New contact submission</h2>
        <p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(safeName)}</p>
        <p style="margin:0 0 8px;"><strong>Phone:</strong> ${escapeHtml(safePhone)}</p>
        <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(safeEmail || '—')}</p>
        <p style="margin:12px 0 4px;"><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap; background:#f7f7f7; padding:12px; border-radius:8px;">${escapeHtml(safeMessage)}</pre>
      </div>
    `;

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM_EMAIL, to: [TO_EMAIL], subject, text, html }),
    });

    const data = await r.json().catch(() => ({}));

    if (!r.ok) {
      const msg = (data && (data.message || data.error)) || 'Failed to send email';
      return res.status(502).json({ ok: false, error: msg });
    }

    return res.status(200).json({ ok: true, id: data && data.id });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Unexpected error' });
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

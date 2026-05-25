// Vercel serverless function (and local Express handler) for contact form submissions.
// Sends mail via Resend HTTP API.

const ALLOWED_METHOD = 'POST';
const MAX_NAME = 120;
const MAX_PHONE = 40;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 4000;
const MAX_ATTACHMENTS = 4;
const MAX_ATTACHMENT_BYTES_B64 = 2 * 1024 * 1024; // ~2 MB per file after base64 encoding
const MAX_TOTAL_ATTACHMENT_BYTES_B64 = 6 * 1024 * 1024;

// In-memory rate limit for the serverless code path.
// Vercel keeps an instance warm only briefly, so this is best-effort —
// the Express layer enforces stronger limits in local dev. For production
// Vercel hosting, add Upstash Redis or Vercel KV for a shared counter.
const RL_WINDOW_MS = 10 * 60 * 1000;
const RL_MAX = 5;
const rlHits = new Map(); // key: ip -> { count, resetAt }

function rateLimitCheck(ip) {
  const now = Date.now();
  const entry = rlHits.get(ip);
  if (!entry || entry.resetAt < now) {
    rlHits.set(ip, { count: 1, resetAt: now + RL_WINDOW_MS });
    return { ok: true };
  }
  if (entry.count >= RL_MAX) {
    return { ok: false, retryInSec: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true };
}

function clientIp(req) {
  const fwd = req.headers?.['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || req.ip || 'unknown';
}

function requestId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function log(level, rid, msg, extra = {}) {
  // Structured single-line JSON so log aggregators can index it.
  console[level === 'error' ? 'error' : 'log'](JSON.stringify({
    t: new Date().toISOString(),
    rid,
    level,
    msg,
    ...extra,
  }));
}

export default async function handler(req, res) {
  const rid = requestId();
  const ip = clientIp(req);

  if (req.method !== ALLOWED_METHOD) {
    res.setHeader('Allow', ALLOWED_METHOD);
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  // Serverless-side rate limit (the Express layer has its own; both are fine).
  const rl = rateLimitCheck(ip);
  if (!rl.ok) {
    res.setHeader('Retry-After', String(rl.retryInSec));
    log('warn', rid, 'rate_limited', { ip, retryInSec: rl.retryInSec });
    return res.status(429).json({ ok: false, error: 'Too many requests. Please try again in a few minutes.' });
  }

  try {
    const { name, phone, message, email, _hp, attachments } = req.body || {};

    // Honeypot: silent accept, do nothing.
    if (typeof _hp === 'string' && _hp.trim() !== '') {
      log('info', rid, 'honeypot_hit', { ip });
      return res.status(200).json({ ok: true });
    }

    const errors = [];
    const safeName = typeof name === 'string' ? name.trim() : '';
    const safePhone = typeof phone === 'string' ? phone.trim() : '';
    const safeMessage = typeof message === 'string' ? message.trim() : '';
    const safeEmail = typeof email === 'string' ? email.trim() : '';

    if (!safeName) errors.push('Name is required');
    if (!safePhone) errors.push('Phone is required');
    if (!safeMessage) errors.push('Message is required');

    if (safeName.length > MAX_NAME) errors.push('Name too long');
    if (safePhone.length > MAX_PHONE) errors.push('Phone too long');
    if (safeMessage.length > MAX_MESSAGE) errors.push('Message too long');
    if (safeEmail && safeEmail.length > MAX_EMAIL) errors.push('Email too long');
    if (safeEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) errors.push('Email looks invalid');

    const digitCount = (safePhone.match(/\d/g) || []).length;
    if (digitCount < 7) errors.push('Phone number looks invalid');

    // Attachments: must be an array of { filename, content (base64) }.
    let safeAttachments = [];
    if (Array.isArray(attachments) && attachments.length) {
      if (attachments.length > MAX_ATTACHMENTS) {
        errors.push(`Too many attachments (max ${MAX_ATTACHMENTS})`);
      }
      let total = 0;
      for (const a of attachments.slice(0, MAX_ATTACHMENTS)) {
        if (!a || typeof a.filename !== 'string' || typeof a.content !== 'string') {
          errors.push('Bad attachment shape');
          break;
        }
        const size = a.content.length; // base64 length, an upper bound on bytes
        if (size > MAX_ATTACHMENT_BYTES_B64) {
          errors.push(`Attachment "${a.filename}" is too large`);
          break;
        }
        total += size;
        if (total > MAX_TOTAL_ATTACHMENT_BYTES_B64) {
          errors.push('Attachments total size exceeds limit');
          break;
        }
        safeAttachments.push({
          filename: a.filename.replace(/[^\w. -]/g, '').slice(0, 80) || 'photo.jpg',
          content: a.content,
        });
      }
    } else if (attachments != null) {
      errors.push('Attachments must be an array');
    }

    if (errors.length) {
      log('info', rid, 'validation_failed', { ip, errors });
      return res.status(400).json({ ok: false, error: errors.join(', ') });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.TO_EMAIL;
    const FROM_EMAIL = process.env.FROM_EMAIL;

    if (!RESEND_API_KEY || !TO_EMAIL || !FROM_EMAIL) {
      // Log details server-side; return a generic message to the client.
      log('error', rid, 'email_not_configured', {
        ip,
        hasResendKey: Boolean(RESEND_API_KEY),
        hasToEmail: Boolean(TO_EMAIL),
        hasFromEmail: Boolean(FROM_EMAIL),
      });
      return res.status(500).json({ ok: false, error: 'Sorry, we could not send your message right now. Please try again later or call us.' });
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
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject,
        text,
        html,
        ...(safeAttachments.length ? { attachments: safeAttachments } : {}),
      }),
    });

    const data = await r.json().catch(() => ({}));

    if (!r.ok) {
      log('error', rid, 'resend_failed', { ip, status: r.status, body: data });
      return res.status(502).json({ ok: false, error: 'Mail service is temporarily unavailable. Please try again shortly.' });
    }

    log('info', rid, 'sent', { ip, resendId: data?.id, attachments: safeAttachments.length });
    return res.status(200).json({ ok: true });
  } catch (err) {
    log('error', rid, 'unhandled_exception', { ip, error: err?.message, stack: err?.stack });
    return res.status(500).json({ ok: false, error: 'Unexpected error. Please try again later.' });
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

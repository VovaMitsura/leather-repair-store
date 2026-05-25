// Local Express server. Mirrors the Vercel serverless setup for development.
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import contactHandler from '../api/contact.js';

const PORT = Number(process.env.PORT) || 3001;

// Parse ALLOWED_ORIGINS="https://foo.com,https://bar.com" into an array.
// Empty/missing = dev fallback that allows localhost only.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

// In production, set ALLOWED_ORIGINS explicitly. In dev (no env var), we
// accept localhost AND private LAN ranges so you can test from a phone on
// the same Wi-Fi without manually whitelisting your laptop's IP each time.
const DEV_MODE = ALLOWED_ORIGINS.length === 0;

// Private/local hostnames that are safe to accept during development.
const LAN_ORIGIN_RE = /^https?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}|[\w-]+\.local|[\w-]+\.lan)(?::\d+)?$/i;

function isAllowedOrigin(origin) {
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (DEV_MODE && LAN_ORIGIN_RE.test(origin)) return true;
  return false;
}

const app = express();
app.set('trust proxy', 1); // honor X-Forwarded-For when behind a proxy (rate limiter needs it)

app.use(helmet({
  // Disable CSP at the proxy layer; the static-host layer (Vercel/CDN) owns CSP for the SPA.
  contentSecurityPolicy: false,
}));

app.use(cors({
  origin(origin, cb) {
    // Same-origin/server-to-server requests have no Origin header — allow them.
    if (!origin) return cb(null, true);
    if (isAllowedOrigin(origin)) return cb(null, true);
    return cb(new Error(`CORS: origin ${origin} not allowed`));
  },
}));

// 8 MB cap supports up to ~4 photos compressed client-side to ~1 MB each (post base64 inflation).
app.use(express.json({ limit: '8mb' }));

// 5 requests per 10 minutes per IP for the contact endpoint.
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, error: 'Too many requests. Please try again in a few minutes.' },
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/contact', contactLimiter, (req, res) => contactHandler(req, res));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API listening on http://localhost:${PORT}  (also reachable on your LAN IP:${PORT})`);
  if (DEV_MODE) {
    console.log('CORS: dev mode — allowing localhost + private LAN origins (192.168.*, 10.*, 172.16-31.*, *.local).');
  } else {
    console.log(`CORS allowlist: ${ALLOWED_ORIGINS.join(', ')}`);
  }
  if (!process.env.RESEND_API_KEY || !process.env.TO_EMAIL) {
    console.warn('[warn] RESEND_API_KEY and/or TO_EMAIL are not set — /api/contact will return 500. See .env.example.');
  }
});

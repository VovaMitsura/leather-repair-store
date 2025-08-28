// Minimal local Express server to run the existing API handler (ESM)
import express from 'express';
import cors from 'cors';
import contactHandler from '../api/contact.js';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/contact', (req, res) => contactHandler(req, res));

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

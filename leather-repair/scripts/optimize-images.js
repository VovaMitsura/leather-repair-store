// Image optimization pipeline.
// Run with: npm run images
//
// What it does:
//   1. For every PNG and JPG in public/img/, emits a .webp next to it (quality 82).
//      Originals stay in place as fallback for <picture><source> patterns.
//   2. For logo.png specifically, emits resized PNG+WebP variants for srcset.
//   3. For large JPGs (> ~1.5MB or > 2200px on the long edge), also emits a
//      resized & re-compressed JPG that replaces the original — phone-camera
//      photos shouldn't ship at native resolution.
//
// Safe to re-run: outputs are deterministic, overwrite on each run.

import { readdir, stat } from 'node:fs/promises';
import { resolve, dirname, basename, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const IMG_DIR = resolve(__dirname, '..', 'public', 'img');

const WEBP_QUALITY = 82;
const JPG_QUALITY = 82;
const JPG_MAX_DIM = 1920;
const LOGO_SIZES = [256, 512]; // 1x and 2x for a ~130px display target

function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function sizeOf(p) {
  try { return (await stat(p)).size; } catch { return 0; }
}

async function convertPngToWebp(srcPath) {
  const out = srcPath.replace(/\.png$/i, '.webp');
  await sharp(srcPath).webp({ quality: WEBP_QUALITY }).toFile(out);
  return out;
}

// JPG handling: produce a sibling .webp, and also shrink the JPG itself if it's
// way larger than needed for web display. Returns the list of output paths.
async function processJpg(srcPath) {
  const outs = [];
  const webpOut = srcPath.replace(/\.jpe?g$/i, '.webp');
  const meta = await sharp(srcPath).metadata();
  const longEdge = Math.max(meta.width || 0, meta.height || 0);
  const needsResize = longEdge > JPG_MAX_DIM;

  const pipeline = needsResize
    ? sharp(srcPath).rotate().resize(JPG_MAX_DIM, JPG_MAX_DIM, { fit: 'inside' })
    : sharp(srcPath).rotate();

  // WebP for modern browsers
  await pipeline.clone().webp({ quality: WEBP_QUALITY }).toFile(webpOut);
  outs.push(webpOut);

  // Re-encode the JPG in-place if we resized OR if it's just bloated.
  const srcSize = await sizeOf(srcPath);
  if (needsResize || srcSize > 400 * 1024) {
    // sharp can't read+write the same file; go via a temp path.
    const tmpOut = srcPath + '.tmp.jpg';
    await pipeline.clone().jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toFile(tmpOut);
    const { rename } = await import('node:fs/promises');
    await rename(tmpOut, srcPath);
    outs.push(srcPath);
  }
  return outs;
}

async function emitLogoVariants(srcPath) {
  const dir = dirname(srcPath);
  const results = [];
  for (const w of LOGO_SIZES) {
    const pngOut = join(dir, `logo-${w}.png`);
    const webpOut = join(dir, `logo-${w}.webp`);
    await sharp(srcPath).resize(w, w, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toFile(pngOut);
    await sharp(srcPath).resize(w, w, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: WEBP_QUALITY }).toFile(webpOut);
    results.push(pngOut, webpOut);
  }
  return results;
}

async function main() {
  const entries = await readdir(IMG_DIR);
  const isPng = (f) => extname(f).toLowerCase() === '.png' && !f.startsWith('logo-');
  const isJpg = (f) => /\.jpe?g$/i.test(f);

  const rows = [];

  // PNGs (and the logo special case)
  for (const file of entries.filter(isPng)) {
    const src = join(IMG_DIR, file);
    const srcSize = await sizeOf(src);

    if (basename(file).toLowerCase() === 'logo.png') {
      const outs = await emitLogoVariants(src);
      for (const out of outs) {
        rows.push({ file: `${basename(file)} → ${basename(out)}`, before: srcSize, after: await sizeOf(out) });
      }
      const wp = await convertPngToWebp(src);
      rows.push({ file: `${basename(file)} → ${basename(wp)}`, before: srcSize, after: await sizeOf(wp) });
      continue;
    }

    const out = await convertPngToWebp(src);
    rows.push({ file: `${basename(file)} → ${basename(out)}`, before: srcSize, after: await sizeOf(out) });
  }

  // JPGs
  for (const file of entries.filter(isJpg)) {
    const src = join(IMG_DIR, file);
    const srcSize = await sizeOf(src);
    const outs = await processJpg(src);
    for (const out of outs) {
      rows.push({ file: `${basename(file)} → ${basename(out)}`, before: srcSize, after: await sizeOf(out) });
    }
  }

  // Print report.
  const w1 = Math.max(...rows.map((r) => r.file.length), 'File'.length);
  const w2 = 10, w3 = 10, w4 = 8;
  const line = '-'.repeat(w1 + w2 + w3 + w4 + 10);
  console.log(line);
  console.log(`${'File'.padEnd(w1)}  ${'Before'.padStart(w2)}  ${'After'.padStart(w3)}  ${'Saved'.padStart(w4)}`);
  console.log(line);
  let totalBefore = 0, totalAfter = 0;
  for (const r of rows) {
    const saved = r.before > 0 ? Math.round((1 - r.after / r.before) * 100) : 0;
    totalBefore += r.before;
    totalAfter += r.after;
    console.log(`${r.file.padEnd(w1)}  ${fmt(r.before).padStart(w2)}  ${fmt(r.after).padStart(w3)}  ${(saved + '%').padStart(w4)}`);
  }
  console.log(line);
  const totalSaved = totalBefore > 0 ? Math.round((1 - totalAfter / totalBefore) * 100) : 0;
  console.log(`${'TOTAL'.padEnd(w1)}  ${fmt(totalBefore).padStart(w2)}  ${fmt(totalAfter).padStart(w3)}  ${(totalSaved + '%').padStart(w4)}`);
  console.log(line);
}

main().catch((err) => {
  console.error('[optimize-images] failed:', err);
  process.exit(1);
});

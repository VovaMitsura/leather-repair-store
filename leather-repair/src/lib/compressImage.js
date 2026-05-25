// Resize and recompress an image File before upload, so we don't send
// 20 MB phone-camera originals through the contact form.
//
// Strategy: render to a canvas at MAX_DIM on the long edge, export as
// JPEG at QUALITY. Returns { name, base64, sizeBytes, mime } where
// base64 is the raw payload (no `data:image/...;base64,` prefix).

const MAX_DIM = 1920;
const QUALITY = 0.85;

export async function compressImage(file) {
  if (!file || !file.type?.startsWith('image/')) {
    throw new Error('Not an image file');
  }

  const bitmap = await loadBitmap(file);
  const { width, height } = scaleDown(bitmap.width, bitmap.height, MAX_DIM);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Canvas export failed'))),
      'image/jpeg',
      QUALITY,
    );
  });

  const base64 = await blobToBase64(blob);
  const cleanName = file.name.replace(/\.(heic|heif|png|webp|gif|bmp)$/i, '.jpg');

  return { name: cleanName, base64, sizeBytes: blob.size, mime: 'image/jpeg' };
}

async function loadBitmap(file) {
  if ('createImageBitmap' in window) {
    try {
      return await createImageBitmap(file);
    } catch {
      // Fall through to <img> path (e.g., for HEIC on some browsers).
    }
  }
  return loadViaImg(file);
}

function loadViaImg(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to decode image (HEIC files from iPhone may need conversion)'));
    };
    img.src = url;
  });
}

function scaleDown(w, h, max) {
  if (w <= max && h <= max) return { width: w, height: h };
  const ratio = w > h ? max / w : max / h;
  return { width: Math.round(w * ratio), height: Math.round(h * ratio) };
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const comma = result.indexOf(',');
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(reader.error || new Error('Read failed'));
    reader.readAsDataURL(blob);
  });
}

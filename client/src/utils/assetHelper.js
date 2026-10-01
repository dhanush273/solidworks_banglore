const BACKEND_URL = 'http://localhost:5000';

/**
 * Resolves an asset URL properly whether hosted on Vercel, Netlify, or Render.
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  // Ensure leading slash
  let clean = path.startsWith('/') ? path : `/${path}`;
  
  // Auto-replace .jfif with .jpg
  clean = clean.replace(/\.jfif$/i, '.jpg');

  return clean;
}

/**
 * Multi-layer image error handler that attempts alternative locations
 * (e.g. backend host, /Logos/ vs /uploads/, .jpg vs .jfif) before falling back.
 */
export function handleImageFallback(e, defaultFallback) {
  const img = e.currentTarget || e.target;
  if (!img) return;

  const currentSrc = img.getAttribute('src') || '';
  const attempts = Number(img.dataset.failCount || 0);
  img.dataset.failCount = attempts + 1;

  // Attempt 1: If it was .jfif, try .jpg
  if (attempts === 0 && currentSrc.includes('.jfif')) {
    img.src = currentSrc.replace(/\.jfif/i, '.jpg');
    return;
  }

  // Attempt 2: If /uploads/ failed, try /Logos/
  if (attempts <= 1 && currentSrc.includes('/uploads/')) {
    img.src = currentSrc.replace('/uploads/', '/Logos/');
    return;
  }

  // Attempt 3: If /Logos/ failed, try /uploads/
  if (attempts <= 1 && currentSrc.includes('/Logos/')) {
    img.src = currentSrc.replace('/Logos/', '/uploads/');
    return;
  }

  // Attempt 4: If relative path failed on frontend CDN/Vercel, try backend Render host
  if (attempts <= 2 && currentSrc.startsWith('/')) {
    img.src = `${BACKEND_URL}${currentSrc}`;
    return;
  }

  // Final Attempt: Use default fallback or transparent pixel
  img.onerror = null;
  if (defaultFallback) {
    img.src = defaultFallback;
  }
}

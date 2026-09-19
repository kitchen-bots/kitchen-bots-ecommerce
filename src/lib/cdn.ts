/**
 * Cloudflare R2 / CDN Asset URL Resolver
 * Automatically prefixes relative media paths with VITE_CDN_URL if defined.
 * Falls back to local root paths if VITE_CDN_URL is not provided.
 */
const CDN_URL = (import.meta.env.VITE_CDN_URL || '').replace(/\/$/, '');

export function getMediaUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return CDN_URL ? `${CDN_URL}${cleanPath}` : cleanPath;
}

export default getMediaUrl;

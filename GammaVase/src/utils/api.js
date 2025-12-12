const normalizeBaseUrl = (url) => (url ? url.replace(/\/$/, '') : '');

export const API_BASE_URL = normalizeBaseUrl(
  import.meta.env.VITE_API_URL || 'http://localhost:3000'
);

export const buildApiUrl = (path = '') => {
  if (!path) return API_BASE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

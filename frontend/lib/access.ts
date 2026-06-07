export type AccessMode = 'operative' | 'guest' | null;

const ACCESS_KEY = 'cyber_access_granted';
const MODE_KEY = 'cyber_access_mode';

export function getAccessMode(): AccessMode {
  if (typeof window === 'undefined') return null;
  const granted = sessionStorage.getItem(ACCESS_KEY);
  if (!granted) return null;
  const mode = sessionStorage.getItem(MODE_KEY);
  return mode === 'guest' ? 'guest' : 'operative';
}

export function hasAccess(): boolean {
  return getAccessMode() !== null;
}

export function grantOperativeAccess() {
  sessionStorage.setItem(ACCESS_KEY, '1');
  sessionStorage.setItem(MODE_KEY, 'operative');
}

export function grantGuestAccess() {
  sessionStorage.setItem(ACCESS_KEY, '1');
  sessionStorage.setItem(MODE_KEY, 'guest');
}

export function revokeAccess() {
  sessionStorage.removeItem(ACCESS_KEY);
  sessionStorage.removeItem(MODE_KEY);
}

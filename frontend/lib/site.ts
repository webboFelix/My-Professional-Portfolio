import { profile } from './profile';

/**
 * Site config — synced with profile.ts / .env.local
 */
export const site = {
  name: profile.name,
  handle: profile.handle,
  title: process.env.NEXT_PUBLIC_AUTHOR_TITLE || 'Cybersecurity Analyst',
  roles: profile.headline,
  clearance: Number(process.env.NEXT_PUBLIC_CLEARANCE_LEVEL || '5'),
  sector: process.env.NEXT_PUBLIC_SECTOR || 'SECTOR 7 // NAIROBI, KE',
  tagline: profile.bio,
  brand: process.env.NEXT_PUBLIC_BRAND_NAME || 'WEBBO_OPS',
  github: profile.github,
  linkedin: profile.linkedin,
  email: profile.email,
  location: profile.location,
  phone: profile.phone,
};

export function githubLabel() {
  try {
    const u = new URL(site.github);
    return u.hostname + u.pathname.replace(/^\//, '');
  } catch {
    return site.github;
  }
}

export function linkedinLabel() {
  try {
    const u = new URL(site.linkedin);
    return u.hostname + u.pathname.replace(/^\//, '');
  } catch {
    return site.linkedin;
  }
}

import { siteConfig } from './site.js';

export const CANONICAL_HOST = siteConfig.url;

export function resolveCanonicalUrl(pathname: string): string {
  let path = pathname.split('?')[0]!.split('#')[0]!.trim();
  if (!path.startsWith('/')) path = `/${path}`;
  if (!path.endsWith('/')) path = `${path}/`;
  path = path.replace(/\/{2,}/g, '/');
  return `${CANONICAL_HOST}${path}`;
}

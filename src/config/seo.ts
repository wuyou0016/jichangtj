import { siteConfig } from './site.js';

export const CANONICAL_HOST = siteConfig.url;

export function resolveCanonicalUrl(pathname: string): string {
  let path = pathname.split('?')[0]!.split('#')[0]!.trim();
  if (!path.startsWith('/')) path = `/${path}`;
  if (!path.endsWith('/')) path = `${path}/`;
  path = path.replace(/\/{2,}/g, '/');
  return `${CANONICAL_HOST}${path}`;
}

export interface Crumb {
  name: string;
  href: string;
}

/** 面包屑 JSON-LD：与页面上可见的面包屑保持一致。 */
export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: '首页', href: '/' }, ...crumbs].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: resolveCanonicalUrl(c.href),
    })),
  };
}

/** FAQPage JSON-LD：只用于页面上确实可见的问答。 */
export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function formatDate(value: Date | string): string {
  return (typeof value === 'string' ? new Date(value) : value).toISOString().slice(0, 10);
}

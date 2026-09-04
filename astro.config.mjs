// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitemap 排除策略：跟站群里其他站保持一致的处理原则。
/** @param {string} pageUrl @returns {boolean} */
function isSitemapExcluded(pageUrl) {
  const url = new URL(pageUrl);

  if (url.pathname === '/404' || url.pathname === '/404/' || url.pathname === '/404.html') {
    return true;
  }
  if (url.search) {
    return true;
  }
  if (/\/(demo|mock)(-|\/|$)/i.test(url.pathname)) {
    return true;
  }
  return false;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://jichangtj.net',
  integrations: [
    sitemap({
      filter: (page) => !isSitemapExcluded(page),
    }),
  ],
});

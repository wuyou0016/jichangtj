// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitemap lastmod：从内容数据里读每个页面的 updatedAt，让搜索引擎知道哪些页面更新过。
// 没有日期来源的页面不输出 lastmod（宁可不写，也不写一个不准确的日期）。
/** @param {string} path */
function readJson(path) {
  return JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
}

/** @returns {Map<string, string>} pathname → YYYY-MM-DD */
function buildLastmodMap() {
  /** @type {Map<string, string>} */
  const map = new Map();
  /** @param {string} path @param {string | undefined} date */
  const set = (path, date) => {
    if (date) map.set(path, String(date).slice(0, 10));
  };
  /** @param {string[]} dates */
  const latest = (dates) => dates.filter(Boolean).sort().at(-1);

  const providers = readJson('./src/data/providers/providers.json');
  for (const p of providers) set(`/airports/${p.slug}/`, p.updatedAt);
  set('/airports/', latest(providers.map((/** @type {any} */ p) => p.updatedAt)));

  const scenarios = readJson('./src/data/scenarios/scenarios.json');
  for (const s of scenarios) set(`/scenarios/${s.slug}/`, s.updatedAt);
  set('/scenarios/', latest(scenarios.map((/** @type {any} */ s) => s.updatedAt)));

  const rankings = readJson('./src/data/rankings/rankings.json');
  const overall = rankings.find((/** @type {any} */ r) => r.slug === 'overall');
  set('/rankings/', overall?.updatedAt);

  const tutorialDir = new URL('./src/content/tutorials/', import.meta.url);
  /** @type {string[]} */
  const tutorialDates = [];
  for (const file of readdirSync(tutorialDir)) {
    if (!file.endsWith('.md')) continue;
    const text = readFileSync(new URL(file, tutorialDir), 'utf8');
    const match = text.match(/^updatedAt:\s*(\S+)/m);
    if (match) {
      set(`/tutorials/${file.replace(/\.md$/, '')}/`, match[1]);
      tutorialDates.push(match[1]);
    }
  }
  set('/tutorials/', latest(tutorialDates));

  const pages = readJson('./src/data/pages.json');
  for (const [path, dates] of Object.entries(pages)) set(path, /** @type {any} */ (dates).updatedAt);

  set('/', latest([...map.values()]));
  return map;
}

const lastmodMap = buildLastmodMap();

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
      serialize(item) {
        const lastmod = lastmodMap.get(new URL(item.url).pathname);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
});

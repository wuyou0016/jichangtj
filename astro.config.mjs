// @ts-check
import fs from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// lastmod 只取内容自己声明的更新日期（服务商 / 榜单 / 场景 updatedAt、教程 frontmatter），不用构建时间。
/** @type {Record<string, string>} */
const lastmod = {};
/** @param {string} p */
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
/** @param {string[]} ds */
const latest = (ds) => ds.filter(Boolean).map((d) => String(d).slice(0, 10)).sort().pop();
const providers = readJson('src/data/providers/providers.json');
for (const p of providers) lastmod[`/airports/${p.slug}/`] = String(p.updatedAt).slice(0, 10);
lastmod['/airports/'] = latest(providers.map((/** @type {any} */ p) => p.updatedAt)) ?? '';
const scenarios = readJson('src/data/scenarios/scenarios.json');
for (const sc of scenarios) lastmod[`/scenarios/${sc.slug}/`] = String(sc.updatedAt).slice(0, 10);
lastmod['/scenarios/'] = latest(scenarios.map((/** @type {any} */ sc) => sc.updatedAt)) ?? '';
lastmod['/rankings/'] = latest(readJson('src/data/rankings/rankings.json').map((/** @type {any} */ r) => r.updatedAt)) ?? '';
const tutDir = 'src/content/tutorials';
const tutDates = [];
for (const f of fs.readdirSync(tutDir)) {
  const m = fs.readFileSync(`${tutDir}/${f}`, 'utf8').match(/^updatedAt:\s*"?([0-9-]{10})/m);
  if (m) {
    lastmod[`/tutorials/${f.replace(/[.]mdx?$/, '')}/`] = m[1];
    tutDates.push(m[1]);
  }
}
lastmod['/tutorials/'] = latest(tutDates) ?? '';
lastmod['/'] = latest(Object.values(lastmod)) ?? '';

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
        const d = lastmod[new URL(item.url).pathname];
        return d ? { ...item, lastmod: d } : item;
      },
    }),
  ],
});

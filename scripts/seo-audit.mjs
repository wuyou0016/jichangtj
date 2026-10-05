// 静态 SEO 体检：跑在 npm run build 之后，读 dist/**/*.html 做纯离线检查，
// 不发真实网络请求，不依赖额外 npm 包。覆盖：死链、重复 title/description/H1、
// H1 数量异常、canonical 缺失或自相矛盾、意外 noindex、内容单薄、结构化数据
// 覆盖情况、孤立页面。
//
// 用法：npm run build && node scripts/seo-audit.mjs

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SITE = 'https://jichangtj.net';

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...walk(full));
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

function toRoutePath(file) {
  const rel = relative(DIST, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html') return '/404';
  return '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '/');
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

const files = walk(DIST);
const pages = files.map((file) => {
  const html = readFileSync(file, 'utf-8');
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)];
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]*)"/);
  const robotsMatch = html.match(/<meta name="robots" content="([^"]*)"/);
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        return null;
      }
    },
  );
  const internalLinks = [...html.matchAll(/href="(\/[^"#]*)"/g)]
    .map((m) => m[1])
    .filter((href) => !href.startsWith('//'));
  return {
    route: toRoutePath(file),
    title: titleMatch ? titleMatch[1] : null,
    description: descMatch ? descMatch[1] : null,
    h1s: h1Matches.map((m) => stripTags(m[1])),
    h2Count: h2Matches.length,
    canonical: canonicalMatch ? canonicalMatch[1] : null,
    robots: robotsMatch ? robotsMatch[1] : null,
    mainTextLength: mainMatch ? stripTags(mainMatch[1]).length : 0,
    schemaTypes: jsonLdBlocks.filter(Boolean).map((b) => b['@type']),
    internalLinks: [...new Set(internalLinks)],
  };
});

const knownRoutes = new Set(pages.map((p) => p.route));
const nonPageAllowlist = new Set(['/favicon.svg', '/robots.txt', '/sitemap-index.xml']);

console.log(`共检查 ${pages.length} 个页面。\n`);

// 1) 死链
console.log('== 1. 死链检查 ==');
let deadLinkCount = 0;
for (const page of pages) {
  for (const link of page.internalLinks) {
    const normalized = link.endsWith('/') || link.includes('.') ? link : link + '/';
    if (knownRoutes.has(normalized) || knownRoutes.has(link) || nonPageAllowlist.has(link)) continue;
    if (link.startsWith('/_astro/')) continue;
    if (/\.(txt|xml|ico|svg|png|jpg|css|js)$/i.test(link)) continue;
    console.log(`  [死链] ${page.route} -> ${link}`);
    deadLinkCount += 1;
  }
}
if (deadLinkCount === 0) console.log('  未发现死链。');

// 2) 重复 title / description / H1
console.log('\n== 2. 重复 Title / Description / H1 检查 ==');
function findDuplicates(getKey) {
  const seen = new Map();
  for (const page of pages) {
    const value = getKey(page);
    if (!value) continue;
    if (!seen.has(value)) seen.set(value, []);
    seen.get(value).push(page.route);
  }
  return [...seen.entries()].filter(([, routes]) => routes.length > 1);
}
const dupTitles = findDuplicates((p) => p.title);
const dupDescs = findDuplicates((p) => p.description);
const dupH1s = findDuplicates((p) => p.h1s[0]);
if (dupTitles.length === 0) console.log('  无重复 title。');
dupTitles.forEach(([value, routes]) => console.log(`  [重复 title] "${value}" -> ${routes.join(', ')}`));
if (dupDescs.length === 0) console.log('  无重复 description。');
dupDescs.forEach(([value, routes]) => console.log(`  [重复 description] "${value.slice(0, 40)}..." -> ${routes.join(', ')}`));
if (dupH1s.length === 0) console.log('  无重复 H1。');
dupH1s.forEach(([value, routes]) => console.log(`  [重复 H1] "${value}" -> ${routes.join(', ')}`));

// 3) 缺失 title / description / H1 数量异常
console.log('\n== 3. Title / Description / H1 完整性检查 ==');
const missingTitle = pages.filter((p) => !p.title);
const missingDesc = pages.filter((p) => !p.description);
const zeroH1 = pages.filter((p) => p.h1s.length === 0);
const multiH1 = pages.filter((p) => p.h1s.length > 1);
if (missingTitle.length === 0) console.log('  所有页面均有 title。');
missingTitle.forEach((p) => console.log(`  [缺 title] ${p.route}`));
if (missingDesc.length === 0) console.log('  所有页面均有 meta description。');
missingDesc.forEach((p) => console.log(`  [缺 description] ${p.route}`));
if (zeroH1.length === 0 && multiH1.length === 0) console.log('  所有页面 H1 数量均为 1。');
zeroH1.forEach((p) => console.log(`  [缺 H1] ${p.route}`));
multiH1.forEach((p) => console.log(`  [H1 数量 > 1（${p.h1s.length}）] ${p.route}: ${p.h1s.join(' / ')}`));

// 4) Canonical：缺失 + 自相矛盾（canonical 指向的路径应等于页面自身路径）
console.log('\n== 4. Canonical 检查 ==');
const missingCanonical = pages.filter((p) => !p.canonical && p.route !== '/404');
if (missingCanonical.length === 0) console.log('  所有可索引页面均有 canonical。');
missingCanonical.forEach((p) => console.log(`  [缺 canonical] ${p.route}`));
const canonicalConflicts = pages.filter((p) => {
  if (!p.canonical || p.route === '/404') return false;
  const expected = `${SITE}${p.route}`;
  return p.canonical !== expected;
});
if (canonicalConflicts.length === 0) console.log('  所有 canonical 均与页面自身 URL 一致，无冲突。');
canonicalConflicts.forEach((p) => console.log(`  [canonical 冲突] ${p.route} canonical 指向 ${p.canonical}，与自身 URL 不一致`));

// 5) 意外 noindex：除 404 外任何页面都不应该是 noindex
console.log('\n== 5. Noindex 检查 ==');
const unexpectedNoindex = pages.filter((p) => p.route !== '/404' && p.robots?.includes('noindex'));
const expectedNoindexOk = pages.find((p) => p.route === '/404')?.robots?.includes('noindex');
if (unexpectedNoindex.length === 0) console.log('  除 404 外，没有页面被意外标记 noindex。');
unexpectedNoindex.forEach((p) => console.log(`  [意外 noindex] ${p.route}`));
console.log(`  404 页面 noindex 状态：${expectedNoindexOk ? '正确（noindex）' : '⚠ 未标记 noindex，应该标记'}`);

// 6) 内容单薄检查（<main> 纯文本长度阈值，只是粗略信号，不是精确判断）
console.log('\n== 6. 内容单薄检查（<main> 纯文本长度 < 200 字，仅供参考） ==');
const thinPages = pages.filter((p) => p.route !== '/404' && p.mainTextLength < 200);
if (thinPages.length === 0) console.log('  未发现明显单薄页面。');
thinPages.forEach((p) => console.log(`  [可能单薄] ${p.route}（正文约 ${p.mainTextLength} 字）`));

// 7) 结构化数据覆盖检查
console.log('\n== 7. 结构化数据（Schema）覆盖检查 ==');
const noBreadcrumb = pages.filter((p) => p.route !== '/404' && !p.schemaTypes.includes('BreadcrumbList'));
const contentHubs = new Set(['/knowledge/', '/tutorials/', '/troubleshooting/']);
const articleRoutes = pages.filter(
  (p) => p.route.startsWith('/knowledge/') || p.route.startsWith('/tutorials/') || p.route.startsWith('/troubleshooting/'),
);
const nonHubArticles = articleRoutes.filter((p) => !contentHubs.has(p.route));
const noArticleSchema = nonHubArticles.filter((p) => !p.schemaTypes.includes('Article'));
if (noBreadcrumb.length === 0) console.log('  所有非 404 页面均有 BreadcrumbList。');
noBreadcrumb.forEach((p) => console.log(`  [缺 BreadcrumbList] ${p.route}`));
if (noArticleSchema.length === 0) console.log('  所有知识库/教程详情页均有 Article Schema。');
noArticleSchema.forEach((p) => console.log(`  [缺 Article Schema] ${p.route}`));

// 8) 孤立页面
console.log('\n== 8. 孤立页面检查 ==');
const linkedTargets = new Set();
for (const page of pages) {
  for (const link of page.internalLinks) {
    const normalized = link.endsWith('/') || link === '/' ? link : link + '/';
    linkedTargets.add(normalized);
    linkedTargets.add(link);
  }
}
const orphans = pages.filter((p) => p.route !== '/' && p.route !== '/404' && !linkedTargets.has(p.route));
if (orphans.length === 0) console.log('  未发现孤立页面。');
orphans.forEach((p) => console.log(`  [孤立页面，无内链指向] ${p.route}`));

console.log('\n体检完成。');

// 手动向 Bing / IndexNow 提交本站 URL，让 Bing 更快抓取新增或更新的页面。
// 用法：先 `npm run build` 并把站点部署上线（key 文件必须能在线访问），再执行：
//   npm run indexnow                 # 提交 sitemap 里的全部网址
//   npm run indexnow -- airports/    # 只提交指定路径（可写多个，相对站点根目录）
// 不需要额外依赖：用 Node 内置 fetch，读 dist/ 下 astro 生成的 sitemap 拿 URL 列表。
//
// IndexNow key 文件位于 public/b2c2a546433a8cf7de07a38b388e0397.txt，构建后出现在 dist 根目录，
// Bing 抓取时用它验证提交请求确实来自本站所有者。

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const SITE = 'https://jichangtj.net';
const KEY = 'b2c2a546433a8cf7de07a38b388e0397';
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const SITEMAP_0 = new URL('../dist/sitemap-0.xml', import.meta.url);

const extractLocs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

async function main() {
  const only = process.argv.slice(2).map((p) => new URL(p.replace(/^\/+/, ''), `${SITE}/`).href);
  let urlList = only;
  if (only.length === 0) {
    if (!existsSync(SITEMAP_0)) {
      console.error('找不到 dist/sitemap-0.xml，请先运行 `npm run build`。');
      process.exit(1);
    }
    urlList = [...new Set(extractLocs(await readFile(SITEMAP_0, 'utf-8')))];
  }
  if (urlList.length === 0) {
    console.error('没有可提交的 URL。');
    process.exit(1);
  }

  console.log(`准备提交 ${urlList.length} 个 URL 到 IndexNow（含 Bing）...`);
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  console.log(`IndexNow 响应状态：${res.status} ${res.statusText}`);
  if (!res.ok) {
    console.error(await res.text().catch(() => ''));
    process.exit(1);
  }
  console.log('提交完成。Bing 通常在数小时内响应抓取，具体收录情况请以 Bing Webmaster Tools 为准。');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

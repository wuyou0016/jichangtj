#!/usr/bin/env node
// 向 Bing IndexNow 端点批量提交本站 URL，让 Bing 主动抓取而不是被动等待常规爬虫节奏。
//
// 用法（网站正式部署、public/ 下的 key 文件已经能通过 https 访问之后再运行）：
//   node scripts/submit-indexnow.mjs
//   node scripts/submit-indexnow.mjs https://jichangtj.net/sitemap-index.xml
//
// 说明：
// - IndexNow 是 Bing / Yandex / Seznam 等搜索引擎共用的主动推送协议，提交后通常几小时内会被抓取，
//   不保证一定收录或排名，只是让"被发现"这一步更快。
// - key 文件必须先能通过 https://域名/<key>.txt 访问到（即先部署上线），本地跑这个脚本提交没有意义。
// - 每次新增/更新页面后手动跑一次即可，不需要每次 commit 都跑；也可以接入部署流程的 postdeploy 钩子。

import { siteConfig } from '../src/config/site.js';
import { INDEXNOW_KEY } from '../src/config/indexnow.js';

const host = new URL(siteConfig.url).host;
const keyLocation = `${siteConfig.url}/${INDEXNOW_KEY}.txt`;
const sitemapUrl = process.argv[2] ?? `${siteConfig.url}/sitemap-index.xml`;

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`请求失败 ${url}：HTTP ${res.status}`);
  return res.text();
}

// 简单粗暴地从 sitemap XML 里抠出所有 <loc> 内容，不引入额外的 XML 依赖。
function extractLocs(xml) {
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((m) => m[1].trim());
}

async function collectUrls() {
  const indexXml = await fetchText(sitemapUrl);
  const childSitemaps = extractLocs(indexXml).filter((u) => u.endsWith('.xml'));

  // sitemap-index.xml 通常只是指向若干子 sitemap（如 sitemap-0.xml），
  // 如果传进来的本身就是最终 sitemap（找不到子 sitemap），直接用它里面的 <loc>。
  if (childSitemaps.length === 0) {
    return extractLocs(indexXml);
  }

  const urlLists = await Promise.all(
    childSitemaps.map(async (url) => extractLocs(await fetchText(url))),
  );
  return urlLists.flat();
}

async function submit(urlList) {
  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList,
  };

  const res = await fetch('https://www.bing.com/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  // IndexNow 成功通常返回 200 或 202，具体见
  // https://www.bing.com/indexnow/getstarted
  console.log(`提交完成：HTTP ${res.status} ${res.statusText}`);
  const text = await res.text().catch(() => '');
  if (text) console.log(text);
}

try {
  console.log(`从 ${sitemapUrl} 读取 URL 列表...`);
  const urls = await collectUrls();
  if (urls.length === 0) {
    console.error('没有解析到任何 URL，检查 sitemap 地址是否正确、站点是否已经部署上线。');
    process.exit(1);
  }
  console.log(`共 ${urls.length} 个 URL，提交到 Bing IndexNow（host=${host}，key 位置=${keyLocation}）...`);
  await submit(urls);
} catch (err) {
  console.error('提交失败：', err.message);
  process.exit(1);
}

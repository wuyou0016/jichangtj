import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config/site';

// 手写 RSS 2.0，不引入 @astrojs/rss 依赖——内容量不大，自己拼 XML 更省事。
// 覆盖术语库 + 使用教程两类"文章型"内容，场景/服务商页不算独立文章，不放进来。

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const tutorials = await getCollection('tutorials');
  const glossary = await getCollection('glossary');

  const items = [
    ...tutorials.map((t) => ({
      title: t.data.title,
      description: t.data.description,
      link: `${siteConfig.url}/tutorials/${t.id}/`,
      pubDate: t.data.publishedAt,
    })),
    ...glossary.map((g) => ({
      title: g.data.title,
      description: g.data.description,
      link: `${siteConfig.url}/glossary/${g.id}/`,
      pubDate: g.data.publishedAt,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  const itemsXml = items
    .map(
      (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid>${item.link}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate.toUTCString()}</pubDate>
    </item>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.brandName)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.defaultDescription)}</description>
    <language>${siteConfig.language}</language>${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

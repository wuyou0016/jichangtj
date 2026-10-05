// 站内搜索索引：构建时生成静态 JSON，由 /search/ 页面在浏览器里检索，不依赖任何服务。
import { loadSite, shortName } from '../data/helpers';
import { TERMS } from '../data/glossary';
import { FAQ_GROUPS } from '../data/faq';
import { FACTS } from '../data/providers/facts';

export async function GET() {
  const { providers, scenarios, guides, tutorials } = await loadSite();
  const items: { t: string; u: string; k: string; d: string }[] = [];

  for (const s of scenarios) {
    items.push({ t: s.data.title, u: `/scenarios/${s.data.slug}/`, k: '场景', d: `${shortName(s)} ${s.data.summary ?? ''} ${s.data.description}` });
  }
  for (const p of providers) {
    const f = FACTS[p.id]!;
    items.push({ t: `${p.data.name}怎么样`, u: `/airports/${p.data.slug}/`, k: '服务商', d: `${(p.data.aliases ?? []).join(' ')} ${f.price.headline} ${f.client.text} ${p.data.scenarioFit.goodFor.join(' ')}` });
  }
  for (const g of guides) items.push({ t: g.data.title, u: `/knowledge/${g.id}/`, k: '知识库', d: `${g.data.description} ${g.data.takeaway}` });
  for (const t of tutorials) items.push({ t: t.data.title, u: `/tutorials/${t.id}/`, k: '教程', d: t.data.description });
  for (const t of TERMS) items.push({ t: `${t.term}${t.alt ? `（${t.alt}）` : ''}`, u: `/glossary/#${t.id}`, k: '术语', d: t.def });
  for (const g of FAQ_GROUPS) for (const q of g.items) items.push({ t: q.q, u: `/faq/#${g.id}`, k: '问答', d: q.a });
  items.push(
    { t: '综合排行榜', u: '/rankings/', k: '页面', d: '机场综合推荐顺序、排序理由与数据来源' },
    { t: '服务商对比', u: '/compare/', k: '页面', d: '价格口径、丢包率、客户端并排对比，可排序筛选' },
    { t: '数据中心', u: '/data/', k: '页面', d: '站长自测丢包率区间、解锁检测、数据覆盖矩阵' },
    { t: '选购向导', u: '/finder/', k: '工具', d: '回答 3 个问题得到场景建议和候选服务商' },
    { t: '流量成本换算与自测记录表', u: '/tools/', k: '工具', d: '换算每月成本、每 GB 成本；一周自测记录表' },
    { t: '评测方法与数据说明', u: '/methodology/', k: '页面', d: '数据可信度标签、测试方法与局限' },
    { t: '更新日志', u: '/updates/', k: '页面', d: '内容、数据与技术变更记录' },
  );

  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}

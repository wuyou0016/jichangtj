import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { FACTS } from './providers/facts';

export type Provider = CollectionEntry<'providers'>;
export type Scenario = CollectionEntry<'scenarios'>;
export type Guide = CollectionEntry<'guides'>;
export type Tutorial = CollectionEntry<'tutorials'>;

/** 场景展示顺序：先人群入口，再核心需求，再特殊情境。 */
export const SCENARIO_ORDER = ['beginner', 'budget', 'gaming', 'remote-work', 'streaming', 'study', 'travel', 'safe-buy'];

/** 短标题：用于信息板、卡片，不取完整问句。 */
export const SCENARIO_SHORT: Record<string, string> = {
  beginner: '新手第一次买',
  budget: '预算有限 / 学生党',
  gaming: '游戏加速',
  'remote-work': '远程办公',
  streaming: '流媒体解锁',
  study: '学习查资料',
  travel: '出差 / 出境',
  'safe-buy': '怕跑路稳妥买',
};

export const GUIDE_TOPIC_LABEL: Record<Guide['data']['topic'], string> = {
  buy: '购买与价格',
  test: '测试与验证',
  tech: '技术概念',
  safety: '安全与风险',
};

export async function loadSite() {
  const providers = await getCollection('providers');
  const scenarioAll = await getCollection('scenarios');
  const scenarios = SCENARIO_ORDER.map((slug) => scenarioAll.find((s) => s.data.slug === slug)).filter((s): s is Scenario => Boolean(s));
  const guides = (await getCollection('guides')).sort((a, b) => +b.data.updatedAt - +a.data.updatedAt || a.id.localeCompare(b.id));
  const tutorials = await getCollection('tutorials');
  const rankingEntry = (await getCollection('rankings')).find((r) => r.id === 'overall')!;
  const byId = new Map(providers.map((p) => [p.id, p]));
  const ranking = rankingEntry.data.entries.map((e, i) => ({
    rank: i + 1,
    reason: e.reason,
    keyFact: e.keyFact,
    caution: e.caution,
    provider: byId.get(e.providerId.id)!,
  }));
  const rankOf = new Map(ranking.map((r) => [r.provider.id, r.rank]));
  return { providers, byId, scenarios, guides, tutorials, ranking, rankingEntry, rankOf };
}

/** 某服务商在哪些场景里被推荐，以及排第几。 */
export function scenariosFor(provider: Provider, scenarios: Scenario[]) {
  return scenarios
    .map((s) => ({ scenario: s, pos: s.data.picks.findIndex((p) => p.providerId.id === provider.id) }))
    .filter((x) => x.pos >= 0);
}

export function lossText(id: string): string {
  const f = FACTS[id];
  if (!f?.loss) return '暂无测试数据';
  return `${f.loss.min}%–${f.loss.max}%`;
}

export function shortName(s: Scenario): string {
  return SCENARIO_SHORT[s.data.slug] ?? s.data.title;
}

/** 链接用的转义：把文本放进 JSON 脚本块里时避免 </script> 截断。 */
export function safeJson(o: unknown): string {
  return JSON.stringify(o).replace(/</g, '\\u003c');
}

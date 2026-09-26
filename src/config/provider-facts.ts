// 服务商速览字段（quickFacts）的展示文案与计算——对比表、详情页、场景页共用同一套。
// 这里只做格式化和简单换算，不产生新的事实；资料里没有的字段统一显示"待确认"或"暂无实测"。

type PriceSource = 'own-verified' | 'cross-verified' | 'single-source' | 'conflicting' | 'unknown';
type ThirdPartyClient = 'supported' | 'not-supported' | 'conflicting' | 'unverified';

interface QuickFacts {
  startingPrice?: string;
  monthlyPrice?: number;
  monthlyTrafficGB?: number;
  priceSource: PriceSource;
  thirdPartyClient: ThirdPartyClient;
  packetLoss?: { min: number; max: number; date: Date };
}

export const PRICE_SOURCE_LABEL: Record<PriceSource, string> = {
  'own-verified': '站长核实',
  'cross-verified': '多来源一致',
  'single-source': '单一第三方来源',
  conflicting: '来源说法不一',
  unknown: '暂无资料',
};

export const THIRD_PARTY_CLIENT_LABEL: Record<ThirdPartyClient, string> = {
  supported: '支持',
  'not-supported': '暂不支持',
  conflicting: '来源说法不一',
  unverified: '待确认',
};

// 服务商名 + "机场"，匹配用户实际的搜索说法（"无忧链接机场怎么样"）。
export function airportName(name: string): string {
  return name.endsWith('机场') ? name : `${name}机场`;
}

export function formatStartingPrice(facts: QuickFacts): string {
  return facts.startingPrice ?? '以官网为准';
}

export function formatTraffic(facts: QuickFacts): string {
  return facts.monthlyTrafficGB ? `${facts.monthlyTrafficGB}GB/月` : '待确认';
}

export function formatPacketLoss(facts: QuickFacts): string {
  return facts.packetLoss ? `${facts.packetLoss.min}%-${facts.packetLoss.max}%` : '暂无实测';
}

// 单位流量成本 = 起步套餐折合月价 ÷ 月流量。只有两个数字都有才算，否则返回 undefined。
export function unitCost(facts: QuickFacts): number | undefined {
  if (!facts.monthlyPrice || !facts.monthlyTrafficGB) return undefined;
  return facts.monthlyPrice / facts.monthlyTrafficGB;
}

export function formatUnitCost(facts: QuickFacts): string {
  const cost = unitCost(facts);
  return cost === undefined ? '无法估算' : `约 ${cost.toFixed(2)} 元/GB`;
}

export function formatDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

// "2026年9月"这种写法，用于排行榜等按月更新的标题。
export function formatYearMonth(value: Date): string {
  return `${value.getUTCFullYear()}年${value.getUTCMonth() + 1}月`;
}

// 服务商的结构化速查事实。全部来自 providers.json 里已有的资料描述（官方入口说明、第三方资料、站长自测记录），
// 这里只是把散在文字里的信息整理成可对比的字段，不新增任何没有来源的事实。
// 丢包率为站长自测：固定网络环境（珠海联通）、多批次范围，不是单次数据（方法见 /methodology/）。

export type ClientSupport = 'supported' | 'official-only' | 'conflict' | 'unknown';
export type EntryKind = 'captcha' | 'register' | 'redirect' | 'failed';

export interface ProviderFacts {
  /** 站长自测丢包率区间（%）；没有测试数据则为 null */
  loss: { min: number; max: number; note?: string } | null;
  price: { headline: string; basis: string };
  /** 起步月均价（元），仅用于选购向导排序；口径不同，不用于对外比较。没有可靠价格则为 null */
  monthly: number | null;
  protocols: string;
  /** 线路类型的说法（保留来源标注，均为服务商或第三方的描述，本站未验证） */
  line: string;
  /** 节点地区（保留来源标注） */
  nodes: string;
  client: { type: ClientSupport; text: string };
  entry: { kind: EntryKind; text: string };
  unlock: string | null;
  flags: string[];
}

export const LOSS_AXIS_MAX = 4;

export const CLIENT_LABEL: Record<ClientSupport, string> = {
  supported: '支持通用订阅',
  'official-only': '仅官方客户端',
  conflict: '说法不一',
  unknown: '资料未提及',
};

export const ENTRY_LABEL: Record<EntryKind, string> = {
  captcha: '验证码校验页',
  register: '注册后才可见',
  redirect: '经中转页',
  failed: '访问失败',
};

export const FACTS: Record<string, ProviderFacts> = {
  'wuyou-lianjie': {
    loss: { min: 0.7, max: 0.8 },
    price: { headline: 'MINI 包月约 ¥6.6/月起；舒心 100GB 包月低至 ¥14/月；省心 200GB ¥33/月起', basis: '站长确认口径，以官网结算页为准' },
    monthly: 6.6,
    protocols: 'VLESS / Trojan / Hysteria2（官方页面表述）',
    line: 'IPLC / IEPL 专线（官方页面表述）',
    nodes: '香港、日本、新加坡、美国（官方页面表述）',
    client: { type: 'supported', text: '站长确认支持通用订阅；官方页面列出 Clash 系、Shadowrocket、v2rayN 等主流客户端（以官网最新说明为准）' },
    entry: { kind: 'captcha', text: '官方入口为图形验证码校验页，需要手动完成校验才能继续' },
    unlock: '50 个节点检测 YouTube / Netflix / Disney+：49 个正常，1 个香港节点被识别为“送中”',
    flags: ['本站对它做过丢包率持续跟踪与流媒体解锁检测（站长自测）'],
  },
  firefly: {
    loss: { min: 1.3, max: 1.6 },
    price: { headline: '年付约 ¥8/月起 · 60GB', basis: '两个独立第三方来源基本一致' },
    monthly: 8,
    protocols: '资料未列出',
    line: 'IPLC 专线（第三方资料）',
    nodes: '香港、新加坡、日本、台湾（第三方资料）',
    client: { type: 'conflict', text: '不同第三方来源对第三方客户端兼容性的说法互相矛盾' },
    entry: { kind: 'register', text: '需先注册账户（邮箱 + 密码）才能查看后续内容，本站未创建账户核实' },
    unlock: null,
    flags: ['价格资料可信度较高（多来源印证）'],
  },
  'weifeng-network': {
    loss: { min: 2.2, max: 2.8 },
    price: { headline: '包月约 ¥27/月；另有第三方称年付折算约 ¥11/月 · 100GB', basis: '包月价为站长确认，年付说法为第三方，口径不同不可直接比较' },
    monthly: 27,
    protocols: '资料未列出',
    line: 'IEPL 专线（第三方资料）',
    nodes: '香港、新加坡、日本、美国（第三方资料）',
    client: { type: 'unknown', text: '资料未提及第三方客户端兼容性' },
    entry: { kind: 'register', text: '需先注册账户才能查看后续内容，本站未创建账户核实' },
    unlock: null,
    flags: ['有第三方来源提示其定价偏高', '定位入门级专线（第三方资料）'],
  },
  shanyue: {
    loss: { min: 1.5, max: 2.1, note: '批次间波动明显' },
    price: { headline: '年付约 ¥8/月起 · 60GB', basis: '两个第三方来源基本一致' },
    monthly: 8,
    protocols: '资料未列出',
    line: 'IPLC 专线与骨干网接入（第三方资料）',
    nodes: '香港、新加坡、日本、台湾、美国（第三方资料）',
    client: { type: 'unknown', text: '资料未提及第三方客户端兼容性' },
    entry: { kind: 'captcha', text: '官方入口为验证码校验页，本站未能核实具体套餐' },
    unlock: null,
    flags: ['有第三方资料提示其关联域名注册时间较短'],
  },
  'lingmao-network': {
    loss: { min: 2.9, max: 3.4 },
    price: { headline: '年付约 ¥7.1/月起 · 45GB', basis: '两个独立第三方来源基本吻合' },
    monthly: 7.1,
    protocols: '说法冲突：宣传称新 SS 协议，第三方测速截图显示 VLESS',
    line: 'IPLC 专线（第三方资料宣称）',
    nodes: '资料未列出完整地区',
    client: { type: 'unknown', text: '资料未提及第三方客户端兼容性' },
    entry: { kind: 'register', text: '需先注册账户才能查看后续内容，本站未创建账户核实' },
    unlock: null,
    flags: ['协议描述存在冲突，实际协议存疑', '第三方资料提示主要面向网页浏览与流媒体'],
  },
  'kuajie-cloud': {
    loss: { min: 3.1, max: 3.8 },
    price: { headline: '价格与流量档位说法不一，无法可靠估算', basis: '三个第三方来源差异明显' },
    monthly: null,
    protocols: '资料未列出',
    line: '暂无可核实的公开资料',
    nodes: '暂无可核实的公开资料',
    client: { type: 'unknown', text: '资料未提及第三方客户端兼容性' },
    entry: { kind: 'register', text: '需先注册账户才能查看后续内容，本站未创建账户核实' },
    unlock: null,
    flags: ['另有资料显示订阅链接为人工一次性发放，约 5 小时后可能失效'],
  },
  kuaili: {
    loss: { min: 2.0, max: 2.6 },
    price: { headline: '暂无可核实的价格资料', basis: '没有找到可信的独立第三方来源' },
    monthly: null,
    protocols: '资料未列出',
    line: '来源说法不一（IPLC / BGP 或 IEPL）',
    nodes: '暂无可核实的公开资料',
    client: { type: 'unknown', text: '资料未提及第三方客户端兼容性' },
    entry: { kind: 'register', text: '官方入口为邮箱 / 密码登录注册整合页，本站未创建账户核实' },
    unlock: null,
    flags: ['是本站收录服务商中公开资料最薄弱的一个'],
  },
  'feimao-cloud': {
    loss: null,
    price: { headline: '约 ¥7/月起 · 50GB（年付约 ¥84）', basis: '两个独立第三方来源一致' },
    monthly: 7,
    protocols: 'Shadowsocks / Trojan / VLESS（第三方记录）',
    line: '宣称全线 IPLC 专线，单节点峰值 2.5Gbps（服务商宣称）',
    nodes: '资料未列出完整地区',
    client: { type: 'unknown', text: '资料未提及第三方客户端兼容性' },
    entry: { kind: 'failed', text: '本站自动化访问工具未能打开官方入口页面（请求被拒绝或加载失败）' },
    unlock: null,
    flags: ['宣称全线 IPLC 专线、单节点峰值 2.5Gbps（第三方转述，本站未验证）', '本站没有它的独立测速数据'],
  },
  edgenova: {
    loss: null,
    price: { headline: '年付 ¥108 · 45GB 起；另有月付档（¥25/月 · 120GB 起）', basis: '单一第三方来源（二毛 ermao.net，2026-06）' },
    monthly: 9,
    protocols: '资料未列出',
    line: 'IPLC 专线骨干网（第三方转述）',
    nodes: '资料未列出',
    client: { type: 'official-only', text: '第三方资料称暂不支持通用订阅，提供 Android / iOS / Windows / macOS 使用教程' },
    entry: { kind: 'redirect', text: '官方入口经线路检测中转页，本站未能确认落地页内容' },
    unlock: null,
    flags: ['线路定位为 IPLC 专线骨干网（第三方转述）', '流量重置 ¥10（第三方资料）'],
  },
};

/** 丢包区间的视觉分档：仅用于条形图配色，不是评分。 */
export function lossTier(f: ProviderFacts | undefined): 'best' | 'mid' | 'high' | null {
  if (!f?.loss) return null;
  if (f.loss.max <= 1) return 'best';
  if (f.loss.max <= 2.8) return 'mid';
  return 'high';
}

// ---------------------------------------------------------------------------
// 资料完整度：只表示“本站有没有这类资料”，不代表服务好坏，也不是评分。
// ---------------------------------------------------------------------------

export type CoverState = 'full' | 'part' | 'none';

export interface CoverItem {
  key: 'price' | 'line' | 'protocol' | 'nodes' | 'client' | 'test';
  label: string;
  state: CoverState;
  note: string;
}

export function coverage(f: ProviderFacts): { items: CoverItem[]; score: number } {
  const price: CoverState = f.price.basis.includes('站长确认') || f.price.basis.includes('两个') ? 'full' : f.monthly !== null ? 'part' : 'none';
  const line: CoverState = f.line.includes('暂无') ? 'none' : f.line.includes('说法不一') || f.line.includes('宣称') ? 'part' : 'full';
  const protocol: CoverState = f.protocols.includes('未列出') ? 'none' : f.protocols.includes('冲突') ? 'part' : 'full';
  const nodes: CoverState = f.nodes.includes('暂无') || f.nodes === '资料未列出' ? 'none' : f.nodes.includes('未列出') ? 'part' : 'full';
  const client: CoverState = f.client.type === 'supported' || f.client.type === 'official-only' ? 'full' : f.client.type === 'conflict' ? 'part' : 'none';
  const test: CoverState = f.loss ? 'full' : 'none';
  const items: CoverItem[] = [
    { key: 'price', label: '价格', state: price, note: price === 'full' ? '站长确认或多来源一致' : price === 'part' ? '仅单一来源' : '无可靠价格资料' },
    { key: 'line', label: '线路', state: line, note: line === 'full' ? '有来源标注的线路说明' : line === 'part' ? '说法为宣称或来源不一' : '暂无资料' },
    { key: 'protocol', label: '协议', state: protocol, note: protocol === 'full' ? '有协议资料' : protocol === 'part' ? '来源说法冲突' : '资料未列出' },
    { key: 'nodes', label: '节点', state: nodes, note: nodes === 'full' ? '有节点地区资料' : nodes === 'part' ? '地区未列全' : '资料未列出' },
    { key: 'client', label: '客户端', state: client, note: client === 'full' ? '已明确客户端支持情况' : client === 'part' ? '来源说法不一' : '资料未提及' },
    { key: 'test', label: '自测', state: test, note: test === 'full' ? '本站有测试数据' : '本站没有测试数据' },
  ];
  const score = items.reduce((n, i) => n + (i.state === 'full' ? 1 : i.state === 'part' ? 0.5 : 0), 0);
  return { items, score };
}

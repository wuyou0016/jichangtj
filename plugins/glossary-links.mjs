// 给 Markdown 正文里的术语自动加术语表链接（Sätteri hast 插件）：每篇文章每个术语只链接第一次出现，
// 不碰标题、链接、代码、表头；链接上带 data-def，页面脚本据此显示悬浮解释。
import { TERMS } from '../src/data/glossary.ts';

const SKIP = new Set(['a', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'th', 'script', 'style', 'button', 'summary']);
const EXTRA = {
  clash: ['Clash'],
  'packet-loss': ['丢包率'],
  latency: ['延迟'],
  jitter: ['抖动'],
  'peak-hour': ['晚高峰'],
  multiplier: ['倍率'],
  reset: ['流量重置'],
  'sent-to-cn': ['送中'],
  'annual-equiv': ['年付折算'],
  tun: ['TUN 模式', 'TUN'],
  unlock: ['流媒体解锁'],
  relay: ['中转'],
  subscription: ['订阅链接'],
  'rug-pull': ['跑路'],
  protocol: ['协议'],
  route: ['线路'],
  node: ['节点'],
  client: ['客户端'],
  'device-limit': ['设备数限制'],
  conversion: ['订阅转换'],
  'rule-mode': ['规则模式'],
  'global-mode': ['全局模式'],
  'system-proxy': ['系统代理'],
  bandwidth: ['带宽'],
  'official-client': ['官方自研客户端', '官方客户端'],
  hysteria2: ['Hysteria2'],
  vless: ['VLESS'],
  vmess: ['VMess'],
  trojan: ['Trojan'],
  ss: ['Shadowsocks'],
  iplc: ['IPLC'],
  iepl: ['IEPL'],
  bgp: ['BGP'],
  'native-ip': ['原生 IP'],
};
const MAX_PER_PAGE = 14;

const entries = [];
for (const t of TERMS) {
  if (t.id === 'airport') continue;
  const keys = new Set(EXTRA[t.id] ?? []);
  const plain = t.term.replace(/（.*?）/g, '').trim();
  if (plain.length >= 2 && !EXTRA[t.id]) keys.add(plain);
  const def = t.def.split(/[。！？]/)[0] + '。';
  for (const k of keys) entries.push({ id: t.id, key: k, def: def.length > 70 ? def.slice(0, 68) + '…' : def });
}
entries.sort((a, b) => b.key.length - a.key.length);

// 工厂函数每个文档调用一次，所以 used / count 是文档级状态。
export const glossaryPlugin = () => {
  const used = new Set();
  let count = 0;

  const link = (e, text) => ({
    type: 'element',
    tagName: 'a',
    properties: { href: '/glossary/#' + e.id, className: ['gl'], 'data-def': e.def, 'data-term': e.key },
    children: [{ type: 'text', value: text }],
  });

  const split = (value) => {
    if (count >= MAX_PER_PAGE) return null;
    let best = null;
    for (const e of entries) {
      if (used.has(e.id)) continue;
      const i = value.indexOf(e.key);
      if (i === -1) continue;
      if (/^[A-Za-z]/.test(e.key)) {
        const before = value[i - 1];
        const after = value[i + e.key.length];
        if ((before && /[A-Za-z0-9]/.test(before)) || (after && /[A-Za-z0-9]/.test(after))) continue;
      }
      if (!best || i < best.i) best = { i, e };
    }
    if (!best) return null;
    used.add(best.e.id);
    count++;
    const { i, e } = best;
    const out = [];
    if (i > 0) out.push({ type: 'text', value: value.slice(0, i) });
    out.push(link(e, value.slice(i, i + e.key.length)));
    const rest = value.slice(i + e.key.length);
    if (rest) {
      const more = split(rest);
      if (more) out.push(...more);
      else out.push({ type: 'text', value: rest });
    }
    return out;
  };

  return {
    name: 'glossary-links',
    text(node, ctx) {
      if (count >= MAX_PER_PAGE) return;
      let a = ctx.parent(node);
      while (a && a.type === 'element') {
        if (SKIP.has(a.tagName)) return;
        a = ctx.parent(a);
      }
      const parts = split(node.value);
      if (parts) ctx.replaceNode(node, parts);
    },
  };
};

// 术语表。解释只说“这个词通常指什么、对选购有什么影响”，不替任何服务商背书。
// 与 /knowledge/ 的专题文章互相链接：guides 字段是相关文章 id。

export interface Term {
  id: string;
  term: string;
  alt?: string;
  group: 'basic' | 'route' | 'protocol' | 'metric' | 'usage' | 'buy';
  def: string;
  note?: string;
  guides?: string[];
  see?: string[];
}

export const GROUPS: Record<Term['group'], string> = {
  basic: '基础概念',
  route: '线路与架构',
  protocol: '协议',
  metric: '网络指标',
  usage: '客户端与使用',
  buy: '购买与风险',
};

export const TERMS: Term[] = [
  { id: 'airport', term: '机场', alt: '机场代理 / 机场服务', group: 'basic', def: '中文圈对一类代理订阅服务的俗称：服务商维护大量服务器节点，用户购买套餐后得到一个订阅链接，导入客户端即可使用。它和航空机场没有关系，“机场”这个叫法来自行业黑话。', note: '机场是一种服务形态，不是某个具体软件。', see: ['node', 'subscription', 'client'] },
  { id: 'node', term: '节点', alt: 'Node', group: 'basic', def: '机场里一台可供连接的服务器入口，通常按地区命名，如“香港 01”“日本 03”。一个订阅里往往有几十到上百个节点，质量和线路类型各不相同。', see: ['route', 'multiplier'] },
  { id: 'route', term: '线路', group: 'route', def: '从你的网络到节点、再到目标网站所经过的路径。同样的地区名下，不同线路的延迟和稳定性可能差别很大，所以服务商常把线路类型当成卖点来宣传。', guides: ['route-types-explained'], see: ['iplc', 'iepl', 'bgp', 'relay'] },
  { id: 'subscription', term: '订阅链接', alt: 'Subscription', group: 'usage', def: '服务商给你的一串网址，客户端通过它拉取最新的节点列表。订阅链接等同于账号凭证，谁拿到谁就能使用你的流量。', guides: ['subscription-link-security'], see: ['client', 'conversion'] },
  { id: 'client', term: '客户端', alt: 'Client', group: 'usage', def: '用来导入订阅、选择节点并发起连接的软件，如 Clash 系、Shadowrocket、v2rayN 等，也有服务商自研的官方客户端。机场本身不是软件，必须配合客户端使用。', see: ['subscription', 'official-client'] },
  { id: 'official-client', term: '官方自研客户端', group: 'usage', def: '服务商自己开发的专用软件。优点是装上就用、不需要手动导入配置；限制是通常不能把订阅导入 Clash 等第三方客户端，购买前要确认你是否接受这一点。', see: ['client', 'subscription'] },
  { id: 'clash', term: 'Clash 系客户端', group: 'usage', def: '一类以规则分流见长的客户端的统称。原版 Clash 项目已停止维护，现在常见的是基于其内核分支（如 mihomo）的各类客户端。能否导入某个机场的订阅，取决于服务商是否开放通用订阅。', see: ['subscription', 'client'] },
  { id: 'protocol', term: '协议', group: 'protocol', def: '客户端与节点之间传输数据所遵循的规则，如 Shadowsocks、VMess、VLESS、Trojan、Hysteria2。协议影响兼容性和在弱网下的表现，但同样的协议在不同服务商手里体验可能差很多，不能只看名字下结论。', see: ['ss', 'vless', 'trojan', 'hysteria2'] },
  { id: 'ss', term: 'Shadowsocks', alt: 'SS', group: 'protocol', def: '较早出现、实现简单的轻量协议，几乎所有客户端都支持。许多机场仍把它作为兼容性最好的基础选项。', see: ['protocol'] },
  { id: 'vmess', term: 'VMess', group: 'protocol', def: 'V2Ray 项目最初设计的协议，带有身份验证与时间校验，因此对设备系统时间有要求：时间偏差大时可能连不上。', see: ['protocol', 'vless'] },
  { id: 'vless', term: 'VLESS', group: 'protocol', def: 'VMess 之后推出的更轻量的协议，本身不做加密，通常搭配 TLS 使用。目前不少服务商在用，客户端内核需要支持才能连接。', see: ['protocol', 'vmess'] },
  { id: 'trojan', term: 'Trojan', group: 'protocol', def: '把代理流量伪装成普通 HTTPS 流量的协议，设计目标是降低被识别的概率，依赖正确配置的证书与域名。', see: ['protocol'] },
  { id: 'hysteria2', term: 'Hysteria2', group: 'protocol', def: '基于 QUIC 的较新协议，目标是在丢包较多、网络不稳定的环境下保持可用的传输效果。需要客户端内核支持，较旧的客户端可能无法连接。', see: ['protocol', 'packet-loss'] },
  { id: 'iplc', term: 'IPLC', alt: '国际专线', group: 'route', def: '宣传里的“IPLC 专线”通常指节点之间走点对点的国际私有线路，而非公共互联网。它是服务商的架构说法，用户无法直接验证，更可靠的办法是看你自己测到的延迟与丢包。', guides: ['route-types-explained'], see: ['iepl', 'relay'] },
  { id: 'iepl', term: 'IEPL', group: 'route', def: '与 IPLC 相近的国际以太网专线概念，机场宣传中常与 IPLC 并列出现。同样属于服务商的架构描述，购买前以实际体验为准。', guides: ['route-types-explained'], see: ['iplc'] },
  { id: 'bgp', term: 'BGP 线路', group: 'route', def: '机场宣传里常指“多家运营商接入、自动选路”的入口线路。是否真能带来更稳的体验，需要在你自己的网络下验证，不要只看这三个字母。', see: ['route', 'relay'] },
  { id: 'relay', term: '中转', alt: '中转节点', group: 'route', def: '用户先连到一台“入口服务器”，再由它转发到真正出网的“落地服务器”的架构。入口可能针对不同运营商做了优化，但多一跳也意味着多一个可能出问题的环节。', guides: ['route-types-explained'], see: ['iplc', 'route'] },
  { id: 'multiplier', term: '流量倍率', alt: '倍率', group: 'buy', def: '部分节点按倍数折算流量：倍率 2 表示实际用 1GB 会扣 2GB。买前要确认高质量节点的倍率，否则看起来很划算的套餐可能很快用完。', guides: ['airport-pricing-explained'], see: ['reset'] },
  { id: 'reset', term: '流量重置', group: 'buy', def: '流量用完后可以额外付费恢复额度，或在每个周期开始时自动重置。不同服务商规则不同，价格也不同，应在下单前就问清。', guides: ['airport-pricing-explained'], see: ['multiplier'] },
  { id: 'packet-loss', term: '丢包率', alt: 'Packet Loss', group: 'metric', def: '发出的数据包中没有成功到达的比例。视频会议、游戏对它最敏感，哪怕只有百分之几也能感觉到断音、瞬移。本站跟踪的是通用丢包率，不针对某个具体游戏或网站。', guides: ['loss-latency-jitter-explained'], see: ['latency', 'jitter'] },
  { id: 'latency', term: '延迟', alt: 'Ping / RTT', group: 'metric', def: '数据往返一次所需的时间，单位毫秒。延迟低不等于体验好：稳定的 120ms 往往比忽高忽低的 60ms 更舒服。', guides: ['loss-latency-jitter-explained'], see: ['packet-loss', 'jitter'] },
  { id: 'jitter', term: '抖动', alt: 'Jitter', group: 'metric', def: '延迟的波动程度。抖动大时，语音通话会断断续续，实时游戏会时快时慢，即使平均延迟看起来不高。', guides: ['loss-latency-jitter-explained'], see: ['latency'] },
  { id: 'bandwidth', term: '带宽', group: 'metric', def: '单位时间内能传输的数据量上限，常用 Mbps 表示。日常网页和会议对带宽要求不高，下载大文件和高清视频才吃带宽。带宽大不代表连接稳定。', see: ['packet-loss'] },
  { id: 'peak-hour', term: '晚高峰', group: 'metric', def: '通常指晚间 19:00–23:00 左右用户集中上网的时段。很多线路在这个时间段更容易拥堵，所以评估稳定性必须包含晚高峰，而不是只在凌晨测速。', guides: ['self-test-seven-days'], see: ['packet-loss'] },
  { id: 'unlock', term: '流媒体解锁', group: 'usage', def: '通过节点访问 Netflix、Disney+ 等平台并正常观看对应地区内容的能力。取决于节点所用 IP 是否被平台识别，是节点层面的个体差异。', guides: ['streaming-unlock-verify'], see: ['sent-to-cn', 'native-ip'] },
  { id: 'sent-to-cn', term: '送中', group: 'usage', def: '在流媒体检测中，节点所在地区被平台识别成中国大陆地区，导致无法访问目标地区的内容。个别节点“送中”很常见，不代表整家服务商不可用。', guides: ['streaming-unlock-verify'], see: ['unlock'] },
  { id: 'native-ip', term: '原生 IP', group: 'usage', def: '指 IP 的注册地与实际使用地一致，而不是被转手或转借。对流媒体和部分 AI 工具的访问更友好，但“原生”也是服务商的宣传说法，需要自己验证。', see: ['unlock'] },
  { id: 'rule-mode', term: '规则模式', alt: '分流', group: 'usage', def: '客户端按规则决定哪些流量走代理、哪些直连：国内网站直连，其余走代理。日常使用建议规则模式，排查问题时再临时切全局。', see: ['global-mode'] },
  { id: 'global-mode', term: '全局模式', group: 'usage', def: '所有流量都走代理。适合排查“是不是规则的问题”，不适合日常使用，因为会让国内网站也绕路，变慢也更耗流量。', see: ['rule-mode'] },
  { id: 'tun', term: 'TUN 模式', group: 'usage', def: '通过虚拟网卡接管整台设备的流量，能覆盖不遵守系统代理设置的应用。配置略复杂，需要管理员权限，但覆盖面比系统代理更完整。', see: ['system-proxy'] },
  { id: 'system-proxy', term: '系统代理', group: 'usage', def: '把代理设置写入系统，让遵守该设置的应用走代理。简单易用，但有些软件不读取系统代理，这时需要 TUN 模式或应用内单独设置。', see: ['tun'] },
  { id: 'conversion', term: '订阅转换', group: 'usage', def: '把一种格式的订阅转成另一种客户端能读的格式。转换过程要把订阅链接交给转换服务，有泄露风险，能用服务商自己提供的对应格式就不要走第三方转换。', guides: ['subscription-link-security'], see: ['subscription'] },
  { id: 'device-limit', term: '设备数限制', group: 'buy', def: '同一订阅允许同时在线的设备数量。订阅链接被分享或泄露时，很容易触发上限，导致正常设备也被踢下线。', see: ['subscription'] },
  { id: 'annual-equiv', term: '年付折算价', group: 'buy', def: '把年付总价除以 12 得到的月均价。看起来很低，但需要一次性预付，并承担服务商跑路或体验不佳的风险；和月付价不能直接比较。', guides: ['monthly-vs-yearly', 'airport-pricing-explained'], see: ['rug-pull'] },
  { id: 'rug-pull', term: '跑路', group: 'buy', def: '服务商突然停止服务、关站或失联，已付费用无法使用也难以追回的情况。无法完全避免，能做的是小额月付、不囤长期套餐，并留意站点与价格是否出现异常。', guides: ['airport-red-flags'], see: ['annual-equiv'] },
];

export const TERM_MAP = Object.fromEntries(TERMS.map((t) => [t.id, t]));

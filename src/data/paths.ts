// 阅读路线：把已有的文章按“学习顺序”串起来。进度只存在读者浏览器的 localStorage 里，不上传。

export interface PathStep {
  label: string;
  title: string;
  href: string;
  note: string;
}

export interface ReadingPath {
  id: string;
  title: string;
  who: string;
  steps: PathStep[];
}

export const PATHS: ReadingPath[] = [
  {
    id: 'newbie',
    title: '新手 7 天路线',
    who: '第一次接触机场，想少踩坑地买到并用起来',
    steps: [
      { label: '第 1 天', title: '机场代理是什么？新手怎么选', href: '/tutorials/what-is-airport-and-how-to-choose/', note: '先弄懂概念和基本判断' },
      { label: '第 2 天', title: '新手第一次买，怎么选不踩坑', href: '/scenarios/beginner/', note: '看新手场景的判断指标与推荐' },
      { label: '第 3 天', title: '机场价格怎么看', href: '/knowledge/airport-pricing-explained/', note: '把价格统一成可比的口径' },
      { label: '第 4 天', title: '通用订阅与官方客户端', href: '/knowledge/universal-subscription-vs-official-client/', note: '确认你想用的客户端是否被支持' },
      { label: '第 5 天', title: '订阅链接安全', href: '/knowledge/subscription-link-security/', note: '养成保管订阅链接的习惯' },
      { label: '第 6 天', title: '月付还是年付', href: '/knowledge/monthly-vs-yearly/', note: '决定第一次买多久' },
      { label: '第 7 天', title: '一周自测计划', href: '/knowledge/self-test-seven-days/', note: '买完用 7 天验证是否适合你' },
    ],
  },
  {
    id: 'safe',
    title: '稳妥购买路线',
    who: '担心跑路、被坑，想把风险控制住',
    steps: [
      { label: '第 1 步', title: '怕跑路，稳妥怎么买', href: '/scenarios/safe-buy/', note: '先看这个场景的总体思路' },
      { label: '第 2 步', title: '买前红旗清单', href: '/knowledge/airport-red-flags/', note: '逐项对照 12 个风险信号' },
      { label: '第 3 步', title: '付款与退款指南', href: '/knowledge/payment-and-refund/', note: '付款前存凭证、读懂退款条件' },
      { label: '第 4 步', title: '月付还是年付', href: '/knowledge/monthly-vs-yearly/', note: '用四个问题判断要不要预付' },
      { label: '第 5 步', title: '用机场，服务商能看到什么', href: '/knowledge/privacy-and-logs/', note: '理解隐私与日志的边界' },
    ],
  },
  {
    id: 'tech',
    title: '看懂技术词路线',
    who: '想搞明白节点、线路、协议这些词到底在说什么',
    steps: [
      { label: '第 1 步', title: '机场术语表', href: '/glossary/', note: '先通读一遍核心术语' },
      { label: '第 2 步', title: '丢包、延迟、抖动', href: '/knowledge/loss-latency-jitter-explained/', note: '看懂三个质量指标' },
      { label: '第 3 步', title: '线路类型怎么看', href: '/knowledge/route-types-explained/', note: 'IPLC、BGP、中转分别是什么' },
      { label: '第 4 步', title: '协议速读', href: '/knowledge/protocol-quick-guide/', note: '协议对你意味着什么' },
      { label: '第 5 步', title: '按设备选客户端', href: '/knowledge/client-choice-by-device/', note: '把协议和客户端对上号' },
      { label: '第 6 步', title: '为什么你的体验和别人不一样', href: '/knowledge/why-experience-differs/', note: '理解数据的适用范围' },
    ],
  },
];

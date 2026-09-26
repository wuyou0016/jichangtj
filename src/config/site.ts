// 全站基础配置。只放品牌/域名/语言等站点级事实。

export const siteConfig = {
  siteName: '机场TJ',
  brandName: '机场TJ',
  brandNameEn: 'JichangTJ',
  url: 'https://jichangtj.net',
  locale: 'zh-CN',
  language: 'zh-CN',

  description:
    '机场TJ是一个综合性的机场/梯子/VPN推荐中文网站——按使用场景整理选择建议（游戏加速、流媒体解锁、远程办公、预算有限、临时出差），并提供协议与线路术语库、常见问题解答、避坑指南，而不是一份笼统的排行榜。',

  // 页脚用的一句话定位，比 description 更短，专门给页脚品牌栏用。
  tagline: '机场、梯子、VPN 怎么选——按使用场景整理建议，而不是一份笼统的排行榜。',

  defaultTitle: '机场TJ｜机场推荐、梯子推荐、VPN推荐，按场景选',
  defaultDescription:
    '机场TJ是一个综合性的机场/梯子/VPN推荐中文网站——按使用场景整理选择建议，附协议与线路术语库、常见问题解答、避坑指南。',

  defaultOgImage: '/images/og/default.png',

  author: {
    name: '机场TJ编辑团队',
  },

  social: {
    telegram: 'https://t.me/xxxxtony',
  },
} as const;

// 全站基础配置。只放品牌/域名/语言等站点级事实。

export const siteConfig = {
  siteName: '机场TJ',
  brandName: '机场TJ',
  brandNameEn: 'JichangTJ',
  url: 'https://jichangtj.net',
  locale: 'zh-CN',
  language: 'zh-CN',

  description:
    '机场TJ是一个按使用场景整理机场推荐的中文网站——游戏加速、流媒体解锁、远程办公、预算有限等不同场景分别给出选择思路，实测丢包率、价格资料和第三方信息分开标注，并提供 Clash、小火箭、v2rayN 等梯子客户端的使用教程。',

  // 页脚用的一句话定位，比 description 更短，专门给页脚品牌栏用。
  tagline: '按使用场景整理机场推荐，实测数据与资料来源分开标注，附 Clash 等梯子客户端教程。',

  defaultTitle: '机场TJ｜机场推荐、梯子实测与 Clash 教程',
  defaultDescription:
    '机场TJ按使用场景整理机场推荐——预算有限、游戏加速、远程办公、流媒体解锁，附实测丢包率、价格对比与 Clash 等梯子客户端使用教程。',

  defaultOgImage: '/images/og/default.png',

  author: {
    name: '机场TJ编辑团队',
  },
} as const;

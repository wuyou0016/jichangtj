// 全站基础配置。只放品牌/域名/语言等站点级事实。

export const siteConfig = {
  siteName: '机场TJ',
  brandName: '机场TJ',
  brandNameEn: 'JichangTJ',
  url: 'https://jichangtj.net',
  locale: 'zh-CN',
  language: 'zh-CN',

  description:
    '机场TJ是一个按使用场景整理机场代理选择建议的中文网站——游戏加速、流媒体解锁、远程办公、预算有限、临时出差等不同场景，分别给出对应的选择思路，而不是一份笼统的排行榜。',

  defaultTitle: '机场TJ｜按场景选机场代理',
  defaultDescription:
    '机场TJ是一个按使用场景整理机场代理选择建议的中文网站——游戏加速、流媒体解锁、远程办公、预算有限等不同场景，分别整理对应的选择建议。',

  defaultOgImage: '/images/og/default.png',

  author: {
    name: '机场TJ编辑团队',
  },
} as const;

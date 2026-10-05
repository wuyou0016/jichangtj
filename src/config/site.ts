// 全站基础配置。只放品牌/域名/语言等站点级事实。

export const siteConfig = {
  siteName: '机场TJ',
  brandName: '机场TJ',
  brandNameEn: 'JichangTJ',
  url: 'https://jichangtj.net',
  locale: 'zh-CN',
  language: 'zh-CN',

  description:
    '机场TJ是一个面向中文用户的机场代理综合信息站：按使用场景整理选择建议，提供综合排行榜、服务商对比、站长自测数据中心、术语表与专题知识库，信息来源逐条标注。',

  // 页脚用的一句话定位。
  tagline: '按使用场景选机场代理：排行榜、对比、数据中心与知识库，来源逐条标注。',

  defaultTitle: '机场TJ｜机场代理综合导航：按场景选、排行榜、对比与数据',
  defaultDescription:
    '机场TJ按使用场景整理机场代理选择建议，提供综合排行榜、服务商对比、站长自测数据中心、术语表和专题知识库，官方、第三方与自测信息分开标注。',

  defaultOgImage: '/images/og/default.png',

  author: {
    name: '机场TJ编辑团队',
  },

  // 内容整体最近一次更新日期，用于顶部数据条与结构化数据。
  updatedAt: '2026-10-05',

  // 联盟推广披露：只放页脚与服务条款，不在首页醒目位置出现。
  disclosure: '本站含联盟推广链接，通过链接订阅时本站可能获得佣金，你的支付金额不变。',
} as const;

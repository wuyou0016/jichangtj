// 全站导航与页脚链接的唯一来源，Header / Footer / 搜索索引共用。

export const NAV = [
  { href: '/scenarios/', label: '按场景选' },
  { href: '/rankings/', label: '排行榜' },
  { href: '/compare/', label: '对比' },
  { href: '/airports/', label: '机场导航' },
  { href: '/data/', label: '数据中心' },
  { href: '/knowledge/', label: '知识库' },
  { href: '/tools/', label: '工具' },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: '选机场',
    links: [
      { href: '/finder/', label: '选购向导' },
      { href: '/scenarios/', label: '按场景选' },
      { href: '/rankings/', label: '综合排行榜' },
      { href: '/compare/', label: '服务商对比' },
      { href: '/airports/', label: '机场导航' },
    ],
  },
  {
    title: '知识与工具',
    links: [
      { href: '/knowledge/', label: '知识库' },
      { href: '/glossary/', label: '术语表' },
      { href: '/tutorials/', label: '使用教程' },
      { href: '/tools/', label: '流量成本换算 / 自测表' },
      { href: '/faq/', label: '常见问题' },
    ],
  },
  {
    title: '数据与方法',
    links: [
      { href: '/data/', label: '数据中心' },
      { href: '/methodology/', label: '评测方法与数据说明' },
      { href: '/updates/', label: '更新日志' },
      { href: '/search/', label: '站内搜索' },
    ],
  },
  {
    title: '关于',
    links: [
      { href: '/about/', label: '关于机场TJ' },
      { href: '/contact/', label: '联系方式' },
      { href: '/privacy/', label: '隐私政策' },
      { href: '/terms/', label: '服务条款与免责声明' },
    ],
  },
] as const;

export const FRIEND_LINKS = [
  { href: 'https://rocketjichang.com', label: '火箭机场' },
  { href: 'https://jichangbao.com', label: '机场宝' },
  { href: 'https://ejichang.com', label: '机场E家' },
] as const;

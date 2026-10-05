// 更新日志：只记录真实发生过的内容和技术变更，按时间倒序。

export interface Update {
  date: string;
  title: string;
  body: string;
  kind: 'content' | 'data' | 'tech' | 'launch';
}

export const KIND_LABEL: Record<Update['kind'], string> = {
  content: '内容',
  data: '数据',
  tech: '技术',
  launch: '上线',
};

export const UPDATES: Update[] = [
  {
    date: '2026-10-05',
    title: '网站大改版：从 27 页扩展为综合站',
    body: '场景从 4 个扩展到 8 个；新增对比中心、数据中心、知识库（8 篇专题）、术语表、选购向导、站内工具、常见问题、更新日志与站内搜索；服务商页与排行榜重做。同时统一各服务商的价格口径与措辞，并把站长自测数据标明了测试环境与日期。',
    kind: 'content',
  },
  {
    date: '2026-10-05',
    title: '价格口径更新',
    body: '无忧链接按站长确认口径更新为 MINI 包月约 6.6 元/月起（舒心 100GB 包月低至 14 元/月，省心 200GB 33 元/月起）；微风网络补充站长确认的包月价约 27 元/月，并说明与第三方年付折算说法口径不同。',
    kind: 'data',
  },
  {
    date: '2026-10-05',
    title: '搜索引擎收录修复',
    body: 'sitemap 带上各页面真实更新日期，robots.txt 额外声明 sitemap-0.xml，并接入 IndexNow，便于 Bing 等搜索引擎更快发现新增与更新页面。',
    kind: 'tech',
  },
  {
    date: '2026-09-04',
    title: '站点首次上线',
    body: '上线首页、按场景选、综合推荐、机场导航、使用教程和评测方法页，提交 Google Search Console 与 Bing Webmaster Tools。',
    kind: 'launch',
  },
  {
    date: '2026-09-03',
    title: '首批资料收录',
    body: '收录 9 家服务商的官方入口说明与第三方资料，并录入站长对其中 7 家的丢包率持续跟踪记录，以及对无忧链接的流媒体解锁检测记录。',
    kind: 'data',
  },
];

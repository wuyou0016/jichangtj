# 2026-10 综合站改版说明

分支：`redesign-board`。从 27 页的小站扩展为约 56 页的综合站（场景 8 个、知识库 15 篇、术语表 43 词、对比 / 数据中心 / 向导 / 工具 / FAQ / 更新日志 / 站内搜索）。

## 第二轮深化（2026-10-05）

- **数据**：站长确认无忧链接支持通用订阅（`facts.ts` 的 `client.type = 'supported'`），旧的“入口暂时关闭”记录已清除；`facts.ts` 新增 `line`（线路说法）、`nodes`（节点地区）字段，并提供 `coverage()` 计算“资料完整度”（价格 / 线路 / 协议 / 节点 / 客户端 / 自测六项，只表示有没有资料，不是评分）。
- **UI**：`Coverage` 组件（卡片、详情页、对比表可排序）、`ScenarioMatrix`（场景 × 服务商矩阵，放在 `/scenarios/` 与 `/compare/`）、对比表可展开线路 / 节点 / 协议列、两两对比的分享链接（`?a=&b=`）、场景页“并排看”和“未列入原因（资料缺口）”、知识库阅读路线（`src/data/paths.ts`，进度存 localStorage）、文章阅读进度条、手机底部快捷导航。
- **术语自动链接**：`plugins/glossary-links.mjs` 是 Sätteri hast 插件（Astro 7 默认的 Markdown 处理器），构建时给 md 正文里每个术语的首次出现加 `/glossary/#id` 链接并带 `data-def`，页面脚本负责悬浮解释。术语的匹配词在插件里的 `EXTRA` 表中维护。
- **内容**：新增 7 篇知识库专题（通用订阅与官方客户端、按设备选客户端、协议速读、为什么体验不一样、隐私与日志、多设备与路由器、付款与退款）；术语表 +8；FAQ +8；新手路线 / 稳妥购买 / 看懂技术词三条阅读路线。

## 设计系统：航班信息板

- 主题：浅色默认，`prefers-color-scheme` 与手动切换（`data-theme`，存 `localStorage: tj-theme`）都支持。所有颜色是 `:root` 里的 token，组件不直接写色值。
- 组件语言：深色**信息板**（`.board`，场景 → 首选）、**登机牌**（`.pass`，服务商卡片，首推用 `.pass--gold`）、**登机口徽章**（`.gate`，场景编号 A1–A4 / B1–B4）、**范围条**（`.range`，丢包率区间）、资料标签 `Chip`。
- 字体：只用系统字体栈 + `ui-monospace`，不加载外部字体。
- 样式文件：`src/styles/global.css`（单文件，约 600 行）。

## 信息架构

| 区块 | 路径 | 数据来源 |
| --- | --- | --- |
| 按场景选 | `/scenarios/`、`/scenarios/<slug>/` | `src/data/scenarios/scenarios.json` |
| 综合排行榜 | `/rankings/` | `src/data/rankings/rankings.json` |
| 机场导航 | `/airports/`、`/airports/<slug>/` | `src/data/providers/providers.json` + `facts.ts` |
| 对比中心 | `/compare/` | 同上（表格排序 / 筛选 / 两两对比，纯前端） |
| 数据中心 | `/data/` | `facts.ts` 里的丢包区间与解锁检测 |
| 知识库 | `/knowledge/`、`/knowledge/<id>/` | `src/content/guides/*.md` |
| 术语表 / FAQ / 更新日志 | `/glossary/`、`/faq/`、`/updates/` | `src/data/glossary.ts`、`faq.ts`、`updates.ts` |
| 选购向导 / 工具 | `/finder/`、`/tools/` | 场景推荐 + `facts.ts`（纯前端，不上传数据） |
| 站内搜索 | `/search/`（noindex） | 构建时生成 `/search-index.json` |
| 教程 | `/tutorials/` | `src/content/tutorials/*.md`（沿用） |

## 数据规则（不要破坏）

1. `facts.ts` 只整理 `providers.json` 里**已有**的信息，不新增没有来源的事实；丢包率是站长自测（珠海联通、多批次区间），页面上必须带“站长自测”字样。
2. 不做每 GB 单价的品牌间比较；`facts.ts` 的 `monthly` 字段只用于选购向导的“价格优先”排序，页面上不展示为排名。
3. 无忧链接永远是综合排行榜第 1、各场景首选位；联盟披露只放页脚与服务条款，首页醒目位置不写“推广合作”。
4. 没有数据就写“暂无”，不用宣传语或别的站点的数字凑。

## 怎么加内容

- **新场景**：往 `scenarios.json` 追加对象（`gate`、`summary`、`whatMatters`、`picks`、`checklist`、`faq`、`relatedGuides`），并把 slug 加进 `src/data/helpers.ts` 的 `SCENARIO_ORDER` 与 `SCENARIO_SHORT`。
- **新文章**：在 `src/content/guides/` 新建 md（frontmatter 见 `src/content.config.ts` 的 `guideSchema`）；`topic` 决定归到知识库哪一组。
- **新服务商**：往 `providers.json` 追加，并在 `facts.ts` 里补一条；再把它加进 `rankings.json` 的 `entries`。
- **新术语 / FAQ / 更新记录**：分别改 `glossary.ts` / `faq.ts` / `updates.ts`。

## 工具脚本

- `npm run seo-audit`：构建后跑静态体检（死链、重复标题、canonical、noindex、单薄页、孤立页）。注意：`compare`、`finder` 报的“死链”是脚本里模板字符串的误报；`/search/` noindex 是有意为之。
- `npm run indexnow`：向 IndexNow 提交网址（需先部署，key 文件线上可访问）。
- `node scripts/icons.mjs`：用无头 Edge 从 `public/favicon.svg` 生成 ico / PNG 图标。
- `node scripts/og.mjs`：重新生成 `public/images/og/default.png`。

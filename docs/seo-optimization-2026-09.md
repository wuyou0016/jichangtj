# 2026-09 SEO 深度优化记录

目标：提升"机场 / 梯子 / VPN / Clash"类关键词的搜索排名（主战场是 Google 和 Bing；这类内容在百度基本不可能有排名）。

本轮只改站内（内容、结构、技术），站外（外链、社媒）和需要站长亲自采集的数据列在文末"待办"里。

---

## 一、这轮做了什么

### 1. 删除损害信任的公开表述

- `rankings.json` 第 1 名理由里的"站群里资料最完整"已删除（公开承认站群对 Google 是风险信号）。
- `providers.json` 里"本站自动化访问工具未能成功打开官方入口页面（请求被拒绝/加载失败）""遭遇技术问题"等暴露内部操作的描述全部改写为：先介绍服务商事实（套餐、线路、协议），再说明资料来源和"以官网为准"。
- 排行榜第 2 名（微风网络）旧理由写着"目前没有测速数据"，但数据里其实有本站实测（2.2%-2.8%），已改正；第 3 名（飞猫云）旧理由是空话（"详见服务商详情页"），已补上两个第三方来源一致的价格与协议信息。**排名顺序没有改动。**

### 2. 结构化数据字段 `quickFacts`（providers.json）

每个服务商新增 `quickFacts`：起步价、折合月价、月流量、价格资料来源、协议、线路定位、第三方客户端（Clash 等）支持情况、实测丢包率、流媒体实测摘要。

**规则：只能填资料里已经写明的内容**，资料没有的就留空，页面自动显示"待确认 / 暂无实测 / 以官网为准"。所有对比表、单位流量成本、详情页 FAQ 都从这里自动生成，改数据即可全站同步。

### 3. 标题 / H1 / 描述按搜索词重写

| 页面 | 主攻关键词 |
| --- | --- |
| `/` | 机场推荐、2026 机场推荐、梯子、Clash 机场 |
| `/rankings/` | 机场推荐排行榜、X 年 X 月机场推荐（标题里的年月取自 `rankings.json` 的 `updatedAt`） |
| `/airports/{slug}/` | X 机场怎么样、X 机场官网、X 机场多少钱、X 机场支持 Clash 吗 |
| `/scenarios/budget/` | 便宜机场推荐、学生党梯子 |
| `/scenarios/gaming/` | 游戏加速机场推荐、游戏梯子 |
| `/scenarios/remote-work/` | 稳定机场推荐 |
| `/scenarios/streaming/` | Netflix / Disney+ 解锁机场 |
| `/tests/`（新） | 机场测速、机场丢包率 |
| `/clash/`（新） | Clash 教程、Clash 客户端下载、Clash 机场 |
| `/tutorials/` | 机场使用教程、Clash / 小火箭 / v2rayN 教程 |

### 4. 新增页面（11 个）

- `/clash/`：Clash 专题入口（客户端推荐表、四步用法、模式说明、已收录机场的 Clash 支持情况、FAQ）。
- `/tests/`：机场实测数据页（丢包率排行、批次波动、流媒体实测、测试方法、局限性，带 Dataset 结构化数据）。
- 8 篇教程：
  - `clash-verge-rev-tutorial`：Clash Verge Rev 使用教程
  - `clash-meta-for-android-tutorial`：Clash Meta for Android 使用教程
  - `shadowrocket-tutorial`：小火箭 Shadowrocket 使用教程
  - `v2rayn-tutorial`：v2rayN 使用教程
  - `clash-for-windows-alternatives`：Clash for Windows 停更后用什么
  - `clash-proxy-modes-tun`：Clash 规则 / 全局 / 直连、系统代理 / TUN 模式
  - `tizi-vpn-airport-comparison`：梯子是什么？机场、VPN、自建怎么选
  - `airport-runaway-risk`：机场跑路怎么办
- `404` 页面（noindex）。

### 5. 现有页面增强

- 首页：对比表（价格 / 流量 / 单位流量成本 / 实测丢包率 / 第三方客户端 / 资料来源）、Clash 教程入口、FAQ。
- 排行榜：对比表、逐条理由改为 h3、按场景入口、FAQ（数字全部从数据计算）、ItemList 结构化数据。
- 服务商详情页：速览卡片、"为什么排第 N 位"、FAQ（怎么样 / 多少钱 / 支持 Clash 吗 / 稳定吗 / 官网）、其他机场互链。
- 场景页：预算场景加单位流量成本对比表，游戏 / 办公场景加实测丢包率排行，四个场景各加 3 条 FAQ。
- 4 篇旧教程：标题改为搜索说法、补充指向新教程的内链、加 FAQ；常见问题排查新增"退出客户端后断网""游戏 / 命令行不走代理"两节。
- 导航：新增"机场推荐 / 实测数据 / Clash 教程"；页脚新增"梯子教程"一栏。

### 6. 技术 SEO

- sitemap 输出 `lastmod`（从各数据文件的 `updatedAt` 读取，静态页面日期在 `src/data/pages.json`）。
- `public/_headers`：`jichangtj-cwu.pages.dev` 返回 `X-Robots-Tag: noindex`，避免与主域名重复收录。
- 推广链接改为 `rel="sponsored nofollow noopener"`。
- 结构化数据：FAQPage、ItemList、Dataset、Article（含发布 / 更新时间）、CollectionPage；文章页输出 `article:published_time / modified_time`。
- 404 页 `noindex` 且不输出 canonical。

---

## 二、维护规则（以后改内容时遵守）

1. **排行榜每月至少复核一次**：改了排序或理由就更新 `rankings.json` 的 `updatedAt`，标题里的"X 年 X 月"会自动跟着变。没实质变化不要只改日期。
2. **`quickFacts` 只填有来源的事实**，没有资料就留空，不要猜。
3. **改了页面内容就更新对应的 `updatedAt`**（教程在 frontmatter，服务商 / 场景在 JSON，静态页在 `src/data/pages.json`），sitemap 的 `lastmod` 依赖它。
4. 新教程放在 `src/content/tutorials/`，frontmatter 可以加 `faq`，会自动输出可见问答和 FAQPage 结构化数据。

---

## 三、待办（需要站长处理，代码做不了）

### 上线后立刻做

- [ ] 把本分支合并到 `master` 并部署。
- [ ] GSC 和 Bing 重新提交 `sitemap-index.xml`。
- [ ] 对这些 URL 请求编入索引：`/rankings/`、`/clash/`、`/tests/`、`/tutorials/clash-verge-rev-tutorial/`、`/tutorials/shadowrocket-tutorial/`、`/tutorials/tizi-vpn-airport-comparison/`。
- [ ] 部署后用 `curl -I https://jichangtj-cwu.pages.dev/` 确认返回 `X-Robots-Tag: noindex`，同时确认 `https://jichangtj.net/` **没有**这个头。

### 数据（对排名帮助最大）

- [ ] **确认 6 家"待确认"服务商是否支持 Clash 订阅**（微风网络、飞猫云、闪跃、快狸、跨界云、灵猫网络），确认后改 `quickFacts.thirdPartyClient`。"Clash 机场"类搜索最看这一栏。
- [ ] **上传 MiaoKo 测试截图**（放 `public/images/tests/`），在 `/tests/` 和详情页展示。亲测截图是评测类页面最强的可信度信号。
- [ ] 给飞猫云、边缘节点补丢包率测试。
- [ ] 逐步把收录数量扩到 20 家以上（每家都要有真实资料）。

### 内容排期（建议每周 1-2 篇）

- FlClash、v2rayNG、sing-box、Stash 使用教程
- iPhone / 安卓 / Mac / Windows 翻墙教程（按平台的入口页）
- ChatGPT / Claude 等 AI 工具能用的机场（需要先做 AI 访问实测）
- IPLC / IEPL 专线机场推荐、不限时 / 按量付费机场推荐
- 免费机场 / 免费节点靠谱吗
- 机场订阅转换是什么

### 站外

- [ ] 建一个 GitHub 仓库（README 写机场推荐摘要并链接到 `/rankings/`）——这类关键词的搜索结果里大量是 GitHub 页面。
- [ ] Telegram 频道 / X 账号定期发排行榜更新并链接回站。
- [ ] 品牌名：搜索"jichangtj"时会出现一个 Telegram / X 账号 @jichangtj 和域名 jichangtj.com，如果不是自己的，品牌词流量会被分走，需要考虑怎么区分。
- [ ] 页脚全站友情链接（火箭机场 / 机场宝 / 机场E家）属于全站互链，建议改成在相关内容里自然链接，或者只保留在首页。

### 观察

- 上线后 2-4 周看 GSC 效果报告：哪些查询词开始有曝光、哪些页面被收录，据此决定下一批写什么。

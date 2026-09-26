# 上线观察记录

本文件记录每次正式上线、搜索引擎提交及后续观察的关键数据，供"观察—复核—小步优化"阶段参考。不记录无法验证的数据（曝光、点击等）——那些数据请直接去 GSC / Bing Webmaster Tools 后台查看，这里只记录提交动作和当时能验证的状态。

---

## 2026-09-04 首次正式上线

**上线 commit**：`630b6685269673502d12d912bbbb8997acefce9b`（`master` 分支，已 push 到 `wuyou0016/jichangtj`）

**部署**：Cloudflare Pages 自动部署，`jichangtj-cwu.pages.dev` 与自定义域 `jichangtj.net` 均已确认上线（首页、/tutorials/、/methodology/、/airports/feimao-cloud/ 四个 URL 逐一 curl 验证：HTTP 200，canonical / og:url 均为 `https://jichangtj.net/...`，无 localhost/pages.dev 泄漏）。

**DNS 变更说明**：本次给 Google Search Console 加资源时，Google 与 Cloudflare 之间的"域名提供商一键验证"自动加了一条 DNS TXT 记录（`google-site-verification=AI_uwg-jMPdLZYycocuzcK9wf2oZc6h1aqMhQ_F2dis`），不是手动确认加上的，事后用 `nslookup` 核实生效，已同步告知站长。这条记录只用于所有权验证，不影响站点其他功能，请保留不要删除。

### Google Search Console

- 资源类型：网址前缀 `https://jichangtj.net/`，验证方式"域名提供商"（自动完成）
- sitemap 提交：`https://jichangtj.net/sitemap-index.xml`，提交成功，但当天读取状态显示"无法读取此站点地图"、已发现网页数 0 —— 这是刚提交时的正常过渡状态（Bing/Google 对全新域名的首次抓取通常有延迟），**需要下次复核时确认是否已变为正常读取**，如果持续报错才是真正问题
- URL 检查：
  - 首页 `https://jichangtj.net/`：已收录到 Google，网页已编入索引（无需额外请求）
  - `/tutorials/`：未收录，已提交"请求编入索引"
  - `/methodology/`：未收录，已提交"请求编入索引"
- 未发现抓取或索引报错

### Bing Webmaster Tools

- 站点添加方式：从 Google Search Console 导入（只读 OAuth 授权，已跟站长确认后操作），只导入了 jichangtj.net 这一个已验证站点
- sitemap 提交：`https://jichangtj.net/sitemap-index.xml`，提交成功，状态"正在处理"，已知网站地图 1、错误 0、警告 0
- URL 检查（实时 URL 测试 + 请求编制索引）：
  - 首页：实时测试通过（可编制索引，未发现 SEO/GEO 问题），已提交索引请求
  - `/tutorials/`：已提交索引请求
  - `/methodology/`：已提交索引请求
- 站点管理器（抓取错误报告）：无可用数据（全新站点，尚无抓取历史，非报错）
- IndexNow：站点目前没有配置 IndexNow key，本次未提交，也未临时生成 key（按站长要求，不引入未经确认的配置）

### 下一步观察计划

- 2–4 周内不做大改动，只做观察
- 下次复核时重点看：Google sitemap 读取状态是否转为正常、两个引擎的已发现 URL 数是否增长、GSC 效果报告里开始出现曝光/点击后再看具体查询词
- 如发现抓取错误或索引异常，记录在本文件新增日期条目下，不直接改内容，先汇报

---

## 2026-09-26 站点深度改版：术语库/FAQ/避坑指南 + Bing 技术SEO基础设施

**背景**：距首次上线（2026-09-04）22 天，早期"2–4 周内不做大改动，只做观察"的计划被站长主动叫停——站长明确要求把站点做成综合性的机场/梯子/VPN 推荐站，核心优先做 Bing 关键词排名，其次 Google，因此这次是主动的大改版，不是对之前观察期异常的响应。

**改了什么**（详见对应 commit）：

- **内容架构**：新增 `glossary`（术语库）内容集合，11 篇词条（Shadowsocks/VMess/VLESS/Trojan/Hysteria2/Reality/IPLC/IEPL/流量倍率/中转与落地 + "机场、梯子、VPN 是什么关系"旗舰长尾页）；新增 `/faq/` 聚合页（14 条高频问答，FAQPage 结构化数据）；`tutorials` 新增 `safety` 分组（避坑信号清单）+ 2 篇客户端实操教程（Clash Verge / Shadowrocket）。全站可索引 URL 从约 20 个增加到 43 个。
- **Bing 专属技术SEO**：接入 IndexNow（key 文件 `public/a458a17a167fb6d5d912b457cbcdf676.txt` + `scripts/submit-indexnow.mjs` 提交脚本），之前的观察记录里明确写过"未配置 IndexNow"，这次补上了。
- **结构化数据**：新增 DefinedTerm（术语）、FAQPage、Article（术语库详情页）；Organization 补充 sameAs；全站面包屑统一到 `Breadcrumbs` 组件，避免手写遗漏。
- **UI**：首页新增"最新更新"区块（内容新鲜度信号）、核心入口扩展、hero 文案融入关键词变体；长文章页新增目录（TOC）；`/airports/` 新增对比一览表。
- **关键词/Meta**：站点 title/description/tagline 自然融入"机场/梯子/VPN"三个关键词变体，不是堆砌。
- **RSS**：新增 `/rss.xml`（覆盖术语库 + 教程）。

**部署后必须做的事（这次会话里没有做，因为没有域名访问权限）**：

1. 部署上线后，确认 `https://jichangtj.net/a458a17a167fb6d5d912b457cbcdf676.txt` 能正常访问，再运行 `npm run submit:indexnow` 把全部 43 个 URL 一次性提交给 Bing IndexNow。
2. 去 Bing Webmaster Tools 和 Google Search Console 重新提交 sitemap（URL 数量变化大，值得手动触发一次重新抓取），新增的 `/glossary/`、`/faq/` 等入口页可以用"URL 检查"工具单独提交索引请求。
3. 这次改版内容量大，建议进入新一轮 2–4 周观察期，下次复核重点看：新增的 43 个 URL 里 Bing/Google 各自收录了多少、`/glossary/airport-ladder-vpn-difference/` 这类长尾页有没有开始有曝光。

<!-- 后续每次上线或复核，在下面新增一个 `## 日期 标题` 条目，保留历史记录，不要覆盖旧内容。 -->

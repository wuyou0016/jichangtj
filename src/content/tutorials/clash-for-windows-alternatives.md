---
title: Clash for Windows 停更后用什么？Clash 客户端替代推荐
description: Clash for Windows、ClashX 和原版 Clash 内核已经停止维护。旧版还能不能用、各平台现在该换哪个客户端，以及从 Clash for Windows 迁移到 Clash Verge Rev 的步骤。
group: clients
publishedAt: 2026-09-26
updatedAt: 2026-09-26
faq:
  - q: Clash for Windows 现在还能下载吗？
    a: 作者已经删除了项目仓库，官方渠道不再提供下载。网上还能搜到很多"Clash for Windows 下载"页面，但安装包来源无法确认，也不会再有更新，不建议继续使用，换成仍在维护的 Clash Verge Rev 更稳妥。
  - q: Clash Verge 和 Clash Verge Rev 有什么区别？
    a: 原版 Clash Verge 已停止维护，Clash Verge Rev 是社区在它基础上继续维护的版本，改用 Mihomo 内核，持续修复问题、支持新协议。现在下载应该选 Clash Verge Rev。
  - q: Mac 上用 ClashX 还是 Clash Verge Rev？
    a: 原版 ClashX 同样已停止维护。Mac 上可以选 Clash Verge Rev（功能全面，界面和 Windows 版一致），或者 ClashX Meta（菜单栏操作，界面接近原版 ClashX）。
---

如果你还在搜"Clash for Windows 下载"，先说结论：**Clash for Windows 已经停止维护，建议换成 Clash Verge Rev。** 下面讲清楚发生了什么、旧版为什么不建议继续用，以及各平台现在该用哪个客户端。

## Clash for Windows 怎么了

2023 年 11 月，Clash for Windows 的作者删除了项目仓库，停止维护。几乎同一时间，原版 Clash 内核、macOS 上的 ClashX、安卓上的 Clash for Android 等项目也先后停止更新或删库。

之后还在持续更新的"Clash 类"客户端，基本都换成了 **Mihomo 内核**（原名 Clash Meta）。它兼容原来的 Clash 配置和订阅格式，机场给的 Clash 订阅可以直接导入，还额外支持 VLESS（含 Reality）、Hysteria2、TUIC 等较新的协议。

## 旧版 Clash for Windows 还能用吗

装在电脑上的旧版还能打开，但有几个实际问题：

- **不支持新协议**：越来越多机场开始提供 VLESS、Hysteria2 等节点，原版内核不认识，这些节点在旧版里导入失败或无法连接。
- **不会再有安全修复**：停更软件发现的问题不会再被修复。
- **安装包来源难以确认**：官方仓库已经删除，现在网上流传的安装包都来自第三方转存，无法确认有没有被改过。

所以不建议继续使用，更不建议从来路不明的网站重新下载。

## 各平台替代客户端推荐

| 客户端 | 平台 | 内核 | 特点 |
| --- | --- | --- | --- |
| Clash Verge Rev | Windows / macOS / Linux | Mihomo | 用法和 Clash for Windows 接近，社区活跃，**首选** |
| FlClash | Windows / macOS / Linux / Android | Mihomo | 界面简洁，多平台界面一致 |
| ClashX Meta | macOS | Mihomo | 原 ClashX 的 Mihomo 内核版本，菜单栏操作 |
| Clash Meta for Android | Android | Mihomo | 原 Clash for Android 的延续，安卓首选 |
| v2rayN | Windows（新版也支持 Linux / macOS） | Xray / sing-box | 不是 Clash 系，但同样能导入机场的通用订阅 |

iPhone 上没有 Clash for Windows 这类问题，常用的是小火箭（Shadowrocket）和 Stash，见[小火箭使用教程](/tutorials/shadowrocket-tutorial/)。

以上客户端都请从项目的 GitHub Releases 页面下载。

## 从 Clash for Windows 迁移到 Clash Verge Rev

1. **退出 Clash for Windows**，并确认系统代理已经关闭（否则可能出现"退出后上不了网"）。
2. **安装 Clash Verge Rev**，下载和安装步骤见[Clash Verge Rev 使用教程](/tutorials/clash-verge-rev-tutorial/)。
3. **重新导入订阅**：到机场用户中心重新复制 Clash 订阅链接，在 Clash Verge Rev 的「订阅」页面导入，并点击卡片让它生效。
4. **迁移自定义规则（如果有）**：如果你在 Clash for Windows 里用 Parsers 写过自定义规则，需要在 Clash Verge Rev 的扩展配置 / 覆写功能里重新配置；没写过的直接跳过这一步。
5. **确认正常后卸载 Clash for Windows**，避免两个客户端同时抢系统代理设置。

整个过程大约 5 分钟，订阅和节点都在机场那边，换客户端不会影响你的套餐。

## 下一步

- 想了解规则模式、全局模式、TUN 模式分别怎么用：看[Clash 规则模式、全局模式与 TUN 模式详解](/tutorials/clash-proxy-modes-tun/)。
- 想看各平台客户端的完整对照：看[Clash 教程与客户端推荐](/clash/)。
- 还没买机场，或者想换一家：看[机场推荐排行榜](/rankings/)。

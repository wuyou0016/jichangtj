---
title: iOS 怎么用 Shadowrocket？下载、导入订阅、分应用代理设置教程
description: Shadowrocket 是 iOS 上最常用的付费客户端之一，这篇讲清楚怎么获取、怎么导入订阅链接，以及分应用代理规则怎么设置。
group: clients
publishedAt: 2026-09-26
updatedAt: 2026-09-26
relatedScenarios:
  - streaming
  - gaming
---

## Shadowrocket 是什么

Shadowrocket（小火箭）是 iOS 上历史最久、最常用的机场客户端之一，支持 Shadowsocks、VMess、Trojan 等主流协议，界面简单、稳定性好，是很多新手在 iOS 上的首选。如果还不清楚"订阅链接"是什么，建议先看[客户端与订阅导入总览教程](/tutorials/client-setup-and-subscription-import/)。

## 第一步：获取 Shadowrocket

Shadowrocket 是 App Store 上架的付费应用，但因为涉及代理功能，**中国区 App Store 通常搜不到或无法下载**，需要切换到其他地区（比如美国、日本等）的 Apple ID 账号才能搜索并购买下载。具体切换地区账号的方法涉及 Apple 官方账号设置，建议参考 Apple 官方支持文档操作，本站不额外展开这部分和机场服务本身无关的账号操作细节。

## 第二步：导入订阅链接

1. 复制服务商提供的订阅链接（整段复制，注意不要漏掉末尾字符）。
2. 打开 Shadowrocket，App 通常会自动检测剪贴板里的链接，弹出"是否添加此订阅"的提示，点击确认即可。
3. 如果没有自动弹出提示，可以手动操作：点击右上角"+"，选择"类型"为 Subscribe（订阅），把链接粘贴到 URL 栏，保存。
4. 保存后点击这个订阅条目，选择"更新"，节点列表会自动拉取并显示。

## 第三步：选择节点与全局路由模式

Shadowrocket 主界面顶部可以选择当前使用的节点，也可以设置为"自动选择"（App 会根据延迟测试自动选最优节点）。全局路由模式在设置里可以调整，常见几种：

- **规则模式**：根据内置或自定义规则判断哪些请求走代理，日常使用推荐这个模式。
- **全局模式**：所有流量强制走代理。
- **直连模式**：临时关闭代理效果，方便测试。

## 分应用代理规则怎么设置

Shadowrocket 支持按 App 单独设置代理规则（比如让某个 App 始终直连、某个 App 始终走代理），入口通常在设置里的"应用列表"或规则配置相关菜单。这个功能适合需要精细控制某些特定 App 网络行为的场景，比如让国内 App 始终直连避免不必要的代理消耗，同时让需要访问境外服务的 App 始终走代理。

## 常见问题

- **App Store 搜不到 Shadowrocket**：确认当前 Apple ID 地区，中国区账号搜不到属于正常现象，需要切换到其他地区账号。
- **订阅导入后没有节点**：检查链接是否完整复制，确认订阅未过期，必要时联系服务商客服核实链接状态。
- **连接上但部分网站打不开**：可能是规则模式把该网站分类成了直连，可以临时切换到全局模式测试排查。
- **更多连接问题**，可以看[常见连接问题排查](/tutorials/common-connection-problems/)。

## 相关内容

- [客户端与订阅导入总览（Windows/macOS/iOS/Android）](/tutorials/client-setup-and-subscription-import/)
- [常见连接问题排查](/tutorials/common-connection-problems/)
- [流媒体解锁场景怎么选](/scenarios/streaming/)

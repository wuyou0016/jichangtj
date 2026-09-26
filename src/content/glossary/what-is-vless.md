---
term: VLESS
title: VLESS 协议是什么？为什么经常和 Reality 搭配使用
description: VLESS 是 Xray 团队设计的轻量化协议，去掉了 VMess 自带的加密开销，性能更好，是目前机场行业里较新、较受欢迎的协议之一。
category: protocol
aliases: []
publishedAt: 2026-09-26
updatedAt: 2026-09-26
relatedGlossary:
  - what-is-vmess
  - what-is-reality
  - what-is-trojan
---

## 简单说

VLESS 是 Xray 团队在 VMess 之后设计的新协议，核心思路是"做减法"：去掉 VMess 自带的加密层，把加密职责完全交给外层传输协议（通常是 TLS）来承担。这样做的好处是协议本身更轻量、CPU 开销更低，配合 Xray 特有的 XTLS 传输优化，在高带宽场景下性能明显好于 VMess。

## 为什么叫"无状态"

VLESS 被称为轻量/无状态协议，是因为它自身不做加密、不维护复杂的会话状态，单纯负责把数据包"贴上标签"转发出去，真正的安全性完全依赖外层 TLS 握手。这也意味着 VLESS 必须配合 TLS（或者伪装 TLS 特征的技术）使用，不能像 Shadowsocks 那样裸奔。

## 和 Reality 的关系

VLESS 经常和 [Reality](/glossary/what-is-reality/) 搭配，组成"VLESS + Reality"配置——Reality 负责伪装出一个几乎和真实网站一模一样的 TLS 握手特征（不需要自己买域名证书），VLESS 负责轻量高效地转发数据。这个组合目前是机场行业里对抗深度包检测（DPI）识别能力较强的方案之一，因此在近两年新建节点里出现频率较高。

## 优点

- **性能开销低**：省去了协议自身的加密步骤，转发效率更高。
- **抗封锁能力强**：配合 Reality 或标准 TLS，流量特征可以做到和正常 HTTPS 网站高度相似。
- **生态活跃**：是 Xray-core 主推的协议方向，更新和优化比较积极。

## 局限性

VLESS 本身不加密，必须依赖外层 TLS，配置相对复杂一点，对机场服务商的技术水平和客户端支持有一定要求；部分较老的客户端可能不支持 VLESS，需要确认客户端版本。

## 相关术语

- [VMess 是什么](/glossary/what-is-vmess/)——VLESS 的"前辈"，自带加密但开销更高。
- [Reality 是什么](/glossary/what-is-reality/)——常与 VLESS 搭配的新一代伪装技术。
- [Trojan 是什么](/glossary/what-is-trojan/)——另一种以"伪装成正常 HTTPS 流量"为核心思路的协议。

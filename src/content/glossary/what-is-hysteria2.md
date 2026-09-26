---
term: Hysteria2
title: Hysteria2 是什么？为什么弱网环境下经常被推荐
description: Hysteria2 是基于 QUIC（UDP）实现的新一代代理协议，在丢包较多的网络环境下传输效率明显优于传统 TCP 协议，是近两年机场圈子里迅速流行的选择。
category: protocol
aliases:
  - Hysteria
  - hy2
publishedAt: 2026-09-26
updatedAt: 2026-09-26
relatedGlossary:
  - what-is-shadowsocks
  - what-is-reality
---

## 简单说

Hysteria2 是近两年在机场行业里迅速流行的代理协议，核心特点是基于 QUIC（构建在 UDP 之上的传输协议，也是 HTTP/3 的底层技术）而不是传统的 TCP。QUIC 自带更先进的拥塞控制和丢包恢复机制，在网络环境不稳定、丢包率较高的场景下，Hysteria2 的实际传输效率通常明显好于基于 TCP 的协议（比如 Shadowsocks、VMess）。

## 为什么"弱网"下更快

TCP 协议有一个特点：一旦发生丢包，会触发重传机制并降低发送速率，在丢包率较高的网络里，这种"一丢包就减速"的策略会让实际速度大打折扣。QUIC/Hysteria2 针对这个问题做了专门优化，丢包恢复更激进、拥塞控制算法更适应不稳定网络，实际体验是：在网络质量一般的环境下，Hysteria2 往往比同等条件的 TCP 协议节点感觉更流畅、卡顿更少。

## 优点

- **弱网表现好**：高丢包环境下传输效率优势明显，这也是它被广泛推荐用于看视频、玩游戏这类对流畅度敏感场景的原因。
- **基于 UDP，速度上限高**：没有 TCP 的队头阻塞问题，理论峰值速度表现较好。

## 局限性

- **依赖 UDP**：部分运营商或网络环境对 UDP 流量做限速或 QoS 降级处理，这种情况下 Hysteria2 的优势会被削弱，甚至可能不如稳定的 TCP 协议节点。
- **相对新**，生态成熟度不如 Shadowsocks 这类"老牌"协议，个别老旧客户端可能不支持，使用前需要确认客户端版本。

## 什么情况下会遇到 Hysteria2

如果你所在的网络环境经常丢包（比如高峰期、跨运营商访问国际线路时波动明显），机场节点列表里带"Hysteria2"或"hy2"字样的节点值得优先尝试。但具体体验也取决于你自己的网络对 UDP 的支持情况，建议实际测试对比后再决定长期使用哪种协议节点。

## 相关术语

- [Shadowsocks 是什么](/glossary/what-is-shadowsocks/)——基于 TCP 的经典协议，兼容性更广。
- [Reality 是什么](/glossary/what-is-reality/)——另一条技术路线，侧重抗封锁而不是弱网传输效率。

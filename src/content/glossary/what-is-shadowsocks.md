---
term: Shadowsocks
title: Shadowsocks（SS）是什么协议？和 VMess、Trojan 有什么区别
description: Shadowsocks 是机场行业里最基础、最通用的代理协议，几乎所有客户端都支持。这篇说清楚它是什么、怎么加密、和更新的协议比优缺点在哪。
category: protocol
aliases:
  - SS
  - SS协议
publishedAt: 2026-09-26
updatedAt: 2026-09-26
relatedGlossary:
  - what-is-vmess
  - what-is-trojan
  - airport-ladder-vpn-difference
---

## 简单说

Shadowsocks（常简称 SS）是机场行业里历史最久、支持最广泛的代理协议，最早由开发者 clowwindy 在 2012 年发布并开源。它的设计目标很纯粹：把你的流量加密后转发到远程服务器，再由服务器帮你访问目标网站。几乎所有平台（Windows、macOS、iOS、Android、路由器固件）都有支持 Shadowsocks 的客户端，是兼容性最好的协议之一。

## 怎么工作的

Shadowsocks 本质上是在 SOCKS5 代理协议的基础上加了一层加密。客户端和服务器之间约定好密码和加密方式（比如 `chacha20-ietf-poly1305`、`aes-256-gcm` 这类 AEAD 加密算法），流量在传输过程中是加密的，中间节点理论上看不到具体访问的内容。

## 优点

- **生态成熟**：几乎所有客户端、路由器固件都原生支持，不需要额外插件就能用。
- **轻量、低开销**：协议本身简单，对设备性能要求低，老旧路由器也能跑。
- **开源透明**：协议实现是公开的，不依赖单一厂商。

## 局限性

早期版本的 Shadowsocks 流量特征相对容易被识别（不做特殊伪装），在网络审查较严格的环境下，纯 SS 流量可能被针对性限速或干扰。现代实现通常会搭配混淆插件（如 `v2ray-plugin`、`simple-obfs`）伪装成正常的 HTTPS 流量来缓解这个问题，但相比专门为"抗封锁"设计的协议（比如 [Trojan](/glossary/what-is-trojan/)），伪装能力天然弱一些。

## 什么情况下会遇到 Shadowsocks

大多数机场的入门套餐、以及需要兼容老设备/老客户端的场景，通常都会提供 Shadowsocks 节点作为基础选项。如果你的客户端软件比较旧、或者用的是路由器固件跑代理，SS 通常是兼容性最有保障的选择。

## 相关术语

- [VMess 是什么](/glossary/what-is-vmess/)——V2Ray 生态设计的协议，比 SS 多了时间戳校验和更灵活的传输方式。
- [Trojan 是什么](/glossary/what-is-trojan/)——专门伪装成 HTTPS 流量的协议，抗封锁能力更强。
- [机场、梯子、VPN 是什么关系](/glossary/airport-ladder-vpn-difference/)——协议只是机场服务的一部分，先搞清楚整体概念再看细节。

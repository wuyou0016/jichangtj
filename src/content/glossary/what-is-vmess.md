---
term: VMess
title: VMess 协议是什么？V2Ray/Xray 生态的核心协议讲解
description: VMess 是 V2Ray（现 Xray 生态）团队设计的私有代理协议，比 Shadowsocks 多了用户认证、时间戳校验和多种传输方式。这篇讲清楚它的原理和适用场景。
category: protocol
aliases:
  - V2Ray协议
publishedAt: 2026-09-26
updatedAt: 2026-09-26
relatedGlossary:
  - what-is-shadowsocks
  - what-is-vless
  - what-is-reality
---

## 简单说

VMess 是 V2Ray 项目（现在核心开发已经转移到 Xray-core）设计的私有代理协议，专门为 V2Ray/Xray 系客户端服务。相比 [Shadowsocks](/glossary/what-is-shadowsocks/) 只做加密转发，VMess 在协议层面加了更多机制：每个用户有独立的 UUID 身份标识、请求带时间戳防止重放攻击、支持多种传输层（TCP、mKCP、WebSocket、HTTP/2、QUIC 等），可以按需要伪装成不同类型的正常流量。

## 和 Shadowsocks 的核心区别

- **身份认证方式不同**：SS 靠共享密码，VMess 靠每用户独立的 UUID，理论上更容易做精细化的用户管理（比如按用户限速、统计流量）。
- **传输方式更灵活**：VMess 可以跑在 WebSocket、HTTP/2 等应用层协议之上，配合 CDN 使用能进一步隐藏真实服务器 IP，这是纯 SS 做不到的。
- **防重放机制**：VMess 请求带时间戳校验，理论上能防御某些类型的重放攻击，安全设计比早期 SS 更完善。

## 局限性

VMess 协议本身自带加密，加上外层如果再套一层 TLS，会有一定的双重加密开销，在低性能设备或追求极致速度的场景下，效率不如后来设计得更轻量的 [VLESS](/glossary/what-is-vless/)（VLESS 把加密职责完全交给外层传输层，自身更"轻"）。

## 什么情况下会遇到 VMess

在机场行业里，VMess 曾经是 Shadowsocks 之后最主流的"进阶协议"，尤其是需要走 CDN 中转、WebSocket 伪装的场景。近两年随着 VLESS + [Reality](/glossary/what-is-reality/) 组合流行，VMess 的新增使用有所减少，但依然是很多机场服务商保留支持的协议之一，兼容性仍然广泛。

## 相关术语

- [Shadowsocks 是什么](/glossary/what-is-shadowsocks/)——更早、更轻量的基础协议。
- [VLESS 是什么](/glossary/what-is-vless/)——VMess 的"轻量化后继者"。
- [Reality 是什么](/glossary/what-is-reality/)——常和 VLESS 搭配使用的新一代伪装技术。

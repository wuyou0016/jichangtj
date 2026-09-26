---
term: Trojan
title: Trojan 协议是什么？为什么说它"伪装成普通网站"
description: Trojan 协议的核心思路是让代理流量看起来和访问一个真实 HTTPS 网站完全一样，抗封锁能力强，但需要真实域名和证书支持。
category: protocol
aliases:
  - Trojan-GO
publishedAt: 2026-09-26
updatedAt: 2026-09-26
relatedGlossary:
  - what-is-shadowsocks
  - what-is-vless
  - what-is-reality
---

## 简单说

Trojan 是一种以"伪装"为核心设计目标的代理协议：它让代理流量在网络层面看起来和你访问一个普通 HTTPS 网站（比如打开一个正常网页）几乎完全一样。因为大部分审查系统很难无差别地封锁所有 HTTPS 流量（会误伤大量正常网站），Trojan 这种"躲在正常流量里"的思路，抗封锁能力天然比不做伪装的协议更强。

## 怎么做到"伪装"

Trojan 要求服务端配置一个真实的域名和有效的 TLS 证书，客户端连接时走标准的 TLS 握手流程，从外部抓包看，和访问任何一个用 HTTPS 的正常网站没有区别；只有握手完成后，服务端才会根据客户端发来的密码判断"这是代理请求还是正常网页请求"，如果密码不对，服务端会把连接当成正常网站请求处理（返回一个伪装页面），进一步降低被针对性识别的概率。

## 优点

- **抗封锁能力强**：流量特征和真实 HTTPS 网站高度一致，是目前公认抗审查能力较强的协议路线之一。
- **原理简单可信**：不像某些协议依赖复杂的混淆技巧，Trojan 的伪装逻辑清晰，容易理解和审计。

## 局限性

- **需要真实域名和证书**：机场服务商需要为节点配置真实可解析的域名，并维护 TLS 证书，比起 [Shadowsocks](/glossary/what-is-shadowsocks/) 这种"随便一个 IP 就能用"的协议，部署门槛更高。
- **域名可能被针对性封锁**：如果域名本身被识别并加入封锁名单，Trojan 的伪装优势会被削弱，这也是为什么后来出现了不需要自建域名的 [Reality](/glossary/what-is-reality/) 技术。

## 什么情况下会遇到 Trojan

在需要较强抗封锁能力的场景（比如网络审查较严格的地区），机场服务商往往会提供 Trojan 节点作为主力线路之一。如果你发现某个节点名字里带"Trojan"，通常意味着服务商在这条线路上投入了域名和证书成本，一般会作为相对"精品"的线路来宣传。

## 相关术语

- [VLESS 是什么](/glossary/what-is-vless/)——另一种轻量协议，常与 Reality 搭配实现类似的伪装效果。
- [Reality 是什么](/glossary/what-is-reality/)——不需要自建域名证书的新一代伪装方案。
- [Shadowsocks 是什么](/glossary/what-is-shadowsocks/)——更基础、部署门槛更低的协议。

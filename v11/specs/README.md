# 介绍

- [背景](#背景)
- [动机](#动机)
- [预期](#预期)
- [内容目录](#内容目录)

OneBot 标准是从原 CKYU 平台的 CQHTTP 插件接口修改而来的通用聊天机器人应用接口标准。

## 背景

CQHTTP 插件是 2017 年初出现的基于 CKYU 机器人平台的一款开源免费插件，它使用户能够通过 HTTP 或 WebSocket 对 CKYU 的事件进行上报以及接收请求来调用 CKYU 的 DLL 接口，从而可以使用其它语言（不方便编译到原生二进制的语言）编写 CKYU 插件。

有非常多的开发者使用 Python、Java、Node.js 等 web 开发常用语言基于 CQHTTP 插件编写各式各样的聊天机器人。

在新的机器人平台 Mirai 开始发展之后，以及 CKYU 决定停运之后，为了让原来基于 CQHTTP 插件编写的机器人能够继续运行，一些开发者在其它机器人平台上编写了兼容 CQHTTP 接口的插件/模块。

## 动机

基于 CQHTTP 插件编写的机器人项目有很多，CKYU 停运后，如果不能平滑迁移到其它平台，这些项目的很多代码都需要重写，甚至有很多项目可能被迫放弃维护，这对机器人开发社区来说是一种损失和浪费。

目前各 CQHTTP 兼容项目通常是实现了部分原 CQHTTP 插件的接口，并利用新平台的特性，新增了一些拓展接口。长远来看，这可能导致不同兼容项目最终形成了各自的「CQHTTP 接口变种」，当用户深度接入其中一个兼容项目后，可能又会出现与其它变种不兼容的情况，最终仍然存在潜在的迁移困难。

本项目希望通过改写原 CQHTTP 插件文档 + 引入 CQHTTP 兼容项目的新特性的方式，维护一个统一的、不断发展的接口标准（即 OneBot 标准），推动各 CQHTTP 兼容项目实现长远的兼容，为用户带来便利。

## 预期

开发者可以在各类机器人平台实现 OneBot 标准，从而使用户可以将基于 OneBot 标准的机器人项目无缝迁移到这些平台。

当需要添加新的功能（例如新的事件、API、消息段类型等）时，可以通过 pull request 扩充本标准，此后其它 OneBot 实现在添加同一功能时应参考扩充后的标准。

## 内容目录

- **通信**
  - [通信概述](communication/README.md)
  - [HTTP](communication/http.md)
  - [HTTP POST](communication/http-post.md)
  - [正向 WebSocket](communication/ws.md)
  - [反向 WebSocket](communication/ws-reverse.md)
  - [鉴权](communication/authorization.md)
- **消息**
  - [消息概述](message/README.md)
  - [字符串格式](message/string.md)
  - [数组格式](message/array.md)
  - [消息段类型](message/segment.md)
- **API**
  - [API 概述](api/README.md)
  - [公开 API](api/public.md)
  - [隐藏 API](api/hidden.md)
- **事件**
  - [事件概述](event/README.md)
  - [消息事件](event/message.md)
  - [通知事件](event/notice.md)
  - [请求事件](event/request.md)
  - [元事件](event/meta.md)

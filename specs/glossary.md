# 术语表

在开始阅读标准内容前，请先阅读此页面以快速了解 OneBot 中的核心概念。此表同时可作为 OneBot 相关项目的命名指导。

## 机器人（Bot）

在不引发歧义的场合下，指**聊天机器人**（Chatbot）。

## 机器人平台（Bot Platform）

官方或非官方提供了聊天机器人 API 的聊天软件平台，例如 QQ、微信、微信公众号、企业微信、飞书、钉钉、Telegram、Discord、Facebook Messenger 等。

每个机器人平台应有一个格式为 `[a-z][\-a-z0-9]*(\.[\-a-z0-9]+)*` 的名字，点号分割不同部分可以允许实现为同一种平台的不同实例（例如 Zulip、IRC 等的不同服务器/网络）命名。一些例子如下：

- `telegram`
- `discord`
- `zulip.my-instance`
- `irc.my-net`

各 OneBot 实现在为机器人平台确定名字时应与其它实现的开发者沟通以确保名字的统一。

## OneBot

根据上下文不同，可能表示 OneBot 标准或 OneBot 实现。

注意：不可以写做 Onebot 或 oneBot，标准写法是 OneBot，需要大小写时应视为一个单词，写做 ONEBOT 或 onebot，可简称 OB 或 ob。

## OneBot 标准（OneBot Standard）

全称是 **OneBot 聊天机器人应用接口标准**（OneBot Chatbot API Standard）。

简称：

- OneBot 标准
- OneBot 接口标准
- OneBot 机器人接口标准

## OneBot 实现（OneBot Implementation）

与机器人平台对接、向上提供符合 OneBot 标准的接口的程序，可简称为**实现端**。

每个 OneBot 实现应有一个格式为 `[a-z][\-a-z0-9]*(\.[\-a-z0-9]+)*` 的名字，点号分割不同部分可以允许实现采用版本号来区分扩展 API 版本，或者方便兼容实现声明自己的兼容性。一些例子如下：

- `walle-q`
- `walle-q.v2`
- `go-cqhttp.v2.3`
- `go-cqhttp.v2.another-compatible-impl`

## OneBot 应用（OneBot Application）

与 OneBot 实现按照 OneBot 标准交互，实现机器人业务逻辑的程序，可简称为**应用端**。

OneBot 应用通常可以基于现成的 OneBot SDK 来编写，而无需关心 OneBot 标准的通信细节。

## OneBot SDK

帮助 OneBot 用户对接 OneBot 实现，使用户不需要自行编写 HTTP、WebSocket 等通信逻辑的库。一些封装层次较高的 SDK 还会提供事件、动作、消息等类型的封装。

常用的 OneBot SDK（往往也称为“开发框架”）包括 NoneBot、Koishi 等。

## LibOneBot

不同 OneBot 实现可以复用的部分，主要包括 OneBot Connect 的实现和事件、动作、消息段等数据模型的定义，可以帮助 OneBot 实现者快速在新的聊天机器人平台实现 OneBot 标准。

## 事件（Event）

机器人平台或 OneBot 实现中发生的事件，典型的例子包括：

- OneBot 心跳：一种**元事件**（Meta Event）
- 收到私聊消息：一种**消息事件**（Message Event）
- 群成员减少：一种**通知事件**（Notice Event）
- 收到加好友请求：一种**请求事件**（Request Event）

OneBot 实现向应用端传送事件的行为称为**推送**（Push），例如“OneBot 实现向应用端推送了一个事件”。

## 动作（Action）

应用端主动获取 OneBot 实现或机器人平台相关信息、控制 OneBot 实现或机器人行为的接口。

一些动作可能需要应用端传入一些参数，这些参数称为**动作参数**（Action Params 或 Params）。

应用端向 OneBot 实现请求执行动作的行为称为**调用**（Call），例如“应用端向 OneBot 实现调用了一个动作”。

## 消息（Message）

在事件和动作参数中用于表示聊天消息的数据类型，在事件中是消息段数组，在动作参数中可以是字符串（纯文本消息段的简化表示）、单个消息段、消息段数组。

## 消息段（Message Segment 或 Segment）

表示聊天消息的一个部分，在一些平台上，聊天消息支持图文混排，其中就会有多个消息段，分别表示每个图片和每段文字。

## OneBot Connect

OneBot 实现和 OneBot 应用通过网络连接的规范，可简称为 **OBC**。连接规范包括通信方式和数据协议两部分。

四种**通信方式**（Communication Method）：

- HTTP：OneBot 实现作为 HTTP 服务端
- HTTP Webhook：OneBot 实现作为 HTTP 客户端
- 正向 WebSocket（WebSocket 或 WS）：OneBot 实现作为 WebSocket 服务端
- 反向 WebSocket（WebSocket Reverse 或 WS Reverse）：OneBot 实现作为 WebSocket 客户端

三种**数据协议**（Data Protocol）：

- 事件（Event）
- 动作请求（Action Request 或 Request）
- 动作响应（Action Response 或 Response）

## 标准事件（Standard Event）

OneBot 标准定义的一系列在不同机器人平台普遍存在的事件，以及与 OneBot 实现本身相关的元事件。

## 扩展事件（Extended Event）

OneBot 实现在标准事件集之外扩展的事件。

## 标准动作（Standard Action）

OneBot 标准定义的一系列在不同机器人平台普遍存在的动作，以及用于控制/查询 OneBot 实现本身的动作。

## 扩展动作（Extended Action）

OneBot 实现在标准动作集之外扩展的动作。

## 标准消息段（Standard Segment）

OneBot 标准定义的一系列在不同机器人平台普遍存在的消息段。

## 扩展消息段（Extended Segment）

OneBot 实现在标准消息段集之外扩展的消息段。

# 反向 WebSocket

OneBot 实现作为 WebSocket 客户端，发起 WebSocket 连接，提供 Action 调用和事件推送服务。

## 适用环境

反向 WebSocket 通信方式适用于：

- OneBot 机器人逻辑代码后端运行的机器有 IP，或实现与 OneBot 机器人业务代码运行在同一机器上
- 机器人逻辑存在会话、上下文等复杂的会话过程
- 机器人功能的收与发密切相关的功能
- 机器人的逻辑后端有一个，有对接多个 OneBot 实现的需求（如一套代码兼容多个聊天机器人平台）

## 配置

对于 OneBot 实现和 libonebot 标准库的开发者：

- 反向 WebSocket 通信方式**必须**提供对 WebSocket 目标通信地址配置的方式，如果使用配置文件，**应该**使用 JSON 格式进行统一
- 使用配置文件的字段名**建议**使用 `ws_reverse.url`、`ws_reverse.enable` 分别代表连接地址和是否启用反向 WebSocket 通信方式
- 对于反向 WebSocket 通信方式，**需要**实现鉴权模块，使用 Access Token 形式进行配置，**建议**使用 `access_token` 作为配置项名称
- 配置字段**可选**支持配置多个 WebSocket 地址

对于 OneBot 机器人业务代码和框架的开发者：

- 使用反向 WebSocket 与 OneBot 实现进行对接时，**建议**对 OneBot 实现连接后端时发起的 HTTP 请求都进行鉴权和身份记录

## 请求

- OneBot 实现在发起 WebSocket 连接请求时，**必须**使用 WebSocket 的 HTTP 头信息，包括 `Connection: Upgrade` 和 `Upgrade: websocket`
- OneBot 实现如果支持配置鉴权，**必须**包含 `X-Client-Role` 头部鉴权信息
- OneBot 实现发起的 WebSocket 连接 URL **必须**使用 `ws://` 或 `wss://` 开头
- 发起的 HTTP 请求**必须**合法，符合 [RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231) 规范

对于 OneBot 实现和 libonebot 标准库的开发者：

- 反向 WebSocket 通信方式**必须**支持 endpoint 的动作请求，也就是所有动作请求都发到 `/`
- 正向 WebSocket 通信方式**可选**支持旧版本（v11）标准中的使用 URL 路由传递动作（Action）

## 数据传输

此处内容与正向 WebSocket 的数据传输部分相同，详见 [通信概述 - 正向 WebSocket](../websocket)。
# 正向 WebSocket

OneBot 实现作为 WebSocket 服务端，接受用户连接，提供 Action 调用和事件推送服务。

## 适用环境

正向 WebSocket 通信方式适用于：

- OneBot 实现运行的机器有 IP，或实现与 OneBot 机器人业务代码运行在同一机器上
- 机器人逻辑存在会话、上下文等复杂的会话过程
- 机器人功能的收与发密切相关的功能
- 机器人的多个后端共用一个机器人实现（如多个不同功能的后端对同一个机器人对接开发）

## 配置

对于 OneBot 实现和 libonebot 标准库的开发者：

- 正向 WebSocket **需要**提供配置服务器监听地址和端口的方式，如果使用配置文件，**应该**使用 JSON 格式进行统一
- 使用配置文件的字段名**建议**使用 `ws.host`、`ws.port`、`ws.enable` 分别代表监听地址、端口和是否启用正向 WebSocket 通信方式
- 对于正向 WebSocket 通信方式，**需要**实现鉴权模块，使用 Access Token 形式进行配置，**建议**使用 `access_token` 作为配置项名称
- 如果监听地址为广播地址，**建议**增加安全提示，告知用户监听地址的安全问题及使用鉴权的提示 `(待定)`

对于 OneBot 机器人业务代码和框架的开发者：

- 使用正向 WebSocket 与 OneBot 实现进行对接时，**需要**根据 OneBot 实现提供的配置文件进行配置

## 请求

- 正向 WebSocket 通信方式**必须**使用 `ws://` 或 `wss://` 开头的协议进行对接
- 正向 WebSocket 通信方式**必须**支持 [OneBot RPC - 请求]() 传输的数据格式 `(待定)`
- 发起的 HTTP 请求**必须**合法，符合 [RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231) 规范

对于 OneBot 实现和 libonebot 标准库的开发者：

- 正向 WebSocket 通信方式**必须**支持 endpoint 的动作请求，也就是所有动作请求都发到 `/`
- 正向 WebSocket 通信方式**可选**支持旧版本（v11）标准中的使用 URL 路由传递动作（Action）

## 数据传输

数据传输指 OneBot 实现与业务代码端建立连接后收发 WebSocket 消息帧的内容。

- 对于正向 WebSocket 通信方式，如果需断开连接，**应该**使用正确的 WebSocket 返回码，如 `1000`（代表 `CLOSE_NORMAL`）
- OneBot 实现推送的 Event **必须**支持 [OneBot RPC - 事件]() 传输的数据格式 `(待定)`
- 机器人逻辑代码或框架端发送的 Action **必须**支持 [OneBot RPC - 动作]() 传输的数据格式 `(待定)`
- OneBot 实现对 Action 的响应**必须**支持 [OneBot RPC - 动作响应]() 传输的数据格式 `(待定)`


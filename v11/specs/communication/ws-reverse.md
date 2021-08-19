# 反向 WebSocket

- [连接请求](#连接请求)
- [断线重连](#断线重连)
- [相关配置](#相关配置)

OneBot 启动后，作为客户端向用户配置的反向 WebSocket URL 建立连接。连接建立后，将一直保持连接，并根据连接的 URL 不同，提供 API 调用或事件推送服务。通过 WebSocket 消息发送的数据全部使用 JSON 格式。

## 连接请求

根据配置的不同，连接用户提供的 URL 的客户端有三种：API 客户端、Event 客户端和 Universal 客户端。API 客户端提供 API 调用服务；Event 客户端提供事件推送服务；Universal 客户端**在一条连接上**同时提供两种服务。

> **注意**
>
> 只要服务器能够正确区分，API 客户端和 Event 客户端可以向同一个 URL 建立连接，但这是两条连接，和 Universal 客户端不同。

各客户端建立连接的方式相同，以 API 客户端为例，假设设置了 API URL 为 `ws://127.0.0.1:8080/ws/api`，则连接请求如下：

```http
GET /ws/api HTTP/1.1
Host: 127.0.0.1:8080
Connection: Upgrade
Upgrade: websocket
X-Self-ID: 10001000
X-Client-Role: API
...
```

请求头中的 `X-Self-ID` 表示当前正在建立连接的机器人 QQ 号；`X-Client-Role` 表示当前正在建立连接的客户端类型，对于 Event 客户端和 Universal 客户端，这里分别是 `Event` 和 `Universal`。

连接建立后，使用方式同 [正向 WebSocket](ws.md)。

## 断线重连

当由于各种意外情况，连接断开时，OneBot 将以配置中指定的时间间隔不断尝试重连，直到再次连接成功。

## 相关配置

| 配置项 | 默认值 | 说明 |
| -------- | ------ | --- |
| `ws_reverse.enable` | `true` | 是否启用反向 WebSocket |
| `ws_reverse.url` | 空 | 反向 WebSocket API、Event、Universal 共用 URL |
| `ws_reverse.api_url` | 空 | 反向 WebSocket API URL，如果为空，则使用 `ws_reverse.url` 指定的值 |
| `ws_reverse.event_url` | 空 | 反向 WebSocket Event URL，如果为空，则使用 `ws_reverse.url` 指定的值 |
| `ws_reverse.use_universal_client` | `false` | 是否使用 Universal 客户端 |
| `ws_reverse.reconnect_interval` | `3000` | 反向 WebSocket 客户端断线重连间隔，单位毫秒 |

<hr>

| 上一节 | 下一节 |
| --- | --- |
| [正向 WebSocket](ws.md) | [鉴权](authorization.md) |

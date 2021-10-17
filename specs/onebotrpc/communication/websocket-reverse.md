!!! tip "适用场景"

    - OneBot 实现能主动访问到应用端（后者有公网 IP，或两者在同一局域网内）
    - 对性能有一定要求

!!! tip "建议 OneBot 实现提供的配置项"

    - `url`反向 WebSocket 连接地址
    - `access_token`：访问令牌
    - `reconnect_interval`：反向 WebSocket 重连间隔，单位：毫秒，必须大于 0

    本页后续将使用 `配置项名称` 或 `<配置项名称>` 的形式引用上述配置项的内容。

OneBot 实现**应该**根据用户配置，向指定的 `url` 发起 WebSocket 连接，连接建立后，在发生事件时向应用端推送事件，并将应用端发来的 WebSocket 消息解析为动作请求，处理后将动作响应发回。

## 请求头

除了不需要 `Content-Type`，在请求连接时**应**设置和 [HTTP Webhook](http-webhook.md) 相同的请求头。

## 事件和动作

事件推送和动作请求的处理**应**与 [正向 WebSocket](websocket.md) 一致。

## 重连

当连接断开时，**应**以 `reconnect_interval` 为间隔，不断尝试重连。

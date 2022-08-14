!!! tip "适用场景"

    - OneBot 实现能主动访问到应用端（后者有公网 IP，或两者在同一局域网内）
    - 对性能有一定要求

!!! tip "建议 OneBot 实现提供的配置项"

    - `url`反向 WebSocket 连接地址
    - `access_token`：访问令牌
    - `reconnect_interval`：反向 WebSocket 重连间隔，单位：毫秒，必须大于 0

    本页后续将使用 `配置项名称` 或 `<配置项名称>` 的形式引用上述配置项的内容。

OneBot 实现应该根据用户配置，向指定的 `url` 发起 WebSocket 连接，连接建立后，在发生事件时向应用端推送事件，并将应用端发来的 WebSocket 消息解析为动作请求，处理后将动作响应发回。

## 请求头

OneBot 实现必须在请求连接时设置以下请求头：

- `User-Agent`：具体的 UA 值可以由实现自行定义，如 `OneBot/12 (qq) Go-LibOneBot/1.0.0`
- `Sec-WebSocket-Protocol: <onebot_version>.<impl>`：
    - `<onebot_version>` 应为实现的 OneBot 标准版本，如 `12`
    - `<impl>` 应为实现的名称，格式见 [术语表](../../glossary.md#onebot-onebot-implementation)

如果配置了 `access_token` 且不为空字符串，则还应该设置：

- `Authorization: Bearer <access_token>`

这里 `<access_token>` 不需要对两边的空白字符进行裁剪。若无法设置此请求头，实现应通过 `access_token` URL query 参数来传递 `<access_token>`。

## 事件和动作

事件推送和动作请求的处理应与 [正向 WebSocket](websocket.md) 一致。

## 重连

当连接断开时，应以 `reconnect_interval` 为间隔，不断尝试重连。

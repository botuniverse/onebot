!!! tip "适用场景"

    - 应用端能主动访问到 OneBot 实现（后者有公网 IP，或两者在同一局域网内）
    - 未知个数的应用端需要接入同一个 OneBot 实现
    - 对性能有一定要求

!!! tip "建议 OneBot 实现提供的配置项"

    - `host`：WebSocket 服务器监听 IP
    - `port`：WebSocket 服务器监听端口
    - `access_token`：访问令牌

    本页后续将使用 `配置项名称` 或 `<配置项名称>` 的形式引用上述配置项的内容。

OneBot 实现应该根据用户配置启动 WebSocket 服务器，监听指定的 `<host>:<port>`，接受路径为 `/` 的连接请求，连接建立后，在发生事件时向应用端推送事件，并将应用端发来的 WebSocket 消息解析为动作请求，处理后将动作响应发回。

## 鉴权

如果配置了 `access_token` 且不为空字符串，OneBot 实现必须在连接建立前（协议 upgrade 前）检查请求头中的 `Authorization` 头是否等于 `Bearer <access_token>`（`<access_token>` 不需要对两边的空白字符进行裁剪），若等于则认为鉴权成功，否则鉴权失败。

## 事件

OneBot 实现主动向应用端推送事件时，必须使用 JSON 和 UTF-8 编码的字符串表示事件。

## 动作

当收到应用端发来的 WebSocket 消息时：

- 如果是 text 类型，则应按 JSON 和 UTF-8 编码解析动作请求
- 如果是 binary 类型，则应按 MessagePack 编码解析动作请求

其中，text 类型是任何 OneBot 实现必须支持的，binary 类型是可选的。

当收到上述任一种 WebSocket 消息后，如果支持，应以相同的格式和编码返回动作响应。

## 错误

- 如果收到请求非 `/` 的路径，可以返回 HTTP 状态码 `404 Not Found`
- 如果鉴权失败，必须返回 HTTP 状态码 `401 Unauthorized`
- 一旦连接建立，此后所有出错情形应通过动作响应的 `retcode` 字段区分

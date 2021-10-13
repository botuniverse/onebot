!!! tip "适用场景"

    - 机器人业务端能主动访问到 OneBot 实现（后者有公网 IP，或两者在同一局域网内）
    - 未知个数的机器人业务端需要接入同一个 OneBot 实现
    - 对性能要求不高，要求接入简单

!!! tip "建议 OneBot 实现提供的配置项"

    - `host`：HTTP 服务器监听 IP
    - `port`：HTTP 服务器监听端口
    - `access_token`：访问令牌
    - `event_enabled`：是否启用 `get_latest_events` 元动作
    - `event_buffer_size`：事件缓冲区大小，超过该大小将会丢弃最旧的事件，0 表示不限大小

    本页后续将使用 `配置项名称` 或 `<配置项名称>` 的形式引用上述配置项的内容。

OneBot 实现**应该**根据用户配置启动 HTTP 服务器，监听指定的 `<host>:<port>`，接受路径为 `/` 的 `POST` 请求，将 HTTP 请求体的内容解析为动作请求，处理后在 HTTP 响应体中返回动作响应。

## 鉴权

如果配置了 `access_token`，OneBot 实现**必须**检查请求头中的 `Authorization` 头是否等于 `Bearer <access_token>`，若等于则认为鉴权成功，否则鉴权失败。

## Content-Type

OneBot 实现**必须**同时支持两种 `Content-Type` 请求头：

- `application/json`：在请求体中使用 JSON 和 UTF-8 编码的字符串表示动作请求
- `application/msgpack`：在请求体中使用 MessagePack 编码的字节序列表示动作请求

当收到上述任一种请求后，**应**在响应头中设置相同的 `Content-Type`，并以相同的格式和编码返回动作响应。

## 事件轮询

当 `event_enabled` 配置为 true 时，OneBot 实现**必须**支持 `get_latest_events` 元动作，并至少提供 `event_buffer_size` 所指定的缓冲区大小，当用户尚未获取的事件数量超过缓冲区大小时，**可以**丢弃最旧的事件，也**可以**利用数据库提供无限容量的事件缓冲区。

多个并发请求同时调用 `get_latest_events` 是未定义行为，OneBot 实现**可以**做任意假设。

## 错误

- 如果收到非 `POST` 请求，**可以**返回 HTTP 状态码 `405 Method Not Allowed`
- 如果收到请求非 `/` 的路径，**可以**返回 HTTP 状态码 `404 Not Found`
- 如果鉴权失败，**必须**返回 HTTP 状态码 `401 Unauthorized`
- 如果收到不支持的 `Content-Type` 请求头，**必须**返回 HTTP 状态码 `415 Unsupported Media Type`
- 一旦开始读取 HTTP 请求体，此后所有出错情形**应**通过动作响应的 `retcode` 字段区分

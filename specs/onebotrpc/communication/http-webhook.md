!!! tip "适用场景"

    - OneBot 实现能主动访问到应用端（后者有公网 IP，或两者在同一局域网内）
    - 对性能要求不高，要求接入简单

!!! tip "建议 OneBot 实现提供的配置项"

    - `url`：Webhook 上报地址
    - `access_token`：访问令牌
    - `timeout`：上报请求超时时间，单位：毫秒，0 表示不超时

    本页后续将使用 `配置项名称` 或 `<配置项名称>` 的形式引用上述配置项的内容。

OneBot 实现应该根据用户配置，在发生事件时，向指定的 `url` 使用 `POST` 请求推送事件，并根据情况将 HTTP 响应体的内容解析为动作请求列表，依次处理，丢弃动作响应。

## 请求头

OneBot 实现必须在请求时设置以下请求头：

- `Content-Type: application/json`
- `User-Agent`：具体的 UA 值可以由实现自行定义
    - 例如 `User-Agent: OneBot/12 (qq) Go-LibOneBot/1.0.0`
- `X-OneBot-Version: <onebot_version>`：`<onebot_version>` 应为实现的 OneBot 标准版本
- `X-Impl: <impl>`：`<impl>` 应为实现的名称，格式为 `[_a-z]+`
- `X-Platform: <platform>`：`<platform>` 应为实现所针对的机器人平台名称，格式为 `[_a-z]+`
- `X-Self-ID: <self_id>`：`<self_id>` 应为当前所“登录”的机器人 ID

如果配置了 `access_token` 且不为空字符串，则还应该设置：

- `Authorization: Bearer <access_token>`

这里 `<access_token>` 不需要对两边的空白字符进行裁剪。

## 请求体

请求体中必须使用 JSON 和 UTF-8 编码的字符串表示事件。

## 超时

如果配置了 `timeout`，应在 HTTP 请求所用时间超过其值时认为事件推送失败。

## 响应

如果响应状态码为 `204 No Content`，应认为事件推送成功，并不做更多处理。

如果响应状态码为 `200 OK`，也应认为事件推送成功，此时应该根据响应头中的 `Content-Type` 将响应体解析为动作请求列表，依次处理动作请求，丢弃动作响应。

对于后一种情况，标准定义两种 `Content-Type` 响应头：

- `application/json`：在响应体中使用 JSON 和 UTF-8 编码的字符串表示动作请求列表
- `application/msgpack`：在响应体中使用 MessagePack 编码的字节序列表示动作请求列表

其中，`application/json` 是任何 OneBot 实现必须支持的，`application/msgpack` 是可选的。当 `Content-Type` 不支持时，实现应该输出错误日志。

如果响应状态码不是 `204` 或 `200` 中的任一个，应认为事件推送失败。

## 错误

- 如果尝试将响应体解析为动作请求列表并执行的任何一步出错，只需要输出日志，不应该向应用端返回错误

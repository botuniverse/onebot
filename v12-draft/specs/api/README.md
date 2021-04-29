# API

- [参数](#参数)
- [响应](#响应)
- [异步调用](#异步调用)
- [限速调用](#限速调用)
- [相关配置](#相关配置)

API 是 OneBot 向用户提供的操作接口，用户可通过 HTTP 请求或 WebSocket 消息等方式调用 API。

## 参数

API 调用需要指定 action（要进行的动作）和动作所需的参数。

在后面的 API 描述中，action 在标题中给出，如 `send_private_msg`；参数在「参数」小标题下给出，其中「数据类型」使用 JSON 中的名字，例如 `string`、`number` 等。

特别地，数据类型 `message` 表示该参数是一个消息类型的参数，在调用 API 时，`message` 类型的参数允许接受字符串、消息段数组、单个消息段对象三种类型的数据，关于消息格式的更多细节请查看 [消息](../message/)。

## 响应

OneBot 会对每个 API 调用返回一个 JSON 响应（除非是 HTTP 状态码不为 200 的情况），响应中的 `data` 字段包含 API 调用返回的数据内容。在后面的 API 描述中，将只给出 `data` 字段的内容，放在「响应数据」小标题下，而不再赘述 `status`、`retcode` 字段。

## 异步调用

所有 API 都可以通过给 action 附加后缀 `_async` 来进行异步调用，例如 `send_private_msg_async`、`send_msg_async`、`clean_data_dir_async`。

异步调用的响应中，`status` 字段为 `async`。

需要注意的是，虽然说以 `get_` 开头的那些接口也可以进行异步调用，但实际上客户端没有办法得知最终的调用结果，所以对这部分接口进行异步调用是没有意义的；另外，有一些接口本身就是异步执行的（返回的 `status` 为 `async`），此时使用 `_async` 后缀来调用不会产生本质上的区别。

## 限速调用

所有 API 都可以通过给 action 附加后缀 `_rate_limited` 来进行限速调用，例如 `send_private_msg_rate_limited`、`send_msg_rate_limited`，不过主要还是用在发送消息接口上，以避免消息频率过快导致腾讯封号。所有限速调用将会以指定速度**排队执行**，这个速度可在配置中指定。

限速调用的响应中，`status` 字段为 `async`。

## 相关配置

| 配置项 | 默认值 | 说明 |
| -------- | ------ | --- |
| `api.rate_limit_interval` | `500` | 限速 API 调用的排队间隔时间，单位毫秒 |

<hr>

| 上一节 | 下一节 |
| --- | --- |
| [消息段类型](../message/segment.md) | [公开 API](public.md) |

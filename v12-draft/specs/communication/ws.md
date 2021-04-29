# 正向 WebSocket

- [`/api` 接口](#api-接口)
- [`/event` 接口](#event-接口)
- [`/` 接口](#-接口)
- [相关配置](#相关配置)

OneBot 在启动时开启一个 WebSocket 服务器，监听配置文件指定的 IP 和端口，接受路径为 `/api`（或 `/api/`）、`/event`（或 `/event/`）、`/` 的连接请求。连接建立后，将一直保持连接（用户可主动断开连接），并根据路径的不同，提供 API 调用或事件推送服务。通过 WebSocket 消息发送的数据全部使用 JSON 格式。

## `/api` 接口

连接此接口后，向 OneBot 发送如下结构的 JSON 对象，即可调用相应的 API：

```json
{
    "action": "send_private_msg",
    "params": {
        "user_id": 10001000,
        "message": "你好"
    },
    "echo": "123"
}
```

这里的 `action` 参数用于指定要调用的 API，具体参考 [API](../api/)；`params` 用于传入参数，如果要调用的 API 不需要参数，则可以不加；`echo` 字段是可选的，类似于 [JSON RPC](https://www.jsonrpc.org/specification) 的 `id` 字段，用于唯一标识一次请求，可以是任何类型的数据，OneBot 将会在调用结果中原样返回。

客户端向 OneBot 发送 JSON 之后，OneBot 会往回发送一个调用结果，结构和 [HTTP 的响应](http.md#响应) 相似，（除了包含请求中传入的 `echo` 字段外）唯一的区别在于，通过 HTTP 调用 API 时，HTTP 状态码反应的错误情况被移动到响应 JSON 的 `retcode` 字段，例如，HTTP 返回 404 的情况，对应到 WebSocket 的回复，是：

```json
{
    "status": "failed",
    "retcode": 1404,
    "data": null,
    "echo": "123"
}
```

下面是 `retcode` 和 HTTP 状态码的对照：

| `retcode` | HTTP 接口中的状态码 |
| --------- | ----------------- |
| 1400 | 400 |
| 1401 | 401 |
| 1403 | 403 |
| 1404 | 404 |

实际上 `1401` 和 `1403` 并不会真的返回，因为如果建立连接时鉴权失败，连接会直接断开，根本不可能进行到后面的 API 调用阶段。

## `/event` 接口

连接此接口后，OneBot 会在收到事件后推送至客户端，推送的格式和 [HTTP POST 的上报](http-post.md#上报) 完全一致，事件的具体内容见 [事件](../event/)。

与 HTTP POST 不同的是，WebSocket 推送不会对数据进行签名（即 HTTP POST 中的 `X-Signature` 请求头在这里没有等价的东西），并且也不会处理响应数据。如果对事件进行处理的时候需要调用接口，请使用 [`/api` 接口](#api-接口) 或使用 HTTP 调用 API。

此外，这个接口和 HTTP POST 不冲突，如果启用了正向 WebSocket，同时也配置了 HTTP POST 的上报地址，OneBot 会先通过 HTTP POST 上报，在处理完它的响应后，向所有已连接了 `/event` 的 WebSocket 客户端推送事件。

## `/` 接口

在一条连接上同时提供 `/api` 和 `/event` 的服务，使用方式参考上面。

## 相关配置

| 配置项名称 | 默认值 | 说明 |
| -------- | ------ | --- |
| `ws.enable` | `false` | 是否启用正向 WebSocket |
| `ws.host` | `0.0.0.0` | WebSocket 服务器监听的 IP |
| `ws.port` | `6700` | WebSocket 服务器监听的端口 |

<hr>

| 上一节 | 下一节 |
| --- | --- |
| [HTTP POST](http-post.md) | [反向 WebSocket](ws-reverse.md) |

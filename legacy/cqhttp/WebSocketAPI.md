# WebSocket API 描述

**注：本页描述的是插件作为 WebSocket 服务端的情况，其它通信方式请见 [通信方式](CommunicationMethods)。**

除了 HTTP 方式调用 API、接收事件上报，目前插件还支持 WebSocket。使用 WebSocket 时，只需要你的机器人程序单方面的向插件建立连接，即可调用 API 和接收事件推送。数据全部使用 JSON 格式传递。

要使用 WebSocket，首先需要在配置文件中填写如下配置：

```ini
ws_host = 0.0.0.0  # 监听的 IP
ws_port = 6700  # 监听的端口
use_ws = yes  # 启用 WebSocket 服务端
```

重启插件后，便启动了 WebSocket 服务器。

插件提供了两个接口 `/api/` 和 `/event/`，分别用于调用 API 和推送事件。除此之外，还有 `/` 接口，用于在同一条连接上做上述两件事，这个接口相当于 `/api/` 和 `/event/` 的合并，下面不再单独说明。

如果配置文件中填写了 `access_token`，则建立连接时需要在请求头中加入验证头：

```http
Authorization: Bearer kSLuTF2GC2Q4q4ugm3
```

或者在 URI 中指定，如 `/api/?access_token=kSLuTF2GC2Q4q4ugm3`。

## `/api/` 接口

连接此接口后，向插件发送如下结构的 JSON 对象，即可调用相应的 API：

```json
{
    "action": "send_private_msg",
    "params": {
        "user_id": 123456,
        "message": "你好"
    }
}
```

这里的 `action` 参数用于指定要调用的 API，具体支持的 API 可以参考 [API 列表](API#api-列表)。`params` 用于传入参数，如果要调用的 API 不需要参数，则可以不加。

客户端向插件发送 JSON 之后，插件会往回发送一个调用结果，结构和 [响应说明](API#响应说明) 是一样的，唯一的区别在于，调用 HTTP 接口时，通过 HTTP 状态码反应的错误情况，被移动到响应 JSON 的 `retcode` 字段，例如，HTTP 接口返回 404 的情况，对应到 WebSocket 的回复，是：

```json
{
    "status": "failed",
    "retcode": 1404,
    "data": null
}
```

下面是 `retcode` 和 HTTP 接口的状态码的对照：

| `retcode` | HTTP 接口中的状态码 |
| --------- | ----------------- |
| 1400 | 400 |
| 1401 | 401 |
| 1403 | 403 |
| 1404 | 404 |

目前实际上 `1401` 和 `1403` 并不会真的返回，因为如果建立连接时鉴权失败，连接会直接断开，根本不可能进行到后面的接口调用阶段。

对于 `/api/` 接口，你可以保持连接，也可以每次请求是重新建立连接，区别不是很大。

## `/event/` 接口

连接此接口后，插件会在收到事件后推送至客户端，推送的格式和 HTTP POST 方式上报的完全一致，见 [上报数据格式](Post#上报数据格式)，事件列表见 [事件列表](Post#事件列表)。

与 HTTP 上报不同的是，WebSocket 推送不会对数据进行签名（即 HTTP 上报中的 `X-Signature` 请求头在这里没有等价的东西），并且也不会处理响应数据。如果对事件进行处理的时候需要调用接口，请使用 HTTP 接口或 WebSocket 的 `/api/` 接口。

此外，这个接口和配置文件的 `post_url` 不冲突，如果开启了 WebSocket 支持，同时 `post_url` 也不为空的话，插件会先通过 HTTP 上报给 `post_url`，在处理完它的响应后，向所有已连接了 `/event/` 的 WebSocket 客户端推送事件。

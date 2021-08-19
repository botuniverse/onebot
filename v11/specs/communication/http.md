# HTTP

- [请求](#请求)
- [响应](#响应)
- [相关配置](#相关配置)

OneBot 在启动时开启一个 HTTP 服务器，监听配置文件指定的 IP 和端口，接受路径为 `/:action` 的 API 请求（或 `/:action/`），如 `/send_private_msg`，请求可以使用 GET 或 POST 方法，可以通过 query 参数（`?arg1=111&arg2=222`）、urlencoded 表单（`arg1=111&arg2=222`）或 JSON（`{"arg1": "111", "arg2": "222"}`）传递参数。

参数可能有不同的类型，当用户通过 query 参数或 urlencoded 表单传参，或在 JSON 中使用字符串作为参数值时，OneBot 实现需要从字符串解析出对应类型的数据。

## 请求

假设配置中指定了 IP 和端口分别为 `127.0.0.1` 和 `5700`，则在浏览器中访问 `http://127.0.0.1:5700/send_private_msg?user_id=1000010000&message=hello` 即可给 QQ 号为 `1000010000` 的好友发送私聊消息 `hello`。

如需使用 JSON 传递参数，则请求如下：

```http
POST /send_private_msg HTTP/1.1
Host: 127.0.0.1:5700
Content-Type: application/json

{
    "user_id": 1000010000,
    "message": "hello"
}
```

> **注意**
>
> - 当使用 query 参数或 urlencoded 表单传递参数时，参数值必须进行 urlencode。
> - 当使用 urlencoded 表单或 JSON 传递参数时，请求头中的 `Content-Type` 必须对应的为 `application/x-www-form-urlencoded` 或 `application/json`。

上例中调用的 API（即 action）为 `send_private_msg`，其它 API 及它们的参数和响应内容，见 [API](../api/)。

## 响应

收到 API 请求并处理后，OneBot 会返回一个 HTTP 响应，根据具体情况不同，HTTP 状态码不同：

- 如果 access token 未提供，状态码为 401（关于 access token，见 [鉴权](authorization.md)）
- 如果 access token 不符合，状态码为 403
- 如果 POST 请求的 Content-Type 不支持，状态码为 406
- 如果 POST 请求的正文格式不正确，状态码为 400
- 如果 API 不存在，状态码为 404
- 剩下的所有情况，无论操作实际成功与否，状态码都是 200

状态码为 200 时，响应内容为 JSON 格式，基本结构如下：

```json
{
    "status": "ok",
    "retcode": 0,
    "data": {
        "id": 123456,
        "nickname": "滑稽"
    }
}
```

`status` 字段表示请求的状态：

- `ok` 表示操作成功，同时 `retcode` （返回码）会等于 0
- `async` 表示请求已提交异步处理，此时 `retcode` 为 1，具体成功或失败将无法获知
- `failed` 表示操作失败，此时 `retcode` 既不是 0 也不是 1，具体错误信息应参考 OneBot 实现的日志

`data` 字段为 API 返回数据的内容，对于踢人、禁言等不需要返回数据的操作，这里为 null，对于获取群成员信息这类操作，这里为所获取的数据的对象，具体的数据内容将会在相应的 API 描述中给出。注意，异步版本的 API，`data` 永远是 null，即使其相应的同步接口本身是有数据。

## 相关配置

> **提示**
>
> 配置项名称仅供参考，不同 OneBot 实现可以自行定义名称，只需在样例配置中给出注释即可。

| 配置项 | 默认值 | 说明 |
| -------- | ------ | --- |
| `http.enable` | `true` | 是否启用 HTTP |
| `http.host` | `0.0.0.0` | HTTP 服务器监听的 IP |
| `http.port` | `5700` | HTTP 服务器监听的端口 |

<hr>

| 上一节 | 下一节 |
| --- | --- |
| [通信概述](README.md) | [HTTP POST](http-post.md) |

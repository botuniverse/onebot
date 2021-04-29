# HTTP POST

- [上报](#上报)
- [签名](#签名)
- [快速操作](#快速操作)
- [相关配置](#相关配置)

OneBot 在收到事件后，向配置指定的事件上报 URL 通过 POST 请求发送事件数据，事件数据以 JSON 格式表示。请求结束后，OneBot 处理用户返回的响应中的「快速操作」，如快速回复、快速禁言等。

## 上报

假设配置指定的上报 URL 为 `http://127.0.0.1:8080/`，以私聊消息为例，事件上报的 POST 请求如下：

```http
POST / HTTP/1.1
Host: 127.0.0.1:8080
Content-Type: application/json
X-Self-ID: 10001000

{
    "time": 1515204254,
    "self_id": 10001000,
    "post_type": "message",
    "message_type": "private",
    "sub_type": "friend",
    "message_id": 12,
    "user_id": 12345678,
    "message": "你好～",
    "raw_message": "你好～",
    "font": 456,
    "sender": {
        "nickname": "小不点",
        "sex": "male",
        "age": 18
    }
}
```

请求头中的 `X-Self-ID` 表示当前正在上报的机器人 QQ 号，和请求正文 JSON 中的 `self_id` 一致。

上例中的事件为私聊消息事件，其它事件及它们的上报内容和支持的响应数据，见 [事件](../event/)。

## 签名

如果配置中给出了 `secret`，即签名密钥，则会在每次上报的请求头中加入 HMAC 签名，即 `X-Signature` 头，如：

```http
POST / HTTP/1.1
Host: 127.0.0.1:8080
Content-Type: application/json
X-Signature: sha1=f9ddd4863ace61e64f462d41ca311e3d2c1176e2
X-Self-ID: 10001000

...
```

签名以 `secret` 作为密钥，HTTP 正文作为消息，进行 HMAC SHA1 哈希，用户后端可以通过该哈希值来验证上报的数据确实来自 OneBot，而不是第三方伪造的。HMAC 介绍见 [密钥散列消息认证码](https://zh.wikipedia.org/zh-cn/%E9%87%91%E9%91%B0%E9%9B%9C%E6%B9%8A%E8%A8%8A%E6%81%AF%E9%91%91%E5%88%A5%E7%A2%BC)。

### HMAC SHA1 校验的示例

#### Python + Flask

```python
import hmac
from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['POST'])
def receive():
    sig = hmac.new(b'<your-key>', request.get_data(), 'sha1').hexdigest()
    received_sig = request.headers['X-Signature'][len('sha1='):]
    if sig == received_sig:
        # 请求确实来自于 OneBot
        pass
    else:
        # 假的上报
        pass
```

#### Node.js + Koa

```js
const crypto = require('crypto');
const secret = 'some-secret';

// 在 Koa 的请求 context 中
ctx.assert(ctx.request.headers['x-signature'] !== undefined, 401);
const hmac = crypto.createHmac('sha1', secret);
hmac.update(ctx.request.rawBody);
const sig = hmac.digest('hex');
ctx.assert(ctx.request.headers['x-signature'] === `sha1=${sig}`, 403);
```

## 快速操作

事件上报的后端可以在上报请求的响应中直接指定一些简单的操作，称为「快速操作」，如快速回复、快速禁言等。如果不需要使用这个特性，返回 HTTP 响应状态码 204，或保持响应正文内容为空；如果需要，则使用 JSON 作为响应正文，`Content-Type` 响应头任意（目前不会进行判断），但设置为 `application/json` 最好，以便减少不必要的升级成本，因为如果以后有需求，可能会加入判断。

> **注意**：无论是否需要使用快速操作，事件上报后端都应该在处理完毕后返回 HTTP 响应，否则 OneBot 将一直等待直到超时。

响应的 JSON 数据中，支持的操作随事件的不同而不同，会在事件列表中的「快速操作」标题下给出。需要指出的是，**响应数据中的每个字段都是可选的**，只有在字段存在（明确要求进行操作）时，才会触发相应的操作，否则将保持对机器人整体运行状态影响最小的行为（比如默认不回复消息、不处理请求）。

以私聊消息为例，事件上报后端若返回如下 JSON 作为响应正文：

```json
{
    "reply": "嗨～"
}
```

则会回复 `嗨～`。

## 相关配置

| 配置项名称 | 默认值 | 说明 |
| -------- | ------ | --- |
| `http_post.enable` | `true` | 是否启用 HTTP POST |
| `http_post.url` | 空 | 事件上报 URL |
| `http_post.timeout` | `0` | HTTP 上报超时时间，单位秒，0 表示不设置超时 |
| `http_post.secret` | 空 | 上报数据签名密钥 |

<hr>

| 上一节 | 下一节 |
| --- | --- |
| [HTTP](http.md) | [正向 WebSocket](ws.md) |

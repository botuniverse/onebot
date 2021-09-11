# HTTP Webhook

OneBot 实现作为客户端，在收到事件后，向配置指定的事件上报 URL 通过 POST 请求发送事件数据。

## 适用环境

HTTP Webhook 通信方式适用于：

- 聊天机器人的聊天消息处理服务
- OneBot 机器人逻辑处理的服务端拥有 IP 地址，或实现与 OneBot 机器人业务代码运行在同一机器上
- 对话逻辑无会话等特殊要求的功能

## 配置

对于 OneBot 实现和 LibOneBot 标准库的开发者：

- 使用配置文件的字段名**建议**使用 `http_webhook.url`、`http_webhook.enable` 代表订阅地址和是否启用 Webhook
- 对于 HTTP Webhook 通信方式，**需要**实现鉴权模块，使用 Access Token 形式进行配置，**建议**使用 `access_token` 作为配置项名称
- 配置字段**可选**支持配置多个 Webhook 地址，当支持多个地址时，**推荐**支持配置事件发送顺序
- HTTP Webhook 请求**必须**支持配置 secret，**建议**使用 `http_webhook.secret` 代表密钥，签名相关标准见下方 `签名`

对于 OneBot 机器人业务代码和框架的开发者：

- 使用 HTTP Webhook 与 OneBot 实现进行对接时，**建议**对 OneBot 实现发出的每一次 HTTP 请求都进行鉴权和完整性验证

## 请求

- OneBot 实现在 HTTP Webhook 通信方式下**必须**使用 POST 类型发出
- HTTP Webhook 通信方式**必须**支持 [OneBot RPC - 事件](../../onebot-rpc/event) 传输的数据格式 `(待定)`
- 发起的 HTTP 请求**必须**合法，符合 [RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231) 规范

对于 OneBot 实现和 LibOneBot 标准库的开发者：

- HTTP Webhook 上报时**必须**采用 JSON 格式上报数据
- HTTP Webhook 上报时 HTTP Header **必须**拥有 `X-Self-ID` 来声明 OneBot 实现或 LibOneBot 本身的身份 ID
- 如果用户配置了 secret 签名密钥，HTTP 请求中**必须**带有 `X-Signature` 头信息，签名相关标准见下方 `签名`

## 响应

- 对于框架开发者，**必须**对 OneBot 实现的 Webhook 请求响应正确的 HTTP 协议内容，无论是什么事件的 Webhook，都**必须**对事件处理后的 HTTP 在有限的时间（**推荐**10 秒以内）进行响应

## 签名

如果配置中给出了 `secret`，即签名密钥，则会在每次上报的请求头中加入 HMAC 签名，即 `X-Signature` 头。

```
POST / HTTP/1.1
Host: 127.0.0.1:8080
Content-Type: application/json
X-Signature: sha1=f9ddd4863ace61e64f462d41ca311e3d2c1176e2
X-Self-ID: 10001000

...
```

签名**必须**以 `secret` 作为密钥，HTTP 正文作为消息，进行 HMAC SHA1 哈希，用户后端可以通过该哈希值来验证上报的数据确实来自 OneBot 实现，而不是第三方伪造的。HMAC 介绍见 [密钥散列消息认证码](https://zh.wikipedia.org/zh-cn/%E9%87%91%E9%91%B0%E9%9B%9C%E6%B9%8A%E8%A8%8A%E6%81%AF%E9%91%91%E5%88%A5%E7%A2%BC)。

### HMAC SHA1 校验的示例

#### Python + Flask

```
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

```
const crypto = require('crypto');
const secret = 'some-secret';

// 在 Koa 的请求 context 中
ctx.assert(ctx.request.headers['x-signature'] !== undefined, 401);
const hmac = crypto.createHmac('sha1', secret);
hmac.update(ctx.request.rawBody);
const sig = hmac.digest('hex');
ctx.assert(ctx.request.headers['x-signature'] === `sha1=${sig}`, 403);
```
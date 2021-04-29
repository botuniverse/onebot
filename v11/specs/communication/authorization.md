# 鉴权

- [HTTP 和正向 WebSocket](#http-和正向-websocket)
- [反向 WebSocket](#反向-websocket)
- [相关配置](#相关配置)

在 HTTP POST 通信方式中，OneBot 提供了 [签名](http-post.md#签名) 来保证安全性，而在 HTTP、正向 WebSocket、反向 WebSocket 通信方式中，通过对 access token 进行验证来保证安全性。

## HTTP 和正向 WebSocket

如果配置文件中填写了 access token，则每次客户端向 OneBot 发送请求时需要在请求头中加入 `Authorization` 头，如：

```http
GET /get_friend_list HTTP/1.1
...
Authorization: Bearer kSLuTF2GC2Q4q4ugm3
```

`Bearer` 后面需给出和 OneBot 配置中相同的 access token。

在某些特殊情况下，可能无法修改请求头，则可以通过 query 参数传入 access token，例如：

```http
GET /get_friend_list?access_token=kSLuTF2GC2Q4q4ugm3 HTTP/1.1
```

## 反向 WebSocket

如果配置文件中填写了 access token，则每次 OneBot 的反向 WebSocket 客户端在向用户配置的 URL 建立连接的时候，会在请求头中加入 `Authorization` 头，如：

```http
GET /ws/api HTTP/1.1
...
Authorization: Bearer kSLuTF2GC2Q4q4ugm3
```

## 相关配置

| 配置项名称 | 默认值 | 说明 |
| -------- | ------ | --- |
| `auth.access_token` | 空 | access token |

<hr>

| 上一节 | 下一节 |
| --- | --- |
| [反向 WebSocket](ws-reverse.md) | [消息概述](../message/README.md) |

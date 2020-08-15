# 鉴权

在 HTTP POST 通信方式中，CQHTTP 提供了 [签名](http-post.md#签名) 来保证安全性，而在 HTTP、正向 WebSocket、反向 WebSocket 通信方式中，通过对 access token 进行验证来保证安全性。

## HTTP 和正向 WebSocket

如果配置文件中填写了 access token，则每次客户端向 CQHTTP 发送请求时需要在请求头中加入 `Authorization` 头，如：

```http
GET /get_friend_list HTTP/1.1
...
Authorization: Bearer kSLuTF2GC2Q4q4ugm3
```

`Bearer` 后面需给出和 CQHTTP 配置中相同的 access token。

在某些特殊情况下，可能无法修改请求头，则可以通过 query 参数传入 access token，例如：

```http
GET /get_friend_list?access_token=kSLuTF2GC2Q4q4ugm3 HTTP/1.1
```

## 反向 WebSocket

如果配置文件中填写了 access token，则每次 CQHTTP 的反向 WebSocket 客户端在向用户配置的 URL 建立连接的时候，会在请求头中加入 `Authorization` 头，如：

```http
GET /ws/api HTTP/1.1
...
Authorization: Token kSLuTF2GC2Q4q4ugm3
```

:::danger 重要
这里本应该是 `Authorization: Bearer kSLuTF2GC2Q4q4ugm3`（和 [HTTP 和正向 WebSocket](#http-和正向-websocket) 一致），但由于原 CQHTTP 插件历史上的某次升级时忘记把这里的 `Token` 改为 `Bearer`，持续了较长时间，因此如果修改可能会对已有代码造成破坏，因此决定保持为 `Token` 不变。
:::

## 相关配置

| 配置项名称 | 默认值 | 说明 |
| -------- | ------ | --- |
| `auth.access_token` | 空 | access token |

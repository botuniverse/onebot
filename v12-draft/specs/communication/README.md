# 通信

目前包括四种通信方式：

- **HTTP**：OneBot 作为 HTTP 服务端，提供 API 调用服务
- **HTTP POST**：OneBot 作为 HTTP 客户端，向用户配置的 URL 推送事件，并处理用户返回的响应
- **正向 WebSocket**：OneBot 作为 WebSocket 服务端，接受用户连接，提供 API 调用和事件推送服务
- **反向 WebSocket**：OneBot 作为 WebSocket 客户端，主动连接用户配置的 URL，提供 API 调用和事件推送服务

所有通信方式传输的数据都使用 UTF-8 编码。

> **注意**
>
> 在原 CQHTTP 插件中，HTTP POST 没有被列为一种独立的通信方式，而是单纯由 `post_url` 指定上报地址然后上报，但严格来说它也是一种通信方式，只用于推送事件，并且用法不同于 HTTP。这里为了清晰起见，把它增列为一种通信方式。

<hr>

| 上一节 | 下一节 |
| --- | --- |
| 无 | [HTTP](http.md) |

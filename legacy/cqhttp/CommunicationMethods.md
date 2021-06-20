# 通信方式

目前支持三种通信方式：

- 插件作为 HTTP 服务端，提供 API 和数据文件获取服务
- 插件作为 WebSocket 服务端，通过 `/api/` 和 `/event/` 两个接口分别提供 API 调用和事件推送服务
- 插件作为 WebSocket 客户端（称为「反向 WebSocket」），主动连接给定的 API 和事件上报地址，分别提供 API 调用服务和事件上报服务

上面三种通信方式分别使用 `use_http`、`use_ws`、`use_ws_reverse` 三个配置项来开关。

除了上述通信方式，还有通过 HTTP 上报事件，这是永远可用的，**不受上面三个 `use_*` 配置控制**，只要配置了 `post_url`，就会上报，并且处理响应数据。

下面详细介绍上面的三种通信方式的适用场景和使用方法，你可以根据需要选择其一或者适当组合使用。

## 插件作为 HTTP 服务端

### 适用场景

这是本插件最初支持的通信方式，也是使用起来最方便快捷的方式，适用于以下情况：

- 在本地初步测试使用 CKYU 和本插件，需要快速测试接口、查看接口返回的数据
- 运行 CKYU 的机器有公网 IP，或 CKYU 和业务代码运行在同一机器上
- 对于数据文件访问有需求
- ...

### 使用方法

将 `use_http` 配置为 `true`（默认即 `true`），然后通过 `host`、`port` 来配置要监听的 IP 和端口（默认为 `0.0.0.0:5700`），启用插件后即可通过形如 `http://host:port/send_private_msg?user_id=1234567&message=hello` 的 URL 来调用 API。

具体的 API 调用方法和 API 列表见 [API 描述](API)。

## 插件作为 WebSocket 服务端

### 适用场景

- 运行 CKYU 的机器有公网 IP，或 CKYU 和业务代码运行在同一机器上
- 业务代码运行环境无法通过 HTTP 上报获得事件（例如浏览器中）
- ...

### 使用方法

将 `use_ws` 配置为 `true`（默认 `false`），然后通过 `ws_host`、`ws_port` 来配置要监听的 IP 和端口（默认为 `0.0.0.0:6700`），启用插件后即可通过 `ws://ws_host:ws_port/api/` 接口来调用 API，通过 `ws://ws_host:ws_port/event/` 来接收事件推送，通过 `ws://ws_host:ws_port/` 接口来在同一条连接上调用 API 和接收事件推送（相当于 `/api/` 和 `/event/` 接口的合并，对接收到的数据可通过 `post_type` 字段来判断是 API 响应还是事件）。

这两个接口的具体用法见 [WebSocket API 描述](WebSocketAPI)。

## 插件作为 WebSocket 客户端（反向 WebSocket）

### 适用场景

- 运行 CKYU 的机器没有公网 IP，且业务代码有公网 IP，或两者运行在同一机器上
- ...

### 使用方法

在业务代码中启动 WebSocket 服务端，开启两个接口，分别用于 API 调用和事件上报（如果只需要一个功能，也可以只开一个），然后分别配置 `ws_reverse_api_url`、`ws_reverse_event_url` 为上述两个接口的完整地址，例如 `ws://127.0.0.1:8765/api/`。再将 `use_ws_reverse` 配置为 `true`（默认为 `false`），重启插件即可开启反向 WebSocket 服务。

插件会在特定的时候向指定的 URL 建立连接，并且在请求头中通过 `X-Self-ID` 来表示当前正在建立连接的机器人 QQ 号，以及通过 `X-Client-Role` 来表示当前正在建立连接的客户端类型，如：

```http
X-Self-ID: 123456
X-Client-Role: Event
```

其中，`X-Client-Role` 可能为 `Event` 和 `API`，分别对应事件上报和 API 的两个连接。`X-Client-Role` 头的存在意味着你可以将 `ws_reverse_api_url` 和 `ws_reverse_event_url` 设置为相同的地址，或简单地使用 `ws_reverse_url` 来配置共用地址即可，然后只需要在 WebSocket 后端对请求头进行判断即可知道是哪个账号的哪个客户端在连接。

除了使用 API 和 Event 双连接的方式，还可以通过将配置项 `ws_reverse_use_universal_client` 设为 `true`（默认 `false`）来让插件**只向 `ws_reverse_url` 建立一条连接**，`X-Client-Role` 为 `Universal`，API 和 Event 的数据均从这条连接上传输（相当于 API 和 Event 客户端的合并，对接收到的数据可通过 `post_type` 字段来判断是 API 响应还是事件）。Universal 客户端单连接的使用方式和分开的 API 和 Event 完全一致，下面不在单独说明。

如果配置了 `access_token`，则在建立连接时，还会加入 `Authorization` 请求头，例如：

```http
Authorization: Token kSLuTF2GC2Q4q4ugm3
X-Self-ID: 123456
```

> 注意：这里本应该是 `Authorization: Bearer kSLuTF2GC2Q4q4ugm3`（和插件作为服务端的校验保持一致），但由于历史上的某次升级时忘记把这里的 `Token` 改为 `Bearer`，并且如果现在修改可能会对已有代码造成破坏，因此决定保持为 `Token` 不变。

#### API 调用

首先插件启用时会启动一个**保持连接**的客户端用于连接 API 调用接口，即 `ws_reverse_api_url` 指定的接口，一旦收到服务端发来的消息就会调用相应的 API 并返回调用结果。

API 的调用方式和插件作为 WebSocket 服务端的 `/api/` 接口使用方式相同，见 [WebSocket API 描述的 `/api/`](WebSocketAPI#api)，不同在于你的服务端必须在调用 API 后保持连接，以便下次调用。

#### 事件上报

插件启动时会启动一个**保持连接**的客户端用于连接事件上报接口，即 `ws_reverse_event_url` 指定的接口，在后续接收到 CKYU 的事件时，会通过这个连接发送事件数据。发送事件数据格式和 HTTP POST 方式上报的完全一致，见 [上报数据格式](Post#上报数据格式)，事件列表见 [事件列表](Post#事件列表)。

与 HTTP 上报不同的是，这里上报不会对数据进行签名（即 HTTP 上报中的 `X-Signature` 请求头在这里没有等价的东西），并且也不会处理响应数据。

### 断线重连

可通过配置项 `ws_reverse_reconnect_interval` 和 `ws_reverse_reconnect_on_code_1000` 来配置反向 WebSocket 的断线重连机制，分别设置尝试重连的时间间隔，和是否在关闭码 1000 的情况下进行重连。

如果你的服务器重启时插件没有自动重连，建议尝试设置 `ws_reverse_reconnect_on_code_1000 = yes`。

## WebSocket 的 API 调用响应顺序问题

由于 WebSocket 的通信不像 HTTP 那样是固定的一来一回，而是一直保持连接，大多 WebSocket 框架都采用事件驱动的方式来提供接口。这就导致，在通过 WebSocket 进行**连续** API 调用时，很多情况下无法确切地知道插件返回的响应是对应哪次调用。因此插件现加入了 echo 机制，允许用户在调用 API 时在调用数据（JSON 对象）中加入一个 `echo` 字段（数据类型任意），以标记此次调用，插件会在该调用的响应数据中将其原样返回。

### 调用示例

```json
{
    "action": "send_private_msg",
    "params": {
        "user_id": 123456,
        "message": "你好"
    },
    "echo": 1648451782
}
```

### 响应示例

```json
{
    "status": "ok",
    "retcode": 0,
    "data": null,
    "echo": 1648451782
}
```

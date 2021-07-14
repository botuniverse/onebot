# HTTP

OneBot 实现作为 HTTP 服务端，提供接口调用服务，选择此通信方式会在 OneBot 启动时开启一个 HTTP 服务器，监听配置文件指定的 IP 和端口。

## 适用环境

HTTP 通信方式适用于：

- 在本地开发、主要使用和调试机器人的 Action（如发送消息、获取机器人状态等动作）
- OneBot 实现运行的机器有公网 IP，或实现与 OneBot 机器人业务代码运行在同一机器上
- 对会话实现无复杂要求的功能

## 配置

对于 OneBot 实现和 libonebot 标准库的开发者：

- HTTP 通信方式**需要**提供对 HTTP 通信方式配置的方式，如果使用配置文件，**应该**使用 JSON 格式进行统一
- 使用配置文件的字段名**建议**使用 `http.host`、`http.port`、`http.enable` 分别代表监听地址、端口和是否启用 HTTP 通信方式
- 对于 HTTP 通信方式，**需要**实现鉴权模块，使用 Access Token 形式进行配置，**建议**使用 `access_token` 作为配置项名称
- 如果监听地址设置为广播监听地址，**建议**增加安全提示，告知用户监听地址的安全问题及使用鉴权的提示 `(待定)`

对于 OneBot 机器人业务代码和框架的开发者：

- 使用 HTTP 与 OneBot 实现进行对接时，**需要**根据 OneBot 实现提供的配置文件项进行配置

## 请求

- HTTP 请求方式**必须**支持 POST 类型
- HTTP 请求**必须**支持 [OneBot RPC - 请求]() 传输的数据格式 `(待定)`
- 发起的 HTTP 请求**必须**合法，符合 [RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231) 规范

对于 OneBot 实现和 libonebot 标准库的开发者：

- HTTP 通信方式**必须**支持 endpoint 的动作请求，也就是所有动作请求都发到 `/`
- HTTP 通信方式**可选**支持旧版本（v11）标准中的使用 URL 路由传递动作（Action）

## 响应

- 对于响应的状态码，**应该**遵从 [RFC 2616](https://datatracker.ietf.org/doc/html/rfc2616#section-10.2) 中的描述返回
- HTTP 响应**必须**按照 [OneBot RPC - 响应]() 规定的字段返回数据
- 当按照 HTTP 响应的异常状态码（如 `404`）返回时，也**需要**按照 OneBot RPC 规定的字段返回 Body 内容数据

对于 HTTP 响应，OneBot 实现和 libonebot 标准库**必须**按照下方的约定返回对应的状态：

- 如果设置了鉴权，但收到的请求未包含鉴权信息，HTTP 状态码为 401
- 如果设置了鉴权，但收到的请求鉴权信息不符合，状态码为 403
- 如果 POST 请求的 `Content-Type` 不受支持，状态码为 406
- 如果 POST 请求的数据不正确，状态码为 400
- 如果请求的动作不存在，状态码为 404
- 剩下的所有情况，无论 OneBot RPC 中规定的 `retcode` 返回为多少，HTTP 状态码都是 200

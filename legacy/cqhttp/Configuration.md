# 配置

配置文件支持 INI 和 JSON 两种格式，并支持单个文件配置多个账号，或每个账号对应一个配置文件。

插件启动时（或重启时）按如下顺序依次尝试加载配置文件，一旦有一条加载成功，就停止加载（所有路径均为相对于 `data\app\io.github.richardchien.coolqhttpapi` 的相对路径）：

- `config.(cfg|ini)`（扩展名的括号和竖线表示优先加载 `.cfg`，若没有，则加载 `.ini`，下同），文件中通用配置需要放在 `[general]` 下，QQ 号特定配置放在 `[<user_id>]` 下
- `config\general.(cfg|ini)` + `config\<user_id>.(cfg|ini)`，前者是通用配置，全部放在 `[general]` 下，后者是 QQ 号特定配置，全部放在 `[<user_id>]` 下，后者覆盖前者中已存在的内容
- `config.json`，通用配置需放在根对象的 `general` 字段，QQ 号特定配置放在 QQ 号对应字段，例如 `{"general": {"host": "0.0.0.0"}, "123456": {"port": 6666}}`
- `config\general.json` + `config\<user_id>.json`，配置项均直接放在根对象，后者覆盖前者中已存在的内容

**重要：如果配置文件中需要使用中文或其它非 ASCII 字符，则必须使用 UTF-8 without BOM 编码保存文件！**

## 几种典型的配置文件安排方式

### 使用 INI 格式，在单个文件中存放多个账号的配置

- `data\app\io.github.richardchien.coolqhttpapi\config.ini`

```ini
[general]
host = 0.0.0.0
post_url = http://192.168.0.11:8888

[12345678]
access_token = Mgep4rV49rM8Jf
port = 5700

[87654321]
port = 5701
```

### 使用 JSON 格式，在单个文件中存放多个账号的配置

- `data\app\io.github.richardchien.coolqhttpapi\config.json`

```json
{
    "general": {
        "host": "0.0.0.0",
        "post_url": "http://127.0.0.1:8080"
    },
    "12345678": {
        "access_token": "Mgep4rV49rM8Jf",
        "port": 5700
    },
    "87654321": {
        "port": 5701
    }
}
```

### 使用 JSON 格式，每个账号对应一个配置文件

- `data\app\io.github.richardchien.coolqhttpapi\config\general.json`

```json
{
    "host": "0.0.0.0",
    "post_url": "http://127.0.0.1:8080"
}
```

- `data\app\io.github.richardchien.coolqhttpapi\config\12345678.json`

```json
{
    "access_token": "Mgep4rV49rM8Jf",
    "port": 5700
}
```

- `data\app\io.github.richardchien.coolqhttpapi\config\87654321.json`

```json
{
    "port": 5701
}
```

## 配置项

| 配置项名称 | 默认值 | 说明 |
| -------- | ------ | --- |
| `host` | `0.0.0.0` | HTTP 服务器监听的 IP |
| `port` | `5700` | HTTP 服务器监听的端口 |
| `use_http` | `true` | 是否开启 HTTP 接口，即通过 HTTP 调用 API，见 [通信方式的第一种](CommunicationMethods#插件作为-http-服务端) |
| `ws_host` | `0.0.0.0` | WebSocket 服务器监听的 IP |
| `ws_port` | `6700` | WebSocket 服务器监听的端口 |
| `use_ws` | `false` | 是否开启 WebSocket 服务器，可用于调用 API 和推送事件，见 [通信方式的第二种](CommunicationMethods#插件作为-websocket-服务端) |
| `ws_reverse_url` | 空 | 反向 WebSocket Event 和事件上报的共用地址 |
| `ws_reverse_api_url` | 空 | 反向 WebSocket API 地址，如果为空，则使用 `ws_reverse_url` 指定的值 |
| `ws_reverse_event_url` | 空 | 反向 WebSocket 事件上报地址，如果为空，则使用 `ws_reverse_url` 指定的值 |
| `ws_reverse_reconnect_interval` | `3000` | 反向 WebSocket 客户端断线重连间隔，单位毫秒 |
| `ws_reverse_reconnect_on_code_1000` | `true` | 是否在关闭状态码为 1000 的时候重连 |
| `ws_reverse_use_universal_client` | `false` | 是否使用 Universal 客户端（使用单个连接传输事件数据和 API 请求） |
| `use_ws_reverse` | `false` | 是否使用反向 WebSocket 服务，即插件作为 WebSocket 客户端主动连接指定的 API 和事件上报地址，见 [通信方式的第三种](CommunicationMethods#插件作为-websocket-客户端（反向-websocket）) |
| `post_url` | 空 | 消息和事件的上报地址，通过 POST 方式请求，数据以 JSON 格式发送 |
| `post_timeout` | `0` | HTTP 上报（即访问 `post_url`）的超时时间，单位秒，0 表示不设置超时 |
| `access_token` | 空 | API 访问 token，如果不为空，则会在接收到请求时验证 `Authorization` 请求头是否为 `Bearer xxxxxxxx`，`xxxxxxxx` 为 access token |
| `secret` | 空 | 上报数据签名密钥，如果不为空，则会在 HTTP 上报时对 HTTP 正文进行 HMAC SHA1 哈希，使用 `secret` 的值作为密钥，计算出的哈希值放在上报的 `X-Signature` 请求头，例如 `X-Signature: sha1=f9ddd4863ace61e64f462d41ca311e3d2c1176e2` |
| `post_message_format` | `string` | 上报消息格式，`string` 为字符串格式，`array` 为数组格式，具体见 [消息格式](Message) |
| `serve_data_files` | `false` | 是否提供请求 `data` 目录的文件的功能 |
| `enable_cors` | `false` | 是否允许跨域请求 |
| `update_source` | `global` | 更新源 |
| `update_channel` | `stable` | 更新通道，目前有 `stable`、`beta`、`alpha` 三个 |
| `auto_check_update` | `false` | 是否自动检查更新（每次启用插件时检查），不启用的情况下，仍然可以在 CKYU 应用菜单中手动检查更新 |
| `auto_perform_update` | `false` | 是否自动执行更新，仅在 `auto_check_update` 启用时有效，若启用，则插件将在自动检查到更新后，自动下载新版本（需要手动重启 CKYU 以生效） |
| `thread_pool_size` | `4` | 工作线程池大小，用于异步 API 调用、反向 WebSocket API 调用和一些其它小的异步任务，应根据计算机性能和实际需求适当调节，若设为 0，则使用 `CPU 核心数 * 2 + 1` |
| `server_thread_pool_size` | `4` | API 服务器线程池大小，用于异步处理请求（HTTP 和 WebSocket），应根据计算机性能和实际需求适当调节，若设为 0，则使用 `CPU 核心数 * 2 + 1` |
| `convert_unicode_emoji` | `true` | 是否在 CQ:emoji 和实际的 Unicode 之间进行转换，转换可能耗更多时间，但日常情况下影响不大，如果你的机器人需要处理非常大段的消息（上千字），且对性能有要求，可以考虑关闭转换 |
| `event_filter` | 空 | 指定事件过滤规则文件，见 [事件过滤器](EventFilter)，留空将不开启事件过滤器 |
| `enable_backward_compatibility` | `false` | 是否启用旧版兼容性，启用时**事件上报**的数据将和 3.x 版本保持兼容 |
| `show_log_console` | `true` | 是否显示日志输出控制台 |
| `max_log_file_size` | `6291456` | 最大单日志文件大小，单位字节，默认 6 MB |
| `max_log_files` | `1` | 最大日志文件备份数量（采用日志轮替机制） |
| `log_level` | `info` | 日志文件和日志控制台的日志等级，可选 `debug`、`info`、`warning`、`error`、`fatal` |
| `use_extension` | `false` | 是否启用扩展机制，见 [扩展](Extension) |
| `disable_coolq_log` | `true` | 是否禁用 CKYU 原生日志，由于使用 CKYU 原生日志可能会导致快速重启时插件卡死，所以默认禁用，如果你不在乎重启时卡死，并且需要在 CKYU 原生日志窗口查看插件的日志，可以将此项设为 `false` |
| `online_status_detection_method` | `get_stranger_info` | QQ 在线状态检测方式，默认（`get_stranger_info`）通过陌生人查询接口判断，设为 `log_db` 可切换成从 CKYU 的日志数据库判断，具体区别见 [其 API 说明](API#get_status-获取插件运行状态) |
| `enable_heartbeat` | `false` | 是否启用心跳机制，启用时会产生类型为 `heartbeat` 的元事件，见 [元事件](Post#元事件) |
| `heartbeat_interval` | `15000` | 产生心跳元事件的时间间隔，单位毫秒 |
| `enable_rate_limited_actions` | `false` | 是否启用限速 API 调用的支持 |
| `rate_limit_interval` | `500` | 限速 API 调用的排队间隔时间，单位毫秒 |

## 几种常用的配置项组合

注意，将下面的 JSON 复制到插件配置文件时，请确保逗号正确，并且删掉注释。

### 本地开发环境

```json
{
    "log_level": "debug",  // 输出调试级别日志
    "show_log_console": true,  // 显示日志控制台

    // 如果想要在CKYU的运行日志中查看插件日志，也可以加上下面这项
    "disable_coolq_log": false
}
```

### 自动更新插件

```json
{
    "update_source": "global",
    "update_channel": "stable",
    "auto_check_update": true,
    "auto_perform_update": true
}
```

现不再支持自动更新后自动重启 CKYU，需手动重载应用以生效。

### 生产环境

```json
{
    // 关闭不用的功能，例如使用正向 WebSocket 时：
    "use_http": false,
    "use_ws": true,
    "use_ws_reverse": false,
    "post_url": "",

    // 安全相关
    "access_token": "some-token",
    "secret": "some-secret",

    // 关闭自动更新（默认就是关闭的）
    "auto_check_update": false,
    "auto_perform_update": false,

    // 根据 CPU 核心数适当选择线程池大小
    "thread_pool_size": 6,
    "server_thread_pool_size": 8,

    // 如有需要，使用过滤器避免不必要的上报
    "event_filter": "filter.json",

    // 日志相关
    "show_log_console": true,  // 看需求，如果不需要通过 GUI 查看日志，这里推荐关闭
    "max_log_file_size": 6291456,  // 单日志文件最大字节数，6 MB
    "max_log_files": 3,
    "log_level": "info",  // 消息量特别大的情况下，可以酌情设置为 warning

    // 心跳
    "enable_heartbeat": true,
    "heartbeat_interval": 15000,  // 15 秒一个心跳包

    // 请求频率限制
    "enable_rate_limited_actions": true,
    "rate_limit_interval": 300  // 300 毫秒一条消息
}
```

# 反向 WebSocket

TODO

## 相关配置

| 配置项 | 默认值 | 说明 |
| -------- | ------ | --- |
| `ws_reverse.enable` | `true` | 是否启用反向 WebSocket |
| `ws_reverse.url` | 空 | 反向 WebSocket API 调用和事件上报的共用 URL |
| `ws_reverse.api_url` | 空 | 反向 WebSocket API URL，如果为空，则使用 `ws_reverse.url` 指定的值 |
| `ws_reverse.event_url` | 空 | 反向 WebSocket 事件上报 URL，如果为空，则使用 `ws_reverse.url` 指定的值 |
| `ws_reverse.reconnect_interval` | `3000` | 反向 WebSocket 客户端断线重连间隔，单位毫秒 |
| `ws_reverse.use_universal_client` | `false` | 是否使用 Universal 客户端 |

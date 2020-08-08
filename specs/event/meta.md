# 元事件

消息、通知、请求三大类事件是与 QQ 直接相关的、QQ 机器人真实接收到的事件，除了这些，CQHTTP 自己还会产生一类事件，这里称之为「元事件」，例如生命周期事件、心跳事件等，这类事件与 CQHTTP 本身的运行状态有关，而与 QQ 无关。

元事件的上报方式和普通事件完全一样，`post_type` 字段为 `meta_event`。

## 生命周期

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到消息的机器人 QQ 号 |
| `post_type` | string | `meta_event` | 上报类型 |
| `meta_event_type` | string | `lifecycle` | 元事件类型 |
| `sub_type` | string | `enable`、`disable`、`connect` | 事件子类型，分别表示 CQHTTP 启用、停用、WebSocket 连接成功 |

**注意，目前生命周期元事件中，只有 HTTP POST 的情况下可以收到 `enable` 和 `disable`，只有正向 WebSocket 和反向 WebSocket 可以收到 `connect`。**

## 心跳

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到消息的机器人 QQ 号 |
| `post_type` | string | `meta_event` | 上报类型 |
| `meta_event_type` | string | `heartbeat` | 元事件类型 |
| `status` | object | - | 状态信息 |
| `interval` | number (int64) | - | 到下次心跳的间隔，单位毫秒 |

其中 `status` 字段的内容和 `get_status` 接口的响应数据相同。

## 相关配置

| 配置项 | 默认值 | 说明 |
| -------- | ------ | --- |
| `enable_heartbeat` | `false` | 是否启用心跳机制 |
| `heartbeat_interval` | `15000` | 产生心跳元事件的时间间隔，单位毫秒 |

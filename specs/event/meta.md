# 元事件

上面的事件列表是 酷Q 直接支持的、QQ 机器人真实接收到的事件，除了这些，插件自己还会产生一类事件，这里称之为「元事件」，例如生命周期事件、心跳事件等，这类事件与插件（以及 酷Q）本身的运行状态有关，而与 QQ 无关。

元事件的上报方式和普通事件完全一样，`post_type` 字段为 `meta_event`。

## 生命周期

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `post_type` | string | `meta_event` | 上报类型 |
| `meta_event_type` | string | `lifecycle` | 元事件类型 |
| `sub_type` | string | `enable`、`disable`、`connect` | 事件子类型，分别表示插件启用、插件停用、WebSocket 连接成功 |

**注意，目前生命周期元事件中，只有 HTTP 上报（配置了 `post_url` ）的情况下可以收到 `enable` 和 `disable`，只有 WebSocket 和反向 WebSocket 可以收到 `connect`。**

## 心跳

心跳类型的元事件需要通过设置配置项 `enable_heartbeat` 为 `true` 开启，并可通过 `heartbeat_interval` 配置心跳间隔（单位毫秒）。

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `post_type` | string | `meta_event` | 上报类型 |
| `meta_event_type` | string | `heartbeat` | 元事件类型 |
| `status` | object | - | 状态信息 |
| `interval` | number (int64) | - | 到下次心跳的间隔，单位毫秒 |

其中 `status` 字段的内容和 [`get_status` 接口的响应数据](API#响应数据27) 相同。

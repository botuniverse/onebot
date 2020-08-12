# 请求事件

## 加好友请求

### 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到事件的机器人 QQ 号 |
| `post_type` | string | `request` | 上报类型 |
| `request_type` | string | `friend` | 请求类型 |
| `user_id` | number (int64) | - | 发送请求的 QQ 号 |
| `comment` | string | - | 验证信息 |
| `flag` | string | - | 请求 flag，在调用处理请求的 API 时需要传入 |

### 快速操作

| 字段名 | 数据类型 | 说明 | 默认情况 |
| ----- | ------- | --- | ------- |
| `approve` | boolean | 是否同意请求 | 不处理 |
| `remark` | string  | 添加后的好友备注（仅在同意时有效） | 无备注 |

## 加群请求／邀请

### 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到事件的机器人 QQ 号 |
| `post_type` | string | `request` | 上报类型 |
| `request_type` | string | `group` | 请求类型 |
| `sub_type` | string | `add`、`invite` | 请求子类型，分别表示加群请求、邀请登录号入群 |
| `group_id` | number (int64) | - | 群号 |
| `user_id` | number (int64) | - | 发送请求的 QQ 号 |
| `comment` | string | - | 验证信息 |
| `flag` | string | - | 请求 flag，在调用处理请求的 API 时需要传入 |

### 快速操作

| 字段名 | 数据类型 | 说明 | 默认情况 |
| ----- | ------- | --- | ------- |
| `approve` | boolean | 是否同意请求／邀请 | 不处理 |
| `reason` | string | 拒绝理由（仅在拒绝时有效） | 无理由 |

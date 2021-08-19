# 通知事件

- [群文件上传](#群文件上传)
- [群管理员变动](#群管理员变动)
- [群成员减少](#群成员减少)
- [群成员增加](#群成员增加)
- [群禁言](#群禁言)
- [好友添加](#好友添加)
- [群消息撤回](#群消息撤回)
- [好友消息撤回](#好友消息撤回)
- [群内戳一戳](#群内戳一戳)
- [群红包运气王](#群红包运气王)
- [群成员荣誉变更](#群成员荣誉变更)

## 群文件上传

### 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | ------- | ---- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到事件的机器人 QQ 号 |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `group_upload` | 通知类型 |
| `group_id` | number (int64) | - | 群号 |
| `user_id` | number (int64) | - | 发送者 QQ 号 |
| `file` | object | - | 文件信息 |

其中 `file` 字段的内容如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------ | ---- |
| `id` | string | 文件 ID |
| `name` | string | 文件名 |
| `size` | number (int64) | 文件大小（字节数） |
| `busid` | number (int64) | busid（目前不清楚有什么作用） |

## 群管理员变动

### 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到事件的机器人 QQ 号 |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `group_admin` | 通知类型 |
| `sub_type` | string | `set`、`unset` | 事件子类型，分别表示设置和取消管理员 |
| `group_id` | number (int64) | - | 群号 |
| `user_id` | number (int64) | - | 管理员 QQ 号 |

## 群成员减少

### 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到事件的机器人 QQ 号 |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `group_decrease` | 通知类型 |
| `sub_type` | string | `leave`、`kick`、`kick_me` | 事件子类型，分别表示主动退群、成员被踢、登录号被踢 |
| `group_id` | number (int64) | - | 群号 |
| `operator_id` | number (int64) | - | 操作者 QQ 号（如果是主动退群，则和 `user_id` 相同） |
| `user_id` | number (int64) | - | 离开者 QQ 号 |

## 群成员增加

### 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到事件的机器人 QQ 号 |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `group_increase` | 通知类型 |
| `sub_type` | string | `approve`、`invite` | 事件子类型，分别表示管理员已同意入群、管理员邀请入群 |
| `group_id` | number (int64) | - | 群号 |
| `operator_id` | number (int64) | - | 操作者 QQ 号 |
| `user_id` | number (int64) | - | 加入者 QQ 号 |

## 群禁言

### 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到事件的机器人 QQ 号 |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `group_ban` | 通知类型 |
| `sub_type` | string | `ban`、`lift_ban` | 事件子类型，分别表示禁言、解除禁言 |
| `group_id` | number (int64) | - | 群号 |
| `operator_id` | number (int64) | - | 操作者 QQ 号 |
| `user_id` | number (int64) | - | 被禁言 QQ 号 |
| `duration` | number (int64) | - | 禁言时长，单位秒 |

## 好友添加

### 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到事件的机器人 QQ 号 |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `friend_add` | 通知类型 |
| `user_id` | number (int64) | - | 新添加好友 QQ 号 |

## 群消息撤回

### 事件数据

| 字段名          | 数据类型   | 可能的值       | 说明           |
| ------------- | ------ | -------------- | -------------- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到事件的机器人 QQ 号 |
| `post_type`   | string | `notice`       | 上报类型       |
| `notice_type` | string | `group_recall` | 通知类型       |
| `group_id`    | number (int64)  |                | 群号           |
| `user_id`     | number (int64)  |                | 消息发送者 QQ 号   |
| `operator_id` | number (int64)  |                | 操作者 QQ 号  |
| `message_id`  | number (int64)  |                | 被撤回的消息 ID |

## 好友消息撤回

### 事件数据

| 字段名          | 数据类型   | 可能的值       | 说明           |
| ------------- | ------ | -------------- | -------------- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到事件的机器人 QQ 号 |
| `post_type`   | string | `notice`       | 上报类型       |
| `notice_type` | string | `friend_recall`| 通知类型       |
| `user_id`     | number (int64)  |                | 好友 QQ 号        |
| `message_id`  | number (int64)  |                | 被撤回的消息 ID |

## 群内戳一戳

### 上报数据

| 字段          | 类型   | 可能的值       | 说明           |
| ------------- | ------ | -------------- | -------------- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到事件的机器人 QQ 号 |
| `post_type`   | string | `notice`       | 上报类型       |
| `notice_type` | string | `notify` | 消息类型       |
| `sub_type` | string | `poke` | 提示类型 |
| `group_id` | int64 |  | 群号 |
| `user_id`     | int64  |                | 发送者 QQ 号 |
| `target_id` | int64 | | 被戳者 QQ 号 |

## 群红包运气王

### 上报数据

| 字段          | 类型   | 可能的值       | 说明           |
| ------------- | ------ | -------------- | -------------- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到事件的机器人 QQ 号 |
| `post_type`   | string | `notice`       | 上报类型       |
| `notice_type` | string | `notify` | 消息类型       |
| `sub_type` | string | `lucky_king` | 提示类型 |
| `group_id` | int64 |  | 群号 |
| `user_id`     | int64  |                | 红包发送者 QQ 号 |
| `target_id` | int64 | | 运气王 QQ 号 |

## 群成员荣誉变更

### 上报数据

| 字段          | 类型   | 可能的值       | 说明           |
| ------------- | ------ | -------------- | -------------- |
| `time` | number (int64) | - | 事件发生的时间戳 |
| `self_id` | number (int64) | - | 收到事件的机器人 QQ 号 |
| `post_type`   | string | `notice`       | 上报类型       |
| `notice_type` | string | `notify` | 消息类型       |
| `sub_type` | string | `honor` | 提示类型 |
| `group_id` | int64 |  | 群号 |
| `honor_type` | string | `talkative`、`performer`、`emotion` | 荣誉类型，分别表示龙王、群聊之火、快乐源泉 |
| `user_id`     | int64  |   | 成员 QQ 号 |

<hr>

| 上一节 | 下一节 |
| --- | --- |
| [消息事件](message.md) | [请求事件](request.md) |

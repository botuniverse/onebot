## `send_message` 发送消息

!!! tip "关于扩展此动作的提示"

    对于不同平台的 `detail_type`，如果符合标准所定义的类型，如私聊对应 `private`、群组对应 `group`，则建议使用标准定义的 `detail_type` 和 `xxx_id`。

    对于其它具体类型，例如过去 QQ 还存在讨论组的情况，可以指定 `detail_type` 为 `qq.discuss`，然后参数使用 `qq.discuss_id` 指示讨论组 ID。

    更多详细扩展规则请参考 [扩展规则](../rules.md)。

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `detail_type` | string | - | 发送的类型，可以为 `private`、`group` 或扩展的类型，和**消息事件**的 `detail_type` 字段对应
    `group_id` | string | - | 群 ID，当 `detail_type` 为 `group` 时必须传入
    `user_id` | string | - | 用户 ID，当 `detail_type` 为 `private` 时必须传入
    `message` | message | - | 消息内容

=== "响应数据"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `message_id` | string | 消息 ID
    `time` | int64 | 消息成功发出的时间（Unix 时间戳），单位：秒

=== "请求示例"

    ```json
    {
        "action": "send_message",
        "params": {
            "detail_type": "group",
            "group_id": "12467",
            "message": [
                {
                    "type": "text",
                    "data": {
                        "text": "我是文字巴拉巴拉巴拉"
                    }
                }
            ]
        }
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": {
            "message_id": "2452352435",
            "time": 1632847927.599013
        },
        "message": ""
    }
    ```

## `delete_message` 撤回消息

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `message_id` | string | - | 唯一的消息 ID

=== "响应数据"

    无。

=== "请求示例"

    ```json
    {
        "action": "delete_message",
        "params": {
            "message_id": "2452352435"
        }
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": null,
        "message": ""
    }
    ```

## `get_message` 获取消息

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `message_id` | string | - | 唯一的消息 ID

=== "响应数据"

    若存在返回对应 MessageEvent

=== "请求示例"

    ```json
    {
        "action": "get_message",
        "params": {
            "message_id": "2452352435"
        }
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": null,
        "message": {
            "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
            "impl": "go_onebot_qq",
            "platform": "qq",
            "self_id": "123234",
            "time": 1632847927.599013,
            "type": "message",
            "detail_type": "group",
            "sub_type": "",
            "message_id": "2452352435",
            "message": [
                {
                    "type": "text",
                    "data": {
                        "text": "OneBot is not a bot"
                    }
                },
                {
                    "type": "image",
                    "data": {
                        "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16"
                    }
                }
            ],
            "alt_message": "OneBot is not a bot[图片]",
            "group_id": "12345",
            "user_id": "123456788"
        }
    }
    ```

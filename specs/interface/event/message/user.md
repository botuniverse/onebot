!!! tip "提示"

    本页所定义的事件均基于 [OneBotRPC - 事件](../../onebotrpc/data-protocol/event.md)，其中 `type` 字段值应为 `message`。

    后面的定义中只给出 `detail_type`、`sub_type` 和具体事件特定的字段，如果没有给出 `sub_type`，则该字段值可以为空字符串。

用户消息事件是聊天机器人收到其他用户直接发来的消息对应的一类事件，实际上就是“私聊消息事件”。

## `message.private` 私聊消息

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `private`
    `message_id` | string | 消息唯一 ID
    `message` | message | 消息内容
    `alt_message` | string | 消息内容的替代表示, 可以为空
    `user_id` | string | 用户 ID

    对于 `user_id` 字段，如果存在匿名用户或群内系统自身发送的消息，应指定为固定值并在文档中告知用户。

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927,
        "type": "message",
        "detail_type": "private",
        "sub_type": "",
        "message_id": "6283",
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
        "user_id": "123456788"
    }
    ```

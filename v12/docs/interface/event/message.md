!!! tip "提示"

    本页所定义的事件均基于 [OneBotRPC - 事件](../../onebotrpc/data-protocol/event.md)，其中 `type` 字段值**应**为 `message`。

    后面的定义中只给出 `detail_type`、`sub_type` 和具体事件特定的字段，如果没有给出 `sub_type`，则该字段值**可以**为空字符串。

消息事件是聊天机器人收到其他用户发送的消息对应的一类事件，例如私聊消息等。

## `message.private` 私聊消息

=== "事件字段"

    字段名 | 类型 | 说明
    --- | --- | ---
    `detail_type` | string | **必须**为 `private`
    `message_id` | string | 消息唯一 ID
    `message` | message | 消息内容
    `alt_message` | string | 消息内容的替代表示, **可以**为空
    `user_id` | string | 用户 ID

    对于 `user_id` 字段，如果存在匿名用户或群内系统自身发送的消息，**应**指定为固定值并在文档中告知用户。

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927,
        "type": "message",
        "detail_type": "private",
        "sub_type": "",
        "message_id": "6283",
        "messsage": [
            {
                "type": "text",
                "data": {
                    "text": "OneBot is not a bot"
                }
            },
            {
                "type": "image",
                "data": {
                    "file_id": "0EF48CED-A905-4C3D-ACA2-BE765D2D0292"
                }
            }
        ],
        "alt_message": "OneBot is not a bot[图片]",
        "user_id": "123456788"
    }
    ```

## `message.group` 群消息

=== "事件字段"

    字段名 | 类型 | 说明
    --- | --- | ---
    `detail_type` | string | **必须**为 `group`
    `message_id` | string | 消息唯一 ID
    `message` | message | 消息内容
    `alt_message` | string | 消息内容的替代表示, **可以**为空
    `group_id` | string | 群 ID
    `user_id` | string | 用户 ID

    对于 `user_id` 字段，如果存在匿名用户或群内系统自身发送的消息，**应**指定为固定值并在文档中告知用户。

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927,
        "type": "message",
        "detail_type": "private",
        "sub_type": "",
        "message_id": "6283",
        "messsage": [
            {
                "type": "text",
                "data": {
                    "text": "OneBot is not a bot"
                }
            },
            {
                "type": "image",
                "data": {
                    "file_id": "0EF48CED-A905-4C3D-ACA2-BE765D2D0292"
                }
            }
        ],
        "alt_message": "OneBot is not a bot[图片]",
        "group_id": "12345",
        "user_id": "123456788"
    }
    ```

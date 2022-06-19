!!! tip "提示"

    本页所定义的事件均基于 [OneBot Connect - 事件](../../connect/data-protocol/event.md)，其中 `type` 字段值应为 `notice`。

    后面的定义中只给出 `detail_type`、`sub_type` 和具体事件特定的字段，如果没有给出 `sub_type`，则该字段值可以为空字符串。

## `notice.friend_increase` 好友增加

本事件应在好友或关注者增加时触发。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `friend_increase`
    `user_id` | string | 用户 ID

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927.599013,
        "type": "notice",
        "detail_type": "friend_increase",
        "sub_type": "",
        "user_id": "123456788"
    }
    ```

## `notice.friend_decrease` 好友减少

本事件应在好友或关注者减少时触发。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `friend_decrease`
    `user_id` | string | 用户 ID

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927.599013,
        "type": "notice",
        "detail_type": "friend_decrease",
        "sub_type": "",
        "user_id": "123456788"
    }
    ```

## `notice.private_message_delete` 私聊消息删除

本事件应在私聊消息被删除时触发。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `private_message_delete`
    `message_id` | string | 消息 ID
    `user_id` | string | 消息发送者 ID

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927.599013,
        "type": "notice",
        "detail_type": "private_message_delete",
        "sub_type": "",
        "message_id": "2847",
        "user_id": "123456788"
    }
    ```

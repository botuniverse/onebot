!!! tip "提示"

    本页所定义的事件均基于 [OneBot Connect - 事件](../../connect/data-protocol/event.md)，其中 `type` 字段值应为 `notice`。

    后面的定义中只给出 `detail_type`、`sub_type` 和具体事件特定的字段，如果没有给出 `sub_type`，则该字段值可以为空字符串。

## `notice.group_member_increase` 群成员增加

本事件应在群成员（包括机器人自身）申请加群通过、被邀请进群或其它方式进群时触发。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `group_member_increase`
    `sub_type` | string | 必须为 `join`、`invite`、空字符串或扩展的子类型
    `group_id` | string | 群 ID
    `user_id` | string | 用户 ID
    `operator_id` | string | 操作者 ID

    其中 `sub_type` 为 `join` 表示成员主动加入，`invite` 表成员被邀请加入。

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "self": {
            "platform": "qq",
            "user_id": "123234"
        },
        "time": 1632847927.599013,
        "type": "notice",
        "detail_type": "group_member_increase",
        "sub_type": "join",
        "user_id": "123456788",
        "group_id": "87654321",
        "operator_id": "1234567"
    }
    ```

## `notice.group_member_decrease` 群成员减少

本事件应在群成员（包括机器人自身）主动退出、被踢出或其它方式退出时触发。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `group_member_decrease`
    `sub_type` | string | 必须为 `leave`、`kick`、空字符串或扩展的子类型
    `group_id` | string | 群 ID
    `user_id` | string | 用户 ID
    `operator_id` | string | 操作者 ID

    其中 `sub_type` 为 `leave` 表示成员主动退出，`kick` 表示成员被踢出。

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "self": {
            "platform": "qq",
            "user_id": "123234"
        },
        "time": 1632847927.599013,
        "type": "notice",
        "detail_type": "group_member_decrease",
        "sub_type": "leave",
        "user_id": "123456788",
        "group_id": "87654321",
        "operator_id": "1234567"
    }
    ```

## `notice.group_message_delete` 群消息删除

本事件应在群消息被撤回或被管理员删除时触发。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `group_message_delete`
    `sub_type` | string | 必须为 `recall`、`delete`、空字符串或扩展的子类型
    `group_id` | string | 群 ID
    `message_id` | string | 消息 ID
    `user_id` | string | 消息发送者 ID
    `operator_id` | string | 操作者 ID

    其中 `sub_type` 为 `recall` 表示发送者主动删除，`delete` 表示管理员删除。

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "self": {
            "platform": "qq",
            "user_id": "123234"
        },
        "time": 1632847927.599013,
        "type": "notice",
        "detail_type": "group_message_delete",
        "sub_type": "recall",
        "group_id": "87654321",
        "message_id": "2847",
        "user_id": "123456788",
        "operator_id": "1234567"
    }
    ```

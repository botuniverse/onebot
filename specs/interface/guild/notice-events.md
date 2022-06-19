!!! tip "提示"

    本页所定义的事件均基于 [OneBot Connect - 事件](../../connect/data-protocol/event.md)，其中 `type` 字段值应为 `notice`。

    后面的定义中只给出 `detail_type`、`sub_type` 和具体事件特定的字段，如果没有给出 `sub_type`，则该字段值可以为空字符串。

## `notice.guild_member_increase` 群组成员增加

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `guild_member_increase`
    `sub_type` | string | 必须为 `join`、`invite`、空字符串或扩展的子类型
    `guild_id` | string | 群组 ID
    `user_id` | string | 用户 ID
    `operator_id` | string | 操作者 ID

    其中 `sub_type` 为 `join` 表示申请加群通过，`invite` 表示被邀请进群。

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927.599013,
        "type": "notice",
        "detail_type": "guild_member_increase",
        "sub_type": "join",
        "user_id": "123456788",
        "guild_id": "12345",
        "operator_id": "1234567"
    }
    ```

## `notice.guild_member_decrease` 群组成员减少

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `guild_member_decrease`
    `sub_type` | string | 必须为 `leave`、`kick`、空字符串或扩展的子类型
    `guild_id` | string | 群组 ID
    `user_id` | string | 用户 ID
    `operator_id` | string | 操作者 ID

    其中 `sub_type` 为 `leave` 表示主动退出，`kick` 表示被踢出。

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927.599013,
        "type": "notice",
        "detail_type": "guild_member_decrease",
        "sub_type": "leave",
        "user_id": "123456788",
        "guild_id": "12345",
        "operator_id": "1234567"
    }
    ```

## `notice.channel_message_delete` 频道消息删除

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `channel_message_delete`
    `sub_type` | string | 必须为 `recall`、`delete`、空字符串或扩展的子类型
    `guild_id` | string | 群组 ID
    `channel_id` | string | 频道 ID
    `message_id` | string | 消息 ID
    `user_id` | string | 消息发送者 ID
    `operator_id` | string | 操作者 ID

    其中 `sub_type` 为 `recall` 表示主动撤回，`delete` 表示被管理员删除。

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927.599013,
        "type": "notice",
        "detail_type": "channel_message_delete",
        "sub_type": "recall",
        "guild_id": "12345",
        "channel_id": "12",
        "message_id": "2847",
        "user_id": "123456788",
        "operator_id": "1234567"
    }
    ```

## `notice.channel_create` 频道新建

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `channel_create`
    `guild_id` | string | 群组 ID
    `channel_id` | string | 频道 ID
    `operator_id` | string | 操作者 ID

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927.599013,
        "type": "notice",
        "detail_type": "channel_create",
        "sub_type": "",
        "guild_id": "12345",
        "channel_id": "12",
        "operator_id": "1234567"
    }
    ```

## `notice.channel_delete` 频道删除

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `channel_delete`
    `guild_id` | string | 群组 ID
    `channel_id` | string | 频道 ID
    `operator_id` | string | 操作者 ID

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927.599013,
        "type": "notice",
        "detail_type": "channel_delete",
        "sub_type": "",
        "guild_id": "12345",
        "channel_id": "12",
        "operator_id": "1234567"
    }
    ```

!!! tip "提示"

    本页所定义的事件均基于 [OneBotRPC - 事件](../../onebotrpc/data-protocol/event.md)，其中 `type` 字段值应为 `notice`。

    后面的定义中只给出 `detail_type`、`sub_type` 和具体事件特定的字段，如果没有给出 `sub_type`，则该字段值可以为空字符串。

通知事件是机器人平台向机器人发送通知对应的事件，例如群成员变动等。

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

    其中 `sub_type` 为 `join` 表示申请加群通过，`invite` 表示被邀请进群。

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927,
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

    其中 `sub_type` 为 `leave` 表示主动退出，`kick` 表示被踢出。

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927,
        "type": "notice",
        "detail_type": "group_member_decrease",
        "sub_type": "leave",
        "user_id": "123456788",
        "group_id": "87654321",
        "operator_id": "1234567"
    }
    ```

## `notice.group_member_ban` 群成员禁言

本事件应在群成员（包括机器人自身）被禁言时触发。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `group_member_ban`
    `group_id` | string | 群 ID
    `user_id` | string | 用户 ID
    `operator_id` | string | 操作者 ID

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927,
        "type": "notice",
        "detail_type": "group_member_ban",
        "sub_type": "",
        "user_id": "123456788",
        "group_id": "87654321",
        "operator_id": "1234567"
    }
    ```

## `notice.group_member_unban` 群成员解除禁言

本事件应在群成员（包括机器人自身）被解除禁言时触发。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `group_member_unban`
    `group_id` | string | 群 ID
    `user_id` | string | 用户 ID
    `operator_id` | string | 操作者 ID

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927,
        "type": "notice",
        "detail_type": "group_member_unban",
        "sub_type": "",
        "user_id": "123456788",
        "group_id": "87654321",
        "operator_id": "1234567"
    }
    ```

## `notice.group_admin_set` 群管理员设置

本事件应在群成员（包括机器人自身）被设置为管理员时触发。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `group_admin_set`
    `group_id` | string | 群 ID
    `user_id` | string | 用户 ID
    `operator_id` | string | 操作者 ID

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927,
        "type": "notice",
        "detail_type": "group_admin_set",
        "sub_type": "",
        "user_id": "123456788",
        "group_id": "87654321",
        "operator_id": "1234567"
    }
    ```

## `notice.group_admin_unset` 群管理员取消设置

本事件应在群成员（包括机器人自身）的管理员身份被取消时触发。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `group_admin_unset`
    `group_id` | string | 群 ID
    `user_id` | string | 用户 ID
    `operator_id` | string | 操作者 ID

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927,
        "type": "notice",
        "detail_type": "group_admin_unset",
        "sub_type": "",
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

    其中 `sub_type` 为 `recall` 表示主动撤回，`delete` 表示被管理员删除。

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "impl": "go_onebot_qq",
        "platform": "qq",
        "self_id": "123234",
        "time": 1632847927,
        "type": "notice",
        "detail_type": "group_message_delete",
        "sub_type": "recall",
        "group_id": "87654321",
        "message_id": "2847",
        "user_id": "123456788",
        "operator_id": "1234567"
    }
    ```

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
        "time": 1632847927,
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
        "time": 1632847927,
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
        "time": 1632847927,
        "type": "notice",
        "detail_type": "group_message_delete",
        "sub_type": "",
        "message_id": "2847",
        "user_id": "123456788"
    }
    ```

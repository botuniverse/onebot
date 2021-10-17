## `get_group_info` 获取群信息

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群 ID

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群 ID
    `group_name` | string | - | 群名称

=== "请求示例"

    ```json
    {
        "action": "get_group_info",
        "params": {
            "group_id": "123456"
        }
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": {
            "group_id": "123456",
            "group_name": "一群大笨蛋"
        },
        "message": ""
    }
    ```

## `get_group_list` 获取群列表

获取机器人加入的群列表。

=== "请求参数"

    无。

=== "响应数据"

    群信息列表，每一个元素的字段同 `get_group_info` 的响应数据。

=== "请求示例"

    ```json
    {
        "action": "get_group_list",
        "params": {}
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": [
            {
                "group_id": "123456",
                "group_name": "一群大笨蛋"
            },
            {
                "group_id": "654321",
                "group_name": "一群大笨蛋2群"
            }
        ],
        "message": ""
    }
    ```

## `get_group_member_info` 获取群成员信息

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群 ID
    `user_id` | string | - | 用户 ID

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `user_id` | string | - | 用户 ID
    `nickname` | string | - | 用户名称/昵称

=== "请求示例"

    ```json
    {
        "action": "get_group_member_info",
        "params": {
            "group_id": "123456",
            "user_id": "3847573"
        }
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": {
            "user_id": "3847573",
            "nickname": "我是大笨蛋"
        },
        "message": ""
    }
    ```

## `get_group_member_list` 获取群成员列表

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群 ID

=== "响应数据"

    群信息列表，每一个元素的字段同 `get_group_member_info` 的响应数据。

=== "请求示例"

    ```json
    {
        "action": "get_group_member_list",
        "params": {
            "group_id": "123456"
        }
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": [
            {
                "user_id": "111222333",
                "nickname": "我是大笨蛋"
            },
            {
                "user_id": "444555666",
                "nickname": "我是小笨蛋"
            }
        ],
        "message": ""
    }
    ```

## `set_group_name` 设置群名称

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群 ID
    `group_name` | string | - | 新群名称

=== "响应数据"

    无。

=== "请求示例"

    ```json
    {
        "action": "set_group_name",
        "params": {
            "group_id": "2452352435",
            "group_name": "一个非常普通的群名"
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

## `leave_group` 退出群

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群 ID

=== "响应数据"

    无。

=== "请求示例"

    ```json
    {
        "action": "leave_group",
        "params": {
            "group_id": "2452352435"
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

## `kick_group_member` 踢出群成员

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群 ID
    `user_id` | string | - | 用户 ID

=== "响应数据"

    无。

=== "请求示例"

    ```json
    {
        "action": "kick_group_member",
        "params": {
            "group_id": "123456",
            "user_id": "123456789"
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

## `ban_group_member` 禁言群成员

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群 ID
    `user_id` | string | - | 用户 ID

=== "响应数据"

    无。

=== "请求示例"

    ```json
    {
        "action": "ban_group_member",
        "params": {
            "group_id": "123456",
            "user_id": "123456789"
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

## `unban_group_member` 取消禁言群成员

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群 ID
    `user_id` | string | - | 用户 ID

=== "响应数据"

    无。

=== "请求示例"

    ```json
    {
        "action": "unban_group_member",
        "params": {
            "group_id": "123456",
            "user_id": "123456789"
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

## `set_group_admin` 设置群管理员

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群 ID
    `user_id` | string | - | 用户 ID

=== "响应数据"

    无。

=== "请求示例"

    ```json
    {
        "action": "set_group_admin",
        "params": {
            "group_id": "123456",
            "user_id": "123456789"
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

## `unset_group_admin` 取消设置群管理员

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群 ID
    `user_id` | string | - | 用户 ID

=== "响应数据"

    无。

=== "请求示例"

    ```json
    {
        "action": "unset_group_admin",
        "params": {
            "group_id": "123456",
            "user_id": "123456789"
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

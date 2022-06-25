## `get_guild_info` 获取群组信息

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `guild_id` | string | - | 群组 ID

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `guild_id` | string | - | 群组 ID
    `guild_name` | string | - | 群组名称

=== "请求示例"

    ```json
    {
        "action": "get_guild_info",
        "params": {
            "guild_id": "123456"
        }
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": {
            "guild_id": "12345",
            "guild_name": "一群大笨蛋"
        },
        "message": ""
    }
    ```

## `get_guild_list` 获取群组列表

获取机器人加入的群组列表。

=== "请求参数"

    无。

=== "响应数据"

    群组信息列表，每一个元素的字段同 `get_guild_info` 的响应数据。

=== "请求示例"

    ```json
    {
        "action": "get_guild_list",
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
                "guild_id": "12345",
                "guild_name": "一群大笨蛋"
            },
            {
                "guild_id": "54321",
                "guild_name": "一群大笨蛋2群"
            }
        ],
        "message": ""
    }
    ```

## `set_guild_name` 设置群组名称

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `guild_id` | string | - | 群组 ID
    `guild_name` | string | - | 新群组名称

=== "响应数据"

    无。

=== "请求示例"

    ```json
    {
        "action": "set_guild_name",
        "params": {
            "guild_id": "12345",
            "guild_name": "一个非常普通的群名"
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

## `get_guild_member_info` 获取群组成员信息

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `guild_id` | string | - | 群组 ID
    `user_id` | string | - | 用户 ID

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `user_id` | string | - | 用户 ID
    `nickname` | string | - | 用户名称/昵称

=== "请求示例"

    ```json
    {
        "action": "get_guild_member_info",
        "params": {
            "guild_id": "12345",
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

## `get_guild_member_list` 获取群组成员列表

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `guild_id` | string | - | 群组 ID

=== "响应数据"

    群组成员信息列表，每一个元素的字段同 `get_guild_member_info` 的响应数据。

=== "请求示例"

    ```json
    {
        "action": "get_guild_member_list",
        "params": {
            "guild_id": "123456"
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


## `leave_guild` 退出群组

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `guild_id` | string | - | 群组 ID

=== "响应数据"

    无。

=== "请求示例"

    ```json
    {
        "action": "leave_guild",
        "params": {
            "guild_id": "12345"
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

## `get_channel_info` 获取频道信息

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `guild_id` | string | - | 群组 ID
    `channel_id` | string | - | 频道 ID

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `channel_id` | string | - | 频道 ID
    `channel_name` | string | - | 频道名称

=== "请求示例"

    ```json
    {
        "action": "get_channel_info",
        "params": {
            "guild_id": "123456",
            "channel_id": "12"
        }
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": {
            "channel_id": "12",
            "channel_name": "笨蛋频道"
        },
        "message": ""
    }
    ```

## `get_channel_list` 获取频道列表

获取指定群组中机器人可见的频道列表。

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `guild_id` | string | - | 群组 ID
    `joined_only` | bool | `false` | 只获取机器人账号已加入的频道列表

=== "响应数据"

    频道信息列表，每一个元素的字段同 `get_channel_info` 的响应数据。

=== "请求示例"

    ```json
    {
        "action": "get_channel_list",
        "params": {
            "guild_id": "12345"
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
                "channel_id": "12",
                "channel_name": "笨蛋频道"
            },
            {
                "channel_id": "13",
                "channel_name": "聪明频道"
            }
        ],
        "message": ""
    }
    ```

## `set_channel_name` 设置频道名称

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `guild_id` | string | - | 群组 ID
    `channel_id` | string | - | 频道 ID
    `channel_name` | string | - | 新频道名称

=== "响应数据"

    无。

=== "请求示例"

    ```json
    {
        "action": "set_channel_name",
        "params": {
            "guild_id": "12345",
            "channel_id": "13",
            "channel_name": "笨蛋频道2"
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

## `get_channel_member_info` 获取频道成员信息

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `guild_id` | string | - | 群组 ID
    `channel_id` | string | - | 频道 ID
    `user_id` | string | - | 用户 ID

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `user_id` | string | - | 用户 ID
    `nickname` | string | - | 用户名称/昵称

=== "请求示例"

    ```json
    {
        "action": "get_channel_member_info",
        "params": {
            "guild_id": "12345",
            "channel_id": "12",
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

## `get_channel_member_list` 获取频道成员列表

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `guild_id` | string | - | 群组 ID
    `channel_id` | string | - | 频道 ID

=== "响应数据"

    频道成员信息列表，每一个元素的字段同 `get_channel_member_info` 的响应数据。

=== "请求示例"

    ```json
    {
        "action": "get_channel_member_list",
        "params": {
            "guild_id": "123456",
            "channel_id": "12"
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

## `leave_channel` 退出频道

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `guild_id` | string | - | 群组 ID
    `channel_id` | string | - | 频道 ID

=== "响应数据"

    无。

=== "请求示例"

    ```json
    {
        "action": "leave_channel",
        "params": {
            "guild_id": "12345",
            "channel_id": "12"
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

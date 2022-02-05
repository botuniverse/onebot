## `get_self_info` 获取机器人自身信息

=== "请求参数"

    无。

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `user_id` | string | - | 机器人用户 ID
    `nickname` | string | - | 机器人名称/昵称

=== "请求示例"

    ```json
    {
        "action": "get_self_info",
        "params": {}
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": {
            "user_id": "123456",
            "nickname": "我是大笨蛋"
        },
        "message": ""
    }
    ```

## `get_user_info` 获取用户信息

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `user_id` | string | - | 用户 ID，可以是好友，也可以是陌生人

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `user_id` | string | - | 用户 ID
    `nickname` | string | - | 用户名称/昵称

=== "请求示例"

    ```json
    {
        "action": "get_user_info",
        "params": {
            "user_id": "123456"
        }
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": {
            "user_id": "123456",
            "nickname": "我是大笨蛋"
        },
        "message": ""
    }
    ```

## `get_friend_list` 获取好友列表

获取机器人的关注者或好友列表。

=== "请求参数"

    无请求参数。

=== "响应数据"

    好友信息列表，每一个元素的字段同 `get_user_info` 的响应数据。

=== "请求示例"

    ```json
    {
        "action": "get_friend_list",
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
                "user_id": "123456",
                "nickname": "我是大笨蛋"
            },
            {
                "user_id": "654321",
                "nickname": "我是小笨蛋"
            }
        ],
        "message": ""
    }
    ```

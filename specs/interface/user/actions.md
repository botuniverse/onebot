## `get_self_info` 获取机器人自身信息

=== "请求参数"

    无。

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `user_id` | string | - | 机器人用户 ID
    `user_name` | string | - | 机器人名称/姓名/昵称
    `user_displayname` | string | - | 机器人账号设置的显示名称，若无则为空字符串

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
            "user_name": "我是大笨蛋",
            "user_displayname": ""
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
    `user_name` | string | - | 用户名称/姓名/昵称
    `user_displayname` | string | - | 用户设置的显示名称，若无则为空字符串
    `user_remark` | string | - | 机器人账号对该用户的备注名称，若无则为空字符串

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
            "user_name": "我是大笨蛋",
            "user_displayname": "",
            "user_remark": "一个自称大笨蛋的人"
        },
        "message": ""
    }
    ```

## `get_friend_list` 获取好友列表

获取机器人的关注者或好友列表。

=== "请求参数"

    无请求参数。

=== "响应数据"

    好友信息列表，数据类型为 ``list[resp[`get_user_info`]]``。

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
                "user_name": "我是大笨蛋",
                "user_displayname": "",
                "user_remark": "一个自称大笨蛋的人"
            },
            {
                "user_id": "654321",
                "user_name": "我是小笨蛋",
                "user_displayname": "",
                "user_remark": "一个自称小笨蛋的人"
            }
        ],
        "message": ""
    }
    ```

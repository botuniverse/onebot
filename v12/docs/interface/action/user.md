!!! warning

    WIP

## get_self_info 获取机器人信息

获取机器人自身的信息。

=== "参数"

    无请求参数。

=== "响应参数"

    > OneBot 标准只规定 `user_id` 和 `nickname` 参数作为必须返回的内容，其他机器人信息可以使用扩展字段。

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `user_id` | string | - | 机器人的用户 ID
    `nickname` | string | - | 机器人的名称

=== "请求数据"

    ```json
    {
        "action": "get_self_info",
        "params": []
    }
    ```

=== "响应数据"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "message": "",
        "data": {
            "user_id": "123456",
            "nickname": "foo"
        }
    }
    ```

## get_user_info 获取用户信息

通过 `user_id` 获取用户的信息，可以是好友，也可以是陌生人。

=== "参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `user_id` | string | - | 用户 ID

=== "响应参数"

    > OneBot 标准只规定 `user_id` 和 `nickname` 参数作为必须返回的内容，其他信息可以使用扩展字段。

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `user_id` | string | - | 用户 ID
    `nickname` | string | - | 用户昵称

=== "请求数据"

    ```json
    {
        "action": "get_user_info",
        "params": {
            "user_id": "123456"
        }
    }
    ```

=== "响应数据"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "message": "",
        "data": {
            "user_id": "123456",
            "nickname": "foo"
        }
    }
    ```

## get_friend_list 获取好友列表

获取机器人的关注者或好友列表。

> OneBot 标准只规定 `user_id` 和 `nickname` 参数作为必须返回的内容，其他信息（例如分组信息）可以使用扩展字段。
>
> 响应内容为 json 数组格式，参数内的字段为每个元素内的参数。

=== "参数"

    无请求参数。

=== "响应参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `user_id` | string | - | 用户 ID
    `nickname` | string | - | 用户昵称

=== "请求数据"

    ```json
    {
        "action": "get_friend_list",
        "params": []
    }
    ```

=== "响应数据"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "message": "",
        "data": [
            {
                "user_id": "123456",
                "nickname": "foo"
            },
            {
                "user_id": "654321",
                "nickname": "bar"
            }
        ]
    }
    ```

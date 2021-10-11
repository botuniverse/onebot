!!! warning

    WIP

## get_group_info 获取群组信息

通过 `group_id` 获取群组相关信息。

=== "参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群号

=== "响应参数"

    > OneBot 标准只规定 `group_id` 和 `group_name` 参数作为必须返回的内容，其他信息可以使用扩展字段。

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群号
    `group_name` | string | - | 群组名称

=== "请求数据"

    ```json
    {
        "action": "get_group_info",
        "params": {
            "group_id": "123456"
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
            "group_id": "123456",
            "group_name": "foo"
        }
    }
    ```

## get_group_list 获取群组列表

获取机器人加入的群组列表。

> OneBot 标准只规定 `group_id` 和 `group_name` 参数作为必须返回的内容，其他信息（例如分组信息）可以使用扩展字段。
>
> 响应内容为 json 数组格式，参数内的字段为每个元素内的参数。

=== "参数"

    无请求参数。

=== "响应参数"

    > OneBot 标准只规定 `group_id` 和 `group_name` 参数作为必须返回的内容，其他信息可以使用扩展字段。

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群号
    `group_name` | string | - | 群组名称

=== "请求数据"

    ```json
    {
        "action": "get_group_list",
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
                "group_id": "123456",
                "group_name": "foo"
            },
            //...
        ]
    }
    ```

## get_group_member_info 获取群成员信息

获取群内的某个成员信息。

=== "参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群号
    `user_id` | string | - | 群内成员 ID

=== "响应参数"

    > OneBot 标准只规定以下参数作为必须返回的内容，其他信息可以使用扩展字段。

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群号
    `user_id` | string | - | 用户 ID
    `nickname` | string | - | 用户昵称

=== "请求数据"

    ```json
    {
        "action": "get_group_member_info",
        "params": {
            "group_id": "123456",
            "user_id": "3847573"
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
            "group_id": "123456",
            "user_id": "3847573",
            "nickname": "foo"
        }
    }
    ```

## get_group_member_list 获取群成员列表

获取群内的成员列表。

> OneBot 标准只规定部分参数作为必须返回的内容，其他信息（例如用户的头衔）可以使用扩展字段。
>
> 响应内容为 json 数组格式，参数内的字段为每个元素内的参数。

=== "参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 群号

=== "响应参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `user_id` | string | - | 用户 ID
    `nickname` | string | - | 用户昵称

=== "请求数据"

    ```json
    {
        "action": "get_group_member_list",
        "params": {
            "group_id": "123456"
        }
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
                "user_id": "111222333",
                "nickname": "foo"
            },
            {
                "user_id": "444555666",
                "nickname": "bar"
            },
            //...
        ]
    }
    ```

## set_group_name 设置群名

设置群名。

=== "参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 执行动作的群号
    `group_name` | string | - | 新群名

=== "响应参数"

    无响应参数。

=== "请求数据"

    ```json
    {
        "action": "set_group_name",
        "params": {
            "group_id": "2452352435",
            "group_name": "一个非常普通的群名"
        }
    }
    ```

=== "响应数据"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "message": ""
    }
    ```

## set_group_leave 退出群组

让机器人从某个群组退出。

=== "参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 执行动作的群号

=== "响应参数"

    无响应参数。

=== "请求数据"

    ```json
    {
        "action": "set_group_leave",
        "params": {
            "group_id": "2452352435"
        }
    }
    ```

=== "响应数据"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "message": ""
    }
    ```

## set_group_kick 群组踢人

踢出一名群成员。

=== "参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 执行踢人动作的群号
    `user_id` | string | - | 要踢的用户 ID

=== "响应参数"

    无响应参数。

=== "请求数据"

    ```json
    {
        "action": "set_group_kick",
        "params": {
            "group_id": "2452352435",
            "user_id": "123456"
        }
    }
    ```

=== "响应数据"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "message": ""
    }
    ```

## set_group_ban 群组禁言某人

禁言群内的某人或全部禁言。

> 如果 OneBot 对应的平台存在全员禁言，可以通过增加扩展字段扩展此接口。

=== "参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 执行禁言动作的群号
    `user_id` | string | - | 要禁言的用户 ID

=== "响应参数"

    无响应参数。

=== "请求数据"

    ```json
    {
        "action": "set_group_ban",
        "params": {
            "group_id": "2452352435",
            "user_id": "123456"
        }
    }
    ```

=== "响应数据"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "message": ""
    }
    ```

## set_group_admin 设置群管理员

将群内某人设置为管理员或取消管理员。

=== "参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 执行动作的群号
    `user_id` | string | - | 要设置的用户 ID
    `enable` | bool | `true` | `true` 为设置，`false` 为取消设置

=== "响应参数"

    无响应参数。

=== "请求数据"

    ```json
    {
        "action": "set_group_admin",
        "params": {
            "group_id": "2452352435",
            "user_id": "123456",
            "enable": true
        }
    }
    ```

=== "响应数据"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "message": ""
    }
    ```

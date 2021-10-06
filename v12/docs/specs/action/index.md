# OneBot 动作

OneBot 动作（原 OneBot API）是指通过通信方式向用户提供操作接口，例如发送消息、上传下载图片等操作。

对于 OneBot 动作的格式定义，见 [OneBot RPC - 动作](../onebot-rpc/action)。

本章列举了 OneBot 标准需要实现的公开 Action 内容。

## send_message 发送消息

给用户发送消息的动作。

> 对于不同平台的 `detail_type`，如果符合支持的类型，如私聊对应 `private`，群组对应 `group`，则**必须**使用不带前缀的发送类型和 `xxx_id`。
>   
> 对于其他发送类型，假设过去的 QQ 还存在讨论组的情况，可以指定讨论组为 `qq_discuss` 的类型，然后参数**必须**带有对应的目标身份地址，如 `qq_discuss_id` 参数。

=== "参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `group_id` | string | - | 如果 `detail_type` 为 `group` 则**必须**包含 `group_id` 用于确定发送的目标群组
    `user_id` | string | - | 如果 `detail_type` 为 `private` 则**必须**包含 `user_id` 用于确定用户身份
    `detail_type` | string | - | 发送的类型，**必须**为 `group`、`private`、`impl_spec_xxx` 中的一种（第三个是指不同平台的扩展子类型）
    `message` | array | - | **必须**包含消息本身的内容，其中消息必须为 array 格式的消息段，有关消息段内容的定义，见 [消息段](../message/message-array)

=== "响应参数"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `message_id` | string | 唯一的消息 ID，无论消息是否成功发送
    `time` | int64 | 消息成功发出的时间戳

=== "请求数据"

    ```json
    {
        "action": "send_message",
        "params": {
            "detail_type": "group",
            "group_id": "12467",
            "message": [
                {
                    "type": "text",
                    "data": {
                        "text": "我是文字巴拉巴拉巴拉"
                    }
                }
            ]
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
            "message_id": "2452352435",
            "time": 1627476314
        }
    }
    ```

## delete_message 撤回消息

撤回一条信息。

=== "参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `message_id` | string | - | 唯一的消息 ID

=== "响应参数"

    无响应参数。

=== "请求数据"

    ```json
    {
        "action": "delete_message",
        "params": {
            "message_id": "2452352435"
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

## get_file 获取文件

通过 Action 动作方式获取 OneBot 的文件。

> 待定。

## upload_file 上传文件

通过 Action 给 OneBot 实现上传文件。

因为 OneBot 标准规定了多种通讯方式，为了适应不同种类的上传文件，可以选择多种上传格式。

=== "参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `type` | string | - | 上传的方式，限定 `uri`、`bytes` 两种格式
    `name` | string | - | 上传的文件名，如 `foo.jpg`
    `uri` | string | 如果 `type` 为 `uri` 则必须有此项 | 上传的 URI，**必须**以传输协议开头，限定 `http(s)://`、`file://`、`base64://`
    `data` | base64 或 bytes | 如果 `type` 为 `bytes` 则必须有此项 | 上传的文件内容字节数据或 base64 数据
    `category` | string | 空（可选） | 文件的类别，限定 `image`、`audio`、`file`，可使用平台前缀进行扩展
    `sha256` | string | 空（可选） | 整个文件的 sha256，用于校验

    > 如果使用 JSON 格式请求此动作，则 `data` 段内容为 base64；如果使用 MsgPack 格式请求此动作，则 `data` 段内容为纯二进制。

=== "响应参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `file_id` | string | - | 上传文件的文件 ID，可后期使用

=== "请求数据"

    ```json
    {
        "action": "upload_file",
        "params": {
            "type": "uri",
            "name": "logo.jpg",
            "category": "image",
            "uri": "https://1bot.dev/assets/logo.png"
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
            "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16"
        }
    }
    ```

## upload_file_fragmented 分段上传文件

分段上传文件，适用于一些特殊情况下大文件的传输，例如 WebSocket 环境只能使用本身连接来传输文件。

分段上传文件首先需要有一个prepare 阶段，
=== "prepare 请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `stage` | string | - | 上传阶段，prepare 阶段限定 `prepare`
    `name` | string | - | 上传的文件名
    `total_size` | int64 | - | 要上传的文件大小（字节）
    `sha256` | string | 空（可选） | 文件的 sha256，用于验证完整性

=== "prepare 响应参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `file_id` | string | - | 文件的资源 ID

transfer 为分段传输文件的阶段

=== "transfer 必填参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `file_id` | string | - | 上传的文件 ID，通过 `prepare` 阶段获取
    `offset` | int64 | - | 要上传的文件偏移字节数
    `size` | int64 | - | 要上传的文件分段大小
    `data` | base64 或 bytes | - | 上传的文件内容字节数据或 base64 数据

    > 如果使用 JSON 格式请求此动作，则 `data` 段内容为 base64；如果使用 MsgPack 格式请求此动作，则 `data` 段内容为纯二进制。

=== "transfer 响应参数"

    待定。

## get_status 获取 OneBot 状态

获取 OneBot 实现的运行状态。

=== "请求参数"

    无请求参数。

=== "响应参数"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `good` | bool | 是否各项状态都符合预期，OneBot 实现各模块均正常
    `online` | bool | OneBot 实现对接的平台连接是否顺畅（如 QQ 平台为是否在线）

=== "请求数据"

    ```json
    {
        "action": "get_version",
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
            "name": "go-onebot-qq",
            "platform": "qq",
            "version": "1.2.0",
            "onebot_version": "12"
        }
    }
    ```

## get_version 获取版本信息

获取 OneBot 版本信息。

对于补充的版本信息，比如 OneBot 实现使用了开源的第三方组件，可以使用前缀加扩展的字段进行补充。

=== "请求参数"

    无请求参数。

=== "响应参数"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `name` | string | OneBot 实现的名称
    `platform` | string | OneBot 实现的平台前缀
    `version` | string | OneBot 实现自身的的版本号
    `onebot_version` | string | OneBot 实现的 OneBot 标准版本号

=== "请求数据"

    ```json
    {
        "action": "get_version",
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
            "name": "go-onebot-qq",
            "platform": "qq",
            "version": "1.2.0",
            "onebot_version": "12"
        }
    }
    ```

## get_latest_events 轮询获取事件列表

对 HTTP 通信方式适用，可以在 HTTP 通信方式下通过此动作轮询获取 OneBot 事件。

响应的数据与 OneBot 事件返回的元素相同。

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `limit` | int64 | 空（可选） | 获取的事件数量上限
    `timeout` | int64 | 空（可选） | 没有事件时要等待的秒数，0 表示使用短轮询，不等待

=== "响应参数"

    响应内容与 OneBot 事件内容元素相同。

=== "请求数据"

    ```json
    {
        "action": "get_latest_events",
        "params": {
            "limit": 100,
            "timeout": 0
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
                "type": "message",
                "event_id": "1234567899377234",
                "detail_type": "private",
                "sub_type": "",
                "user_id": "123456",
                "message": [
                    {
                        "type": "text",
                        "data": {
                            "text": "哈哈哈"
                        }
                    }
                ]
            }
        ]
    }
    ```

# OneBot 事件

OneBot 事件是用户需要从 OneBot 被动接收的数据，有以下几个大类：

- 消息事件，包括私聊消息、群消息等
- 通知事件，包括群成员变动、好友变动等
- 请求事件，包括加群请求、加好友请求等
- 元事件，包括 OneBot 生命周期、心跳等

在所有能够推送事件的通信方式中（HTTP POST、正向和反向 WebSocket），事件都以 JSON 格式表示。

本章说明的为 OneBot 标准中核心事件附带的参数和相应的内容，关于 OneBot 事件本身所必须携带的参数格式定义，见 [OneBot RPC - 事件](../onebot-rpc/event)。

## message 消息事件

消息事件为 OneBot 中最主要的事件，代表机器人或 IM 端收到消息后触发的事件。

### message.private 私聊消息

私聊消息表示用户通过私聊窗口或唯一的一对一窗口聊天时用户发出消息触发的事件。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `type` | string | **必须**为 `message`
    `user_id` | string | **必须**包含 `user_id` 用于确定用户身份
    `detail_type` | string | 值**必须**为 `private`
    `message` | array | **必须**包含消息本身的内容，其中消息必须为 array 格式的消息段，有关消息段内容的定义，见 [消息段](../message/message-array)
    `message_id` | string | 消息的唯一 ID，由 LibOneBot 指定，不同消息**必须**使用不同的 ID
    `alt_message` | string | 消息的字符串表现形式，一般用于只对消息本身内容不敏感的处理上使用，将多媒体字段转义为无内容符号，如 `[图片]`、`[语音]`

    > 对于 `user_id` 字段，如果在兼容 OneBot 标准时存在匿名用户或群内系统自身发送的消息，**需要**指定为固定值并告知 OneBot 对接用户以便排除。

=== "数据示例"

    ```json
    {
        "self_id": "123234",
        "id": 80203,
        "time": 1632847927,
        "platform": "qq",
        "messsage": [
            {
                "type": "text",
                "data": {
                    "text": "OneBot is not a bot"
                }
            },
            {
                "type": "image",
                "data": {
                    "file_id": "0EF48CED-A905-4C3D-ACA2-BE765D2D0292"
                }
            }
        ],
        "alt_message": "OneBot is not a bot[图片]",
        "message_id": "6283",
        "type": "message",
        "detail_type": "private",
        "user_id": "123456788",
        "sub_type": "",
        "qq_nickname": "海阔天空"
    }
    ```

### message.group 群消息

群消息表示用户群内发出消息触发的事件。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `type` | string | **必须**为 `message`
    `group_id` | string | **必须**包含 `group_id` 用于确定发送的目标群组
    `user_id` | string | **必须**包含 `user_id` 用于确定用户身份，如果是匿名用户，可以使用约定的缺省 ID
    `detail_type` | string | **必须**为 `group`
    `message` | array | **必须**包含消息本身的内容，其中消息必须为 array 格式的消息段，有关消息段内容的定义，见 [消息段](../message/message-array)
    `message_id` | string | 消息的唯一 ID，由 LibOneBot 指定，不同消息**必须**使用不同的 ID
    `alt_message` | string | 消息的字符串表现形式，一般用于只对消息本身内容不敏感的处理上使用，将多媒体字段转义为无内容符号，如 `[图片]`、`[语音]`

    > 对于 `user_id` 字段，如果在兼容 OneBot 标准时存在匿名用户或群内系统自身发送的消息，**需要**指定为固定值并告知 OneBot 对接用户以便排除。

=== "数据示例"

    ```json
    {
        "self_id": "123234",
        "id": 80203,
        "time": 1632847927,
        "platform": "qq",
        "messsage": [
            {
                "type": "text",
                "data": {
                    "text": "OneBot is not a bot"
                }
            },
            {
                "type": "image",
                "data": {
                    "file_id": "0EF48CED-A905-4C3D-ACA2-BE765D2D0292"
                }
            }
        ],
        "alt_message": "OneBot is not a bot[图片]",
        "message_id": "6283",
        "type": "message",
        "detail_type": "group",
        "user_id": "123456788",
        "group_id": "87654321",
        "sub_type": "",
        "qq_nickname": "海阔天空"
    }
    ```

## notice 通知事件

通知事件为 OneBot 中除 message 类型外的其他无需响应操作的通知类事件。

### notice.group_increase 群成员增加

本事件在群组内成员加群，被邀请进群，群创建时增加成员（包含机器人自身）时触发的通知事件。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `type` | string | **必须**为 `notice`
    `group_id` | string | **必须**包含 `group_id` 用于确定事件的来源群组
    `user_id` | string | **必须**包含 `user_id` 用于确定用户身份
    `detail_type` | string | **必须**为 `group_increase`
    `sub_type` | string | **必须**为 `approve`、`invite`、`unknown` 或 `platform_xxx`

    > 其中 `sub_type` 的 `approve` 是加群，`invite` 是被邀请，`unknown` 是未知的加群方式。如果对应的 OneBot 实现拥有特殊的加群姿势，可以使用平台前缀扩展。

=== "数据示例"

    ```json
    {
        "self_id": "123234",
        "id": 80203,
        "time": 1632847927,
        "platform": "qq",
        "type": "notice",
        "detail_type": "group_increase",
        "user_id": "123456788",
        "group_id": "87654321",
        "sub_type": "approve"
    }
    ```

### notice.group_decrease 群成员减少

本事件在群组内成员退出、被踢出（包含机器人自身）时触发的通知事件。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `type` | string | **必须**为 `notice`
    `group_id` | string | **必须**包含 `group_id` 用于确定事件的来源群组
    `user_id` | string | **必须**包含 `user_id` 用于确定用户身份
    `detail_type` | string | **必须**为 `group_decrease`
    `sub_type` | string | **必须**为 `leave`、`kick` 或 `platform_xxx`

    > 其中 `sub_type` 的 `leave` 代表用户主动离开，`kick` 代表用户被踢出。如果对应的 OneBot 实现拥有特殊的退群姿势，可以使用平台前缀扩展。

=== "数据示例"

    ```json
    {
        "self_id": "123234",
        "id": 80203,
        "time": 1632847927,
        "platform": "qq",
        "type": "notice",
        "detail_type": "group_decrease",
        "user_id": "123456788",
        "group_id": "87654321",
        "sub_type": "leave"
    }
    ```

### notice.friend 好友数量变动

本事件在机器人的好友（或关注者）增加或减少时触发的通知事件。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `type` | string | **必须**为 `notice`
    `user_id` | string | **必须**包含 `user_id` 用于确定用户身份
    `detail_type` | string | **必须**为 `friend`
    `sub_type` | string | **必须**为 `increase` 或 `decrease`

    > 其中 `sub_type` 的 `increase` 代表用户添加机器人好友或关注，`decrease` 代表删除或取消关注。

=== "数据示例"

    ```json
    {
        "self_id": "123234",
        "id": 80203,
        "time": 1632847927,
        "platform": "qq",
        "type": "notice",
        "detail_type": "friend",
        "user_id": "123456788",
        "sub_type": "increase"
    }
    ```

### notice.group_admin 群管理员变动

本事件在机器人所在群管理员增加或减少时触发的通知事件。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `type` | string | **必须**为 `notice`
    `group_id` | string | **必须**包含 `group_id` 用于确定事件的来源群组
    `user_id` | string | **必须**包含 `user_id` 用于确定用户身份
    `detail_type` | string | **必须**为 `group_admin`
    `sub_type` | string | **必须**为 `set` 或 `unset`

    > 其中 `sub_type` 的 `set` 代表添加管理员，`unset` 代表取消管理员。

=== "数据示例"

    ```json
    {
        "self_id": "123234",
        "id": 80203,
        "time": 1632847927,
        "platform": "qq",
        "type": "notice",
        "detail_type": "group_admin",
        "user_id": "123456788",
        "group_id": "625352617",
        "sub_type": "set"
    }
    ```

### notice.group_ban 群禁言相关事件

本事件在机器人所在群用户被禁言或解禁时触发的通知事件。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `type` | string | **必须**为 `notice`
    `group_id` | string | **必须**包含 `group_id` 用于确定事件的来源群组
    `user_id` | string | **必须**包含 `user_id` 用于确定用户身份
    `detail_type` | string | **必须**为 `group_ban`
    `sub_type` | string | **必须**为 `ban` 或 `unban`

    > 其中 `sub_type` 的 `ban` 代表禁言，`unban` 代表取消禁言。

=== "数据示例"

    ```json
    {
        "self_id": "123234",
        "id": 80203,
        "time": 1632847927,
        "platform": "qq",
        "type": "notice",
        "detail_type": "group_ban",
        "user_id": "123456788",
        "group_id": "625352617",
        "sub_type": "unban"
    }
    ```

### notice.group_message_delete 群消息撤回

本事件在机器人所在群消息被撤回时触发的通知事件。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `type` | string | **必须**为 `notice`
    `group_id` | string | **必须**包含 `group_id` 用于确定事件的来源群组
    `message_id` | string | 消息的唯一 ID，由 LibOneBot 指定，不同消息**必须**使用不同的 ID
    `detail_type` | string | **必须**为 `group_message_delete`

=== "数据示例"

    ```json
    {
        "self_id": "123234",
        "id": 80203,
        "time": 1632847927,
        "platform": "qq",
        "type": "notice",
        "detail_type": "group_message_delete",
        "group_id": "625352617",
        "message_id": "2847",
        "sub_type": ""
    }
    ```

### notice.private_message_delete 私聊消息撤回

本事件在机器人与用户私聊的消息被撤回时触发的通知事件。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `type` | string | **必须**为 `notice`
    `user_id` | string | **必须**包含 `user_id` 用于确定用户身份
    `message_id` | string | 消息的唯一 ID，由 LibOneBot 指定，不同消息**必须**使用不同的 ID
    `detail_type` | string | **必须**为 `private_message_delete`

=== "数据示例"

    ```json
    {
        "self_id": "123234",
        "id": 80203,
        "time": 1632847927,
        "platform": "qq",
        "type": "notice",
        "detail_type": "private_message_delete",
        "user_id": "123456788",
        "message_id": "2847",
        "sub_type": ""
    }
    ```

## meta 元事件

元事件是 OneBot 实现内部自己产生的一类事件，例如生命周期、心跳事件等，与 OneBot 本身的运行状态有关，与实现对应的聊天平台协议事件无关。

### meta.lifecycle 生命周期事件

本事件在 OneBot 实现使用 HTTP Webhook 或 Websocket（包含正反向）首次访问或接入时发送的事件。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `type` | string | **必须**为 `meta`
    `detail_type` | string | **必须**为 `lifecycle`
    `sub_type` | string | **必须**为 `connect`、`enable` 或 `disable`

=== "数据示例"

    ```json
    {
        "self_id": "123234",
        "id": 80203,
        "time": 1632847927,
        "platform": "qq",
        "type": "meta",
        "detail_type": "connect",
        "sub_type": ""
    }
    ```

### meta.heartbeat 心跳事件

本事件在 OneBot 实现使用定时器检测网络通畅的事件。对于不同通信方式，心跳建议可选分别配置，例如对于业务事件即时性要求不高的系统在使用 HTTP Webhook 时不一定需要开启心跳。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `type` | string | **必须**为 `meta`
    `detail_type` | string | **必须**为 `heartbeat`
    `interval` | int64 | 到下次心跳的间隔，单位毫秒
    `status` | array | 字段内容与 `get_status` 动作获取的内容相同

=== "数据示例"

    ```json
    {
        "self_id": "123234",
        "id": 80203,
        "time": 1632847927,
        "platform": "qq",
        "type": "meta",
        "detail_type": "heartbeat",
        "sub_type": "",
        "interval": 5000,
        "status": {
            "online": true,
            "good": true
        }
    }
    ```

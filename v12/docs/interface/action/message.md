!!! warning

    WIP

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

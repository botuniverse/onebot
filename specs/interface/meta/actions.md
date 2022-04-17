元动作是用于对 OneBot 实现进行控制、检查等的动作，例如获取版本信息等，仅与 OneBot 本身交互，与实现对应的机器人平台无关。

## `get_latest_events` 获取最新事件列表

仅 HTTP 通信方式必须支持，用于轮询获取事件。

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `limit` | int64 | 0 | 获取的事件数量上限，0 表示不限制
    `timeout` | int64 | 0 | 没有事件时要等待的秒数，0 表示使用短轮询，不等待

=== "响应数据"

    事件列表，从旧到新排序，建议不包含 [元事件](events.md)。

=== "请求示例"

    ```json
    {
        "action": "get_latest_events",
        "params": {
            "limit": 100,
            "timeout": 0
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
                "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
                "impl": "go_onebot_qq",
                "platform": "qq",
                "self_id": "123234",
                "time": 1632847927.599013,
                "type": "message",
                "detail_type": "private",
                "sub_type": "",
                "message_id": "6283",
                "message": [
                    {
                        "type": "text",
                        "data": {
                            "text": "OneBot is not a bot"
                        }
                    },
                    {
                        "type": "image",
                        "data": {
                            "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16"
                        }
                    }
                ],
                "alt_message": "OneBot is not a bot[图片]",
                "user_id": "123456788"
            },
            {
                "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
                "impl": "go_onebot_qq",
                "platform": "qq",
                "self_id": "123234",
                "time": 1632847927.599013,
                "type": "notice",
                "detail_type": "group_member_increase",
                "sub_type": "join",
                "user_id": "123456788",
                "group_id": "87654321",
                "operator_id": "1234567"
            }
        ],
        "message": ""
    }
    ```

## `get_supported_actions` 获取支持的动作列表

=== "请求参数"

    无。

=== "响应数据"

    支持的动作名称列表，可以不包括 `get_latest_events`。

=== "请求示例"

    ```json
    {
        "action": "get_supported_actions",
        "params": {}
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": [
            "get_supported_actions",
            "get_status",
            "get_version",
            "send_message",
            "get_self_info"
        ],
        "message": ""
    }
    ```

## `get_status` 获取运行状态

=== "请求参数"

    无。

=== "响应数据"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `good` | bool | 是否各项状态都符合预期，OneBot 实现各模块均正常
    `online` | bool | OneBot 实现对接的平台连接是否顺畅（如 QQ 平台为是否在线），是 `good` 的必要条件之一

=== "请求示例"

    ```json
    {
        "action": "get_status",
        "params": {}
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": {
            "good": true,
            "online": true
        },
        "message": ""
    }
    ```

## `get_version` 获取版本信息

=== "请求参数"

    无。

=== "响应数据"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `impl` | string | OneBot 实现名称，格式 `[_a-z]+`
    `platform` | string | OneBot 实现平台名称，格式 `[_a-z]+`
    `version` | string | OneBot 实现的版本号
    `onebot_version` | string | OneBot 实现的 OneBot 标准版本号

=== "请求示例"

    ```json
    {
        "action": "get_version",
        "params": {}
    }
    ```

=== "响应数据"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": {
            "impl": "go_onebot_qq",
            "platform": "qq",
            "version": "1.2.0",
            "onebot_version": "12"
        },
        "message": ""
    }
    ```

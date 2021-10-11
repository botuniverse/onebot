!!! warning

    WIP

## get_latest_events 获取最新事件列表

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

!!! tip "提示"

    本页所定义的事件均基于 [OneBot Connect - 事件](../../connect/data-protocol/event.md)，其中 `type` 字段值应为 `meta`。

    后面的定义中只给出 `detail_type`、`sub_type` 和具体事件特定的字段，如果没有给出 `sub_type`，则该字段值可以为空字符串。

元事件是 OneBot 实现内部自发产生的一类事件，例如心跳等，与 OneBot 本身的运行状态有关，与实现对应的机器人平台无关。

## `meta.heartbeat` 心跳

!!! tip "建议 OneBot 实现提供的配置项"

    - `enabled`：是否启用心跳
    - `interval`：心跳间隔，单位：毫秒，必须大于 0

    本页后续将使用 `配置项名称` 或 `<配置项名称>` 的形式引用上述配置项的内容。

当 `enabled` 配置为 true 时，OneBot 实现应该每隔 `interval` 产生一个心跳事件。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `heartbeat`
    `interval` | int64 | 到下次心跳的间隔，单位：毫秒

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "time": 1632847927.599013,
        "type": "meta",
        "detail_type": "heartbeat",
        "sub_type": "",
        "interval": 5000
    }
    ```

## `meta.status_update` 状态更新

对于正向 WebSocket 和反向 WebSocket 通信方式，OneBot 实现应在连接建立后的适当时机（如所有机器人账号登录完成后）产生一个状态更新事件，发送所有机器人账号的状态。

对于 HTTP Webhook 通信方式，OneBot 实现应在启动后的适当时机（如所有机器人账号登录完成后）产生一个状态更新事件，发送所有机器人账号的状态。

在上述时机首次产生事件后，实现应在机器人账号或实现本身状态有变化时产生状态更新事件。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `status_update`
    `status` | resp[`get_status`] | OneBot 状态，与 `get_status` 动作响应数据一致

    一个连接上的首次状态更新事件中，`status.bots` 字段应包含所有机器人账号的状态，后续则可以只包含状态有变化的机器人账号。如果是 `status.good` 或 OneBot 实现本身的其它状态变化，`status.bots` 字段可为空列表。

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "time": 1632847927.599013,
        "type": "meta",
        "detail_type": "status_update",
        "sub_type": "",
        "status": {
            "good": true,
            "bots": [
                {
                    "self": {
                        "platform": "qq",
                        "user_id": "1234567"
                    },
                    "online": true,
                    "qq.status": "信号弱"
                },
                {
                    "self": {
                        "platform": "telegram",
                        "user_id": "2345678"
                    },
                    "online": true
                }
            ]
        }
    }
    ```

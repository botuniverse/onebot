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

建议 HTTP 通信方式忽略该类事件。

=== "事件字段"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `detail_type` | string | 必须为 `heartbeat`
    `interval` | int64 | 到下次心跳的间隔，单位：毫秒
    `status` | resp[`get_status`] | OneBot 状态，与 `get_status` 动作响应数据一致

=== "示例"

    ```json
    {
        "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
        "self": {
            "platform": "qq",
            "user_id": "123234"
        },
        "time": 1632847927.599013,
        "type": "meta",
        "detail_type": "heartbeat",
        "sub_type": "",
        "interval": 5000,
        "status": {
            "good": true,
            "online": true
        }
    }
    ```

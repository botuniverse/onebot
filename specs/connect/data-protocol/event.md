**事件**是由 OneBot 实现自发产生或从机器人平台获得，由 OneBot 实现向应用端推送的数据。

## 格式

事件应表示为一个字典/映射/对象，且必须具有下面这些字段：

字段名 | 数据类型 | 说明
--- | --- | ---
`id` | string | 事件唯一标识符
`impl` | string | OneBot 实现名称，格式见 [术语表](../../glossary.md#onebot-onebot-implementation)
`time` | float64 | 事件发生时间（Unix 时间戳），单位：秒，建议优先采用聊天平台给出的时间，其次采用实现中创建事件对象的时间
`type` | string | 事件类型，必须是 `meta`、`message`、`notice`、`request` 中的一个，分别表示元事件、消息事件、通知事件和请求事件
`detail_type` | string | 事件详细类型
`sub_type` | string | 事件子类型（详细类型的下一级类型）

除元事件外，其它事件类型还必须具有下面这些字段：

字段名 | 数据类型 | 说明
--- | --- | ---
`self` | self | 机器人自身标识

!!! tip "提示"

    若一个数据中缺失上述任一字段或类型错误，则不应认为该数据是有效的事件。

除了上述基本字段之外，其它字段随 `type` 和 `detail_type` 的不同而不同，也允许 OneBot 实现在一定规则下扩展，具体在 [接口定义](../../interface/index.md) 中描述。

## 例子

一个以 JSON 编码的事件例子如下：

```json
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
        }
    ],
    "alt_message": "OneBot is not a bot",
    "user_id": "123456788",
    "qq.nickname": "海阔天空"
}
```

消息数据类型是在 OneBot 标准中表示聊天消息内容的数据类型，标准中使用 `message` 表示该类型。

在 OneBot 实现传给应用端的事件字段和动作响应数据中，消息数据类型必须是消息段数组/列表。

在由应用端传给 OneBot 实现的动作请求参数中，消息数据类型建议是消息段数组/列表，也可以是单个消息段或字符串。对于字符串，OneBot 实现应将其理解为单个纯文本消息段组成的消息。

## 消息段

消息段的数据类型为 `object`，其中必须包含以下字段：

字段名 | 数据类型 | 说明
--- | --- | ---
`type` | string | 消息段名称
`data` | map[string]any | 消息段参数

一个以 JSON 编码的消息段例子如下：

```json
{
    "type": "image",
    "data": {
        "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16"
    }
}
```

## 替代表示

以消息段数组/列表形式表示消息虽然提高了对多媒体消息的表示能力，但对不关心特殊消息类型的用户来说，解析门槛也提高了。为了让这部分用户能更方便地处理消息，在消息事件中添加了字符串类型的 `alt_message` 字段，作为消息的纯文本替代表示。

消息替代表示中，纯文本消息段的内容应原样表示为字符串，其它消息段应表示为适当的形式，建议表示为人类可读的形式，例如 `这是一段纯文本[图片][表情:憨笑]`。

## 例子

以 JSON 编码的动作请求中消息类型参数的例子：

```json
{
    "action": "send_message",
    "params": {
        "detail_type": "private",
        "user_id": "1234567",
        "message": [
            {
                "type": "text",
                "data": {
                    "text": "这是一个纯文本消息段"
                }
            }
        ]
    }
}
```

以 JSON 编码的事件中消息类型字段的例子：

```json
{
    "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
    "self": {
        "platform": "qq",
        "user_id": "123234"
    },
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
}
```

OneBot 实现可以对事件、动作、消息段进行扩展，在扩展时，建议对扩展的字段、类型、名称使用 `<prefix>.` 前缀（注意点号），其中 `<prefix>` 可以是机器人平台名称、机器人平台名称缩写、OneBot 实现名称（部分特殊字符可能需要替换）、OneBot 实现名称缩写或实现自行定义的其它值，格式必须符合 `[_a-z]+`。

!!! caution "注意"

    OneBot 标准不再强制要求在扩展接口时添加前缀，但不同实现随意命名可能会对用户造成困扰，因此建议在扩展接口时，尽量参考现存的其它实现的命名，或与其它实现的作者进行交流。

    另外，对前缀的格式要求与机器人平台名称和 OneBot 实现名称的格式要求不同。

下面的具体的扩展规则中不再对前缀的表示和格式进行赘述，只称其为**前缀**。

## 事件

### 扩展事件字段

OneBot 实现可以在标准事件的基础上添加扩展字段，扩展字段名建议包含前缀，扩展字段值任意。

例子：

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
        ],
        "alt_message": "OneBot is not a bot",
        "group_id": "12345",
        "user_id": "8000000",
        "qq.raw_event_id": "78e9d2bb530b431",
        "qq.anonymous": {
            "name": "齐天大圣",
            "id": "87364587"
        }
    }
```

OneBot 实现可以扩展标准事件的子类型（`sub_type`），扩展的子类型建议包含前缀。

例子：

```json
{
    "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
    "self": {
        "platform": "qq",
        "user_id": "123234"
    },
    "time": 1632847927.599013,
    "type": "notice",
    "detail_type": "friend_increase",
    "sub_type": "qq.unidirectional",
    "user_id": "123456788"
}
```

### 扩展事件

OneBot 实现不得扩展事件的基本类型（`type`）。

OneBot 实现可以扩展事件的具体类型（`detail_type`），扩展的具体事件称为**扩展事件**，扩展的具体事件类型建议包含前缀。扩展事件仍必须包含 [OneBot Connect - 事件](../connect/data-protocol/event.md) 中定义的所有字段，除此之外的字段可以任意命名。

例子：

```json
{
    "id": "b6e65187-5ac0-489c-b431-53078e9d2bbb",
    "self": {
        "platform": "qq",
        "user_id": "123234"
    },
    "time": 1632847927.599013,
    "type": "notice",
    "detail_type": "qq.group_file_upload",
    "sub_type": "",
    "group_id": "87654321",
    "user_id": "123456788",
    "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16"
}
```

## 动作

### 扩展动作参数

OneBot 实现可以在标准动作参数的基础上添加扩展参数，扩展参数名建议包含前缀，扩展参数值任意。

例子：

```json
{
    "action": "send_message",
    "params": {
        "detail_type": "group",
        "group_id": "123456",
        "message": [
            {
                "type": "text",
                "data": {
                    "text": "blah blah blah"
                }
            }
        ],
        "qq.anonymous": true
    }
}
```

### 扩展动作响应数据

OneBot 实现可以在标准动作响应数据的基础上添加扩展字段，扩展字段名建议包含前缀，扩展字段值任意。

例子：

```json
{
    "status": "ok",
    "retcode": 0,
    "data": {
        "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16",
        "dc.url": "https://cdn.discordapp.com/attachments/847819937858584599/894098742922338315/SAH3YJ26CBB7KBK41.jpg"
    },
    "message": ""
}
```

### 扩展动作

OneBot 实现可以支持扩展的动作（`action`），称为**扩展动作**，扩展动作的名称建议包含前缀。扩展动作的请求和响应仍必须包含 [OneBot Connect - 动作请求](../connect/data-protocol/action-request.md) 和 [OneBot Connect - 动作响应](../connect/data-protocol/action-response.md) 中定义的所有字段，但具体的动作参数和动作响应数据字段可以任意命名。

例子：

```json
{
    "action": "qq.get_group_honor_info",
    "params": {
        "group_id": "123456"
    }
}
```

## 消息段

### 扩展消息段参数

OneBot 实现可以在标准消息段参数的基础上添加扩展参数，扩展参数名建议包含前缀，扩展参数值任意。

例子：

```json
{
    "type": "image",
    "data": {
        "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16",
        "dc.url": "https://cdn.discordapp.com/attachments/847819937858584599/894098742922338315/SAH3YJ26CBB7KBK41.jpg"
    }
}
```

### 扩展消息段

OneBot 实现可以支持扩展的消息段类型（`type`），称为**扩展消息段**，扩展消息段类型建议包含前缀。扩展消息段仍必须包含 [消息](message/type.md) 中定义的所有字段。

扩展消息段的参数（`data` 字段中的内容）不得使用名字 `type`，除此之外可以任意命名。

!!! tip "提示"

    规定 `type` 为保留关键字后，OneBot SDK 和开发框架的作者可以选择将 `data` 字段拉平，以方便用户使用。

例子：

```json
{
    "type": "qq.face",
    "data": {
        "id": "123"
    }
}
```

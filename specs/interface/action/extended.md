## 扩展动作参数

OneBot 实现**可以**在标准动作参数的基础上添加扩展参数，扩展参数名**必须**包含前缀，扩展参数值任意。

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

## 扩展动作响应数据

OneBot 实现**可以**在标准动作响应数据的基础上添加扩展字段，扩展字段名**必须**包含前缀，扩展字段值任意。

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

## 扩展动作

OneBot 实现**可以**支持扩展的动作（`action`），称为**扩展动作**，扩展动作的名称**必须**包含前缀。扩展动作的请求和响应仍**必须**包含 [OneBotRPC - 动作请求](../../onebotrpc/data-protocol/action-request.md) 和 [OneBotRPC - 动作响应](../../onebotrpc/data-protocol/action-response.md) 中定义的所有字段，但具体的动作参数和动作响应数据字段可以任意命名。

例子：

```json
{
    "action": "qq.get_group_honor_info",
    "params": {
        "group_id": "123456"
    }
}
```

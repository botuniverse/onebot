## 扩展消息段参数

OneBot 实现**可以**在标准消息段参数的基础上添加扩展参数，扩展参数名**必须**包含前缀，扩展参数值任意。

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

## 扩展消息段

OneBot 实现**可以**支持扩展的消息段类型（`type`），称为**扩展消息段**，扩展消息段类型**必须**包含前缀。扩展消息段仍**必须**包含 [消息](../type/message.md) 中定义的所有字段，但具体的参数可以任意命名。

例子：

```json
{
    "type": "qq.face",
    "data": {
        "id": "123"
    }
}
```

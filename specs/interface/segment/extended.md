## 扩展消息段参数

OneBot 实现可以在标准消息段参数的基础上添加扩展参数，扩展参数名必须包含前缀，扩展参数值任意。

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

OneBot 实现可以支持扩展的消息段类型（`type`），称为**扩展消息段**，扩展消息段类型必须包含前缀。扩展消息段仍必须包含 [消息](../type/message.md) 中定义的所有字段。

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

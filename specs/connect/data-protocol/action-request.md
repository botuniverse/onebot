**动作请求**是应用端为了主动向 OneBot 实现请求服务而发送的数据。

## 格式

动作请求应表示为一个字典/映射/对象，且必须具有下面这些字段：

字段名 | 数据类型 | 说明
--- | --- | ---
`action` | string | 动作名称，如 `send_message`
`params` | map[string]any | 动作参数

!!! tip "提示"

    若一个数据中缺失上述任一字段或类型错误，则不应认为该数据是有效的动作请求。

除此之外，应用端可以附加以下字段：

字段名 | 数据类型 | 说明
--- | --- | ---
`echo` | string | 可以用于唯一标识一个动作请求

## 例子

一个以 JSON 编码的动作请求例子如下：

```json
{
    "action": "send_message",
    "params": {
        "detail_type": "private",
        "user_id": "123445667",
        "message": "嗨～"
    },
    "echo": "1234"
}
```

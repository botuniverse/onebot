**动作请求**是应用端为了主动向 OneBot 实现请求服务而发送的数据。

## 格式

动作请求应表示为一个对象（`object` 类型），且必须具有下面这些字段：

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

当多个机器人账号共享一个 OneBot Connect 连接时，除元动作外的其它动作请求还应具有下面这些字段：

字段名 | 数据类型 | 说明
--- | --- | ---
`self` | self | 机器人自身标识

若请求没有传入 `self`，则行为由 OneBot 实现确定，其可以返回响应码 `10101 Who Am I`；若请求传入的 `self` 所指定的机器人账号不存在，实现应返回 `10102 Unknown Self`。

当 OneBot Connect 连接不共享时，除元动作外的其它动作请求也可以含有 `self` 字段，若 `self` 所指定的机器人账号不存在，实现应返回 `10102 Unknown Self`。

元动作请求不需要包含 `self` 字段，若包含，实现可以忽略，也可以按上述逻辑处理。

## 例子

一个以 JSON 编码的动作请求例子如下：

```json
{
    "action": "send_message",
    "params": {
        "detail_type": "private",
        "user_id": "123445667",
        "message": [
            {
                "type": "text",
                "data": {
                    "text": "嗨～"
                }
            }
        ]
    },
    "echo": "1234"
}
```

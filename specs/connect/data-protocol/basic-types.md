## 任意类型

`any`

## 整数

`int64`、`uint64`、`int32`、`uint32`、`int16`、`uint16`、`int8`、`uint8`

## 浮点数

`float64`

## 字符串

`string`

## 字节序列

`bytes`

在 JSON 中表示为 Base64 编码的字符串，MessagePack 中表示为 bin 格式的字节数组。

## 字典/映射/对象

`map[<key_type>]<value_type>`

其中，`<key_type>` 为键类型，`<value_type>` 为值类型。

## 动作响应数据

``resp[`<action_name>`]``

其中，`<action_name>` 为动作名。

## 机器人自身标识

`self`

继承自 `map[string]any` 类型，用于唯一标识一个机器人账号，应包含以下字段：

字段名 | 数据类型 | 说明
--- | --- | ---
`platform` | `string` | 机器人平台名称
`user_id` | `string` | 机器人用户 ID

以 JSON 编码的例子如下：

```json
{
    "platform": "telegram",
    "user_id": "foobar"
}
```

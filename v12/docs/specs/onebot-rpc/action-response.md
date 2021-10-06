# OneBot RPC - 动作响应

OneBot 标准中包含了对传输数据格式的规定和要求，下面是对动作响应（Action Response）的定义和传输的说明。

## 格式

- 每个动作响应的数据都**必须**使用 JSON 或 MsgPack 格式进行传递
- 动作响应**必须**由 OneBot 实现或 LibOneBot 库返回给 OneBot 逻辑代码端

## 字段

动作响应**必须**包含以下字段：

字段名 | 变量类型 | 说明
--- | --- | ---
`retcode` | int | 状态码，有关状态码的规定，见 [OneBot RPC - 状态码](../retcode)
`data` | array 或 null | 返回的数据
`message` | string | 如果状态码返回异常，**推荐**在此填写相应的提示语，如果没有错误，则为空字符串

为了提升用户的体验，动作响应**应该**包含以下字段：

字段名 | 变量类型 | 说明
--- | --- | ---
`status` | string | ok 或 failed

以下为合规的动作响应数据格式：
```json
{
    "status": "ok",
    "retcode": 0,
    "data": {
        "user_id": "123456",
        "nickname": "滑稽"
    }
}
```

```json
{
    "status": "failed",
    "retcode": 11002,
    "message": "动作 `blahblah` 不存在",
    "data": []
}
```
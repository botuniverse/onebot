# OneBot RPC - 动作

OneBot 标准中包含了对传输数据格式的规定和要求，下面是对动作（Action）的定义和传输的说明。

## 格式

- 每个动作的数据都**必须**使用 JSON 或 MsgPack 格式进行传递
- 动作**必须**由 OneBot 机器人逻辑端发出，由 OneBot 实现或 LibOneBot 库进行处理
- 每个动作**必须**有动作响应，由 OneBot 实现或 LibOneBot 库响应，详见 [OneBot RPC - 动作响应](../action-response)

## 字段

动作分为核心动作（Core Action Set）和扩展动作（Extended Actions），扩展动作必须带有响应平台的前缀，如 `qq_`。

无论是核心动作还是扩展动作，都**必须**包含以下字段：

字段名 | 变量类型 | 说明
--- | --- | ---
`action` | string | 动作名称，如 `send_message`
`params` | array | 动作参数，比如包含发送的目标和类型，以及消息内容等

对于动作，**建议**包含以下字段：

字段名 | 变量类型 | 说明
--- | --- | ---
`echo` | mixed | 标记动作本身的字段，OneBot 实现或 LibOneBot 在响应动作时应作为原样返回

对于核心动作集要求包含的字段及相关标准，见`(待定)`。

对于动作扩展时要注意：

- 核心动作的扩展参数：加 `platform` 前缀，如 `params.qq_nickname`
- 扩展动作的 `action`：加 `platform` 前缀，同时其它参数任意扩展，如 `qq_get_group_honor_info`

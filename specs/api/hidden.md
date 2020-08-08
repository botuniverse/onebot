# 隐藏 API

隐藏 API 是不建议一般用户使用的，它们只应该在 CQHTTP 实现内部或由 SDK 使用，因为不正确的使用可能造成 CQHTTP 运行不正常。

所有隐藏 API 都以点号（`.`）开头。

## `.handle_quick_operation` 对事件执行快速操作

### 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| ----- | ------- | ----- | --- |
| `context` | object | - | 事件上报的数据对象 |
| `operation` | object | - | 快速操作对象，例如 `{"ban": true, "reply": "请不要说脏话"}` |

### 响应数据

无

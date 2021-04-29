# 隐藏 API

- [`.handle_quick_operation` 对事件执行快速操作](#handle_quick_operation-对事件执行快速操作)

隐藏 API 是不建议一般用户使用的，它们只应该在 OneBot 实现内部或由 SDK 和框架使用，因为不正确的使用可能造成程序运行不正常。

所有隐藏 API 都以点号（`.`）开头。

## `.handle_quick_operation` 对事件执行快速操作

关于事件的快速操作，见 [快速操作](../event/#快速操作)。

### 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| ----- | ------- | ----- | --- |
| `context` | object | - | 事件数据对象，可做精简，如去掉 `message` 等无用字段 |
| `operation` | object | - | 快速操作对象，例如 `{"ban": true, "reply": "请不要说脏话"}` |

### 响应数据

无

<hr>

| 上一节 | 下一节 |
| --- | --- |
| [公开 API](public.md) | [事件概述](../event/README.md) |

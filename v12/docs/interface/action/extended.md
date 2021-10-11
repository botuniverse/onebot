!!! warning

    WIP

## 扩展动作参数

OneBot 实现**可以**在标准动作参数的基础上添加扩展参数，扩展参数名**必须**包含平台前缀，扩展参数值任意。

例子：

```json

```

## 扩展动作响应数据

OneBot 实现**可以**在标准动作响应数据的基础上添加扩展字段，扩展字段名**必须**包含平台前缀，扩展字段值任意。

例子：

```json

```

## 扩展动作

OneBot 实现**可以**支持扩展的动作（`action`），称为**扩展动作**，扩展动作的名称**必须**包含平台前缀。扩展动作的请求和响应仍**必须**包含 [OneBotRPC - 动作请求](../../onebotrpc/data-protocol/action-request.md) 和 [OneBotRPC - 动作响应](../../onebotrpc/data-protocol/action-response.md) 中定义的所有字段，但具体的动作参数和动作响应数据字段可以任意命名。

例子：

```json

```

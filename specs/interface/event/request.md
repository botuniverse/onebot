!!! tip "提示"

    本页所定义的事件均基于 [OneBotRPC - 事件](../../onebotrpc/data-protocol/event.md)，其中 `type` 字段值应为 `request`。

    后面的定义中只给出 `detail_type`、`sub_type` 和具体事件特定的字段，如果没有给出 `sub_type`，则该字段值可以为空字符串。

请求事件是聊天机器人收到其他用户发送的请求对应的一类事件，例如加好友请求等。

OneBot 标准目前没有定义标准请求事件。

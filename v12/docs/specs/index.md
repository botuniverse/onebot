# 指南

本篇规范制定了代码基本元素的相关标准，以确保 OneBot 标准兼容的开发流程具有较高程度的技术互通性。

本文件中的 `必须`，`不得`，`需要`，`应`，`不应`，`应该`，`不应该`，`推荐`，`可能` 和 `可选` 等能愿动词按照 [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt) 中的描述进行解释。

对于存在**争议**或待定的部分，规范中会使用 `(待定)` 字样进行标注。

- **通信**
    - [通信概述](communication/index.md)
    - [HTTP](communication/http.md)
    - [HTTP POST](communication/http-post.md)
    - [正向 WebSocket](communication/ws.md)
    - [反向 WebSocket](communication/ws-reverse.md)
    - [鉴权](communication/authorization.md)
- **消息**
    - [消息概述](message/README.md)
    - [字符串格式](message/string.md)
    - [数组格式](message/array.md)
    - [消息段类型](message/segment.md)
- **API**
    - [API 概述](api/README.md)
    - [公开 API](api/public.md)
    - [隐藏 API](api/hidden.md)
- **事件**
    - [事件概述](event/README.md)
    - [消息事件](event/message.md)
    - [通知事件](event/notice.md)
    - [请求事件](event/request.md)
    - [元事件](event/meta.md)
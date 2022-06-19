# OneBot 标准

OneBot 是一个聊天机器人应用接口标准，旨在统一不同聊天平台上的机器人应用开发接口，使开发者只需编写一次业务逻辑代码即可应用到多种机器人平台。

!!! tip "提示"

    如果本页有看不懂的词汇，请参考 [术语表](glossary.md)。

## OneBot 标准是什么？

OneBot 标准是对开发聊天机器人所使用的 API 的一个抽象，是对聊天机器人 API 的通信方式、传输的数据格式和字段等的一个标准化定义。如果将 OneBot 标准类比于 C 语言、ECMAScript、POSIX 标准等，则 OneBot 实现对应 GCC、Chrome V8、Linux 等。

## OneBot 标准不是什么？

OneBot 标准，即本网站上的所有内容，只是一个文档，OneBot 标准本身没有一个中心化的官方实现，而是依赖社区中有兴趣、有能力的开发者们针对各个语言/运行时实现 LibOneBot、基于 LibOneBot 针对各个机器人平台实现 OneBot 标准、基于 OneBot 标准实现各种开发框架。

## 组成部分

OneBot 标准由 OneBot Connect 和接口定义两部分组成：

- OneBot Connect 规定了 OneBot 应用与 OneBot 实现之间通过网络交互所使用的通信方式和数据协议
- 接口定义描述了一组标准事件、动作、消息段和它们的扩展规则

## 文档用词

本文档中的 `必须`（MUST）、`不得`（MUST NOT）、`应`/`应该`（SHALL）、`不应`/`不应该`（SHALL NOT）、`建议`（RECOMMENDED）、`不建议`（NOT RECOMMENDED）、`可以`（MAY）和 `可选`（OPTIONAL）等能愿动词按照 [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt) 中的描述进行解释。

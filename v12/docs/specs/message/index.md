# 消息

消息是 OneBot 标准中的一个重要内容，其规定了消息的收发格式。

数组格式将消息表示为一系列消息段对象的数组，表达能力较强，覆盖几乎所有复杂文本类型的消息。

首先，OneBot V12 标准规定，所有 `message` 字段必须为 `array` 类型。

## 消息段

在原 OneBot V11 标准中，使用 CQ 码的形式作为富文本传输，而消息段就是将存在 CQ 码的地方等量替换为数组格式。在字符串格式中，使用 CQ 码表示多媒体内容，例如 `[CQ:image,file=123.jpg]`，这里 CQ 码功能名为 `image`，参数为 file=123.jpg，也即一个键值对。

V12 标准下强制要求为 array 格式消息段，消息段是 CQ 码在数组格式中的表示形式，基本格式如下：

```json
{
    "type": "image",
    "data": {
        "file": "123.jpg"
    }
}
```

其中 `type` 为必需字段，对应原 CQ 码中的功能名，`data` 段对应原参数内容。

在 V12 中，新引入的媒体文件概念的加持下，一条普通包含图片的文本**应该**表现为如下形式：

```json
[
    {"type": "text", "data": {"text": "blah"}},
    {"type": "image", "data": {"file_id": "blahblah"}}
]
```

OneBot 标准中规定，基础的消息段 `type` - `data` 对应字段**必须**遵守以下规则：

消息段类型 | 收 | 发 | 需要的参数名 | 说明
--- | --- | --- | --- | ---
`text` | ✓ | ✓ | `text` | 普通文本消息
`image` | ✓ | ✓ | `file_id` | 图片消息
`voice` | ✓ | ✓ | `file_id` | 语音消息
`file` | ✓ | - | `file_id` | 文件消息
`mention` | ✓ | ✓ | `user_id` | 提及一个用户（原 At 用户）
`video` | ✓ | ✓ | `file_id` | 视频或短视频消息
`location` | ✓ | ✓ | `lat`、`lon`、`title`、`content` | 位置信息，参数分别代表经、纬、标题、内容
`reply` | ✓ | ✓ | `message_id`、`user_id` | 引用之前的信息（例如 QQ 上对应为 `回复` 功能），`user_id` 在发送时多出来的 At 操作可以与之合并

这里说的对应关系是为了最低限度保证开发者**可以**只完成对 OneBot 标准在内的基础消息解析功能，例如只进行对消息段文字部分的开发，其他忽略。

同时，在消息段支持多种富文本的概念下，不同 OneBot 实现或 LibOneBot 库**可以**对消息段进行额外扩充。比如在图片 `image` 字段中，可以直接包含图片的下载链接、或者小图的原 base64 数据等，方便用户进行一次读取，字段可以包含用户字体和大小等特殊格式字段。

下面的这个消息段也是符合 OneBot 标准的：

```json
[
    {
        "type": "text",
        "data": {
            "text": "我是大字",
            "size": "19px"
        }
    },
    {
        "type": "image",
        "data": {
            "media_id": "blablabla",
            "url": "https://example.com/example.png"
        }
    }
]
```

!!! tip "补充"

    对于消息字段，在显示时**不应**在不同消息段之间换行，例如你可以对同一条消息下分多个消息段，但在 OneBot 实现进行处理上不加换行符。

## 扩展消息段

对于不同平台，可能存在专有的一些消息类型，如 QQ 聊天会存在发红包操作，在不同平台实现的专有消息类型，**必须**包含对应平台的前缀，如 `qq_redbag`。

比如我们定义一个红包的消息事件的消息段内容如下：

```json
[
    {"type": "qq_redbag", "data": {"title": "恭喜发财，大吉大利"}}
]
```

在 QQ 等实际层面可能显示为一个红包。

不同的 OneBot 实现**必须**提供自身对 OneBot 标准扩展内容的说明，例如哪些消息段支持收发。

## alt_message 字段说明

前面 OneBot RPC 中说明了事件的字段，在 OneBot 实现和 LibOneBot 库中，**必须**支持将 `message` 转换为 `alt_message` 的功能。

以一条混合消息为例，`我是文字巴拉巴拉巴拉`，后面含有一张图片，在消息段形式展示格式如下：

```json
[
    {"type": "text", "data": {"text": "我是文字巴拉巴拉巴拉"}},
    {"type": "image", "data": {"media_id": "blahblah"}}
]
```

在 `alt_message` 中，**可以**转换为：`我是文字巴拉巴拉巴拉[图片]` 的形式。
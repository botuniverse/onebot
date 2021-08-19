# 消息段类型

- [纯文本](#纯文本)
- [QQ 表情](#qq-表情)
- [图片](#图片)
- [语音](#语音)
- [短视频](#短视频)
- [@某人](#某人)
- [猜拳魔法表情](#猜拳魔法表情)
- [掷骰子魔法表情](#掷骰子魔法表情)
- [窗口抖动（戳一戳） <Badge text="发"/>](#窗口抖动戳一戳-badge-text发)
- [戳一戳](#戳一戳)
- [匿名发消息 <Badge text="发"/>](#匿名发消息-badge-text发)
- [链接分享](#链接分享)
- [推荐好友](#推荐好友)
- [推荐群](#推荐群)
- [位置](#位置)
- [音乐分享 <Badge text="发"/>](#音乐分享-badge-text发)
- [音乐自定义分享 <Badge text="发"/>](#音乐自定义分享-badge-text发)
- [回复](#回复)
- [合并转发 <Badge text="收"/>](#合并转发-badge-text收)
- [合并转发节点 <Badge text="发"/>](#合并转发节点-badge-text发)
- [合并转发自定义节点](#合并转发自定义节点)
- [XML 消息](#xml-消息)
- [JSON 消息](#json-消息)

对于每一种消息段类型，将分别给出消息段格式和 CQ 码格式的例子，然后解释各参数的含义。

下面所有可能的值为 `0` 和 `1` 的参数，也可以使用 `no` 和 `yes`、`false` 和 `true`。

## 纯文本

```json
{
    "type": "text",
    "data": {
        "text": "纯文本内容"
    }
}
```

```
纯文本内容
```

| 参数名| 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `text` | ✓ | ✓ | - | 纯文本内容 |

## QQ 表情

```json
{
    "type": "face",
    "data": {
        "id": "123"
    }
}
```

```
[CQ:face,id=123]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | ✓ | ✓ | 见 [QQ 表情 ID 表](https://github.com/richardchien/coolq-http-api/wiki/%E8%A1%A8%E6%83%85-CQ-%E7%A0%81-ID-%E8%A1%A8) | QQ 表情 ID |

## 图片

```json
{
    "type": "image",
    "data": {
        "file": "http://baidu.com/1.jpg"
    }
}
```

```
[CQ:image,file=http://baidu.com/1.jpg]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `file` | ✓ | ✓<sup>[1]</sup> | - | 图片文件名 |
| `type` | ✓ | ✓ | `flash` | 图片类型，`flash` 表示闪照，无此参数表示普通图片 |
| `url` | ✓ |  | - | 图片 URL |
| `cache` |  | ✓ | `0` `1` | 只在通过网络 URL 发送时有效，表示是否使用已缓存的文件，默认 `1` |
| `proxy` |  | ✓ | `0` `1` | 只在通过网络 URL 发送时有效，表示是否通过代理下载文件（需通过环境变量或配置文件配置代理），默认 `1` |
| `timeout` |  | ✓ | - | 只在通过网络 URL 发送时有效，单位秒，表示下载网络文件的超时时间，默认不超时 |

[1] 发送时，`file` 参数除了支持使用收到的图片文件名直接发送外，还支持：

- 绝对路径，例如 `file:///C:\\Users\Richard\Pictures\1.png`，格式使用 [`file` URI](https://tools.ietf.org/html/rfc8089)
- 网络 URL，例如 `http://i1.piimg.com/567571/fdd6e7b6d93f1ef0.jpg`
- Base64 编码，例如 `base64://iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAIAAADJt1n/AAAAKElEQVQ4EWPk5+RmIBcwkasRpG9UM4mhNxpgowFGMARGEwnBIEJVAAAdBgBNAZf+QAAAAABJRU5ErkJggg==`

## 语音

```json
{
    "type": "record",
    "data": {
        "file": "http://baidu.com/1.mp3"
    }
}
```

```
[CQ:record,file=http://baidu.com/1.mp3]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `file` | ✓ | ✓<sup>[1]</sup> | - | 语音文件名 |
| `magic` | ✓ | ✓ | `0` `1` | 发送时可选，默认 `0`，设置为 `1` 表示变声 |
| `url` | ✓ |  | - | 语音 URL |
| `cache` |  | ✓ | `0` `1` | 只在通过网络 URL 发送时有效，表示是否使用已缓存的文件，默认 `1` |
| `proxy` |  | ✓ | `0` `1` | 只在通过网络 URL 发送时有效，表示是否通过代理下载文件（需通过环境变量或配置文件配置代理），默认 `1` |
| `timeout` |  | ✓ | - | 只在通过网络 URL 发送时有效，单位秒，表示下载网络文件的超时时间 ，默认不超时|

[1] 发送时，`file` 参数除了支持使用收到的语音文件名直接发送外，还支持其它形式，参考 [图片](#图片)。

## 短视频

```json
{
    "type": "video",
    "data": {
        "file": "http://baidu.com/1.mp4"
    }
}
```

```
[CQ:video,file=http://baidu.com/1.mp4]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `file` | ✓ | ✓<sup>[1]</sup> | - | 视频文件名 |
| `url` | ✓ |  | - | 视频 URL |
| `cache` |  | ✓ | `0` `1` | 只在通过网络 URL 发送时有效，表示是否使用已缓存的文件，默认 `1` |
| `proxy` |  | ✓ | `0` `1` | 只在通过网络 URL 发送时有效，表示是否通过代理下载文件（需通过环境变量或配置文件配置代理），默认 `1` |
| `timeout` |  | ✓ | - | 只在通过网络 URL 发送时有效，单位秒，表示下载网络文件的超时时间 ，默认不超时|

[1] 发送时，`file` 参数除了支持使用收到的视频文件名直接发送外，还支持其它形式，参考 [图片](#图片)。

## @某人

```json
{
    "type": "at",
    "data": {
        "qq": "10001000"
    }
}
```

```
[CQ:at,qq=10001000]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `qq` | ✓ | ✓ | QQ 号、`all` | @的 QQ 号，`all` 表示全体成员 |

## 猜拳魔法表情

```json
{
    "type": "rps",
    "data": {}
}
```

```
[CQ:rps]
```

## 掷骰子魔法表情

```json
{
    "type": "dice",
    "data": {}
}
```

```
[CQ:dice]
```

## 窗口抖动（戳一戳） <Badge text="发"/>

> **提示**
>
> 相当于戳一戳最基本类型的快捷方式。

```json
{
    "type": "shake",
    "data": {}
}
```

```
[CQ:shake]
```

## 戳一戳

```json
{
    "type": "poke",
    "data": {
        "type": "126",
        "id": "2003"
    }
}
```

```
[CQ:poke,type=126,id=2003]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | ✓ | ✓ | 见 [Mirai 的 PokeMessage 类](https://github.com/mamoe/mirai/blob/f5eefae7ecee84d18a66afce3f89b89fe1584b78/mirai-core/src/commonMain/kotlin/net.mamoe.mirai/message/data/HummerMessage.kt#L49) | 类型 |
| `id` | ✓ | ✓ | 同上 | ID |
| `name` | ✓ |  | 同上 | 表情名 |

## 匿名发消息 <Badge text="发"/>

> **提示**
>
> 当收到匿名消息时，需要通过 [消息事件的群消息](../event/message.md#群消息) 的 `anonymous` 字段判断。

```json
{
    "type": "anonymous",
    "data": {}
}
```

```
[CQ:anonymous]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `ignore` |  | ✓ | `0` `1` | 可选，表示无法匿名时是否继续发送 |

## 链接分享

```json
{
    "type": "share",
    "data": {
        "url": "http://baidu.com",
        "title": "百度"
    }
}
```

```
[CQ:share,url=http://baidu.com,title=百度]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `url` | ✓ | ✓ | - | URL |
| `title` | ✓ | ✓ | - | 标题 |
| `content` | ✓ | ✓ | - | 发送时可选，内容描述 |
| `image` | ✓ | ✓ | - | 发送时可选，图片 URL |

## 推荐好友

```json
{
    "type": "contact",
    "data": {
        "type": "qq",
        "id": "10001000"
    }
}
```

```
[CQ:contact,type=qq,id=10001000]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | ✓ | ✓ | `qq` | 推荐好友 |
| `id` | ✓ | ✓ | - | 被推荐人的 QQ 号 |

## 推荐群

```json
{
    "type": "contact",
    "data": {
        "type": "group",
        "id": "100100"
    }
}
```

```
[CQ:contact,type=group,id=100100]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | ✓ | ✓ | `group` | 推荐群 |
| `id` | ✓ | ✓ | - | 被推荐群的群号 |

## 位置

```json
{
    "type": "location",
    "data": {
        "lat": "39.8969426",
        "lon": "116.3109099"
    }
}
```

```
[CQ:location,lat=39.8969426,lon=116.3109099]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `lat` | ✓ | ✓ | - | 纬度 |
| `lon` | ✓ | ✓ | - | 经度 |
| `title` | ✓ | ✓ | - | 发送时可选，标题 |
| `content` | ✓ | ✓ | - | 发送时可选，内容描述 |

## 音乐分享 <Badge text="发"/>

```json
{
    "type": "music",
    "data": {
        "type": "163",
        "id": "28949129"
    }
}
```

```
[CQ:music,type=163,id=28949129]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` |  | ✓ | `qq` `163` `xm` | 分别表示使用 QQ 音乐、网易云音乐、虾米音乐 |
| `id` |  | ✓ | - | 歌曲 ID |

## 音乐自定义分享 <Badge text="发"/>

```json
{
    "type": "music",
    "data": {
        "type": "custom",
        "url": "http://baidu.com",
        "audio": "http://baidu.com/1.mp3",
        "title": "音乐标题"
    }
}
```

```
[CQ:music,type=custom,url=http://baidu.com,audio=http://baidu.com/1.mp3,title=音乐标题]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` |  | ✓ | `custom` | 表示音乐自定义分享 |
| `url` |  | ✓ | - | 点击后跳转目标 URL |
| `audio` |  | ✓ | - | 音乐 URL |
| `title` |  | ✓ | - | 标题 |
| `content` |  | ✓ | - | 发送时可选，内容描述 |
| `image` |  | ✓ | - | 发送时可选，图片 URL |

## 回复

```json
{
    "type": "reply",
    "data": {
        "id": "123456"
    }
}
```

```
[CQ:reply,id=123456]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | ✓ | ✓ | - | 回复时引用的消息 ID |

## 合并转发 <Badge text="收"/>

```json
{
    "type": "forward",
    "data": {
        "id": "123456"
    }
}
```

```
[CQ:forward,id=123456]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | ✓ |  | - | 合并转发 ID，需通过 [`get_forward_msg` API](../api/public.md#get_forward_msg-获取合并转发消息) 获取具体内容 |

## 合并转发节点 <Badge text="发"/>

```json
{
    "type": "node",
    "data": {
        "id": "123456"
    }
}
```

```
[CQ:node,id=123456]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` |  | ✓ | - | 转发的消息 ID |

## 合并转发自定义节点

> **注意**
>
> 接收时，此消息段不会直接出现在消息事件的 `message` 中，需通过 [`get_forward_msg` API](../api/public.md#get_forward_msg-获取合并转发消息) 获取。

**例 1**

```json
{
    "type": "node",
    "data": {
        "user_id": "10001000",
        "nickname": "某人",
        "content": "[CQ:face,id=123]哈喽～"
    }
}
```

```
[CQ:node,user_id=10001000,nickname=某人,content=&#91;CQ:face&#44;id=123&#93;哈喽～]
```

**例 2**

```json
{
    "type": "node",
    "data": {
        "user_id": "10001000",
        "nickname": "某人",
        "content": [
            {"type": "face", "data": {"id": "123"}},
            {"type": "text", "data": {"text": "哈喽～"}}
        ]
    }
}
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `user_id` | ✓ | ✓ | - | 发送者 QQ 号 |
| `nickname` | ✓ | ✓ | - | 发送者昵称 |
| `content` | ✓ | ✓ | - | 消息内容，支持发送消息时的 `message` 数据类型，见 [API 的参数](../api/#参数) |

## XML 消息

```json
{
    "type": "xml",
    "data": {
        "data": "<?xml ..."
    }
}
```

```
[CQ:xml,data=<?xml ...]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `data` | ✓ | ✓ | - | XML 内容 |

## JSON 消息

```json
{
    "type": "json",
    "data": {
        "data": "{\"app\": ..."
    }
}
```

```
[CQ:json,data={"app": ...]
```

| 参数名 | 收 | 发 | 可能的值 | 说明 |
| --- | --- | --- | --- | --- |
| `data` | ✓ | ✓ | - | JSON 内容 |

<hr>

| 上一节 | 下一节 |
| --- | --- |
| [数组格式](array.md) | [API 概述](../api/README.md) |

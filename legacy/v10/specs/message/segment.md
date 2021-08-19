# 消息段类型

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
| `file` | ✓ | ✓<sup>[1]</sup> | - | 图片文件，相对于 `data/image` 目录的相对路径 |
| `url` | ✓ |  | - | 图片 URL |
| `cache` |  | ✓ | `0` `1` | 只在通过网络 URL 发送时有效，表示是否使用已缓存的文件 |
| `timeout` |  | ✓ | - | 只在通过网络 URL 发送时有效，单位秒，表示下载网络文件的超时时间 |

[1] 发送时，`file` 参数除了支持相对 `data/image` 的路径外，还支持：

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
| `file` | ✓ | ✓<sup>[1]</sup> | - | 语音文件，相对于 `data/record` 目录的相对路径 |
| `magic` | ✓ | ✓ | `0` `1` | 发送时可选，默认 `0`，设置为 `1` 表示变声 |
| `url` | ✓ |  | - | 语音 URL |
| `cache` |  | ✓ | `0` `1` | 只在通过网络 URL 发送时有效，表示是否使用已缓存的文件 |
| `timeout` |  | ✓ | - | 只在通过网络 URL 发送时有效，单位秒，表示下载网络文件的超时时间 |

[1] 发送时，`file` 参数除了支持相对 `data/record` 的路径外，还支持其它形式，参考 [图片](#图片)。

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

## 戳一戳

```json
{
    "type": "shake",
    "data": {}
}
```

```
[CQ:shake]
```

## 匿名发消息

:::tip 提示
此消息段类型只能发不能收，当收到匿名消息时，需要通过 [消息事件的群消息](../event/message.md#群消息) 的 `anonymous` 字段判断。
:::

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

## 音乐分享

:::tip 提示
此消息段类型只能发不能收。
:::

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

## 音乐自定义分享

:::tip 提示
此消息段类型只能发不能收。
:::

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

## 其它富文本内容

:::tip 提示
此消息段类型只能收不能发，且没有固定的参数，不再列出参数。
:::

```json
{
    "type": "rich",
    "data": {
        "...": "..."
    }
}
```

```
[CQ:rich,...]
```

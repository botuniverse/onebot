# CQ 码

CQ 码的使用方式和 CKYU 原生的 CQ 码兼容（关于原生 CQ 码的使用，请看 CKYU 文档的 [CQ码](https://docs.cqp.im/manual/cqcode/)），在要发送的消息中插入相应的代码即可，例如：

```
[CQ:face,id=14] [CQ:image,file=1.jpg]
```

对于字符串格式表示的消息，使用方式和原生 CQ 码完全兼容**意味着需要对特殊字符字符进行转义**，由于很多时候我们不需要使用 CQ 码，只需要发送文字消息就行了，这种情况下可以在请求 API 时加入 `auto_escape` 参数，这将会自动对整个消息的特殊字符进行转义，具体请看 [API 描述](API)。

而使用数组格式的消息段来表示 CQ 码，则无需进行转义。

除了原生的 CQ 码，CQHTTP 还提供了一些实用的增强功能（对字符串和数组格式的消息均有效，下面将以字符串为例），称之为「增强 CQ 码」。

## 增强功能列表

### 发送

#### 发送网络图片或语音

CKYU 原生的 CQ 码只能发送 `data\image` 文件夹里的图片、`data\record` 里的语音，增强 CQ 码支持设置 `file` 为网络链接，内部会首先把图片或语音下载到 `data` 中相应的文件夹，然后把 `file` 替换成下载好的本地文件名。例如：

```
[CQ:image,file=http://i1.piimg.com/567571/fdd6e7b6d93f1ef0.jpg]
[CQ:record,file=http://doora.qiniudn.com/35aIm.silk]
```

由于从网络下载可能比较耗时，插件默认情况下会在第二次发送同一链接时，直接采用本地缓存，如果要发送的图片或语音的链接内容有变，不宜使用缓存，则可以在 CQ 码中加入参数 `cache=0` 来刷新缓存，例如：

```
[CQ:image,cache=0,file=http://i1.piimg.com/567571/fdd6e7b6d93f1ef0.jpg]
```

如果需要对下载操作设置超时，可加入 `timeout` 参数（单位秒），例如：

```
[CQ:image,timeout=10,file=http://i1.piimg.com/567571/fdd6e7b6d93f1ef0.jpg]
```

另外，插一个题外话，如果要发送非 SILK 格式的音频文件，需要安装 CKYU 的 [语音组件](https://cqp.cc/t/21132)，否则会出现错误码 -11。

#### 发送文件系统中另一个地方的图片或语音

除了发送网络上的图片、语音，还可以发送本地文件系统中其它地方的图片、语音，使用 [`file` URI](https://tools.ietf.org/html/rfc8089) 格式，例如：

```
[CQ:image,file=file:///C:\Users\richard\Pictures\1.png]
[CQ:record,file=file:///C:\Users\richard\Music\1.mp3]
```

#### 发送 base64 编码的图片或语音

除了指定实体文件，也可以直接将文件用 base64 编码后放在 CQ 码参数中传递，使用 `base64://` 加 base64 编码，例如：

```
[CQ:image,file=base64://iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAIAAADJt1n/AAAAKElEQVQ4EWPk5+RmIBcwkasRpG9UM4mhNxpgowFGMARGEwnBIEJVAAAdBgBNAZf+QAAAAABJRU5ErkJggg==]
```

### 接收

#### 提取 cqimg 文件中的实际图片 URL

CKYU 收到的图片会放在 `data\image` 中，并且以文件名加 `.cqimg` 扩展名的形式存储为纯文本文件，实际的图片 URL 就在里面的 `url` 字段，增强 CQ 码会自动提取这个 URL，并添加到 CQ 码的 `url` 参数中。

例如，假设原 CQ 码如下：

```
[CQ:image,file=AE3062186A2073B33AB1F2BB2F58F3A4.jpg]
```

提取 URL 后，会更改为：

```
[CQ:image,file=AE3062186A2073B33AB1F2BB2F58F3A4.jpg,url=http://183.232.95.26/offpic_new/1002647525//8102132e-4ab0-46cf-a8e1-2f62185232cb/0]
```

如果提取不成功（读取文件失败），则不变。

**另外请注意，这个 URL 会在一定时间后过期（不确定多久），但 CKYU 在收到以前收过的图之后，仍然会返回同样的文件名，因此建议定期清理 `data\image` 目录以防止 URL 失效。**

## 原生 CQ 码的非官方补充

CQ 码虽然在一定程度上具有较强的消息表达能力，但由于 QQ 的经常更新以及 CKYU 协议的更新不及时，导致 CQ 码的使用中会遇到很多坑。要重新整理一份完整的 CQ 码列表比较麻烦，因此这里只给出一条一条的坑的记录，见 [CQ 码的坑](https://github.com/richardchien/coolq-http-api/wiki/CQ-%E7%A0%81%E7%9A%84%E5%9D%91)。

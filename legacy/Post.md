# 事件上报

## 上报方式

当配置文件中 `post_url` 配置项不为空时（**无论 `use_http` 是什么**），会将 CKYU 收到的事件通过 HTTP POST 上报，数据以 JSON 格式表示。上报的请求头中会包含一个 `X-Self-ID` 头来表示当前正在上报的机器人 QQ 号，如：

```http
POST / HTTP/1.1
X-Self-ID: 123456
```

如果 `secret` 配置项也不为空，则会在每次上报的请求头中加入 HMAC 签名，如：

```http
POST / HTTP/1.1
X-Signature: sha1=f9ddd4863ace61e64f462d41ca311e3d2c1176e2
X-Self-ID: 123456
```

签名以 `secret` 作为密钥，HTTP 正文作为消息，进行 HMAC SHA1 哈希，你的后端可以通过该哈希值来验证上报的数据确实来自 CQHTTP 插件。HMAC 介绍见 [密钥散列消息认证码](https://zh.wikipedia.org/zh-cn/%E9%87%91%E9%91%B0%E9%9B%9C%E6%B9%8A%E8%A8%8A%E6%81%AF%E9%91%91%E5%88%A5%E7%A2%BC)。

### HMAC SHA1 校验的示例

#### Python + Flask

```python
import hmac
from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['POST'])
def receive():
    sig = hmac.new(b'<your-key>', request.get_data(), 'sha1').hexdigest()
    received_sig = request.headers['X-Signature'][len('sha1='):]
    if sig == received_sig:
        # 请求确实来自于插件
        pass
    else:
        # 假的上报
        pass
```

#### Node.js + Koa

```js
const crypto = require('crypto');
const secret = 'some-secret';

// 在 Koa 的请求 context 中
ctx.assert(ctx.request.headers['x-signature'] !== undefined, 401);
const hmac = crypto.createHmac('sha1', secret);
hmac.update(ctx.request.rawBody);
const sig = hmac.digest('hex');
ctx.assert(ctx.request.headers['x-signature'] === `sha1=${sig}`, 403);
```

## 上报数据格式

每次上报的数据中必有的一个字段是 `post_type`，数据类型为字符串，用来指示此次上报的类型，有如下三种：

| 上报类型 | 说明 |
| ------- | --- |
| `message` | 收到消息 |
| `notice` | 群、讨论组变动等通知类事件 |
| `request` | 加好友请求、加群请求／邀请 |

其它字段随上报类型不同而有所不同，下面将在事件列表的「上报数据」标题下一一给出。

某些字段的值是一些固定的值，在表格的「可能的值」中给出，如果「可能的值」为空则表示没有固定的可能性。

另外，每一次上报都有下面几个字段，后面不再列出。

| 字段名 | 数据类型 | 说明 |
| ----- | ------- | ---- |
| `time` | number (int64) | 事件发生的时间戳 |
| `self_id` | number (int64) | 收到消息的机器人 QQ 号 |

关于上面的 `time` 字段，由于 CKYU 的某次更新中移除了消息事件的 `time` 参数，因此目前插件上报的数据中，`notice` 和 `request` 类型上报的 `time` 是 CKYU 原生给出的时间，而 `message` 类型的上报中的 `time` 是事件到达插件的时间，后者有可能和事件实际的发生时间有差别。

## 上报请求的响应数据格式

事件上报的后端可以在上报请求的响应中直接指定一些简单的操作，如快速回复、快速禁言等。如果不需要使用这个特性，返回 HTTP 响应状态码 204，或保持响应正文内容为空；如果需要，则使用 JSON 作为响应正文，`Content-Type` 响应头任意（目前不会进行判断），但设置为 `application/json` 最好，以便减少不必要的升级成本，因为如果以后有需求，可能会加入判断。

响应的 JSON 数据中，支持的操作随事件的不同而不同，会在后面的事件列表中的「响应数据」标题下一一给出。需要指出的是，**响应数据中的每个字段都是可选的**，只有在字段存在（明确要求进行操作）时，才会触发相应的操作，否则将保持对 CKYU 整体运行状态影响最小的行为（比如默认不拦截事件、不回复消息、不处理请求，具体的默认行为下面会给出）。

「响应数据」给出的表格中的「允许的值」表示该字段允许的数据值，如果你返回的值不在允许的值范围内，则会采用默认行为，「允许的值」为空表示不限制。

**每个事件都有一个共同的支持的操作，即 `block` 字段**，数据类型为 boolean，`true` 表示拦截事件（不再让后面的插件处理），否则表示忽略（不拦截），例如：

```json
{
    "block": true
}
```

如果你在处理上报请求时，返回上面的 JSON 作为响应，则优先级在 CQHTTP 之后的其它插件将不会再收到这个事件。

此 `block` 字段后面不再列出。

另外，`post_type` 为 `notice` 的上报请求，都只支持响应 `block` 字段，而不支持其它操作。

## 上报和回复中的数据类型

在下面对上报数据的描述中，「数据类型」使用 JSON 中的名字，例如 `string`、`number` 等。

特别地，数据类型 `message` 表示该参数是一个消息类型的参数。在上报数据中，`message` 的实际类型根据配置项 `post_message_format` 的不同而不同，`post_message_format` 设置为 `string` 和 `array` 分别对应字符串和消息段数组；而在上报请求的回复中，`message` 类型的字段允许接受字符串、消息段数组、单个消息段对象三种类型的数据。关于消息格式的更多细节请查看 [消息格式](Message)。

## 事件过滤

如果需要对事件进行过滤，以减小后端的负担，请参考 [事件过滤器](EventFilter)。

## 事件列表

### 私聊消息

#### 上报数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------- | ------- | ---- |
| `post_type` | string | `message` | 上报类型 |
| `message_type` | string | `private` | 消息类型 |
| `sub_type` | string | `friend`、`group`、`discuss`、`other` | 消息子类型，如果是好友则是 `friend`，如果从群或讨论组来的临时会话则分别是 `group`、`discuss` |
| `message_id` | number (int32) | - | 消息 ID |
| `user_id` | number (int64) | - | 发送者 QQ 号 |
| `message` | message | - | 消息内容 |
| `raw_message` | string | - | 原始消息内容 |
| `font` | number (int32) | - | 字体 |
| `sender` | object | - | 发送人信息 |

其中 `sender` 字段的内容如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------ | ---- |
| `user_id` | number (int64) | 发送者 QQ 号 |
| `nickname` | string | 昵称 |
| `sex` | string | 性别，`male` 或 `female` 或 `unknown` |
| `age` | number (int32) | 年龄 |

需要注意的是，`sender` 中的各字段是尽最大努力提供的，也就是说，不保证每个字段都一定存在，也不保证存在的字段都是完全正确的（缓存可能过期）。

##### 示例

```json
{
    "time": 1515204254,
    "post_type": "message",
    "message_type": "private",
    "sub_type": "friend",
    "message_id": 12,
    "user_id": 12345678,
    "message": "你好～",
    "raw_message": "你好～",
    "font": 456,
    "sender": {
        "nickname": "小不点",
        "sex": "male",
        "age": 18
    }
}
```

下面的其它事件同这个类似，将不再给出。

#### 响应数据

| 字段名 | 数据类型 | 说明 | 默认情况 |
| ----- | ------- | --- | ------- |
| `reply` | message | 要回复的内容 | 不回复 |
| `auto_escape` | boolean | 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 `reply` 字段是字符串时有效 | 不转义 |

### 群消息

#### 上报数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------- | ------- | --- |
| `post_type` | string | `message` | 上报类型 |
| `message_type` | string | `group` | 消息类型 |
| `sub_type` | string | `normal`、`anonymous`、`notice` | 消息子类型，正常消息是 `normal`，匿名消息是 `anonymous`，系统提示（如「管理员已禁止群内匿名聊天」）是 `notice` |
| `message_id` | number (int32) | - | 消息 ID |
| `group_id` | number (int64) | - | 群号 |
| `user_id` | number (int64) | - | 发送者 QQ 号 |
| `anonymous` | object | - | 匿名信息，如果不是匿名消息则为 null |
| `message` | message | - | 消息内容 |
| `raw_message` | string | - | 原始消息内容 |
| `font` | number (int32) | - | 字体 |
| `sender` | object | - | 发送人信息 |

其中 `anonymous` 字段的内容如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------ | ---- |
| `id` | number (int64) | 匿名用户 ID |
| `name` | string | 匿名用户名称 |
| `flag` | string | 匿名用户 flag，在调用禁言 API 时需要传入 |

`sender` 字段的内容如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------ | ---- |
| `user_id` | number (int64) | 发送者 QQ 号 |
| `nickname` | string | 昵称 |
| `card` | string | 群名片／备注 |
| `sex` | string | 性别，`male` 或 `female` 或 `unknown` |
| `age` | number (int32) | 年龄 |
| `area` | string | 地区 |
| `level` | string | 成员等级 |
| `role` | string | 角色，`owner` 或 `admin` 或 `member` |
| `title` | string | 专属头衔 |

需要注意的是，`sender` 中的各字段是尽最大努力提供的，也就是说，不保证每个字段都一定存在，也不保证存在的字段都是完全正确的（缓存可能过期）。尤其对于匿名消息，此字段不具有参考价值。

#### 响应数据

| 字段名 | 数据类型 | 说明 | 默认情况 |
| ----- | ------- | --- | ------- |
| `reply` | message | 要回复的内容 | 不回复 |
| `auto_escape` | boolean | 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 `reply` 字段是字符串时有效 | 不转义 |
| `at_sender` | boolean | 是否要在回复开头 at 发送者（自动添加），发送者是匿名用户时无效 | at 发送者 |
| `delete` | boolean | 撤回该条消息 | 不撤回 |
| `kick` | boolean | 把发送者踢出群组（需要登录号权限足够），**不拒绝**此人后续加群请求，发送者是匿名用户时无效 | 不踢 |
| `ban` | boolean | 把发送者禁言 `ban_duration` 指定时长，对匿名用户也有效 | 不禁言 |
| `ban_duration` | number | 禁言时长 | 30 分钟 |

### 讨论组消息

#### 上报数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------- | ------- | --- |
| `post_type` | string | `message` | 上报类型 |
| `message_type` | string | `discuss` | 消息类型 |
| `message_id` | number (int32) | - | 消息 ID |
| `discuss_id` | number (int64) | - | 讨论组 ID |
| `user_id` | number (int64) | - | 发送者 QQ 号 |
| `message` | message | - | 消息内容 |
| `raw_message` | string | - | 原始消息内容 |
| `font` | number (int32) | - | 字体 |
| `sender` | object | - | 发送人信息 |

其中 `sender` 字段的内容如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------ | ---- |
| `user_id` | number (int64) | 发送者 QQ 号 |
| `nickname` | string | 昵称 |
| `sex` | string | 性别，`male` 或 `female` 或 `unknown` |
| `age` | number (int32) | 年龄 |

#### 响应数据

| 字段名 | 数据类型 | 说明 | 默认情况 |
| ----- | ------- | --- | ------- |
| `reply` | message | 要回复的内容 | 不回复 |
| `auto_escape` | boolean | 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 `reply` 字段是字符串时有效 | 不转义 |
| `at_sender` | boolean | 是否要在回复开头 at 发送者（自动添加） | at 发送者 |

### 群文件上传

**注意：仅群文件上传表现为事件，好友发送文件在 CKYU 中没有独立的事件，而是直接表现为好友消息，请注意在编写业务逻辑时进行判断。**

#### 上报数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | ------- | ---- |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `group_upload` | 通知类型 |
| `group_id` | number (int64) | - | 群号 |
| `user_id` | number (int64) | - | 发送者 QQ 号 |
| `file` | object | - | 文件信息 |

其中 `file` 字段的内容如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------ | ---- |
| `id` | string | 文件 ID |
| `name` | string | 文件名 |
| `size` | number (int64) | 文件大小（字节数） |
| `busid` | number (int64) | busid（目前不清楚有什么作用） |

### 群管理员变动

#### 上报数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `group_admin` | 通知类型 |
| `sub_type` | string | `set`、`unset` | 事件子类型，分别表示设置和取消管理员 |
| `group_id` | number (int64) | - | 群号 |
| `user_id` | number (int64) | - | 管理员 QQ 号 |

### 群成员减少

#### 上报数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `group_decrease` | 通知类型 |
| `sub_type` | string | `leave`、`kick`、`kick_me` | 事件子类型，分别表示主动退群、成员被踢、登录号被踢 |
| `group_id` | number (int64) | - | 群号 |
| `operator_id` | number (int64) | - | 操作者 QQ 号（如果是主动退群，则和 `user_id` 相同） |
| `user_id` | number (int64) | - | 离开者 QQ 号 |

### 群成员增加

#### 上报数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `group_increase` | 通知类型 |
| `sub_type` | string | `approve`、`invite` | 事件子类型，分别表示管理员已同意入群、管理员邀请入群 |
| `group_id` | number (int64) | - | 群号 |
| `operator_id` | number (int64) | - | 操作者 QQ 号 |
| `user_id` | number (int64) | - | 加入者 QQ 号 |

### 群禁言

#### 上报数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `group_ban` | 通知类型 |
| `sub_type` | string | `ban`、`lift_ban` | 事件子类型，分别表示禁言、解除禁言 |
| `group_id` | number (int64) | - | 群号 |
| `operator_id` | number (int64) | - | 操作者 QQ 号 |
| `user_id` | number (int64) | - | 被禁言 QQ 号 |
| `duration` | number (int64) | - | 禁言时长，单位秒 |

### 好友添加

#### 上报数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `friend_add` | 通知类型 |
| `user_id` | number (int64) | - | 新添加好友 QQ 号 |

### 加好友请求

#### 上报数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `post_type` | string | `request` | 上报类型 |
| `request_type` | string | `friend` | 请求类型 |
| `user_id` | number (int64) | - | 发送请求的 QQ 号 |
| `comment` | string | - | 验证信息（可能包含 CQ 码，特殊字符被转义） |
| `flag` | string | - | 请求 flag，在调用处理请求的 API 时需要传入 |

#### 响应数据

| 字段名 | 数据类型 | 说明 | 默认情况 |
| ----- | ------- | --- | ------- |
| `approve` | boolean | 是否同意请求 | 不处理 |
| `remark` | string  | 添加后的好友备注（仅在同意时有效） | 无备注 |

### 加群请求／邀请

#### 上报数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `post_type` | string | `request` | 上报类型 |
| `request_type` | string | `group` | 请求类型 |
| `sub_type` | string | `add`、`invite` | 请求子类型，分别表示加群请求、邀请登录号入群 |
| `group_id` | number (int64) | - | 群号 |
| `user_id` | number (int64) | - | 发送请求的 QQ 号 |
| `comment` | string | - | 验证信息（可能包含 CQ 码，特殊字符被转义） |
| `flag` | string | - | 请求 flag，在调用处理请求的 API 时需要传入 |

#### 响应数据

| 字段名 | 数据类型 | 说明 | 默认情况 |
| ----- | ------- | --- | ------- |
| `approve` | boolean | 是否同意请求／邀请 | 不处理 |
| `reason` | string | 拒绝理由（仅在拒绝时有效） | 无理由 |

## 元事件

上面的事件列表是 CKYU 直接支持的、QQ 机器人真实接收到的事件，除了这些，插件自己还会产生一类事件，这里称之为「元事件」，例如生命周期事件、心跳事件等，这类事件与插件（以及 CKYU）本身的运行状态有关，而与 QQ 无关。

元事件的上报方式和普通事件完全一样，`post_type` 字段为 `meta_event`。

## 元事件列表

### 生命周期

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `post_type` | string | `meta_event` | 上报类型 |
| `meta_event_type` | string | `lifecycle` | 元事件类型 |
| `sub_type` | string | `enable`、`disable`、`connect` | 事件子类型，分别表示插件启用、插件停用、WebSocket 连接成功 |

**注意，目前生命周期元事件中，只有 HTTP 上报（配置了 `post_url` ）的情况下可以收到 `enable` 和 `disable`，只有 WebSocket 和反向 WebSocket 可以收到 `connect`。**

### 心跳

心跳类型的元事件需要通过设置配置项 `enable_heartbeat` 为 `true` 开启，并可通过 `heartbeat_interval` 配置心跳间隔（单位毫秒）。

| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------ | -------- | --- |
| `post_type` | string | `meta_event` | 上报类型 |
| `meta_event_type` | string | `heartbeat` | 元事件类型 |
| `status` | object | - | 状态信息 |
| `interval` | number (int64) | - | 到下次心跳的间隔，单位毫秒 |

其中 `status` 字段的内容和 [`get_status` 接口的响应数据](API#响应数据27) 相同。

# 试验性 Action

试验性 API 可以一定程度上增强实用性，但它们并非 酷Q 原生提供的接口，稳定性较差，不保证随时可用（如果不可用可以尝试重新登录 酷Q），且接口可能会在后面的版本中发生变动。除非必要，请尽量避免使用试验性接口。

所有试验性接口都以下划线（`_`）开头。

## `_get_friend_list` 获取好友列表

### 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| ----- | ------- | ----- | --- |
| `flat` | boolean | `false` | 是否获取扁平化的好友数据，即所有好友放在一起、所有分组放在一起，而不是按分组层级 |

### 响应数据

当 `flat` 为 false 时，响应内容为 JSON 数组，每个元素为一个好友分组，格式如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------- | --- |
| `friend_group_id` | number | 好友分组 ID |
| `friend_group_name` | string | 好友分组名称 |
| `friends` | array | 分组中的好友 |
| `friends[i].nickname` | string | 好友昵称 |
| `friends[i].remark` | string | 好友备注 |
| `friends[i].user_id` | number | 好友 QQ 号 |

当 `flat` 为 true 时，响应内容为 JSON 对象，如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------- | --- |
| `friend_groups` | array | 好友分组列表 |
| `friend_groups[i].friend_group_id` | number | 好友分组 ID |
| `friend_groups[i].friend_group_name` | string | 好友分组名称 |
| `friends` | array | 好友列表 |
| `friends[i].nickname` | string | 好友昵称 |
| `friends[i].remark` | string | 好友备注 |
| `friends[i].user_id` | number | 好友 QQ 号 |
| `friends[i].friend_group_id` | number | 好友所在分组 ID |

## `_get_group_info` 获取群信息

### 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| ----- | ------- | ----- | --- |
| `group_id` | number | - | 要查询的群号 |

### 响应数据

| 字段名 | 数据类型 | 说明 |
| ----- | ------- | --- |
| `group_id` | number | 群号 |
| `group_name` | string | 群名称 |
| `create_time` | number | 创建时间 |
| `category` | number | 群分类，具体这个 ID 对应的名称暂时没有 |
| `member_count` | number | 成员数 |
| `max_member_count` | number | 最大成员数（群容量） |
| `introduction` | string | 群介绍 |
| `admins` | array | 群主和管理员列表 |
| `admin_count` | number | 群主和管理员数 |
| `max_admin_count` | number | 最大群主和管理员数 |
| `owner_id` | number | 群主 QQ 号 |

其中，`admins` 中每一项是一个 JSON 对象，如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------- | --- |
| `user_id` | number | QQ 号 |
| `nickname` | string | 昵称 |
| `role` | string | 角色，`owner` 表示群主、`admin` 表示管理员 |

注意，和其它接口有所不同，这里的所有字段都有可能在返回数据中不存在，例如可能缺少 `max_member_count` 等，在使用时请注意异常处理。

## `_get_vip_info` 获取会员信息

### 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| ----- | ------- | ----- | --- |
| `user_id` | number | - | 要查询的 QQ 号 |

### 响应数据

| 字段名 | 数据类型 | 说明 |
| ----- | ------- | --- |
| `user_id` | number | QQ 号 |
| `nickname` | string | 昵称 |
| `level` | number | QQ 等级 |
| `level_speed` | number | 等级加速度 |
| `vip_level` | number | 会员等级 |
| `vip_growth_speed` | number | 会员成长速度 |
| `vip_growth_total` | string | 会员成长总值 |

## `_get_group_notice` 获取群公告

### 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| ----- | ------- | ----- | --- |
| `group_id` | number | - | 群号 |

### 响应数据

包含历史公告的数组，示例如下：

```json
[
    {
        "cn": 0,
        "fid": "3b130f28000000006ef0a95cef090f00",
        "fn": 0,
        "msg": {
            "text": "喵~&nbsp;喵~",
            "text_face": "喵~&nbsp;&nbsp;喵~",
            "title": "喵喵喵"
        },
        "pubt": 1554641006,
        "read_num": 1,
        "settings": {
            "is_show_edit_card": 0,
            "remind_ts": 0
        },
        "u": 3281334718,
        "vn": 0
    }
]
```

这里的数据是 QQ 接口返回的原始数据，其中，`text` 和 `title` 等字段的内容被进行了 HTML 转义（如 `&nbsp;`）；除此之外，还可能会存在一些特殊二进制值，用于表示特殊内容，具体含义可能需要自行理解。

## `_send_group_notice` 发布群公告

### 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| ----- | ------- | ----- | --- |
| `group_id` | number | - | 群号 |
| `title` | string | - | 标题 |
| `content` | string | - | 内容 |

### 响应数据

无

## `_set_restart` 重启 酷Q，并以当前登录号自动登录（需勾选快速登录）

**由于强行退出可能导致 酷Q 数据库损坏而影响功能，此接口除非必要请尽量避免使用。**

### 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| ----- | ------- | ----- | --- |
| `clean_log` | boolean | `false` | 是否在重启时清空 酷Q 的日志数据库（`log*.db`） |
| `clean_cache` | boolean | `false` | 是否在重启时清空 酷Q 的缓存数据库（`cache.db`） |
| `clean_event` | boolean | `false` | 是否在重启时清空 酷Q 的事件数据库（`eventv2.db`） |

### 响应数据

无

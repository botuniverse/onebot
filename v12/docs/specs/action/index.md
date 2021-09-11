# OneBot 动作

OneBot 动作（原 OneBot API）是指通过通信方式向用户提供操作接口，例如发送消息、上传下载图片等操作。

对于 OneBot 动作的格式定义，见 [OneBot RPC - 动作](../onebot-rpc/action)。

本章列举了 OneBot 标准需要实现的公开 Action 内容。

## send_message 发送消息

给用户发送消息的动作。

### 参数

- `user_id`: 如果 `detail_type` 为 `private` 则**必须**包含 `user_id` 用于确定用户身份
- `group_id`: 如果 `detail_type` 为 `group` 则**必须**包含 `group_id` 用于确定发送的目标群组
- `detail_type`: 发送的类型，**必须**为 `group`、`private`、`impl_spec_xxx` 中的一种（第三个是指不同平台的扩展子类型）
- `message`: **必须**包含消息本身的内容，其中消息必须为 array 格式的消息段，有关消息段内容的定义，见 [消息段](../message/message-array)。

对于不同平台的 `detail_type`，如果符合支持的类型，如私聊对应 `private`，群组对应 `group`，则**必须**使用不带前缀的发送类型和 `xxx_id`。

对于其他发送类型，假设过去的 QQ 还存在讨论组的情况，可以指定讨论组为 `qq_discuss` 的类型，然后参数**必须**带有对应的目标身份地址，如 `qq_discuss_id` 参数。

### 响应参数

- `message_id`: **必须**唯一的消息 ID，无论消息是否成功发送
- `time`: **必须**包含消息成功发出的时间戳

下面为一个在 QQ 群下发送一条普通消息的动作数据包全部内容：

```json
{
    "action": "send_message",
    "params": {
        "detail_type": "group",
        "group_id": "12467",
        "message": [
            {
                "type": "text",
                "data": {
                    "text": "我是文字巴拉巴拉巴拉"
                }
            }
        ]
    }
}
```

响应数据可以为：

```json
{
    "status": "ok",
    "retcode": 0,
    "data": {
        "message_id": "2452352435",
        "time": 1627476314
    }
}
```

## delete_message 撤回消息

撤回一条信息。

## set_group_kick 群组踢人

踢出一名群成员。

## set_group_ban 群组禁言某人

禁言群内的某人或全部禁言。

## set_group_admin 设置群管理员

将群内某人设置为管理员或取消管理员。

## set_group_leave 退出群组

让机器人从某个群组退出。

## set_group_name 设置群名

设置群名。

## get_self_info 获取机器人信息

获取机器人自身的信息。

## get_user_info 获取用户信息

通过 `user_id` 获取用户的信息，可以是好友，也可以是陌生人。

## get_friend_list 获取好友列表

获取机器人的关注者或好友列表。

## get_group_info 获取群组信息

通过 `group_id` 获取群组相关信息。

## get_group_list 获取群组列表

获取机器人加入的群组列表。

## get_group_member_info 获取群成员信息

获取群内的某个成员信息。

## get_group_member_list 获取群成员列表

获取群内的成员列表。

## get_file 获取文件

通过 Action 动作方式获取 OneBot 的文件。

## upload_file 上传文件

通过 Action 给 OneBot 实现上传文件。

## get_status 获取 OneBot 状态

获取 OneBot 实现的运行状态。

## get_version 获取版本信息

获取 OneBot 版本信息。

## get_latest_events 轮询获取事件列表

对 HTTP 通信方式适用，可以在 HTTP 通信方式下通过此动作轮询获取 OneBot 事件。

> 此部分存在未定义的内容，待集中商讨后处理。

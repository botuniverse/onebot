# 更新日志

## v11

> **在 v11 版本中，CQHTTP 标准改名为 OneBot 标准。**

### 2020-08-21

- **消息段**：修改 `shake` 消息段，改为仅用于发送，接收时应收到 `poke` 消息段

### 2020-08-19

- **API**：添加 `get_group_honor_info` API，用于获取群荣誉信息

### 2020-08-17

- **API**：修改 `get_group_list` API，新增 `member_count` 和 `max_member_count` 字段，和 `get_group_info` 保持一致
- **消息段**：新增短视频消息段

### 2020-08-13

#### 新增

- **事件**：新增群消息撤回和好友消息撤回事件
- **API**：新增 `get_msg` `get_forward_msg` `set_group_name` API
- **消息段**：新增回复消息段
- **消息段**：新增合并转发、合并转发节点、合并转发自定义节点消息段
- **消息段**：新增 XML 和 JSON 消息段
- **消息段**：新增戳一戳消息段

#### 变更

- **通信**：反向 WebSocket 请求头的 `Authorization` 中，`Token` 改为 `Bearer`，与 HTTP 和正向 WebSocket 一致
- **事件**：修改请求事件，`comment` 字段不再对特殊字符转义，内容总是原始的纯文本字符串
- **API**：修改 `get_record` API，移除 `full_path` 参数，返回值改为总是绝对路径
- **API**：修改 `get_version_info` API 的响应数据
- **API**：修改 `set_restart_plugin` API 为 `set_restart`
- **API**：修改 `clean_data_dir` API 为 `clean_cache`，移除 `data_dir` 参数
- **消息段**：修改图片和语音消息段，不再支持使用相对 `data/image` 和 `data/record` 的相对路径发送新图片，对于在事件中收到的图片和语音，仍然可以直接使用收到的 `file` 参数值发送
- **消息段**：修改图片和语音消息段，新增 `proxy` 参数，用于指定是否通过代理下载图片和语音文件
- **消息段**：修改图片消息段，新增 `type` 参数，用于表示闪照
- **其它**：不再将 `data` 目录暴露给用户，实现可自行决定图片、语音等文件的存放位置

#### 移除

- **事件**：移除讨论组消息事件
- **API**：移除 `send_discuss_msg` `set_discuss_leave` API
- **API**：移除 `clean_plugin_log` API
- **消息段**：移除 `rich` 富文本消息段，使用 XML 和 JSON 消息段替代

## v10

### 2020-08-11

- 修改原 CQHTTP 插件 v4.15 文档的表述，形成通用的 CQHTTP 标准
- 相比原 CQHTTP 插件，移除了数据文件获取接口、隐藏 API `.check_update`、所有试验性 API、`get_status` API 只保留 `online` 和 `good` 两个必选字段

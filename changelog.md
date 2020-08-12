---
sidebar: auto
---

# 更新日志

## latest

### 新增

- **事件**：新增群消息撤回和好友消息撤回事件
- **消息段**：新增回复、合并转发、合并转发节点、合并转发自定义节点消息段
- **API**：新增 `get_msg` `get_forward_msg` `set_group_name` API

### 变更

- **事件**：修改请求事件，`comment` 字段不再对特殊字符转义，内容总是原始的纯文本字符串
- **API**：修改 `get_record` API，移除 `full_path` 参数，返回值改为总是绝对路径
- **API**：修改 `get_version_info` API 的响应数据
- **消息段**：修改图片和语音消息段，不再支持使用相对 `data/image` 和 `data/record` 的相对路径发送新图片，对于在事件中收到的图片和语音，仍然可以直接使用收到的 `file` 参数值发送
- **消息段**：修改图片和语音消息段，新增 `proxy` 参数，用于指定是否通过代理下载图片和语音文件
- **其它**：不再将 `data` 目录暴露给用户，CQHTTP 实现可自行决定图片、语音等文件的存放位置

## v10

- 修改原 CQHTTP 插件 v4.15 文档的表述，形成通用的 CQHTTP 协议
- 相比原 CQHTTP 插件，移除了数据文件获取接口、隐藏 API `.check_update`、所有试验性 API、`get_status` API 只保留 `online` 和 `good` 两个必选字段

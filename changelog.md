---
sidebar: auto
---

# 更新日志

## latest

- 新增群消息撤回和好友消息撤回事件
- 新增回复、合并转发、合并转发节点、合并转发自定义节点消息段
- 新增 `get_msg` `get_forward_msg` `set_group_name` API
- 修改 `get_record` API，移除 `full_path` 参数，返回值改为总是绝对路径
- 修改请求事件，`comment` 字段不再对特殊字符转义，内容总是原始的纯文本字符串

## v10

- 修改原 CQHTTP 插件 v4.15 文档的表述，形成通用的 CQHTTP 协议
- 相比原 CQHTTP 插件，移除了数据文件获取接口、隐藏 API `.check_update`、所有试验性 API、`get_status` API 只保留 `online` 和 `good` 两个必选字段

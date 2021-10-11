!!! warning

    WIP

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

## `text` 纯文本

=== "参数"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `text` | string | 纯文本内容

=== "示例"

    ```json
    {
        "type": "text",
        "data": {
            "text": "这是一个纯文本"
        }
    }
    ```

## `mention` 提及（即 @）

=== "参数"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `user_id` | string | 提及的用户 ID

=== "示例"

    ```json
    {
        "type": "mention",
        "data": {
            "user_id": "1234567"
        }
    }
    ```

## `mention_all` 提及所有人

=== "参数"

    无。

=== "示例"

    ```json
    {
        "type": "mention_all",
        "data": {}
    }
    ```

## `image` 图片

=== "参数"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `file_id` | string | 图片文件 ID

=== "示例"

    ```json
    {
        "type": "image",
        "data": {
            "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16"
        }
    }
    ```

## `voice` 语音

=== "参数"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `file_id` | string | 语音文件 ID

=== "示例"

    ```json
    {
        "type": "voice",
        "data": {
            "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16"
        }
    }
    ```

## `audio` 音频

!!! tip "提示"

    音频消息段和语音消息段的区别是：语音消息段在聊天软件中表现为用户当场录制的声音，而音频消息段可能是直接发送的一个音乐文件，在消息列表中显示为可播放。

=== "参数"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `file_id` | string | 音频文件 ID

=== "示例"

    ```json
    {
        "type": "audio",
        "data": {
            "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16"
        }
    }
    ```

## `video` 视频

=== "参数"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `file_id` | string | 视频文件 ID

=== "示例"

    ```json
    {
        "type": "video",
        "data": {
            "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16"
        }
    }
    ```

## `file` 文件

=== "参数"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `file_id` | string | 文件 ID

=== "示例"

    ```json
    {
        "type": "file",
        "data": {
            "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16"
        }
    }
    ```

## `location` 位置

=== "参数"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `latitude` | float64 | 纬度
    `longitude` | float64 | 经度
    `title` | string | 标题
    `content` | string | 地址内容

=== "示例"

    ```json
    {
        "type": "location",
        "data": {
            "latitude": 31.032315,
            "longitude": 121.447127,
            "title": "上海交通大学闵行校区",
            "content": "中国上海市闵行区东川路800号"
        }
    }
    ```

## `reply` 回复

!!! tip "提示"

    在一些平台上回复消息会在消息内容中多加一个提及消息段，建议 OneBot 实现将该提及消息段合并到回复消息段。

=== "参数"

    字段名 | 数据类型 | 说明
    --- | --- | ---
    `message_id` | string | 回复的消息 ID
    `user_id` | string | 回复的消息发送者 ID，发送时可以不传入

=== "示例"

    ```json
    {
        "type": "reply",
        "data": {
            "message_id": "6283",
            "user_id": "1234567"
        }
    }
    ```

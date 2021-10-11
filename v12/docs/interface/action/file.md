!!! warning

    WIP

## get_file 获取文件

通过 Action 动作方式获取 OneBot 的文件。

> 待定。

## upload_file 上传文件

通过 Action 给 OneBot 实现上传文件。

因为 OneBot 标准规定了多种通讯方式，为了适应不同种类的上传文件，可以选择多种上传格式。

=== "参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `type` | string | - | 上传的方式，限定 `uri`、`bytes` 两种格式
    `name` | string | - | 上传的文件名，如 `foo.jpg`
    `uri` | string | 如果 `type` 为 `uri` 则必须有此项 | 上传的 URI，**必须**以传输协议开头，限定 `http(s)://`、`file://`、`base64://`
    `data` | base64 或 bytes | 如果 `type` 为 `bytes` 则必须有此项 | 上传的文件内容字节数据或 base64 数据
    `category` | string | 空（可选） | 文件的类别，限定 `image`、`audio`、`file`，可使用平台前缀进行扩展
    `sha256` | string | 空（可选） | 整个文件的 sha256，用于校验

    > 如果使用 JSON 格式请求此动作，则 `data` 段内容为 base64；如果使用 MsgPack 格式请求此动作，则 `data` 段内容为纯二进制。

=== "响应参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `file_id` | string | - | 上传文件的文件 ID，可后期使用

=== "请求数据"

    ```json
    {
        "action": "upload_file",
        "params": {
            "type": "uri",
            "name": "logo.jpg",
            "category": "image",
            "uri": "https://1bot.dev/assets/logo.png"
        }
    }
    ```

=== "响应数据"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "message": "",
        "data": {
            "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16"
        }
    }
    ```

## upload_file_fragmented 分段上传文件

分段上传文件，适用于一些特殊情况下大文件的传输，例如 WebSocket 环境只能使用本身连接来传输文件。

分段上传文件首先需要有一个prepare 阶段，
=== "prepare 请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `stage` | string | - | 上传阶段，prepare 阶段限定 `prepare`
    `name` | string | - | 上传的文件名
    `total_size` | int64 | - | 要上传的文件大小（字节）
    `sha256` | string | 空（可选） | 文件的 sha256，用于验证完整性

=== "prepare 响应参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `file_id` | string | - | 文件的资源 ID

transfer 为分段传输文件的阶段

=== "transfer 必填参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `file_id` | string | - | 上传的文件 ID，通过 `prepare` 阶段获取
    `offset` | int64 | - | 要上传的文件偏移字节数
    `size` | int64 | - | 要上传的文件分段大小
    `data` | base64 或 bytes | - | 上传的文件内容字节数据或 base64 数据

    > 如果使用 JSON 格式请求此动作，则 `data` 段内容为 base64；如果使用 MsgPack 格式请求此动作，则 `data` 段内容为纯二进制。

=== "transfer 响应参数"

    待定。

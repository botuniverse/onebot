!!! tip "关于 bytes 类型的提示"

        在 JSON 中，bytes 类型的字段表示为 Base64 编码的字符串。具体见 [基本数据类型](../basic-types.md)。

## `upload_file` 上传文件

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `type` | string | - | 上传文件的方式，可以为 `url`、`path`、`data` 或扩展的方式
    `name` | string | - | 文件名，如 `foo.jpg`
    `url` | string | - | 文件 URL，当 `type` 为 `url` 时必须传入，OneBot 实现必须支持以 HTTP(S) 协议从此 URL 下载要上传的文件
    `headers` | map[string]string | - | 下载 URL 时需要添加的 HTTP 请求头，可选传入，当 `type` 为 `url` 时 OneBot 实现必须在请求 URL 时加上这些请求头
    `path` | string | - | 文件路径，当 `type` 为 `path` 时必须传入，OneBot 实现必须能从此路径访问要上传的文件
    `data` | bytes | - | 文件数据，当 `type` 为 `data` 时必须传入
    `sha256` | string | - | 文件数据（原始二进制）的 SHA256 校验和，全小写，可选传入

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `file_id` | string | - | 文件 ID，可供以后使用

=== "请求示例"

    ```json
    {
        "action": "upload_file",
        "params": {
            "type": "url",
            "name": "logo.jpg",
            "url": "https://avatars.githubusercontent.com/u/56297293?s=200&v=4"
        }
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": {
            "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16"
        },
        "message": ""
    }
    ```

## `upload_file_fragmented` 分片上传文件

准备阶段：

!!! tip "提示"

    在准备阶段，OneBot 实现可以在文件系统中先创建好文件，之后在传输阶段写入数据。

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `stage` | string | - | 上传阶段，必须为 `prepare`
    `name` | string | - | 文件名，如 `foo.jpg`
    `total_size` | int64 | - | 文件完整大小，单位：字节
    `sha256` | string | - | 整个文件的 SHA256 校验和，全小写

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `file_id` | string | - | 文件 ID，仅传输阶段使用

传输阶段：

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `stage` | string | - | 上传阶段，必须为 `transfer`
    `file_id` | string | - | 准备阶段返回的文件 ID
    `offset` | int64 | - | 本次传输的文件偏移，单位：字节
    `size` | int64 | - | 本次传输的文件大小，单位：字节
    `data` | bytes | - | 本次传输的文件数据

=== "响应数据"

    无。

结束阶段：

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `stage` | string | - | 上传阶段，必须为 `finish`
    `file_id` | string | - | 准备阶段返回的文件 ID

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `file_id` | string | - | 文件 ID，可供以后使用

## `get_file` 获取文件

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `file_id` | string | - | 文件 ID
    `type` | string | - | 获取文件的方式，可以为 `url`、`path`、`data` 或扩展的方式

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `name` | string | - | 文件名，如 `foo.jpg`
    `url` | string | - | 文件 URL，当 `type` 为 `url` 时必须返回，应用端必须能以 HTTP(S) 协议从此 URL 下载文件
    `headers` | map[string]string | - | 下载 URL 时需要添加的 HTTP 请求头，可选返回
    `path` | string | - | 文件路径，当 `type` 为 `path` 时必须返回，应用端必须能从此路径访问文件
    `data` | bytes | - | 文件数据，当 `type` 为 `data` 时必须返回
    `sha256` | string | - | 文件数据（原始二进制）的 SHA256 校验和，全小写，可选返回

    !!! tip "提示"

        这里虽然说“必须返回”，但如果平台真的无法获得 URL，当用户请求 `type` 为 `url` 时，可以返回 `10004 Unsupported Param`。具体见 [接口定义 - 概述](../index.md) 中对 OneBot 实现的要求。

=== "请求示例"

    ```json
    {
        "action": "get_file",
        "params": {
            "file_id": "e30f9684-3d54-4f65-b2da-db291a477f16",
            "type": "url"
        }
    }
    ```

=== "响应示例"

    ```json
    {
        "status": "ok",
        "retcode": 0,
        "data": {
            "name": "logo.jpg",
            "url": "https://avatars.githubusercontent.com/u/56297293?s=200&v=4"
        },
        "message": ""
    }
    ```

## `get_file_fragmented` 分片获取文件

准备阶段：

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `stage` | string | - | 上传阶段，必须为 `prepare`
    `file_id` | string | - | 文件 ID

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `name` | string | - | 文件名，如 `foo.jpg`
    `total_size` | int64 | - | 文件完整大小，单位：字节
    `sha256` | string | - | 整个文件的 SHA256 校验和，全小写

传输阶段：

=== "请求参数"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `stage` | string | - | 上传阶段，必须为 `transfer`
    `file_id` | string | - | 文件 ID
    `offset` | int64 | - | 本次传输的文件偏移，单位：字节
    `size` | int64 | - | 本次传输的文件大小，单位：字节

=== "响应数据"

    字段名 | 数据类型 | 默认值 | 说明
    --- | --- | --- | ---
    `data` | bytes | - | 本次传输的文件数据

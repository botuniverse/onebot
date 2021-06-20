# 扩展

CQHTTP 插件的扩展机制允许用户下载额外的 DLL 来扩展插件的功能，例如添加长轮询接口。扩展的目的不是取代 CKYU 原生的插件机制，而是为了方便向 CQHTTP 插件添加新功能，同时不必将功能并入核心 CPK 文件。

## 扩展列表

目前可用的扩展列表，见 [扩展列表](https://github.com/richardchien/coolq-http-api/wiki/%E6%89%A9%E5%B1%95%E5%88%97%E8%A1%A8)。

## 使用方法

将 DLL 扩展文件（可在响应扩展的链接中找到下载地址）直接放入 CKYU 的 `data\app\io.github.richardchien.coolqhttpapi\extensions` 文件夹，然后将插件配置项 `use_extension` 设置为 `true` 再重启插件即可启用扩展。插件启动时会加载扩展文件夹中所有 `.dll` 结尾的、非 `_` 开头的动态库文件。

扩展通常还要求在配置文件中单独设置 `enable` 项才能实际启用，例如，长轮询扩展要求设置 `long_polling.enable` 配置项为 `true` 才会启用。具体请查看相应扩展提供的使用方法。

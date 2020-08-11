# 升级指南

由于 4.x 版本相比 3.x 引入了一些破坏性更改，因此这里给出一份升级指南，帮助用户从旧版升级到 4.x。

## 事件上报的数据字段变更

这个变化破坏性比较大，如果不更改配置或代码，可能使当前可用的程序变得不可用。首先列出变更如下：

- 群组消息中匿名信息现在以对象形式表示，例如 `"anonymous": {"id": 1000019, "name": "邓八公", "flag": "AAAAAAAPQlMABrXLsMu5qwAokaXsWulfxg2hPMTHguk1acbiU1NyW2BfxEnEMR5SNYFSns6SKKVe5A=="}`，非匿名消息中此字段为 `null`
- 通知类上报中（群成员增加、群管理员变更等），`post_type` 字段值从 `event` 变为 `notice`，原先的 `event` 字段变为 `notice_type` 字段
- 请求类上报的 `message` 字段现变为 `comment` 字段

如果你是应用作者，可将使用到的发生了变化的地方字段的键值直接做相应修改，如果现有代码过于复杂不易修改，可开启 `enable_backward_compatibility` 配置项来临时保持兼容；对于 SDK 作者，建议同时兼容 4.x 和 3.x 两种上报，且接口也分别和上报对应，例如同时提供 `event.NoticeType` 和 `event.Event` 来分别表示 4.x 的 `notice_type` 和 3.x 的 `event` 字段，并在文档或注释中做相应说明，如果无法同时兼容，建议将 SDK 的接口写为 4.x 版本的样式，然后再通过将 3.x 的上报转换为 4.x 的格式来兼容。

## 事件过滤器的变更

变更如下：

- 事件过滤器不再使用 `use_filter` 配置项来开关，而是使用 `event_filter` 直接指定过滤器规则文件的相对路径（相对于 `app\io.github.richardchien.coolqhttpapi`），默认为空，即表示不启用事件过滤器
- 事件过滤器规则中，旧版中对消息原始文本进行过滤的 `message` 字段现在改为处理过的数组格式的消息，未经处理的原始消息文本现在保存在 `raw_message` 字段

如果在 3.x 版本时使用了过滤器，升级到 4.x 版本时，需要将配置文件中的 `use_filter=true` 改为 `event_filter=filter.json`，由于现在是直接指定过滤规则文件名，也意味着可以针对不同的 QQ 号应用不同的过滤规则。

除了配置项需要修改之外，如果过滤规则中对原来的 `message` 字段写了规则，则需要改成 `raw_message`，然后将上一节中提到的上报数据中发生了变更的字段也做修改，比如 `{"post_type": "event"}` 改为 `{"post_type": "notice"}`，需要注意的是，`enable_backward_compatibility` 配置项**不会**影响事件过滤器看到的数据。

## User-Agent 变更

插件发送请求时的 User-Agent 由形如 `CoolQHttpApi/3.4.0` 改成了形如 `CQHttp/4.0.0`。

## `/get_status` 接口返回数据的变更

`/get_status` 接口的返回数据有所变化，但 `good`、`online`、`app_enabled` 字段仍然不变，具体请自行测试。如果你的应用需要检测 CKYU 和 CQHTTP 插件的运行状态，建议只使用上述三个字段来判断。

## Docker 镜像的变更

版本锁的文件名由原来的 `app.lock` 改为 `version.lock`，如果你需要解除容器中插件版本的锁定（即每次启动容器时都使用镜像对应版本的插件 cpk 文件覆盖已有的 cpk），现在需要删除 `version.lock`。此外，这个文件不再影响配置文件。

现在容器启动时会检查是否存在 `config` 目录，如果不存在，则会创建它，并从环境变量读取 `CQHTTP_` 开头的项，写入配置文件；如果存在，则默认情况下不做任何改变，除非 `FORCE_ENV` 环境变量为 `true`，则会完全删除现有的整个 `config` 目录，并根据环境变量重新写入。

## 运行时库的变更

由于新版使用了动态链接的 C 运行时，Windows 7 和 Windows Server 2008 等较老系统可能需要额外安装 [通用 C 运行库更新](https://support.microsoft.com/zh-cn/help/3118401/update-for-universal-c-runtime-in-windows) 才能正常使用，否则 CKYU 启动时会报 DLL 缺失错误。

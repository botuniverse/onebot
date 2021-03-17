# 生态

<details>
<summary>目录</summary>
<p>

- [生态](#生态)
  - [OneBot 实现](#onebot-实现)
    - [变种](#变种)
  - [SDK／开发框架](#sdk开发框架)
  - [应用案例](#应用案例)

</p>
</details>

在曾经的 CQHTTP 插件基础上，大量富有创造力的开发者们写出了许多优秀的 SDK、开发框架和机器人应用，成为 CKYU 和 CQHTTP 插件生态的一部分。现在 CKYU 已经画上句号，成为历史，基于 CQHTTP 插件（本文档中改称为 OneBot 接口标准）的项目仍然可以通过各类 CQHTTP 兼容项目（本文档中称为 OneBot 实现）来获得新生。

## OneBot 实现

理论上，基于 OneBot 标准开发的**任何** SDK、框架和机器人应用，都可以无缝地在下面的不同实现中切换。当然，在一小部分细节上各实现可能有一些不同，这也是本项目希望推动解决的问题。

| 项目地址 | 平台 | 核心作者 | 备注 |
| --- | --- | --- | --- |
| [richardchien/coolq-http-api](https://github.com/richardchien/coolq-http-api) | CKYU | richardchien | 可在 Mirai 平台使用 [mirai-native](https://github.com/iTXTech/mirai-native) 加载 |
| [Mrs4s/go-cqhttp](https://github.com/Mrs4s/go-cqhttp) | [MiraiGo](https://github.com/Mrs4s/MiraiGo) | Mrs4s |  |
| [yyuueexxiinngg/cqhttp-mirai](https://github.com/yyuueexxiinngg/cqhttp-mirai) | [Mirai](https://github.com/mamoe/mirai) | yyuueexxiinngg |  |
| [takayama-lily/node-onebot](https://github.com/takayama-lily/node-onebot) | [node-oicq](https://github.com/takayama-lily/oicq) | takayama |  |
| [Yiwen-Chan/OneBot-YaYa](https://github.com/Yiwen-Chan/OneBot-YaYa) | [先驱](https://www.xianqubot.com/) | Kanri | |

除了上面的实现，也欢迎大家在其它各类机器人平台实现 OneBot 标准，如果你已经实现了，欢迎通过 pull request 加到上面的表格里～

> **提示**
>
> OneBot 实现可以在 README 中添加徽章 ![Badge](https://img.shields.io/badge/OneBot-v11-black) 来表示支持的 OneBot 标准版本，徽章图片 URL 是 `https://img.shields.io/badge/OneBot-v11-black`，可修改 URL 中的 `v11` 以表示不同版本。

### 变种

除了上面列出的基本可以无缝切换的 OneBot 实现，还有一些开发者编写了与 OneBot 部分兼容的实现，这些实现在一些方面破除了 OneBot 的历史包袱，但可能无法与其它 OneBot 实现任意切换。

| 项目地址 | 平台 | 核心作者 | 备注 |
| --- | --- | --- | --- |
| [ProtobufBot](https://github.com/ProtobufBot/ProtobufBot) | [Mirai](https://github.com/mamoe/mirai) / [MiraiGo](https://github.com/Mrs4s/MiraiGo) | lz1998 | 事件和 API 数据内容和 OneBot 一致，通信方式改用 Protobuf 序列化 |

## SDK／开发框架

对于使用下面这些语言的机器人开发者，如果不想自己处理繁杂的请求和解析操作，可以尝试使用已经封装好的 SDK 或开发框架。

| 语言 | 通信方式 | 地址 | 核心作者 | 备注 |
| ---| --- | --- | --- | --- |
| Python | HTTP,<br>反向 WS | [nonebot/nonebot](https://github.com/nonebot/nonebot) | richardchien<br>yanyongyu |
| Python | HTTP,<br>反向 WS | [nonebot/aiocqhttp](https://github.com/nonebot/aiocqhttp) | richardchien |
| Node.js | 正向 WS | [momocow/node-cq-websocket](https://github.com/momocow/node-cq-websocket) | momocow | 项目已归档，不再更新 |
| Node.js | HTTP,<br>正向 WS,<br>反向 WS | [koishijs/koishi](https://github.com/koishijs/koishi) | Shigma |
| Node.js | 正向 WS | [CaoMeiYouRen/node-coolq-robot](https://github.com/CaoMeiYouRen/node-coolq-robot) | CaoMeiYouRen | 项目已归档，不再更新 |
| Node.js | HTTP | [XHMM/lemon-bot](https://github.com/XHMM/lemon-bot) | XHMM |
| JavaScript | 正向 WS | [pandolia/js-bot](https://github.com/pandolia/js-bot) | pandolia | 作者已删仓库 |
| Deno | 反向 WS | [nenojs/deno-cqhttp](https://github.com/nenojs/deno-cqhttp) | rikakomoe |
| PHP | 反向 WS | [zhamao-robot/zhamao-framework](https://github.com/zhamao-robot/zhamao-framework) | crazywhalecc |
| PHP | HTTP | [LovelyA72/YeziiBot-v2](https://github.com/LovelyA72/YeziiBot-v2) | LovelyA72 |
| PHP | HTTP | [ParaParty/MPBot](https://github.com/ParaParty/MPBot) | endymx |
| Java | HTTP | [HyDevelop/PicqBotX](https://github.com/HyDevelop/PicqBotX) | Hykilpikonna |
| Java<br>Kotlin<br>Groovy | 反向 WS | [lz1998/Spring-CQ](https://github.com/lz1998/Spring-CQ)（[教程](https://www.bilibili.com/video/av89649630/)） | lz1998 |
| Java | HTTP | [ForteScarlet/simple-robot-core](https://github.com/ForteScarlet/simple-robot-core) | ForteScarlet |
| Java | HTTP | [thevsk/cqhttp-java-jfinal-sdk](https://github.com/thevsk/cqhttp-java-jfinal-sdk) | thevsk | 项目已不再更新 |
| Kotlin | HTTP | [JuerGenie/juerobot](https://github.com/JuerGenie/juerobot) | JuerGenie |
| Go | **API:**<br>HTTP,<br>正向 WS<br>**Event:**<br>HTTP,<br>长轮询,<br>正向 WS,<br>反向 WS | [catsworld/qq-bot-api](https://github.com/catsworld/qq-bot-api) | catsworld<br>rikakomoe | 项目归档，不再更新 |
| Go | 正向 WS | [wdvxdr1123/ZeroBot](https://github.com/wdvxdr1123/ZeroBot) | wdvxdr1123 |
| C# | HTTP,<br>正向 WS | [int-and-his-friends/Sisters.WudiLib](https://github.com/int-and-his-friends/Sisters.WudiLib) | bleatingsheep |
| C# | HTTP,<br>正向 WS,<br>反向 WS | [frank-bots/cqhttp.Cyan](https://github.com/frank-bots/cqhttp.Cyan) | frankli0324 |
| C# | 反向 WS | [cqbef/cqhttp.WebSocketReverse.NETCore](https://github.com/cqbef/cqhttp.WebSocketReverse.NETCore) | cqbef | 项目归档，不再更新 |
| C# | 正向 WS,<br>反向 WS | [Yukari316/Sora](https://github.com/Yukari316/Sora) | Yukari316 |
| C# | 反向 WS | [ParaParty/OneBot-Framework](https://github.com/ParaParty/OneBot-Framework) | ExerciseBook<br>LovelyCatHyt<br>Yorkin | 使用 [Sora](https://github.com/Yukrai103/Sora) 作 OneBot 实现，配合 [ASP.Net Core](https://docs.microsoft.com/en-us/aspnet/core/) 作 IOC DI 框架的 OneBot 指令路由系统 |
| PowerShell | HTTP | [cqmoe/cqhttp-powershell-sdk](https://github.com/cqmoe/cqhttp-powershell-sdk) | richardchien | 项目归档，不再更新 |
| Lua | HTTP,<br>正向 WS | [cleoold/cqhttp-lua53-sdk](https://github.com/cleoold/cqhttp-lua53-sdk) | cleoold | 项目归档，不再更新 |
| C++ | 正向 WS | [super1207/MiraiCQ](https://github.com/super1207/MiraiCQ) | super1207 |

## 应用案例

聊天机器人可以用来做很多有意思的事情，这里列出一些基于 OneBot 标准的应用案例，欢迎补充。

| 项目地址 | 简介 |
| ------- | --- |
| [milkice233/efb-qq-slave](https://github.com/milkice233/efb-qq-slave) | 基于 ehForwarderBot 框架的 QQ 从端 |
| [projectriri/bot-gateway](https://projectriri.github.io/bot-gateway/) | 提供跨聊天平台的通用机器人 API 的机器人消息网关 |
| [jqqqqqqqqqq/UnifiedMessageRelay](https://github.com/jqqqqqqqqqq/UnifiedMessageRelay) | QQ <-> Telegram Bot Framework & Forwarder |
| [Mother-Ship/cabbageWeb](https://github.com/Mother-Ship/cabbageWeb) | 基于 Java Web 的 osu! 游戏数据查询机器人 |
| [bdbai/Kobirt](https://github.com/bdbai/Kobirt) | Ingress 游戏辅助机器人 |
| [JRT-FOREVER/hub2coolq](https://github.com/JRT-FOREVER/hub2coolq) | GitHub webhook 消息转发至 QQ 群 |
| [Kurarion/Bangumi-for-QQ](https://github.com/Kurarion/Bangumi-for-QQ) | 用于在 QQ 平台便捷地使用 Bangumi 部分功能（查寻条目、更新条目进度等） |
| [rikakomoe/cqhttp-twitter-bot](https://github.com/rikakomoe/cqhttp-twitter-bot) | 自动订阅 Twitter 发送到 QQ |
| [XiaoLin0815/QQ2TG](https://github.com/XiaoLin0815/QQ2TG) | 帮助 QQ 与 Telegram 互联的小程序 |
| [spacemeowx2/splatoon2-qqbot](https://github.com/spacemeowx2/splatoon2-qqbot) | 宇宙第一的 Splatoon2 的地图机器人 |
| [OYMiss/forward-bot](https://github.com/OYMiss/forward-bot) | 用 Telegram 和 QQ 好友聊天的转发机器人 |
| [mrthanlon/SICNUBOT](https://github.com/mrthanlon/SICNUBOT) | 专为四川师范大学设计用于审核发布消息用的 QQ 机器人 |
| [billjyc/pocket48](https://github.com/billjyc/pocket48/tree/coolq) | 监控成员口袋 48 聚聚房间、微博和摩点项目 |
| [chinshin/CQBot_hzx](https://github.com/chinshin/CQBot_hzx) | 摩点 & 微博 & 口袋 48 机器人（BEJ48-黄子璇） |
| [Ice-Hazymoon/grnd_bot](https://github.com/Ice-Hazymoon/grnd_bot) | 订阅 RSSHub 更新并推送到 QQ 群 |
| [Ray-Eldath/Avalon](https://github.com/Ray-Eldath/Avalon) | 多功能、可扩展的群机器人，支持 QQ 和 Discord |
| [Bluefissure/FFXIVBOT](https://github.com/Bluefissure/FFXIVBOT) | 基于 Django Channels 的最终幻想 14 游戏数据查询机器人 |
| [Milkitic/Daylily](https://github.com/Milkitic/Daylily) | 基于 ASP.NET Core 的跨平台机器人（含快速开发插件框架） |
| [cczu-osa/aki](https://github.com/cczu-osa/aki) | 基于 NoneBot 的多功能 QQ 机器人 |
| [cleoold/sendo-erika](https://github.com/cleoold/sendo-erika) | 基于 cqhttp 和 NoneBot 的，主要通过私聊摇控的 QQ 机器人 |
| [duan602728596/qqtools](https://github.com/duan602728596/qqtools) | 基于 Nwjs 的 QQ 群工具（摩点、口袋 48、微博提醒、入群欢迎、定时喊话、自定义命令和回复信息等） |
| [Tsuk1ko/CQ-picfinder-robot](https://github.com/Tsuk1ko/CQ-picfinder-robot) | 基于 Saucenao 的搜图机器人 |
| [kasora/dice](https://github.com/kasora/dice) | COC7 骰子 QQ 机器人 |
| [shidenggui/tuishujun-for-qq](https://github.com/shidenggui/tuishujun-for-qq) | 基于推书君的小说查询推荐 QQ 机器人 |
| [JuerGenie/cn.juerwhang.jgbot](https://github.com/JuerGenie/cn.juerwhang.jgbot) | 基于 [JuerGenie/juerobot](https://github.com/JuerGenie/juerobot) 的娱乐用 QQ 机器人 |
| [drsanwujiang/DiceRobot](https://github.com/drsanwujiang/DiceRobot) | 一个基于 coolq-http-api 插件的 TRPG 骰子机器人 |
| [UltraSoundX/SDFMU-Library](https://github.com/UltraSoundX/SDFMU-Library) | 山东第一医科大图书馆预约机器人 |
| [Quan666/ELF_RSS](https://github.com/Quan666/ELF_RSS) | 基于 NoneBot 的，交互式 RSS 订阅、转发机器人 |
| [lz1998/Spring-CQ-web](https://github.com/lz1998/Spring-CQ-web) | 基于 SpringCQ 的机器人 web 控制台 |
| [suisei-cn/stargazer-qq](https://github.com/suisei-cn/stargazer-qq) | 一个灵活的 vtuber 发推/直播动态监控机器人 |
| [Ninzore/Wecab](https://github.com/Ninzore/Wecab) | 网络内容聚合机器人，支持微博、B站、Twitter 等 |
| [mgsky1/FG](https://github.com/mgsky1/FG) | 基于 NoneBot 的 QQ 群机器人，特色功能是利用机器学习算法提取每日的聊天热词，并使用词云+文本的方式进行展示 |
| [Yiwen-Chan/GroupManager](https://github.com/Yiwen-Chan/GroupManager) | 基于 qq-bot-api 框架的 QQ 群机器人，支持多种自定义群管功能 |
| [yuudi/gypsum](https://github.com/yuudi/gypsum) | 简单易用的网页控制台，匹配消息进行回复，也可以使用 jinja 模板与 lua 脚本实现高级功能 |

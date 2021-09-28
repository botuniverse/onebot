OneBot 实现一般为一个独立的应用或独立的核心库，OneBot 实现一般与机器人功能本身无关，只作为 IM（即时通讯）应用 API 或协议的转换层。

理论上，基于 OneBot 标准开发的**任何** SDK、框架和机器人应用，都可以在下面的不同实现中切换。在 v12 版本中，为了实现与旧版本标准的兼容，v12 标准下的 libonebot 拥有对 v11 标准的兼容层。

项目地址 | 兼容版本 | 平台 | 核心作者 | 备注
--- | --- | --- | --- | ---
[richardchien/coolq-http-api](https://github.com/richardchien/coolq-http-api) | v11 | CKYU | richardchien | 可在 Mirai 平台使用 [mirai-native](https://github.com/iTXTech/mirai-native) 加载
[Mrs4s/go-cqhttp](https://github.com/Mrs4s/go-cqhttp)        | v11      | [MiraiGo](https://github.com/Mrs4s/MiraiGo)        | Mrs4s          |
[yyuueexxiinngg/onebot-kotlin](https://github.com/yyuueexxiinngg/onebot-kotlin) | v11      | [Mirai](https://github.com/mamoe/mirai)            | yyuueexxiinngg |                                                             
[takayama-lily/node-onebot](https://github.com/takayama-lily/node-onebot) | v11      | [node-oicq](https://github.com/takayama-lily/oicq) | takayama       |                                                             
[Yiwen-Chan/OneBot-YaYa](https://github.com/Yiwen-Chan/OneBot-YaYa) | v11      | [先驱](https://www.xianqubot.com/)                 | Kanri          |                                                             
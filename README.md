# OneBot

**OneBot** 是一个聊天机器人应用接口标准，旨在统一不同聊天平台上的机器人应用开发接口，使开发者只需编写一次业务逻辑代码即可应用到多种机器人平台。

**注意，本仓库是 OneBot 标准的最新草案，发布在 <https://12.onebot.dev>，要查看目前已正式发布的版本，请前往 <https://onebot.dev> 查找相关链接。**

## 特点

- **简洁**：标准所描述的连接规范和接口定义简洁明了，易于理解、实现和接入，同时文档语言清晰易读
- **通用**：连接规范适用于几乎所有聊天机器人平台，接口定义抽象了众多聊天机器人 API 的共通部分，保证了通用性
- **可扩展**：针对不同聊天机器人平台提供的特色功能，OneBot 实现可根据需要方便地对标准接口进行扩展
- **开放**：标准的制定和维护采用开放的运作模式，贡献者提出 RFC 后，由社区评议决定是否接收

## 本地预览

要在本地预览 OneBot 标准文档，请参考下面命令：

**使用 pipenv**

```sh
$ PIPENV_VENV_IN_PROJECT=1 pipenv install
$ pipenv run mkdocs serve
```

**使用 pip**

```sh
$ pip install -r requirements.txt
$ mkdocs serve
```

## 贡献

如果你有兴趣帮助完善 OneBot，可积极参与 [discussions](https://github.com/botuniverse/onebot/discussions) 中的讨论、提出 RFC 或帮助更新标准文档，具体贡献方式请参考 [贡献指南](CONTRIBUTING.md)。

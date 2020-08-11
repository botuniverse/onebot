# Docker

CKYU 目前可以在 Wine 中运行，见 [CKYU Air / Pro on Wine](https://cqp.cc/t/30966)，因此也就自然而然有了相应的 Docker 镜像 [coolq/wine-coolq](https://hub.docker.com/r/coolq/wine-coolq/)。

要在 Docker 中使用本插件，你可以使用 CKYU 官方的 Docker 镜像，然后在其中安装本插件（下载 cpk、编辑配置文件、启用插件），也可以使用我维护的已安装并启用了插件的镜像 [richardchien/cqhttp](https://hub.docker.com/r/richardchien/cqhttp/)（基于 CKYU 官方的镜像修改）。下面介绍这个镜像的用法。

## 基本用法

```bash
$ docker pull richardchien/cqhttp:latest
$ mkdir coolq  # 用于存储 CKYU 的程序文件
$ docker run -ti --rm --name cqhttp-test \
             -v $(pwd)/coolq:/home/user/coolq \  # 将宿主目录挂载到容器内用于持久化 CKYU 的程序文件
             -p 9000:9000 \  # noVNC 端口，用于从浏览器控制 CKYU
             -p 5700:5700 \  # CQHTTP 插件开放的端口
             -e COOLQ_ACCOUNT=123456 \ # 要登录的 QQ 账号，可选但建议填
             -e CQHTTP_POST_URL=http://example.com:8080 \  # 事件上报地址
             -e CQHTTP_SERVE_DATA_FILES=yes \  # 允许通过 HTTP 接口访问 CKYU 数据文件
             richardchien/cqhttp:latest
```

其中，`CQHTTP_POST_URL`、`CQHTTP_SERVE_DATA_FILES` 是用于配置插件运行的，格式为「`CQHTTP_` + 插件配置项的大写」，具体的配置项，见 [配置](Configuration)。

然后访问 `http://<你的IP>:9000/` 进入 noVNC（默认密码 `MAX8char`），登录 CKYU，即可开始使用（插件已自动启用，配置文件也根据启动命令的环境变量自动生成了）。一般情况下，你不太需要关注插件是如何存在于容器中的。

注意，默认情况下，容器启动时会检查是否已经存在 `config` 目录，如果不存在，则会将 `CQHTTP_` 开头的环境变量写入到配置文件中；如果 `config` 目录存在，即不是首次启动，则不会做任何修改。**因此，你可以在容器运行时手动修改配置文件，重启容器后仍然有效，这和旧版本的行为不一样！**如果你要让容器每次启动时都使用环境变量重新创建配置文件，以保持插件行为和容器启动命令的一致性，可以设置环境变量 `FORCE_ENV` 的值为 `true`。

## 通过环境变量配置容器的运行

| 环境变量名 | 说明 |
| -------- | ---- |
| `VNC_PASSWD` | 继承自官方镜像，noVNC 的密码（官方说不能超过 8 个字符，实测可以超过，但只会验证前 8 位） |
| `COOLQ_ACCOUNT` | 继承自官方镜像，设置要登录 CKYU 的 QQ 号。在第一次手动登录后，你可以勾选「快速登录」功能以启用自动登录，此后，容器启动或 CKYU 异常退出时，会自动登录该帐号。 |
| `COOLQ_URL` | 继承自官方镜像，设置 CKYU 的下载链接，默认为 `http://dlsec.cqp.me/cqa-tuling`，即 CKYU Air 图灵版。如需使用 CKYU Pro，可改为 `https://dlsec.cqp.me/cqp-tuling`。也可使用任何其它可下载的 URL，只要确保下载后的 zip 文件能解压出 `CKYU Air/CQA.exe` 或 `CKYU Pro/CQP.exe` |
| `FORCE_ENV` | 是否强制把 `CQHTTP_` 开头的环境变量写入配置文件，**这会删除现有的配置文件** |
| `CQHTTP_POST_URL`<br>`CQHTTP_SERVE_DATA_FILES`<br>`CQHTTP_USE_WS`<br>等形如 `CQHTTP_*` 的 | 当容器首次启动或 `FORCE_ENV` 为 `true` 的情况下，容器会将这些项的值自动写入配置文件 |

## 更换／升级插件版本

Docker 镜像使用 tag 来标记版本，插件版本 3.0.0 之后的 richardchien/cqhttp 镜像遵循了这一点（旧版本没有，已移至镜像的 `legacy` 标签）。

上一节的示例给出的命令拉取了 `richardchien/cqhttp:latest`，即当前最新版本（稳定版），如果你需要更新插件到最新版本，重新拉取一次 `latest` 标签即可，如果你需要使用指定版本的插件，如 `3.0.0` 版本，则使用镜像 `richardchien/cqhttp:3.0.0`。插件的 GitHub 仓库中的每个 release 对应 docker 镜像的一个 tag，**注意，release 的标题中的版本号有 `v` 开头，docker 镜像的 tag 没有**。

此外，Docker 容器在每次运行时，会将相应版本的 cpk 文件复制到 CKYU 的 app 目录，并覆盖已有的文件（假设有的话）。这意味着，**当使用某个版本的 docker 镜像时，如果你自行更换了 cpk 文件，那么下次容器重启时将会重新覆盖它**。并且，无法使用插件的检查更新功能来更新。如果你不要这个行为，可以删除 `app\io.github.richardchien.coolqhttpapi\version.lock` 文件以解除版本锁；如果要恢复默认行为，重新创建这个文件即可。

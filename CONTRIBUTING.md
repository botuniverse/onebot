# 贡献指南

向 OneBot 标准贡献内容应按照下面的流程进行，以使标准的维护和更新工作有条不紊。

## 小型变更流程

对于错别字、语言表述歧义、排版和格式错误等问题，可以直接提  PR 修正，不需要关联到 issue。

更新标准文档时，应遵循 [风格指南](style-guide/README.md)。

## 大型变更流程

### 提出想法

当你对 OneBot 有了新的改进建议时，可在 [discussions](https://github.com/howmanybots/onebot/discussions/categories/%E6%83%B3%E6%B3%95-%E5%BB%BA%E8%AE%AE) 或 OneBot 交流群提出，与社区一起讨论建议的可行性和基本方案。

这一阶段对语言表述的规范性没有要求，可以畅所欲言。

### 编写 RFC

在论坛或交流群进行了基本讨论后，提出想法的人或社区中其他有兴趣的人可在 [issues](https://github.com/howmanybots/onebot/issues) 中提出较为正式的 RFC，总结动机、具体实现方案和局限性等，以待社区进一步审阅。

编写 RFC 应使用中文，使用较为正式的表述和措辞，如果能遵循 [风格指南](style-guide/README.md) 则更佳。

RFC 提交时应标记为 `ST-draft` 即**草稿**状态，在社区给出评论后可不断进行修改，直到社区和核心维护者同意采纳该 RFC 后，标记为 `ST-accepted` 即**接收**状态，等待 PR 实现。

如果 RFC 最终不被采纳，则应标记为 `ST-closed` 即**关闭**状态，同时关闭 issue。

### 更新标准文档

RFC 被接收后，提出 RFC 的人或社区中其他有兴趣的人可在 [pull requests](https://github.com/howmanybots/onebot/pulls) 中提出 PR，实际地修改标准文档。PR 应在右边栏的“Development”区域关联 RFC 对应的 issue。经过 review 和修改后，合并 PR，同时 RFC issue 会自动关闭。

更新标准文档时，应遵循 [风格指南](style-guide/README.md)。

注意，对标准的更新只应发生在本**草案**仓库，当一个版本特性稳定后，将发布为正式版本，并移动到单独的标准文档仓库，只允许进行错别字修正，此后本仓库即变为下一版本的草案。

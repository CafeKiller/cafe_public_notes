---
title: "Obsidian 学习手册"
category: 其他
subcategory: 效率工具
level: 5
tags:
  - markdown
  - obsidian
  - 写作
---

# Obsidian 学习手册

先说一下关于本篇笔记的定性，Obsidian 虽然在绝大多数情况下都是使用 markdown 通用语法进行编写，但是其也继承有部分属于 Obsidian 独有的语法，本篇文章只记录这些语法的使用方式。

## 参考

> [!help] 参考资料
> 
> [官方中文 - ObsidianPublish](https://publish.obsidian.md/help-zh)

## 标注语法

可以说这是一个强化版的 mardkown 引入语法

> 传统 markdown 引入语法

> [!info] obsidian 标注语法
> 标注语法是 obsidian 特有的，在 markdown 中只会以普通引入语法出现。

> [!info] obsidian 标注语法
> > [!info] obsidian 标注嵌套
> > obsidian 标注语法和 mardkown 引入语法一样，也支持嵌套。

> [!info]- obsidian 标注语法
> obsidian 标注语法同时还支持折叠样式
> 在类型标识符后添加加号（+）或减号（-）来使标注可折叠
> （+）表示默认展开 （-）则是默认折叠

obsidian 标注语法支持的类型标识符如下：

> [!info] info 标准
> 别名: None

> [!note] note 笔记
> 别名: None

> [!abstract] abstract 摘要
> 别名: summary tldr

> [!todo] todo 待办
> 别名: None

> [!tip] tip 提示
> 别名: hint important

> [!success] success 成功
> 别名: check done

> [!question] question 问题
> 别名: help faq

> [!warning] warning 警告
> 别名: caution attention

> [!failure] failure 失败
> 别名: fail missing

> [!danger] danger 危险
> 别名: error

> [!bug] bug 错误
> 别名: None

> [!example] example 示例
> 别名: None

> [!quote] quote 引用
> 别名: cite


## Obsidian 推荐

本仓库内的所有本地文档都推荐使用 Obsidian 阅读与编写，同时也推荐以下几个插件或第三方小工具。

### Obsidian 插件市场

> 以下插件可以直接通过 Obsidian 内置的第三方插件市场进行安装。

**StyleText** - 使 Obsidian 可以像 Word 文档一样对文字进行格式化样式处理。

**Git** - git 同步工具，可以实现自动推送和自动拉取等功能。

### 非 Obsidian 内置

> 以下推荐的第三方插件or组件，需要在外部安装下载

[MapleMono中文等宽字体](https://github.com/subframe7536/maple-font/releases/tag/cn-base) - 免费开源的中文等宽字体。

[MapleMono等宽字体（不含中文）](https://github.com/subframe7536/maple-font) - 如果你需要无中文的版本也可以安装这款。
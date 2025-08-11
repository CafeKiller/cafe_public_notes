---
title: husky 手册
category: WEB前端
subcategory: 工程质量
level: 10
tags:
  - husky
---

# husky 手册

日常工作中，几乎每个项目都是由多个人进行维护，每个人的代码书写习惯和风格又不尽相同，在这种情况下，如果没有统一的规范，你就会发现提交到代码仓库的代码格式五花八门，并且 `commit log` 也是乱七八糟，更严重点可能有的小伙伴在提交代码的时候为了省事commit message直接就是两个点点，总之，可能就是怎么省事怎么来。最终导致的结果就是，当你某一天需要 `cherry-pick` 某个 commit 到另外的分支的时，看着 `commmit log` 一脸懵逼。所以，规范和约束在多人协作下，就显得尤为重要。

`git hooks` 类似于前端框架中的生命周期钩子，git 在某些特定事件发生前或后也会有某些执行特定功能的钩子，githooks 就是在git执行特定事件（如commit、push、receive等）时触发运行的脚本。

githooks 保存在 `.git` 文件夹中

> [!tip] 参考
> 
> [husky 简易配置与教程](https://juejin.cn/post/6982192362583752741)
> 
> [husky 中文文档](https://husky.nodejs.cn/get-started.html)

## husky 安装与使用

husky 是一个让配置 git 钩子变得更简单的工具。支持所有的 git 钩子。

```sh
# 执行安装
npm install husky --save-dev

# 自动启用钩子
npm set-script prepare "husky install"
```

在 `package.json` 文件的 scripts 配置项中看到如下代码

```json
"scripts": {
    "prepare": "husky install",
    // other ...
}
```

创建钩子，比如我们创建一个 `commit-msg` 钩子：`pnpm husky add .husky/commit-msg 'pnpm commitlint --edit "$1"'`

将上一步创建的 `commit-msg` 钩子添加到 git 中：`git add .husky/commit-msg`

此外还有 `husky-init` 命令， 执行之后可以在项目中快速的初始化一个 husky。


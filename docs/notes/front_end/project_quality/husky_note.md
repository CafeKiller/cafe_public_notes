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

## git hooks 钩子

<table>
    <thead>
        <tr>
            <th>git hook</th>
            <th>执行时机</th>
            <th>说明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>applypatch-msg</td>
            <td>git am 执行前</td>
            <td>默认情况下，如果commit-msg启用的话，applpatch-msg钩子在启用时会运行commit-msg钩子</td>
        </tr>
        <tr>
            <td>pre-applypatc</td>
            <td>git am 执行前</td>
            <td>默认的pre-applypatch钩子在启用时运行pre-commit钩子（如果后者已启用）</td>
        </tr>
        <tr>
            <td>post-applypatch</td>
            <td>git am 执行后</td>
            <td>这个钩子主要用于通知，不能影响git-am的结果</td>
        </tr>
        <tr>
            <td>pre-commit</td>
            <td>git commit 执行前</td>
            <td>可以使用 git commit --no verify 命令绕过该钩子</td>
        </tr>
        <tr>
            <td>pre-merge-commit</td>
            <td>git merge 执行前</td>
            <td>可以使用 git merge --no verify 命令绕过该钩子</td>
        </tr>
        <tr>
            <td>prepare-commit-msg</td>
            <td>git commit执行之后，编辑器打开之前</td>
            <td></td>
        </tr>
        <tr>
            <td>commit-msg</td>
            <td>git commit 执行前</td>
            <td>可以使用 git commit --no verify 命令绕过该钩子</td>
        </tr>
        <tr>
            <td>post-commit</td>
            <td>git commit 执行后</td>
            <td>不影响git commit的结果</td>
        </tr>
        <tr>
            <td>pre-rebase</td>
            <td>git rebase执行前</td>
            <td></td>
        </tr>
        <tr>
            <td>post-checkout</td>
            <td>git checkout 或 git switch执行后</td>
            <td>如果不使用 --no-checkout 参数，则在 git clone 之后也会执行</td>
        </tr>
        <tr>
            <td>post-merge</td>
            <td>git merge 执行后</td>
            <td>在执行git pull 时也会被调用</td>
        </tr>
        <tr>
            <td>pre-push</td>
            <td></td>
            <td>git push 执行前</td>
        </tr>
        <tr>
            <td>pre-receive</td>
            <td>git receive pack 执行前</td>
            <td></td>
        </tr>
        <tr>
            <td>update</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>proc-receive</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>post-receive</td>
            <td>git receive pack 执行前</td>
            <td>不影响 git receive pack 的执行结果</td>
        </tr>
        <tr>
            <td>post-update</td>
            <td>当git receive pack对 git push 作出反应并更新仓库中的引用时</td>
            <td></td>
        </tr>
        <tr>
            <td>reference-transaction</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>push-to-checkout</td>
            <td>当git receive pack对 git push 作出反应并更新仓库中的引用时，以及当推送试图更新当前被签出的分支且 receive.denyCurrentBranch配置被updateInstead时</td>
            <td></td>
        </tr>
        <tr>
            <td>pre-auto-gc</td>
            <td>git gc --auto 执行前</td>
            <td></td>
        </tr>
        <tr>
            <td>post-rewrite</td>
            <td>执行 git commit --amend 或 git rebase 时</td>
            <td></td>
        </tr>
        <tr>
            <td>sendemail-validate</td>
            <td>git send-email 执行前</td>
            <td></td>
        </tr>
        <tr>
            <td>fsmonitor-watchman</td>
            <td>配置core.fsmonitor被设置为.git/hooks/fsmonitor-watchman 或.git/hooks/fsmonitor-watchmanv2时</td>
            <td></td>
        </tr>
        <tr>
            <td>p4-changelist</td>
            <td>git-p4 submit 执行并编辑完changelist message 之后</td>
            <td>可以使用 git-p4 submit --no-verify绕过该钩子</td>
        </tr>
        <tr>
            <td>p4-prepare-changelist</td>
            <td>git-p4 submit 执行后，编辑器启动前</td>
            <td>可以使用 git-p4 submit --no-verify绕过该钩子</td>
        </tr>
        <tr>
            <td>p4-post-changelist</td>
            <td>git-p4 submit 执行后</td>
            <td></td>
        </tr>
        <tr>
            <td>p4-pre-submit</td>
            <td>git-p4 submit 执行前</td>
            <td>可以使用 git-p4 submit --no-verify绕过该钩子</td>
        </tr>
        <tr>
            <td>post-index-change</td>
            <td>索引被写入 read-cache.c do_write_locked_index后</td>
            <td></td>
        </tr>
    </tbody>
</table>

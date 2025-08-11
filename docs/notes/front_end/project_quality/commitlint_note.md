---
title: Commitlint 手册
category: WEB前端
subcategory: 工程质量
level: 10
tags:
  - Commitlint
---

# Commitlint 手册

Commitlint 是一个用于检查 Git 提交信息的工具，通过检查提交信息是否符合规范，以提高代码库的可读性和维护性。

- 提供了一套规范化的检查规则，且支持自定义规则
- 与 Git 钩子集成，在创建提交时自动检查提交信息是否符合规范

## 安装

**配置 script prepare**

```sh
# 安装 commitlint 和 commitlint 配置
npm install -D commitlint-cli commitlint-config-conventional

# 创建配置文件
echo "import '@commitlint/config-conventional'\n\nexport default {\n  extends: ['@commitlint/config-conventional'],\n}" > commitlint.config.js
```

::: details 检查最新提交

检查当前当前仓库最后一次提交记录是否符合规范，如果检查未通过，会提示错误信息。

```bash
npx commitlint --from HEAD~1 --to HEAD --verbose
# ✔   found 0 problems, 0 warnings
```
:::

**配置 script prepare**

```sh
# 安装 husky
npm install -D husky

# 激活 git hooks
npx husky install

# 添加 commit-msg 钩子
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

::: details 测试 Git Hooks

可以通过简单地提交来测试该钩子，如果配置正常，您应该会看到提交失败的提示。

```bash
npx commitlint --from HEAD~1 --to HEAD --verbose
# ✔   found 0 problems, 0 warnings
```
:::

**配置 script prepare**

在 `package.json` 中增加 prepare 脚本，用于在安装依赖时自动安装 husky。

```json
{
  "scripts": {
    "prepare": "husky install"
    // other ...
  }
}
```
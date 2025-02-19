---
category: 自用
tag:
  - Vue
  - 前端
  - Bug
---

## yarn create vite 报错：文件名、目录名或卷标语法不正确

```log
$ yarn create vite cafe_cosmos --template vue
yarn create v1.22.22
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Installed "create-vite@5.2.3" with binaries:
      - create-vite
      - cva
The filename, directory name, or volume label syntax is incorrect.
error Command failed.
Exit code: 1
Command: D:\Devtool\NodeJS\node_global\bin\create-vite
Arguments: cafe_cosmos --template vue
Directory: D:\Project\Web
Output:

info Visit https://yarnpkg.com/en/docs/cli/create for documentation about this command.
```

> 解决方案: https://segmentfault.com/a/1190000043503907

---

## TS2307: Cannot find module './App.vue' or its corresponding type declarations.

这个错误一般出现在 WebStorm 上, 原因是 vue 添加了 typescript 依赖后, 只认 .ts 不认 .vue

> 解决方案: https://blog.csdn.net/peng2hui1314/article/details/135481952
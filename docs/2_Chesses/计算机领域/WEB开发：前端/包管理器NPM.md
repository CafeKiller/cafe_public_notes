---
category: 学习笔记
tags:
  - 前端开发
  - NPM
  - PNPM
  - Yarn
---

# 包管理器 NPM

# 面试问答

## NPM、PNPM、Yarn 之间的区别？

npm 是 Nodejs 官方指定的包管理，最大的优点就是有官方的背书，直接下载一个 Nodejs 就可以使用了，下载的模块也一定是最全面最权威的。他有一个很致命的问题，那就是：对依赖的管理不合理，不合理之处总结有二：1、依赖之间嵌套严重，导致项目中 `node_modules` 过于庞大，非常占用空间；2、版本不一致导致的开发环境的不一致，虽然都是同一个 package.json 文件，但不同的环境下载的依赖却会出现不同。  

而 yarn 和 pnpm 则是为了解决 npm 所遗留下的问题而诞生的，yarn 是 Facebook 开发的，有着更好的控制管理，采用并行的方式来让下载速度加快。pnpm 则是一个更新的包管理工具了，通过硬链接和符号链接的方式复用已下载的包，大幅减少 `node_modules` 的体积，同样使用并行操作来加强性能，且采用了更严格的依赖管理。  

## 关于 CNPM ？

关于 `cnpm` ：和 npm 的功能基本一致，但其仓库源来自于国内的淘宝团队，这样可以解决 npm 在国内使用的网络问题；需要注意的是淘宝与 npm 官方的同步频率为 10min 一次，所以有部分依赖可能不是最新的。目前，其实不是很推荐使用 cnpm ，因为你完全可以通过修改 npm 的镜像源来修改下载来源。  

## 关于最近的 Bun ？

关于 `bun` ：这是一个和 Nodejs 竞争的框架 bun 的包管理工具，由于 bun 可以完全兼容 npm 的包，所以也可以用来下载前端的这些依赖。

> bun 当前在前端领域可以说非常的『新/稚嫩』，网上的参考教程也非常少，所以请谨慎使用（除非你的动手能力或者探索精神MAX）。

# 其他主流包管理器

## PNPM

使用 npm 安装

```shell
# 安装
npm install -g pnpm

# 查看版本
pnpm -v

# 更新
pnpm add -g pnpm to update

# 配置镜像
pnpm set registry https://registry.npmmirror.com

# 允许设置全局安装包的 bin 文件的目标目录。
pnpm config set global-bin-dir "E:\pnpm-store"

# 包元数据缓存的位置。
pnpm config set cache-dir "E:\pnpm-store\pnpm-cache"

# pnpm 创建的当前仅由更新检查器使用的 pnpm-state.json 文件的目录。
pnpm config set state-dir "E:\pnpm-store\pnpm-state"

# 指定储存全局依赖的目录。
pnpm config set global-dir "E:\pnpm-store\global"

# 所有包被保存在磁盘上的位置。（可选，以下这条命令可以选择不执行也是OK的）
pnpm config set store-dir "E:\pnpm-store\pnpm-store"
```

## Yarn



## Bun
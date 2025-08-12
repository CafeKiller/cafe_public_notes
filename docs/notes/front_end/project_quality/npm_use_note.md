---
title: NPM 包管理器使用手册
category: WEB前端
subcategory: 工程质量
level: 10
tags:
  - NPM
---

# NPM 包管理器使用手册

npm 全称 `Node Package Manager`，它的诞生是为了解决 Node 中第三方包共享的问题。

和浏览器一样，由于都是 JavaScript，所以前端开发也使用 npm 作为第三方包管理工具。

例如大名鼎鼎的 jQuery、Bootstrap 等都可以通过 npm 来安装。

所以官方把 npm 定义为 `JavaScript Package Manager`。

npm 有两层含义。一层含义是 Node 的开放式模块登记和管理系统，网址为 [npmjs.org]()。

另一层含义是 Node 默认的模块管理器，是一个命令行下的软件，用来安装和管理 Node 模块。

npm 不需要单独安装。在安装 Node 的时候，会连带一起安装 npm。


## 常用命令

```shell
# 查看 npm 版本
npm --version

# 升级 npm 
npm install npm --global

# 在项目中初始化一个 package.json 文件
# 凡是使用 npm 来管理的项目都会有这么一个文件
npm init

# 跳过向导，快速生成 package.json 文件
# 简写是 -y
npm init --yes

# 一次性安装 dependencies 中所有的依赖项
# 简写是 npm i
npm install

# 安装指定的包，可以简写为 npm i 包名
# npm 5 以前只下载，不会保存依赖信息，如果需要保存，则需要加上 `--save` 选项
# npm 5 以后就可以省略 --save 选项了
npm install 包名

# 一次性安装多个指定包
npm install 包名 包名 包名 ...

# 安装指定版本的包
npm install 包名@版本号

# npm list命令以树型结构列出当前项目安装的所有模块，以及它们依赖的模块。
npm list

# 加上global参数，会列出全局安装的模块
npm list -global

# npm list命令也可以列出单个模块
npm list 包名

# 安装全局包
npm install --global 包名

# 更新本地安装的模块
# 它会先到远程仓库查询最新版本，然后查询本地版本。
# 如果本地版本不存在，或者远程版本较新，就会安装
npm update [package name]

# 升级全局安装的模块
npm update -global [package name]

# 卸载指定的包
npm uninstall 包名

# 查看包信息
# view 别名：v、info、show
npm view 包名

# 查看使用帮助
npm help

# 查看某个命令的使用帮助
# 例如我忘记了 uninstall 命令的简写了，
# 这个时候，可以输入 `npm uninstall --help` 来查看使用帮助
npm 命令 --help
```

## 查看依赖包的安装路径

```sh
# 当前项目
npm root

# 全局
npm root -g
```

## 清除缓存

```sh
npm cache clean -f
```

## 设置淘宝镜像

```sh
npm config set registry https://registry.npmmirror.com

# 验证是否设置成功
npm config get registry
```

## 打开文档

```sh
# 在浏览器中打开当前项目的文档
npm docs

# 在浏览器中打开指定 npm 包的文档
npm docs [package-name]
```
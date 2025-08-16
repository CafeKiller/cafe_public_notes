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

# 更新本地安装的模块，它会先到远程仓库查询最新版本，然后查询本地版本。
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
# 例如我忘记了 uninstall 命令的简写了，这个时候，可以输入 `npm uninstall --help` 来查看使用帮助
npm 命令 --help

# 列出当前项目中需要更新的包
npm outdated

# 检查当前项目中的依赖项是否存在安全漏洞
npm audit

# 发布自己开发的包到 npm 库中
npm publish 

# 登录到 npm 账户。
npm login
# 注销当前 npm 账户。
npm logout
# 将本地模块链接到全局的 node_modules 目录下
npm link

# 用于列出所有的 npm 配置信息。执行该命令可以查看当前系统和用户级别的所有 npm 配置信息，以及当前项目的配置信息（如果在项目目录下执行该命令）
npm config list

# 用于获取当前 npm 配置中的 registry 配置项的值。registry 配置项用于指定 npm 包的下载地址，如果未指定，则默认使用 npm 官方的包注册表地址
npm get registry 

# 将 registry 配置项的值修改为指定的 <registry-url> 地址
npm config set registry <registry-url> 
```

## Package JSON

执行 `npm init` 便可以初始化一个 `package.json`

- `name` 项目名称，必须是唯一的字符串，通常采用小写字母和连字符的组合。
- `version` 项目版本号，通常采用语义化版本号规范。
- `description` 项目描述。
- `main` 项目的主入口文件路径，通常是一个 JavaScript 文件。
- `keywords` 项目的关键字列表，方便他人搜索和发现该项目。
- `author` 项目作者的信息，包括姓名、邮箱、网址等。
- `license` 项目的许可证类型，可以是自定义的许可证类型或者常见的开源许可证（如 `MIT`、`Apache` 等）。
- `dependencies` 项目所依赖的包的列表，这些包会在项目运行时自动安装。
- `devDependencies` 项目开发过程中所需要的包的列表，这些包不会随项目一起发布，而是只在开发时使用。
- `peerDependencies` 项目的同级依赖，即项目所需要的模块被其他模块所依赖。
- `scripts` 定义了一些脚本命令，比如启动项目、运行测试等。
- `repository` 项目代码仓库的信息，包括类型、网址等。
- `bugs` 项目的 bug 报告地址。
- `homepage` 项目的官方网站地址或者文档地址。

> [!tip] 版本号
> 
> `version` 三段式版本号一般是 `1.0.0` 即：`大版本号.次版本号.修订号`
> 
> - **大版本号** 一般是有重大变化才会升级
> - **次版本号** 一般是增加功能进行升级 
> - **修订号** 一般是修改 bug 进行升级

> `npm install` 安装模块的时候一般是扁平化安装的，但是有时候出现嵌套的情况是因为版本不同
> 
> A 依赖 C1.0,
> B 依赖 C1.0,
> D 依赖 C2.0,
> 
> 此时 `C 1.0` 就会被放到A B的 `node_moduels`，`C2.0` 会被放入D模块下面的 `node_moduels`
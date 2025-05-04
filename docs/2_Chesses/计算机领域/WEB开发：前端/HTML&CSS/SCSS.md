---
category: 学习笔记
tags:
  - CSS
  - SCSS
  - 前端开发
---

# CSS增强语言 SCSS

## 安装 

原生建议直接使用 VScode 插件，或者 WebStorm 中内置的。

如果你需要使用到 SASS 命令，可以使用：

```shell
# 通过 npm 安装
npm install -g sass --sass-syntax

# 编译
sass input.scss output.css

# 监听并编译
sass --watch input.scss:output.css

# 监听整个文件夹
sass --watch app/sass:public/stylesheets
```
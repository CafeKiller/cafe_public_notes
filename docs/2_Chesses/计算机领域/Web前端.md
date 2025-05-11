---
category: 学习笔记
tags:
  - 汇总
  - 前端开发
star: true
---

# Web前端笔记

## HTML

> [!help] 参考资料
> 
> [教程 - 阮一峰 / HTML教程](https://wangdoc.com/html/)  
> 
> [教程 - Canvas入门到精通](https://segmentfault.com/a/1190000042211619)
>  
> [实体书籍 - JavaScript高级程序设计](https://book.douban.com/subject/35175321/)

### 传统组件

> [!help] 相关
> 
> #### Swiper
> 
> swiper 当前还在活跃状态，每年都有更新，**但中文文档中的相关配置和信息都基本停留在了 7.0 版本，后续版本的更新可能存在差异**，如果你使用的是最新版本或者比较新的版本（大概是8.0以上的）我都推荐通过阅读官方的文档，以此为标准。
> 
> 但如果你使用的是 8.0 以下的版本推荐阅读中文文档，中文文档比较契合国内 swiper 的使用习惯。同时需要注意，4.0 之前的两版本 3.X 和 2.X 差异普遍比较大，且性能比较低
> 
> 除非你的项目也是远古项目，否则不推荐使用，若一定需要使用一定要真准对应版本的文档（swiper 中文网有提供）。
> 
> [使用教程 | 安装 | 实际应用场景](../../1_Projects/文章仓库/计算机相关/Swiper.md)

## CSS

> [!help] 参考资料
> 
> [CSS 教程 | 菜鸟教程](https://www.runoob.com/css/css-tutorial.html)
> 
> [权威教程 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Getting_started)
> 
> [业内规范 | TGIdea团队前端规范（腾讯业务）](https://tgideas.qq.com/doc/frontend/spec/common/css.html)

### 增强语言

> [!help] 相关资料
> 
> #### SASS(SCSS)
> 
> SASS（SCSS）是一类辅助 CSS 的插件，它在 CSS 语法的基础上进行了增强，增加了一些高级功能（函数、混合、循环、变量...），且在语法上相对 CSS 更直观和优雅，编写完成进行编译后可以完全兼容 CSS，覆盖几乎所有的浏览器。
> 
> [使用教程 | 安装 | 基础语法 | 常用SCSS片段](../../1_Projects/文章仓库/计算机相关/SCSS.md)
> 
> [关于 SCSS 和 SASS 的区别](../../1_Projects/文章仓库/计算机相关/SCSS#关于SASS和SCSS的区别)

### 动画相关

> [!help] 相关资料
> 
> #### GSAP
> 
> [GSAP 中文教程（非官方）](https://gsap.framer.wiki/stated)
>
> [GSAP 官方文档](https://gsap.com/docs/v3/GSAP/)
>
> [GSAP 官方教程](https://gsap.com/resources/get-started)
> 
> #### AnimateCSS
> 
> [文档（繁体中文版）](https://animatecss.dev.org.tw/)
>
> [简易教程](https://www.tides.cn/p_css-animate.css-tutorial)
> 
> > AnimateCSS 相对比较简单，上手比较轻松，只需记住 AnimateCSS 的核心是 「类名」 即可。

### 常用操作

[环境适配 - 判断主题色 | 横竖屏切换](../../1_Projects/文章仓库/计算机相关/CSS环境适配)

## 项目工程化

### 质量校验

> [!help] 相关资料
> 
> #### eslint
> 
> #### prettierrc
> 
> #### stylelintrc
> 
> #### husky
> 
> #### Commitlint

### 包管理器

[简易使用教程 - 其他主流包管理器 | PNPM | Yarn | Bun](../../1_Projects/文章仓库/计算机相关/其他主流包管理器.md)

[一些关于包管理器的问题](../../1_Projects/文章仓库/计算机相关/包管理器相关问题.md)

## ECMAScript

[ES6+ 上的一些坑](../../3_Records/踩坑指南/JavaScript.md)

[ES6+ 上的一些新函数 | requestAnimationFrame](../../1_Projects/文章仓库/计算机相关/ECMAScript新函数.md)

[ES6+ 历年新变化](../../1_Projects/文章仓库/计算机相关/ES6新机制)

## CSR 框架

### Vue

> [!help] 参考资料
> 
> [官方教程 - Vue快速入门](https://cn.vuejs.org/guide/quick-start.html)
> 
> [在线书籍 - Vue3.0 从入门到实战](https://github.com/SJanJan/Vue3-book)

### React

> [!help] 参考资料
> 
> [官方教程 - React快速入门](https://zh-hans.react.dev/learn)
> 
> [在线书籍 - React技术揭秘](https://github.com/BetaSu/just-react)
>  
> [技术文章 - ReactFiber架构的原理和工作模式](https://segmentfault.com/a/1190000044468085)


## SSG 框架

### VuePress

> [!help] 参考资料
> 
> [VuePress 官方文档](https://vuepress.vuejs.org/zh/guide/getting-started.html)
> 
> [主题 VuePress-Theme-Hope 文档](https://theme-hope.vuejs.press/zh/config/intro.html)

### Astro

> [!help] 参考资料
> 
> [Astro 官方文档](https://docs.astro.build/zh-cn/install-and-setup/)

## 底层原理

[关于浏览器相关的底层原理知识点](../../1_Projects/文章仓库/计算机相关/浏览器基本原理.md)


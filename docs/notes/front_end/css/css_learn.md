---
title: CSS 基本使用手册
category: WEB前端
subcategory: CSS
level: 2
zIndex: 100
tags:
  - CSS
---

# CSS 基本样式

[[toc]]

> [!tip] 参考资料
> 
> [CSS 教程 | 菜鸟教程](https://www.runoob.com/css/css-tutorial.html)
> 
> [权威教程 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Getting_started)
> 
> [业内规范 | TGIdea团队前端规范（腾讯业务）](https://tgideas.qq.com/doc/frontend/spec/common/css.html)
> 
> [推荐 | 常更新 |张鑫旭的 CSS 博客](https://www.zhangxinxu.com/wordpress/category/css/)


## 环境适配

### 深色主题

```css
@media (prefers-color-scheme: dark) {
    /* 深色主题的样式 */
    html {
        --color-text: #ffffff;
        --bg-color: #1d2025;
        --theme-color: deepskyblue;
    }
}
```

或者也可以使用 Javascript 脚本监听

```javascript
const theme = window.matchMedia("(prefers-color-scheme: dark)");
if (theme.matches) {
    document.body.classList.add("dark");
}

// 监听主题变化
theme.addEventListener("change", (e) => {
    if (e.matches) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
});
```

### 横竖屏切换

```css
@media screen and (orientation: portrait) {
    /* 竖屏样式 */
}

@media screen and (orientation: landscape) {
    /* 横屏样式 */
}
```

使用 javascript 监听

```javascript
const screen = window.matchMedia("(orientation: portrait)");
if (screen.matches) {
    // 竖屏
} else {
    // 横屏
}

// 监听屏幕变化
screen.addEventListener("change", (e) => {
    if (e.matches) {
        // 竖屏
    } else {
        // 横屏
    }
});
```

## 常用技巧

### 滚动条样式

```css
/* 滚动条 */
::-webkit-scrollbar {
  /* 纵向 */
  width: 8px;
  /* 横向 */
  height: 8px;
  background-color: #ededed;
}
/* 滚动条上的按钮(上下箭头) */
::-webkit-scrollbar-button {
  display: none;
}
/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background-color: #ededed;
}
/* 滚动条轨道，没有滑块 */
::-webkit-scrollbar-track-piece {
  background-color: #ededed;
}
/* 垂直滚动条和水平滚动条交汇的部分 */
::-webkit-scrollbar-corner {
  background-color: #ededed;
}
/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #d6d6d6;
}
/* 右下角拖动块 */
::-webkit-resizer {
  display: none;
}
```

### 网页置灰

```css
html {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  /* 兼容 Firefox */
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale");
  /* 兼容 IE */
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  /*兼容 Chrome Safari Edge 等 */
  -webkit-filter: grayscale(1);
}
```

> 同理，也可以用在页面任意元素上，完成局部元素置灰。

### 实现垂直水平居中

`text-align + line-height`

> 只能在行内内容在一行时使用（换行了就 GG），同时还需要知道高度的具体值

```css
.parent {
  height: 150px;
  /* 行高的值要与 height 一致 */
  line-height: 150px;
  text-align: center;
}
.child {
  /* 如果子元素是块级元素需要改为行内或行内块级才能生效 */
  display: inline-block;
  vertical-align: middle;
}
```

---

`absolute + transform`

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  left: 50%;
  top: 50%;
  tansform: translate(-50%, -50%);
}
```

---

`display: table-cell`

```css
.parent {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
```
---

`display: flex;`

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

---

`flex + margin`

```css
.parent {
  display: flex;
}
.child {
  margin: auto;
}
```

---

`display: grid`

```css
.parent {
  display: grid;
}
.child {
  justify-self: center;
  align-self: center;
}
```

---

`grid + margin`

```css
.parent {
  display: grid;
}
.child {
  margin: auto;
}
```

## `link` 和 `@import` 加载样式的区别

`<link>` 是一个 `HTML` 标签，其规定了当前文档与外部资源的关系

`@import` 是一个 `CSS` 语法规则，用于从其他样式表导入样式规则

> [!tip] link 和 @import 加载样式的区别
> - 从属关系
>   - `<link>` 是一个 HTML 标签，只能出现在 `<head>` 标签中
>   - `@import` 是一个 CSS 语法规则，只能在 `<style>` 标签和 CSS 文件中使用
> - 应用范围
>   - `<link>` 标签用于链接各种类型的外部资源（这里只举三个例子）
>     - 加载 CSS：`<link rel="stylesheet" href="/index.css" />`
>     - 加载网站图标（favicon）：`<link rel="icon" href="favicon.ico" />`
>     - DNS 预解析：`<link rel="dns-prefetch" href="https://notes.fe-mm.com">`
>   - `@import` 只能用于引入 CSS
> - 加载顺序
>   - `<link>` 会在浏览器加载页面时同时加载（多个 `<link>` 会并行加载）
>   - `@import` 会在浏览器解析到 CSS 中的 `@import` 时再加载（多个 `@import` 会串行加载）
> - DOM 可控性
>   - `<link>` 可以通过 JavaScript 操作 DOM 进行插入
>   - `@import` 没有 DOM 接口，无法通过 JavaScript 操作
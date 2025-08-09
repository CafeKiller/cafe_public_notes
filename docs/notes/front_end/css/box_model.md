---
title: CSS 理论之「盒模型」
category: WEB前端
subcategory: CSS
level: 2
zIndex: 99
tags:
  - CSS
  - 盒模型
  - 理论知识
---

# CSS 理论之「盒模型」

> [!info] 参考
>
> [CSS 基础框盒模型介绍 - CSS：层叠样式表 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)

## 什么是盒模型？

当对一个文档进行布局时，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子；

CSS 决定这些盒子的大小、位置以及属性（如颜色、背景、边框尺寸等）

每个盒子（即盒模型）从外到内由这四个部分组成

### 内容区域（content）

内容区域（content area）由内容边界限制，容纳着元素的“真实”内容，例如文本、图像，或是一个视频播放器。

它的尺寸为内容宽度（或称 `content-box` 宽度）和内容高度（或称 `content-box` 高度）。它通常含有一个背景颜色（默认颜色为透明）或背景图像。

如果 `box-sizing` 为 `content-box`（默认），则内容区域的大小可明确地通过 `width`、`min-width`、`max-width`、`height`、`min-height` 和 `max-height` 控制。

---

### 内边距区域（padding）

内边距区域（padding area）由内边距边界限制，扩展自内容区域，负责延伸内容区域的背景，填充元素中内容与边框的间距。它的尺寸是 `padding-box` 宽度 和 `padding-box` 高度。

内边距的粗细可以由 `padding-top`、`padding-right`、`padding-bottom`、`padding-left`，和简写属性 `padding` 控制。

---

### 边框区域（border）

边框区域（border area）由边框边界限制，扩展自内边距区域，是容纳边框的区域。其尺寸为 `border-box` 宽度和 `border-box` 高度。

边框的粗细由 `border-width` 和简写的 `border` 属性控制。如果 `box-sizing` 属性被设为 `border-box`，那么边框区域的大小可明确地通过 `width`、`min-width`, `max-width`、`height`、`min-height`，和 `max-height` 属性控制。

假如框盒上设有背景（`background-color` 或 `background-image`），背景将会一直延伸至边框的外沿（默认为在边框下层延伸，边框会盖在背景上）。此默认表现可通过 CSS 属性 `background-clip` 来改变。

---

### 外边距区域（margin）

外边距区域（margin area）由外边距边界限制，用空白区域扩展边框区域，以分开相邻的元素。它的尺寸为 `margin-box` 宽度和 `margin-box` 高度。

外边距区域的大小由 `margin-top`、`margin-right`、`margin-bottom`、`margin-left`，和简写属性 `margin` 控制。在发生外边距合并的情况下，由于盒之间共享外边距，外边距不容易弄清楚。

最后，请注意，除可替换元素外，对于行内元素来说，尽管内容周围存在内边距与边框，但其占用空间（每一行文字的高度）则由 `line-height` 属性决定，即使边框和内边距仍会显示在内容周围。


## 盒模型分类

盒模型分为 `W3C` 标准盒模型和 `IE` 盒模型，其区别只有一个：计算盒子实际大小（即总宽度/总高度）的方式不一样

- `W3C` 标准盒模型（默认）
  - 盒子实际宽 = `width + padding + border`
  - 其中 `width` 只包含 `content`（即内容区域的宽度）
  - 通过 `box-sizing: content-box`; 来设置为 W3C 标准盒模型

- `IE` 盒模型
  - 盒子实际宽 = `width`
  - 其中 `width` = `content + border + padding`
  - 通过 `box-sizing: border-box`; 来设置为 IE 盒模型

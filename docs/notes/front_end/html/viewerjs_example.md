---
title: "图片预览组件 ViewerJS 使用指南"
category: WEB前端
subcategory: HTML
level: 1
tags:
  - Swiper
  - 组件
---

# 图片预览组件 ViewerJS 使用指南

Viewer.js 是一款强大的图片查看器。

功能相对齐全的图片预览插件，开发者也是国人拥有比较完备的中文文档，使用起来也比较简单。

> [!tip] 参考资料
> 
> [Viewer.js 官方网站](https://fengyuanchen.github.io/viewerjs/)
>
> [Viewer.js 图片预览插件使用](https://www.cnblogs.com/matanzhang/p/11495678.html)

## 使用

JavaScript 或者 JQuery 原生使用

> 需要注意，JS 和 JQ 的源码是不太一样的，没办法混用。这边主要使用 JS 版。

```html
<!-- 下载 -->
<!-- JS： https://github.com/fengyuanchen/viewerjs -->
<!-- JQ： https://github.com/fengyuanchen/jquery-viewer -->

<link rel="stylesheet" href="css/viewer.min.css">
<script src="js/viewer.min.js"></script>

<!-- 单图 -->
<div>
  <img id="image" data-original="img/viewer1.jpg" src="img/viewer1.jpg" alt="图片1">
</div>

<!-- 多图 -->
<ul id="viewer">
  <li><img data-original="img/viewer1.jpg" src="img/viewer1.jpg" alt="图片1"></li>
  <li><img data-original="img/viewer2.jpg" src="img/viewer2.jpg" alt="图片2"></li>
  <li><img data-original="img/viewer3.jpg" src="img/viewer3.jpg" alt="图片3"></li>
  <li><img data-original="img/viewer4.jpg" src="img/viewer4.jpg" alt="图片4"></li>
  <li><img data-original="img/viewer5.jpg" src="img/viewer5.jpg" alt="图片5"></li>
  <li><img data-original="img/viewer6.jpg" src="img/viewer6.jpg" alt="图片6"></li>
</ul>

<script>
  var image = new Viewer(document.getElementById('image'),{
    url: 'data-original'
  });

  var viewer = new Viewer(document.getElementById('viewer'),{
    url: 'data-original'
  });
</script>
```

也可以使用 npm 下载

```shell
npm install viewerjs
```
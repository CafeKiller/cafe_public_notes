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

## 基本语法

**嵌套**

```scss
div {
    width: 100px;
    height: 100px;
    .item {
        width: 50px;
    }
    &:hover {
        background-color: red;
        .item {
            width: 100px;
        }
    }
}
```

**变量**

```scss
$font-size: 12px;

p {
    font-size: $font-size;
}
```
> 这个在 CSS 变量出现后，慢慢的用的就比较少了

**运算**

```scss
// 注意单位要一致
$font-size: 12px * 2;
```

**函数**

```scss
@function toRem($value) {
	@return ($value * 2 / 100) * 1rem;
}
```

**循环**

```scss
@for $i from 1 through 100 {
    .progress[data-progress="#{$i}"] {
        width: #{$i +"%"};
    }
}
```

**继承**

```scss
.box-type1 {
    width: 100px;
    height: 100px;
    border: 1px solid #000;
    border-radius: 5px;
}

.box-type2 {
    @extend .box-type1;
    background-color: red;
}
```
> 涉及到多层嵌套时，需要注意继承的层级关系，否则会出现问题。
>
> 建议把需要继承的样式放在最外层，然后再进行继承。同时也方便管理。

**注释**

```scss
// 单行注释，不会被编译至 css 文件中

/* 
    多行注释，
    最终会被编译至 css 文件中
*/
```

**属性嵌套**

```scss
p {
    font: {
        family: Arial;
        size: 12px;
        weight: bold;
    }
    line-height: 1.5;
    color: #333;
}
```
> 这个可能使用的相对较少，一是这些简陋的属性名并不会被 IDE 识别到，没法做到语法提示。
>
> 二是这些 css 属性本身就支持复合写法，且常用写法并不难。

**if判断**

```scss
@function toRem($value) {
    @if $value > 100 {
        @return ($value * 2 / 10) * 1rem;
    } @else if $value > 50 {
        @return ($value * 5 / 10) * 1rem;
    } @else {
        @return ($value * 8 / 10) * 1rem;
    }
}
```
> 判断相较于循环用的比较少


## SASS 和 SCSS 的区别

SASS 和 SCSS 其实是一样的 CSS 预处理语言，SCSS 是 SASS3 引入新的语法，其后缀名是分别为 `.sass` 和 `.scss` 两种

两者是有不同的，即 SASS 之后 SCSS 的编写规范基本和 CSS 一致，SASS 时代是有严格的缩进规范并且没有 `{}` 和 `；`。

目前因为 SCSS 可以与 CSS 更好的兼容，所以一般使用 SCSS 编写样式（.css 文件可以直接修改后缀为 .scss 文件，同时还不出现问题）。

```sass
// SASS 语法
$primary-color: #333

body
    font: 100% $primary-color
    background-color: #fff
```

```scss
// SCSS 语法
$primary-color: #333;

body {
    font: 100% $primary-color;
    background-color: #fff;
}
```

## 参考

> [!tip] 参考资料
> 
> [教程 - 菜鸟 / SCSS教程](https://www.runoob.com/sass/sass-tutorial.html)
>
> [教程 - 阮一峰 / SASS用法指南](https://ruanyifeng.com/blog/2012/06/sass.html)
>
> [官方中文 - SASS中文网DOCS](https://www.sass.hk/docs/)
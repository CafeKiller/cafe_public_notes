# SCSS使用

> 参考链接:  
> https://www.runoob.com/sass/sass-install.html  
> https://ruanyifeng.com/blog/2012/06/sass.html  
> https://www.sass.hk/docs/  

## 安装

SASS 是基于 Ruby 语言开发的, 如果是安装正常安装是需要依赖 Ruby 的环境的, 但这里只是前端开发使用, 那就是建议使用 `npm` 安装了.

```shell
npm install -g sass # 全局安装sass

sass --version # 检查是否安装成功
```

## 使用

注意, SASS 是存在两种语法的, 一种是如今主流的 scss, 这种是基于 CSS3 的一种简单扩展, 所有的 CSS3 语法在 scss 都可以使用, 后缀是 `.scss`

另一种则是早期的 sass, 是一种简化版. 使用 “缩进” 代替 “花括号” 表示属性属于某个选择器，用 “换行” 代替 “分号” 分隔属性. 后缀是 `.sass`

两者在功能上没有差异, 只是当前 `scss` 更加的主流一些(可能是更符合CSS的书写习惯?), 总之, 本文将使用 `.scss` 做演示. 

> 两种格式都可以通过SASS内置的 sass-convert 进行转换

```shell
sass-convert style.sass style.scss # .sass 转为 .scss
sass-convert style.scss style.sass # .scss 转为 .sass

# 将 .scss 编译为 .css
sass input.scss outer.css

# 四种编译风格
sass --style nested input.scss outer.css # 嵌套缩进的css代码, 默认值.
sass --style expanded input.scss outer.css # 没有缩进的、扩展的css代码
sass --style compact input.scss outer.css # 简洁格式的css代码
sass --style compressed input.scss outer.css # 压缩后的css代码, 一般生产环境使用
```
> 不过, 很多时候我们不需要自己使用命令行编译, 可以配置IDE上的sass插件使用

## 基本用法

```scss
// 变量, 以$为开头
$blueColor: #2f00ff;
h1 {
    color: $blueColor;
}

// 如果变量需要镶嵌在字符串之中，就必须需要写在 #{} 之中。
$side : left;
.rounded {
　　border-#{$side}-radius: 5px;
}

// 计算
body {
    margin: (16px / 2);
    top: 186px + 37px;
    right: $var * 10%;
}

// 嵌套, 属性也是允许嵌套的
.wrap {
    .header {
        // 属性嵌套时, 父级必须加 : 
        background: {
            image: url(xxx.png);
            size: 100% auto;
        }
    }
    .cont {
        .part1 {

        }
        .part2 {

        }
    }
    a {
        // 可以使用&引用父元素
        &:hover {
            color: deepskyblue;
        }
    }
}

// 注释
// 这是单行注释, 不会在编译后的 css 文件保留
/* 
   这个原生 css 的注释, 编译后会在 css 文件中保留.
   但压缩版本的 css 文件中也是不会保留的
*/ 
/*!
   这个是重要注释, 即使是压缩版本的 css 文件也是会保留的.
   常用于声明版权信息等重要操作上.
*/ 
```

## 代码复用

> 这个算是原生 CSS3 比较恶心的一点, 很多代码没法高效的复用.

```scss
// 继承
.tr_color { // 渐变色的通用样式
    background-clip: text;
    color: transparent;
}
.tr_color1 { // 渐变色1
    @extend .tr_color;
    background-image: linear-gradient(#ffefca, #ffe0a0);
}
.tr_color2 { // 渐变色2
    @extend .tr_color;
    background-image: linear-gradient(#242425 40%, #8e8e8e);
}

// Mixin
// Mixin有点像C语言的宏（macro），是可以重用的代码块
@mixin left { // 定义mixin
    float: left;
    margin-left: 10px;
}
div { 
    @include left; // 使用mixin
}

// mixin 是允许使用指定参数和缺省参数
@mixin left($value: 10px) {
    float: left;
    margin-right: $value;
}
div {
    @include left(20px);
}

// 定义一个用于生成 浏览器前缀 的mixin
@mixin rounded($vert, $horz, $radius: 10px) {
    border-#{$vert}-#{$horz}-radius: $radius;
    -moz-border-radius-#{$vert}#{$horz}: $radius;
    -webkit-border-#{$vert}-#{$horz}-radius: $radius;
}
// 使用
#navbar li { @include rounded(top, left); }
#footer { @include rounded(top, left, 5px); }
```

## 高级语法

```scss
// if 分支判断
@if lightness($color) > 30% {
    background-color: #000;
} @else {
    background-color: #fff;
}

// for 循环
@for $i from 1 to 10 {
    .border-#{$i} {
        border: #{$i}px solid blue;
    }
}

// while 循环
$i: 6;
@while $i > 0 {
    .item-#{$i} { width: 2em * $i; }
    $i: $i - 2;
}

// each 与 for 类似
@each $member in a, b, c, d {
    .#{$member} {
        background-image: url("/image/#{$member}.jpg");
    }
}

// 自定义函数
@function double($n) {
    @return $n * 2;
}
#sidebar {
    width: double(5px);
}
```

> 更多高阶函数请看这里:   
> https://www.runoob.com/sass/sass-functions.html
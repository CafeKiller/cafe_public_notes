---
title: AnimateCSS 基本使用手册
category: WEB前端
subcategory: CSS
level: 2
zIndex: 80
tags:
  - CSS
  - AnimateCSS
  - 动画
---

# AnimateCSS 基本使用手册

AnimateCss是一个使用 CSS3 的 animation 制作的动画效果的 CSS 集合，里面预设了很多种常用的动画，且使用非常简单。

AnimateCSS 相对比较简单，上手比较轻松，只需记住 AnimateCSS 的核心是 「类名」 即可。

> [!tips] 参考资料
> 
> [（强烈建议阅读）官方文档](https://animate.style/)
>
> [animate.css 动画库教程](https://www.tides.cn/p_css-animate.css-tutorial)

## 安装

CDN 引入

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
```

NPM 安装

```shell
npm install animate.css
```

## 示例

Animate.css 提供了多种动画效果，你可以通过为 HTML 元素添加特定的类名来使用这些效果。

基本用法： 在你的 HTML 文件中，为想要应用动画的元素添加 `animated` 类和一个具体的动画类名，例如 `bounce`



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animate.css Example</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <style>
        #myElement {
            padding: 20px;
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="myElement">Click me!</div>

    <script>
        document.getElementById('myElement').addEventListener('click', function() {
            // 先移除所有动画类名，防止动画效果叠加
            var element = this;
            element.classList.remove('animate__animated', 'animate__bounce');

            // 设置一个小的延迟，确保动画类名被移除
            setTimeout(function() {
                // 添加动画类名
                element.classList.add('animate__animated', 'animate__bounce');

                // 等待动画完成后移除动画类名（这里假设动画持续时间为1秒）
                setTimeout(function() {
                    element.classList.remove('animate__animated', 'animate__bounce');
                }, 1000); // 动画持续时间需要根据实际使用的动画调整
            }, 10); // 10ms 的延迟确保移除操作在点击事件之后立即执行
        });
    </script>
</body>
</html>
```

延迟和循环： animate.css 还支持动画延迟和无限循环。你可以通过添加 `animate__delay-` 和 `animate__infinite` 类名来实现这些效果；

触发动画： 默认情况下，animate.css 动画在页面加载时立即触发。如果你想在特定事件（如点击）时触发动画，你可以使用 JavaScript 来动态添加和移除动画类名。
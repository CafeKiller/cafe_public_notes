---
title: GSAP 基本使用手册
category: WEB前端
subcategory: CSS
level: 2
zIndex: 80
tags:
  - CSS
  - GSAP
  - 动画
---

# GSAP 基本使用手册

GSAP是前端业内非常有名的一个动效库，有大量的优秀的网站都在使用它。它不仅能在原生JS的环境下使用，也能配合各种当前流行的框架进行使用

> [!tip] 参考资料
>
> [(强烈建议) GSAP从入门到精通 - 稀土掘金](https://juejin.cn/post/7207973807775744055)
>
> [(强烈建议) GSAP 中文教程](https://gsap.framer.wiki/stated)
>
> [GSAP 官方文档](https://gsap.com/docs/v3/GSAP/)
>
> [GSAP 官方教程](https://gsap.com/resources/get-started) 

## 基础教学

由于 gsap 主要用于视觉动画，因此非常建议配合上面的参考资料学习，以下只是简单的介绍一下

### 动画函数

---

主要有这四个：

`gsap.to` ：最常用的动画类型，从当前状态开始。

`gsap.from` ：和.to相反，从一个状态开始到当前状态。

`gsap.fromTo` ：可以自定义开始和结束状态。

`gsap.set` ：立即设置属性，没有动画效果。

```javascript
gsap.to(".box", { x: 300 });

gsap.from(".box", { x: 300 });

gsap.fromTo(
  ".box",
  {
    x: 0,
    y: 0,
  },
  {
    x: 400,
    y: 50,
  },
);


gsap.set(".box", { x: 400, y: 50 });
```

### 特殊属性

---

特殊属性用来调整动画的表现形式，下面的文档中提供了一些常用的属性：

`duration` :  动画的持续时间（单位：秒）默认0.5秒

`delay` :  动画延迟时间

`repeat` :  动画重复的次数

`yoyo` :  布尔值，如果为true，每次其他动画就会往相反方向运动（像yoyo球）默认false

`stagger` :  每个目标动画开始之间的时间（秒）ease控制动画期间的变化率，默认"power1.out"

`onComplete` :  动画完成时的回调函数


```javascript
gsap.to(".box", {
  rotation: 360,
  x: 300,
  xPercent: -100,
  duration: 2,
  repeat: 2,
  yoyo: true,
});
```


### 时间线timeline

---

我们动画经常会遇到多个对象的情况，虽然我们可以使用上面的delay进行简单的控制，延迟物体的动画开始时间；但是如果中间某个物体的动画执行时间突然延长了，那么其后面所有的动画时间需要进行手动进行延迟，这显得非常不方便；因此我们需要引入时间线timeline的概念。

> 时间线是GSAP最重要的概念之一

此处强烈建议阅读：[GSAP 中文教程 - 如何使用Timeline](https://gsap.framer.wiki/timelines)

该教程非常详细的介绍了如何使用 timeline 的一些特性（主要是该教程的视觉效果做的非常好）


### 回调函数

---

在有些情况下，我们需要对动画的开始、过程、结束的某个时间点进行回调操作，gsap提供了以下回调函数：

`onComplete` ：动画完成时。

`onStart` ：动画开始时

`onUpdate` ：动画更新时。

`onRepeat` ：动画重复时。

`onReverseComplete` ：当动画在反转到达开始时。

```javascript
gsap.to(".class", {
  x: 100, 
  onComplete: () => console.log("the tween is complete")
})
```

## Vue中使用

安装 gsap 

```shell
npm install gsap

# 或
pnpm add gsap
```

基本使用

1、导入 GSAP：在组件中引入 gsap。

2、引用 DOM 元素：使用 ref 或原生 DOM 选择器来定位需要动画的元素。

3、调用 GSAP 的方法：使用 `gsap.to`、`gsap.from` 等方法应用动画。


```vue
<template>
  <div class="app">
    <button @click="startAnimation">开始动画</button>
    <div class="box" ref="boxRef"></div>
    <div class="box1" ref="boxRef1"></div>
  </div>
</template>

<script>
import { ref } from 'vue';
import gsap from 'gsap';

export default {
  setup() {
    const boxRef = ref(null);

    const startAnimation = () => {
      //boxRef.value 或者 '.box', 甚至可以写多个选择器['.box', '.box1']
      gsap.to(boxRef.value, {
        duration: 2,
        x: 300,
        rotation: 360,
        scale: 1.5,
        ease: 'power2.inOut',
      });
    };

    return {
      boxRef,
      startAnimation,
    };
  },
};
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.box {
  width: 100px;
  height: 100px;
  background-color: #42b983;
  margin-top: 20px;
}
</style>
```


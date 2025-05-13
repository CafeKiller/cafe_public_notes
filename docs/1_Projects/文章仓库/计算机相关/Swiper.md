---
category: 学习笔记
tags:
  - CSS
  - JavaScript
  - 前端开发
---
# 轮播组件 Swiper 

## 安装

**CDN安装**

```html
<!-- 引入 CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>

<body>
    <!-- Swiper 结构-->
    <div class="swiper mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
        </div>
    </div>
</body>

<!-- 引入 JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<!-- swiper 相关代码 -->
<script>
    const swiperObj = new Swiper(".swiper"){
        // 配置
    }
</script>
```

> swiper 必须同时引入 css 和 js 否则样式会失效。  
>    
> 如果你想在本地引入 css 和 js 个人建议去中文网下载，中文网文档虽然不更新了但是 swiper 包依旧有保持更新。

**NPM 安装**

```shell
npm install swiper
```

```javascript
// 默认情况下，Swiper 只导出核心版本，不包含额外的模块（如导航、分页等）。
// 要使用额外的模块，需要手动导入它们。

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper from 'swiper/bundle'; // 导入所有模块

import 'swiper/css'; 
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import'swiper/css/bundle'; // 导入所有模块的样式

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],
  // 其他配置
});
```

> 如果你想配合 Vue 和 React 使用，可以阅读一下官方文档，这两个框架官方都有提供。

## 实际应用场景

**双轮播图 双向联动滚动**

不止适用于双轮播图，多个轮播图也是允许的，使用时请按实际需求添加或移除配置。

```javascript
let isSliding = false;
const leftSwiper = new Swiper('.leftSwiper', {
    direction: "vertical",
    slidesPerView: "auto",
    slidesPerGroup: 1,
    on: {
        // 这里使用到了 防抖函数，防止快速滑动时出现问题
        sliderMove: debounce(function(this) {
            rightSwiper.slideTo(this.activeIndex, 0, false);
        }, 100),
        touchEnd: function() { isSliding = false },
    }
})

const rightSwiper = new Swiper('.rightSwiper', {
    direction: "vertical",
    slidesPerView: "auto",
    slidesPerGroup: 1,
    on: {
        sliderMove: debounce(function(this) {
            leftSwiper.slideTo(this.activeIndex, 0, false);
        }, 100),
        touchEnd: function() { isSliding = false },
    }
})
```

```javascript
const swiper = new Swiper(".show-swiper", {
    slidesPerView: 3,
    spaceBetween: 37,
    slidesPerGroup: 3,  // 每次滚动一组（3个幻灯片）
    autoplay: {
        delay: 3500,     // 5秒自动切换
        disableOnInteraction: false, // 用户操作后继续自动播放
        pauseOnMouseEnter: true, // 鼠标悬停时暂停
    },
    navigation: {
        nextEl: ".swiper-next-btn",
        prevEl: ".swiper-prev-btn",
    },

});
```
## 参考

> [!help] 参考资料
> 
> [Swiper中文网 - 中文文档](https://swiper.com.cn/usage/index.html)
>
> [SwiperJS 官方文档](https://swiperjs.com/)

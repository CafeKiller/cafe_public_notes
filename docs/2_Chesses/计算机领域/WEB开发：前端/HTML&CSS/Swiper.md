---
tags:
  - CSS
  - JavaScript
---


# 轮播组件 Swiper 

> [!help] 参考资料
> 
> [Swiper中文网 - 中文文档](https://swiper.com.cn/usage/index.html)
>
> [SwiperJS 官方文档](https://swiperjs.com/)

# 前言

swiper 当前还在活跃状态，每年都有更新，**但中文文档中的相关配置和信息都基本停留在了 7.0 版本，后续版本的更新可能存在差异**，如果你使用的是最新版本或者比较新的版本（大概是8.0以上的）我都推荐通过阅读官方的文档，以此为标准。

但如果你使用的是 8.0 以下的版本推荐阅读中文文档，中文文档比较契合国内 swiper 的使用习惯。同时需要注意，4.0 之前的两版本 3.X 和 2.X 差异普遍比较大，且性能比较低

除非你的项目也是远古项目，否则不推荐使用，若一定需要使用一定要真准对应版本的文档（swiper 中文网有提供）。



# 安装

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

# 实际应用场景

**双轮播图 双向联动滚动**

不止适用于双轮播图，多个轮播图也是允许的，使用时请按实际需求添加或移除配置。

@[code](../../../../1_Projects/代码仓库/前端相关/JavaScript/SwiperDemo1.js)

---
title: "JavaScript 踩坑指南"
category: 踩坑日志
subcategory: JavaScript
level: 5
tags:
  - JavaScript
  - 踩坑
---

# JavaScript 踩坑

## 调用字符串中的「代码」

```javascript
// 使用 `eval` 函数 或者 `new Function` 构造函数。

// 避免使用eval函数：在ES7中的替代方案
// https://www.javascriptcn.com/post/66f0f8f76fbf96019734ba5c
```

## await 永远不会 resolve 的 Promise 会导致内存泄露吗？

原问题：[await 永远不会 resolve 的 Promise 会导致内存泄露吗？ - 知乎](https://www.zhihu.com/question/627670924/answer/3270699180)

答案是：
- **单纯一个永不 resolve 的 Promise 不会泄漏内存**，但需注意它可能阻塞代码执行，导致关联资源无法释放。
- 实际开发中，建议为长期运行的 Promise 设计超时或取消逻辑，避免意外悬挂。


---
## 在使用 href 跳转时替换当前页面URL

使用 replaceState 或者 pushState

[history对象中replaceState详解](https://juejin.cn/post/7138361584648192007)
---
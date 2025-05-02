---
category: 学习笔记
tags:
  - ES6+
  - 前端开发
  - JavaScript
---

# 最新标准 ECMAScript

> [!help] 参考资料
> 
> [教程 - ]()

## 扩展知识

### requestAnimationFrame 函数

简单来说这个 requestAnimationFrame 函数就是用于取代 setInterval 函数的。不同于 setInterval 和 setTimeout 完全固定时间运行，而 requestAnimationFrame 则有点类似于 Unity 中的 update 生命周期函数，是「自适应当前帧数」运行的。在性能表现上会更优秀。

> [深入理解requestAnimationFrame](https://www.cnblogs.com/chaogex/p/3960175.html)

## 面试问答

### 如何调用字符串中的「代码」？

使用 `eval` 函数 或者 `new Function` 构造函数。

> [避免使用eval函数：在ES7中的替代方案](https://www.javascriptcn.com/post/66f0f8f76fbf96019734ba5c)

## 历年 ES 更新内容

### ES2016(ES7)

#### Array扩展

Array.prototype.includes()

判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

```js
const arr = ['es6', 'es7', 'es8']
console.log(arr.includes('es6')) // true
console.log(arr.includes('es9')) // false
```

#### 幂运算符

不再需要借助 `Math.pow` 方法来计算幂运算。

```js
console.log(2 ** 10) // 1024
```

### ES2017(ES8)

#### Async/Await

async 用于声明一个 function 是异步的，await 用于等待一个异步方法执行完成，只有当异步完成后才会继续往后执行。await不是必须的并且await 只能出现在 async 函数中。

```js
async function async1() {
    const result = await getData()
    console.log(result)
}
console.log(async1()) // -> Promise {<resolved>: "1"}
```
一个函数如果加上 async ，那么该函数就会返回一个 Promise

Async/Await 没有 Promise 那么多的api，错误需要自己使用 `try catch` 处理。

```js
async function() {
  try{
    const result = await getData()
    console.log(result)
  } catch(e) {
    console.log(e)
  }
}
```

#### Object 扩展

**Object.values()**

`Object.values()` 返回一个数组，其元素是在对象上找到的可枚举属性值。属性的顺序与通过手动循环对象的属性值所给出的顺序相同(`for...in`，但是 `for...in` 还会遍历原型上的属性值)。

```js
const obj = {
    name: 'randy',
    age: 24
}
console.log(Object.values(obj)) // ["randy", 24]
```

**Object.entries()**

`Object.entries()` 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 `for...in` 循环遍历该对象时返回的顺序一致。（区别在于 `for-in` 循环也枚举原型链中的属性）

```js
const obj = {
    name: 'randy',
    age: 24
}

for (let [k, v] of Object.entries(obj)) {
    console.log(k, v) // name randy    // age 24
}
```

### ES2018

### ES2019

### ES2020

### ES2021

### ES2022

### ES2023
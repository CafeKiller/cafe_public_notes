---
title: ECMAScript 新特性解析
category: WEB前端
subcategory: JavaScript
level: 3
tags:
  - JavaScript
  - ES6+
---

# ECMAScript 新特性解析

`ECMAScript 6` (简称 ES6) 是 JavaScript 语言的下一代标准

ECMAScript 的提案流程

- `Stage 0` - Strawman（展示阶段）
- `Stage 1` - Proposal（征求意见阶段）
- `Stage 2` - Draft（草案阶段）
- `Stage 3` - Candidate（候选人阶段）
- `Stage 4` - Finished（定案阶段）

一个提案只要能进入 `Stage 2` 就差不多肯定会包括在以后的正式标准里面

> [!tips] 参考资料
>
> [JS 数据类型灵魂总结 ](https://juejin.cn/post/6972878737582850062)

## 模板字符串

模板字符串 (template string) 是增强版的字符串，用反引号(`)标识。它可以当作普通字符串、定义多行字符串或者在字符串中嵌入变量、函数调用以及表达式

```javascript
let name = 'maomao'
let age = 18

/* ES5 拼接字符串 */
let es5Str = '我叫: ' + name + '，我的年龄是: ' + (age + 1) + ' 岁'

/* ES6 模板字符串 */
let es6Str = `我叫: ${name}，我的年龄是: ${age + 1} 岁`
```

## 解构赋值

**解构对象**

```javascript
const obj = {
    name: 'maomao',
    age: 18
}

// ES5 写法
const name = obj.name
const age = obj.age

/* ES6 解构写法 */
const { name, age } = obj
// 重命名
const { name: myName } = obj

/* 指定默认值 */
const { x = 1, y = 2 } = { y: null }
console.log(x) // 1
console.log(y) // null
```

**解构数组**

```javascript
const arr = ['maomao', 18]

/* ES5 写法 */
const name = arr[0]
const age = arr[1]

/* ES6 解构写法 */
const [name, age] = arr
const { 0: name, 1: age } = arr

/* 指定默认值 */
const [x = 1] = []
const [y = 2] = [undefined]
console.log(x) // 1
console.log(y) // 2

const [z = 3] = [null]
console.log(z) // null
```

**解构字符串**

字符串也可以解构赋值，因为字符串被转换成了一个类似数组的对象

```javascript
const [a, b, c] = 'maomao'
console.log(a) // m
console.log(b) // a
console.log(c) // o

/* 解构 length 属性 */
const { length } = 'maomao'
console.log(length) // 6
```

> [!important] 解构赋值注意点
> 
> - 解构数组和字符串时变量的取值由它的位置决定
> - 解构对象时变量必须与属性同名，才能取到正确的值
> - 变量在没有找到对应的值，多余的变量会被赋值为 `undefined`
> - 在指定默认值时，只有属性值严格等于 `undefined` 才会生效
> - 数组本质是特殊的对象，因此可以对数组进行对象属性的解构
> - 解构数值和布尔值时会通过其对应的包装函数将其转换成对象再解构
> - `undefined` 和 `null` 无法转为对象，在解构时会报错
> 
> ```javascript
> const { toString } = 123
> toString === Number.prototype.toString // true
> 
> const { toString } = true
> toString === Boolean.prototype.toString // true
> 
> const { x } = undefined // TypeError
> const { y } = null // TypeError
> ```

## Promise

Promise 是异步编程的一种解决方案，比传统的解决方案(回调函数和事件)更合理和更强大

Promise 对象具有以下 3 种状态

- `pending` 等待(初始)
- `fulfilled `成功
- `rejected` 拒绝

> [!important] Promise 的特点
>
> - `Promise` 对象的状态不受外界影响
> - 状态一旦改变就不会再变(不可逆)，任何时候都可以得到这个结果
> - 无法取消 `Promise`，一旦新建就会立即执行无法中途取消
> - 当处于 `pending` 状态时，无法得知目前进展到哪一个阶段(刚刚开始还是即将完成)

```javascript
/* 基本用法 */
new Promise((resolve, reject) => {
  setTimeout(() => resolve('成功'), 1000)
}).then((res) => {
  console.log(res)
})

/* 链式调用 */
ajax('/get/1')
    .then((res) => {
        console.log(res)
        return ajax('/get/2')
    })
    .then((res) => {
        console.log(res)
        return ajax('/get/3')
    })
    .then((res) => console.log(res))
```

### 实例方法

`Promise.prototype.then()` 用于实例添加状态改变时的回调函数(第一个参数是 `fulfilled` 状态的回调函数，第二个参数是 `rejected` 状态的回调函数)，会返回的是一个新的 `Promise` 实例

`Promise.prototype.catch()` 用于指定 `rejected` 状态的回调函数(是 `.then(null, rejection)` 或 `.then(undefined, rejection)` 的别名)

`Promise.prototype.finally()` (ES2018) 用于指定不管 `Promise` 对象最后状态如何都会执行的操作 (`finally` 本质上是 `then` 方法的特例)

```javascript
/*  实现 finally 方法 */
Promise.prototype.finally = function (callback) {
    const P = this.constructor
    return this.then(
        (value) => P.resolve(callback()).then(() => value),
        (reason) =>
            P.resolve(callback()).then(() => {
                throw reason
            })
    )
}
```

### 静态方法

`Promise.resolve()`

- 将传入的参数转为 Promise 对象
  - 参数是一个 Promise 实例则直接返回
  - 参数是一个 `thenable` 对象(具有 `then` 方法的对象) 转为 Promise 对象再立即执行 `thenable` 对象的 `then` 方法
  - 参数不是具有 `then` 方法的对象或根本就不是对象时返回一个 `fulfilled` 状态的新 Promise 对象
  - 没有参数时返回一个 `fulfilled` 状态的新 Promise 对象

`Promise.reject()`

- 返回一个 rejected 状态的新 Promise 对象

`Promise.all()`

- 将多个 Promise 实例，包装成一个新的 Promise 实例，只有所有的 Promise 状态成功才会成功，如果其中一个 Promise 的状态失败就会失败

`Promise.race()`

- 将多个 Promise 实例，包装成一个新的 Promise 实例，新的 Promise 实例状态会根据最先更改状态的参数实例而更改状态(可以轻松实现超时方法)

`Promise.allSettled()` (ES2020)

- 将多个 Promise 实例，包装成一个新的 Promise 实例，新的 Promise 实例只有等到所有这些参数实例都返回结果，不管是 `fulfilled` 还是 `rejected` ，包装实例才会结束，一旦结束，状态总是 `fulfilled`

`Promise.any()` (ES2021)

- 将多个 Promise 实例，包装成一个新的 Promise 实例，只要参数实例有一个变成 `fulfilled` 状态，包装实例就会变成 `fulfilled` 状态；如果所有参数实例都变成 `rejected` 状态，包装实例才会变成 `rejected` 状态



## requestAnimationFrame

简单来说这个 requestAnimationFrame 函数就是用于取代 setInterval 函数的。不同于 setInterval 和 setTimeout 完全固定时间运行，而 requestAnimationFrame 则有点类似于 Unity 中的 update 生命周期函数，是「自适应当前帧数」运行的。在性能表现上会更优秀。

### 使用方法

```javascript
let angle = 0; 

const render = () => {
    // 执行动画逻辑
    ctx.clearRect(0, 0, width, height); // 清除上一帧

    // 更新状态
    angle += delta;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, angle); 
    ctx.stroke();

    requestAnimationFrame(render);
}
```

### 回调参数

`requestAnimationFrame` 的回调函数会收到一个参数，这个参数是一个时间戳，单位为毫秒，代表 `requestAnimationFrame` 被触发的时间。

可以根据这个时间戳计算两帧的时间间隔，来调整动画速度。

```javascript
let prevTimestamp;
const render = timestamp => {
    if (!prevTimestamp) prevTimestamp = timestamp;
    const delta = timestamp - prevTimestamp;

    // 根据时间间隔计算速度
    x += speed * delta;

    prevTimestamp = timestamp;
    requestAnimationFrame(render);
}
```

> [!important] 与 setTimeout 或 setInterval 相比，requestAnimationFrame 具有以下优势：
> 
> - 通过系统时间间隔来调用回调函数，无需担心系统负载和阻塞问题，系统会自动调整回调频率。
> - 由浏览器内部进行调度和优化，性能更高，消耗的 CPU 和 GPU 资源更少。
> - 避免帧丢失现象，确保回调连续执行，实现更流畅的动画效果。
> - 自动合并多个回调，避免不必要的开销。
> - 与浏览器的刷新同步，不会在浏览器页面不可见时执行回调。

> [深入理解 requestAnimationFrame](https://www.cnblogs.com/chaogex/p/3960175.html)

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

> [!tip] 参考资料
>
> [JS 数据类型灵魂总结 ](https://juejin.cn/post/6972878737582850062)

## let & const

ES6 新增了 `let` 和 `const` 命令，用于声明变量，其声明的变量只在声明所在的块级作用域内有效

> [!tip] let const var 的区别
> 
> - `var` 声明的变量会提升到作用域的顶部，`let` const 不存在变量提升
> - `var` 声明的全局变量会被挂载到全局对象 `window` 上，而 `let` `const` 不会
> - `var` 可以对一个变量进行重复声明，而 `let` `const` 不能重复声明
> - `var` 声明的变量作用域范围是函数作用域，`let` `const` 声明的变量作用域范围是块级作用域
> - `const` 声明的是一个只读的常量，一旦声明常量的值就不能改变(必须对变量进行初始化)
>   - 基本类型保证值不可变
>   - 引用类型保证内存指针不可变

变量提升

```js
console.log(a) // 输出 undefined
console.log(b) // 报错
console.log(c) // 报错

var a = 'var'
let b = 'let'
const c = 'const'
```

[为什么 let 和 const 不存在变量提升？ - 知乎](https://www.zhihu.com/question/535442142/answer/2510328090)

挂载到全局对象

```js
var a = 'var'
let b = 'let'
const c = 'const'

console.log(window.a) // 输出 var
console.log(window.b) // 输出 undefined
console.log(window.c) // 输出 undefined
```

重复声明

```js
var a = 'var'
var a
console.log(a) // 输出 var

let b = 'let'
let b // 报错
```

作用域范围

```js
function fn() {
  if (true) {
    var a = 'var'
    let b = 'let'

    console.log(a) // 输出 var
    console.log(b) // 输出 let
  }

  console.log(a) // 输出 var
  console.log(b) // 报错
}

fn()
```

const 常量定义

```js
const NAME = 'maomao'
NAME = 'maomao1996' // 报错
```


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

## ESModule

`ESModule` 是 ES6 在语言标准的层面上实现的模块功能，其设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系以及输入和输出的变量

- ESModule` 是编译时加载，使静态分析成为可能
- 模块内部自动使用严格模式
- 模块中的顶层 `this` 指向 `undefined`

### export 命令

`export` 命令用于规定模块的对外接口

- 一个模块就是一个独立的文件，该文件内部的所有变量外部无法获取，如果希望外部可以获取必须使用 `export` 关键字输出该变量
- 通常情况下 `export` 输出的变量就是本来的名字，但可以使用 `as` 关键字重命名
- `export` 命令规定的是对外的接口其必须与模块内部的变量建立一一对应关系
- `export` 命令输出的接口与其对应的值是动态绑定关系(可以取到模块内部实时的值)
- `export` 命令可以出现在模块的任何位置，只要处于模块顶层就可以(在块级作用域内使用会报错)

```js
// util.js
/* 单个输出 */
export const name = 'maomao'
export function log() {
  console.log(name)
}

/* 统一输出 */
const name = 'maomao'
function log() {
  console.log(name)
}
export { name, log }

/* 使用 as 关键字重命名 */
const name = 'maomao'
export { name as nickname }
```

### import 命令

`import` 命令用于输入其他模块提供的功能(变量、函数、class 等)

- `import` 命令输入的变量都是只读的(类似于常量，即基本类型不可重新赋值，引用类型可修改属性)
- `import` 命令具有提升效果，会提升到整个模块的头部首先执行
- `import` 命令是编译阶段执行的
- 不能使用表达式和变量
- 重复执行同一句 `import` 命令只会执行一次
- `import` 后面的 `from` 指定模块文件的位置，其可以是相对路径，也可以是绝对路径

```js
// index.js
import { name, log } from './util'

/* 使用 as 关键字重命名 */
import { name as nickname, log as logName } from './util'

/* 模块的整体加载 */
import * as util from './util'
util.name // maomao
util.log() // maomao
```

### export default 命令

`export default` 命令可以为模块指定默认输出，是对 `default` 赋值的特例，本质上是一种赋值

```js
/* 输出匿名函数 */
export default function () {
  console.log('maomao')
}

import log from './export-default'
log() // 'maomao'

/* 输出非匿名函数 */
export default fn function () {
  console.log('maomao')
}

import log from './export-default'
log() // 'maomao'
```

> [!tip] export default 命令注意点
> 
> - 一个模块只能有一个默认输出(`export default` 命令只能使用一次)
> - `export default` 命令本质上是输出一个叫做 `default` 的变量或方法，使用时可以为它取任意名字
> - `export default` 命令后面是一个表达式，不能跟变量声明语句
> 
> ```js
> /* 错误 */
> export default const a = 1;
> 
> /* 正确 */
> const a = 1;
> export default a;
> 
> // 直接输出
> export default 'maomao'
> export default 1 + 2
> ```

> [!tip] export 和 export default 的区别
> 
> - `export {}` 导出的都是引用
>   - `export default` 导出的都是值而不是引用
>   - `export default` 是对 `default` 赋值的特例，本质上是一种赋值（即 `export default` 后的语句会被视为表达式）所以拿到的是值而不是引用
>   - `export default function` 是特例，导出的是引用
>   - `export { thing as default }` 写法为引用导出
> - 导入时除 `{} = await import()` 外均为引用
>
> ---
> 
> 如何保证导入都是引用？
> - 保证导入总是引用
>   - 尽量使用命名导入（使用除 `{} = await import()` 外的写法）
>   - 注意命名导出的写法
>   - 少用默认导出
> - 做不到上面的要求时尽量把需要维持引用的变量使用 `Object` 封装，不要使用简单变量

### export 与 import 的复合写法

如果在一个模块之中，需要先输入后输出同一个模块，import 命令可以与 export 命令写在一起

```js
export { foo, bar } from 'my_module'
// 等同于
import { foo, bar } from 'my_module'
export { foo, bar }

/* 接口改名 */
export { foo as myFoo } from 'my_module'

/* 整体输出 */
export * from 'my_module'

/* 具名接口改为默认接口 */
export { es6 as default } from 'my_module';
// 等同于
import { es6 } from 'my_module';
export default es6;

/* 默认接口改为具名接口 */
export { default as es6 } from 'my_module';

/* 整体加载 */
export * as util from "util";
// 等同于
import * as util from "util";
export {util};
```

> [!danger] 注意点
>
> 在 `export` 与 `import` 的复合写法时，输入的接口不能在当前模块中使用，只是相当于对外转发了接口

### import()

ES2020 引入 `import()` 函数支持动态加载模块

- `import()` 函数可以用在任何地方，不仅仅是模块非模块的脚本也可以使用
- `import()` 函数是运行时执行
- `import()` 函数与所加载的模块没有静态连接关系
- `import()` 函数类似于 NodeJS 中的 `require()` 函数，区别主要是前者是异步加载后者是同步加载
- `import()` 函数的返回值是 `Promise` 对象

```js
import('./dialogBox.js')
  .then((dialogBox) => {
    dialogBox.open()
  })
  .catch((error) => {
    /* Error handling */
  })
```

> [!tip] import() 函数的使用场景
> 
> - 按需加载
> - 条件加载
> - 动态的模块路径

### 浏览器对 ESModule 的加载规则

浏览器加载 ESModule 同样使用 `<script>` 标签但是需要设置 `type="module"` 属性

浏览器对于带有 `type="module"` 的 `<script>` 都是异步加载，不会堵塞浏览器，即等到整个页面渲染完再执行模块脚本，等同于设置了 `<script>` 标签的 `defer` 属性

有多个 `<script type="module">` 时会按照在页面出现的顺序依次执行

```html
<script type="module" src="./util.js"></script>
<!-- 等同于 -->
<script type="module" src="./util.js" defer></script>
```

当 `<script>` 同时设置了 `type="module"` 和 `async` 属性时，只要加载完成渲染引擎就会中断渲染立即执行，等执行完成后再恢复渲染，即不会按照在页面出现的顺序执行，而是只要该模块加载完成就执行该模块

#### 在 script 中使用 ESModule

ESModule 内嵌在网页中使用时语法行为与加载外部脚本完全一致，只需注意以下几点

- 代码是在模块作用域之中运行而不是在全局作用域运行，模块内部的顶层变量外部不可见
- 自动采用严格模式不管有没有声明 use strict
- 可以使用 import 命令加载其他模块(.js 后缀不可省略，需要提供绝对 URL 或相对 URL) 也可以使用 export 命令输出对外接口
- 顶层的 this 关键字返回 undefined 而不是指向 window
- 同一个模块如果加载多次将只执行一次

```html
<script type="module">
  import $ from './jquery/src/jquery.js'
  $('#message').text('Hi from jQuery!')
</script>
```

> [!tip] 小技巧
> 
> 利用顶层的 this 等于 undefined 这个语法点可以判断当前代码是否在 ES6 模块之中
>
> ```js
> const isNotModuleScript = this !== undefined
> ```
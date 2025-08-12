---
title: JavaScript 学习手记
category: WEB前端
subcategory: JavaScript
level: 3
tags:
  - JavaScript
---

# JavaScript 学习手记

> [tips] 参考资料
>
> [阮一峰 - JavaScript 教程](https://wangdoc.com/javascript/)
> 
> [阮一峰 - ECMAScript 6 入门教程](https://es6.ruanyifeng.com/#docs/intro)
> 
> [冰可乐 - JavaScript 基础知识](https://note.bingkele.cc/fe/javascript/types)

## 基础数据类型

在 `ES2020` 标准下的 `JavaScript` 一共有以下 7 种基本类型

- `undefined` : 未定义
- `null` : 空指针
- `boolean` : 布尔值
- `string` : 字符串
- `number` : 数值
- `symbol` : 独一无二的值 (ES6 引入)
- `bigint` : 大整数 (ES2020 引入)

**基本类型总结**

基本类型仅保存原始值，不存在属性和方法  
基本类型存储在 栈内存 中  
保存基本类型的变量是 按值 (by value) 访问 的，操作的就是存储在变量中的实际值  
复制基本类型时会创建该值的第二个副本 (独立使用，互不干扰)  

**注意：**「基本类型仅保存原始值，不存在属性和方法。」但是！为了方便操作原始值 ECMAScript 提供了 3 种特殊的引用类型：`Boolean` `Number` `String`，每当用到某个原始值的方法或属性时，后台都会创建一个相应原始包装类型的对象，在执行完后再销毁这个包装对象

```javascript
// 示例
const str = 'hello world'

str.toString()
str.length

/**
 * 在执行上面的代码时 `JavaScript` 都会执行以下 3 步
 * 1. 创建一个 String 类型的实例
 * 2. 调用实例上的特定方法或属性
 * 3. 销毁刚刚创建的实例
 */
const str = 'hello world'
new String(str).toString()
new String(str).length
```

## 引用数据类型

在 JavaScript 中除了基本类型，其他的都是引用类型，常见的引用类型如下

- `Object` : 对象
- `Array` : 数组
- `Function` : 函数
- `Date` : 日期与时间
- `RegExp` : 正则表达式
- `Set` : 类似于数组但成员的值都是唯一的 (ES6 引入)
- `WeakSet` : 和 Set 类似但成员都是弱引用 (ES6 引入)
- `Map` : 类似于对象也是键值对的集合 (ES6 引入)
- `WeakMap` : 和 Map 类似但成员都是弱引用 (ES6 引入)

**引用类型总结**

因为 JavaScript 不允许直接访问内存位置(不能直接操作对象所在的内存空间)，所以引用类型在 栈内存 中存储的是地址(内存指针)，而引用类型中的数据(方法或属性)是存储在 堆内存 中

保存引用类型的变量是 按引用 (by reference) 访问 ，实际上操作的是对该对象的引用而非实际的对象本身

复制引用类型时只会复制内存指针

## 类型判断

常见的五种判断方式

### `typeof`

除 null 外的基本类型都能准确判断

```javascript
typeof undefined        // 'undefined'
typeof null             // 'object'
typeof true             // 'boolean'
typeof 'maomao'         // 'string'
typeof 2021             // 'number'
typeof Symbol()         // 'symbol'
typeof BigInt(2021)     // 'bigint'
```

> [!IMPORTANT] 为什么 typeof null === 'object'
>
> 在 `JavaScript` 最初的实现中，`JavaScript` 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 `null` 代表的是空指针（大多数平台下值为 `0x00`），因此`null` 的类型标签是 0，`typeof null` 也因此返回 `object` —— MDN


除 function 外的引用类型均返回 object

```javascript
typeof {}               // 'object'
typeof []               // 'object'
typeof console.log      // 'function'
typeof new Date()       // 'object'
typeof new RegExp()     // 'object'
typeof new Set()        // 'object'
typeof new WeakSet()    // 'object'
typeof new Map()        // 'object'
typeof new WeakMap()    // 'object'
```

### `instanceof`

instanceof 用于检测构造函数的 prototype 属性是否存在于实例对象的原型链上

```javascript
/** 基本类型 */
true instanceof Boolean       // false
'maomao' instanceof String    // false
1 instanceof Number           // false

/** 引用类型 */
function Person(name) {
  this.name = name
}

const p1 = new Person('maomao')

p1 instanceof Person          // true
p1 instanceof Object          // true

// 修改原型，使 p1 不再是 Person 的实例
Reflect.setPrototypeOf(p1, Array.prototype)
// OR p1.__proto__ = Array.prototype

p1 instanceof Person          // false
p1 instanceof Array           // true
```

> [!IMPORTANT] instanceof 总结
>
> - `instanceof` 不能判断基本类型，对于引用类型只能判断原型链上的从属关系
> - `instanceof` 并不完全可靠，因为构造函数的 `prototype` 属性可能会被修改
>   - 修改原型的方法
>     - 使用 ES6 提供的 `Reflect.setPrototypeOf()` 方法
>     - 借助于非标准的 `__proto__` 伪属性


### `constructor`

实例对象可以通过 `constructor` 属性去访问它的构造函数

```javascript
/** 基本类型 */
(true).constructor === Boolean            // true
'maomao'.constructor === String           // true
(2021).constructor === Number             // true
Symbol().constructor === Symbol           // true
BigInt(2021).constructor === BigInt       // true

/** 引用类型 */
({}).constructor === Object               // true
([]).constructor === Array                // true

function Person(name) {
  this.name = name
}
Person.prototype.constructor === Person   // true

// 修改原型造成 constructor 丢失
Person.prototype = {}
Person.prototype.constructor === Object   // true
```

> [!important] constructor 总结
> 
> - `constructor` 可以判断除 `undefined` 和 `null` 外的所有基本类型和引用类型(`undefined` 和 `null` 不存在构造函数)
> 
> - `constructor` 并不完全可靠，因为构造函数的 `prototype` 属性可能会被修改，从而造成 `constructor` 属性指向不准确



### `Array.isArray()`

`Array.isArray()` 用于判断一个值是否是数组 Array

```javascript
Array.isArray([])   // true
Array.isArray({})   // false
```

### `Object.prototype.toString`

每个对象都有一个 `toString()` 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用，默认情况下 `toString()` 方法被每个 `Object` 对象继承。如果此方法在自定义对象中未被覆盖 `toString()` 返回 `[object type]` 其中 `type` 是对象的类型

为了每个对象都能通过 `Object.prototype.toString()` 来检测，需要以 `Function.prototype.call()` 或者 `Function.prototype.apply()` 的形式来调用

```javascript
const toString = Object.prototype.toString

toString.call(undefined)        // '[object Undefined]'
toString.call(null)             // '[object Null]'
toString.call(true)             // '[object Boolean]'
toString.call('maomao')         // '[object String]'
toString.call(2021)             // '[object Number]'
toString.call(Symbol())         // '[object Symbol]'
toString.call(BigInt(2021))     // '[object BigInt]'

toString.call({})               // '[object Object]'
toString.call([])               // '[object Array]'
toString.call(console.log)      // '[object Function]'
toString.call(new Date())       // '[object Date]'
toString.call(new RegExp())     // '[object RegExp]'
toString.call(new Set())        // '[object Set]'
toString.call(new WeakSet())    // '[object WeakSet]'
toString.call(new Map())        // '[object Map]'
toString.call(new WeakMap())    // '[object WeakMap]'
```

toString 方法的在 ECMAScript 5 下的大致执行过程

1. 如果 `this` 是 `undefined` 返回 `[object Undefined]`
2. 如果 `this` 是 `null` 返回 `[object Null]`
3. 让 O 成为 `ToObject(this)` 的结果
4. 让 class 成为 O 的内部属性 `[[Class]]` 的值
5. 返回由 `[object " class "]` 三个部分组成的字符串

## 类型转换

将值从一种类型转换为另一种类型称为类型转换
在 JavaScript 中进行类型转换时，根据调用形式的不同可以分为以下两种:

- 显式类型转换
- 隐式类型转换

### 抽象操作

在了解类型转换前我们需要知道 `JavaScript` 的 抽象操作 (类型转换规则)

> **抽象操作** 是指仅供内部使用的操作

- `ToPrimitive` 将引用类型转换成相应的基本类型值
- `ToString` 将非字符串值转换成字符串
- `ToBoolean` 将非布尔值转换成布尔值
- `ToNumber` 将非数字值转换成数字值

#### ToPrimitive

`ToPrimitive` 用来处理引用类型到基本类型的类型转换

> [!tip] ToPrimitive 转换规则
>
> - 检查是否存在 `Symbol.toPrimitive()`
>   - 基本类型直接返回
>   - 引用类型抛出 `TypeError` 错误
> - 检查是否存在 `valueOf()`
>   - 基本类型直接返回
>   - 引用类型则继续调用 `toString()`
> - 调用 `toString()`
>   - 基本类型直接返回
>   - 引用类型抛出 `TypeError` 错误

> [!danger] 注意点
> 
> - 使用 `Object.create(null)` 创建的对象没有原型，即不存在 `valueOf()` 和 `toString()`，当对其进行类型转换时会抛出 `TypeError` 错误
> - 在做显式类型转换时 `valueOf()` 和 `toString()` 的调用顺序会根据转换目标不同去做相应调整
>   - 默认情况下都是先调用 `valueOf()` 再调用 `toString()`
>   - 当需要转换的目标为字符串时，会先调用 `toString()` 再调用 `valueOf()`
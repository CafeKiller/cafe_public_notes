---
category: 学习笔记
tags:
  - JavaScript
  - ES6
---

# 历年ES新标准新机制

## ES2016(ES7)

### Array扩展

Array.prototype.includes()

判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

```js
const arr = ['es6', 'es7', 'es8']
console.log(arr.includes('es6')) // true
console.log(arr.includes('es9')) // false
```

### 幂运算符

不再需要借助 `Math.pow` 方法来计算幂运算。

```js
console.log(2 ** 10) // 1024
```


---

## ES2017(ES8)

### Async/Await

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

### Object.values()

`Object.values()` 返回一个数组，其元素是在对象上找到的可枚举属性值。属性的顺序与通过手动循环对象的属性值所给出的顺序相同(`for...in`，但是 `for...in` 还会遍历原型上的属性值)。

### Object.entries()

`Object.entries()` 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 `for...in` 循环遍历该对象时返回的顺序一致。（区别在于 `for-in` 循环也枚举原型链中的属性）

### Object.getOwnPropertyDescriptors()

`Object.getOwnPropertyDescriptors()` 用来获取一个对象的所有自身属性的描述符.

### String.prototype.padStart()

把指定字符串填充到字符串头部，返回新字符串。

### String.prototype.padEnd()

把指定字符串填充到字符串尾部，返回新字符串。

### TrailingCommas

也就是允许对象最后一个参数有逗号。

```javascript
obj = {
	k1: "value1",
	k2: "value2",
	len: 2,
}
```

---

## ES2018(ES9)

### ObjectRest&Spread

```javascript
const input = { a: 1, b: 2, c: 3 }

const output = { ...input, c: 4 }

console.log(output) // {a: 1, b: 2, c: 4}
```


### for...await...of

异步迭代器(for-await-of)：循环等待每个Promise对象变为resolved状态才进入下一步。

```javascript
function TimeOut(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)]
    for await (let item of arr) {
        console.log(Date.now(), item)
    }
}

test() // 2000 1000 3000
```


### Promise.prototype.finally()

`Promise.prototype.finally()` 方法返回一个 Promise，在 promise 执行结束时，无论结果是 fulfilled 或者是 rejected，在执行 `then()` 和 `catch()` 后，都会执行 finally 指定的回调函数。
这为指定执行完 promise 后，无论结果是 fulfilled 还是 rejected 都需要执行的代码提供了一种方式，避免同样的语句需要在 `then()` 和 `catch()` 中各写一次的情况。

```javascript
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    }, 1000)
})
.then(console.log)
.catch(console.log)
.finally(() => {
    console.log('finally');
});
```


### String扩展

放松对标签模板里字符串转义的限制, 遇到不合法的字符串转义会返回undefined，并且从raw上可获取原字符串。

```javascript
function foo(a, b, c) {
    console.log(a, b, c)
}

foo `\u{61} and \u{62}` 
foo `\u{61} and \unicode`  
```


---

## ES2019(ES10)

### Object.fromEntries()

方法 `Object.fromEntries()` 把键值对列表转换为一个对象，这个方法是和 `Object.entries()` 相对的。

```javascript
const obj = {
    name: 'jimmy',
    age: 18
}
const entries = Object.entries(obj)
console.log(entries)

// ES10
const fromEntries = Object.fromEntries(entries)
console.log(fromEntries)
```


### Array.prototype.flat()

`flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```javascript
const arr1 = [0, 1, 2, [3, 4]];
console.log(arr1.flat());
const arr2 = [0, 1, 2, [[[3, 4]]]];
console.log(arr2.flat(2));

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
console.log(arr4.flat(Infinity))

// `flat()` 方法会移除数组中的空项:
var arr5 = [1, 2, , 4, 5];
console.log(arr5.flat()); 
```


### Array.prototype.flatMap()

`flatMap()` 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。从方法的名字上也可以看出来它包含两部分功能一个是 map，一个是 flat（深度为1）

```javascript
const numbers = [1, 2, 3]
numbers.map(x => [x * 2])
numbers.flatMap(x => [x * 2])
```


### String.prototype.trimStart()

`trimStart()` 方法从字符串的开头删除空格，`trimLeft()` 是此方法的别名。

```javascript
let str = '   foo  '
console.log(str.length)
str = str.trimStart()
console.log(str.length) 
```


### String.prototype.trimEnd()

`trimEnd()` 方法从一个字符串的右端移除空白字符，trimRight 是 trimEnd 的别名。

```javascript
let str = '   foo  '
console.log(str.length)
str = str.trimEnd() 
console.log(str.length) 
```


### 可选的CatchBinding

```javascript
// ES10 之前
try {
    // tryCode
} catch (err) {
    // catchCode
}

// ES10 之后
try {
    console.log('Foobar')
} catch {
    console.error('Bar')
}
```


### Symbol.prototype.description

Symbol 的描述只被存储在内部的 `Description` ，没有直接对外暴露，我们只有调用 Symbol 的 `toString()` 时才可以读取这个属性。现在可以通过 description 方法获取 Symbol 的描述。

```javascript
const name = Symbol('es')
console.log(name.description) // es
name.description = "es2" // 只读属性 并不能修改描述符
console.log(name.description === 'es') // true
// 如果没有描述符 输入undefined
const s2 = Symbol()
console.log(s2.description) // undefined
```


### JSON.stringify()增强能力

JSON.stringify 在 ES10 修复了对于一些超出范围的 Unicode 展示错误的问题。因为 JSON 都是被编码成 UTF-8，所以遇到 0xD800–0xDFFF 之内的字符会因为无法编码成 UTF-8 进而导致显示错误。在 ES10 它会用转义字符的方式来处理这部分字符而非编码的方式，这样就会正常显示了。

```javascript
// \uD83D\uDE0E  emoji 多字节的一个字符
console.log(JSON.stringify('\uD83D\uDE0E')) // 打印出笑脸

// 之前的版本，这些字符将替换为特殊字符，而现在将未配对的代理代码点表示为JSON转义序列
console.log(JSON.stringify('\uD83D')) // "\ud83d"
```


### 修订Function.prototype.toString()

以前函数的 toString 方法来自 `Object.prototype.toString()` ,现在的  `Function.prototype.toString()` 方法返回一个表示当前函数源代码的字符串。以前只会返回这个函数，不包含注释、空格等。

```javascript
function foo() {
    // es10新特性
    console.log('imooc')
}
console.log(foo.toString()) 
```

---
## ES2020

### 空值合并运算符

**空值合并操作符**（`??`）是一个逻辑操作符，当左侧的操作数为 `null` 或者 `undefined` 时，返回其右侧操作数，否则返回左侧操作数。

```javascript
const foo = undefined ?? "foo"
const bar = null ?? "bar"
console.log(foo) // foo
console.log(bar) // bar
```

> 与逻辑或操作符（`||`）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 `||` 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如 `''` , `0` , `NaN` , `false`）时。见下面的例子。

```javascript
const foo = "" ?? 'default string';
const foo2 = "" || 'default string';
console.log(foo); // ""
console.log(foo2); // "default string"

const baz = 0 ?? 42;
const baz2 = 0 || 42;
console.log(baz); // 0
console.log(baz2); // 42
```









---
## ES2021

## ES2022

## ES2023
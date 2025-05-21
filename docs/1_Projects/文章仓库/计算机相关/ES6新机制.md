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

> 将 `??` 直接与 AND（`&&`）和 OR（`||`）操作符组合使用是不可取的。

```javascript
null || undefined ?? "foo"; // 抛出 SyntaxError
true || undefined ?? "foo"; // 抛出 SyntaxError
```

### 可选链OptionalChaining


可选链操作符( `?.` )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。`?.` 操作符的功能类似于 `.` 链式操作符，不同之处在于，在引用为 `null` 或者 `undefined` 的情况下不会引起错误，该表达式短路返回值是 `undefined`。与函数调用一起使用时，如果给定的函数不存在，则返回 `undefined`。

```javascript
const user = {
    address: {
        street: 'xx街道',
        getNum() {
            return '80号'
        }
    }
}

// 原先
const street = user && user.address && user.address.street
const num = user && user.address && user.address.getNum && user.address.getNum()
console.log(street, num)

// 现在
const street2 = user?.address?.street
const num2 = user?.address?.getNum?.()
console.log(street2, num2)

// 甚至可以和 空值合并符 一起使用
const age = user?.userAge ?? 18
console.log(age)
```

### globalThis

在以前，从不同的 JavaScript 环境中获取全局对象需要不同的语句。在 Web 中，可以通过 `window`、`self` 取到全局对象，在 Node.js 中，它们都无法获取，必须使用 `global`。

在松散模式下，可以在函数中返回 `this` 来获取全局对象，但是在严格模式和模块环境下，`this` 会返回 `undefined`。

现在`globalThis` 提供了一个标准的方式来获取不同环境下的全局 `this`  对象（也就是全局对象自身）。不像 `window` 或者 `self` 这些属性，它确保可以在有无窗口的各种环境下正常工作。所以，你可以安心的使用 `globalThis`，不必担心它的运行环境。

为便于记忆，你只需要记住，全局作用域中的 `this` 就是 `globalThis`。以后就用`globalThis` 就行了。

### BigInt

**`BigInt`** 是一种内置对象，它提供了一种方法来表示大于 `2的53次方 - 1` 的整数。这原本是 Javascript中可以用 `Number` 表示的最大数字。**`BigInt`** 可以表示任意大的整数。

> BigInt 不能用于 [`Math`] 对象中的方法；不能和任何 [`Number`] 实例混合运算，两者必须转换成同一种类型。在两种类型来回转换时要小心，因为 `BigInt` 变量在转换成 [`Number`] 变量时可能会丢失精度。
  

### String.prototype.matchAll()

`matchAll()` 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

```javascript
const regexp = /t(e)(st(\d?))/g;
const str = 'test1test2';

const array = [...str.matchAll(regexp)];
console.log(array[0]);  // ["test1", "e", "st1", "1"]
console.log(array[1]); // ["test2", "e", "st2", "2"]
```


### Promise.allSettled()

我们都知道 `Promise.all()` 具有并发执行异步任务的能力。但它的最大问题就是如果其中某个任务出现异常(reject)，所有任务都会挂掉，Promise直接进入reject 状态。

假设一个场景：现在页面上有三个请求，分别请求不同的数据，如果一个接口服务异常，整个都是失败的，都无法渲染出数据。

我们需要一种机制，如果并发任务中，无论一个任务正常或者异常，都会返回对应的的状态，这就是 `Promise.allSettled()` 的作用

### DynamicImport

`import()`可以在需要的时候，再加载某个模块。

```javascript
button.addEventListener('click', event => {
	  import('./dialogBox.js')
	  .then(dialogBox => {
	    dialogBox.open();
	  })
	  .catch(console.error)
});
```



---
## ES2021(ES12)

### 逻辑运算符和赋值表达式

即：`&&=` `||=` `??=`

```javascript
// 分别等效为：
// &&=
num && (num = 100) // num 为真时，赋值为100

// ||=
num || (num = 233) // num 为非时，赋值为233

// ??=
num || (num = 300) // num 为null或undefined时，赋值为300
```


### String.prototype.replaceAll()

`replaceAll()`  方法返回一个新字符串，新字符串中所有满足 `pattern` 的部分都会被 `replacement` 替换。`pattern` 可以是一个字符串或一个 `RegExp`，`replacement` 可以是一个字符串或一个在每次匹配被调用的函数。

原始字符串保持不变。

```javascript
'aabbcc'.replaceAll('b', '.')  // 'aa..cc'
'aabbcc'.replaceAll(/b/, '.')  // error
'aabbcc'.replaceAll(/b/g, '.') // 'aa..cc'
```
> 使用正则表达式搜索值时，它必须是全局的。


### 数字分隔符

欧美语言中，较长的数值允许每三位添加一个分隔符（通常是一个逗号），增加数值的可读性。比如，`1000`可以写作`1,000`。

`ES2021`中允许 JavaScript 的数值使用下划线（`_`）作为分隔符。

```javascript
let budget = 100_000_000_000
```


### Promise.any()

方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。

```javascript
const promise1 = () => {
	return new Promise((resolve, reject) => {
	    setTimeout(() => {
		    resolve("promise1");
			//  reject("error promise1 ");
	    }, 3000);
	});
};
const promise2 = () => {
    return new Promise((resolve, reject) => {
	    setTimeout(() => {
	        resolve("promise2");
	        // reject("error promise2 ");
	    }, 1000);
    });
};
const promise3 = () => {
    return new Promise((resolve, reject) => {
	    setTimeout(() => {
		      resolve("promise3");
		      // reject("error promise3 ");
	    }, 2000);
    });
};
Promise.any([promise1(), promise2(), promise3()])
	.then((first) => {
	    // 只要有一个请求成功 就会返回第一个请求成功的
	    console.log(first); // 会返回promise2
	})
	.catch((error) => {
	    // 所有三个全部请求失败 才会来到这里
	    console.log("error", error);
    });
```

只要参数实例有一个变成 `fulfilled` 状态，包装实例就会变成 `fulfilled` 状态；如果所有参数实例都变成 `rejected` 状态，包装实例就会变成 `rejected` 状态。

`Promise.any()` 跟 `Promise.race()` 方法很像，只有一点不同，就是`Promise.any()`不会因为某个 Promise 变成 `rejected` 状态而结束，必须等到所有参数 Promise 变成 `rejected` 状态才会结束。

### WeakRef



### Finalizers



---
## ES2022

## ES2023

## ES2024


## 参考资料

[掘金社区 | ES2016 至 ES2021 更新汇总](https://juejin.cn/post/7046217976176967711)


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
## ES2020(ES11)

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
## ES2022(ES13)

### 声明类的字段

此前在ES规范中，类的字段定义和初始化是在类的构造函数中完成的。但是在新的提案中，类字段可以在类的顶层被定义和初始化

```javascript
class Point {
   name;
   title;
   size = 1;
}
```


### 私有方法&字段

用 `#前缀` 来定义类的私有方法和字段。

```javascript
class Person {
	name;
	#age;
	get #age(){
		return #age;
	}
	$initValue(){
	    this.name = '';
	    this.#age = 12;
	}
}
```

### 类的静态公共方法和字段

在之前的「类的字段」和「私有方法」提案的基础上，为 JavaScript 类增加了`静态公共字段`、`静态私有方法`和`静态私有字段`的特性。

```js
class Enum {
	static collectStaticFields() {
		// Static methods are not enumerable and thus ignored
		this.enumKeys = Object.keys(this);
	}
}
class ColorEnum extends Enum {
	static red = Symbol('red');
	static green = Symbol('green');
	static blue = Symbol('blue');
	static _ = this.collectStaticFields(); // (A)
	
	static logColors() {
		for (const enumKey of this.enumKeys) { // (B)
			console.log(enumKey);
		}
	}
}
ColorEnum.logColors();
```

### 私有字段检查

使用 `in` 操作符检测某一实例是否包含要检测的私有字段。

```javascript
class Person {
	#name = 'Ergonomic brand checks for Private Fields';
	
	static check(obj) {
		return #name in obj;
	}
}
```

### ECMScript 类静态初始化块

类静态块提议提供了一种优雅的方式，在类声明/定义期间评估静态初始化代码块，可以访问类的私有字段。

```javascript
class Person {
	static name;
	age;
}
try {
	Person.name = getNameA();
} catch {
	Person.name = getNameB();
}
```

### Top-level await

以前 `await` 必须随着 `async` 一起出现，只有在 `async` 函数内才可用。当需要在一些文件顶部进行初始化的场景中使用时就有不支持了，顶级 `await` 可以解决这个问题，但它仅支持 `ES Modules`。

```javascript
let jQuery;
try {
	jQuery = await import('https://cdn-a.com/jQuery');
} catch {
	jQuery = await import('https://cdn-b.com/jQuery');
}
```


### 正则新增 /d 修饰符

以前的正则表达式支持 3 个修饰符：`/i`（忽略大小写）、`/g`（全局匹配）、`/m`（多行），当执行正则表达式的 `exec()` 方法时，新增一个 `/d` 修饰符，它会返回一个 `indices` 属性，包含了匹配元素的开始、结束位置索引。

```javascript
const str = 'ECMAScript_JavaScript'
const regexp = /sc/igd // 忽略大小全局匹配并返回匹配元素的开始、结束位置索引
console.log(regexp.exec(str).indices[0]) // [ 4, 6 ]
console.log(regexp.exec(str).indices[0]) // [ 15, 17 ]

// 包含组信息
const text = 'zabbcdef';
const re = /ab+(cd(ef))/d;
const result = re.exec(text);

result.indices; // [ [1, 8], [4, 8], [6, 8] ]

// 具名组匹配
const text = 'zabbcdef';
const re = /ab+(?<Z>cd)/d;
const result = re.exec(text);

result.indices.groups; // { Z: [ 4, 6 ] }
```


### Array.prototype.at()

根据指定索引获取数组元素，不同的是它支持传递负数，例如 -1 获取最后一个元素。

```javascript
const arr = ['a', 'b', 'c']
console.log(arr.at(0));
console.log(arr.at(-1)); // 等价于 arr[arr.length - 1]
```

### Object.hasOwn()

`Object.hasOwn()` 提供了一种更安全的方法来检查对象是否具有自己的属性，适用于检查所有的对象。`Object.prototype.hasOwnProperty()` 方法遇到 `obj = null` 这种情况会报错，参见以下示例：

```javascript
const person = Object.create({ name: 'Tom' })
person.age = 18;
console.log(Object.hasOwn(person, 'name')); // false
console.log(Object.hasOwn(person, 'age')); // true

// 遇到这种情况 hasOwnProperty 会报错
const p1 = null
console.log(p1.hasOwnProperty('name')); // TypeError: Cannot read properties of null (reading 'hasOwnProperty')
```


### ErrorCause

`Error Cause` 是由阿里巴巴提出的一个提案，为 Error 构造函数增加了一个 `options`，可设置 `cause` 的值为任意一个有效的 `JavaScript` 值。

```javascript
// 例如，自定义错误 `message`，将错误原因赋给 `cause` 属性，传递给下一个捕获的地方。
try {
	await fetch().catch(err => {
		throw new Error('Request failed', { cause: err })
	})
} catch (e) {
	console.log(e.message);
	console.log(e.cause);
}
```



----

## ES2023(ES14)

### 数组，从末尾查找元素

新增两个方法： `.findLast()`、`.findLastIndex()` 从数组的最后一个元素开始查找，可以同 `find()`、`findIndex()` 做一个对比。

```javascript
const arr = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];

// find vs findLast
console.log(arr.find(n => n.value % 2 === 1)); // { value: 1 }
console.log(arr.findLast(n => n.value % 2 === 1)); // { value: 3 }

// findIndex vs findLastIndex
console.log(arr.findIndex(n => n.value % 2 === 1)); // 0
console.log(arr.findLastIndex(n => n.value % 2 === 1)); // 2
```


### 将 Symbols 作为 WeakMap 的键

这允许使用唯一的 `Symbols` 作为键。目前 `WeakMaps` 只允许对象作为键。因为它们共享同样的身份特性。

`Symbol`是`ECMAScript`中唯一的原始类型，允许使用唯一的值，因此可以使用`Symbol`作为键，而不是创建一个新的带有`WeakMap`的对象。

```javascript
const weak = new WeakMap();const key = Symbol('my ref');
const someObject = { a:1 };weak.set(key, someObject);
console.log(weak.get(key));
```


### 通过复制改变数组

这在 `Array.prototype` 上提供了额外的方法，通过返回带有更改的新数组副本，而不是更新原始数组来更改数组。

新引入的 `Array.prototype` 函数包括：
- `Array.prototype.toReversed()`
- `Array.prototype.toSorted(compareFn)`
- `Array.prototype.toSpliced(start, deleteCount, …items)`
- `Array.prototype.with(index, value)`

```javascript
const sequence = [1, 2, 3];
sequence.toReversed() // [3, 2, 1]
sequence // [1, 2, 3]

const outOfOrder = [3, 1, 2];
outOfOrder.toSorted() // [1, 2, 3]
outOfOrder // [3, 1, 2]

const array = [1, 2, 3, 4];
array.toSpliced(1, 2, 5, 6, 7) // [1, 5, 6, 7, 4]
array // [1, 2, 3, 4]

const correctionNeeded = [1, 1, 3];
correctionNeeded.with(1, 2) // [1, 2, 3]
correctionNeeded // [1, 1, 3]
```


---


## ES2024(ES15)

### Promise.withResolvers()

`Promise.withResolvers()` 允许创建一个新的 `Promise`，并同时获得 `resolve` 和 `reject` 函数。

```javascript
let resolve, reject;  
const promise = new Promise((res, rej) => {  
    resolve = res;  
    reject = rej;  
});
// new 
const { promise, resolve, reject } = Promise.withResolvers();  
  
// 在这里可以使用 resolve 和 reject 函数  
setTimeout(() => resolve('成功！'), 8000);  
  
promise.then(value => {  
    console.log(value); // 输出: 成功！  
});
```

### Object.groupBy() 和 Map.groupBy()

`Object.groupBy()` 和 `Map.groupBy()` 方法用于数组分组。

```javascript
const fruits = [
    { name: "Apple", color: "red" },
    { name: "Banana", color: "yellow" },
    { name: "Cherry", color: "red" },
    { name: "Lemon", color: "yellow" },
    { name: "Grape", color: "purple" },
];

// 原先
const fruitsByColor = {};
fruits.forEach(fruit => {
    const color = fruit.color;
    if (!fruitsByColor[color]) {
        fruitsByColor[color] = [];
    }
    fruitsByColor[color].push(fruit);
});
console.log(fruitsByColor);

// 现在
const fruitsByColor = Object.groupBy(fruits, (fruit) => fruit.color)
```


`Map.groupBy`和`Object.groupBy`的功能一样，只是返回的结果类型不同。`Map.groupBy`返回一个 Map 对象，而`Object.groupBy`返回一个普通对象。

```javascript
const fruitsByColor = Map.groupBy(fruits, (fruit) => fruits.color); // 返回map对象

fruitsByColor.get("red");
// [{"name": "Apple", "color": "red"}, {"name": "Cherry", "color": "red"}]
```

### Atomics.waitAsync()

`Atomics.waitAsync()`静态方法在共享内存位置异步等待并返回一个Promise。与`Atomics.wait()`不同，`waitAsync`是非阻塞的，并且可以在主线程上使用。

```javascript
const sab = new SharedArrayBuffer(1024);
const int32 = new Int32Array(sab);

const result = Atomics.waitAsync(int32, 0, 0, 1000);
// { async: true, value: Promise {<pending>} }
```


### ArrayBuffer.prototype.resizable

`resizable`属性是一个访问器属性，其`set`访问器函数是未定义的，这意味着您只能读取该属性。该值是在构造数组时建立的。如果在构造函数中设置了`maxByteLength`选项，`resizable`将返回true;如果不是，它将返回`false`。当其为`true`时，则可以调整大小：

```javascript
const buffer1 = new ArrayBuffer(8, { maxByteLength: 16 });
const buffer2 = new ArrayBuffer(8);

console.log(buffer1.resizable);
// Expected output: true

console.log(buffer2.resizable);
// Expected output: false

if (buffer1.resizable) {
	console.log("Buffer is resizable!");
	buffer.resize(12);
}
```



## 参考资料

[掘金社区 | ES2016 至 ES2021 更新汇总](https://juejin.cn/post/7046217976176967711)

[掘金社区 | JavaScript 新特性最全指南](https://juejin.cn/post/7282994349444857893)


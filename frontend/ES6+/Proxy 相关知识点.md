# Proxy 相关知识点

> 主要参考资料/书籍/文章:  
> [ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/proxy)

## 基本概念

Proxy 用于修改某些操作的默认行为, 可以理解为是一种在目标对象之前架设一个『拦截器』,外界对该对象的访问, 都必须先通过这层『拦截』,因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

```javascript
const obj = new Proxy({}, {
    get: function (target, propKey, receiver) {
        console.log(`getting ${propKey}!`);
        return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
        console.log(`setting ${propKey}!`);
        return Reflect.set(target, propKey, value, receiver);
    }
});

// 此处的代码就是对一个 空对象({}) 进行了代理, 重新定义属性的读取(get)和设置(set)
console.log(obj.count) // getting count!
obj.count++ // setting count!
```

> 上面代码说明，Proxy 实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。

## 基本使用

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

```javascript
// new Proxy()表示生成一个Proxy实例
// target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
const proxy = new Proxy(target, handler);

const proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});


// 如果handler没有设置任何拦截，那就等同于直接通向原对象。
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.aaa = 123 
proxy.aaa // 123


// tips: 小技巧, 将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。
var object = { proxy: new Proxy({}, { 
    get: function(target, propKey) {
        return 2233
    }
})};
object.proxy.aaa // 2233


// Proxy 实例也可以作为其他对象的原型对象。
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});
let obj = Object.create(proxy);
obj.time // 35
```

proxy 支持的拦截操作方法一览

- `get(target, propKey, receiver)`：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
- `set(target, propKey, value, receiver)`：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
- `has(target, propKey)`：拦截propKey in proxy的操作，返回一个布尔值。
- `deleteProperty(target, propKey)`：拦截delete proxy[propKey]的操作，返回一个布尔值。
- `ownKeys(target)`：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
- `getOwnPropertyDescriptor(target, propKey)`：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
- `defineProperty(target, propKey, propDesc)`：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
- `preventExtensions(target)`：拦截Object.preventExtensions(proxy)，返回一个布尔值。
- `getPrototypeOf(target)`：拦截Object.getPrototypeOf(proxy)，返回一个对象。
- `isExtensible(target)`：拦截Object.isExtensible(proxy)，返回一个布尔值。
- `setPrototypeOf(target, proto)`：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- `apply(target, object, args)`：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
- `construct(target, args)`：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。

---
title: TypeScript 基础学习手册
category: WEB前端
subcategory: TypeScript
level: 4
zIndex: 200
tags:
  - TypeScript
  - ES6+
---

# TypeScript 基础学习手册

TypeScript简称TS；

`TypeScript` 和 `JavaScript` 之间的关系其实就是 `Less/Sass` 和 `CSS` 之间的关系；就像 `Less/Sass` 是对 `CSS` 进行扩展一样, `TypeScript` 也是对 `JavaScript` 进行扩展；就像 `Less/Sass` 最终会转换成 `CSS` 一样, 我们编写好的 `TypeScript` 代码最终也会换成 `JavaScript`；`TypeScript` 是 `JavaScript` 的超集，因为它扩展了 `JavaScript`，有 `JavaScript` 没有的东西。

硬要以父子类关系来说的话，`TypeScript` 是 `JavaScript` 子类，继承的基础上去扩展。

## 参考

> [!tip] 参考文章/资料
> 
> [阮一峰 - TypeScript 教程](https://wangdoc.com/typescript/)
> 
> [typescript 史上最强学习入门文章](https://juejin.cn/post/7018805943710253086)

## 安装 | 使用

```shell
# npm 安装全局 ts
npm install -g typescript

# 检查 ts 版本
tsc -v

# 初始化 ts 项目
tsc --init

# [选装] 安装 ts-node
npm install -g ts-node
```

然后新建 `index.ts` 文件，输入相关练习代码，然后执行 `ts-node index.ts` 。


## 基础数据类型

javascript 中内置的八种基础数据类型：

```typescript
let str: string = "jimmy";
let num: number = 24;
let bool: boolean = false;
let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
let big: bigint = 100n;
let sym: symbol = Symbol("me");
```

**null 和 undefined**

默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给其他类型。

如果你在 `tsconfig.json` 指定了 `"strictNullChecks":true` ，`null` 和 `undefined` 只能赋值给 `void` 和它们各自的类型。


**number 和 bigint**

虽然 `number` 和 `bigint` 都表示数字，但是这两个类型不兼容。会抛出一个类型不兼容的 ts(2322) 错误。


## 其他数据类型


### 数组

---

```typescript
// 两种定义方式 
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]


// 定义联合类型数组
let arr3: (number | string) = [1, "A", 2, "B"]


// 定义指定对象成员的数组：
interface ArrObj {
  name: string,
  age : number,
}
let arr4: ArrObj[] = [{name: "zhangsan", age: 23}]
```

### 函数

---

```ts
// 函数声明
function sum(x: number, y: number): number {
    return x + y
}


// 函数表达式
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y
}


// 使用接口定义函数
interface SearchFunc{
  (source: string, subString: string): boolean;
}
// 采用函数表达式接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变


// 可选参数
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
// 注意点：可选参数后面不允许再出现必需参数


// 参数默认值
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');


// 剩余参数
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}
let a = [];
push(a, 1, 2, 3);
```

#### 函数重载

函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。 

```typescript
type Types = number | string
function add(a:number,b:number):number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a:Types, b:Types) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add('Semlinker', ' Kakuqo');
result.split(' ');
```

在以上代码中，我们为 add 函数提供了多个函数类型定义，从而实现函数的重载。之后，可恶的错误消息又消失了，因为这时 result 变量的类型是 string 类型。


### 元组

众所周知，数组一般由同种类型的值组成，但有时我们需要在单个变量中存储不同类型的值，这时候我们就可以使用元组。在 JavaScript 中是没有元组的，元组是 TypeScript 中特有的类型，其工作方式类似于数组。

元组最重要的特性是可以限制 「数组元素的个数和类型」，它特别适合用来实现多值返回。

元祖用于保存定长定数据类型的数据

```typescript
let x: [string, number]; 
// 类型必须匹配且个数必须为2

x = ['hello', 10]; // OK 
x = ['hello', 10,10]; // Error 
x = [10, 'hello']; // Error
```
注意，元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。如果一个数组中可能有多种类型，数量和类型都不确定，那就直接any[]

#### 解构赋值

我们可以通过下标的方式来访问元组中的元素，当元组中的元素较多时，这种方式并不是那么便捷。其实元组也是支持解构赋值的：

```typescript
let employee: [number, string] = [1, "Semlinker"];
let [id, username] = employee;
console.log(`id: ${id}`);
console.log(`username: ${username}`);
```

#### 可选元素

与函数签名类型，在定义元组类型时，我们也可以通过 `?` 号来声明元组类型的可选元素。

```typescript
let optionalTuple: [string, boolean?];

optionalTuple = ["Semlinker", true];
console.log(`optionalTuple : ${optionalTuple}`);

optionalTuple = ["Kakuqo"];
console.log(`optionalTuple : ${optionalTuple}`);
```

#### 剩余元素

元组类型里最后一个元素可以是剩余元素，形式为 `...X`，这里 `X` 是数组类型。

剩余元素代表元组类型是开放的，可以有零个或多个额外的元素。 

例如，`[number, ...string[]]` 表示带有一个 `number` 元素和任意数量 `string` 类型元素的元组类型。

```typescript
type RestTupleType = [number, ...string[]];
let restTuple: RestTupleType = [666, "Semlinker", "Kakuqo", "Lolo"];

console.log(restTuple[0]);
console.log(restTuple[1]);
```

#### 只读元组

TypeScript 3.4 还引入了对只读元组的新支持。我们可以为任何元组类型加上 readonly 关键字前缀，以使其成为只读元组。

```typescript
const point: readonly [number, number] = [10, 20];
```

### void

void表示没有任何类型，和其他类型是平等关系，不能直接赋值。

你只能为它赋予 `null` 和 `undefined`（在 strictNullChecks 未指定为 true 时）。声明一个 `void` 类型的变量没有什么大用，我们一般也只有在函数没有返回值时去声明。

值得注意的是，方法没有返回值将得到 `undefined` ，但是我们需要定义成 `void` 类型，而不是 `undefined` 类型。否则将报错:

```typescript
let a: void; 
let b: number = a; // Error

function fun(): undefined {
  console.log("this is TypeScript");
};
fun(); // Error
```

### never

never 类型表示的是那些永不存在的值的类型。

值会永不存在的两种情况：

1. 如果一个函数执行时抛出了 「**异常**」 ，那么这个函数永远不存在返回值（因为抛出异常会直接中断程序运行，这使得程序运行不到返回值那一步，即具有不可达的终点，也就永不存在返回了）

2. 函数中执行无限循环的代码（「**死循环**」），使得程序永远无法运行到函数返回值那一步，永不存在返回。

```typescript
// 异常
function err(msg: string): never { // OK
  throw new Error(msg); 
}

// 死循环
function loopForever(): never { // OK
  while (true) {};
}
```

never类型同null和undefined一样，也是任何类型的子类型，也可以赋值给任何类型。

但是没有类型是never的子类型或可以赋值给never类型（除了never本身之外），即使any也不可以赋值给never

```typescript
let ne: never;
let nev: never;
let an: any;

ne = 123; // Error
ne = nev; // OK
ne = an; // Error
ne = (() => { throw new Error("异常"); })(); // OK
ne = (() => { while(true) {} })(); // OK
```

### any

在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的顶级类型.

如果是一个普通类型，在赋值过程中改变类型是不被允许的：

「**变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型**」

在许多场景下，这太宽松了。使用 any 类型，可以很容易地编写类型正确但在运行时有问题的代码。

如果我们使用 any 类型，就无法使用 TypeScript 提供的大量的保护机制。请记住，any 是魔鬼！尽量不要用any。


### unknown

unknown与any一样，所有类型都可以分配给unknown

unknown 与 any 的最大区别是： 任何类型的值可以赋值给 any，同时 any 类型的值也可以赋值给任何类型。unknown 任何类型的值都可以赋值给它，但它只能赋值给 unknown 和 any

如果不缩小类型，就无法对unknown类型执行任何操作

```typescript
function getDog() {
 return '123'
}
 
const dog: unknown = {hello: getDog};
dog.hello(); // Error
```

这种机制起到了很强的预防性，更安全，这就要求我们必须缩小类型，我们可以使用typeof、类型断言等方式来缩小未知范围：

```typescript
function getDogName() {
 let x: unknown;
 return x;
};
const dogName = getDogName();
// 直接使用
const upName = dogName.toLowerCase(); // Error
// typeof
if (typeof dogName === 'string') {
  const upName = dogName.toLowerCase(); // OK
}
// 类型断言 
const upName = (dogName as string).toLowerCase(); // OK
```

### object、Object 和 {}

此处先直接说结论：「{}、大 Object 是比小 object 更宽泛的类型（least specific），{} 和大 Object 可以互相代替，用来表示原始类型（null、undefined 除外）和非原始类型；而小 object 则表示非原始类型。」

## 类型推断

```typescript
{
  let str = 'this is string'; // 等价 let str: string = 'this is string'; 下面类似
  let num = 1; // 等价
  let bool = true; // 等价
}
{
  const str = 'this is string'; // 不等价
  const num = 1; // 不等价
  const bool = true; // 不等价
}

{
  // 根据参数的类型，推断出返回值的类型也是 number
  function add1(a: number, b: number) {
    return a + b;
  }
  const x1= add1(1, 1); // 推断出 x1 的类型也是 number
  
  // 推断参数 b 的类型是数字或者 undefined，返回值的类型也是数字
  function add2(a: number, b = 1) {
    return a + b;
  }
  const x2 = add2(1);
  const x3 = add2(1, '1'); // ts(2345) Argument of type "1" is not assignable to parameter of type number | undefined
}
```

我们把 TypeScript 这种基于赋值表达式推断类型的能力称之为类型推断。

在 TypeScript 中，具有初始化值的变量、有默认值的函数参数、函数返回的类型都可以根据上下文推断出来。比如我们能根据 return 语句推断函数返回的类型。

> 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查。

## 类型断言

TypeScript 类型检测无法做到绝对智能，毕竟程序不能像人一样思考。有时会碰到我们比 TypeScript 更清楚实际类型的情况；

```typescript
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan3: number = arrayNumber.find(num => num > 2); // 提示 ts(2322)

// 使用 as 语法进行断言
const arrayNumber1: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2) as number;
```

以下两种方式虽然没有任何区别，但是尖括号格式会与 react 中 JSX 产生语法冲突，因此我们更推荐使用 as 语法。

```typescript
// as 语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

### 非空断言

在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型。「具体而言，`x!` 将从 `x` 值域中排除 `null` 和 `undefined`」。

```typescript
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}


// 允许在实例属性和变量声明后面放置一个 ! 号，从而告诉 TypeScript 该属性会被明确地赋值。
let x!: number;
initialize();
console.log(2 * x); // Ok

function initialize() {
  x = 10;
}
```

## 字面量类型

目前，TypeScript 支持 3 种字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型

实际上，定义单个的字面量类型并没有太大的用处，它真正的应用场景是可以把多个字面量类型组合成一个联合类型

```typescript
type Direction = 'up' | 'down';

function move(dir: Direction) {
  // ...
}
move('up'); // ok
move('right'); // ts(2345) Argument of type '"right"' is not assignable to parameter of type 'Direction'
```

通过使用字面量类型组合的联合类型，我们可以限制函数的参数为指定的字面量类型集合，然后编译器会检查参数是否是指定的字面量类型集合里的成员。

因此，相较于使用 string 类型，使用字面量类型（组合的联合类型）可以将函数的参数限定为更具体的类型。这不仅提升了程序的可读性，还保证了函数的参数类型，可谓一举两得。

## 类型拓宽

所有通过 let 或 var 定义的变量、函数的形参、对象的非只读属性，如果满足指定了初始值且未显式添加类型注解的条件，那么它们推断出来的类型就是指定的初始值字面量类型拓宽后的类型，这就是字面量类型拓宽。

```typescript
let str = 'this is string'; // 类型是 string
let strFun = (str = 'this is string') => str; // 类型是 (str?: string) => string;
const specifiedStr = 'this is string'; // 类型是 'this is string'
let str2 = specifiedStr; // 类型是 'string'
let strFun2 = (str = specifiedStr) => str; // 类型是 (str?: string) => string;

{
  let x = null; // 类型拓宽成 any
  let y = undefined; // 类型拓宽成 any

  // ----------------------------
  const z = null; // 类型是 null

  // ----------------------------
  let anyFun = (param = null) => param; // 形参类型是 null
  let z2 = z; // 类型是 null
  let x2 = x; // 类型是 null
  let y2 = y; // 类型是 undefined
}
```

## 类型缩小

在 TypeScript 中，我们可以通过某些操作将变量的类型由一个较为宽泛的集合缩小到相对较小、较明确的集合，这就是 "Type Narrowing"。

```typescript
{
  let func = (anything: any) => {
    if (typeof anything === 'string') {
      return anything; // 类型是 string 
    } else if (typeof anything === 'number') {
      return anything; // 类型是 number
    }
    return null;
  };
}
```

## 联合类型

联合类型表示取值可以为多种类型中的一种，使用 | 分隔每个类型。

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven'; // OK
myFavoriteNumber = 7; // OK

const sayHello = (name: string | undefined) => {
  /* ... */
};
```

联合类型通常与 null 或 undefined 一起使用：

## 类型别名

类型别名用来给一个类型起个新名字。类型别名常用于联合类型。

```typescript
type Message = string | string[];
let greet = (message: Message) => {
  // ...
};
```

> 注意：类型别名，诚如其名，即我们仅仅是给类型取了一个新的名字，并不是创建了一个新的类型。

## 交叉类型

交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性，使用 & 定义交叉类型。

很显然，如果我们仅仅把原始类型、字面量类型、函数类型等原子类型合并成交叉类型，是没有任何用处的，因为任何类型都不能满足同时属于多种原子类型

交叉类型真正的用武之地就是将多个接口类型合并成一个类型，从而实现等同接口继承的效果，也就是所谓的合并接口类型

```typescript
type IntersectionType = { id: number; name: string; } & { age: number };
  const mixed: IntersectionType = {
    id: 1,
    name: 'name',
    age: 18
  }

```

## 接口

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

```typescript
interface Person {
    name: string;
    age: number;
}
let tom: Person = {
    name: 'Tom',
    age: 25
};
```

### 可选 | 只读

```typescript
interface Person {
  readonly name: string;
  age?: number;
}
```

只读属性用于限制只能在对象刚刚创建的时候修改其值。

此外 TypeScript 还提供了 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改。

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

### 任意属性

有时候我们希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 索引签名 的形式来满足上述要求。

```typescript
interface Person {
    name: string;
    age?: number; // 这里真实的类型应该为：number | undefined
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

> 需要注意的是，「一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集」

## 接口与类型的区别

实际上，在大多数的情况下使用接口类型和类型别名的效果等价，但是在某些特定的场景下这两者还是存在很大区别。

> TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 而接口的作用就是为这些类型命名和为你的代码或第三方代码定义数据模型。
>
> type(类型别名)会给一个类型起个新名字。 type 有时和 interface 很像，但是可以作用于原始值（基本类型），联合类型，元组以及其它任何你需要手写的类型。起别名不会新建一个类型 - 它创建了一个新 名字来引用那个类型。给基本类型起别名通常没什么用，尽管可以做为文档的一种形式使用。


# TS 学习笔记

## 安装 TypeScript

```shell
npm i -g typescript # 全局安装最新版 TypeScript

npm i -g ts-node # 全局安装ts-node

tsc --init # 创建 tsconfig.json 文件(TS项目必需文件)
```

## JS的八种内置类型

```ts
let str: string = "jimmy"
let num: number = 24
let bool: boolean = false
let u: undefined = undefined
let n: null = null
let obj: object = {x: 1}
let big: bigint = 100n
let sym: symbol = Symbol("me");
```

> 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给其他类型。  
> 在tsconfig.json指定了"strictNullChecks":true ，null 和 undefined 只能赋值给 void 和它们各自的类型。 

```ts
// null和undefined赋值给string
let str:string = "666"
str = null
str= undefined

// null和undefined赋值给Symbol
let sym: symbol = Symbol("me"); 
sym = null
sym= undefined
``` 

> number和bigint都表示数字，但是这两个类型不兼容。

```ts
let big: bigint =  100n
let num: number = 6
big = num
num = big
```

## 其他类型

### 数组

```ts
// 数组有两种定义方式
let arr:string[] = ["1","2"]
let arr2:Array<string> = ["1","2"]


// 定义 联合数组
let arr:(number | string)[]
// 表示定义了一个名称叫做arr的数组, 
// 这个数组中将来既可以存储数值类型的数据, 也可以存储字符串类型的数据
arr3 = [1, 'b', 2, 'c']


// 定义指定对象成员的数组
// interface 是接口
interface Arrobj{
    name:string,
    age:number
}
let arr3:Arrobj[]=[{name:'jimmy',age:22}]
```

### 函数

```ts
// 函数声明
function sum(x: number, y: number): number {
    return x + y
}

// 函数表达式
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y
}

// 用接口定义函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// 采用函数表达式接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

// 可选参数
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName
    } else {
        return firstName
    }
}
let tomcat = buildName('Tom', 'Cat')
let tom = buildName('Tom')


// 默认参数
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName
}


// 剩余参数
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item)
    })
}
let a = []
push(a, 1, 2, 3)
```

> 函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。 要解决前面遇到的问题，方法就是为同一个函数提供多个函数类型定义来进行函数重载，编译器会根据这个列表去处理函数的调用。

```ts
type Types = number | string // 自定义一个类型, 包含 字符串和数字

// 为 add 函数提供了多个函数类型定义，从而实现函数的重载
function add(a:number,b:number): number
function add(a: string, b: string): string
function add(a: string, b: number): string
function add(a: number, b: string): string
function add(a:Types, b:Types) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}
const result = add('Semlinker', ' Kakuqo')
result.split(' ')
```

### 元组(Tuple)

在其他编程语言中，数组一般由同种类型的值组成，但有时我们需要在单个变量中存储不同类型的值，这时候我们就可以使用元组。在 JavaScript 中是没有元组的，元组是 TypeScript 中特有的类型，其工作方式类似于数组。

元组最重要的特性是可以限制数组元素的个数和类型，它特别适合用来实现多值返回。

```ts
let x: [string, number]

x = ['hello', 2233] // OK
x = ['hello', 22, 33] // Error
x = [2233, 'hello'] // Error
```

__注意__，元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。如果一个数组中可能有多种类型，数量和类型都不确定，那就直接any[]

```ts
// 元组同样是支持解构赋值的, 这点和 js 的数组一样
let employee: [number, string] = [1, "Semlinker"]
let [id, username] = employee

console.log(`id: ${id}`)
console.log(`username: ${username}`)


// 元组也支持可选元素, 通过 ? 号来声明元组类型的可选元素
type Point = [number, number?, number?]

const x: Point = [10] // 一维坐标点
const xy: Point = [10, 20] // 二维坐标点
const xyz: Point = [10, 20, 10] // 三维坐标点

console.log(x.length) // 1
console.log(xy.length) // 2
console.log(xyz.length) // 3


// 元组也支持 剩余元素
// 最后一个元素可以是剩余元素，形式为 ...X，这里 X 是数组类型。
// 剩余元素代表元组类型是开放的，可以有零个或多个额外的元素
type RestTupleType = [number, ...string[]]
let restTuple: RestTupleType = [666, "Semlinker", "Kakuqo", "Lolo"]

console.log(restTuple[0])
console.log(restTuple[1])


// typescript 还提供了只读元组
// 加上 readonly 关键字前缀，以使其成为只读元组
const point: readonly [number, number] = [10, 20]
```

### void

void表示没有任何类型，和其他类型是平等关系，不能直接赋值

> void 可以赋予 null 和 undefined（在strictNullChecks未指定为true时）。声明一个void类型的变量没有什么大用，我们一般也只有在函数没有返回值时去声明。

```ts
let a: void
let b: number = a // Error

// 需要注意，方法没有返回值将得到undefined，但是我们需要定义成void类型，而不是undefined类型
function fun1(): undefined {
    console.log('this is typescript')
}
fun1() // error
```

### never

`never` 类型表示的是那些永不存在的值的类型

值会永不存在的两种情况: 

- 如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值（因为抛出异常会直接中断程序运行，这使得程序运行不到返回值那一步，即具有不可达的终点，也就永不存在返回了）
- 函数中执行无限循环的代码（死循环），使得程序永远无法运行到函数返回值那一步，永不存在返回

```ts
// 异常
function err(msg: string): never { // OK
    throw new Error(msg)
}

// 死循环
function loopForever(): never { // OK
    while (true) {}
}

// never 类型同 null 和 undefined 一样，也是任何类型的子类型，也可以赋值给任何类型
// 但没有类型是 never 的子类型或可以赋值给 never 类型（除了 never 本身之外），即使 any 也不可以赋值给 never

let ne: never
let nev: never
let an: any

ne = 123 // Error
ne = nev // OK
ne = an // Error
ne = (() => { throw new Error("异常"); })() // OK
ne = (() => { while(true) {} })() // OK

// 可以利用 never 类型的特性来实现全面性检查
type Foo = string | number;

function controlFlowAnalysisWithNever(foo: Foo) {
    if (typeof foo === "string") {
        // 这里 foo 被收窄为 string 类型
    } else if (typeof foo === "number") {
        // 这里 foo 被收窄为 number 类型
    } else {
        // foo 在这里是 never
        const check: never = foo
    }
}
```

### any

在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的顶级类型。

如果是一个普通类型，在赋值过程中改变类型是不被允许的。但如果是 any 类型，则允许被赋值为任意类型。

在any上访问任何属性都是允许的，也允许调用任何方法。

__变量如果在声明的时候，未指定其类型，那么它会被识别为 `any` 类型__

> 切记，不要大量的使用且无理由的使用 any 类型，因为这样会失去大部分的 typescript 提供的保护机制，这样使用 typescript 就没有意义了。总之万万别把代码写成 anyscript 了。

```ts
let anyThing: any = 'hello'
console.log(anyThing.myName)
console.log(anyThing.myName.firstName)

let anyThing: any = 'Tom'
anyThing.setName('Jerry')
anyThing.setName('Jerry').sayHello()
anyThing.myName.setFirstName('Cat')
```

### unknown

unknown 与 any 一样，所有类型都可以分配给 unknown

unknown 与 any 的最大区别是： 任何类型的值可以赋值给any，同时any类型的值也可以赋值给任何类型。

而 unknown 任何类型的值都可以赋值给它，但它只能赋值给 unknown 和 any。

```ts
let notSure: unknown = 4
let uncertain: any = notSure // OK

let notSure: any = 4
let uncertain: unknown = notSure // OK

let notSure: unknown = 4
let uncertain: number = notSure // Error

// 如果不缩小类型，就无法对unknown类型执行任何操作
function getDog() {
 return '123'
}
 
const dog: unknown = {hello: getDog}
dog.hello() // Error
```
> 这种机制起到了很强的预防性，更安全，这就要求我们必须缩小类型，我们可以使用typeof、类型断言等方式来缩小未知范围

### Number、String、Boolean、Symbol

本质就是原始类型 number、string、boolean、symbol 的包装对象，算是一种对象类型吧。

兼容性上，原始类型都兼容各自对应的对象类型，但是对象类型却不能兼容对应的原始类型。

```ts
let num: number
let Num: Number
Num = num // ok
num = Num // ts(2322)报错
```

> 所以记住：不要使用对象类型来注解值的类型，这样做没有意义

### object、Object 和 {}

统一一下对应的称呼先：`object（小obj）`、`Object（大Obj）`、`{}（空对象）`

小 obj 代表的是所有非原始类型，也就是说我们不能把 number、string、boolean、symbol等原始类型赋值给 object。在严格模式下，null 和 undefined 类型也不能赋给 object。

> JavaScript 中以下类型被视为原始类型：string、boolean、number、bigint、symbol、null 和 undefined

大Obj 代表所有拥有 toString、hasOwnProperty 方法的类型，所以所有原始类型、非原始类型都可以赋给 Object。同样，在严格模式下，null 和 undefined 类型也不能赋给 Object。

{}空对象类型和大 Object 一样，也是表示原始类型和非原始类型的集合，并且在严格模式下，null 和 undefined 也不能赋给 {} 

> 大Obj 包含原始类型，小obj 仅包含非原始类型，所以大 Object 似乎是小 object 的父类型。实际上，大 Object 不仅是小 object 的父类型，同时也是小 object 的子类型。  
> 注意：尽管官方文档说可以使用小 object 代替大 Object，但是我们仍要明白大 Object 并不完全等价于小 object。

综上结论：**{}、大 Obj 是比小 obj 更宽泛的类型（least specific），{} 和大 Object 可以互相代替，用来表示原始类型（null、undefined 除外）和非原始类型；而小 object 则表示非原始类型。**


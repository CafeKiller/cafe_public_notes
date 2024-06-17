# TS 学习笔记

## 安装 TypeScript

```shell
npm i -g typescript # 全局安装最新版 TypeScript

npm i -g ts-node # 全局安装ts-node

tsc --init # 创建 tsconfig.json 文件(TS项目必需文件)
```

## JS的八种内置类型

```ts
let str: string = "jimmy";
let num: number = 24;
let bool: boolean = false;
let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
let big: bigint = 100n;
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
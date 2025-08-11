---
title: TypeScript 进阶学习手册
category: WEB前端
subcategory: TypeScript
level: 4
zIndex: 199
tags:
  - TypeScript
  - ES6+
---
# TypeScript 进阶学习手册

> [!tip] 参考资料
>
> [TypeScript教程 - tsconfig.json](https://wangdoc.com/typescript/tsconfig.json)

## 泛型

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

其中 T 代表 Type，在定义泛型时通常用作第一个类型变量名称。但实际上 T 可以用任何有效名称代替。除了 T 之外，以下是常见泛型变量代表的意思：

- K（Key）：表示对象中的键类型；
- V（Value）：表示对象中的值类型；
- E（Element）：表示元素类型。

### 泛型约束

```typescript
function trace<T>(arg: T): T {
  console.log(arg.size); // Error: Property 'size doesn't exist on type 'T'
  return arg;
}

interface Sizeable {
  size: number;
}
function trace<T extends Sizeable>(arg: T): T {
  console.log(arg.size);
  return arg;
}
```

## 泛型工具类型

为了方便开发者 TypeScript 内置了一些常用的工具类型，比如 Partial、Required、Readonly、Record 和 ReturnType 等。不过在具体介绍之前，我们得先介绍一些相关的基础知识，方便读者可以更好的学习其它的工具类型。

### typeof

typeof 的主要用途是在类型上下文中获取变量或者属性的类型

```typescript
const Message = {
    name: "jimmy",
    age: 18,
    address: {
      province: '四川',
      city: '成都'   
    }
}
type message = typeof Message;
/*
 type message = {
    name: string;
    age: number;
    address: {
        province: string;
        city: string;
    };
}
*/
```

此外，typeof 操作符除了可以获取对象的结构类型之外，它也可以用来获取函数对象的类型

```typescript
function toArray(x: number): Array<number> {
  return [x];
}
type Func = typeof toArray; // -> (x: number) => number[]
```

### keyof

keyof 操作符是在 TypeScript 2.1 版本引入的，该操作符可以用于获取某种类型的所有键，其返回类型是联合类型。

```typescript
interface Person {
  name: string;
  age: number;
}

type K1 = keyof Person; // "name" | "age"
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join" 
type K3 = keyof { [x: string]: Person };  // string | number
```

在 TypeScript 中支持两种索引签名，数字索引和字符串索引

```typescript
interface StringArray {
  // 字符串索引 -> keyof StringArray => string | number
  [index: string]: string; 
}

interface StringArray1 {
  // 数字索引 -> keyof StringArray1 => number
  [index: number]: string;
}
```

为了同时支持两种索引类型，就得要求数字索引的返回值必须是字符串索引返回值的子类。其中的原因就是当使用数值索引时，JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引。所以 `keyof { [x: string]: Person }` 的结果会返回 `string | number`。

keyof 也支持基本数据类型

```typescript
let K1: keyof boolean;  // let K1: "valueOf"
let K2: keyof number;   // let K2: "toString" | "toFixed" | "toExponential" | ...
let K3: keyof symbol;   // let K1: "valueOf"
```

### in

in 用来遍历枚举类型

```typescript
type Keys = "a" | "b" | "c"

type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any, c: any }
```

### infer

在条件类型语句中，可以用 `infer` 声明一个类型变量并且对它进行使用。

```typescript
type ReturnType<T> = T extends (
  ...args: any[]
) => infer R ? R : any;
```

以上代码中 `infer R` 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数返回值的类型方便之后使用。

### extends

有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型

```ts
loggingIdentity(3);  // Error, number doesn't have a .length property
```

这时我们需要传入符合约束类型的值，必须包含length属性

```ts
loggingIdentity({length: 10, value: 3});
```

### 索引类型

在实际开发中，我们经常能遇到这样的场景，在对象中获取一些属性的值，然后建立对应的集合。

```ts
let person = {
    name: 'musion',
    age: 35
}

function getValues(person: any, keys: string[]) {
    return keys.map(key => person[key])
}

console.log(getValues(person, ['name', 'age'])) // ['musion', 35]
console.log(getValues(person, ['gender'])) // [undefined]
```

在上述例子中，可以看到 `getValues(persion, ['gender'])` 打印出来的是 `[undefined]`，但是ts编译器并没有给出报错信息，那么如何使用 ts 对这种模式进行类型约束呢？这里就要用到了索引类型,改造一下 getValues 函数，通过 **索引类型查询** 和 **索引访问** 操作符

```typescript
function getValues<T, K extends keyof T>(person: T, keys: K[]): T[K][] {
  return keys.map(key => person[key]);
}

interface Person {
    name: string;
    age: number;
}

const person: Person = {
    name: 'musion',
    age: 35
}

getValues(person, ['name']) // ['musion']
getValues(person, ['gender']) // 报错：
// Argument of Type '"gender"[]' is not assignable to parameter of type '("name" | "age")[]'.
// Type "gender" is not assignable to type "name" | "age".
```

编译器会检查传入的值是否是Person的一部分。通过下面的概念来理解上面的代码

```typescript
// T[K]表示对象T的属性K所表示的类型，在上述例子中，T[K][] 表示变量T取属性K的值的数组

// 通过[]索引类型访问操作符, 我们就能得到某个索引的类型
class Person {
    name:string;
    age:number;
}
type MyType = Person['name'];  //Person中name的类型为string type MyType = string
```

### 映射类型

> 根据旧的类型创建出新的类型, 我们称之为映射类型

```typescript
// 比如我们定义一个接口
interface TestInterface{
    name:string,
    age:number
}

// 我们把上面定义的接口里面的属性全部变成可选
// 我们可以通过 +/- 来指定添加还是删除

type OptionalTestInterface<T> = {
  +readonly [p in keyof T]+?:T[p];  // 再加上只读
}

type newTestInterface = OptionalTestInterface<TestInterface>
// type newTestInterface = {
//    name?:string,
//    age?:number
// }
```

由于生成只读属性和可选属性比较常用, 所以 TypeScript 内部已经给我们提供了现成的实现 Readonly / Partial,会面内置的工具类型会介绍。

### Partial

`Partial<T>` 将类型的属性变成可选

```ts
// 定义
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 在以上代码中，首先通过 keyof T 拿到 T 的所有属性名，
// 然后使用 in 进行遍历，将值赋给 P，最后通过 T[P] 取得相应的属性值的类。
// 中间的 ? 号，用于将所有属性变为可选。


// 举例
interface UserInfo {
    id: string;
    name: string;
}
// error：Property 'id' is missing in type '{ name: string; }' but required in type 'UserInfo'
const xiaoming: UserInfo = {
    name: 'xiaoming'
}
// 使用 Partial<T>
type NewUserInfo = Partial<UserInfo>;
const xiaoming: NewUserInfo = {
    name: 'xiaoming'
}
```

但是 `Partial<T>` 有个局限性，就是只支持处理第一层的属性

如果要处理多层，就需要自己实现了

```ts
type DeepPartial<T> = {
     // 如果是 object，则递归类型
    [U in keyof T]?: T[U] extends object
      ? DeepPartial<T[U]>
      : T[U]
};

type PartialedWindow = DeepPartial<T>; // 现在T上所有属性都变成了可选啦
```

### Required

`Required<T>` 将类型的属性变成必选

```ts
// 定义
type Required<T> = { 
    [P in keyof T]-?: T[P] 
};
// 其中 -? 是代表移除 ? 这个 modifier 的标识。
// 再拓展一下，除了可以应用于 ? 这个 modifiers，
// 还有应用在 readonly ，比如 Readonly<T> 这个类型
```

### Readonly

`Readonly<T>` 的作用是将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值。

```ts
// 定义
type Readonly<T> = {
 readonly [P in keyof T]: T[P];
};

// 举例
interface Todo {
 title: string;
}
const todo: Readonly<Todo> = {
 title: "Delete inactive users"
};
todo.title = "Hello"; // Error: cannot reassign a readonly property
```

### Pick

Pick 从某个类型中挑出一些属性出来

```ts
// 定义
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// 举例
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Pick<Todo, "title" | "completed">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

### Record

`Record<K extends keyof any, T>` 的作用是将 `K` 中所有的属性的值转化为 `T` 类型

```ts
// 定义
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

// 举例
interface PageInfo {
  title: string;
}
type Page = "home" | "about" | "contact";
const x: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
```

### ReturnType

用来得到一个函数的返回值类型

```ts
// 定义
type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R ? R : any;
// infer 在这里用于提取函数类型的返回值类型。
// ReturnType<T> 只是将 infer R 从参数位置移动到返回值位置，
// 因此此时 R 即是表示待推断的返回值类型。

// 举例
type Func = (value: number) => string;
const foo: ReturnType<Func> = "1";
// ReturnType 获取到 Func 的返回值类型为 string，
// 所以，foo 也就只能被赋值为字符串了。
```

### Exclude

`Exclude<T, U>` 的作用是将某个类型中属于另一个的类型移除掉。

```ts
// 定义
type Exclude<T, U> = T extends U ? never : T;
// 如果 T 能赋值给 U 类型的话，那么就会返回 never 类型，否则返回 T 类型。
// 最终实现的效果就是将 T 中某些属于 U 的类型移除掉。

// 举例
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

### Extract

`Extract<T, U>` 的作用是从 `T` 中提取出 `U`。

```ts
// 定义
type Extract<T, U> = T extends U ? T : never;

// 举例
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T1 = Extract<string | number | (() => void), Function>; // () =>void
```

### Omit

`Omit<T, K extends keyof any>` 的作用是使用 `T` 类型中除了 `K` 类型的所有属性，来构造一个新的类型。

```ts
// 定义
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 举例
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Omit<Todo, "description">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

### NonNullable

`NonNullable<T>` 的作用是用来过滤类型中的 `null` 及 `undefined` 类型。

```ts
// 定义
type NonNullable<T> = T extendsnull | undefined ? never : T;

// 举例
type T0 = NonNullable<string | number | undefined>; // string | number
type T1 = NonNullable<string[] | null | undefined>; // string[]
```

### Parameters

`Parameters<T>` 的作用是用于获得函数的参数类型组成的元组类型。

```ts
// 定义
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// 举例
type A = Parameters<() =>void>; // []
type B = Parameters<typeofArray.isArray>; // [any]
type C = Parameters<typeofparseInt>; // [string, (number | undefined)?]
type D = Parameters<typeofMath.max>; // number[]
```


## tsconfig.json

`tsconfig.json` 是 TypeScript 项目的配置文件。如果一个目录下存在一个 `tsconfig.json` 文件，那么往往意味着这个目录就是 TypeScript 项目的根目录。

`tsconfig.json` 包含 TypeScript 编译的相关配置，通过更改编译配置项，我们可以让 TypeScript 编译出 ES6、ES5、node 的代码。

> [!tip] 重要字段
> 
> `files` - 设置要编译的文件的名称；
>
> `include` - 设置需要进行编译的文件，支持路径模式匹配；
>
> `exclude` - 设置无需进行编译的文件，支持路径模式匹配；
>
> `compilerOptions` - 设置与编译流程相关的选项。

```javascript
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```

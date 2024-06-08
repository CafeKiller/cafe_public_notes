# TS 知识点整理

## 类型断言

对于没有类型声明的值，TypeScript 会进行类型推断，很多时候得到的结果，未必是开发者想要的。

```ts
type T = 'a'|'b'|'c';
let foo = 'a';

let bar:T = foo; // 报错

// 上面示例中，最后一行报错，原因是 TypeScript 推断变量foo的类型是string，而变量bar的类型是'a'|'b'|'c'，前者是后者的父类型。
// 父类型不能赋值给子类型，所以就报错了。
```

TypeScript 提供了“类型断言”这样一种手段，允许开发者在代码中“断言”某个值的类型，告诉编译器此处的值是什么类型。  

TypeScript 一旦发现存在类型断言，就不再对该值进行类型推断，而是直接采用断言给出的类型。  

这种做法的实质是，允许开发者在某个位置“绕过”编译器的类型推断，让本来通不过类型检查的代码能够通过，避免编译器报错。  

这样虽然削弱了 TypeScript 类型系统的严格性，但是为开发者带来了方便，毕竟开发者比编译器更了解自己的代码。  

```ts
type T = 'a'|'b'|'c';

let foo = 'a';
let bar:T = foo as T; // 正确

// 上面示例中，最后一行的foo as T表示告诉编译器，变量foo的类型断言为T，所以这一行不再需要类型推断了，编译器直接把foo的类型当作T，就不会报错了。
```

总之，类型断言并不是真的改变一个值的类型，而是提示编译器，应该如何处理这个值。  

类型断言有两种语法。

```ts
// 语法一：<类型>值
<Type>value
let bar:T = <T>foo;

// 语法二：值 as 类型
value as Type
let bar:T = foo as T;

// 上面两种语法是等价的，value表示值，Type表示类型。
// 早期只有语法一，后来因为 TypeScript 开始支持 React 的 JSX 语法（尖括号表示 HTML 元素），为了避免两者冲突，就引入了语法二。
// 目前，推荐使用语法二。
```

## 类型断言的条件

注意: 类型断言并不意味着，可以把某个值断言为任意类型。

```ts
const n = 1;
const m:string = n as string; // 报错

// 上面示例中，变量n是数值，无法把它断言成字符串，TypeScript 会报错。

expr as T
// 上面代码中，expr是实际的值，T是类型断言，它们必须满足下面的条件：expr是T的子类型，或者T是expr的子类型。
```

类型断言的使用前提是，值的实际类型与断言的类型必须满足一个条件。

也就是说，类型断言要求实际的类型与断言的类型兼容，实际类型可以断言为一个更加宽泛的类型（父类型），也可以断言为一个更加精确的类型（子类型），但不能断言为一个完全无关的类型。  

但是，如果真的要断言成一个完全无关的类型，也是可以做到的。

那就是连续进行两次类型断言，先断言成 unknown 类型或 any 类型，然后再断言为目标类型。

因为any类型和unknown类型是所有其他类型的父类型，所以可以作为两种完全无关的类型的中介。

```ts
const n = 1;
const m:string = n as unknown as string; // 正确
```

## as const 断言

如果没有声明变量类型，let 命令声明的变量，会被类型推断为 TypeScript 内置的基本类型之一；const 命令声明的变量，则被推断为值类型常量。

```ts
// 类型推断为基本类型 string
let s1 = 'JavaScript';

// 类型推断为字符串 “JavaScript”
const s2 = 'JavaScript';

// 上面示例中，变量s1的类型被推断为string，变量s2的类型推断为值类型JavaScript。
// 后者是前者的子类型，相当于 const 命令有更强的限定作用，可以缩小变量的类型范围。

// 但有些时候，let 变量会出现一些意想不到的报错，变更成 const 变量就能消除报错。
let s = 'JavaScript';

type Lang =
  |'JavaScript'
  |'TypeScript'
  |'Python';

function setLang(language:Lang) {
  /* pass */
}

setLang(s); // 报错

// 上面示例中，最后一行报错，原因是函数setLang()的参数language类型是Lang，这是一个联合类型。
// 但是，传入的字符串s的类型被推断为string，属于Lang的父类型。父类型不能替代子类型，导致报错。
```

一种解决方法就是把 let 命令改成 const 命令。

```ts
const s = 'JavaScript';

// 这样的话，变量s的类型就是值类型JavaScript，它是联合类型Lang的子类型，传入函数setLang()就不会报错。
```

另一种解决方法是使用类型断言。

TypeScript 提供了一种特殊的类型断言as const，用于告诉编译器，推断类型时，可以将这个值推断为常量，即把 let 变量断言为 const 变量，从而把内置的基本类型变更为值类型。

```ts
let s = 'JavaScript' as const;
setLang(s);  // 正确
```

注意，as const断言只能用于字面量，不能用于变量。

## TypeScript 命名空间 (namespace)

因为 `TypeScript` 的作者本身也是 `C#` 的作者, 所以 `TypeScript` 有不少特性是借鉴自 `C#` 的, 比如这个命名空间。

`namespace` 是一种将相关代码组织在一起的方式，中文译为“命名空间”。  

不过，它出现在 `ES` 模块诞生之前，作为 `TypeScript` 自己的模块格式而发明的。但是，自从有了 `ES` 模块，官方已经不推荐使用 `namespace` 了。  

此处只做简单了解即可。

```ts
// namespace 用来建立一个容器，内部的所有变量和函数，都必须在这个容器里面使用。
namespace Utils {
  function isString(value:any) {
    return typeof value === 'string';
  }

  // 正确
  isString('yes');
}
Utils.isString('no'); // 报错

// 如果要在命名空间以外使用内部成员，就必须为该成员加上export前缀，表示对外输出该成员。
namespace Utility {
  export function log(msg:string) {
    console.log(msg);
  }
  export function error(msg:string) {
    console.error(msg);
  }
}
Utility.log('Call me');
Utility.error('maybe!');

// namespace 内部还可以使用import命令输入外部成员，相当于为外部成员起别名。当外部成员的名字比较长时，别名能够简化代码。
namespace Utils {
  export function isString(value:any) {
    return typeof value === 'string';
  }
}
namespace App {
  import isString = Utils.isString;
  isString('yes');
  // 等同于
  Utils.isString('yes');
}

// import命令也可以在 namespace 外部，指定别名。
namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Square {}
  }
}
import polygons = Shapes.Polygons;
// 等同于 new Shapes.Polygons.Square()
let sq = new polygons.Square();

// namespace 是允许嵌套的
namespace Utils {
  export namespace Messaging {
    export function log(msg:string) {
      console.log(msg);
    }
  }
}
Utils.Messaging.log('hello') // "hello"
```

多个同名的命名空间是允许合并的. 


## 装饰器

装饰器（Decorator）是一种语法结构，用来在定义时修改类（class）的行为。

在语法上，装饰器有如下几个特征:

- 第一个字符（或者说前缀）是@，后面是一个表达式。
- @后面的表达式，必须是一个函数（或者执行后可以得到一个函数）。
- 这个函数接受所修饰对象的一些相关值作为参数。
- 这个函数要么不返回值，要么返回一个新对象取代所修饰的目标对象。

```ts
// 简单示例, 函数simpleDecorator()用作装饰器，附加在类A之上，后者在代码解析时就会打印一行日志。
function simpleDecorator() {
  console.log('hi');
}
@simpleDecorator
class A {} // "hi"

// 类A在执行前会先执行装饰器simpleDecorator()，并且会向装饰器自动传入参数就可以了。
function simpleDecorator(
  value:any,
  context:any
) {
  console.log(`hi, this is ${context.kind} ${context.name}`);
  return value;
}
@simpleDecorator
class A {} // "hi, this is class A"

// 装饰器有多种形式，基本上只要在@符号后面添加表达式都是可以的。下面都是合法的装饰器。
@myFunc
@myFuncFactory(arg1, arg2)

@libraryModule.prop
@someObj.method(123)

@(wrap(dict['prop']))
// 注意，@后面的表达式，最终执行后得到的应该是一个函数。
```

TypeScript 从早期开始，就支持装饰器。但是，装饰器的语法后来发生了变化。  

ECMAScript 标准委员会最终通过的语法标准，与 TypeScript 早期使用的语法有很大差异。

目前，TypeScript 5.0 同时支持两种装饰器语法。标准语法可以直接使用，传统语法需要打开--experimentalDecorators编译参数。  

```shell
tsc --target ES5 --experimentalDecorators
```

### 类装饰器

类装饰器接受两个参数：value（当前类本身）和context（上下文对象）。其中，context对象的kind属性固定为字符串class。

类装饰器一般用来对类进行操作，可以不返回任何值

```ts
type ClassDecorator = (
      value: Function,
      context: {
            kind: 'class';
            name: string | undefined;
            addInitializer(initializer: () => void): void;
      }
) => Function | void;
```

类装饰器的上下文对象context的addInitializer()方法，用来定义一个类的初始化函数，在类完全定义结束后执行。

### 方法装饰器

方法装饰器用来装饰类的方法（method）。

```ts
type ClassMethodDecorator = (
      value: Function,
      context: {
            kind: 'method';
            name: string | symbol;
            static: boolean;
            private: boolean;
            access: { get: () => unknown };
            addInitializer(initializer: () => void): void;
      }
) => Function | void;
// 根据上面的类型，方法装饰器是一个函数，接受两个参数：value和context。
```
参数value是方法本身，参数context是上下文对象，有以下属性: 

- kind：值固定为字符串method，表示当前为方法装饰器。
- name：所装饰的方法名，类型为字符串或 Symbol 值。
- static：布尔值，表示是否为静态方法。该属性为只读属性。
- private：布尔值，表示是否为私有方法。该属性为只读属性。
- access：对象，包含了方法的存取器，但是只有get()方法用来取值，没有set()方法进行赋值。
- addInitializer()：为方法增加初始化函数。

### 属性装饰器

属性装饰器用来装饰定义在类顶部的属性（field）。

```ts
type ClassFieldDecorator = (
      value: undefined,
      context: {
            kind: 'field';
            name: string | symbol;
            static: boolean;
            private: boolean;
            access: { get: () => unknown, set: (value: unknown) => void };
            addInitializer(initializer: () => void): void;
      }
) => (initialValue: unknown) => unknown | void;
```

注意，装饰器的第一个参数value的类型是undefined，这意味着这个参数实际上没用的，装饰器不能从value获取所装饰属性的值。另外，第二个参数context对象的kind属性的值为字符串field，而不是“property”或“attribute”，这一点是需要注意的。

属性装饰器要么不返回值，要么返回一个函数，该函数会自动执行，用来对所装饰属性进行初始化。该函数的参数是所装饰属性的初始值，该函数的返回值是该属性的最终值。

属性装饰器的返回值函数，可以用来更改属性的初始值。

### `getter` 装饰器 & `setter` 装饰器

getter 装饰器和 setter 装饰器，是分别针对类的取值器（getter）和存值器（setter）的装饰器。

```ts
type ClassGetterDecorator = (
    value: Function,
    context: {
        kind: 'getter';
        name: string | symbol;
        static: boolean;
        private: boolean;
        access: { get: () => unknown };
        addInitializer(initializer: () => void): void;
    }
) => Function | void;

type ClassSetterDecorator = (
    value: Function,
    context: {
        kind: 'setter';
        name: string | symbol;
        static: boolean;
        private: boolean;
        access: { set: (value: unknown) => void };
        addInitializer(initializer: () => void): void;
    }
) => Function | void;
```

注意，getter 装饰器的上下文对象context的access属性，只包含get()方法；setter 装饰器的access属性，只包含set()方法。

这两个装饰器要么不返回值，要么返回一个函数，取代原来的取值器或存值器。

### 装饰器的执行顺序

装饰器的执行分为两个阶段:

1. 评估（evaluation）：计算@符号后面的表达式的值，得到的应该是函数。

2. 应用（application）：将评估装饰器后得到的函数，应用于所装饰对象。

也就是说，装饰器的执行顺序是，先评估所有装饰器表达式的值，再将其应用于当前类。

应用装饰器时，顺序依次为方法装饰器和属性装饰器，然后是类装饰器。

## declare 关键字

declare 关键字用来告诉编译器，某个类型是存在的，可以在当前文件中使用。

它的主要作用，就是让当前文件可以使用其他文件声明的类型。

> 举例来说，自己的脚本使用外部库定义的函数，编译器会因为不知道外部函数的类型定义而报错，这时就可以在自己的脚本里面使用declare关键字，告诉编译器外部函数的类型。  
> 这样的话，编译单个脚本就不会因为使用了外部类型而报错。

declare 关键字可以描述以下类型: 

- 变量（const、let、var 命令声明）
- type 或者 interface 命令声明的类型
- class
- enum
- 函数（function）
- 模块（module）
- 命名空间（namespace）

declare 关键字的重要特点是，它只是通知编译器某个类型是存在的，不用给出具体实现。比如，只描述函数的类型，不给出函数的实现，如果不使用declare，这是做不到的。

declare 只能用来描述已经存在的变量和数据结构，不能用来声明新的变量和数据结构。另外，所有 declare 语句都不会出现在编译后的文件里面。

### declare variable 

declare 关键字可以给出外部变量的类型描述。

```ts
x = 123; // 报错
// 上面示例中，变量x是其他脚本定义的，当前脚本不知道它的类型，编译器就会报错。

// 这时使用 declare 命令给出它的类型，就不会报错了。
declare let x:number; // 如果不指定类型的话, 默认就是any
x = 1;

// 下面的例子是脚本使用浏览器全局对象document。
declare var document;
document.title = 'Hello';
// 上面示例中，declare 告诉编译器，变量document的类型是外部定义的（具体定义在 TypeScript 内置文件lib.d.ts）。
// 如果 TypeScript 没有找到document的外部定义，这里就会假定它的类型是any。

// 注意，declare 关键字只用来给出类型描述，是纯的类型代码，不允许设置变量的初始值，即不能涉及值。
declare let y:number = 1; // 报错
```

### declare function

declare 关键字可以给出外部函数的类型描述。

```ts
// 下面示例中，declare 命令给出了sayHello()的类型描述，表示这个函数是由外部文件定义的，因此这里可以直接使用该函数。
declare function sayHello( name:string ):void;
sayHello('张三');

// 注意，这种单独的函数类型声明语句，只能用于declare命令后面。
// 一方面，TypeScript 不支持单独的函数类型声明语句；另一方面，declare 关键字后面也不能带有函数的具体实现。
function sayHello2( name:string ):void; // 报错

let foo = 'bar';
function sayHello2(name:string) {
    return '你好，' + name;
}
```

### declare class 

```ts
// declare 用于 class 上的示例
declare class Animal {
  constructor(name:string);
  eat():void;
  sleep():void;
}
// 稍微复杂点的
declare class C {
    // 静态成员
    public static s0():string;
    private static s1:string;

    // 属性
    public a:number;
    private b:number;

    // 构造函数
    constructor(arg:number);

    // 方法
    m(x:number, y:number):number;

    // 存取器
    get c():number;
    set c(value:number);

    // 索引签名
    [index:string]:any;
}
```

### declare module & declare namespace

如果想把变量、函数、类组织在一起，可以将 declare 与 module 或 namespace 一起使用。

```ts
declare namespace AnimalLib {
  class Animal {
    constructor(name:string);
    eat():void;
    sleep():void;
  }

  type Animals = 'Fish' | 'Dog';
}

// 或者
declare module AnimalLib {
  class Animal {
    constructor(name:string);
    eat(): void;
    sleep(): void;
  }

  type Animals = 'Fish' | 'Dog';
}
```

## TS 泛型

> 参考链接:  
> [你不知道的 TypeScript 泛型](https://segmentfault.com/a/1190000022993503)  

泛型的主要使用场合: 函数、接口、类、别名(type)

```typescript
// 方法
function func1<T>(arg:T):T {
  return arg;
}
// 方法, 但是是以变量形式定义的. 有两种写法
let myId:<T>(arg:T) = T = func1;
let myId:{ <T>(arg:T): T } = func1;



// 接口
interface Box<Type> {
  contents: Type;
}
let box:Box<string>;
// 这也是接口的一种 
interface Comparator<T> {
  compareTo(value:T): number;
}
class Rectangle implements Comparator<Rectangle> {
  compareTo(value:Rectangle): number { ... }
}
// 还有这种也是接口的
interface Fn {
  <Type>(arg:Type): Type;
}
function id<Type>(arg:Type): Type {
  return arg;
}
let myId:Fn = id;
// 上面示例中，Fn的类型参数Type的具体类型，需要函数id在使用时提供。所以，最后一行的赋值语句不需要给出Type的具体类型。
// 这种写法还有一个差异之处。
// 那就是它的类型参数定义在某个方法之中，其他属性和方法不能使用该类型参数。
// 前面的第一种写法，类型参数定义在整个接口，接口内部的所有属性和方法都可以使用该类型参数。


// 类
class Pair<K, V> {
  key: K;
  value: V;
}

class A<T> {
  value: T;
}
class B extends A<any> {
}

// 别名
type Nullable<T> = T | undefined | null;

type Tree<T> = {
  value: T;
  left: Tree<T> | null;
  right: Tree<T> | null;
};
```

### 类型参数的默认值

类型参数可以设置默认值。使用时，如果没有给出类型参数的值，就会使用默认值。

```typescript
function getFirst<T = string>(
    arr:T[]
):T {
    return arr[0];
}
```



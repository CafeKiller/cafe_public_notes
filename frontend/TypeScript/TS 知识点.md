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


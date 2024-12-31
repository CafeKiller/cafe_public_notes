---
category: 笔记
tag:
  - Golang
---
<!-- 笔记 -->

# Rust基础学习

## Windows 安装 

前往 [Rust 官方安装网站](https://www.rust-lang.org/zh-CN/tools/install) 下载安装包，然后直接安装即可。

```shell
# 更新 rust
rustup update           

# 卸载 rust
rustup self uninstall   

# 查看本地文档
rustup doc              

# 查看 rust 当前版本
rustc -V                
rustc --version

# 编译文件
rustc [filename]    
```

### VSCode 安装 rust-analyzer

[参考教程](https://blog.csdn.net/xiaojin21cen/article/details/129767672)

在 VSCode 中的插件市场直接搜索 `rust-analyzer` 进行安装。（如果安装好后，你的插件没有正常启动请进行以下操作）

> rust-analyzer 是一款 Rust 代码补全、检查、增强插件，常用于提升 Rust 程序开发效率。

在使用官方下载的 `rustup-init.exe` 安装 Rust 时，请选择自定义安装 `2) Customize installation`

并输入 `x86_64-pc-windows-gnu` 使用 64位的 gun 版本，其余配置全默认即可，随后等待下载。

> 即使你已通过 `rustup-init.exe` 安装过 Rust 也没事，Rust 允许同时存在不同的版本。

安装好后，请本机前往 `x86_64-pc-windows-gnu` 的 bin 目录下复制路径；

> 如果你的 bin 目录下没有 `rust-analyzer.exe` 需要自行安装一下，在当前 bin 目录的命令行窗口内使用下面的命令进行安装  
> `rustup component add rust-analyzer-preview`

返回 VSCode 进入 settings.json 配置文件中，添加 `"rust-analyzer.server.path": "C:/User/XXXXX/.rustup/toolchains/stable-x86_64-pc-windows-gnu/bin/rust-analyzer"`

此时就可以正常启动 `rust-analyzer` 了

## Cargo 基础命令

创建一个后缀为 .rs 的文件

```shell
# 创建cargo项目
cargo new [projectName]     
    
# 构建cargo项目, 第一次运行时会生成 cargo.lock 文件;
# cargo.lock 文件负责追踪项目依赖的精确版本    
cargo build                 

# 构建并运行cargo项目
cargo run                   

# 检查代码, 该命令的运行速度比 build 快.
cargo check                 

# 同样是构建项目, 但主要用在即将发布最终版时的程序上; 
# 编译时会对代码进行优化, 但编译时间会较长；
cargo build --release
                            
```
[Rust carte的管理网站](https://crates.io/)

.toml 是cargo配置的文件格式

```toml
# [package] 区域标题, 保存着项目的一些基本信息
[package]
name = "L2_Hello_Cargo"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

# [dependencies] 区域标题, 这里会列出项目的依赖项
[dependencies]
rand = "0.7.0" ## 完整写法应该是: ^0.3.14, 表示只要兼容0.3.14相关API都允许
```

## 通用编程概念

Rust 吸收了很多前辈的经验与知识，这些概念放在其他语言中也很实用。但是这里只讨论他们在 Rust 的环境下的表现，他们的表现可能和我们在其他语言那见到的完全不同。

在 Rust 中也存在着一系列的 `关键字`

### 变量与可变性

在 Rust 中“变量”默然是 `不可变的`，这样是为了安全性考虑。但是我们还是将其转换为 `可变的`。

> 如果你尝试在 Rust 强行修改 `不可变` 的变量，编译器会直接报错。  

```rust
let x = 5;
x = 6;
// cannot assign twice to immutable variable `x`
```

`不可变` 这一特性虽然保证了程序的运行安全，但有时 `可变` 对于一个程序来说也是非常必要的。

使用 `mut` 关键字可以让变量转换为 `可变的`。

```rust
let mut x = 5;
x = 6; 
// OK
```

### 常量（constant）

虽然 Rust 中的变量默然就是 `不可变的`，但这并不意味着 Rust 没有类似其他语言的 `常量` 概念。

Rust 中的常量使用 `const` 关键字声明，同时不允许使用 `mut`，并且常量在 **声明时必须注明值的数据类型**。

和其他语言一样，常量不仅默然不可变，且自始至终都不可变。

命名规范：Rust里常量使用全大写字母，每个单词之间用下划线分开，例如：`MAX_POINTS`


```rust
const MAX_POINTS: u32 = 100_860;
```

在声明的作用域内，常量在程序运行的整个过程中都是有效的。

### Shadowing

Shadowing 可以翻译为：「隐藏」或「遮蔽」 

> 在其他语言中，在同一作用域内声明同名变量通常是不被允许的，而这在 Rust 中却是允许的。

Rust 允许使用相同的名字声明新的变量，新的变量就会 `shadow` 之前声明的同名变量；

在后续的代码中这个变量名代表的就是新的变量。

```rust
let x = 5;
let x = x + 1;  // 此时第一个变量就被 shadowing 了

{
    let x = x * 2;
    println!("在代码块中的 x 变量是：{}", x); // 10
}
println!("在代码块中的 x 变量是：{}", x); // 6

// 第三个 let 会 shadow 之前的 let，但只要离开了其作用范围 shadow 就会失效，恢复为原先的值。
```

需要注意的是 `shadow` 重新声明变量，和把变量标记为 `mut` 是不一样的；

**如果不使用 `let` 关键字，那么重新给 `非mut` 的变量赋值会导致编译时错误；**

而使用 `let` 声明的同名新变量，虽然新变量也是 `不可变的`，但这样不会出现编译时错误；

我们甚至可以利用 `let` 声明的同名新变量，对变量的数据类型进行转换，转换后变量依旧是不可变的。

```rust
let spaces = "     ";
let spaces = spaces.len();
// 如果在其他语言里可能就得声明两个变量： 
/*
String spaces_str = "     "; 
Int spaces_len = spaces_str.len();
*/


let mut spaces = "     ";
spaces = spaces.len(); 
// 这样会导致一个编译时错误：
// error: could not compile `variables` due to previous error 
```

### 数据类型

需要注意的时 Rust 是一种静态类型的编程语言，这就意味着它必须在编译期确定所有变量的数据类型；

通常编译可以根据 值 或者 值的使用方式 来推导出变量的使用类型（即隐式标注数据类型）；

而在值的类型可能存在多种情况的环境下，就必须显式标注数据类型了；否则会出现编译时错误。

```rust
let guess: u32 = "42".parse().expect("这不是数字"); 
// 此处语法会将 字符串42 转换为 整数42，此时如果不标注数据类型，会出现编译错误: 
// error: could not compile `no_type_annotations` due to previous error
```

在 Rust 中，数据类型可分为两种: `标量` 和 `复合`;

#### 标量类型

这基本和其他语言中的「基本数据类型」差不多，就不过多着墨介绍了。

- 整数类型: 
  - 有符号：i8、i16、i32、i64、i128、isize
  - 无符号：u8、u16、u32、u64、u128、usize

> `isize` 和 `usize` 类型的取值范围是受操作系统影响的；  
> 
> `整数溢出` 是指当使用的整数值超过了标注类型的取值范围，就会发生 整数溢出；  
> 此时如果在 `debug模式` 下就会出现一个 *`panic`*；  
> 若处于 `release模式` 下，Rust 则会自动进行 `二进制补码包裹` 操作；简而言之，大于该类型最大值的数值会被“包裹”成该类型能够支持的对应数字的最小值。如：u8 变量取值 256 就会被自动转换为 0；

- 浮点类型: f32 f64

- 布尔类型: bool (true false)

- 字符类型: char 

> Rust 和其它比较严格的静态类型语言类似，char 使用 `''` 来表示字符，而 `""` 表示字符串。

#### 复合类型

**元组**

元组是将多中类型的多个值组合成的一个复合类型。

元组的长度是固定的，声明后将无法增减。

```rust
// 元组 初始化
let tup: (i32, f64, char) = (233, 6.66, '牛');

// 元组 取值(解构)
let {v1, v2, v3} = tup;
println!("v2 等于：{}", v2);

// 元组 取值(索引)
let v2 = tup.1;
```

和其他语言一样，元组的索引也是从 0 开始的。

不过，需要注意的是，没有任何值的元组 `()` 是一种特殊的类型，该类型被称为 `单元类型`，这种值也被称为 `单元值`。

如果表达式不返回任何其他值，就隐式的返回 `单元值`。

**数组类型**

数组和元组的用法差不多，同样是固定长度，但是存储的数据类型只能有一个。

> 在 Rust 中还存在着另一种“数组”，`vector` 中文翻译为“向量”，在 Rust 中则表示一种可动态扩展长度的动态数组。
> 在你不知道该用 数组 还是 Vector 时，那就用 Vector 吧。

```rust
let arr = [1, 2, 3, 4, 5];
let arr: [i32; 5] = [1, 2, 3, 4, 5];

// 还有一种则是初始完全相同的值时
let arr: [1; 4]; // [1, 1, 1, 1]

// 访问数组 下标
println("arr 的第三个元素是：{}", arr[2]);
```

> 在 Rust 中如果你访问数组时，出现了下标越界的问题，那么 Rust 会直接在编译时触发一个 *panic*

## 函数

和其他语言类似，Rust 的入口函数也是 `main` 函数。

Rust 代码中的函数和变量名使用 `snake` 风格。也即蛇形命名法：**所有字母都是小写并使用下划线分隔单词**。

Rust 不关心函数定义于何处，只要定义了就行。

```rust
// fn 关键字 定义函数
fn get_user_age() -> i32 {
    // pass
}
```

### 语句和表达式

函数是由一系列语句构成的，也可以选择使用表达式作为结尾。

Rust 是一门基于表达式的语言，所以需要区分一下「表达式」和「语句」的区别。

- 表达式： 计算并产生一个值；
- 语句： 执行一些操作但不返回值；

在 Rust 中可以直接将一个表达式放在函数的末尾，这样表达式产生的值就是函数的返回值（不用单独写 return）

不过需要注意的是用表示返回函数的值需要省略 `;` ；否则会直接出现错误。

```rust
fn add(x:i32, y:i32) -> i32 {
    x++;
    y++;
    // return x + y;
    x + y // 最后一个表示式就是返回值
}
add(1, 2); // 5
```

## 注释

```rust
// 单行注释

/*
    多行注释
*/
```

## 控制流

### if 分支判断

需要注意的是，Rust 中 if 的判断条件必须是 bool 类型的值，否则会出现错误。（这点和 JS 这种弱类型语言是不一样的）

和很多新兴编程语言一样，Rust 也是没有传统的 `?:` 三目运算符，但是允许使用 `let...if...else...` 的方式实现三目运算符的效果。

> 需要注意的是 Rust 使用三目运算符时，返回结果的类型必须是一致的，否则报错

```rust
// 基础使用方法
let number = 5;
if number > 5 {
    println!("number 大于 5");
} else {
    println!("number 小于等于 5");
}

// 必须是 bool 值（可以直接使用表达式，但表达式的结果也得是 bool 值）
if number {
    println!("这里是不会执行的，会直接报错哦~");
}

// Rust 的 三目运算
let number = if number > 5 {
    1000
} else {
    // "-1000" // 是错误的，这里是字符型，而上一个分支则是 i32 类型的。
    -1000
}
```

### 循环

Rust 中提供了三种循环方式：`loop` `while` `for`

使用 __loop__ 重复执行

loop 关键字告诉 Rust 一遍又一遍的执行代码，只要在你明确要求停止时才会停止。

```rust
fn main() {
    loop {
        println!("Loop");
    }
}
```
可以使用 `break` 停止 loop 循环。
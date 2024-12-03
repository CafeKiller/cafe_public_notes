# Rust 简易笔记

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

Rust 中分为：标量和复合类型

Rust是静态编译语言，在编译时必须知道所有变量的类型—基于使用的值，编译器通常能够推断出它的具体类型。

但如果可能的类型比较多（例如把String转为整数的 parse方法），就必须添加类型的标注，否则编译会报错。

## 函数

Rust 代码中的函数和变量名使用snake风格。在snake，所有字母都是小写并使用下划线分隔单词。

Rust 不关心函数定义于何处，只要定义了就行。

在定义函数时, 参数类型必须指定，在函数定义中提供类型注解，意味着编译器不需要你在代码的其他地方注明类型来指出你的意图。

__包含语句和表达式的函数体__：函数体由一系列的语句和一个可选的结尾表达式构成。

Rust 是一门基于表达式（expression-based）的语言。

语句（Statements）是执行一些操作但不返回值的指令。

表达式（Expressions）计算并产生一个值。

```rust
fn plus_one(x: i32) -> i32 {
    x + 1
}

let y = 6;  // 是一个语句。
5 + 6       // 是一个表达式, 产生的值是 11
```
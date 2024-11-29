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

### 猜数字小游戏

## 基础数据类型

### 常量（constant）

常量在绑定值以后也是不可变的，但是它与不可变的变量有很多区别：

不可以使用mut，常量永远都是不可变的；声明常量使用const关键字，它的类型必须被标注—常量可以在任何作用域内进行声明，包括全局作用域；常量只可以绑定到常量表达式，无法绑定到函数的调用结果或只能在运行时才能计算出的值。

在程序运行期间，常量在其声明的作用域内一直有效；

命名规范：Rust里常量使用全大写字母，每个单词之间用下划线分开，例如：`MAX_POINTS`

### Shadowing（隐藏）

Rust 允许使用相同的名字声明新的变量，新的变量就会 shadow（隐藏）之前声明的同名变量；

在后续的代码中这个变量名代表的就是新的变量。

shadow和把变量标记为mut是不一样的

如果不使用let关键字，那么重新给非mut的变量赋值会导致编译时错误；而使用let声明的同名新变量，也是不可变的；

使用let声明的同名新变量，它的类型可以与之前不同。


```rust
// 常量
const MAX_POINTS: u32 = 100_000; 

// shadowing
let mut num1 = 5;
println!("num1 = {}", num1);
num1 = 6;
println!("num1 = {}", num1);

let spaces = "     ";
let spaces = spaces.len();
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
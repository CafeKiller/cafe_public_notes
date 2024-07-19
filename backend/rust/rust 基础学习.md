# 安装 Rust

## Windows 安装

前往 [Rust 官方安装网站](https://www.rust-lang.org/zh-CN/tools/install) 下载安装包，然后直接安装即可。

```shell
rustup update           # 更新rust

rustup self uninstall   # 卸载rust

rustup doc              # 查看本地文档

rustc -V                # 查看rust版本
rustc --version         # 查看rust版本

rustc [filename]    # 编译文件
```

## Hello World

创建一个后缀为 .rs 的文件

```shell
# cargo 基础命令

cargo new [projectName]     # 创建cargo项目
    
cargo build                 # 构建cargo项目, 第一次运行时会生成cargo.lock文件;
                            # cargo.lock文件负责追踪项目依赖的精确版本

cargo run                   # 构建并运行cargo项目

cargo check                 # 检查代码, 该命令的运行速度比build快.

cargo build --release       # 同样是构建项目, 但主要用在即将发布时的程序上; 
                            # 编译时会进行优化, 但编译时间会较长.
```

[Rust carte的管理网站](https://crates.io/)

```toml
# .toml 是cargo配置的文件格式

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

```rust
// use 关键字表示引用;
use std::io; // std::io     io库默认是在标准库中的, std就是标准库.
use rand::Rng; // rand::Rng   是一个trait(有点类似于其他语言的接口), 内置了很多方法.
use std::cmp::Ordering; // std::cmp::Ordering 是个枚举类型, 该枚举有三个值, Less小于 Greater大于 Equal等于

fn main() {

    println!("猜数游戏开始!");

    // let 是变量定义关键字; 默然情况下所有的变量都是不可变的
    let secret_number = rand::thread_rng().gen_range(1, 101); // rand::thread_rng() 会返回一个ThreadRag, 这是一个随机数生成器(该随机数生成器是在本地线程空间的)
    // gen_range(1, 101)   获取一个随机数, 范围包括1, 不包括101

    loop {
        println!("猜一个数!");
    
        // mut 关键字, 指定变量是可变值的;
        let mut guess = String::new();  // String::new()   返回一个字符串实例, 标准库提供, 内部使用UTF-8
        // :: 表示调用的是关联函数, 关联函数不是通过具体的实例调用的 (有点类似于Java和C#中的静态方法)
        
        // & 取地址符号,和C语言是类似的,表示一个引用;
        // 引用在rust中默认也是不可修改, 所以需要 &mut 
        io::stdin().read_line(&mut guess).expect("无法读取行"); // expect() 会返回一个 io::Result , Result本质就是一个枚举, 其有两个值: Ok, Err
        // 返回Ok表示成功, 同时会返回值; 如果返回的是Err就表示失败了, 在Err会附带错误信息.
        

        // 在rust里是允许对变量进行再声明的, 其通过隐藏(shadow)原变量的方式实现;一般用于实现变量的类型转换.
        let guess: u32 = match guess.trim().parse() { // trim() 方法, 清除字符串空白; parse() 将字符串转换为 数值(int)
            Ok(number) => number,
            Err(_) => continue
        };

        println!("你猜测的数是: {}", guess);
        
        
        // match 类似于一个匹配机, 会更具表达式中的值, 匹配一个arm(手臂) 
        match guess.cmp(&secret_number) { // match 类似于一个匹配机, 会更具表达式中的值, 匹配一个arm(手臂) 
            Ordering::Less => println!("To small"),
            Ordering::Greater => println!("To big"),
            Ordering::Equal => {
                println!("You WIN!!!!");
                break;
            },
        }
    }
}
```

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

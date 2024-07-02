# 安装 Rust

## Windows 安装

前往 [Rust 官方安装网站](https://www.rust-lang.org/zh-CN/tools/install) 下载安装包，然后直接安装即可。

```shell
rustc --version # 检查是否安装成功

rustup update # 更新 rust 工具
```

### Hello World

创建一个后缀为 .rs 的文件

```rs
fn main() {
    println!("hello world");
}
```
use std::io; // std::io     io库默认是在标准库中的, std就是标准库.
use rand::Rng; // rand::Rng   是一个trait(有点类似于其他语言的接口), 内置了很多方法.
use std::cmp::Ordering; // std::cmp::Ordering 是个枚举类型, 该枚举有三个值, Less小于 Greater大于 Equal等于

// use 关键字表示引用外部依赖;


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
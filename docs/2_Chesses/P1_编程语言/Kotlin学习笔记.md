---
category: 学习笔记
tags:
  - Kotlin
original: 非原创，整理整合
original_link:
  - https://book.kotlincn.net/text/getting-started.html
  - https://www.itbaima.cn/document/urw2e6gg1lprv65w
---
<!-- 自用 -->

# 基础

## 变量与基础数据类型

变量的声明：`var [变量名称] : [数据类型]`

kotlin 和 javascript 等脚本语言类似在编写时可以进行类型推断，所以可以不用声明类型。

常量的声明：`val [常量名称] : [数据类型]`

在 kotlin 中可以使用科学计数的方式描写过长的整数类型：`val a = 1_000_000_000`

也可以用十六进制和二进制的：`val a = 0xAF // 0b1001`

除了整数类型外，Kotlin还为无符号整数提供以下类型：

- `UByte` ：一个无符号8位整数，范围从0到255
- `UShort` ：无符号16位整数，范围从0到65535
- `UInt` ：一个无符号32位整数，范围从0到2^32 - 1
- `ULong` ：一个无符号64位整数，范围从0到2^64 - 1

Kotlin提供了一组整数的位运算操作，可以直接在二进制层面上与数字表示的位进行操作，不过只适用于Int和Long类型的数据：

- `shl(bits)` – 有符号左移
- `shr(bits)` – 有符号右移
- `ushr(bits)` – 无符号右移
- `and(bits)` – 按位与
- `or(bits)` – 按位或
- `xor(bits)` – 按位异或
- `inv()` – 取反

__多行字符串__: kotlin中内置了一个挺好用的多行字符，形式上有点类似于 Python 的。

```kotlin
fun main() {
    val text = """
    这是第一行
    这第二行
    别\n了，没用
    真牛逼啊，这功能隔壁Java15才有
    """
    println(text)
}
```

__拼接字符串__: kotlin 中的字符串不能直接拼接其他类型(是需要注意顺序，其他类型与字符串拼接时必须在字符串的后面)，但是可以使用模版字符串进行拼接

```kotlin
fun main() {
    val a = 10
    val text1 = a + "这是拼接的值" // 这样是不允许的
    val text2 = "这是拼接的值" + a // 但这样是可以的
    val text3 = "$a 这是拼接的值" // 这里的$为模版表达式，可以直接将后面跟着的变量或表达式以字符串形式替换到这个位置
}
```

### 变量的高级操作

在kotlin中一个变量的完整声明其实这样的：

```kotlin
var <propertyName>[: <PropertyType>] [= <property_initializer>]
    [<getter>]
    [<setter>]
```

对于这种顶层定义的变量（包括后面类中会用到的成员属性变量）可以具这两个可选的函数，它们本质上是一个get和set函数: 

- `getter` ：用于获取这个变量的值，默认情况下直接返回当前这个变量的值
- `setter` ：用于修改这个变量的值，默认情况下直接对这个变量的值进行修改

也就是说我们可以这样子进行操作

```
var str: String = "尊嘟假嘟"
    get() = field + field
    set(value) {    //这里的value就是给过来的值
        println("设置变量的值")
        field = value   //注意，对于val类型的变量，没有set函数，因为不可变
    }
```

> 这种写法其实有点类似于 javascript 中的代理模式；不过一般情况都不会去重写 getter 和 setter 的。

## 流程控制

`if-else` 完整语法展示：

```kotlin
fun main() {
    val score = 2
    if (score >= 90) //90分以上才是优秀
        println("优秀") 
    else if (score >= 70) //当上一级if判断失败时，会继续判断这一级
        println("良好") 
    else if (score >= 60) 
        println("及格") 
    else  //当之前所有的if都判断失败时，才会进入到最后的else语句中
        println("不及格")
}
```

和 rust、golang、python 等现代语言类似，kotlin 中也没有三目运算符，kotlin 是使用 if-else 语句代替的。

> 注意，如果需要这种返回结果的表达式，那么必须要存在else分支，否则不满足条件岂不是没结果

```kotlin
fun main() {
    val score = 2
  	// 是的，kotlin 中的 if-else 是可以返回值。
    val res = if (score > 60) "Yes" else "No"

    // 多行if中，代码块默认最后一行作为返回结果
    val re2 = if (score > 60) {
        println("不错啊期末没挂科")
        "Yes"   
    } else {
        println("不会有人Java期末还要挂科吧")
        "No"
    }
}
```

__选择结构（when）__: 现代的高级编程语言都有一个 match 语句（也就是匹配器模式），kotlin 中也是有的，不过不叫 match 而是 when。这种语法的特点就是很像Java、C 中 Switch语句。

语法形式：

```kotlin
when (目标) {
    匹配值1 -> 代码...   //我们需要传入一个目标，比如变量，或是计算表达式等
    匹配值2 -> 代码...   //如果目标的值等于我们这里给定的匹配值，那么就执行case后面的代码
    else -> {
        代码...    //如果以上条件都不满足，就进入else中（可以没有），类似于之前的if-elseif-else
    }
}

fun main() {
    val c = 'A'
    when (c) {
        'A' -> println("去尖子班！准备冲刺985大学！")
        'B' -> println("去平行班！准备冲刺一本！")
        'C' -> println("去职高深造。")
    }
}
````

需要注意的是，when 作用于表达式时，else 分支是必须存在的（防止空值，保证代码运行的安全性），除非编译器能够推断出所有的可能情况都包含分支条件。

```kotlin
// 这种情况下就必须存在 else 分支
fun main() {
    val a = 'A'
    val res = when(a) { 
        'B' -> 0
        'A' -> 1
        else -> -1
    }
}

// 这种情况下就可以不用 else 分支，因为 boolean 类型只有两种值，同理枚举也是允许不存在 else。
fun main() {
    val a = true
    val res = when(a) { 
        false -> 0
        true -> 1
    }
}
```

总之 when 是一个很强大的分支控制语句，灵活好用，也更加现代。补充示例：

```kotlin
// 多个不同值共享同一分支
when(value) {
    0, -1 -> print("value 不能为0或者-1")
    else -> print("value 校验合法")
}

// 使用in判断目标变量值是否在指定范围内
fun main() {
    val score = 60
    val grade = when(score) {
        in 100..90 -> '优秀'
        in 89..80 -> "良好"
        in 79..70 -> "及格"
        in 69..60 -> "牛逼"
        in 59..0 -> "不合格"
        else -> "不合法成绩"
    }
}
```

__for循环__: koltin 中没有类似于C那种非常传统的三目式的for循环，kotlin采用的是更现代的 for..in 循环。

语法：``` for (遍历出来的单个目标变量 in 可遍历目标) 循环体 ```

> 可遍历目标主要是指：数组、区间、任何实现类运算符重载函数 iterator 的类。

示例：
```kotlin
fun main() {
    for (i in 1..3)
        println("大烟杆嘴里塞，我只抽第五代：$i")
}

// step 用于控制步长
fun main() {
    for (i in 1..10 step 2) {
        println(i)
    }
}

// downTo 1 倒序循环至1
fun main() {
    for (i in 10 downTo 1) {
        println(i)
    }
}
```

> `continue` 和 `break` 和其他语言完全一致，前者跳过当次循环，后者跳出整个循环；  
> `while` 和 `do...while` 这里就都不介绍了，和其他语言也都是完全一致的。

## 函数

函数是 kotlin 中的一等公民，kotlin 中对函数的使用非常接近于 javascript（事实上kotlin的函数也确实有不少是借鉴了 javascript 的）。

kotlin 中函数的定义：

```koltin
// 函数的标准结构（伪代码）
fun 函数名称([函数参数...]): 返回值类型 {
    // 函数体
}

// 如果函数不带返回值类型，那么函数的默认返回值就是：Unit ,这点类似于 Java 的 void
fun hello(): Unit {  
    println("PHP是世界上最好的语言.kt")
}

fun say(message: String){
    println("我说：$message")
}
```

> kotlin 的数据类型声明采用的是更现代的后置声明，据说是这样的效率更高（程序员很多情况下其实是可以根据变量名推测出数据的大致类型的，所以类型声明后置可以让代码阅读起来更加舒服）

与 javascript 类似，kotlin 的函数也允许函数内部再声明函数；那么同样的 kotlin 中的函数也可以像参数一样进行传递：

```kotlin
// 这里提供的函数接受一个Int参数返回string，那么我们可以像普通函数一样传入参数调用它
fun test(other: (Int) -> String){
    println(other(1))  
}

// 套娃
var func: (Int) -> ((String) -> Double)

// 可以使用 typealias 类型别名来美化这种套娃现象
typealias HelloWorld = (String) -> Double
fun main() {
    var func: HelloWorld
}

// 使用 :: 引用现成的函数
val func:: (Stting) -> Int = ::test
fun test(str: String): Int {
    return 666
}

// 匿名函数
val func: (String) -> Int = fun(str: String): Int {
    println("我是匿名函数")
    return 777
}

// Lambda 表达式
var func: (String) -> Int = {
    println("传入的参数是 $it") // 当你传入的参数只有一个时，可以it替代
    666 // 最后一行表达式为返回结果
}

// 高阶函数的最直接的方式如下：
fun main() {
    val func: (Int) -> String = { "收到的参数为$it" }
    test(func)
}
fun test(func: (Int) -> String) {
    println(func(66))
}

// 也可以直接把一个Lambda作为参数传入作为实际参数使用
fun main() {
    test({ "收到的参数为$it" })
}

// 若函数的最后一个形式参数是一个函数类型，可以直接写在括号后
test() { "收到的参数为$it" }

// 由于小括号里面此时没有其他参数了，还能继续省，直接把小括号也给干掉
test { "收到的参数为$it" }   //干脆连小括号都省了，这语法真的绝
```

### 内联函数

使用高阶函数会可能会影响运行时的性能：每个函数都是一个对象，而且函数内可以访问一些局部变量，但是这可能会在内存分配（用于函数对象和类）和虚拟调用时造成额外开销。

为了优化性能，开销可以通过内联 Lambda 表达式来消除。使用 `inline` 关键字会影响函数本身和传递给它的lambdas，它能够让方法的调用在编译时，直接替换为方法的执行代码。

```kotlin
fun main() {
    test()
}

//添加inline表示内联函数
inline fun test(){
    println("这是一个内联函数")
    println("这是一个内联函数")
    println("这是一个内联函数")
}
```

## 面向对象

kotlin 和 Java 有一点很不相同，kotlin 是一个完全面向对象的语言，包括了它的 Int、Byte、Boolean、Char...其实都是被封装成对象的，而 Java 则还保留的部分的基础数据类型（也就是从 C/C++ 身上继承下来的）

# 类的定义和对象的创键

```kotlin
// 定义一个类
class Student constructor(name: String, age: Int) {
    // pass
}

class Student(name: String, age: Int)

class Student(var name: String, val age: Int)

class Student(var name: String, val age: Int = 18)

class Student {
    var name: String = ""   //必须配一个默认值
    var age: Int = 0
}

class Student(name: String, age: Int) {
    var name: String = name   //通过构造函数传递过来
    var age: Int = age
}

// 懒加载的属性可以不用在一开始赋值，但是在下一次使用之前一定要先完成赋值，否则报错
class Student {
    lateinit var name: String   
    var age: Int = 0
}

class Shape(var width: Int, var height: Int) {
    val area get() = width * height
}
```

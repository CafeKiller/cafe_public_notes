---
category: 学习笔记
tags:
  - Golang
---

# Golang

> [!help] 参考资料
> 
> [教程 - Go语言之旅](https://tour.go-zh.org/welcome/1)

## Hello

```go
package main

import "fmt"

func main() {
	  fmt.Println("Hello, 世界")
}
```

##  包

每个 Go 程序都由包构成。程序从 main 包开始运行。

本程序通过导入路径 "fmt" 和 "math/rand" 来使用这两个包。按照约定，包名与导入路径的最后一个元素一致。

```go
package main

import (
    "fmt"
    "math/rand"
)

func main() {
	  fmt.Println("我最喜欢的数字是 ", rand.Intn(10))
}
```
> 例如，"math/rand" 包中的源码均以 `package rand` 语句开始

### 导入

此代码用圆括号将导入的包分成一组，这是“分组”形式的导入语句。

当然，你也可以写成多个导入语句，不过还是建议使用分组导入语句要更好。

```go
import "fmt"
import "math"
```

### 导出名

在 Go 中，如果一个名字以大写字母开头，那么它就是已导出的。例如，Pi 就是个已导出名，它导出自 math 包，还有 fmt 的 Println 也是个已导出名。

在导入一个包时，你只能引用其中已导出的名字。 任何「未导出」的名字在该包外均无法访问。

```go
package main

import (
    "fmt"
    "math"
)

func main() {
	  fmt.Println(math.Pi)
}
```

## 函数

```go
func add(x int, y int) int {
	  return x + y
}

// 参数类型相同可简写
func add(x, y int) int {
	  return x + y
}
```

### 多返回值

Go 允许同时返回多个值。

```go
func swap(x, y string) (string, string) {
	  return y, x
}
```

### 命名返回值

Go 的返回值可被命名，它们会被视作定义在函数顶部的变量。返回值的名称应当具有一定的意义，可以作为文档使用。

```go
func split(sum int) (x, y int) {
	  return sum * 4 / 9, sum - x
}

// 没有参数的 return 语句会直接返回已命名的返回值，也就是「裸」返回值。

func split(sum int) (x, y int) {
	  x = sum * 4 / 9
	  y = sum - x
	  return 
}
```

> 裸返回语句应当仅用在下面这样的短函数中。在长的函数中它们会影响代码的可读性。

## 变量

var 语句用于声明一系列变量。go 遵循类型后置规则，即变量的类型写在变量的后面，这样可以更方便的阅读（很多变量可以直接通过变量名推测其具体类型）

go 支持类型推断，如果提供了初始值，则类型可以省略；变量会从初始值中推断出类型。

常量使用 const 关键字声明。

```go
package main

import "fmt"

var c, python, java bool

func main() {
    var i int
    fmt.Println(i, c, python, java)
}
```
> var 语句可以出现在包或函数的层级。

### 短变量声明

在函数中，`:=` 简洁赋值语句在明确类型的地方，可以用于替代 var 定义。

```go
func main() {
    var i, j int = 1, 2
    k := 3
    c, python, java := true, false, "no!"

    fmt.Println(i, j, k, c, python, java)
}
```
> 函数外的每个语句都 **必须** 以关键字开始（var、func 等），因此 := 结构不能在函数外使用。

### 基本数据类型

```
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // uint8 的别名

rune // int32 的别名，表示一个 Unicode 码位

float32 float64

complex64 complex128 // 复数类型，多在科学计算中使用
```

### 类型转换

表达式 T(v) 将值 v 转换为类型 T。

```go
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)

// 简短的形式
i := 42
f := float64(i)
u := uint(f)
```
> Go 在不同类型的项之间赋值时需要显式转换。

## 流程控制

### for 循环

```go
func main() {
    sum := 0
    for i := 0; i < 10; i++ {
        sum += i
    }
    fmt.Println(sum)
}

// 初始化语句和后置语句是可选的。
func main() {
    sum := 1
    for ; sum < 1000; {
        sum += sum
    }
    fmt.Println(sum)
}

```
> 和 C、Java、JavaScript 之类的语言不同，Go 的 for 语句后面的三个构成部分外没有小括号， 大括号 { } 则是必须的。

### while 循环

**go 没有 while 循环**，但是可以使用 for 循环来实现

```go
func main() {
	sum := 1
	for sum < 1000 {
		sum += sum
	}
	fmt.Println(sum)
}

// 无限循环
func main() {
	for {
        // ...
	}
}
```

### if else 判断

go 的 if 语句与 for 循环类似，表达式外无需小括号 ( )，而大括号 { } 则是必须的。

```go
func sqrt(x float64) string {
	if x < 0 {
		return sqrt(-x) + "i"
	}
	return fmt.Sprint(math.Sqrt(x))
}

func main() {
	fmt.Println(sqrt(2), sqrt(-4))
}
```

go 中的 if 允许类似 for 一样，声明一个只在 if 语句内使用的变量

```go
func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v // v 只在 if 内有效
	}
	return lim
}
```

### switch 分支

go 中的 switch 同样允许类似 for 一样，声明一个只在 switch 语句内使用的变量。

go 会为每个 case 后面自动添加了所需的 break 语句。在 go 中，除非以 fallthrough 语句结束，否则分支会自动终止。 

另外 go 的另一点重要的不同在于 switch 的 case 无需为常量，且取值不限于整数。

```go
func main() {
	fmt.Print("Go 运行的系统环境：")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("macOS.")
	case "linux":
		fmt.Println("Linux.")
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.\n", os)
	}
}
```
无条件的 switch 同 switch true 一样。这种形式能将一长串 if-then-else 写得更加清晰。

```go
func main() {
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("早上好！")
	case t.Hour() < 17:
		fmt.Println("下午好！")
	default:
		fmt.Println("晚上好！")
	}
}
```

## defer 推迟

defer 语句会将函数推迟到外层函数返回之后执行。推迟调用的函数其参数会立即求值，但直到外层函数返回前该函数都不会被调用。

```go
func main() {
	fmt.Println("counting")

	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}

	fmt.Println("done")
}
```
> 推迟调用的函数调用会被压入一个栈中。 当外层函数返回时，被推迟的调用会按照后进先出的顺序调用。

## 指针

Go 拥有指针。指针保存了值的内存地址。

```go
func main() {
	var p *int          // 声明一个 int 类型的指针：p

	i := 42             // 声明一个 int 类型的变量：i
	p = &i              // 「取」出 i 的内存地址，并赋值给 p
	// 此时 p 指向 i 的内存地址，存储的是 i 的内存地址
	
	fmt.Println(*p)     // 通过 * 关键字，解出 p 指向的内存地址中的「值」，其本质上读取是 i 的值
	fmt.Println(p)      // 此处，输出 p 指向的内存地址，即 i 的内存地址，格式为 0x000XXXXX
	
	*p = 21;            // 通过 * 关键字，修改 p 指向的内存地址中的「值」，其本质上修改是 i 的值
	
	fmt.Println(i)      // 输出 21
	fmt.Println(p)      // 输出 0x000XXXXX

    var pp **int        // 声明一个 int 类型指针的指针：pp
    pp = &p             // 「取」出 p指针 的内存地址，并赋值给 pp
	
	fmt.Println(pp)     // 输出 0x000XXXYY
	fmt.Println(p)      // 输出 0x000XXXYY
}
```
> 与 C 不同，Go 没有指针运算。
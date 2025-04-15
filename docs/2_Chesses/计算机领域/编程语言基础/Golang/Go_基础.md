---
category: 学习笔记
tags:
  - Golang
---

# Go 基础

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

### 函数值

函数也是值。它们可以像其他值一样传递。函数值可以用作函数的参数或返回值。

```go
func compute(fn func(float64, float64) float64) float64 {
	return fn(3, 4)
}

func main() {
	hypot := func(x, y float64) float64 {
		return math.Sqrt(x*x + y*y)
	}
	fmt.Println(hypot(5, 12))

	fmt.Println(compute(hypot))
	fmt.Println(compute(math.Pow))
}
```
### 闭包

Go 函数可以是一个闭包。闭包是一个函数值，它引用了其函数体之外的变量。 该函数可以访问并赋予其引用的变量值，换句话说，该函数被“绑定”到了这些变量。

```go
func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func main() {
	pos, neg := adder(), adder()
	for i := 0; i < 10; i++ {
		fmt.Println(
			pos(i),
			neg(-2*i),
		)
	}
}
```


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

### range 遍历

for 循环的 range 形式可遍历切片或映射。

当使用 for 循环遍历切片时，每次迭代都会返回两个值。 第一个值为当前元素的下标，第二个值为该下标所对应元素的一份副本。

```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
	for i, v := range pow {
		fmt.Printf("2**%d = %d\n", i, v)
	}

    // 可以使用 _ 来忽略不需要的返回值
    for _, value := range pow {
		fmt.Printf("%d\n", value)
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

## 结构体

一个 结构体（struct）就是一组 字段（field）。

结构体字段可通过点号 `.` 来访问。

结构体字段可通过结构体指针来访问。

```go
type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	p := &v
	p.X = 1e9
	fmt.Println(v)
}

// 使用 Name: 语法可以仅列出部分字段（字段名的顺序无关）。
var (
	v1 = Vertex{X: 1}  // Y:0 被隐式地赋予零值
	v2 = Vertex{1, 2}  // 创建一个 Vertex 类型的结构体
	v3 = Vertex{}      // X:0 Y:0
	p  = &Vertex{1, 2} // 创建一个 *Vertex 类型的结构体（指针）
)
```
> 特殊的前缀 & 返回一个指向结构体的指针。(返回的并不是一串类地址的值)

## 数组

类型 `[n]T` 表示一个数组，它拥有 n 个类型为 T 的值。

```go
func main() {
	var a [2]string
	a[0] = "Hello"
	a[1] = "World"
	fmt.Println(a[0], a[1])
	fmt.Println(a)

	primes := [6]int{2, 3, 5, 7, 11, 13}
	fmt.Println(primes)
}
```

## 切片

每个数组的大小都是固定的。而切片则为数组元素提供了动态大小的、灵活的视角。 在实践中，切片比数组更常用。

**切片的零值是 nil**。nil 切片的长度和容量为 0 且没有底层数组。

类型 `[]T` 表示一个元素类型为 T 的切片。切片通过两个下标来界定，一个下界和一个上界，二者以冒号分隔：

```go
func main() {
	primes := [6]int{2, 3, 5, 7, 11, 13}

    // 它会选出一个半闭半开区间，包括第一个元素，但排除最后一个元素。
	var s []int = primes[1:4]
	fmt.Println(s)
}
```
切片就像数组的引用 切片并不存储任何数据，它只是描述了底层数组中的一段。

更改切片的元素会修改其底层数组中对应的元素。和它共享底层数组的切片都会观测到这些修改。

```go
func main() {
	names := [4]string{"青子","有珠","草十郎","橙子",}
	fmt.Println(names)

	a := names[0:2]
	b := names[1:3]
	fmt.Println(a, b)

	b[1] = "金鹿"
	fmt.Println(a, b)
	fmt.Println(names)
}
```


```go
// 数组字面量
[3]bool{true, true, false}

// 切片字面量，这样会创建一个和上面相同的数组，然后再构建一个引用了它的切片
[ ]bool{true, true, false}
```
> 切片字面量类似于没有长度的数组字面量。

### 默认行为

在进行切片时，你可以利用它的默认行为来忽略上下界。

切片下界的默认值为 0，上界则是该切片的长度。

```go
func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	fmt.Println(s)

	fmt.Println("===============")

	fmt.Println(s[0:6])
	fmt.Println(s[0:])
    fmt.Println(s[:6])
    fmt.Println(s[:])
}
```

### 长度与容量

切片的长度就是它所包含的元素个数。

切片的容量是从它的第一个元素开始数，到其底层数组元素末尾的个数。

切片 s 的长度和容量可通过表达式 len(s) 和 cap(s) 来获取。

```go
func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s)

	// 截取切片使其长度为 0
	s = s[:0]
	printSlice(s)

	// 扩展其长度
	s = s[:4]
	printSlice(s)

	// 舍弃前两个值
	s = s[2:]
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```

### make 创建切片

切片可以用内置函数 make 来创建，这也是你创建动态数组的方式。make 函数会分配一个元素为零值的数组并返回一个引用了它的切片

```go
func main() {
	a := make([]int, 5)
	printSlice("a", a)

	b := make([]int, 0, 5)
	printSlice("b", b)

	c := b[:2]
	printSlice("c", c)

	d := c[2:5]
	printSlice("d", d)
}

func printSlice(s string, x []int) {
	fmt.Printf("%s len=%d cap=%d %v\n",
		s, len(x), cap(x), x)
}
```

为切片追加新的元素是种常见的操作，为此 Go 提供了内置的 append 函数。

```go
func main() {
	var s []int
	printSlice(s)

	// 可在空切片上追加
	s = append(s, 0)
	printSlice(s)

	// 这个切片会按需增长
	s = append(s, 1)
	printSlice(s)

	// 可以一次性添加多个元素
	s = append(s, 2, 3, 4)
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}
```
> 当 s 的底层数组太小，不足以容纳所有给定的值时，它就会分配一个更大的数组。 返回的切片会指向这个新分配的数组。

## map 映射

map 映射将键映射到值。映射的零值为 nil 。nil 映射既没有键，也不能添加键。

make 函数会返回给定类型的映射，并将其初始化备用。


```go
type Vertex struct {
	Lat, Long float64
}

var m map[string]Vertex

func main() {
	m = make(map[string]Vertex)
	
	m["Bell Labs"] = Vertex{
		40.68433, -74.39967,
	}
	
	fmt.Println(m["Bell Labs"])
}

// 若顶层类型只是一个类型名，那么你可以在字面量的元素中省略它。
var m = map[string]Vertex{
	"Bell Labs": {40.68433, -74.39967},
	"Google":    {37.42202, -122.08408},
}
```

```go
// 映射的字面量和结构体类似，只不过必须有键名。
var m = map[string]Vertex{
	"Bell Labs": Vertex{
		40.68433, -74.39967,
	},
	"Google": Vertex{
		37.42202, -122.08408,
	},
}
```

### 操作 map

```go
// 插入or修改元素
m[key] = elem

// 获取元素
elem := m[key]

// 删除元素
delete(m, key)

// 通过双赋值检测某个键存在：
elem, ok := m[key]
```
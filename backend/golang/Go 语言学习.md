# Go 语言学习

## 基础

### 指针

在 Go 中是保留了指针的。指针保存了值的内存地址。

类型 *T 是指向 T 类型值的指针，其零值为 nil。

```go
var p *int

i := 42
p = &i

fmt.Println(*p) // 通过指针 p 读取 i
*p = 21         // 通过指针 p 设置 i
```
& 操作符会生成一个指向其操作数的指针。

* 操作符表示指针指向的底层值。

这也就是通常所说的「解引用」或「间接引用」。与 C 不同，Go 没有指针运算。

### 结构体

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

    // 如果我们有一个指向结构体的指针 p 那么可以通过 (*p).X 来访问其字段 X。 
    // 不过这么写太啰嗦了，所以语言也允许我们使用隐式解引用，直接写 p.X 就可以。
	p.X = 1e9
	fmt.Println(v)
}

var (
	v1 = Vertex{1, 2}  // 创建一个 Vertex 类型的结构体
	v2 = Vertex{X: 1}  // Y:0 被隐式地赋予零值
	v3 = Vertex{}      // X:0 Y:0
	p  = &Vertex{1, 2} // 创建一个 *Vertex 类型的结构体（指针）
)
```
使用 Name: 语法可以仅列出部分字段（字段名的顺序无关）。

特殊的前缀 & 返回一个指向结构体的指针。

### 数组

类型 [n]T 表示一个数组，它拥有 n 个类型为 T 的值。

数组的长度是其类型的一部分，因此数组不能改变大小。

```go
// 会将变量 a 声明为拥有 10 个整数的数组。
var a [10]int

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

类型 []T 表示一个元素类型为 T 的切片。

```go
// 切片通过两个下标来界定，一个下界和一个上界，二者以冒号分隔：
a[low : high]
// 它会选出一个半闭半开区间，包括第一个元素，但排除最后一个元素。

func main() {
	primes := [6]int{2, 3, 5, 7, 11, 13}

	var s []int = primes[1:4]
	fmt.Println(s)
}
```

__切片类似数组的引用__

切片就像数组的引用 切片并不存储任何数据，它只是描述了底层数组中的一段。

更改切片的元素会修改其底层数组中对应的元素。

和它共享底层数组的切片都会观测到这些修改。

```go
func main() {
	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}
	fmt.Println(names)

	a := names[0:2]
	b := names[1:3]
	fmt.Println(a, b)

	b[0] = "XXX"
	fmt.Println(a, b)
	fmt.Println(names)
}
```
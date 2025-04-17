---
category: 学习笔记
tags:
  - Golang
---

# Go 进阶

> [!help] 参考资料
> 
> [教程 - Go语言之旅](https://tour.go-zh.org/welcome/1)

## 方法

go 没有类。 方法就是一类带特殊的 接收者 参数的函数。

方法接收者在它自己的参数列表内，位于 func 关键字和方法名之间。

```go
// 定义一个结构体
type Vertex struct {
	X, Y float64
}

// 定义一个方法，接收者为 Vertex 结构体
func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

// 函数写法
func Abs(v Vertex) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
	fmt.Println(Abs(v)) // 同样可以正常运行
}
```
> 方法只是个带接收者参数的函数。

我们还可以为非结构体类型声明方法。

```go
type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}
```
> 注意：接收者的类型定义和方法声明必须在同一包内；（包括 int 之类的内置类型）

### 指针类型的接收者

你可以为指针类型的接收者声明方法。

这意味着对于某类型 T，接收者的类型可以用 *T 的文法。（此外，T 本身不能是指针，比如不能是 *int。）

**指针接收者的方法可以修改接收者指向的值**。由于方法经常需要修改它的接收者，「指针接收者」比值接收者更常用。


```go
type Vertex struct {
	X, Y float64
}

// 值接受者是不会影响到原始值的
func (v Vertex) Abs(f float64) float64 {
	fmt.Println("[3]",v.X, v.Y)
	v.X = v.X * f
	v.Y = v.Y * f
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

// 只有指针接收者才会影响到原始值
// 若使用 * 改用值接收，那么 Scale 方法会对原始 Vertex 值的副本进行操作。
func (v *Vertex) Scale(f float64) {
	fmt.Println("[1]",v.X, v.Y)
	v.X = v.X * f
	v.Y = v.Y * f
	fmt.Println("[2]",v.X, v.Y)
}

func main() {
	v := Vertex{3, 4}
	v.Scale(10)
	fmt.Println(v.Abs(2))
	fmt.Println("[4]",v.X, v.Y)
}
```

### 方法与指针重定向

带指针参数的函数必须接受一个指针，而接收者为指针的的方法被调用时，接收者既能是值又能是指针

反之亦然

```go
func (v *Vertex) Scale(f float64) { }
func ScaleFunc(v *Vertex, f float64) { }

// 必须传入指针
var v Vertex
ScaleFunc(v, 5)  // 编译错误！
ScaleFunc(&v, 5) // OK

// 既允许传入值，也允许传入指针
var v Vertex
v.Scale(5)  // OK
p := &v
p.Scale(10) // OK
```
> 对于语句 `v.Scale(5)` 来说，即便 v 是一个值而非指针，带指针接收者的方法也能被直接调用。
>
> go 会将语句 `v.Scale(5)` 解释为 `(&v).Scale(5)`。

### 优先选择指针接收者

首先，方法能够修改其接收者指向的值。

其次，这样可以避免在每次调用方法时复制该值。若值的类型为大型结构体时，这样会更加高效。

## 接口

接口类型 的定义为一组方法签名。

接口类型的变量可以持有任何实现了这些方法的值。

```go
type Abser interface {
	Abs() float64
}

func main() {
	var a Abser
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	a = f  	// a MyFloat 实现了 Abser
	a = &v 	// a *Vertex 实现了 Abser

	a = v 	// Vertex 没有实现 Abser

	fmt.Println(a.Abs())
}

type MyFloat float64

func (f MyFloat) Abs() float64 {  }

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 { }
```

### 接口与隐式实现

类型通过实现一个接口的所有方法来实现该接口。既然无需专门显式声明，也就没有“implements”关键字。

隐式接口从接口的实现中解耦了定义，这样接口的实现可以出现在任何包中，无需提前准备。

因此，也就无需在每一个实现上增加新的接口名称，这样同时也鼓励了明确的接口定义。

```go
type I interface {
	M()
}

type T struct {
	S string
}

// 此方法表示类型 T 实现了接口 I，不过我们并不需要显式声明这一点。
func (t T) M() {
	fmt.Println(t.S)
}

func main() {
	var i I = T{"hello"}
	i.M()
}
```

### 接口值

接口也是值。它们可以像其它值一样传递。

接口值可以用作函数的参数或返回值。

在内部，接口值可以看做包含值和具体类型的元组：`(value, type)`

接口值保存了一个具体底层类型的具体值。

接口值调用方法时会执行其底层类型的同名方法。

```go
type I interface {
	M()
}

type T struct {
	S string
}

func (t *T) M() {
	fmt.Println(t.S)
}

type F float64

func (f F) M() {
	fmt.Println(f)
}

func main() {
	var i I

	i = &T{"Hello"}
	describe(i)
	i.M()
	fmt.Printf("\n")

	i = F(math.Pi)
	describe(i)
	i.M()
	fmt.Printf("\n")
}

func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
	i.M()
}
```

### 值为 nil

即便接口内的具体值为 nil，方法仍然会被 nil 接收者调用。

在一些语言中，这会触发一个空指针异常，但在 go 中通常会写一些方法来优雅地处理它。

注意: **保存了 nil 具体值的接口其自身并不为 nil**。

```go
type I interface {
	M()
}

type T struct {
	S string
}

func (t *T) M() {
	if t == nil {
		fmt.Println("<nil>")
		return
	}
	fmt.Println(t.S)
}

func main() {
	var i I

	var t *T
	i = t
	describe(i)
	i.M()

	i = &T{"hello"}
	describe(i)
	i.M()
}

func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
}
```

nil 接口值既不保存值也不保存具体类型。

为 nil 接口调用方法会产生运行时错误，因为接口的元组内并未包含能够指明该调用哪个 具体 方法的类型。

### 空接口

指定了零个方法的接口值被称为 「空接口」

`interface{}`

空接口可保存任何类型的值。因为每个类型都至少实现了零个方法。

空接口被用来处理未知类型的值。

```go
func main() {
	var i interface{}
	describe(i)

	i = 42
	describe(i)

	i = "hello"
	describe(i)
}

func describe(i interface{}) {
	fmt.Printf("(%v, %T)\n", i, i)
}
```
> 有点类似于 TypeScript 中的 any 类型吧

### 类型断言

类型断言 提供了访问接口值底层具体值的方式。

`t := i.(T)`

该语句断言接口值 i 保存了具体类型 T，并将其底层类型为 T 的值赋予变量 t。

若 i 并未保存 T 类型的值，该语句就会触发一个 panic。

为了 判断 一个接口值是否保存了一个特定的类型，类型断言可返回两个值：其底层值以及一个报告断言是否成功的布尔值。

`t, ok := i.(T)`

若 i 保存了一个 T，那么 t 将会是其底层值，而 ok 为 true。否则，ok 将为 false 而 t 将为 T 类型的零值，程序并不会产生 panic。

### 类型选择

类型选择 是一种按顺序从几个类型断言中选择分支的结构。

类型选择与一般的 switch 语句相似，不过类型选择中的 case 为类型（而非值）， 它们针对给定接口值所存储的值的类型进行比较。

类型选择中的声明与类型断言 i.(T) 的语法相同，只是具体类型 T 被替换成了关键字 type。

```go
func do(i interface{}) {
	switch v := i.(type) {
	case int:
		fmt.Printf("二倍的 %v 是 %v\n", v, v*2)
	case string:
		fmt.Printf("%q 长度为 %v 字节\n", v, len(v))
	default:
		fmt.Printf("我不知道类型 %T!\n", v)
	}
}

func main() {
	do(21)
	do("hello")
	do(true)
}
```

## 错误

go 程序使用 error 值来表示错误状态。

与 fmt.Stringer 类似，error 类型是一个内建接口：

```go
type error interface {
    Error() string
}
```

通常函数会返回一个 error 值，调用它的代码应当判断这个错误是否等于 nil 来进行错误处理。

```go
i, err := strconv.Atoi("42")
if err != nil {
    fmt.Printf("couldn't convert number: %v\n", err)
    return
}
fmt.Println("Converted integer:", i)
```
> error 为 nil 时表示成功；非 nil 的 error 表示失败。

## Readers

io 包指定了 io.Reader 接口，它表示数据流的读取端。

go 标准库包含了该接口的许多实现，包括文件、网络连接、压缩和加密等等。

io.Reader 接口有一个 Read 方法

```go
func (T) Read(b []byte) (n int, err error)
```

Read 用数据填充给定的字节切片并返回填充的字节数和错误值。在遇到数据流的结尾时，它会返回一个 io.EOF 错误。

```go
func main() {
	r := strings.NewReader("Hello, Reader!")

	b := make([]byte, 8)
	for {
		n, err := r.Read(b)
		fmt.Printf("n = %v err = %v b = %v\n", n, err, b)
		fmt.Printf("b[:n] = %q\n", b[:n])
		if err == io.EOF {
			break
		}
	}
}
```

## 泛型

### 泛型函数

类型参数，可以使用类型参数编写 Go 函数来处理多种类型。 函数的类型参数出现在函数参数之前的方括号之间。

`func Index[T comparable](s []T, x T) int`
> 此声明意味着 s 是满足内置约束 comparable 的任何类型 T 的切片。 x 也是相同类型的值。

comparable 是一个有用的约束，它能让我们对任意满足该类型的值使用 == 和 != 运算符。在此示例中，我们使用它将值与所有切片元素进行比较，直到找到匹配项。

```go
// Index 返回 x 在 s 中的下标，未找到则返回 -1。
func Index[T comparable](s []T, x T) int {
	for i, v := range s {
		// v 和 x 的类型为 T，它拥有 comparable 可比较的约束，
		// 因此我们可以使用 ==。
		if v == x {
			return i
		}
	}
	return -1
}

func main() {
	// Index 可以在整数切片上使用
	si := []int{10, 20, 15, -10}
	fmt.Println(Index(si, 15))

	// Index 也可以在字符串切片上使用
	ss := []string{"foo", "bar", "baz"}
	fmt.Println(Index(ss, "hello"))
}
```

### 泛型类型

除了泛型函数之外，go 还支持泛型类型。 类型可以使用类型参数进行参数化，这对于实现通用数据结构非常有用。

此示例展示了能够保存任意类型值的单链表的简单类型声明。

```go
type List[T any] struct {
	next *List[T]
	val  T
}

func main() { }
```

## 并发

### 协程

Go 程（*goroutine*）是由 Go 运行时管理的轻量级线程。

语法：`go f(...)`

f 与其参数的求值发生在当前的 Go 协程中，而 f 的执行发生在新的 Go 协程中。

Go 程在相同的地址空间中运行，因此在访问共享的内存时必须进行同步。sync 包提供了这种能力，不过在 Go 中并不经常用到，因为还有其它的办法

```go
func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func main() {
	go say("go => world")
	say("main => hello")
}
```

### 信道

信道是带有类型的管道，你可以通过它用信道操作符 <- 来发送或者接收值。

```go
ch <- v    // 将 v 发送至信道 ch。
v := <-ch  // 从 ch 接收值并赋予 v。
```
> “箭头”就是数据流的方向。

和映射与切片一样，信道在使用前必须创建： `ch := make(chan int)`

默认情况下，发送和接收操作在另一端准备好之前都会阻塞。这使得 Go 程可以在没有显式的锁或竞态变量的情况下进行同步。

```go
func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // 发送 sum 到 c
}

func main() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c // 从 c 接收

	fmt.Println(x, y, x+y)
}
```

### 带缓冲的信道

信道可以是 带缓冲的。将缓冲长度作为第二个参数提供给 make 来初始化一个带缓冲的信道：`ch := make(chan int, 100)`

仅当信道的缓冲区填满后，向其发送数据时才会阻塞。当缓冲区为空时，接受方会阻塞。

```go
func main() {
	ch := make(chan int, 2)
	ch <- 1
	ch <- 2
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}
```

### range 和 close

发送者可通过 close 关闭一个信道来表示没有需要发送的值了。接收者可以通过为接收表达式分配第二个参数来测试信道是否被关闭：若没有值可以接收且信道已被关闭，那么在执行完

`v, ok := <-ch`
> 此时 ok 会被设置为 false。

循环 for i := range c 会不断从信道接收值，直到它被关闭。

注意：只应由发送者关闭信道，而不应油接收者关闭。向一个已经关闭的信道发送数据会引发程序 panic。

还要注意：信道与文件不同，通常情况下无需关闭它们。只有在必须告诉接收者不再有需要发送的值时才有必要关闭，例如终止一个 range 循环。

```go
func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	close(c)
}

func main() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c {
		fmt.Println(i)
	}
}
```

### select 语句

select 语句使一个 Go 程可以等待多个通信操作。

select 会阻塞到某个分支可以继续执行为止，这时就会执行该分支。当多个分支都准备好时会随机选择一个执行。

```go
func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()
	fibonacci(c, quit)
}
```

当 select 中的其它分支都没有准备好时，default 分支就会执行。为了在尝试发送或者接收时不发生阻塞，可使用 default 分支

```go
func main() {
	tick := time.Tick(100 * time.Millisecond)
	boom := time.After(500 * time.Millisecond)
	for {
		select {
		case <-tick:
			fmt.Println("tick.")
		case <-boom:
			fmt.Println("BOOM!")
			return
		default:
			fmt.Println("    .")
			time.Sleep(50 * time.Millisecond)
		}
	}
}
```

### sync.Mutex

若我们只是想保证每次只有一个 Go 程能够访问一个共享的变量，从而避免冲突？

这里涉及的概念叫做 「 互斥（mutual\*exclusion）」 ，我们通常使用 *互斥锁（Mutex）* 这一数据结构来提供这种机制。

Go 标准库中提供了 sync.Mutex 互斥锁类型及其两个方法：`Lock` 和 `Unlock`

```go
// SafeCounter 是并发安全的
type SafeCounter struct {
	mu sync.Mutex
	v  map[string]int
}

// Inc 对给定键的计数加一
func (c *SafeCounter) Inc(key string) {
	c.mu.Lock()
	// 锁定使得一次只有一个 Go 协程可以访问映射 c.v。
	c.v[key]++
	c.mu.Unlock()
}

// Value 返回给定键的计数的当前值。
func (c *SafeCounter) Value(key string) int {
	c.mu.Lock()
	// 锁定使得一次只有一个 Go 协程可以访问映射 c.v。
	defer c.mu.Unlock()
	return c.v[key]
}

func main() {
	c := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go c.Inc("somekey")
	}

	time.Sleep(time.Second)
	fmt.Println(c.Value("somekey"))
}
```
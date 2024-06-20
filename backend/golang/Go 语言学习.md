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

### 切片

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

__切片字面量__

切片字面量类似于没有长度的数组字面量。

```go
// 这是一个数组字面量
[3]bool{true, true, false}

// 下面这样则会创建一个和上面相同的数组，然后再构建一个引用了它的切片
[]bool{true, true, false}

func main() {
	q := []int{2, 3, 5, 7, 11, 13}
	fmt.Println(q)

	r := []bool{true, false, true, true, false, true}
	fmt.Println(r)

	s := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, false},
		{5, true},
		{7, true},
		{11, false},
		{13, true},
	}
	fmt.Println(s)
}
```

__切片的默认行为__

在进行切片时，你可以利用它的默认行为来忽略上下界。

切片下界的默认值为 0，上界则是该切片的长度。

```go
// 对于数组来说
var a [10]int

// 以下切片表达式和它是等价的：
a[0:10]
a[:10]
a[0:]
a[:]

func main() {
	s := []int{2, 3, 5, 7, 11, 13}

	s = s[1:4]
	fmt.Println(s)

	s = s[:2]
	fmt.Println(s)

	s = s[1:]
	fmt.Println(s)
}
```

__切片的长度与容量__

切片拥有 长度 和 容量。  

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

__nil切片__

切片的零值是 nil。nil 切片的长度和容量为 0 且没有底层数组。

```go
func main() {
	var s []int
	fmt.Println(s, len(s), cap(s))
	if s == nil {
		fmt.Println("nil!")
	}
}
```

__使用make创建切片__

切片可以用内置函数 make 来创建，这也是你创建动态数组的方式。

```go
// make 函数会分配一个元素为零值的数组并返回一个引用了它的切片
a := make([]int, 5)  // len(a)=5

// 要指定它的容量，需向 make 传入第三个参数
b := make([]int, 0, 5) // len(b)=0, cap(b)=5

b = b[:cap(b)] // len(b)=5, cap(b)=5
b = b[1:]      // len(b)=4, cap(b)=4

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

__切片的切片__  

切片可以包含任何类型，当然也包括其他切片。

```go
func main() {
	// 创建一个井字棋（经典游戏）
	board := [][]string{
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
	}

	// 两个玩家轮流打上 X 和 O
	board[0][0] = "X"
	board[2][2] = "O"
	board[1][2] = "X"
	board[1][0] = "O"
	board[0][2] = "X"

	for i := 0; i < len(board); i++ {
		fmt.Printf("%s\n", strings.Join(board[i], " "))
	}
}
```

__向切片追加元素__

为切片追加新的元素是种常见的操作，为此 Go 提供了内置的 append 函数。

```go
// append 的第一个参数 s 是一个元素类型为 T 的切片，其余类型为 T 的值将会追加到该切片的末尾。
// append 的结果是一个包含原切片所有元素加上新添加元素的切片。
// 当 s 的底层数组太小，不足以容纳所有给定的值时，它就会分配一个更大的数组。 返回的切片会指向这个新分配的数组。
func append(s []T, vs ...T) []T

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

### range遍历

for 循环的 range 形式可遍历切片或映射。

当使用 for 循环遍历切片时，每次迭代都会返回两个值。 第一个值为当前元素的下标，第二个值为该下标所对应元素的一份副本。

可以将下标或值赋予 _ 来忽略它。

```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
	for i, v := range pow {
		fmt.Printf("2**%d = %d\n", i, v)
	}
}

for i, _ := range pow
for _, value := range pow

func main() {
	pow := make([]int, 10)
	for i := range pow {
		pow[i] = 1 << uint(i) // == 2**i
	}
	for _, value := range pow {
		fmt.Printf("%d\n", value)
	}
}
```

### map映射

map 映射将键映射到值.

映射的零值为 nil 。nil 映射既没有键，也不能添加键。

make 函数会返回给定类型的映射，并将其初始化备用。

```go
type Vertex struct {
	lat, long float64
}

var m map[string]Vertex

func main() {
	m = make(map[string]Vertex)
	m["Bell Labs"] = Vertex {
		40.68433, -74.39967
	}

	fmt.Println(m["Bell Labs"])
}
```

### 映射字面量

映射的字面量和结构体类似，只不过必须有键名。

```go
type Vertex struct {
	Lat, Long float64
}

var m = map[string]Vertex {
	"Bell Labs": Vertex {
		40.68433, -74.3333
	},
	"Google": Vertex {
		123.123, 233.233
	},
}

// 若顶层类型只是一个类型名，那么你可以在字面量的元素中省略它。

var m2 = map[string]Vertex {
	"Bell Labs": { 40.68433, -74.3333 },
	"Google": Vertex { 123.123, 233.233 },
}

func main() {
	fmt.Println(m)
}
```

### 修改映射

在映射 m 中插入或修改元素：`m[key] = value`

获取元素: `elem = m[key]`

删除元素: `delete(m, key)`

通过双赋值检测某个键是否存在: `elem, ok = m[key]`

- 若 key 在 m 中，ok 为 true ；否则，ok 为 false
- 若 key 不在映射中，则 elem 是该映射元素类型的零值

```go
func main() {
	m := make(map[string]int)

	m['done'] = 43
	fmt.Println("值: ", m['done'])
	delete(m, 'done')
	
	v1, ok := m['done']
	fmt.Println("值: ", v , "是否存在: ", ok)
}
```

### 函数值

函数也是值。它们可以像其他值一样传递。

函数值可以用作函数的参数或返回值。

```go
func computer(fn func(float64, float64) float64) float64 {
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

__函数闭包__

Go 函数可以是一个闭包。闭包是一个函数值，它引用了其函数体之外的变量。 该函数可以访问并赋予其引用的变量值，换句话说，该函数被“绑定”到了这些变量。

```go
// 函数 adder 返回一个闭包。每个闭包都被绑定在其各自的 sum 变量上。
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

## 方法和接口

> GO 并不是面向对象设计的语言, 但它也是支持面向对象的, 所以方法和接口的实现与其他语言是较为不同的.

### 方法

> 对象的函数叫做: 方法, 不依赖对象的叫函数.

Go 没有类。不过你可以为类型定义方法。

方法就是一类带特殊的 接收者 参数的函数。

方法接收者在它自己的参数列表内，位于 func 关键字和方法名之间。

```go
type Verter struct{
	lat, long float64
}

func (v Verter) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Verter{4.444, 5.555}
	fmt.Println(v.Abs())
}
```

__方法即函数__

记住：在 golang 里方法只是个带接收者参数的函数。

```go
type Vertex struct {
	X, Y float64
}
// 将上面的 Abs 方法用普通函数的方式实现也是没问题的.
func Abs(v Vertex) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
func main() {
	v := Vertex{3, 4}
	fmt.Println(Abs(v))
}
```

也可以为非结构体类型声明方法。

```go
// 一个带 Abs 方法的数值类型 MyFloat。
type MyFloat float64
func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func main() {
	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs())
}
```

能为在同一个包中定义的接收者类型声明方法，而不能为其它别的包中定义的类型 （包括 int 之类的内置类型）声明方法。

### 指针类型的接收者

可以为指针类型的接收者声明方法。

这意味着对于某类型 T，接收者的类型可以用 *T 的文法。 （此外，T 本身不能是指针，比如不能是 *int。）

```go
type Vertex{
	lat, long float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

// 指针接收者的方法可以修改接收者指向的值（如这里的 Scale 所示）。 由于方法经常需要修改它的接收者，指针接收者比值接收者更常用。
func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(10)
	fmt.Println(v.Abs())
	// 若使用值接收者，那么 Scale 方法会对原始 Vertex 值的副本进行操作。
	// Scale 方法必须用指针接收者来更改 main 函数中声明的 Vertex 的值。
}
```

### 方法与指针重定向

带指针参数的函数必须接受一个指针

```go
var v Vertex
ScaleFunc(v, 5)  // 编译错误！
ScaleFunc(&v, 5) // OK

// 而接收者为指针的的方法被调用时，接收者既能是值又能是指针
var v Vertex
v.Scale(5)  // OK
p := &v
p.Scale(10) // OK
// 对于语句 v.Scale(5) 来说，即便 v 是一个值而非指针，带指针接收者的方法也能被直接调用。 
// 也就是说，由于 Scale 方法有一个指针接收者，为方便起见，Go 会将语句 v.Scale(5) 解释为 (&v).Scale(5)。

type Vertex struct {
	X, Y float64
}
func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}
func ScaleFunc(v *Vertex, f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}
func main() {
	v := Vertex{3, 4}
	v.Scale(2)
	ScaleFunc(&v, 10)

	p := &Vertex{4, 3}
	p.Scale(3)
	ScaleFunc(p, 8)

	fmt.Println(v, p)
}
```

接受一个值作为参数的函数必须接受一个指定类型的值

```go
var v Vertex
fmt.Println(AbsFunc(v))  // OK
fmt.Println(AbsFunc(&v)) // 编译错误！

// 而以值为接收者的方法被调用时，接收者既能为值又能为指针
var v Vertex
fmt.Println(v.Abs()) // OK
p := &v
fmt.Println(p.Abs()) // OK
// 这种情况下，方法调用 p.Abs() 会被解释为 (*p).Abs()。
```

__选择值或指针作为接收者__

使用指针接收者的原因有二：

- 方法能够修改其接收者指向的值。
- 这样可以避免在每次调用方法时复制该值。若值的类型为大型结构体时，这样会更加高效。

> 在本例中，Scale 和 Abs 接收者的类型为 *Vertex，即便 Abs 并不需要修改其接收者。

通常来说，所有给定类型的方法都应该有值或指针接收者，但并不应该二者混用。 

### 接口

**接口类型** 的定义为一组方法签名。

接口类型的变量可以持有任何实现了这些方法的值。

```go
type Abser interface {
	Abs() float64
}

func main() {
	var a Abser
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	a = f  // a MyFloat 实现了 Abser
	a = &v // a *Vertex 实现了 Abser

	// 下面一行，v 是一个 Vertex（而不是 *Vertex）
	// 所以没有实现 Abser。
	a = v

	fmt.Println(a.Abs()) // 报错
}

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

type Vertex struct{
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
```

__接口与隐式实现__

类型通过实现一个接口的所有方法来实现该接口。

既然无需专门显式声明，也就没有“implements”关键字。

隐式接口从接口的实现中解耦了定义，这样接口的实现可以出现在任何包中，无需提前准备。

因此，也就无需在每一个实现上增加新的接口名称，这样同时也鼓励了明确的接口定义。

```go
type I interface {
	Func1()
}

type T struct {
	Str string
}

func (t T) Func1() {
	fmt.Println(t.Str)
}

func main() {
	var i I = T{"Hello"}
	i.Func1()
}
```

__接口值__

接口也是值。它们可以像其它值一样传递。

接口值可以用作函数的参数或返回值。

在内部，接口值可以看做包含值和具体类型的元组：`(value, type)`

接口值保存了一个具体底层类型的具体值。

接口值调用方法时会执行其底层类型的同名方法。

```go
type I interface {
	Fun1()
}

type T struct {
	Str string
}

func (t *T) Fun1() {
	fmt.Println(t.Str)
}

type F64 Float64 

func (f F64) Fun1() {
	fmt.Println(f)
}

func main() {
	var i I
	i = &T{'Hello'}
	describe(i)
	i.Fun1()

	i = F(math.Pi)
	describe(i)
	i.Fun1()
}

func describe(i I) {
	fmt.Println("(%v, %T)", i, i)
}
```

__底层值为 nil 的接口值__

即便接口内的具体值为 nil，方法仍然会被 nil 接收者调用。

在一些语言中，这会触发一个空指针异常，但在 Go 中可以写一些方法来更优雅地处理它。

**注意**: 保存了 nil 具体值的接口其自身并不为 nil。

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

__nil 接口值__

nil 接口值既不保存值也不保存具体类型。

为 nil 接口调用方法会产生运行时错误，因为接口的元组内并未包含能够指明该调用哪个 具体 方法的类型。

```go
// 运行后会出现一个错误
type I interface {
	M()
}

func main() {
	var i I
	describe(i)
	i.M()
}

func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
}
```

__空接口__

指定了零个方法的接口值被称为 *空接口：* `interface{}`

空接口可保存任何类型的值。（因为每个类型都至少实现了零个方法。）

空接口被用来处理未知类型的值。例如，fmt.Print 可接受类型为 interface{} 的任意数量的参数。

> 有点类似于 TypeScript 中的 any 类型

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
### 类型断言

类型断言 提供了访问接口值底层具体值的方式.

```go
t := i.(T)
// 该语句断言接口值 i 保存了具体类型 T，并将其底层类型为 T 的值赋予变量 t。
// 若 i 并未保存 T 类型的值，该语句就会触发一个 panic。


// 为了 判断 一个接口值是否保存了一个特定的类型，类型断言可返回两个值：
// 其底层值以及一个报告断言是否成功的布尔值。
t, ok := i.(T)
// 若 i 保存了一个 T，那么 t 将会是其底层值，而 ok 为 true。
// 否则，ok 将为 false 而 t 将为 T 类型的零值，程序并不会产生 panic。

func main() {
	var i interface{} = "hello"

	s := i.(string)
	fmt.Println(s)

	s, ok := i.(string)
	fmt.Println(s, ok)

	s, ok := i.(float64)
	fmt.Println(s, ok)

	s := i.(float64) // panic
	fmt.Println(s)
}
```

### 类型选择

类型选择 是一种按顺序从几个类型断言中选择分支的结构。

类型选择与一般的 switch 语句相似，不过类型选择中的 case 为类型（而非值）， 它们针对给定接口值所存储的值的类型进行比较。

```go
// 类型选择中的声明与类型断言 i.(T) 的语法相同，只是具体类型 T 被替换成了关键字 type。
// 此选择语句判断接口值 i 保存的值类型是 T 还是 S。在 T 或 S 的情况下，变量 v 会分别按 T 或 S 类型保存 i 拥有的值。
// 在默认（即没有匹配）的情况下，变量 v 与 i 的接口类型和值相同。

switch v := i.(type) {
	case T:
		// v 的类型为T
	case S:
		// v 的类型为S
	default:
		// 没有匹配, v 与 i的类型相同
}

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

### Stringer

fmt 包中定义的 Stringer 是最普遍的接口之一。

```go
// 定义
type Stringer interface {
	String() string
}
```

Stringer 是一个可以用字符串描述自己的类型。fmt 包（还有很多包）都通过此接口来打印值。

> 类似于其他的语言的 toString

```go
import "fmt"

type Person struct {
	Name string
	Age  int
}

func (p Person) String() string {
	return fmt.Sprintf("%v (%v years)", p.Name, p.Age)
}

func main() {
	a := Person{"Arthur Dent", 42}
	z := Person{"Zaphod Beeblebrox", 9001}
	fmt.Println(a,"|||", z)
}
```

### 错误

Go 程序使用 error 值来表示错误状态。

与 fmt.Stringer 类似，error 类型是一个内建接口；与 fmt.Stringer 类似，fmt 包也会根据对 error 的实现来打印值。

通常函数会返回一个 error 值，调用它的代码应当判断这个错误是否等于 nil 来进行错误处理。
```go
type error interface {
    Error() string
}

// error 为 nil 时表示成功；非 nil 的 error 表示失败。
i, err := strconv.Atoi("42")
if err != nil {
    fmt.Printf("couldn't convert number: %v\n", err)
    return
}
fmt.Println("Converted integer:", i)
```

### Readers

io 包指定了 io.Reader 接口，它表示数据流的读取端。

Go 标准库包含了该接口的许多实现，包括文件、网络连接、压缩和加密等等。

io.Reader 接口有一个 Read 方法

```go
func (T) Read(b []byte) (n int, err error)
```

Read 用数据填充给定的字节切片并返回填充的字节数和错误值。在遇到数据流的结尾时，它会返回一个 io.EOF 错误。

```go
// 示例代码创建了一个 strings.Reader 并以每次 8 字节的速度读取它的输出。
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

### 图像

image 包定义了 Image 接口

```go
type Image interface {
    ColorModel() color.Model
    Bounds() Rectangle
    At(x, y int) color.Color
}
```

注意: Bounds 方法的返回值 Rectangle 实际上是一个 image.Rectangle，它在 image 包中声明。

> color.Color 和 color.Model 类型也是接口，但是通常因为直接使用预定义的实现 image.RGBA 和 image.RGBAModel 而被忽视了。这些接口和类型由 image/color 包定义。

```go
func main() {
	m := image.NewRGBA(image.Rect(0, 0, 100, 100))
	fmt.Println(m.Bounds())
	fmt.Println(m.At(0, 0).RGBA())
}
```

## 泛型

### 类型参数

可以使用类型参数编写 Go 函数来处理多种类型。 函数的类型参数出现在函数参数之前的方括号之间。

```go
// 此声明意味着 s 是满足内置约束 comparable 的任何类型 T 的切片。 x 也是相同类型的值。
func Index[T comparable](s []T, x T) int
```

comparable 是一个有用的约束，它能让我们对任意满足该类型的值使用 == 和 != 运算符。

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

除了泛型函数之外，Go 还支持泛型类型。 类型可以使用类型参数进行参数化，这对于实现通用数据结构非常有用。

```go
// List 表示一个可以保存任何类型的值的单链表。
type List[T any] struct {
	next *List[T]
	val  T
}
```

## 并发

### Go 协程

Go 程（goroutine）是由 Go 运行时管理的轻量级线程。

```go
go f(x, y, z)
// 会启动一个新的 Go 协程并执行
f(x, y, z)
// f, x, y 和 z 的求值发生在当前的 Go 协程中，而 f 的执行发生在新的 Go 协程中。

func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func main() {
	go say("world")
	say("hello")
}
```

> Go 程在相同的地址空间中运行，因此在访问共享的内存时必须进行同步。sync 包提供了这种能力，不过在 Go 中并不经常用到，因为还有其它的办法

### 信道

信道是带有类型的管道，你可以通过它用信道操作符 <- 来发送或者接收值。

```go
ch <- v    // 将 v 发送至信道 ch。
v := <-ch  // 从 ch 接收值并赋予 v。
// （“箭头”就是数据流的方向。）

// 和映射与切片一样，信道在使用前必须创建
ch := make(chan int)
```

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

__带缓冲的信道__

信道可以是 带缓冲的。将缓冲长度作为第二个参数提供给 make 来初始化一个带缓冲的信道: `ch := make(chan int, 100)`

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

__range 和 close__

发送者可通过 close 关闭一个信道来表示没有需要发送的值了。

接收者可以通过为接收表达式分配第二个参数来测试信道是否被关闭：若没有值可以接收且信道已被关闭，那么在执行完

```go
v, ok := <-ch
// 此时 ok 会被设置为 false


func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	close(c)
}

// 循环 for i := range c 会不断从信道接收值，直到它被关闭。
func main() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c {
		fmt.Println(i)
	}
}
```

> 注意1： 只应由发送者关闭信道，而不应油接收者关闭。向一个已经关闭的信道发送数据会引发程序 panic。  
> 注意2： 信道与文件不同，通常情况下无需关闭它们。只有在必须告诉接收者不再有需要发送的值时才有必要关闭，例如终止一个 range 循环。
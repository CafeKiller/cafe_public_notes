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
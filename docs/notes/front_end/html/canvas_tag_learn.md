---
title: "Canvas 标签操作手册"
category: WEB前端
subcategory: HTML
level: 1
tags:
  - HTML
  - Canvas
---

# 操作 Canvas 标签

## 参考

> [!tip] 参考文章/教程
>
> [Canvas 从入门到劝朋友放弃 - 稀土掘金](https://juejin.cn/post/7116784455561248775)

```html
<!-- 1、创建 canvas 元素 -->
<canvas id="c" width="300" height="200" style="border: 1px solid #ccc;"></canvas>

<script>
  // 2、获取 canvas 对象
  const cnv = document.getElementById('c')

  // 3、获取 canvas 上下文环境对象
  const cxt = cnv.getContext('2d')

  // 4、绘制图形
  cxt.moveTo(100, 100) // 起点坐标 (x, y)
  cxt.lineTo(200, 100) // 终点坐标 (x, y)
  cxt.stroke() // 将起点和终点连接起来
</script>
```

## 关于 canvas 的一些基础知识

`canvas` 的默认宽度是300px，默认高度是150px

1. 如果使用 `css` 修改 `canvas` 的宽高（比如本例变成 400px * 400px），那宽度就由 300px 拉伸到 400px，高度由 150px 拉伸到 400px。

2. 使用 `javascript` 获取 `canvas` 的宽高，此时返回的是 `canvas` 的默认值。

3. 线条的默认宽度是 1px ，默认颜色是黑色。

4. 但由于默认情况下 `canvas` 会将线条的中心点和像素的底部对齐，所以会导致显示效果是 2px 和非纯黑色问题。

5. 暂时只有 `IE 9` 以上才支持 `canvas` 。但好消息是 IE 已经有自己的墓碑了。

6. 如需兼容 `IE 7 / 8` ，可以使用 ExplorerCanvas 。但即使是使用了 `ExplorerCanvas` 仍然会有所限制，比如无法使用 `fillText()` 方法等。

```html
<style>
  #c {
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;
  }
</style>

<canvas id="c"></canvas>

<script>
  // 1、获取canvas对象
  const cnv = document.getElementById('c')

  // 2、获取canvas上下文环境对象
  const cxt = cnv.getContext('2d')

  // 3、绘制图形
  cxt.moveTo(100, 100) // 起点
  cxt.lineTo(200, 100) // 终点
  cxt.stroke() // 将起点和终点连接起来

  console.log(cnv.width) // 获取 canvas 的宽度，输出：300
  console.log(cnv.height) // 获取 canvas 的高度，输出：150
</script>
```

## 基础图形

> Canvas 使用的是 W3C 坐标系 ，也就是遵循我们屏幕、报纸的阅读习惯，从上往下，从左往右。
> 
> W3C 坐标系 和 数学直角坐标系 的 X轴 是一样的，只是 Y轴 的反向相反。W3C 坐标系 的 Y轴 正方向向下。


### 直线

---

画直线需要用到这三种函数

- `moveTo(x1, y1)` : 起点坐标 (x, y)

- `lineTo(x2, y2)` : 下一个点的坐标 (x, y)

- `stroke()` : 将所有坐标用一条线连起来

如果需要修改直线的样式还需要使用到这些「属性」

- `lineWidth` : 线的粗细

- `strokeStyle` : 线的颜色

- `lineCap` : 线帽 默认(butt) 圆形(round) 方形(square)

需要注意的就是如果你设置了样式，那么这个样式会一直影响你画的所有直线（无论之前还是之后）。

如果需要修改样式，那就需要新开路径来进行绘制了。

- `beginPath()` : 开辟新路径

```html
<canvas id="c" width="300" height="300" style="border: 1px solid #ccc;"></canvas>

<script>
  const cnv = document.getElementById('c')
  const cxt = cnv.getContext('2d')

  cxt.moveTo(20, 100)
  cxt.lineTo(200, 100)
  cxt.lineWidth = 10
  cxt.strokeStyle = 'pink'
  cxt.stroke()

  cxt.beginPath() // 重新开启一个路径
  cxt.moveTo(20, 120.5)
  cxt.lineTo(200, 120.5)
  cxt.lineWidth = 4
  cxt.strokeStyle = 'red'
  cxt.stroke()
</script>
```

### 矩形

---

根据前面的基础，我们可以 使用线段来描绘矩形，但 canvas 也提供了 `rect()` 等方法可以直接生成矩形。

1. 使用 `strokeRect()` 描边矩形

- `strokeStyle` : 设置描边的属性（颜色、渐变、图案）
- `strokeRect(x, y, width, height)` : 描边矩形（x和y是矩形左上角起点；width 和 height 是矩形的宽高）
- 注意，`strokeStyle` 必须写在 `strokeRect()` 前面，不然样式不生效。

---

2. 使用 `fillRect()` 填充矩形

- `fillRect()` 和 `strokeRect()` 方法差不多，但 `fillRect()` 的作用是填充。
- 需要注意的是，`fillStyle` 必须写在 `fillRect()` 之前，不然样式不生效。

---

3. 使用 `rect()` 生成矩形

- `rect()` 和 `fillRect()` 、`strokeRect()` 的用法差不多，唯一的区别是：`strokeRect()` 和 `fillRect()` 这两个方法调用后会立即绘制；`rect()` 方法被调用后，不会立刻绘制矩形，而是需要调用 `stroke()` 或 `fill()` 辅助渲染。

---

4. 使用 `clearRect()` 方法可以清空指定区域。

> canvas 画布元素是矩形，所以可以通过下面的代码把整个画布清空掉。
>
> `cxt.clearRect(0, 0, cnv.width, cnv.height)`

### 多边形

---

很遗憾，canvas 并没有提供类似 `rect()` 这样直接绘制多边形的函数，所有如果你需要绘制多边形，那需要使用 `moveTo()` 、 `lineTo()` 和 `closePath()` 。


### 圆形

---

绘制圆形的方法是 arc()。

`arc(x, y, r, sAngle, eAngle，counterclockwise)`

- `x 和 y` : 圆心坐标
- `r` : 半径
- `sAngle` : 开始角度
- `eAngle` : 结束角度
- `counterclockwise` : 绘制方向（true: 逆时针; false: 顺时针），默认 false

注意：绘制圆形之前，必须先调用 beginPath() 方法！！！ 在绘制完成之后，还需要调用 closePath() 方法！！！

```html
<canvas id="c" width="300" height="300" style="border: 1px solid #ccc;"></canvas>

<script>
  const cnv = document.getElementById('c')
  const cxt = cnv.getContext('2d')

  cxt.beginPath()
  cxt.arc(150, 150, 80, 0, 360 * Math.PI / 180)
  cxt.closePath()

  cxt.stroke()
</script>
```

### 弧线

---

使用 `arc()` 方法画半圆时，如果最后不调用 `closePath()` 方法，就不会出现闭合路径。也就是说，那是一条弧线。

在 canvas 中，画弧线有2中方法：`arc()` 和 `arcTo()` 。

```html
<canvas id="c" width="300" height="300" style="border: 1px solid #ccc;"></canvas>

<script>
  const cnv = document.getElementById('c')
  const cxt = cnv.getContext('2d')

  cxt.beginPath()
  cxt.arc(150, 150, 100, 0, 30 * Math.PI / 180)

  cxt.stroke()
</script>
```

arcTo() 画弧线

`arcTo(cx, cy, x2, y2, radius)`

- `cx` : 两切线交点的横坐标
- `cy` : 两切线交点的纵坐标
- `x2` : 结束点的横坐标
- `y2` : 结束点的纵坐标
- `radius` : 半径



## 基本样式

- **描边 `stroke()`**


- **线条宽度 `lineWidth`**
  - `lineWidth` 默认值是 1 ，默认单位是 `px`。
  

- **线条颜色 `strokeStyle`**


- **线帽 `lineCap`**
  - 线帽指的是线段的开始和结尾处的样式，使用 `lineCap` 可以设置
  - butt: 默认值，无线帽 | square: 方形线帽 | round: 圆形线帽
  - 线帽只对线条的开始和结尾处产生作用，对拐角不会产生任何作用。


- **拐角样式 lineJoin**
  - miter: 默认值，尖角 | round: 圆角 | bevel: 斜角


- **虚线 setLineDash()**
  - 使用 setLineDash() 方法可以将描边设置成虚线。
  - 需要传入一个数组，且元素是数值型。
  - 此外，还可以始终 cxt.getLineDash() 获取虚线不重复的距离；
  - 用 cxt.lineDashOffset 设置虚线的偏移位。


- **填充**
  - 使用 fill() 可以填充图形
  - 可以使用 fillStyle 设置填充颜色，默认是黑色。


- **非零环绕填充**
  
> 在使用 fill() 方法填充时，需要注意一个规则：非零环绕填充。
> 
> 在使用 moveTo 和 lineTo 描述图形时，如果是按顺时针绘制，计数器会加1；如果是逆时针，计数器会减1。
>
> 当图形所处的位置，计数器的结果为0时，它就不会被填充。


```html
<canvas id="c" width="300" height="300" style="border: 1px solid #ccc;"></canvas>

<script>
  const cnv = document.getElementById('c')
  const cxt = cnv.getContext('2d')

  // 外层矩形
  cxt.moveTo(50, 50)
  cxt.lineTo(250, 50)
  cxt.lineTo(250, 250)
  cxt.lineTo(50, 250)
  cxt.closePath()

  // 内层矩形
  cxt.moveTo(200, 100)
  cxt.lineTo(100, 100)
  cxt.lineTo(100, 200)
  cxt.lineTo(200, 200)
  cxt.closePath()
  cxt.fill()
</script>
```

内层矩形是逆时针绘制的，所以内层的值是 -1 ，它又经过外层矩形，而外层矩形是顺时针绘制，所以经过外层时值 +1，最终内层的值为 0 ，所以不会被填充。

## 文本

和 CSS 设置 font 差不多，Canvas 也可以通过 font 设置样式。

语法示例: `cxt.font = 'font-style font-variant font-weight font-size/line-height font-family'`

如果需要设置字号 font-size，需要同时设置 font-family。

`cxt.font = '30px 宋体'`


### 描边 strokeText()

---

使用 strokeText() 方法进行文本描边

- strokeText(text, x, y, maxWidth)
  - `text` : 字符串，要绘制的内容
  - `x` : 横坐标，文本左边要对齐的坐标（默认左对齐）
  - `y` : 纵坐标，文本底边要对齐的坐标
  - `maxWidth` : 可选参数，表示文本渲染的最大宽度（px），如果文本超出 maxWidth 设置的值，文本会被压缩。

```html
<canvas id="c" width="300" height="300" style="border: 1px solid #ccc;"></canvas>

<script>
  const cnv = document.getElementById('c')
  const cxt = cnv.getContext('2d')

  cxt.font = '60px Arial' // 将字号设置成 60px，方便观察
  cxt.strokeText('雷猴', 30, 90)
</script>
```


### 设置描边颜色 strokeStyle

--- 

使用 strokeStyle 设置描边颜色。

```html
<canvas id="c" width="300" height="300" style="border: 1px solid #ccc;"></canvas>

<script>
  const cnv = document.getElementById('c')
  const cxt = cnv.getContext('2d')

  cxt.font = '60px Arial' // 将字号设置成 60px，方便观察
  cxt.strokeStyle = 'pink' // 设置文本描边颜色
  cxt.strokeText('你好', 30, 90)
</script>
```


### 填充 fillText

---

使用 fillText() 可填充文本。

语法和 strokeText() 一样。

`fillText(text, x, y, maxWidth)`



### 设置填充颜色 fillStyle

---

使用 fillStyle 可以设置文本填充颜色。

```html
<canvas id="c" width="300" height="300" style="border: 1px solid #ccc;"></canvas>

<script>
  const cnv = document.getElementById('c')
  const cxt = cnv.getContext('2d')

  cxt.font = '60px Arial'
  cxt.fillStyle = 'pink'
  cxt.fillText('雷猴', 30, 90)
</script>
```

### 获取文本长度 measureText()

---

measureText().width 方法可以获取文本的长度，单位是 px 。


### 水平对齐方式 textAlign

--- 

使用 textAlign 属性可以设置文字的水平对齐方式，一共有5个值可选

- `start` : 默认。在指定位置的横坐标开始。
- `end` : 在指定坐标的横坐标结束。
- `left` : 左对齐。
- `right` : 右对齐。
- `center` : 居中对齐。

[示例图](//p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c9f403d9ed3486ba8496a81f3c14779~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)


### 垂直对齐方式 textBaseline

---

使用 textBaseline 属性可以设置文字的垂直对齐方式。

在使用 textBaseline 前，需要自行了解 css 的文本基线。

textBaseline 可选属性：

- alphabetic: 默认。文本基线是普通的字母基线。
- top: 文本基线是 em 方框的顶端。
- bottom: 文本基线是 em 方框的底端。
- middle: 文本基线是 em 方框的正中。
- hanging: 文本基线是悬挂基线。

[示例图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f48b35482cb4bba8180788bdd5f1769~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

注意：在绘制文字的时候，默认是以文字的左下角作为参考点进行绘制


## 图片

渲染图片的方式有2中，一种是在JS里加载图片再渲染，另一种是把DOM里的图片拿到 canvas 里渲染。

`drawImage(image, dx, dy)`

- `image` : 要渲染的图片对象。
- `dx` : 图片左上角的横坐标位置。
- `dy` : 图片左上角的纵坐标位置。

在 JS 里加载图片并渲染，有以下几个步骤：

1. 创建 Image 对象
2. 引入图片
3. 等待图片加载完成
4. 使用 drawImage() 方法渲染图片

```html
<canvas id="c" width="500" height="500" style="border: 1px solid #ccc;"></canvas>

<script>
  const cnv = document.getElementById('c')
  const cxt = cnv.getContext('2d')

  // 1 创建 Image 对象
  const image = new Image()

  // 2 引入图片
  image.src = './images/dog.jpg'

  // 3 等待图片加载完成
  image.onload = () => {
    // 4 使用 drawImage() 方法渲染图片
    cxt.drawImage(image, 30, 30)
  }
</script>
```

DOM 渲染

```html
<style>
  #dogImg {
    display: none;
  }
</style>

<img src="./images/dog.jpg" id="dogImg"/>
<canvas id="c" width="500" height="500" style="border: 1px solid #ccc;"></canvas>

<script>
  const cnv = document.getElementById('c')
  const cxt = cnv.getContext('2d')

  const image = document.getElementById('dogImg')

  cxt.drawImage(image, 70, 70)
</script>
```

因为图片是从 DOM 里获取到的，所以一般来说，只要在 window.onload 这个生命周期内使用 drawImage 都可以正常渲染图片。


###　设置图片宽高

---

如果需要指定图片宽高，可以在前面的基础上再添加两个参数：

`drawImage(image, dx, dy, dw, dh)`

- `dw` : 用来定义图片的宽度
- `dh` : 定义图片的高度。




### 截取图片

---


截图图片同样使用drawImage() 方法，只不过传入的参数数量比之前都多，而且顺序也有点不一样了。

`drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)`

- `image` : 图片对象
- `sx` : 开始截取的横坐标
- `sy` : 开始截取的纵坐标
- `sw` : 截取的宽度
- `sh` : 截取的高度
- `dx` : 图片左上角的横坐标位置
- `dy` : 图片左上角的纵坐标位置
- `dw` : 图片宽度
- `dh` : 图片高度

以上参数缺一不可

```html
<canvas id="c" width="500" height="500" style="border: 1px solid #ccc;"></canvas>

<script>
  const cnv = document.getElementById('c')
  const cxt = cnv.getContext('2d')

  const image = new Image()
  image.src = './images/dog.jpg'

  image.onload = () => {
    cxt.drawImage(image, 0, 0, 100, 100, 30, 30, 200, 200)
  }
</script>
```
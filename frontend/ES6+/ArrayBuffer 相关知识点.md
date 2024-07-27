# ArrayBuffer 相关知识点

ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray视图和DataView视图）来读写，视图的作用是以指定格式解读二进制数据。

ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存区域。

```javascript
const buf = new ArrayBuffer(32);
// 上面代码生成了一段 32 字节的内存区域，每个字节的值默认都是 0。
// 可以看到，ArrayBuffer构造函数的参数是所需要的内存大小（单位字节）。

const buf = new ArrayBuffer(32);
const dataView = new DataView(buf);
dataView.getUint8(0) // 0
// 为了读写这段内容，需要为它指定视图。
// DataView视图的创建，需要提供ArrayBuffer对象实例作为参数。
```

## ArrayBuffer.prototype.byteLength

ArrayBuffer实例的byteLength属性，返回所分配的内存区域的字节长度。

注意：如果要分配的内存区域很大，有可能分配失败（因为没有那么多的连续空余内存），所以有必要检查是否分配成功。

```javascript
const buffer = new ArrayBuffer(32);
buffer.byteLength


if (buffer.byteLength === n) {
  // 成功
} else {
  // 失败
}
```

## ArrayBuffer.prototype.slice()

ArrayBuffer实例有一个slice方法，允许将内存区域的一部分，拷贝生成一个新的ArrayBuffer对象。

slice方法接受两个参数，第一个参数表示拷贝开始的字节序号（含该字节），第二个参数表示拷贝截止的字节序号（不含该字节）。如果省略第二个参数，则默认到原ArrayBuffer对象的结尾。

除了slice方法，ArrayBuffer对象不提供任何直接读写内存的方法，只允许在其上方建立视图，然后通过视图读写。

```javascript
const buffer = new ArrayBuffer(8);
const newBuffer = buffer.slice(0, 3);

// 上面代码拷贝buffer对象的前 3 个字节（从 0 开始，到第 3 个字节前面结束），生成一个新的ArrayBuffer对象。
// slice方法其实包含两步，第一步是先分配一段新内存，第二步是将原来那个ArrayBuffer对象拷贝过去。
```


## ArrayBuffer.isView()

ArrayBuffer有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例。这个方法大致相当于判断参数，是否为TypedArray实例或DataView实例。

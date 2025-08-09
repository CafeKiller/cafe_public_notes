---
title: NodeJS 学习手记
category: 后端开发
subcategory: NodeJS
level: 4
tags:
  - JavaScript
  - NodeJS
---

# NodeJS 学习手记

NodeJS 不是编程语言、也不是框架和库、是一个 `JavaScript` 运行时（环境）

能解析和执行 JavaScript 代码（严格来说应该是 ECMAScript 代码），构建于 `Chrome V8 JavaScript` 引擎之上，为 JavaScript 提供了服务端编程的能力（文件IO、网络IO......）

从技术角度它的能力和 Java、PHP、Python、Perl、Ruby 等服务端技术类似

> [!tips] 参考
> 
> [在线教程 - freeCodeCamp: NodeJ完全手册](https://www.freecodecamp.org/chinese/news/the-definitive-node-js-handbook/)
>
> [Github - Nodejs 小册](https://github.com/SunnySnail/nodejs-book)
>
> [书栈网 - Nodejs 入门教程](https://www.bookstack.cn/read/nodejs-tutorial/docs-00-course_introduction.md)

## 安装 NodeJS

node 的安装非常简单直接前往 [官网](https://nodejs.org/en/) 下载即可，傻瓜式执行安装程序。

安装完毕后，可以通过 `node -v` 命令查看当前安装的 node 版本。

node 的版本分为两种：`LTS` 长期支持版，适用于开发和生产环境；`Current` 最新版，适用于体验测试


```javascript
/**
 * FileName:   app.js
 **/
const http = require('http');
 
const hostname = '127.0.0.1';
const port = 3000;
 
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.end('Hello, 世界!\n');
});
 
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
```

```shell
# 简单运行一下 node 服务器吧
node app.js 
```

## 模块

`require` 模块导入

```javascript
// 核心模块
var fs = require('fs')

// 第三方模块
// npm install marked
var marked = require('marked')

// 用户模块（自己写的），正确的，正确的方式
// 注意：加载自己写的模块，相对路径不能省略 ./
var foo = require('./foo.js')

// 用户模块（自己写的），正确的（推荐），可以省略后缀名 .js
var foo = require('./foo')
```

---


`exports` 模块导出

**导出多个成员**

Node 为了降低开发人员的痛苦，所以为 `module.exports` 提供了一个别名 `exports` 

```javascript
console.log(exports === module.exports) // => true
exports.a = 123
exports.b = 456
exports.c = 789
exports.fn = function () { }
```

**导出单个成员**

```javascript
// 导出单个成员：错误的写法
// 因为每个模块最终导出是 module.exports 而不是 exports 这个别名
// exports = function (x, y) {
//   return x + y
// }

module.exports = 'hello'

// 以这个为准，后者会覆盖前者
// 导出单个成员：必须这么写
module.exports = function (x, y) {
  return x + y
}
```

### exports 和 module.exports 的区别

- 每个模块中都有一个 `module` 对象

- `module` 对象中有一个 `exports` 对象

- 我们可以把需要导出的成员都挂载到 `module.exports` 接口对象中

- 也就是：`moudle.exports.xxx = xxx` 的方式

- 但是每次都 `moudle.exports.xxx = xxx` 很麻烦，点儿的太多了

- 所以 Node 为了你方便，同时在每一个模块中都提供了一个成员叫：`exports`

- `exports === module.exports` 结果为 true

- 所以对于：`moudle.exports.xxx = xxx` 的方式 完全可以：`expots.xxx = xxx`

- 当一个模块需要导出单个成员的时候，这个时候必须使用：`module.exports = xxx` 的方式

- 不要使用 `exports = xxx` 不管用

- 因为每个模块最终向外 return 的是 `module.exports`

- 而 `exports` 只是 `module.exports` 的一个引用

- 所以即便你为 `exports = xx` 重新赋值，也不会影响 `module.exports`

- 但是有一种赋值方式比较特殊：`exports = module.exports` 这个用来重新建立引用关系的

```javascript
function fn() {
  // 每个模块内部有一个 module 对象
  // module 对象中有一个成员 exports 也是一个对象
  var module = {
    exports: {}
  }
  // 模块中同时还有一个成员 exports 等价于 module.exports
  var exports = module.exports
  console.log(exports === module.exports) // => true
  // 这样是可以的，因为 exports === module.exports
  // module.exports.a = 123
  // exports.b = 456
  // 这里重新赋值不管用，因为模块最后 return 的是 module.exports
  // exports = function () {
  // }
  // 这才是正确的方式
  module.exports = function () {
    console.log(123)
  }
  // 最后导出的是 module.exports
  return module.exports
}
var ret = fn()
console.log(ret)


// 特殊的导出方式
exports = module.exports = function () {
  console.log('默认函数被调用了')
}
exports.ajax = function () {
  console.log('ajax 方法被调用了')
}
exports.get = function () {
  console.log('get 方法被调用了')
}
```

### 模块分类

---
- **核心模块**

核心模块就是 node 内置的模块，需要通过唯一的标识名称来进行获取。

每一个核心模块基本上都是暴露了一个对象，里面包含一些方法供我们使用

一般在加载核心模块的时候，变量的起名最好就和核心模块的标识名同名即可。

核心模块本质上也是文件模块：

- 核心模块已经被编译到了 node 的可执行程序，一般看不到
- 可以通过查看 node 的源码看到核心模块文件
- 核心模块也是基于 CommonJS 模块规范

[内置模块列表](https://www.w3schools.com/nodejs/ref_modules.asp)

---
- **文件模块**

以 `./` 或 `../` 开头的模块标识就是文件模块，一般就是用户编写的。

---
- **第三方模块**

一般就是通过 `npm install` 安装的模块就是第三方模块。

加载规则如下：  

1. 如果不是文件模块，也不是核心模块  
2. node 会去 `node_modules` 目录中找（找跟你引用的名称一样的目录），例如这里 `require('underscore')`  
3. 如果在 `node_modules` 目录中找到 `underscore` 目录，则找该目录下的 `package.json` 文件  
4. 如果找到 `package.json` 文件，则找该文件中的 main 属性，拿到 main 指定的入口模块  
5. 如果过程都找不到，node 则取上一级目录下找 `node_modules` 目录，规则同上...  
6. 如果一直找到代码文件的根路径还找不到，则报错...

### 深入模块加载机制

![简易流程](https://static.sitestack.cn/projects/nodejs-tutorial/docs/assets/nodejs-require.jpg)

简而言之，如果 `require` 绝对路径的文件，查找时不会去遍历每一个 `node_modules` 目录，其速度最快。其余流程如下：

1. 从 `module path` 数组中取出第一个目录作为查找基准。
2. 直接从目录中查找该文件，如果存在，则结束查找。如果不存在，则进行下一条查找。
3. 尝试添加 `.js`、`.json`、`.node` 后缀后查找，如果存在文件，则结束查找。如果不存在，则进行下一条。
4. 尝试将require的参数作为一个包来进行查找，读取目录下的 `package.json` 文件，取得main参数指定的文件。
5. 尝试查找该文件，如果存在，则结束查找。如果不存在，则进行第3条查找。
6. 如果继续失败，则取出 `module path` 数组中的下一个目录作为基准查找，循环第1至5个步骤。
7. 如果继续失败，循环第1至6个步骤，直到 `module path` 中的最后一个值。
8. 如果仍然失败，则抛出异常。

整个查找过程十分类似原型链的查找和作用域的查找。所幸 NodeJS 对路径查找实现了缓存机制，否则由于每次判断路径都是同步阻塞式进行，会导致严重的性能消耗。

**具体流程图片**

![具体流程](https://static.sitestack.cn/projects/nodejs-tutorial/docs/assets/2015-07-15_55a6794639322.jpg)

## 文件操作

NodeJS 中提供了一系列的文件操作 API，这些 API 都封装在 `fs` 模块中。

fs模块对文件的几乎所有操作都有同步和异步两种形式，例如：`readFile()` 和 `readFileSync()`。

同步与异步文件系统调用的区别

- 同步调用立即执行，会阻塞后续代码继续执行，如果想要捕获异常需要使用 `try-catch`
- 异步调用不会阻塞后续代码继续执行，需要回调函数作为额外的参数，通常包含一个错误作为回调函数的第一个参数
- 异步调用通过判断第一个 `err` 对象来处理异常
- 异步调用结果往往通过回调函数来进行获取

Node 只在文件IO操作中，提供了同步调用和异步调用两种形式，两者可以结合使用，但是推荐能使用异步调用解决问题的情况下，少用同步调用。

- 同步会阻塞程序的执行，效率低
- 异步相当于多找了一个人帮你干活，效率高
- 所以建议：尽量使用异步

### 常用API

| API_NAME                                      | 作用        | 备注      |
| --------------------------------------------- | --------- | ------- |
| `fs.access(path, callback)`                   | 判断路径是否存在  |         |
| `fs.appendFile(file, data, callback)`         | 向文件中追加内容  |         |
| `fs.copyFile(src, callback)`                  | 复制文件      |         |
| `fs.mkdir(path, callback)`                    | 创建目录      |         |
| `fs.readDir(path, callback)`                  | 读取目录列表    |         |
| `fs.rename(oldPath, newPath, callback)`       | 重命名文件/目录  |         |
| `fs.rmdir(path, callback)`                    | 删除目录      | 只能删除空目录 |
| `fs.stat(path, callback)`                     | 获取文件/目录信息 |         |
| `fs.unlink(path, callback)`                   | 删除文件      |         |
| `fs.watch(filename[, options][, listener])`   | 监视文件/目录   |         |
| `fs.watchFile(filename[, options], listener)` | 监视文件      |         |

> 简单做几个示例

```javascript
// 异步读文件
import { readFile } from 'node:fs';

console.log('BEGIN');

readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

console.log('END');

// 同步读文件
import { readFileSync } from 'node:fs';

console.log('BEGIN');

try {
    let s = readFileSync('sample.txt', 'utf-8');
    console.log(s);
} catch (err) {
    console.log(err);
}
console.log('END');
```


### Path模块

Path 模块是 NodeJS 中用于处理文件路径的模块，提供了一系列的方法，用于处理文件路径。

```javascript
const path = require('path');

// 获取一个路径的文件名部分
path.basename('/foo/bar/baz/asdf/quux.html'); // 'quux.html'
path.basename('/foo/bar/baz/asdf/quux.html', '.html'); // 'quux'


// 获取一个路径的目录部分
path.dirname('/foo/bar/baz/asdf/quux'); // '/foo/bar/baz/asdf'


// 获取一个路径的后缀名部分
path.extname('index.html'); // '.html'
path.extname('index.coffee.md');  // '.md'
path.extname('index.'); // '.'
path.extname('index');  // ''
path.extname('.index'); // ''


// 将一个路径转换为一个对象，得到路径的各个组成部分
path.parse('/home/user/dir/file.txt');  
/*
{ 
  root: '/', 
  dir: '/home/user/dir', 
  base: 'file.txt', 
  ext: '.txt', 
  name: 'file' 
}
*/ 


// 将具有特定属性的对象转换为一个路径
path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt'
});
// '/home/user/dir/file.txt'


// 将多个路径拼接为一个
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'); // '/foo/bar/baz/asdf'


// 判断一个路径是否是绝对路径
// [Unix]
path.isAbsolute('/foo/bar'); // true
path.isAbsolute('/baz/..');  // true
path.isAbsolute('qux/');     // false
path.isAbsolute('.');        // false

// [Windows]
path.isAbsolute('//server');    // true
path.isAbsolute('\\\\server');  // true
path.isAbsolute('C:/foo/..');   // true
path.isAbsolute('C:\\foo\\..'); // true
path.isAbsolute('bar\\baz');    // false
path.isAbsolute('bar/baz');     // false
path.isAbsolute('.');           // false


// 将一个非标准路径标准化
path.normalize('/foo/bar//baz/asdf/quux/..'); // '/foo/bar/baz/asdf'
path.normalize('C:\\temp\\\\foo\\bar\\..\\'); // 'C:\\temp\\foo\\'
```

### Stream流

stream 是 Node 提供的又一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。

什么是流？流是一种抽象的数据结构。想象水流，当在水管中流动时，就可以从某个地方源源不断地到达另一个地方。我们也可以把数据看成是数据流，比如你敲键盘的时候，就可以把每个字符依次连起来，看成字符流。这个流是从键盘输入到应用程序，实际上它还对应着一个名字：标准输入流。

如果应用程序把字符一个一个输出到显示器上，这也可以看成是一个流，这个流也有名字：标准输出流。流的特点是数据是有序的，而且必须依次读取，或者依次写入，不能像 Array 那样随机定位。

有些流用来读取数据，比如从文件读取数据时，可以打开一个文件流，然后从文件流中不断地读取数据。有些流用来写入数据，比如向文件写入数据时，只需要把数据不断地往文件流中写进去就可以了。

在 Node 中，流也是一个对象，我们只需要响应流的事件就可以了：  
- `data` 事件表示流的数据已经可以读取了；  
- `end` 事件表示这个流已经到末尾了，没有数据可以读取了；  
- `error` 事件表示出错了。

```javascript
import { createWriteStream } from 'node:fs';

let ws = createWriteStream('output.txt', 'utf-8');
ws.write('使用Stream写入文本数据...\n');
ws.write('继续写入...\n');
ws.write('DONE.\n');
ws.end(); // 结束写入

// 写入二进制数据:
let b64array = [ ... ];

let ws2 = createWriteStream('output.png');
for (let b64 of b64array) {
    let buf = Buffer.from(b64, 'base64');
    ws2.write(buf); // 写入Buffer对象
}
ws2.end(); // 结束写入
```

### pipe

就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个 `Readable` 流和一个 `Writable` 流串起来后，所有的数据自动从 `Readable` 流进入 `Writable` 流，这种操作叫 `pipe`。

在 Node 中，`Readable` 流有一个 `pipe()` 方法，就是用来干这件事的。

除了直接使用 `pipe()` 方法，Node 还提供了 `pipeline` 功能，它可以将一个流输出到另一个流。

```javascript
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from 'node:stream/promises';

async function copy(src, dest) {
    let rs = createReadStream(src);
    let ws = createWriteStream(dest);
    await pipeline(rs, ws);
}

copy('sample.txt', 'output.txt')
    .then(() => console.log('copied.'))
    .catch(err => console.log(err));
```

使用 `pipeline` 的好处是，它可以添加若干个转换器，即输入流经过若干转换后，再进入输出流。如果我们添加的转换器实现了gzip功能，那么实际上就可以把输入流自动压缩后进入输出流。
# HTML 进阶知识

> 主要参考资料/书籍/文章:    
> [JavaScript高级程序设计](https://book.douban.com/subject/35175321/)  
> [阮一峰的 HTML 教程](https://wangdoc.com/html/)

## `<script>` 标签

script 标签的主要作用是加载 Javascript 代码，也可以用于引入外部javascript 脚本。  

该标签除了最常见的 src 属性以外，还有其余几个：

- type：默认值一般是 "text/javascript" 或者是 "text/ecmascript"，但需要注意的是这两者其实都是已经被废弃了的，目前正确的写法应该是："application/x-javascript"。(IE浏览器中还有"application/javascript" 和 "application/ecmascript")，当使用 "module" 时表示这是一个 ES6 模块，不是传统的脚本。对于不支持 ES6 模块的浏览器则可以使用："nomodule"。

- async：该属性指定 JavaScript 代码为异步执行，不是造成阻塞效果，JavaScript 代码默认是同步执行。

- defer：该属性指定 JavaScript 代码不是立即执行，而是页面解析完成后执行。

- crossorigin：如果采用这个属性，就会采用跨域的方式加载外部脚本，即 HTTP 请求的头信息会加上origin字段。

- integrity：给出外部脚本的哈希值，防止脚本被篡改。只有哈希值相符的外部脚本，才会执行。

- referrerpolicy：HTTP 请求的Referer字段的处理方法。

- charset：使用 src 属性指定的代码字符集，较少使用。

- language：已废弃，被 type 属性取代。

关于 < script > 标签的位置放置，很多人喜欢把它放到 < head > 标签内，但这样对于那些需要很多 JS 处理比较不好，因为用户需要等待脚本加载完成后才能看到页面；建议是放置到 < body > 主体内容的后面，这样就是加载好页面后立即加载脚本，体验会好很多。  

> 需要注意的是 JavaScript 文件的拓展名是.js，但这其实不是必需的，因为浏览器并不会检查包括 Javascript 文件在内的文件扩展名。这就为使用服务器端脚本语言动态生成 Javascript 代码或者在浏览器中将 Javascript 扩展文件转译为 Javascript 提供了可能性(如: Typescript、JSX 和 Vue)。不过需要注意，服务器经常会根据文件拓展名来去顶响应的正确 MIME 类型，如果不打算使用 .js 作为扩展名，这方面需要处理好。

## `<noscript>` 标签

`<noscript>` 标签用于浏览器不支持或关闭 JavaScript 时，所要显示的内容。用户关闭 JavaScript 可能是为了节省带宽，以延长手机电池寿命，或者为了防止追踪，保护隐私。

```html
<noscript>
  您的浏览器不能执行 JavaScript 语言，页面无法正常显示。
</noscript>
```

## `<link>` 标签

`<link>` 标签主要用于将当前网页与相关的外部资源联系起来，通常放在 `<head>` 元素里面。最常见的用途就是加载 CSS 样式表。  

除了默认样式表，网页还可以加载替代样式表，即默认不生效、需要用户手动切换的样式表。  

```html
<link href="default.css" rel="stylesheet" title="Default Style">
<link href="fancy.css" rel="alternate stylesheet" title="Fancy">
<link href="basic.css" rel="alternate stylesheet" title="Basic">

<!-- 
 上面代码中，default.css是默认样式表，默认就会生效。fancy.css和basic.css是替换样式表（rel="alternate stylesheet"），默认不生效。
 title属性在这里是必需的，用来在浏览器菜单里面列出这些样式表的名字，供用户选择，以替代默认样式表。   
 -->
```

### ref 属性

rel 属性表示外部资源与当前文档之间的关系，是`<link>`标签的必需属性，可以视为对 href 属性所链接资源的说明，它的值非常多，较有用的如下：

- alternate：文档的另一种表现形式的链接，比如打印版。
- author：文档作者的链接。
- dns-prefetch：要求浏览器提前执行指定网址的 DNS 查询。
- help：帮助文档的链接。
- icon：加载文档的图标文件。
- license：许可证链接。
- next：系列文档下一篇的链接。
- pingback：接收当前文档 pingback 请求的网址。
- preconnect：要求浏览器提前与给定服务器，建立 HTTP 连接。
- prefetch：要求浏览器提前下载并缓存指定资源，供下一个页面使用。它的优先级较低，浏览器可以不下载。
- preload：要求浏览器提前下载并缓存指定资源，当前页面稍后就会用到。它的优先级较高，浏览器必须立即下载。
- prerender：要求浏览器提前渲染指定链接。这样的话，用户稍后打开该链接，就会立刻显示，感觉非常快。
- prev：表示当前文档是系列文档的一篇，这里给出上一篇文档的链接。
- search：提供当前网页的搜索链接。
- stylesheet：加载一张样式表。

### hreflang 属性

hreflang属性用来表示href属性链接资源的所用语言，通常指当前页面的其他语言版本。  

如果一个页面有多个语言的版本，hreflang属性可以设为x-default，表示哪一个页面是默认版本。  

```html
<link href="https://example.com" rel="alternate" hreflang="x-default" />
<link href="https://example.com/de" rel="alternate" hreflang="de" />
```

### 资源加载

> 使用 link 标签进行资源的预加载方式其实有很多种, 如：preload、prefetch、preconnect、dns-prefetch、prerender，他们的功能基本都是相同的，只是适用的场景不同而已，此处主要介绍 preload 其余方式，都和它差不多，且在上文 ref 属性中有过简短介绍了。

`<link rel="preload">` 告诉浏览器尽快下载并缓存资源（如脚本或样式表），该指令优先级较高，浏览器肯定会执行。当加载页面几秒钟后需要该资源时，它会很有用。下载后，浏览器不会对资源执行任何操作，脚本未执行，样式表未应用。它只是缓存，当其他东西需要它时，它立即可用。

`rel="preload"` 除了优先级较高，还有两个优点：一是允许指定预加载资源的类型，二是允许 onload 事件的回调函数。下面是 rel="preload" 配合 as 属性，告诉浏览器预处理资源的类型，以便正确处理。

```html
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="main.js" as="script">
```

`as` 属性指定加载资源的类型，它的值一般这几种: `"script"` `"style"` `"image"` `"media"` `"document"`  

如果不指定as属性，或者它的值是浏览器不认识的，那么浏览器会以较低的优先级下载这个资源。


### 其他属性

- crossorigin：加载外部资源的跨域设置。
- href：外部资源的网址。
- referrerpolicy：加载时Referer头信息字段的处理方法。
- as：rel="preload"或rel="prefetch"时，设置外部资源的类型。
- type：外部资源的 MIME 类型，目前仅用于rel="preload"或rel="prefetch"的情况。
- title：加载样式表时，用来标识样式表的名称。
- sizes：用来声明图标文件的尺寸，比如加载苹果手机的图标文件。

---
title: HTML 学习手记
category: WEB前端
subcategory: HTML
level: 1
tags:
  - HTML
---

# HTML 基础学习

> [!tip] 参考
> 
> [阮一峰网道教程 - HTML教程](https://wangdoc.com/html/)

## link 标签

- `href` 表示标签所链接的资源

- `rel` 表示外部资源与当前文档之间的关系，是 `<link>` 签的必需属性，可以视为对href属性所链接资源的说明。
  - `alternate` ：文档的另一种表现形式的链接，比如打印版。
  - `author` ：文档作者的链接。
  - `dns-prefetch` ：要求浏览器提前执行指定网址的 DNS 查询。
  - `help` ：帮助文档的链接。
  - `icon` ：加载文档的图标文件。
  - `license` ：许可证链接。
  - `next` ：系列文档下一篇的链接。
  - `pingback` ：接收当前文档 pingback 请求的网址。
  - `preconnect` ：要求浏览器提前与给定服务器，建立 HTTP 连接。
  - `prefetch` ：要求浏览器提前下载并缓存指定资源，供下一个页面使用。它的优先级较低，浏览器可以不下载。
  - `preload` ：要求浏览器提前下载并缓存指定资源，当前页面稍后就会用到。它的优先级较高，浏览器必须立即下载。
  - `prerender` ：要求浏览器提前渲染指定链接。这样的话，用户稍后打开该链接，就会立刻显示，感觉非常快。
  - `prev` ：表示当前文档是系列文档的一篇，这里给出上一篇文档的链接。
  - `search` ：提供当前网页的搜索链接。
  - `stylesheet` ：加载一张样式表。

```html
<!-- 作者信息 -->
<link rel="author" href="humans.txt">

<!-- 版权信息 -->
<link rel="license" href="copyright.html">

<!-- 另一个语言的版本 -->
<link rel="alternate" href="https://es.example.com/" hreflang="es">

<!-- 联系方式 -->
<link rel="me" href="https://google.com/profiles/someone" type="text/html">
<link rel="me" href="mailto:name@example.com">
<link rel="me" href="sms:+15035550125">

<!-- 历史资料 -->
<link rel="archives" href="http://example.com/archives/">

<!-- 目录 -->
<link rel="index" href="http://example.com/article/">

<!-- 导航 -->
<link rel="first" href="http://example.com/article/">
<link rel="last" href="http://example.com/article/?page=42">
<link rel="prev" href="http://example.com/article/?page=1">
<link rel="next" href="http://example.com/article/?page=3">
```

- `hreflang` 用来表示 href 属性链接资源的所用语言，通常指当前页面的其他语言版本。

- `media` 给出外部资源生效的媒介条件

```html
<link rel="preload" as="image" href="map.png" media="(max-width: 600px)">
<link rel="preload" as="script" href="map.js" media="(min-width: 601px)">
```

- `crossorigin` : 加载外部资源的跨域设置。

- `href` : 外部资源的网址。

- `referrerpolicy` : 加载时 Referer 头信息字段的处理方法。

- `as` : rel="preload" 或 rel="prefetch" 时，设置外部资源的类型。

- `type` : 外部资源的 MIME 类型，目前仅用于 rel="preload" 或 rel="prefetch" 的情况。

- `title` : 加载样式表时，用来标识样式表的名称。

- `sizes` : 用来声明图标文件的尺寸，比如加载苹果手机的图标文件。

## script 标签

用于加载脚本代码，目前主要是加载 JavaScript 代码。

`type` 属性给出脚本的类型，默认是 JavaScript 代码，所以可省略。

`type` 属性也可以设成module，表示这是一个 ES6 模块，不是传统脚本

```html
<script type="text/javascript" src="javascript.js"></script>

<script type="module" src="main.js"></script>
```

对于那些不支持 ES6 模块的浏览器，可以设置 nomodule 属性。支持 ES6 模块的浏览器，会不加载指定的脚本。这个属性通常与 `type="module"` 配合使用，作为老式浏览器的回退方案。

```html
<script type="module" src="main.js"></script>
<script nomodule src="fallback.js"></script>
```

### 其他属性

``async`` : 该属性指定 JavaScript 代码为异步执行，不是造成阻塞效果，JavaScript 代码默认是同步执行。

``defer`` : 该属性指定 JavaScript 代码不是立即执行，而是页面解析完成后执行。

``crossorigin`` : 如果采用这个属性，就会采用跨域的方式加载外部脚本，即 HTTP 请求的头信息会加上 origin 字段。

``integrity`` : 给出外部脚本的哈希值，防止脚本被篡改。只有哈希值相符的外部脚本，才会执行。

``nonce`` : 一个密码随机数，由服务器在 HTTP 头信息里面给出，每次加载脚本都不一样。它相当于给出了内嵌脚本的白名单，只有在白名单内的脚本才能执行。

``referrerpolicy`` : HTTP 请求的 Referer 字段的处理方法。

## noscript 标签

`<noscript>` 标签用于浏览器不支持或关闭 JavaScript 时，所要显示的内容。用户关闭 JavaScript 可能是为了节省带宽，以延长手机电池寿命，或者为了防止追踪，保护隐私。

## iframe 标签

`<iframe>` 标签生成一个指定区域，在该区域中嵌入其他网页。它是一个容器元素，如果浏览器不支持 `<iframe>` ，就会显示内部的子元素。

```html
<iframe src="https://www.example.com"
        width="100%" height="500" frameborder="0"
        allowfullscreen sandbox>
  <p><a href="https://www.example.com">点击打开嵌入页面</a></p>
</iframe>
<!-- 上面的代码在当前网页嵌入https://www.example.com，显示区域的宽度是100%，高度是500像素。如果当前浏览器不支持<iframe>，则会显示一个链接，让用户点击。 -->
```

浏览器普遍支持 iframe ，所以内部的子元素可以不写。

### 可用属性

`allowfullscreen` : 允许嵌入的网页全屏显示，需要全屏 API 的支持，请参考相关的 JavaScript 教程。

`frameborder` : 是否绘制边框，0为不绘制，1为绘制（默认值）。建议尽量少用这个属性，而是在 CSS 里面设置样式。

`src` : 嵌入的网页的 URL。

`width` : 显示区域的宽度。

`height` : 显示区域的高度。

`sandbox` : 设置嵌入的网页的权限。

`importance` : 浏览器下载嵌入的网页的优先级，可以设置三个值。high表示高优先级，low表示低优先级，auto表示由浏览器自行决定。

`name` : 内嵌窗口的名称，可以用于`<a>、<form>、<base>`的target属性。

`referrerpolicy` : 请求嵌入网页时，HTTP 请求的Referer字段的设置。参见`<a>`标签的介绍。

### sandbox 属性

嵌入的网页默认具有正常权限，比如执行脚本、提交表单、弹出窗口等。如果嵌入的网页是其他网站的页面，你不了解对方会执行什么操作，因此就存在安全风险。为了限制 iframe 的风险，HTML 提供了sandbox属性，允许设置嵌入的网页的权限，等同于提供了一个隔离层，即“沙箱”。

sandbox可以当作布尔属性使用，表示打开所有限制。

```html
<iframe src="https://www.example.com" sandbox>
</iframe>
```

sandbox属性可以设置具体的值，表示逐项打开限制。未设置某一项，就表示不具有该权限。

- `allow-forms` : 允许提交表单。

- `allow-modals` : 允许提示框，即允许执行window.alert()等会产生弹出提示框的 JavaScript 方法。

- `allow-popups` : 允许嵌入的网页使用window.open()方法弹出窗口。

- `allow-popups-to-escape-sandbox` : 允许弹出窗口不受沙箱的限制。

- `allow-orientation-lock` : 允许嵌入的网页用脚本锁定屏幕的方向，即横屏或竖屏。

- `allow-pointer-lock` : 允许嵌入的网页使用 Pointer Lock API，锁定鼠标的移动。

- `allow-presentation` : 允许嵌入的网页使用 Presentation API。

- `allow-same-origin` : 不打开该项限制，将使得所有加载的网页都视为跨域。

- `allow-scripts` : 允许嵌入的网页运行脚本（但不创建弹出窗口）。

- `allow-storage-access-by-user-activation` : sandbox属性同时设置了这个值和allow-same-origin的情况下，允许 iframe 嵌入的第三方网页通过用户发起 `document.requestStorageAccess()` 请求，经由 Storage Access API 访问父窗口的 Cookie。

- `allow-top-navigation` : 允许嵌入的网页对顶级窗口进行导航。

- `allow-top-navigation-by-user-activation` : 允许嵌入的网页对顶级窗口进行导航，但必须由用户激活。

- `allow-downloads-without-user-activation` : 允许在没有用户激活的情况下，嵌入的网页启动下载。

### loading 属性

iframe 指定的网页会立即加载，有时这不是希望的行为。 iframe 滚动进入视口以后再加载，这样会比较节省带宽。

loading属性可以触发 iframe 网页的懒加载。该属性可以取以下三个值。

- `auto` : 浏览器的默认行为，与不使用loading属性效果相同。

- `lazy` : iframe 的懒加载，即将滚动进入视口时开始加载。

- `eager` : 立即加载资源，无论在页面上的位置如何。

```html
<iframe src="https://example.com" loading="lazy"></iframe>
```

> 有一点需要注意，如果 iframe 是隐藏的，则loading属性无效，将会立即加载。
> 
> 只要满足以下任一个条件，Chrome 浏览器就会认为 iframe 是隐藏的。
> 
> - `<iframe>` 的宽度和高度为4像素或更小。
> - 样式设为 `display: none` 或 `visibility: hidden`。
> - 使用定位坐标为负X或负Y，将 `<iframe>` 放置在屏幕外。

## 表单标签

表单（form）是用户输入信息与网页互动的一种形式。大多数情况下，用户提交的信息会发给服务器，比如网站的搜索栏就是表单。

表单由一种或多种的小部件组成，比如输入框、按钮、单选框或复选框。这些小部件称为控件（controls）。

```html
<form action="https://example.com/api" method="post">
  <label for="POST-name">用户名：</label>
  <input id="POST-name" type="text" name="user">
  <input type="submit" value="提交">
</form>
```
`<form>` 有以下属性

- `accept-charset` : 服务器接受的字符编码列表，使用空格分隔，默认与网页编码相同。

- `action` : 服务器接收数据的 URL。

- `autocomplete` : 如果用户没有填写某个控件，浏览器是否可以自动填写该值。它的可能取值分别为off（不自动填写）和on（自动填写）。

- `method` : 提交数据的 HTTP 方法，可能的值有post（表单数据作为 HTTP 数据体发送），get（表单数据作为 URL 的查询字符串发送），dialog（表单位于`<dialog>`内部使用）。

- `enctype` : 当 method 属性等于 post 时，该属性指定提交给服务器的 MIME 类型。可能的值为 `application/x-www-form-urlencoded`（默认值），`multipart/form-data`（文件上传的情况），`text/plain`。

- `name` : 表单的名称，应该在网页中是唯一的。注意，如果一个控件没有设置name属性，那么这个控件的值就不会作为键值对，向服务器发送。

- `novalidate` : 布尔属性，表单提交时是否取消验证。

- `target` : 在哪个窗口展示服务器返回的数据，可能的值有_self（当前窗口），_blank（新建窗口），_parent（父窗口），_top（顶层窗口），`<iframe>`标签的name属性（即表单返回结果展示在`<iframe>`窗口）。
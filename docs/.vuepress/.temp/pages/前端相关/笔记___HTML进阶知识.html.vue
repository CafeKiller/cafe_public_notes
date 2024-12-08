<template><div><h1 id="html-进阶知识" tabindex="-1"><a class="header-anchor" href="#html-进阶知识"><span>HTML 进阶知识</span></a></h1>
<blockquote>
<p>主要参考资料/书籍/文章:<br>
<a href="https://book.douban.com/subject/35175321/" target="_blank" rel="noopener noreferrer">JavaScript高级程序设计</a><br>
<a href="https://wangdoc.com/html/" target="_blank" rel="noopener noreferrer">阮一峰的 HTML 教程</a></p>
</blockquote>
<h2 id="script-标签" tabindex="-1"><a class="header-anchor" href="#script-标签"><span><code v-pre>&lt;script&gt;</code> 标签</span></a></h2>
<p>script 标签的主要作用是加载 Javascript 代码，也可以用于引入外部javascript 脚本。</p>
<p>该标签除了最常见的 src 属性以外，还有其余几个：</p>
<ul>
<li>
<p>type：默认值一般是 &quot;text/javascript&quot; 或者是 &quot;text/ecmascript&quot;，但需要注意的是这两者其实都是已经被废弃了的，目前正确的写法应该是：&quot;application/x-javascript&quot;。(IE浏览器中还有&quot;application/javascript&quot; 和 &quot;application/ecmascript&quot;)，当使用 &quot;module&quot; 时表示这是一个 ES6 模块，不是传统的脚本。对于不支持 ES6 模块的浏览器则可以使用：&quot;nomodule&quot;。</p>
</li>
<li>
<p>async：该属性指定 JavaScript 代码为异步执行，不是造成阻塞效果，JavaScript 代码默认是同步执行。</p>
</li>
<li>
<p>defer：该属性指定 JavaScript 代码不是立即执行，而是页面解析完成后执行。</p>
</li>
<li>
<p>crossorigin：如果采用这个属性，就会采用跨域的方式加载外部脚本，即 HTTP 请求的头信息会加上origin字段。</p>
</li>
<li>
<p>integrity：给出外部脚本的哈希值，防止脚本被篡改。只有哈希值相符的外部脚本，才会执行。</p>
</li>
<li>
<p>referrerpolicy：HTTP 请求的Referer字段的处理方法。</p>
</li>
<li>
<p>charset：使用 src 属性指定的代码字符集，较少使用。</p>
</li>
<li>
<p>language：已废弃，被 type 属性取代。</p>
</li>
</ul>
<p>关于 &lt; script &gt; 标签的位置放置，很多人喜欢把它放到 &lt; head &gt; 标签内，但这样对于那些需要很多 JS 处理比较不好，因为用户需要等待脚本加载完成后才能看到页面；建议是放置到 &lt; body &gt; 主体内容的后面，这样就是加载好页面后立即加载脚本，体验会好很多。</p>
<blockquote>
<p>需要注意的是 JavaScript 文件的拓展名是.js，但这其实不是必需的，因为浏览器并不会检查包括 Javascript 文件在内的文件扩展名。这就为使用服务器端脚本语言动态生成 Javascript 代码或者在浏览器中将 Javascript 扩展文件转译为 Javascript 提供了可能性(如: Typescript、JSX 和 Vue)。不过需要注意，服务器经常会根据文件拓展名来去顶响应的正确 MIME 类型，如果不打算使用 .js 作为扩展名，这方面需要处理好。</p>
</blockquote>
<h2 id="noscript-标签" tabindex="-1"><a class="header-anchor" href="#noscript-标签"><span><code v-pre>&lt;noscript&gt;</code> 标签</span></a></h2>
<p><code v-pre>&lt;noscript&gt;</code> 标签用于浏览器不支持或关闭 JavaScript 时，所要显示的内容。用户关闭 JavaScript 可能是为了节省带宽，以延长手机电池寿命，或者为了防止追踪，保护隐私。</p>
<div class="language-html line-numbers-mode" data-highlighter="shiki" data-ext="html" data-title="html" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">noscript</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  您的浏览器不能执行 JavaScript 语言，页面无法正常显示。</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">noscript</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="link-标签" tabindex="-1"><a class="header-anchor" href="#link-标签"><span><code v-pre>&lt;link&gt;</code> 标签</span></a></h2>
<p><code v-pre>&lt;link&gt;</code> 标签主要用于将当前网页与相关的外部资源联系起来，通常放在 <code v-pre>&lt;head&gt;</code> 元素里面。最常见的用途就是加载 CSS 样式表。</p>
<p>除了默认样式表，网页还可以加载替代样式表，即默认不生效、需要用户手动切换的样式表。</p>
<div class="language-html line-numbers-mode" data-highlighter="shiki" data-ext="html" data-title="html" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">link</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> href</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"default.css"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> rel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"stylesheet"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> title</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Default Style"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">link</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> href</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"fancy.css"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> rel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"alternate stylesheet"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> title</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Fancy"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">link</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> href</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"basic.css"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> rel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"alternate stylesheet"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> title</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Basic"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">&#x3C;!-- </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> 上面代码中，default.css是默认样式表，默认就会生效。fancy.css和basic.css是替换样式表（rel="alternate stylesheet"），默认不生效。</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> title属性在这里是必需的，用来在浏览器菜单里面列出这些样式表的名字，供用户选择，以替代默认样式表。   </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> --></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ref-属性" tabindex="-1"><a class="header-anchor" href="#ref-属性"><span>ref 属性</span></a></h3>
<p>rel 属性表示外部资源与当前文档之间的关系，是<code v-pre>&lt;link&gt;</code>标签的必需属性，可以视为对 href 属性所链接资源的说明，它的值非常多，较有用的如下：</p>
<ul>
<li>alternate：文档的另一种表现形式的链接，比如打印版。</li>
<li>author：文档作者的链接。</li>
<li>dns-prefetch：要求浏览器提前执行指定网址的 DNS 查询。</li>
<li>help：帮助文档的链接。</li>
<li>icon：加载文档的图标文件。</li>
<li>license：许可证链接。</li>
<li>next：系列文档下一篇的链接。</li>
<li>pingback：接收当前文档 pingback 请求的网址。</li>
<li>preconnect：要求浏览器提前与给定服务器，建立 HTTP 连接。</li>
<li>prefetch：要求浏览器提前下载并缓存指定资源，供下一个页面使用。它的优先级较低，浏览器可以不下载。</li>
<li>preload：要求浏览器提前下载并缓存指定资源，当前页面稍后就会用到。它的优先级较高，浏览器必须立即下载。</li>
<li>prerender：要求浏览器提前渲染指定链接。这样的话，用户稍后打开该链接，就会立刻显示，感觉非常快。</li>
<li>prev：表示当前文档是系列文档的一篇，这里给出上一篇文档的链接。</li>
<li>search：提供当前网页的搜索链接。</li>
<li>stylesheet：加载一张样式表。</li>
</ul>
<h3 id="hreflang-属性" tabindex="-1"><a class="header-anchor" href="#hreflang-属性"><span>hreflang 属性</span></a></h3>
<p>hreflang属性用来表示href属性链接资源的所用语言，通常指当前页面的其他语言版本。</p>
<p>如果一个页面有多个语言的版本，hreflang属性可以设为x-default，表示哪一个页面是默认版本。</p>
<div class="language-html line-numbers-mode" data-highlighter="shiki" data-ext="html" data-title="html" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">link</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> href</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"https://example.com"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> rel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"alternate"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> hreflang</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"x-default"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">link</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> href</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"https://example.com/de"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> rel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"alternate"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> hreflang</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"de"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="资源加载" tabindex="-1"><a class="header-anchor" href="#资源加载"><span>资源加载</span></a></h3>
<blockquote>
<p>使用 link 标签进行资源的预加载方式其实有很多种, 如：preload、prefetch、preconnect、dns-prefetch、prerender，他们的功能基本都是相同的，只是适用的场景不同而已，此处主要介绍 preload 其余方式，都和它差不多，且在上文 ref 属性中有过简短介绍了。</p>
</blockquote>
<p><code v-pre>&lt;link rel=&quot;preload&quot;&gt;</code> 告诉浏览器尽快下载并缓存资源（如脚本或样式表），该指令优先级较高，浏览器肯定会执行。当加载页面几秒钟后需要该资源时，它会很有用。下载后，浏览器不会对资源执行任何操作，脚本未执行，样式表未应用。它只是缓存，当其他东西需要它时，它立即可用。</p>
<p><code v-pre>rel=&quot;preload&quot;</code> 除了优先级较高，还有两个优点：一是允许指定预加载资源的类型，二是允许 onload 事件的回调函数。下面是 rel=&quot;preload&quot; 配合 as 属性，告诉浏览器预处理资源的类型，以便正确处理。</p>
<div class="language-html line-numbers-mode" data-highlighter="shiki" data-ext="html" data-title="html" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">link</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> rel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"preload"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> href</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"style.css"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"style"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">link</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> rel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"preload"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> href</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"main.js"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"script"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>as</code> 属性指定加载资源的类型，它的值一般这几种: <code v-pre>&quot;script&quot;</code> <code v-pre>&quot;style&quot;</code> <code v-pre>&quot;image&quot;</code> <code v-pre>&quot;media&quot;</code> <code v-pre>&quot;document&quot;</code></p>
<p>如果不指定as属性，或者它的值是浏览器不认识的，那么浏览器会以较低的优先级下载这个资源。</p>
<h3 id="其他属性" tabindex="-1"><a class="header-anchor" href="#其他属性"><span>其他属性</span></a></h3>
<ul>
<li>crossorigin：加载外部资源的跨域设置。</li>
<li>href：外部资源的网址。</li>
<li>referrerpolicy：加载时Referer头信息字段的处理方法。</li>
<li>as：rel=&quot;preload&quot;或rel=&quot;prefetch&quot;时，设置外部资源的类型。</li>
<li>type：外部资源的 MIME 类型，目前仅用于rel=&quot;preload&quot;或rel=&quot;prefetch&quot;的情况。</li>
<li>title：加载样式表时，用来标识样式表的名称。</li>
<li>sizes：用来声明图标文件的尺寸，比如加载苹果手机的图标文件。</li>
</ul>
</div></template>



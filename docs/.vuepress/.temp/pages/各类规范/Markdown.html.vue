<template><div><h1 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h1>
<p>相信阅读本文的读者一定有被 Markdown 灵活的写作风格搞懵过，不知道怎么写更优雅、更规范，那么本文就是来帮您梳理 Markdown 写作过程中常见的一些问题，然后给出一个建议的应用规范。</p>
<p>通过阅读本文，相信你一定可以基于 Markdown 写出更加优雅的中文文档。</p>
<p>本文虽然说是基于 Markdown 来进行编写的，但也可以使用在其他纯文本的文档格式中；良好的书写规范对每个人都是非常有益的。</p>
<h1 id="关于-markdown" tabindex="-1"><a class="header-anchor" href="#关于-markdown"><span>关于 Markdown</span></a></h1>
<p>Markdown 是由 <a href="https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/John_Gruber" target="_blank" rel="noopener noreferrer">John Gruber</a> 于 2004 年创建的一种文本标记语言，目的是让人们使用“直观的、便于阅读的纯文本格式”书写文档。</p>
<p>与类似于 HTML 标记语言用于展示网页不同，Markdown 被设计用来 专注于文本写作；与 world 不同，Markdown 只有输入文本字符，没有复杂的格式控制，Markdown 仅通过数个文本标记符来实现简单的格式控制，让写作回归写作。</p>
<h1 id="markdown-语法规范" tabindex="-1"><a class="header-anchor" href="#markdown-语法规范"><span>Markdown 语法规范</span></a></h1>
<p>Markdown 设计之初没有明确的语法规范，随着 Markdown 被更多的人使用，这种不规范直接导致了多种 Markdown 语法的变体，Markdown 解析器也变得混乱，无法统一。</p>
<p>开源平台 GitHub 做为 Markdown 文档的直接支持者已经无法忍受这种情况，2017 年 GitHub 发布了 Markdown GFM（GitHub Flavored Markdown） 标准规范，并且修改了 GitHub 的 Markdown 解析器以规范用户行为。</p>
<p>GitHub 在 <a href="https://github.github.com/gfm/" target="_blank" rel="noopener noreferrer">GFM</a> 规范中详细阐述了为什么需要规范 Markdown 语法，有兴趣的读者可以详细阅读。</p>
<p>重点：推荐使用 <a href="https://github.github.com/gfm/" target="_blank" rel="noopener noreferrer">GitHub GFM</a> 规范</p>
<h1 id="中文文档排版规范" tabindex="-1"><a class="header-anchor" href="#中文文档排版规范"><span>中文文档排版规范</span></a></h1>
<p>语法编写建议：推荐直接使用 <a href="https://github.github.com/gfm/" target="_blank" rel="noopener noreferrer">GitHub GFM</a> 规范！其他规范不做介绍。</p>
<h2 id="标题格式推荐" tabindex="-1"><a class="header-anchor" href="#标题格式推荐"><span>标题格式推荐</span></a></h2>
<p><a href="https://github.github.com/gfm/" target="_blank" rel="noopener noreferrer">GitHub GFM</a> 规范支持 <a href="https://github.github.com/gfm/#atx-headings" target="_blank" rel="noopener noreferrer">ATX 标题</a> 和 <a href="https://github.github.com/gfm/#setext-heading" target="_blank" rel="noopener noreferrer">Setext 标题</a> 规范，推荐使用 <a href="https://github.github.com/gfm/#atx-headings" target="_blank" rel="noopener noreferrer">ATX 标题</a> 规范，最大支持 6 级标题。</p>
<p><a href="https://github.github.com/gfm/#atx-headings" target="_blank" rel="noopener noreferrer">ATX 标题</a> 标题规范示例：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># 一级标题 </span></span>
<span class="line"><span>## 二级标题 </span></span>
<span class="line"><span>### 三级标题</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="空行" tabindex="-1"><a class="header-anchor" href="#空行"><span>空行</span></a></h2>
<ul>
<li>
<p>不要有多余的空行</p>
</li>
<li>
<p>在 Markdown 文本中，想要做到渲染后 真换行 通常是使用两个空格加一个回车换行符（Unix 下只有回车 CR），或者粗暴地空一行，但是 请不要连续空两行及以上。</p>
</li>
<li>
<p>文件末尾空一行</p>
</li>
<li>
<p>强烈建议文件末尾空一行，大多数格式检查工具都会检查文件末尾的空行。文件末尾增加空行的可能原因是为了方便进行文件拼接处理。</p>
</li>
<li>
<p>标题前后各空一行</p>
</li>
</ul>
<h2 id="空格" tabindex="-1"><a class="header-anchor" href="#空格"><span>空格</span></a></h2>
<p>重中之重，希望严格对待。</p>
<p>「有研究显示，打字的时候不喜欢在中文和英文之间加空格的人，感情路都走得很辛苦，有七成的比例会在 34 岁的时候跟自己不爱的人结婚，而其余三成的人最后只能把遗产留给自己的猫。毕竟爱情跟书写都需要适时地留白。</p>
<p>与大家共勉之。」—— <a href="https://github.com/vinta/pangu.js" target="_blank" rel="noopener noreferrer">vinta/paranoid-auto-spacing</a></p>
<h2 id="中英文之间需要增加空格" tabindex="-1"><a class="header-anchor" href="#中英文之间需要增加空格"><span>中英文之间需要增加空格</span></a></h2>
<p>正确：</p>
<blockquote>
<p>在 LeanCloud 上，数据存储是围绕 AVObject 进行的。</p>
</blockquote>
<p>错误：</p>
<blockquote>
<p>在LeanCloud上，数据存储是围绕AVObject进行的。</p>
</blockquote>
<p>完整写法：</p>
<blockquote>
<p>在 LeanCloud 上，数据存储是围绕 AVObject 进行的。每个 AVObject 都包含了与 JSON 兼容的 key-value 对应的数据。数据是 schema-free 的，你不需要在每个 AVObject 上提前指定存在哪些键，只要直接设定对应的 key-value 即可。</p>
</blockquote>
<p>例外：「豆瓣FM」等产品名词，按照官方定义的格式书写。</p>
<h2 id="中文与数字之间需要添加空格" tabindex="-1"><a class="header-anchor" href="#中文与数字之间需要添加空格"><span>中文与数字之间需要添加空格</span></a></h2>
<p>正确：</p>
<blockquote>
<p>今天去手机店买新手机花了我 5000 块钱。</p>
</blockquote>
<p>错误：</p>
<blockquote>
<p>今天去手机店买新手机花了我5000块钱。</p>
</blockquote>
<h2 id="数字与单位之间需要添加空格" tabindex="-1"><a class="header-anchor" href="#数字与单位之间需要添加空格"><span>数字与单位之间需要添加空格</span></a></h2>
<p>正确：</p>
<blockquote>
<p>我家的光纤入屋宽带有 10 Gbps，SSD 一共有 20 TB。</p>
</blockquote>
<p>错误：</p>
<blockquote>
<p>我家的光纤入屋宽带有10Gbps，SSD 一共有20TB。</p>
</blockquote>
<p>例外：百分比与温度单位等与数字强关联的单位可以不添加空格</p>
<blockquote>
<p>今年 7 月广东的平均温度达到了 38° 的高温。<br>
新 MacBook 的性能较上一代有了 15% 的性能提升。</p>
</blockquote>
<h2 id="全角标点与其他字符之间不添加空格" tabindex="-1"><a class="header-anchor" href="#全角标点与其他字符之间不添加空格"><span>全角标点与其他字符之间不添加空格</span></a></h2>
<p>正确：</p>
<blockquote>
<p>刚刚买了一部 iPhone，好开心啊！</p>
</blockquote>
<p>错误：</p>
<blockquote>
<p>刚刚买了一部 iPhone ， 好开心啊！</p>
</blockquote>
<h1 id="标点符号" tabindex="-1"><a class="header-anchor" href="#标点符号"><span>标点符号</span></a></h1>
<h2 id="不重复使用标点符号" tabindex="-1"><a class="header-anchor" href="#不重复使用标点符号"><span>不重复使用标点符号</span></a></h2>
<p>正确：</p>
<blockquote>
<p>德国队居然战胜了巴西队？！</p>
</blockquote>
<p>错误：</p>
<blockquote>
<p>德国队居然战胜了巴西队？？？！！！！</p>
</blockquote>
<h1 id="全角与半角" tabindex="-1"><a class="header-anchor" href="#全角与半角"><span>全角与半角</span></a></h1>
<p>全角和半角是针对英文字母、键盘符号和数字而言。在半角状态下，一个字母占一个字节，而全角状态下，是一个字母占两个字节，也就是说与汉字一样。</p>
<h2 id="使用全角中文标点" tabindex="-1"><a class="header-anchor" href="#使用全角中文标点"><span>使用全角中文标点</span></a></h2>
<p>正确：</p>
<blockquote>
<p>嗨！你知道嘛？今天前台的小妹跟我说「喵」了哎！
核磁共振成像（NMRI）是什么原理都不知道？JFGI！</p>
</blockquote>
<p>错误：</p>
<blockquote>
<p>嗨!你知道嘛?今天前台的小妹跟我说&quot;喵&quot;了哎！
核磁共振成像(NMRI)是什么原理都不知道?JFGI!</p>
</blockquote>
<h2 id="数字使用半角符号" tabindex="-1"><a class="header-anchor" href="#数字使用半角符号"><span>数字使用半角符号</span></a></h2>
<p>正确：</p>
<blockquote>
<p>这张显卡只卖 1000 元。</p>
</blockquote>
<p>错误：</p>
<blockquote>
<p>这张显卡只卖 １０００　元。</p>
</blockquote>
<h2 id="遇到完整英文整句、特殊名词-其内容使用半角标点" tabindex="-1"><a class="header-anchor" href="#遇到完整英文整句、特殊名词-其内容使用半角标点"><span>遇到完整英文整句、特殊名词，其内容使用半角标点</span></a></h2>
<p>正确：</p>
<blockquote>
<p>贾伯斯那句话是怎么说的？「Stay hungry, stay foolish.」
推荐你阅读《Hackers &amp; Painters: Big Ideas from the Computer Age》，非常的有趣。</p>
</blockquote>
<p>错误：</p>
<blockquote>
<p>贾伯斯那句话是怎么说的？「Stay hungry，stay foolish。」
推荐你阅读《Hackers＆Painters：Big Ideas from the Computer Age》，非常的有趣。</p>
</blockquote>
<h1 id="名词" tabindex="-1"><a class="header-anchor" href="#名词"><span>名词</span></a></h1>
<h2 id="专有名词使用正确的大小写" tabindex="-1"><a class="header-anchor" href="#专有名词使用正确的大小写"><span>专有名词使用正确的大小写</span></a></h2>
<p>大小写相关用法原属于英文书写范畴，不属于本 wiki 讨论内容，在这里只对部分易错用法进行简述。</p>
<p>正确：</p>
<blockquote>
<p>使用 GitHub 登录
我们的客户有 GitHub、Foursquare、Microsoft Corporation、Google、Facebook, Inc.。</p>
</blockquote>
<p>错误：</p>
<blockquote>
<p>使用 gitHub 登录
使用 GITHUB 登录
我们的客户有 github、foursquare、microsoft corporation、google、facebook, inc.。
我们的客户有 gｲんĤЦ8、ｷouЯƧquﾑгє、๓เςг๏ร๏Ŧt ς๏гק๏гคtเ๏ภn、900913、ƒ4ᄃëв๏๏к, IПᄃ.。</p>
</blockquote>
<p>注意：当网页中需要配合整体视觉风格而出现全部大写／小写的情形，HTML 中请使用标淮的大小写规范进行书写；并通过 text-transform: uppercase;／text-transform: lowercase; 对表现形式进行定义。</p>
<h2 id="不要使用不地道的缩写" tabindex="-1"><a class="header-anchor" href="#不要使用不地道的缩写"><span>不要使用不地道的缩写</span></a></h2>
<p>正确：</p>
<blockquote>
<p>我们需要一位熟悉 JavaScript、HTML5，至少理解一种框架（如 Backbone.js、AngularJS、React 等）的前端开发者。</p>
</blockquote>
<p>错误：</p>
<blockquote>
<p>我们需要一位熟悉 Js、h5，至少理解一种框架（如 backbone、angular、RJS 等）的 FED。</p>
</blockquote>
<p>注意：此处并非说不可以进行缩写，部分专有名词过长也是会造成阅读障碍，而是尽量使用不会产生歧义的名词缩写。</p>
<h1 id="补充建议" tabindex="-1"><a class="header-anchor" href="#补充建议"><span>补充建议</span></a></h1>
<p>以下用法略带有个人色彩，即：无论是否遵循下述规则，从语法的角度来讲都是 正确 的。</p>
<h2 id="链接之间添加空格" tabindex="-1"><a class="header-anchor" href="#链接之间添加空格"><span>链接之间添加空格</span></a></h2>
<p>用法：</p>
<blockquote>
<p>请 提交一个 <a href="https://cn.bing.com/" target="_blank" rel="noopener noreferrer">issue</a> 并分配给相关同事。
访问我们网站的最新动态，请 <a href="https://cn.bing.com/" target="_blank" rel="noopener noreferrer">点击这里</a> 进行订阅！</p>
</blockquote>
<p>对比用法：</p>
<blockquote>
<p>请 提交一个 <a href="https://cn.bing.com/" target="_blank" rel="noopener noreferrer">issue</a>并分配给相关同事。
访问我们网站的最新动态，请<a href="https://cn.bing.com/" target="_blank" rel="noopener noreferrer">点击这里</a>进行订阅！</p>
</blockquote>
<h2 id="加粗、斜体、高亮文本前后加空格" tabindex="-1"><a class="header-anchor" href="#加粗、斜体、高亮文本前后加空格"><span>加粗、斜体、高亮文本前后加空格</span></a></h2>
<p>建议在 加粗、斜体、高亮文本 前后加空格，否则某些情况下会出现解析失败</p>
<p>建议用法：</p>
<blockquote>
<p>修复了一个 内存泄露 问题，该问题由 someone 在 版本 v0.1.1 中引入。</p>
</blockquote>
<p>不建议用法：</p>
<blockquote>
<p>修复了一个内存泄露问题，该问题由someone在 版本 v0.1.1中引入。</p>
</blockquote>
<h2 id="列表缩进" tabindex="-1"><a class="header-anchor" href="#列表缩进"><span>列表缩进</span></a></h2>
<p>建议使用 4 个空格进行文本缩进，尤其是遇到有序列表或者无序列表的时候。另外，在使用无序列表或者有序列表的时候，建议在上下级之间空一行，同级之间可以不空行。</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>- 一级 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>	- 二级 </span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>- 一级</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	- 二级 </span></span>
<span class="line"><span>	- 二级 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 一级 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>	- 二级 </span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>		- 三级 </span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	- 二级</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>		- 三级 </span></span>
<span class="line"><span>		- 三级</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="的使用" tabindex="-1"><a class="header-anchor" href="#的使用"><span>/ 的使用</span></a></h2>
<p>建议 / 字符前后留空格，充当路径描述符的时候除外。</p>
<h2 id="简体中文使用直角引号" tabindex="-1"><a class="header-anchor" href="#简体中文使用直角引号"><span>简体中文使用直角引号</span></a></h2>
<p>用法：</p>
<blockquote>
<p>「老师，『有条不紊』的『紊』是什么意思？」</p>
</blockquote>
<p>对比用法：</p>
<blockquote>
<p>“老师，‘有条不紊’的‘紊’是什么意思？”</p>
</blockquote>
</div></template>



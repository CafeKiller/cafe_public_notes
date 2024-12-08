<template><div><h1 id="前端默认字体说明" tabindex="-1"><a class="header-anchor" href="#前端默认字体说明"><span>前端默认字体说明</span></a></h1>
<p>参考文章：https://segmentfault.com/a/1190000011827800</p>
<ul>
<li>-apple-system, BlinkMacSystemFont</li>
</ul>
<blockquote>
<p>这两个值是特殊供 iOS 和 macOS(OS X) 使用的属性值，前者只被 Safari 识别，后者只被 Chrome 识别。也就是说它们是 Webkit 私有属性，这两个值强大的地方就在于，其会根据系统版本的不同，渲染出不同的字体。</p>
</blockquote>
<ul>
<li>&quot;Segoe UI&quot;, Roboto, Ubuntu</li>
</ul>
<blockquote>
<p>西文字体的第二梯队，分别对应了：<br>
&quot;Segoe UI&quot; 对应的是 Windows 和 Windows Phone；<br>
Roboto 对应的是 Google 家的 Android 和 Chrome OS'；<br>
Ubuntu 对应的是 Linux。</p>
</blockquote>
<ul>
<li>Helvetica Neue,Helvetica,Arial</li>
</ul>
<blockquote>
<p>西文字体的最终 fallback：<br>
&quot;Helvetica Neue&quot;对应的是 OS X pre-EI Capitan，实际上它位置靠后的更重要原因是，它在非 EI Capitan 的机器上是一个比较常见的字体；<br>
Helvetica 是世界通用的经典无衬线体；<br>
Arial 是 Windows 3.1 开始就一直随视窗系统分发的字体，作为最后的回退方案。</p>
</blockquote>
<ul>
<li>&quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;</li>
</ul>
<blockquote>
<p>&quot;PingFang SC&quot; 即苹方，是 OS X EI Capitan(10.11) 上 的系统中文字体。值得一提的是，EI Capitan 上 Chrome 默认的中文字体渲染是 ST Heiti(华文黑体)，而非作为系统 UI 字体的苹方；<br>
&quot;Hiragino Sans GB&quot; 即冬青黑体，是我们整个 fallback list 中唯一不是系统字体的字体。加入冬青黑体是因为考虑到无论是在 Mac 还是 Windows 上，冬青黑体的表现都会比微软雅黑优秀。而自 10.6 开始，OS X 就 系统自带 了冬青黑体，因此将其置于微软雅黑之前。</p>
</blockquote>
<ul>
<li>&quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, &quot;Source Han Sans CN&quot;</li>
</ul>
<blockquote>
<p>中文字体的第二梯队：<br>
&quot;Microsoft YaHei UI&quot; 即 微软雅黑 UI ，随 Windows 8.1 一同发布，相较于微软雅黑，其对英文、数字的笔画做了一定修改；<br>
&quot;Microsoft YaHei&quot; 即微软雅黑，随 Windows Vista 一同发布，是 Vista 至 Windows 8 的系统字体（Windows 8.1 改用 “微软雅黑 Light”）；<br>
&quot;Source Han Sans CN&quot; 即思源黑体，是大部分 Android 的系统中文字体。</p>
</blockquote>
<ul>
<li>sans-serif</li>
</ul>
<blockquote>
<p>中文字体的最终 fallback，无衬线体，与中文字体的黑体相对应。</p>
</blockquote>
</div></template>



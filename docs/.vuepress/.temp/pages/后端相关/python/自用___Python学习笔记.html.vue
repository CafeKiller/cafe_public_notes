<template><div><h1 id="自用-python学习笔记" tabindex="-1"><a class="header-anchor" href="#自用-python学习笔记"><span>[自用]__Python学习笔记</span></a></h1>
<blockquote>
<p>主要参考资料/书籍/文章:<br>
<a href="https://github.com/jackfrued/Python-100-Days" target="_blank" rel="noopener noreferrer">Python - 100天从新手到大师</a></p>
</blockquote>
<p>该笔记为 Cafe 个人学习使用, 主要作用是复习, 且拥有其他语言相关知识, 非小白向</p>
<h2 id="安装python" tabindex="-1"><a class="header-anchor" href="#安装python"><span>安装Python</span></a></h2>
<ul>
<li>
<p>windows 安装 直接前往官网下载一个即可</p>
</li>
<li>
<p>linux 安装</p>
</li>
</ul>
<blockquote>
<p>此处使用 ubuntu 发行版</p>
</blockquote>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">apt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> update</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 更新包目录</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">apt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> software-properties-common</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 安装依赖</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">add-apt-repository</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ppa:deadsnakes/ppa</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 添加 deadsnakes PPA 源]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">apt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> python3.X</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # 安装指定版本python</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="python-基础" tabindex="-1"><a class="header-anchor" href="#python-基础"><span>Python 基础</span></a></h2>
<blockquote>
<p>相关代码放置在本仓库的 /codes/backend/python/master_100_day/ 下</p>
</blockquote>
<h3 id="变量和类型" tabindex="-1"><a class="header-anchor" href="#变量和类型"><span>变量和类型</span></a></h3>
<ul>
<li>整型</li>
<li>浮点型</li>
<li>布尔型</li>
<li>字符串型</li>
<li>复数: 这个说一下, 其他语言并不多见, 形如 <code v-pre>3+5j</code> ，跟数学上的复数表示一样，唯一不同的是虚部的 <code v-pre>i</code> 换成了 <code v-pre>j</code> 。</li>
</ul>
<p><strong>变量的命名</strong></p>
<ul>
<li>硬性规则：
<ul>
<li>变量名由字母（广义的Unicode字符，不包括特殊字符）、数字和下划线构成，数字不能开头。</li>
<li>大小写敏感（大写的a和小写的A是两个不同的变量）。</li>
<li>不要跟关键字（有特殊含义的单词，后面会讲到）和系统保留字（如函数、模块等的名字）冲突。</li>
</ul>
</li>
<li>PEP 8要求：
<ul>
<li>用小写字母拼写，多个单词用下划线连接。</li>
<li>受保护的实例属性用单个下划线开头。</li>
<li>私有的实例属性用两个下划线开头。</li>
</ul>
</li>
</ul>
<p><strong>基础类型的转换</strong></p>
<ul>
<li><code v-pre>int()</code>：将一个数值或字符串转换成整数，可以指定进制。</li>
<li><code v-pre>float()</code>：将一个字符串转换成浮点数。</li>
<li><code v-pre>str()</code>：将指定的对象转换成字符串形式，可以指定编码。</li>
<li><code v-pre>chr()</code>：将整数转换成该编码对应的字符串（一个字符）。</li>
<li><code v-pre>ord()</code>：将字符串（一个字符）转换成对应的编码（整数）。</li>
</ul>
<p><strong>运算符</strong></p>
<blockquote>
<p>大体上和其他语言是类似的, 这里标注几个其他语言上没有, 未标注的则是和其他语言一致</p>
</blockquote>
<ul>
<li>下标、切片: <code v-pre>[]</code> <code v-pre>[:]</code></li>
<li>指数: <code v-pre>**</code></li>
<li>身份运算符: <code v-pre>is</code> <code v-pre>is not</code></li>
<li>成员运算符: <code v-pre>in</code> <code v-pre>not in</code></li>
<li>逻辑运算符: <code v-pre>or</code>(或) <code v-pre>not</code>(取反) <code v-pre>and</code>(且)</li>
</ul>
<p><strong>分支</strong></p>
<blockquote>
<p>python 最常用的分支语句只有 if 语句, 不过在 python3.10 时学习 rust 等语言引入了 match 分支语句<br>
需要注意的这并不是 switch...case , 传统的 switch...case 语句其实局限性非常大(这点可以看看c语言上的switch)
不过现在很多语言的 switch 都重新优化过了就是. match 语句则是一个相当现代的分支语句, 可以说更优雅更强大.</p>
</blockquote>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 条件:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    pass</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">elif</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 条件二:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    pass</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    pass</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># match...case 语句 示例</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">value </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">match</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> value:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    case</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"匹配到值为1"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    case</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"匹配到值为2"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    case</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> _:</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"匹配到其他值"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>循环</strong></p>
<blockquote>
<p>python 中的循环中有两种, 分别是 for...in 和 while, 其中 while 和其他语言基本相同, 这里就不额外介绍了</p>
</blockquote>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># range() 是用于构建一个范围的, 101 指的就是 1-100 的范围</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> x </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">101</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">    sum</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> +=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> x</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>range() 非常的灵活, 在 for...in 也很常用, 以下为部分使用示例:</p>
<ul>
<li>range(10, 101)：可以用来产生10到100范围的整数，相当于前面是闭区间后面是开区间。</li>
<li>range(1, 101, 2)：可以用来产生1到100的奇数，其中2是步长，即每次数值递增的值。</li>
<li>range(100, 0, -2)：可以用来产生100到1的偶数，其中-2是步长，即每次数字递减的值。</li>
</ul>
</blockquote>
<p><strong>补充</strong></p>
<ul>
<li><code v-pre>type()</code>: 用于识别类型</li>
<li><code v-pre>input()</code>: 用于接收用户从命令行写入的参数</li>
<li><code v-pre>print()</code>: 用于打印, 和其他语言类似可以使用 % 进行占位, 但形式可能不太相同
<ul>
<li>注意占位符的使用方式是: <code v-pre>print('%d + %d = %d' % (a, b, a + b))</code></li>
</ul>
</li>
</ul>
<h3 id="函数与模块" tabindex="-1"><a class="header-anchor" href="#函数与模块"><span>函数与模块</span></a></h3>
<p><strong>函数</strong></p>
<blockquote>
<p>函数的内部是允许再定义函数的, 也就是内部函数</p>
</blockquote>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> fun1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic">parma</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> parma </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> parma</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>模块</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># modele1.py </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> fun</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">():</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    pass</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># modele2.py </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> fun</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">():</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    pass</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> module1 </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> m1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> module2 </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> m2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">m1.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">fun</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">m2.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">fun</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>需要说明的时, 当引入模块时, 模块内的可执行函数都会被执行, 也就是说包括内部写的测试/内部函数都可能被执行, 这并不是我们希望的<br>
此时就需要使用 <strong>main</strong> 函数了</p>
</blockquote>
<p><strong>main函数</strong></p>
<blockquote>
<p>与 javascript 语言类似 python 其实也是可以不使用 main 函数就运行程序, 但并不是说 python 没有 main 函数</p>
</blockquote>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> fun1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">():</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    pass</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># __name__是Python中一个隐含的变量它代表了模块的名字</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 只有被Python解释器直接执行的模块的名字才是__main__</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> __name__</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ==</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '__main__'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">    print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Hello World"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    fun1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常用数据结构" tabindex="-1"><a class="header-anchor" href="#常用数据结构"><span>常用数据结构</span></a></h3>
<ul>
<li>
<p>字符串: 和其他语言的字符串基本一致, 可以使用连续三个 <code v-pre>&quot;/'</code> 符号的字符串可以直接换行 (有点类似于 javascript 的模版字符串)</p>
</li>
<li>
<p>列表: 和其他语言的数组类似, 具体操作起来更像是 java、kotlin 中的集合. 使用 <code v-pre>[]</code></p>
</li>
<li>
<p>元组: 这个有点特殊,但也不是很特殊, 有点类似于 javascript 中的数组, 可以存储不同类型的元素, 使用 <code v-pre>()</code></p>
</li>
<li>
<p>集合: 也就是其他语言上的 set 集合, 不允许存在重复元素, 可以进行交集、并集、差集等运算。</p>
</li>
<li>
<p>字典: 也就是其他语言上的 map 集合, 使用键值对的方式保存数据.</p>
</li>
</ul>
<p><strong>补充</strong></p>
<p>可以使用生成式语法来创建列表</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">f </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [x </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> x </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)]</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(f)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">f </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [x </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> y </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> x </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'ABCDE'</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> y </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '1234567'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(f)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 用列表的生成表达式语法创建列表容器</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 用这种语法创建列表之后元素已经准备就绪所以需要耗费较多的内存空间</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">f </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [x </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">**</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> x </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)]</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(sys.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">getsizeof</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(f))  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看对象占用内存的字节数</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(f)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 请注意下面的代码创建的不是一个列表而是一个生成器对象</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 通过生成器可以获取到数据但它不占用额外的空间存储数据</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 每次需要数据的时候就通过内部的运算得到数据(需要花费额外的时间)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">f </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (x </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">**</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> x </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">))</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(sys.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">getsizeof</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(f))  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 相比生成式生成器不占用存储数据的空间</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(f)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> val </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> f:</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">    print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(val)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="面向对象" tabindex="-1"><a class="header-anchor" href="#面向对象"><span>面向对象</span></a></h3>
<p><a href="../../codes/backend/python/master_100_day/test_03.py">相关代码</a></p>
<p>和其他语言类似, 使用 class 定义类</p>
<p>初始化函数的形式为: <code v-pre>def __init__(self):</code></p>
<p>关于访问可见性问题, python 类中的方法, 默认就是对外公开的(public), 如果需要设置为私有的, 可以在属性名和方法名前添加两个下划线, 如 <code v-pre>__func(self):</code></p>
<p>不过需要注意的时, python其实并没有严格的保护私有方法, 你完全可以通过给这种方式访问私有属性</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">cls1 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> Test</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">cls1.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">_Test__func1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>所以在开发时, 并不推荐使用私有方法, 当然, 我们在调用类中的私有函数时也需要谨慎, 可以使用单下划线来表示该方法为内部私有函数 (这是规范上的, 并非语法上的)</p>
<p><strong>@property</strong></p>
<blockquote>
<p>之前我们讨论过Python中属性和方法访问权限的问题，虽然我们不建议将属性设置为私有.<br>
但是如果直接将属性暴露给外界也是有问题的，比如我们没有办法检查赋给属性的值是否有效。<br>
我们之前的建议是将属性命名以单下划线开头，通过这种方式来暗示属性是受保护的，
不建议外界直接访问，那么如果想访问属性可以通过属性的getter（访问器）和setter（修改器）方法进行对应的操作。<br>
如果要做到这点，就可以考虑使用@property包装器来包装getter和setter方法，使得对属性的访问既安全又方便</p>
</blockquote>
<p><code v-pre>__slots__</code></p>
<blockquote>
<p>这是一个魔法变量, 用于限制 类 的属性<br>
Python是一门动态语言。通常，动态语言允许我们在程序运行时给对象绑定新的属性或方法，当然也可以对已经绑定的属性和方法进行解绑定。<br>
但是如果我们需要限定自定义类型的对象只能绑定某些属性，可以通过在类中定义__slots__变量来进行限定。需要注意的是__slots__的限定只对当前类的对象生效，对子类并不起任何作用。</p>
</blockquote>
<p><strong>静态方法和类方法</strong></p>
<blockquote>
<p>静态方法使用 @staticmethod 整体来说基本和 java 的那个静态方法一致, 可以直接使用 类名 访问
而类方法其实也和静态方法类似, 类方法的第一个参数约定名为cls，它代表的是当前类相关的信息的对象（类本身也是一个对象，有的地方也称之为类的元数据对象），通过这个参数我们可以获取和类相关的信息并且可以创建出类的对象, 使用场景的话, 那就是创建单例方法</p>
</blockquote>
<p><strong>继承与多态</strong></p>
<p>python 中的继承和多态机制与其他语言无异</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Animals</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">object</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    pass</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Cat</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Animals</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    pass</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Dog</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Animals</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    pass</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件操作与异常处理" tabindex="-1"><a class="header-anchor" href="#文件操作与异常处理"><span>文件操作与异常处理</span></a></h3>
<p>python 中的文件读出与操作对比起其他语言来说是非常简单的, 只需要使用 <code v-pre>open()</code> 函数即可</p>
<p>操作模式说明:</p>
<ul>
<li><code v-pre>'r'</code>	读取（默认）</li>
<li><code v-pre>'w'</code>	写入（会先截断之前的内容）</li>
<li><code v-pre>'x'</code>	写入，如果文件已经存在会产生异常</li>
<li><code v-pre>'a'</code>	追加，将内容写入到已有文件的末尾</li>
<li><code v-pre>'b'</code>	二进制模式</li>
<li><code v-pre>'t'</code>	文本模式（默认）</li>
<li><code v-pre>'+'</code>	更新（既可以读又可以写）</li>
</ul>
<p><strong>处理JSON格式数据</strong></p>
<blockquote>
<p>使用内置的 json 模块配合文件操作即可.</p>
</blockquote>
<p>json模块主要有四个比较重要的函数，分别是：</p>
<ul>
<li><code v-pre>dump</code> - 将Python对象按照JSON格式序列化到文件中</li>
<li><code v-pre>dumps</code> - 将Python对象处理成JSON格式的字符串</li>
<li><code v-pre>load</code> - 将文件中的JSON数据反序列化成对象</li>
<li><code v-pre>loads</code> - 将字符串的内容反序列化成Python对象</li>
</ul>
<p><strong>异常处理</strong></p>
<blockquote>
<p>和其他语言类似, 使用 try 块, 但对应的不是 cache, 而是 except<br>
需要主动抛出异常时, 使用 raise, 如果你需要传递异常, 直接使用 raise 即可(不带任何参数)
尽量使用 python 内置封装的异常处理语法糖, 来对异常进行处理, 如 with 和 getattr()
参考文章: https://segmentfault.com/a/1190000007736783</p>
</blockquote>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>try:</span></span>
<span class="line"><span>    # 可能触发异常的代码</span></span>
<span class="line"><span>    pass</span></span>
<span class="line"><span>except XXXXXError:</span></span>
<span class="line"><span>    # 处理异常1</span></span>
<span class="line"><span>    pass</span></span>
<span class="line"><span>except XXXXXError:</span></span>
<span class="line"><span>    # 处理异常2</span></span>
<span class="line"><span>    pass</span></span>
<span class="line"><span>finally:</span></span>
<span class="line"><span>    # 收尾工作(如回收资源)</span></span>
<span class="line"><span>    pass</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 主动抛出异常</span></span>
<span class="line"><span>raise XXXError('bad apple!')</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 自定义异常</span></span>
<span class="line"><span>class MyError(Exception)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>with 与 getattr() 语法糖</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 未使用 with 语法糖</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">try</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    f </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> open</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(a_file)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    do_something</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(f)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">finally</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    f.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">close</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 使用 with 语法糖</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">with</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> open</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(a_file) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> f:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    do_something</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(f)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 未使用 getattr 语法糖</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">try</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    test </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> Test</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    name </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> test.name  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># not sure if we can get its name</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">except</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF"> AttributeError</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    name </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'default'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 使用 getattr 语法糖</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">name </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> getattr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(test, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'name'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'default'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="python-进阶" tabindex="-1"><a class="header-anchor" href="#python-进阶"><span>Python 进阶</span></a></h2>
<h3 id="多进程" tabindex="-1"><a class="header-anchor" href="#多进程"><span>多进程</span></a></h3>
<p>Unix和Linux操作系统上提供了 <code v-pre>fork()</code> 系统调用来创建进程，调用 <code v-pre>fork()</code> 函数的是父进程，创建出的是子进程，子进程是父进程的一个拷贝，但是子进程拥有自己的PID。<code v-pre>fork()</code> 函数非常特殊它会返回两次，父进程中可以通过 <code v-pre>fork()</code> 函数的返回值得到子进程的PID，而子进程中的返回值永远都是0。Python的 <code v-pre>os</code> 模块提供了 <code v-pre>fork()</code> 函数。</p>
<p>由于Windows系统没有 <code v-pre>fork()</code> 调用，因此要实现跨平台的多进程编程，可以使用<code v-pre>multiprocessing</code> 模块的 <code v-pre>Process</code> 类来创建子进程，而且该模块还提供了更高级的封装，例如批量启动进程的进程池（Pool）、用于进程间通信的队列（Queue）和管道（Pipe）等。</p>
<p>在程序中创建进程的时候，子进程复制了父进程及其所有的数据结构，每个子进程有自己独立的内存空间, 也就是说在使用父进程的变量时, 两个子进程内的数据是不共享的. 如果需要进行子进程之间的通信, 可以使用 <code v-pre>multiprocessing</code> 模块内的 <code v-pre>Queen</code>. 它是可以被多个进程共享的队列，底层是通过管道和信号量（semaphore）机制来实现的.</p>
<p>核心模块: <code v-pre>multiprocessing</code>、<code v-pre>os</code>、<code v-pre>Queue</code></p>
<h3 id="多线程" tabindex="-1"><a class="header-anchor" href="#多线程"><span>多线程</span></a></h3>
<p>在Python早期的版本中就引入了thread模块（现在名为_thread）来实现多线程编程，然而该模块过于底层，而且很多功能都没有提供;</p>
<p>因此目前的多线程开发我们推荐使用threading模块，该模块对多线程编程提供了更好的面向对象的封装。</p>
<p>使用方式和 <code v-pre>Process</code> 类似, 直接使用 <code v-pre>Thread</code> , 但也可以使用继承机制, 创建一个类继承 <code v-pre>Thread</code>, 并实现一个 <code v-pre>run</code> 方法.</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> DownloadTask</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Thread</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        pass</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为多个线程可以共享进程的内存空间，因此要实现多个线程间的通信相对简单，大家能想到的最直接的办法就是设置一个全局变量，多个线程共享这个全局变量即可。</p>
<p>但是当多个线程共享同一个变量（我们通常称之为“资源”）的时候，很有可能产生不可控的结果从而导致程序失效甚至崩溃。</p>
<p>如果一个资源被多个线程竞争使用，那么我们通常称之为“临界资源”，对“临界资源”的访问需要加上保护，否则资源会处于“混乱”的状态。</p>
<p>此时就可以通过“锁”来保护“临界资源”，只有获得“锁”的线程才能访问“临界资源”，而其他没有得到“锁”的线程只能被阻塞起来，直到获得“锁”的线程释放了“锁”，其他线程才有机会获得“锁”，进而访问被保护的“临界资源”。</p>
<p>比较遗憾的一件事情是Python的多线程并不能发挥CPU的多核特性，这一点只要启动几个执行死循环的线程就可以得到证实了。</p>
<p>之所以如此，是因为Python的解释器有一个“全局解释器锁”（GIL）的东西，任何线程执行前必须先获得GIL锁，然后每执行100条字节码，解释器就自动释放GIL锁，让别的线程有机会执行，这是一个历史遗留问题。</p>
<p>核心模块: <code v-pre>threading</code> <code v-pre>Lock</code></p>
<h3 id="网络" tabindex="-1"><a class="header-anchor" href="#网络"><span>网络</span></a></h3>
<ul>
<li>关键相关模块：<code v-pre>requests</code>、<code v-pre>socket</code>、<code v-pre>json</code></li>
</ul>
<h3 id="图像与文档处理" tabindex="-1"><a class="header-anchor" href="#图像与文档处理"><span>图像与文档处理</span></a></h3>
<ul>
<li>关键相关模块：<code v-pre>pillow</code>、<code v-pre>openpyxl</code>、<code v-pre>docx</code></li>
</ul>
</div></template>



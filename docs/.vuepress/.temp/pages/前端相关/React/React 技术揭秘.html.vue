<template><div><h1 id="react-揭秘" tabindex="-1"><a class="header-anchor" href="#react-揭秘"><span>React 揭秘</span></a></h1>
<h2 id="react-理念" tabindex="-1"><a class="header-anchor" href="#react-理念"><span>React 理念</span></a></h2>
<p>我们可以从官网看到React的理念：<strong>我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。</strong></p>
<p>我们日常使用App，浏览网页时，有两类场景会制约快速响应：</p>
<ul>
<li>当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。</li>
<li>发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。</li>
</ul>
<p>这类场景可以大致分为两类：CPU的瓶颈、IO的瓶颈</p>
<h3 id="cpu的瓶颈" tabindex="-1"><a class="header-anchor" href="#cpu的瓶颈"><span>CPU的瓶颈</span></a></h3>
<div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 当项目变得庞大、组件数量繁多时，就容易遇到CPU的瓶颈。</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 考虑如下Demo，我们向视图中渲染3000个li</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> App</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> len</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 3000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">ul</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD">            {</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Array</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">len</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">fill</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">map</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">((</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">_</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">=></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">li</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD">{</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">i</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD">}</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">li</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>)</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">ul</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    );</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> rootEl</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> document</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">querySelector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"#root"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">ReactDOM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">render</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">App</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/>, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">rootEl</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主流浏览器刷新频率为60Hz，即每（1000ms / 60Hz）16.6ms浏览器刷新一次。</p>
<p>我们知道，JS可以操作DOM，GUI渲染线程与JS线程是互斥的。所以JS脚本执行和浏览器布局、绘制不能同时执行。</p>
<p>在每16.6ms时间内，需要完成如下工作：<code v-pre>JS脚本执行 -----&gt;  样式布局 -----&gt; 样式绘制</code></p>
<p>当JS执行时间过长，超出了16.6ms，这次刷新就没有时间执行样式布局和样式绘制了。</p>
<p>在Demo中，由于组件数量繁多（3000个），JS脚本执行时间过长，页面掉帧，造成卡顿。</p>
<p>如何解决这个问题呢？在浏览器每一帧的时间中，预留一些时间给JS线程，React利用这部分时间更新组件（通过查看React源码可以知道预留的初始时间是5ms）</p>
<p>当预留的时间不够用时，React将线程控制权交还给浏览器使其有时间渲染UI，React则等待下一帧时间到来继续被中断的工作。</p>
<blockquote>
<p>这种将长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为时间切片（time slice）</p>
</blockquote>
<p>接下来我们开启Concurrent Mode（后续章节会讲到，当前你只需了解开启后会启用时间切片）：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 通过使用ReactDOM.unstable_createRoot开启Concurrent Mode</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// ReactDOM.render(&#x3C;App/>, rootEl);  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">ReactDOM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">unstable_createRoot</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">rootEl</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">render</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">App</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/>);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="react15-框架" tabindex="-1"><a class="header-anchor" href="#react15-框架"><span>React15 框架</span></a></h2>
<p>React从v15升级到v16后重构了整个架构。本节我们聊聊v15，看看他为什么不能满足快速响应的理念，以至于被重构。</p>
<p>React15架构可以分为两层：</p>
<ul>
<li>Reconciler（协调器）—— 负责找出变化的组件</li>
<li>Renderer（渲染器）—— 负责将变化的组件渲染到页面上</li>
</ul>
<h3 id="reconciler-协调器" tabindex="-1"><a class="header-anchor" href="#reconciler-协调器"><span>Reconciler（协调器）</span></a></h3>
<p>在React中可以通过<code v-pre>this.setState</code>、<code v-pre>this.forceUpdate</code>、<code v-pre>ReactDOM.render</code> 等API触发更新。</p>
<p>每当有更新发生时，Reconciler会做如下工作：</p>
<ul>
<li>调用函数组件、或class组件的render方法，将返回的JSX转化为虚拟DOM</li>
<li>将虚拟DOM和上次更新时的虚拟DOM对比</li>
<li>通过对比找出本次更新中变化的虚拟DOM</li>
<li>通知Renderer将变化的虚拟DOM渲染到页面上</li>
</ul>
<h3 id="renderer-渲染器" tabindex="-1"><a class="header-anchor" href="#renderer-渲染器"><span>Renderer（渲染器）</span></a></h3>
<p>由于React支持跨平台，所以不同平台有不同的Renderer。我们前端最熟悉的是负责在浏览器环境渲染的Renderer —— ReactDOM</p>
<p>除此之外，还有：</p>
<ul>
<li>ReactNative老的React架构 - 图3 (opens new window)渲染器，渲染App原生组件</li>
<li>ReactTest老的React架构 - 图4 (opens new window)渲染器，渲染出纯Js对象用于测试</li>
<li>ReactArt老的React架构 - 图5 (opens new window)渲染器，渲染到Canvas, SVG 或 VML (IE8)</li>
</ul>
<p>在每次更新发生时，Renderer接到Reconciler通知，将变化的组件渲染在当前宿主环境。</p>
<h3 id="react15架构的缺点" tabindex="-1"><a class="header-anchor" href="#react15架构的缺点"><span>React15架构的缺点</span></a></h3>
<p>在Reconciler中，mount的组件会调用mountComponent，update 的组件会调用 updateComponent。这两个方法都会递归更新子组件。</p>
<p><strong>递归更新的缺点</strong>：由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。</p>
<h2 id="react-16-框架" tabindex="-1"><a class="header-anchor" href="#react-16-框架"><span>React 16+ 框架</span></a></h2>
<p>React16架构可以分为三层：</p>
<ul>
<li>Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler</li>
<li>Reconciler（协调器）—— 负责找出变化的组件</li>
<li>Renderer（渲染器）—— 负责将变化的组件渲染到页面上</li>
</ul>
<blockquote>
<p>相较于React15，React16中新增了Scheduler（调度器）</p>
</blockquote>
<h3 id="scheduler-调度器" tabindex="-1"><a class="header-anchor" href="#scheduler-调度器"><span>Scheduler（调度器）</span></a></h3>
<p>既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间时通知我们。</p>
<p>其实部分浏览器已经实现了这个API，这就是 <code v-pre>requestIdleCallback</code>。但是由于以下因素，React放弃使用：</p>
<ul>
<li>浏览器兼容性</li>
<li>触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的 <code v-pre>requestIdleCallback</code> 触发的频率会变得很低</li>
</ul>
<p>基于以上原因，React 实现了功能更完备的 <code v-pre>requestIdleCallback</code> polyfill，这就是Scheduler。除了在空闲时触发回调的功能外，Scheduler还提供了多种调度优先级供任务设置。</p>
<h3 id="reconciler-协调器-1" tabindex="-1"><a class="header-anchor" href="#reconciler-协调器-1"><span>Reconciler（协调器）</span></a></h3>
<p>在React15中Reconciler是递归处理虚拟DOM的。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">/** </span><span style="--shiki-light:#383A42;--shiki-light-font-style:italic;--shiki-dark:#C678DD;--shiki-dark-font-style:italic">@</span><span style="--shiki-light:#A626A4;--shiki-light-font-style:italic;--shiki-dark:#C678DD;--shiki-dark-font-style:italic">noinline</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> */</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> workLoopConcurrent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // Perform work until Scheduler asks us to yield</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    while</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">workInProgress</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> !==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> &#x26;&#x26;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> !</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">shouldYield</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()) {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">        workInProgress</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> performUnitOfWork</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">workInProgress</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 可以看见，更新工作从递归变成了可以中断的循环过程。</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 每次循环都会调用shouldYield判断当前是否有剩余时间。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在React16中，Reconciler与Renderer不再是交替工作。当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记</p>
<div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">export</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> Placement</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> /*             */</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0b0000000000010</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">export</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> Update</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> /*                */</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0b0000000000100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">export</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> PlacementAndUpdate</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> /*    */</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0b0000000000110</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">export</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> Deletion</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> /*              */</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0b0000000001000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个Scheduler与Reconciler的工作都在内存中进行。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。</p>
<h3 id="renderer-渲染器-1" tabindex="-1"><a class="header-anchor" href="#renderer-渲染器-1"><span>Renderer（渲染器）</span></a></h3>
<p>Renderer 根据 Reconciler 为虚拟DOM打的标记，同步执行对应的DOM操作。</p>
<p>在React16架构中整个更新流程为：</p>
<p><img src="https://static.sitestack.cn/projects/BetaSu-just-react/cf8dfdc57abcb54275cad374fef8474f.png" alt=""></p>
<p>其中红框中的步骤随时可能由于以下原因被中断：</p>
<ul>
<li>有其他更高优任务需要先更新</li>
<li>当前帧没有剩余时间</li>
</ul>
<p>由于红框中的工作都在内存中进行，不会更新页面上的DOM，所以即使反复中断，用户也不会看见更新不完全的DOM（即上一节演示的情况）。</p>
<blockquote>
<p>实际上，由于Scheduler和Reconciler都是平台无关的，所以React为他们单独发了一个包 react-Reconciler</p>
</blockquote>
</div></template>



<template><div><h1 id="vue-扩展知识" tabindex="-1"><a class="header-anchor" href="#vue-扩展知识"><span>Vue 扩展知识</span></a></h1>
<h2 id="vue-observable" tabindex="-1"><a class="header-anchor" href="#vue-observable"><span>Vue.observable</span></a></h2>
<blockquote>
<p>Vue.observable(object) 是vue2.6版本新增的全局API，它可以让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。<br>
返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景。</p>
</blockquote>
<blockquote>
<p>在 Vue 2.x 中，被传入的对象会直接被 Vue.observable 改变；在 Vue 3.x 中，则会返回一个可响应的代理，而对源对象直接进行修改仍然是不可响应的。<br>
因此，为了向前兼容，官方推荐始终操作使用 Vue.observable 返回的对象，而不是传入源对象。</p>
</blockquote>
<div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。也可以作为最小化的跨组件状态存储器</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">Vue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">observable</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">({ </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">count </span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">})</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 等效于</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> vue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">({ </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">count </span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">})</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景"><span>使用场景</span></a></h3>
<p>在非父子组件通信时，可以使用通常的bus或者使用vuex，但是实现的功能不是太复杂，而使用上面两个又有点繁琐。这时，observable就是一个很好的选择。</p>
<div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 引入vue</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> Vue</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'vu</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF">e</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 创建state对象，使用observable让state对象可响应</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">export</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> let</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> state</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> Vue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">observable</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">({</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    name</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '张三'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'age'</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 38</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">})</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 创建对应的方法</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">export</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> let</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> mutations</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    changeName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">        state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">name</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> name</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    setAge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">age</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">        state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">age</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> age</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-jsx line-numbers-mode" data-highlighter="shiki" data-ext="jsx" data-title="jsx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">div</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        姓名：{{ name }}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        年龄：{{ age }}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">button</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF"> @click="changeName('李四')">改变姓名&#x3C;/button></span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF">        &#x3C;button</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF"> @click="setAge(18)">改变年龄&#x3C;/button></span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF">    &#x3C;/div></span></span>
<span class="line"><span style="--shiki-light:white;--shiki-dark:#FFFFFF">&#x3C;/template></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic">import</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> {</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">mutations</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> }</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '@/store</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">export default {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    // 在计算属性中拿到值</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    computed: {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        name() {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">            return state.name</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        },</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        age() {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">            return state.age</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        }</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    },</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    // 调用mutations里面的方法，更新数据</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    methods: {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        changeName: mutations.changeName,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        setAge: mutations.setAge</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    }</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>和原生JS中的监听器API是类似的, 也算是监听者模式的优秀实践了.</p>
</blockquote>
<blockquote>
<p>参考:<br>
https://vue3js.cn/interview/vue/observable.html<br>
https://blog.csdn.net/qq_32682301/article/details/105419673</p>
</blockquote>
<h2 id="vue2-直接添加属性的问题" tabindex="-1"><a class="header-anchor" href="#vue2-直接添加属性的问题"><span>Vue2: 直接添加属性的问题</span></a></h2>
<h3 id="问题描述" tabindex="-1"><a class="header-anchor" href="#问题描述"><span>问题描述</span></a></h3>
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" data-title="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">// 我们从一个例子开始</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">// 定义一个p标签，通过v-for指令进行遍历</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">// 然后给 botton 标签绑定点击事件，我们预期点击按钮时，数据新增一个属性，界面也 新增一行</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">p</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> v-for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"(value,key) in item"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> :key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"key"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        {{ value }}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">p</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">button</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> @click</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"addProperty"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>动态添加新属性&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">button</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">// 实例化一个vue实例，定义data属性和methods方法</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> app</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Vue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ({</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        el</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"#app"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        data</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">=></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">            item</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:{</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">                oldProperty</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"旧属性"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        },</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        methods</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            addProperty</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(){</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">                this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">items</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">newProperty</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "新属性"</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // 为items添加新属性</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">                console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">items</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 输出带有newProperty的items</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    })</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">// 点击按钮，发现结果不及预期，数据虽然更新了（console打印出了新属性），但页面并没有更新</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="原理分析" tabindex="-1"><a class="header-anchor" href="#原理分析"><span>原理分析</span></a></h3>
<div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// vue2是用过Object.defineProperty实现数据响应式</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> obj</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">Object</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">defineProperty</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">obj</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'foo'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">        console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`get foo:</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD">${</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">val</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> val</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">newVal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">newVal</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> !==</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> val</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">            console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`set foo:</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD">${</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">newVal</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">            val</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> newVal</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 当我们访问foo属性或者设置foo值的时候都能够触发setter与getter</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">obj</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">foo</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">obj</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">foo</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'new'</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 但是我们为obj添加新属性的时候，却无法触发事件属性的拦截</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">obj</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">bar</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">  =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '新属性'</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 原因是一开始obj的foo属性被设成了响应式数据，而bar是后面新增的属性，并没有通过Object.defineProperty设置成响应式数据</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h3>
<p>Vue 不允许在已经创建的实例上动态添加新的响应式属性, 若想实现数据与视图同步更新，可采取下面三种解决方案：</p>
<ul>
<li>
<p><code v-pre>Vue.set()</code></p>
<ul>
<li>Vue.set( target, propertyName/index, value )</li>
<li>参数: <code v-pre>{Object | Array} target</code> <code v-pre>{string | number} propertyName/index</code>  <code v-pre>{any} value</code></li>
<li>返回值：设置的值</li>
<li>通过Vue.set向响应式对象中添加一个property，并确保这个新 property同样是响应式的，且触发视图更新</li>
</ul>
</li>
<li>
<p><code v-pre>Object.assign()</code></p>
<ul>
<li>直接使用Object.assign()添加到对象的新属性不会触发更新</li>
<li>应创建一个新的对象，合并原对象和混入对象的属性</li>
<li><code v-pre>this.someObject = Object.assign({},this.someObject,{newProperty1:1,newProperty2:2 ...})</code></li>
</ul>
</li>
<li>
<p><code v-pre>$forcecUpdated()</code></p>
<ul>
<li>如果你发现你自己需要在 Vue中做一次强制更新，99.9% 的情况，是你在某个地方做错了事</li>
<li><code v-pre>$forceUpdate</code> 迫使 Vue 实例重新渲染</li>
<li><strong>PS</strong>：仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。</li>
</ul>
</li>
</ul>
<blockquote>
<p>参考链接:<br>
https://vue3js.cn/interview/vue/data_object_add_attrs.html</p>
</blockquote>
<h2 id="vue3-treeshaking" tabindex="-1"><a class="header-anchor" href="#vue3-treeshaking"><span>Vue3: <code v-pre>Treeshaking</code></span></a></h2>
<p><code v-pre>Tree shaking</code> 是一种通过清除多余代码方式来优化项目打包体积的技术，专业术语叫 <code v-pre>Dead code elimination</code></p>
<p>简单来讲，就是在保持代码运行结果不变的前提下，去除无用的代码</p>
<h2 id="vue3-x-中-hooks-函数封装和使用" tabindex="-1"><a class="header-anchor" href="#vue3-x-中-hooks-函数封装和使用"><span>Vue3.x 中 hooks 函数封装和使用</span></a></h2>
<p>参考链接：https://digitalchina-frontend.github.io/framework/vuejs/hooks/</p>
<h3 id="hooks-是什么" tabindex="-1"><a class="header-anchor" href="#hooks-是什么"><span>hooks 是什么</span></a></h3>
<p>vue3  中的  hooks  就是函数的一种写法，就是将文件的一些单独功能的 js 代码进行抽离出来进行封装使用。</p>
<p>它的主要作用是 Vue3 借鉴了 React 的一种机制，用于在函数组件中共享状态逻辑和副作用，从而实现代码的可复用性。</p>
<p>注意：其实  hooks  和  vue2  中的  mixin  有点类似，但是相对  mixins  而言， hooks  更清楚复用功能代码的来源, 更清晰易懂。</p>
<p><strong>hooks 的优点</strong>：</p>
<ul>
<li>hooks 作为独立逻辑的组件封装，其内部的属性、函数等和外部组件具有响应式依附的作用。</li>
<li>自定义 hook 的作用类似于 vue2 中的 mixin 技术，使用方便，易于上手。</li>
<li>使用 Vue3 的组合 API 封装的可复用，高内聚低耦合。</li>
</ul>
<h3 id="自定义-hook-需要满足的规范" tabindex="-1"><a class="header-anchor" href="#自定义-hook-需要满足的规范"><span>自定义 hook 需要满足的规范</span></a></h3>
<p>1、具备可复用功能，才需要抽离为 hooks 独立文件</p>
<p>2、函数名/文件名以 use 开头，形如: useXX</p>
<p>3、引用时将响应式变量或者方法显式解构暴露出来；</p>
<h3 id="hooks-和-utils-区别" tabindex="-1"><a class="header-anchor" href="#hooks-和-utils-区别"><span>hooks 和 utils 区别</span></a></h3>
<p>相同点： 通过 hooks 和 utils 函数封装， 可以实现组件间共享和复用，提高代码的可重用性和可维护性。</p>
<p>异同点：</p>
<ol>
<li>
<p>表现形式不同： hooks 是在 utils 的基础上再包一层组件级别的东西(钩子函数等)；utils 一般用于封装相应的逻辑函数，没有组件的东西；</p>
</li>
<li>
<p>数据是否具有响应式： hooks 中如果涉及到 ref，reactive，computed 这些 api 的数据，是具有响应式的；而 utils 只是单纯提取公共方法就不具备响应式；</p>
</li>
<li>
<p>作用范围不同： hooks 封装，可以将组件的状态和生命周期方法提取出来，并在多个组件之间共享和重用；utils 通常是指一些辅助函数或工具方法，用于实现一些常见的操作或提供特定功能。</p>
</li>
</ol>
<p>总结：utils 是通用的工具函数，而 hooks 是对 utils 的一种封装，用于在组件中共享状态逻辑和副作用。通过使用 hooks，您可以简化代码，并使其更具可读性和可维护性。</p>
<h3 id="hooks-和-mixin-区别" tabindex="-1"><a class="header-anchor" href="#hooks-和-mixin-区别"><span>hooks 和 mixin 区别</span></a></h3>
<p>相同点： hooks 和 mixin，都是常用代码逻辑抽离手段，方便进行代码复用；</p>
<p>异同点：</p>
<ol>
<li>
<p>语法和用法不同： Hooks 是在 Vue 3 的 Composition API 中引入的一种函数式编程的方式，而 Mixins 是在 Vue 2 中的一种对象混入机制。Hooks 使用函数的方式定义和使用，而 Mixins 则是通过对象的方式进行定义和应用。</p>
</li>
<li>
<p>组合性和灵活性不同： Hooks 允许开发者根据逻辑功能来组合代码，封装为自定义 Hook 函数，提高代码复用率。而 Mixins 在组件中的属性和方法会与组件本身的属性和方法进行合并，可能会导致命名冲突或不可预料的行为。</p>
</li>
<li>
<p>响应式系统不同： Vue 3 的 Composition API 使用了一个新的响应式系统，可以通过 reactive 和 ref 来创建响应式数据，可以更精确地控制组件的更新和依赖追踪。而 Mixins 使用 Vue 2 的响应式系统，对数据的追踪和更新较为简单，可能存在一些性能上的问题。</p>
</li>
<li>
<p>生命周期钩子不同： 在 Vue 3 的 Composition API 中，可以使用 onMounted、onUpdated 等钩子函数来替代 Vue 2 中的生命周期钩子，可以更灵活地管理组件的生命周期。Mixins 依然使用 Vue 2 的生命周期钩子。</p>
</li>
</ol>
<p><strong>mixins 的优缺点</strong>：</p>
<p>优点：组件中相同代码逻辑复用；</p>
<p>缺点：变量来源不明确：变量来源不明确（隐式传入），不利于阅读，使代码变得难以维护。
命名冲突：多个 mixins 的生命周期会融合到一起运行，但是同名属性、同名方法无法融合，可能会导致冲突。
滥用会造成维护问题：mixins 和组件可能出现多对多的关系，复杂度较高（即一个组件可以引用多个 mixins，一个 mixins 也可以被多个组件引用）。</p>
<p>注：VUE3 提出的 Composition API 旨在解决这些问题。mixins 的缺点是 Composition API 背后的主要动因之一，Composition API 受到 React Hooks 的启发。</p>
</div></template>



<template><div><h1 id="自用-graphql基础学习" tabindex="-1"><a class="header-anchor" href="#自用-graphql基础学习"><span>[自用]__GraphQL基础学习</span></a></h1>
<p>参考文章：</p>
<blockquote>
<p>https://www.freecodecamp.org/chinese/news/a-detailed-guide-to-graphql/<br>
https://graphql.cn/learn/</p>
</blockquote>
<h2 id="何为-graphql" tabindex="-1"><a class="header-anchor" href="#何为-graphql"><span>何为 GraphQL</span></a></h2>
<p>GraphQL 是一种面向数据的 API 查询风格。</p>
<p>传统的 API 拿到的是前后端约定好的数据格式，GraphQL 对 API 中的数据提供了一套易于理解的完整描述，客户端能够准确地获得它需要的数据，没有任何冗余，也让 API 更容易地随着时间推移而演进，还能用于构建强大的开发者工具。</p>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2>
<p>GraphQL 是一个用于 API 的查询语言，是一个使用基于类型系统来执行查询的服务端运行时（类型系统由你的数据定义）。GraphQL 并没有和任何特定数据库或者存储引擎绑定，而是依靠你现有的代码和数据支撑。</p>
<p>一个 GraphQL 服务是通过定义类型和类型上的字段来创建的，然后给每个类型上的每个字段提供解析函数。</p>
<p>例如，一个 GraphQL 服务告诉我们当前登录用户是 me，这个用户的名称可能像这样：</p>
<div class="language-graphql line-numbers-mode" data-highlighter="shiki" data-ext="graphql" data-title="graphql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">type</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF"> Query</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  me</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">User</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">type</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF"> User</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">ID</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">String</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一并的还有每个类型上字段的解析函数：</p>
<div class="language-graphql line-numbers-mode" data-highlighter="shiki" data-ext="graphql" data-title="graphql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Query_me</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(request) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  return</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">auth</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">user</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> User_name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(user) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  return</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> user</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">getName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦一个 GraphQL 服务运行起来（通常在 web 服务的一个 URL 上），它就能接收 GraphQL 查询，并验证和执行。接收到的查询首先会被检查确保它只引用了已定义的类型和字段，然后运行指定的解析函数来生成结果。</p>
<div class="language-graphql line-numbers-mode" data-highlighter="shiki" data-ext="graphql" data-title="graphql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查询</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  me</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    name</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 结果 （JSON格式）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  "me"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    "name"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">"Luke Skywalker"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重要概念" tabindex="-1"><a class="header-anchor" href="#重要概念"><span>重要概念</span></a></h2>
<blockquote>
<p>一些基础概念可以通过官网文档进行更详细的了解：https://graphql.cn/learn/queries/#fields （其中也有很多高级的操作如：指令、联合类型、内联片段等）</p>
</blockquote>
<h3 id="操作类型-operation-type" tabindex="-1"><a class="header-anchor" href="#操作类型-operation-type"><span>操作类型 Operation Type</span></a></h3>
<p>GraphQL 的操作类型可以是 query、mutation 或 subscription，描述客户端希望进行什么样的操作</p>
<ol>
<li>query 查询：获取数据，比如查找，CRUD 中的 R</li>
<li>mutation 变更：对数据进行变更，比如增加、删除、修改，CRUD 中的 CUD</li>
<li>substription 订阅：当数据发生更改，进行消息推送</li>
</ol>
<div class="language-graphql line-numbers-mode" data-highlighter="shiki" data-ext="graphql" data-title="graphql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 这些操作类型都将在后文实际用到，比如这里进行一个查询操作</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">query</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  user</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="对象类型和标量类型-object-type-scalar-type" tabindex="-1"><a class="header-anchor" href="#对象类型和标量类型-object-type-scalar-type"><span>对象类型和标量类型 Object Type &amp; Scalar Type</span></a></h3>
<p>如果一个 GraphQL 服务接受到了一个 <code v-pre>query</code>，那么这个 <code v-pre>query</code> 将从 <code v-pre>Root Query</code> 开始查找，找到对象类型（Object Type）时则使用它的解析函数 Resolver 来获取内容，如果返回的是对象类型则继续使用解析函数获取内容，如果返回的是标量类型（Scalar Type）则结束获取，直到找到最后一个标量类型。</p>
<ol>
<li>对象类型：用户在 schema 中定义的 type</li>
<li>标量类型：GraphQL 中内置有一些标量类型 String、Int、Float、Boolean、ID，用户也可以定义自己的标量类型</li>
</ol>
<div class="language-graphql line-numbers-mode" data-highlighter="shiki" data-ext="graphql" data-title="graphql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 比如在 Schema 中声明：</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">type</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF"> User</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">!</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  age</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">Int</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>



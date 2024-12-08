<template><div><h1 id="nginx知识点汇总" tabindex="-1"><a class="header-anchor" href="#nginx知识点汇总"><span>nginx知识点汇总</span></a></h1>
<blockquote>
<p>主要参考书/资料:<br>
<a href="https://www.bookstack.cn/read/nginx-tutorial/README.md" target="_blank" rel="noopener noreferrer">nginx从入门到精通</a></p>
</blockquote>
<h2 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理"><span>反向代理</span></a></h2>
<p>反向代理可以说是 nginx 最知名的功能之一了，那么什么事反向代理呢？</p>
<p>要说反向代理服务器，先来说一般的代理服务器。代理就是受委托去做一些事。</p>
<blockquote>
<p>假如用户A委托B去做一些事，做完之后B告诉A结果。在代理服务器中也是一样的道理，用户A通过代理服务器B访问网站C(<code v-pre>www.example.com</code>)，请求先到代理服务器B，B再转发请求到网站C，代理服务器B是真正访问网站C的，访问之后再把网站C的应答结果发给用户A。这样给用户A的感觉是C直接提供服务的一样，因为看不到B的整个处理过程。代理服务器是一个中间者，是充当转发请求的角色。这种代理也叫 <code v-pre>正向代理</code>。</p>
</blockquote>
<p>使用正向代理是要在客户端进行设置，比如浏览器设置代理服务器的域名或IP，还有端口等......</p>
<p>总之，正向代理的作用有很多，例如，能访问本无法访问的，加速，cache，隐藏访问者的行踪等，具体的不再详述了。</p>
<p><code v-pre>反向代理</code>(reverse proxy)正好与正向代理相反，对于客户端而言代理服务器就像是原始服务器，并且客户端不需要进行任何特别的设置。</p>
<blockquote>
<p>假如用户A访问网站B，这个时候网站B充当了web服务器，也充当了反向代理服务器，它充当的代理服务器的角色是这样，假如用户A要得到网站C的内容，而用户A又不能直接访问到(例如网络原因)，而服务器B可以访问到网站C，那服务器可以得到网站C的内容再存起来发给用户A，这整个过程用户A是直接和代理服务器B交互的，用户A不知道网站C的存在，这个web服务器B就是一台反向代理服务器，这个网站C就是上游服务器(upstream servers)。</p>
</blockquote>
</div></template>



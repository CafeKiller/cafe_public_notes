import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e,o as i}from"./app-DOgujuAr.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx"><span>Nginx</span></a></h1><h1 id="扩展知识" tabindex="-1"><a class="header-anchor" href="#扩展知识"><span>扩展知识</span></a></h1><h1 id="面试问答" tabindex="-1"><a class="header-anchor" href="#面试问答"><span>面试问答</span></a></h1><h2 id="关于-nginx-的反向代理" tabindex="-1"><a class="header-anchor" href="#关于-nginx-的反向代理"><span>关于 Nginx 的反向代理</span></a></h2><p>反向代理可以说是 nginx 最知名的功能之一了，那么什么是反向代理呢？</p><p>要说反向代理服务器，先来说一般的代理服务器。代理就是受委托去做一些事。</p><blockquote><p>假如用户A委托B去做一些事，做完之后B告诉A结果。在代理服务器中也是一样的道理，用户A通过代理服务器B访问网站C(<code>www.example.com</code>)，请求先到代理服务器B，B再转发请求到网站C，代理服务器B是真正访问网站C的，访问之后再把网站C的应答结果发给用户A。这样给用户A的感觉是C直接提供服务的一样，因为看不到B的整个处理过程。代理服务器是一个中间者，是充当转发请求的角色。这种代理也叫 <code>正向代理</code>。</p></blockquote><p>使用正向代理是要在客户端进行设置，比如浏览器设置代理服务器的域名或IP，还有端口等......</p><p>总之，正向代理的作用有很多，例如，能访问本无法访问的，加速，cache，隐藏访问者的行踪等，具体的不再详述了。</p><p><code>反向代理</code>(reverse proxy)正好与正向代理相反，对于客户端而言代理服务器就像是原始服务器，并且客户端不需要进行任何特别的设置。</p><blockquote><p>假如用户A访问网站B，这个时候网站B充当了web服务器，也充当了反向代理服务器，它充当的代理服务器的角色是这样，假如用户A要得到网站C的内容，而用户A又不能直接访问到(例如网络原因)，而服务器B可以访问到网站C，那服务器可以得到网站C的内容再存起来发给用户A，这整个过程用户A是直接和代理服务器B交互的，用户A不知道网站C的存在，这个web服务器B就是一台反向代理服务器，这个网站C就是上游服务器(upstream servers)。</p></blockquote><h1 id="实战配置" tabindex="-1"><a class="header-anchor" href="#实战配置"><span>实战配置</span></a></h1><h2 id="静态资源服务-前端web" tabindex="-1"><a class="header-anchor" href="#静态资源服务-前端web"><span>静态资源服务：前端web</span></a></h2><blockquote><p>Nginx 配置为服务静态文件，如 HTML、CSS、JavaScript 和图片等。<br> 通过设置 root 指令，指定了静态文件的根目录。<br> 同时，对于图片文件，通过 expires 指令设置了缓存时间为 30 天，减少了服务器的负载和用户等待时间。</p></blockquote><div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span>    server_name example.com;</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        root /path/to/your/static/files;</span></span>
<span class="line"><span>        index index.html index.htm;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    location ~* \\.(jpg|png|gif|jpeg)$ {</span></span>
<span class="line"><span>        expires 30d;</span></span>
<span class="line"><span>        add_header Cache-Control &quot;public&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理"><span>反向代理</span></a></h2><blockquote><p>当客户端请求 api.example.com 时，Nginx 会将请求转发到后端服务器集群。 通过设置 proxy_set_header，可以修改客户端请求的头部信息，确保后端服务器能够正确处理请求。</p></blockquote><div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span>    server_name api.example.com;</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        proxy_pass http://backend;</span></span>
<span class="line"><span>        proxy_set_header Host $host;</span></span>
<span class="line"><span>        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span>        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡"><span>负载均衡</span></a></h2><blockquote><p>Nginx 将请求分发给多个后端服务器。<br> 通过 upstream 指令定义了一个服务器组，然后在 location 块中使用 proxy_pass 指令将请求代理到这个服务器组。<br> Nginx 支持多种负载均衡策略，如轮询（默认）、IP 哈希等。</p></blockquote><div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>http {</span></span>
<span class="line"><span>    upstream backend {</span></span>
<span class="line"><span>        server backend1.example.com;</span></span>
<span class="line"><span>        server backend2.example.com;</span></span>
<span class="line"><span>        server backend3.example.com;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen 80;</span></span>
<span class="line"><span>        server_name example.com;</span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            proxy_pass http://backend;</span></span>
<span class="line"><span>            proxy_set_header Host $host;</span></span>
<span class="line"><span>            proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span>            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="htttps-配置" tabindex="-1"><a class="header-anchor" href="#htttps-配置"><span>HTTTPS 配置</span></a></h2><blockquote><p>通过指定 SSL 证书和私钥的路径，以及设置 SSL 协议和加密套件，可以确保数据传输的安全。同时，建议使用 HTTP/2 协议以提升性能。</p></blockquote><div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 443 ssl;</span></span>
<span class="line"><span>    server_name example.com;</span></span>
<span class="line"><span>    ssl_certificate /path/to/your/fullchain.pem;</span></span>
<span class="line"><span>    ssl_certificate_key /path/to/your/private.key;</span></span>
<span class="line"><span>    ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span>    ssl_ciphers &#39;ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384&#39;;</span></span>
<span class="line"><span>    ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        root /path/to/your/https/static/files;</span></span>
<span class="line"><span>        index index.html index.htm;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安全防护" tabindex="-1"><a class="header-anchor" href="#安全防护"><span>安全防护</span></a></h2><blockquote><p>通过 rewrite 指令，可以防止一些常见的 Web 攻击，如 SQL 注入。<br> 这种限制请求方法，可以减少服务器被恶意利用的风险。<br> 同时，添加了一些 HTTP 头部来增强浏览器安全，如防止点击劫持和跨站脚本攻击（XSS）等。</p></blockquote><div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span>    server_name example.com;</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        # 防止 SQL 注入等攻击</span></span>
<span class="line"><span>        rewrite ^/(.*)$ /index.php?param=$1 break;</span></span>
<span class="line"><span>        # 限制请求方法，只允许 GET 和 POST</span></span>
<span class="line"><span>        if ($request_method !~ ^(GET|POST)$ ) {</span></span>
<span class="line"><span>            return 444;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        # 防止跨站请求伪造</span></span>
<span class="line"><span>        add_header X-Frame-Options &quot;SAMEORIGIN&quot;;</span></span>
<span class="line"><span>        add_header X-Content-Type-Options &quot;nosniff&quot;;</span></span>
<span class="line"><span>        add_header X-XSS-Protection &quot;1; mode=block&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27)]))}const t=n(l,[["render",p]]),o=JSON.parse('{"path":"/2_Chesses/%E8%AE%A1%E7%AE%97%E6%9C%BA%E9%A2%86%E5%9F%9F/WEB%E5%BC%80%E5%8F%91%EF%BC%9A%E8%BF%90%E7%BB%B4/Nginx%E6%9C%8D%E5%8A%A1%E5%99%A8.html","title":"Nginx","lang":"zh-CN","frontmatter":{"category":"学习笔记","tags":["nginx"]},"git":{"createdTime":1724425628000,"updatedTime":1744556425000,"contributors":[{"name":"CoffeeKiller","username":"CoffeeKiller","email":"18320210361@163.com","commits":5,"url":"https://github.com/CoffeeKiller"},{"name":"cafe","username":"cafe","email":"18320210361@163.com","commits":2,"url":"https://github.com/cafe"}]},"readingTime":{"minutes":3.78,"words":1135},"filePathRelative":"2_Chesses/计算机领域/WEB开发：运维/Nginx服务器.md"}');export{t as comp,o as data};

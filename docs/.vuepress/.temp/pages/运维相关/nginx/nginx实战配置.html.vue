<template><div><h1 id="nginx-实战配置" tabindex="-1"><a class="header-anchor" href="#nginx-实战配置"><span>Nginx 实战配置</span></a></h1>
<blockquote>
<p>基本可以直接复制使用</p>
</blockquote>
<h1 id="静态资源服务-前端web" tabindex="-1"><a class="header-anchor" href="#静态资源服务-前端web"><span>静态资源服务：前端web</span></a></h1>
<blockquote>
<p>Nginx 配置为服务静态文件，如 HTML、CSS、JavaScript 和图片等。<br>
通过设置 root 指令，指定了静态文件的根目录。<br>
同时，对于图片文件，通过 expires 指令设置了缓存时间为 30 天，减少了服务器的负载和用户等待时间。</p>
</blockquote>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span>    server_name example.com;</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        root /path/to/your/static/files;</span></span>
<span class="line"><span>        index index.html index.htm;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    location ~* \.(jpg|png|gif|jpeg)$ {</span></span>
<span class="line"><span>        expires 30d;</span></span>
<span class="line"><span>        add_header Cache-Control "public";</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理"><span>反向代理</span></a></h1>
<blockquote>
<p>当客户端请求 api.example.com 时，Nginx 会将请求转发到后端服务器集群。
通过设置 proxy_set_header，可以修改客户端请求的头部信息，确保后端服务器能够正确处理请求。</p>
</blockquote>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span>    server_name api.example.com;</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        proxy_pass http://backend;</span></span>
<span class="line"><span>        proxy_set_header Host $host;</span></span>
<span class="line"><span>        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span>        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡"><span>负载均衡</span></a></h1>
<blockquote>
<p>Nginx 将请求分发给多个后端服务器。<br>
通过 upstream 指令定义了一个服务器组，然后在 location 块中使用 proxy_pass 指令将请求代理到这个服务器组。<br>
Nginx 支持多种负载均衡策略，如轮询（默认）、IP 哈希等。</p>
</blockquote>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>http {</span></span>
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
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="htttps-配置" tabindex="-1"><a class="header-anchor" href="#htttps-配置"><span>HTTTPS 配置</span></a></h1>
<blockquote>
<p>通过指定 SSL 证书和私钥的路径，以及设置 SSL 协议和加密套件，可以确保数据传输的安全。同时，建议使用 HTTP/2 协议以提升性能。</p>
</blockquote>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 443 ssl;</span></span>
<span class="line"><span>    server_name example.com;</span></span>
<span class="line"><span>    ssl_certificate /path/to/your/fullchain.pem;</span></span>
<span class="line"><span>    ssl_certificate_key /path/to/your/private.key;</span></span>
<span class="line"><span>    ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span>    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';</span></span>
<span class="line"><span>    ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        root /path/to/your/https/static/files;</span></span>
<span class="line"><span>        index index.html index.htm;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="安全防护" tabindex="-1"><a class="header-anchor" href="#安全防护"><span>安全防护</span></a></h1>
<blockquote>
<p>通过 rewrite 指令，可以防止一些常见的 Web 攻击，如 SQL 注入。<br>
这种限制请求方法，可以减少服务器被恶意利用的风险。<br>
同时，添加了一些 HTTP 头部来增强浏览器安全，如防止点击劫持和跨站脚本攻击（XSS）等。</p>
</blockquote>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server {</span></span>
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
<span class="line"><span>        add_header X-Frame-Options "SAMEORIGIN";</span></span>
<span class="line"><span>        add_header X-Content-Type-Options "nosniff";</span></span>
<span class="line"><span>        add_header X-XSS-Protection "1; mode=block";</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>



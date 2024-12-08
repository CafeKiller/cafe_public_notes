<template><div><h1 id="nginx的基本使用" tabindex="-1"><a class="header-anchor" href="#nginx的基本使用"><span>Nginx的基本使用</span></a></h1>
<blockquote>
<p>主要参考书/资料:<br>
<a href="https://www.bookstack.cn/read/nginx-tutorial/README.md" target="_blank" rel="noopener noreferrer">nginx从入门到精通</a><br>
<a href="https://www.bookstack.cn/read/dunwu-nginx-tutorial/docs-nginx-introduction.md" target="_blank" rel="noopener noreferrer">nginx 极简教程</a><br>
<a href="https://tengine.taobao.org/book/index.html" target="_blank" rel="noopener noreferrer">Nginx开发从入门到精通</a></p>
</blockquote>
<p>本文章更多的是帮助你快速的搭建一个 nginx 服务，更多的偏向实战，如果你想了解更多详细的 nginx 的知识，建议看一下上文的参考书/资料链接。</p>
<h2 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作"><span>基本操作</span></a></h2>
<p>windows 直接前往<a href="https://nginx.org/en/download.html" target="_blank" rel="noopener noreferrer">官方下载</a>安装即可。</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt-get</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nginx</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 安装, ubuntu 系统</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> stop</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">       # 快速关闭Nginx，可能不保存相关信息，并迅速终止web服务。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> quit</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">       # 平稳关闭Nginx，保存相关信息，有安排的结束web服务。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> reload</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">     # 因改变了Nginx相关配置，需要重新加载配置而重载。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> reopen</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">     # 重新打开日志文件。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> filename</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">   # 为 Nginx 指定一个配置文件，来代替缺省的。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -t</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            # 不运行，仅仅测试配置文件。nginx 将检查配置文件的语法的正确性，并尝试打开配置文件中所引用到的文件。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -v</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            # 显示 nginx 的版本。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -V</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            # 显示 nginx 的版本，编译器版本和配置参数。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>windows下可以编写一个 <code v-pre>startup.bat</code> 脚本来启动 nginx, 这样会方便很多。</p>
<div class="language-bat line-numbers-mode" data-highlighter="shiki" data-ext="bat" data-title="bat" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">echo</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> off</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-light-font-style:italic;--shiki-dark:#C678DD;--shiki-dark-font-style:italic">rem</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> 如果启动前已经启动nginx并记录下pid文件，会kill指定进程</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">nginx.exe -s stop</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-light-font-style:italic;--shiki-dark:#C678DD;--shiki-dark-font-style:italic">rem</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> 测试配置文件语法正确性</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">nginx.exe -t -c conf/nginx.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-light-font-style:italic;--shiki-dark:#C678DD;--shiki-dark-font-style:italic">rem</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> 显示版本信息</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">nginx.exe -v</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-light-font-style:italic;--shiki-dark:#C678DD;--shiki-dark-font-style:italic">rem</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> 按照指定配置去启动nginx</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">nginx.exe -c conf/nginx.conf</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="http-反向代理" tabindex="-1"><a class="header-anchor" href="#http-反向代理"><span>Http 反向代理</span></a></h2>
<blockquote>
<p>注：conf/nginx.conf 是 nginx 的默认配置文件。你也可以使用 nginx -c 指定你的配置文件</p>
</blockquote>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># ########################################################</span></span>
<span class="line"><span># 请将下文中的 D:/Tools/nginx-1.10.1 替换为你本机nginx的安装路径</span></span>
<span class="line"><span># 下文 location 静态文件的 root 路径请替换为 你本机的静态资源路径</span></span>
<span class="line"><span># 建议使用 Ctrl + H 进行批量替换, 防止错误</span></span>
<span class="line"><span># ########################################################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#运行用户</span></span>
<span class="line"><span>#user somebody;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#启动进程,通常设置成和cpu的数量相等</span></span>
<span class="line"><span>worker_processes  1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#全局错误日志</span></span>
<span class="line"><span>error_log  D:/Tools/nginx-1.10.1/logs/error.log;</span></span>
<span class="line"><span>error_log  D:/Tools/nginx-1.10.1/logs/notice.log  notice;</span></span>
<span class="line"><span>error_log  D:/Tools/nginx-1.10.1/logs/info.log  info;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#PID文件，记录当前启动的nginx的进程ID</span></span>
<span class="line"><span>pid        D:/Tools/nginx-1.10.1/logs/nginx.pid;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#工作模式及连接数上限</span></span>
<span class="line"><span>events {</span></span>
<span class="line"><span>    worker_connections 1024;    #单个后台worker process进程的最大并发链接数</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#设定http服务器，利用它的反向代理功能提供负载均衡支持</span></span>
<span class="line"><span>http {</span></span>
<span class="line"><span>    #设定mime类型(邮件支持类型),类型由mime.types文件定义</span></span>
<span class="line"><span>    include       D:/Tools/nginx-1.10.1/conf/mime.types;</span></span>
<span class="line"><span>    default_type  application/octet-stream;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #设定日志</span></span>
<span class="line"><span>    log_format  main  '[$remote_addr] - [$remote_user] [$time_local] "$request" '</span></span>
<span class="line"><span>                      '$status $body_bytes_sent "$http_referer" '</span></span>
<span class="line"><span>                      '"$http_user_agent" "$http_x_forwarded_for"';</span></span>
<span class="line"><span>    access_log    D:/Tools/nginx-1.10.1/logs/access.log main;</span></span>
<span class="line"><span>    rewrite_log     on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，</span></span>
<span class="line"><span>    #必须设为 on,如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，以平衡磁盘与网络I/O处理速度，降低系统的uptime.</span></span>
<span class="line"><span>    sendfile        on;</span></span>
<span class="line"><span>    #tcp_nopush     on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #连接超时时间</span></span>
<span class="line"><span>    keepalive_timeout  120;</span></span>
<span class="line"><span>    tcp_nodelay        on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #gzip压缩开关</span></span>
<span class="line"><span>    #gzip  on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #设定实际的服务器列表</span></span>
<span class="line"><span>    upstream my_server1{</span></span>
<span class="line"><span>        server 127.0.0.1:8089;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    #HTTP服务器</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        #监听80端口，80端口是知名端口号，用于HTTP协议</span></span>
<span class="line"><span>        listen       80;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #定义使用www.xx.com访问</span></span>
<span class="line"><span>        server_name  www.helloworld.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #首页</span></span>
<span class="line"><span>        index index.html</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #指向webapp的目录</span></span>
<span class="line"><span>        root D:\01_Workspace\Project\github\zp\SpringNotes\spring-security\spring-shiro\src\main\webapp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #编码格式</span></span>
<span class="line"><span>        charset utf-8;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #代理配置参数</span></span>
<span class="line"><span>        proxy_connect_timeout 180;</span></span>
<span class="line"><span>        proxy_send_timeout 180;</span></span>
<span class="line"><span>        proxy_read_timeout 180;</span></span>
<span class="line"><span>        proxy_set_header Host $host;</span></span>
<span class="line"><span>        proxy_set_header X-Forwarder-For $remote_addr;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #反向代理的路径（和upstream绑定），location 后面设置映射的路径</span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            proxy_pass http://my_server1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #静态文件，nginx自己处理</span></span>
<span class="line"><span>        location ~ ^/(images|javascript|js|css|flash|media|static)/ {</span></span>
<span class="line"><span>            root D:\01_Workspace\Project\github\zp\SpringNotes\spring-security\spring-shiro\src\main\webapp\views;</span></span>
<span class="line"><span>            #过期30天，静态文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。</span></span>
<span class="line"><span>            expires 30d;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #设定查看Nginx状态的地址</span></span>
<span class="line"><span>        location /NginxStatus {</span></span>
<span class="line"><span>            stub_status           on;</span></span>
<span class="line"><span>            access_log            on;</span></span>
<span class="line"><span>            auth_basic            "NginxStatus";</span></span>
<span class="line"><span>            auth_basic_user_file  conf/htpasswd;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #禁止访问 .htxxx 文件</span></span>
<span class="line"><span>        location ~ /\.ht {</span></span>
<span class="line"><span>            deny all;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #错误处理页面（可选择性配置）</span></span>
<span class="line"><span>        error_page   404              /404.html;</span></span>
<span class="line"><span>        error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span>        location = /50x.html {</span></span>
<span class="line"><span>            root   html;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实践步骤:</p>
<ol>
<li>启动 webapp，注意启动绑定的端口要和 nginx 中的 <code v-pre>upstream</code> 设置的端口保持一致；</li>
<li>更改 host：在 C:\Windows\System32\drivers\etc 目录下的 host 文件中添加一条 DNS 记录：<code v-pre>127.0.0.1 www.helloworld.com</code></li>
<li>启动前文中 startup.bat 的命令</li>
<li>在浏览器中访问 <code v-pre>www.helloworld.com</code> ，不出意外，已经可以访问了。</li>
</ol>
<h2 id="https-反向代理" tabindex="-1"><a class="header-anchor" href="#https-反向代理"><span>Https 反向代理</span></a></h2>
<p>其他和 http 反向代理基本一样，只是在 Server 部分配置有些不同。</p>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>  #HTTP服务器</span></span>
<span class="line"><span>  server {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      #监听443端口。443为知名端口号，主要用于HTTPS协议</span></span>
<span class="line"><span>      listen       443 ssl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      #定义使用www.xx.com访问</span></span>
<span class="line"><span>      server_name  www.helloworld.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      #ssl证书文件位置(常见证书文件格式为：crt/pem)</span></span>
<span class="line"><span>      ssl_certificate      cert.pem;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      #ssl证书key位置</span></span>
<span class="line"><span>      ssl_certificate_key  cert.key;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      #ssl配置参数（选择性配置）</span></span>
<span class="line"><span>      ssl_session_cache    shared:SSL:1m;</span></span>
<span class="line"><span>      ssl_session_timeout  5m;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      #数字签名，此处使用MD5</span></span>
<span class="line"><span>      ssl_ciphers  HIGH:!aNULL:!MD5;</span></span>
<span class="line"><span>      ssl_prefer_server_ciphers  on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      location / {</span></span>
<span class="line"><span>          root   /root;</span></span>
<span class="line"><span>          index  index.html index.htm;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>  }</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡"><span>负载均衡</span></a></h2>
<p>假设一个需要负载均衡的需求场景：将应用部署在 192.168.1.11:80、192.168.1.12:80、192.168.1.13:80 三台 linux 环境的服务器上。网站域名叫 www.helloworld.com，公网 IP 为 192.168.1.11。在公网 IP 所在的服务器上部署 nginx，对所有请求做负载均衡处理（下面例子中使用的是加权轮询策略）。</p>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>http {</span></span>
<span class="line"><span>    #设定mime类型,类型由mime.type文件定义</span></span>
<span class="line"><span>    include       /etc/nginx/mime.types;</span></span>
<span class="line"><span>    default_type  application/octet-stream;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    #设定日志格式</span></span>
<span class="line"><span>    access_log    /var/log/nginx/access.log;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    #设定负载均衡的服务器列表</span></span>
<span class="line"><span>    upstream load_balance_server {</span></span>
<span class="line"><span>        #weigth参数表示权值，权值越高被分配到的几率越大</span></span>
<span class="line"><span>        server 192.168.1.11:80   weight=5;</span></span>
<span class="line"><span>        server 192.168.1.12:80   weight=1;</span></span>
<span class="line"><span>        server 192.168.1.13:80   weight=6;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>    #HTTP服务器</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        #侦听80端口</span></span>
<span class="line"><span>        listen       80;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #定义使用www.xx.com访问</span></span>
<span class="line"><span>        server_name  www.helloworld.com;</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        #对所有请求进行负载均衡请求</span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            root        /root;                 #定义服务器的默认网站根目录位置</span></span>
<span class="line"><span>            index       index.html index.htm;  #定义首页索引文件的名称</span></span>
<span class="line"><span>            proxy_pass  http://load_balance_server ;#请求转向load_balance_server 定义的服务器列表</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            #以下是一些反向代理的配置(可选择性配置)</span></span>
<span class="line"><span>            #proxy_redirect off;</span></span>
<span class="line"><span>            proxy_set_header Host $host;</span></span>
<span class="line"><span>            proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span>            #后端的Web服务器可以通过X-Forwarded-For获取用户真实IP</span></span>
<span class="line"><span>            proxy_set_header X-Forwarded-For $remote_addr;</span></span>
<span class="line"><span>            proxy_connect_timeout 90;          #nginx跟后端服务器连接超时时间(代理连接超时)</span></span>
<span class="line"><span>            proxy_send_timeout 90;             #后端服务器数据回传时间(代理发送超时)</span></span>
<span class="line"><span>            proxy_read_timeout 90;             #连接成功后，后端服务器响应时间(代理接收超时)</span></span>
<span class="line"><span>            proxy_buffer_size 4k;              #设置代理服务器（nginx）保存用户头信息的缓冲区大小</span></span>
<span class="line"><span>            proxy_buffers 4 32k;               #proxy_buffers缓冲区，网页平均在32k以下的话，这样设置</span></span>
<span class="line"><span>            proxy_busy_buffers_size 64k;       #高负荷下缓冲大小（proxy_buffers*2）</span></span>
<span class="line"><span>            proxy_temp_file_write_size 64k;    #设定缓存文件夹大小，大于这个值，将从upstream服务器传</span></span>
<span class="line"><span>            client_max_body_size 10m;          #允许客户端请求的最大单文件字节数</span></span>
<span class="line"><span>            client_body_buffer_size 128k;      #缓冲区代理缓冲用户端请求的最大字节数</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="负载均衡的策略" tabindex="-1"><a class="header-anchor" href="#负载均衡的策略"><span>负载均衡的策略</span></a></h3>
<p>此处不会进行原理介绍，只作使用介绍</p>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># 轮询</span></span>
<span class="line"><span>upstream bck_testing_01 {</span></span>
<span class="line"><span>    # 默认所有服务器权重为 1</span></span>
<span class="line"><span>    server 192.168.250.220:8080</span></span>
<span class="line"><span>    server 192.168.250.221:8080</span></span>
<span class="line"><span>    server 192.168.250.222:8080</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 加权轮询</span></span>
<span class="line"><span>upstream bck_testing_01 {</span></span>
<span class="line"><span>    server 192.168.250.220:8080   weight=3</span></span>
<span class="line"><span>    server 192.168.250.221:8080              # default weight=1</span></span>
<span class="line"><span>    server 192.168.250.222:8080              # default weight=1</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 最少连接</span></span>
<span class="line"><span>upstream bck_testing_01 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    least_conn;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # with default weight for all (weight=1)</span></span>
<span class="line"><span>    server 192.168.250.220:8080</span></span>
<span class="line"><span>    server 192.168.250.221:8080</span></span>
<span class="line"><span>    server 192.168.250.222:8080</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 加权最少连接</span></span>
<span class="line"><span>upstream bck_testing_01 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    least_conn;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    server 192.168.250.220:8080   weight=3</span></span>
<span class="line"><span>    server 192.168.250.221:8080              # default weight=1</span></span>
<span class="line"><span>    server 192.168.250.222:8080              # default weight=1</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># IP Hash</span></span>
<span class="line"><span>upstream bck_testing_01 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ip_hash;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # with default weight for all (weight=1)</span></span>
<span class="line"><span>  server 192.168.250.220:8080</span></span>
<span class="line"><span>  server 192.168.250.221:8080</span></span>
<span class="line"><span>  server 192.168.250.222:8080</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 普通 Hash</span></span>
<span class="line"><span>upstream bck_testing_01 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  hash $request_uri;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # with default weight for all (weight=1)</span></span>
<span class="line"><span>  server 192.168.250.220:8080</span></span>
<span class="line"><span>  server 192.168.250.221:8080</span></span>
<span class="line"><span>  server 192.168.250.222:8080</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="网站有多个-webapp-时的配置" tabindex="-1"><a class="header-anchor" href="#网站有多个-webapp-时的配置"><span>网站有多个 WebAPP 时的配置</span></a></h2>
<p>当一个网站功能越来越丰富时，往往需要将一些功能相对独立的模块剥离出来，独立维护。这样的话，通常，会有多个 webapp。</p>
<p>举个例子：假如 www.helloworld.com 站点有好几个 webapp，finance（金融）、product（产品）、admin（用户中心）。访问这些应用的方式通过上下文(context)来进行区分:</p>
<ul>
<li><code v-pre>www.helloworld.com/finance/</code></li>
<li><code v-pre>www.helloworld.com/product/</code></li>
<li><code v-pre>www.helloworld.com/admin/</code></li>
</ul>
<p>我们知道，http 的默认端口号是 80，如果在一台服务器上同时启动这 3 个 webapp 应用，都用 80 端口，肯定是不成的。所以，这三个应用需要分别绑定不同的端口号。</p>
<p>那么，问题来了，用户在实际访问 www.helloworld.com 站点时，访问不同 webapp，总不会还带着对应的端口号去访问吧。所以，你再次需要用到反向代理来做处理。</p>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>http {</span></span>
<span class="line"><span>    #此处省略一些基本配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    upstream product_server{</span></span>
<span class="line"><span>        server www.helloworld.com:8081;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    upstream admin_server{</span></span>
<span class="line"><span>        server www.helloworld.com:8082;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    upstream finance_server{</span></span>
<span class="line"><span>        server www.helloworld.com:8083;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        #此处省略一些基本配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #默认指向product的server</span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            proxy_pass http://product_server;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location /product/{</span></span>
<span class="line"><span>            proxy_pass http://product_server;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location /admin/ {</span></span>
<span class="line"><span>            proxy_pass http://admin_server;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location /finance/ {</span></span>
<span class="line"><span>            proxy_pass http://finance_server;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="静态站点" tabindex="-1"><a class="header-anchor" href="#静态站点"><span>静态站点</span></a></h2>
<p>静态站点即指那些存放了一堆 html 文件和静态资源的网站</p>
<p>举例来说：如果所有的静态资源都放在了 /app/dist 目录下，我们只需要在 nginx.conf 中指定首页以及这个站点的 host 即可。</p>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>worker_processes  1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>events {</span></span>
<span class="line"><span>    worker_connections  1024;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>http {</span></span>
<span class="line"><span>    include       mime.types;</span></span>
<span class="line"><span>    default_type  application/octet-stream;</span></span>
<span class="line"><span>    sendfile        on;</span></span>
<span class="line"><span>    keepalive_timeout  65;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    gzip on;</span></span>
<span class="line"><span>    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/javascript image/jpeg image/gif image/png;</span></span>
<span class="line"><span>    gzip_vary on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen       80;</span></span>
<span class="line"><span>        server_name  static.cafe.cn;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            root /app/dist;</span></span>
<span class="line"><span>            index index.html;</span></span>
<span class="line"><span>            #转发任何请求到 index.html</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，添加 HOST：<code v-pre>127.0.0.1 static.zp.cn</code> 此时，在本地浏览器访问 <code v-pre>static.zp.cn</code> ，就可以访问静态站点了。</p>
<h2 id="搭建文件服务器" tabindex="-1"><a class="header-anchor" href="#搭建文件服务器"><span>搭建文件服务器</span></a></h2>
<p>有时候，团队需要归档一些数据或资料，那么文件服务器必不可少。使用 Nginx 可以非常快速便捷的搭建一个简易的文件服务。</p>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>autoindex on;# 显示目录</span></span>
<span class="line"><span>autoindex_exact_size on;# 显示文件大小</span></span>
<span class="line"><span>autoindex_localtime on;# 显示文件时间</span></span>
<span class="line"><span></span></span>
<span class="line"><span>server {</span></span>
<span class="line"><span>    charset      utf-8,gbk; # windows 服务器下设置后，依然乱码，暂时无解</span></span>
<span class="line"><span>    listen       9050 default_server;</span></span>
<span class="line"><span>    listen       [::]:9050 default_server;</span></span>
<span class="line"><span>    server_name  _;</span></span>
<span class="line"><span>    root         /share/fs;</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置跨域" tabindex="-1"><a class="header-anchor" href="#配置跨域"><span>配置跨域</span></a></h2>
<p>web 领域开发中，经常采用前后端分离模式。这种模式下，前端和后端分别是独立的 web 应用程序，例如：后端是 Java 程序，前端是 React 或 Vue 应用。</p>
<p>面对跨域问题通常有两种处理方式：</p>
<ol>
<li>CORS: 在后端服务器设置 HTTP 响应头，把你需要允许访问的域名加入 Access-Control-Allow-Origin 中。</li>
<li>jsonp: 把后端根据请求，构造 json 数据，并返回，前端用 jsonp 跨域。</li>
</ol>
<p>而 nginx 采用的就是第一种方法</p>
<p>举例：www.helloworld.com 网站是由一个前端 app ，一个后端 app 组成的。前端端口号为 9000， 后端端口号为 8080。</p>
<p>首先在 <code v-pre>enable-cors.conf</code> 文件中设置 cors ：</p>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># allow origin list</span></span>
<span class="line"><span>set $ACAO '*';</span></span>
<span class="line"><span></span></span>
<span class="line"><span># set single origin</span></span>
<span class="line"><span>if ($http_origin ~* (www.helloworld.com)$) {</span></span>
<span class="line"><span>  set $ACAO $http_origin;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($cors = "trueget") {</span></span>
<span class="line"><span>    add_header 'Access-Control-Allow-Origin' "$http_origin";</span></span>
<span class="line"><span>    add_header 'Access-Control-Allow-Credentials' 'true';</span></span>
<span class="line"><span>    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';</span></span>
<span class="line"><span>    add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($request_method = 'OPTIONS') {</span></span>
<span class="line"><span>  set $cors "${cors}options";</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($request_method = 'GET') {</span></span>
<span class="line"><span>  set $cors "${cors}get";</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($request_method = 'POST') {</span></span>
<span class="line"><span>  set $cors "${cors}post";</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，在你的服务器中 <code v-pre>include enable-cors.conf</code> 来引入跨域配置:</p>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" data-title="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># ----------------------------------------------------</span></span>
<span class="line"><span># 此文件为项目 nginx 配置片段</span></span>
<span class="line"><span># 可以直接在 nginx config 中 include（推荐）</span></span>
<span class="line"><span># 或者 copy 到现有 nginx 中，自行配置</span></span>
<span class="line"><span># www.helloworld.com 域名需配合 dns hosts 进行配置</span></span>
<span class="line"><span># 其中，api 开启了 cors，需配合本目录下另一份配置文件</span></span>
<span class="line"><span># ----------------------------------------------------</span></span>
<span class="line"><span>upstream front_server{</span></span>
<span class="line"><span>  server www.helloworld.com:9000;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>upstream api_server{</span></span>
<span class="line"><span>  server www.helloworld.com:8080;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>server {</span></span>
<span class="line"><span>  listen       80;</span></span>
<span class="line"><span>  server_name  www.helloworld.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  location ~ ^/api/ {</span></span>
<span class="line"><span>    include enable-cors.conf;</span></span>
<span class="line"><span>    proxy_pass http://api_server;</span></span>
<span class="line"><span>    rewrite "^/api/(.*)$" /$1 break;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  location ~ ^/ {</span></span>
<span class="line"><span>    proxy_pass http://front_server;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>



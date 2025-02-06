# Nginx 实战配置

> 基本可以直接复制使用

# 静态资源服务：前端web

> Nginx 配置为服务静态文件，如 HTML、CSS、JavaScript 和图片等。  
> 通过设置 root 指令，指定了静态文件的根目录。  
> 同时，对于图片文件，通过 expires 指令设置了缓存时间为 30 天，减少了服务器的负载和用户等待时间。

```conf
server {
    listen 80;
    server_name example.com;
    location / {
        root /path/to/your/static/files;
        index index.html index.htm;
    }
    location ~* \.(jpg|png|gif|jpeg)$ {
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

# 反向代理

> 当客户端请求 api.example.com 时，Nginx 会将请求转发到后端服务器集群。
> 通过设置 proxy_set_header，可以修改客户端请求的头部信息，确保后端服务器能够正确处理请求。

```conf
server {
    listen 80;
    server_name api.example.com;
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

# 负载均衡

> Nginx 将请求分发给多个后端服务器。  
> 通过 upstream 指令定义了一个服务器组，然后在 location 块中使用 proxy_pass 指令将请求代理到这个服务器组。  
> Nginx 支持多种负载均衡策略，如轮询（默认）、IP 哈希等。

```conf
http {
    upstream backend {
        server backend1.example.com;
        server backend2.example.com;
        server backend3.example.com;
    }
    server {
        listen 80;
        server_name example.com;
        location / {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

# HTTTPS 配置

> 通过指定 SSL 证书和私钥的路径，以及设置 SSL 协议和加密套件，可以确保数据传输的安全。同时，建议使用 HTTP/2 协议以提升性能。

```conf
server {
    listen 443 ssl;
    server_name example.com;
    ssl_certificate /path/to/your/fullchain.pem;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers on;
    location / {
        root /path/to/your/https/static/files;
        index index.html index.htm;
    }
}
```

# 安全防护

> 通过 rewrite 指令，可以防止一些常见的 Web 攻击，如 SQL 注入。  
> 这种限制请求方法，可以减少服务器被恶意利用的风险。  
> 同时，添加了一些 HTTP 头部来增强浏览器安全，如防止点击劫持和跨站脚本攻击（XSS）等。  

```conf
server {
    listen 80;
    server_name example.com;
    location / {
        # 防止 SQL 注入等攻击
        rewrite ^/(.*)$ /index.php?param=$1 break;
        # 限制请求方法，只允许 GET 和 POST
        if ($request_method !~ ^(GET|POST)$ ) {
            return 444;
        }
        # 防止跨站请求伪造
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Content-Type-Options "nosniff";
        add_header X-XSS-Protection "1; mode=block";
    }
}
```


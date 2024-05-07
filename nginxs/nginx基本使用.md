# Nginx�Ļ���ʹ��

> ��Ҫ�ο���/����:   
> [nginx�����ŵ���ͨ](https://www.bookstack.cn/read/nginx-tutorial/README.md)  
> [nginx ����̳�](https://www.bookstack.cn/read/dunwu-nginx-tutorial/docs-nginx-introduction.md)  

�����¸�����ǰ�������ٵĴһ�� nginx ���񣬸����ƫ��ʵս����������˽������ϸ�� nginx ��֪ʶ�����鿴һ�����ĵĲο���/�������ӡ�

## ��������

windows ֱ��ǰ��[�ٷ�����](https://nginx.org/en/download.html)��װ���ɡ�

```shell
sudo apt-get install nginx # ��װ, ubuntu ϵͳ

nginx -s stop       # ���ٹر�Nginx�����ܲ����������Ϣ����Ѹ����ֹweb����
nginx -s quit       # ƽ�ȹر�Nginx�����������Ϣ���а��ŵĽ���web����
nginx -s reload     # ��ı���Nginx������ã���Ҫ���¼������ö����ء�
nginx -s reopen     # ���´���־�ļ���
nginx -c filename   # Ϊ Nginx ָ��һ�������ļ���������ȱʡ�ġ�
nginx -t            # �����У��������������ļ���nginx ����������ļ����﷨����ȷ�ԣ������Դ������ļ��������õ����ļ���
nginx -v            # ��ʾ nginx �İ汾��
nginx -V            # ��ʾ nginx �İ汾���������汾�����ò�����
```

windows�¿��Ա�дһ�� `startup.bat` �ű������� nginx, �����᷽��ܶࡣ

```bat
@echo off
rem �������ǰ�Ѿ�����nginx����¼��pid�ļ�����killָ������
nginx.exe -s stop

rem ���������ļ��﷨��ȷ��
nginx.exe -t -c conf/nginx.conf

rem ��ʾ�汾��Ϣ
nginx.exe -v

rem ����ָ������ȥ����nginx
nginx.exe -c conf/nginx.conf
```

## Http �������

> ע��conf/nginx.conf �� nginx ��Ĭ�������ļ�����Ҳ����ʹ�� nginx -c ָ����������ļ�

```conf
# ########################################################
# �뽫�����е� D:/Tools/nginx-1.10.1 �滻Ϊ�㱾��nginx�İ�װ·��
# ���� location ��̬�ļ��� root ·�����滻Ϊ �㱾���ľ�̬��Դ·��
# ����ʹ�� Ctrl + H ���������滻, ��ֹ����
# ########################################################

#�����û�
#user somebody;

#��������,ͨ�����óɺ�cpu���������
worker_processes  1;

#ȫ�ִ�����־
error_log  D:/Tools/nginx-1.10.1/logs/error.log;
error_log  D:/Tools/nginx-1.10.1/logs/notice.log  notice;
error_log  D:/Tools/nginx-1.10.1/logs/info.log  info;

#PID�ļ�����¼��ǰ������nginx�Ľ���ID
pid        D:/Tools/nginx-1.10.1/logs/nginx.pid;

#����ģʽ������������
events {
    worker_connections 1024;    #������̨worker process���̵���󲢷�������
}

#�趨http���������������ķ���������ṩ���ؾ���֧��
http {
    #�趨mime����(�ʼ�֧������),������mime.types�ļ�����
    include       D:/Tools/nginx-1.10.1/conf/mime.types;
    default_type  application/octet-stream;

    #�趨��־
    log_format  main  '[$remote_addr] - [$remote_user] [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log    D:/Tools/nginx-1.10.1/logs/access.log main;
    rewrite_log     on;

    #sendfile ָ��ָ�� nginx �Ƿ���� sendfile ������zero copy ��ʽ��������ļ���������ͨӦ�ã�
    #������Ϊ on,��������������ص�Ӧ�ô���IO�ظ���Ӧ�ã�������Ϊ off����ƽ�����������I/O�����ٶȣ�����ϵͳ��uptime.
    sendfile        on;
    #tcp_nopush     on;

    #���ӳ�ʱʱ��
    keepalive_timeout  120;
    tcp_nodelay        on;

    #gzipѹ������
    #gzip  on;

    #�趨ʵ�ʵķ������б�
    upstream my_server1{
        server 127.0.0.1:8089;
    }
    #HTTP������
    server {
        #����80�˿ڣ�80�˿���֪���˿ںţ�����HTTPЭ��
        listen       80;

        #����ʹ��www.xx.com����
        server_name  www.helloworld.com;

        #��ҳ
        index index.html

        #ָ��webapp��Ŀ¼
        root D:\01_Workspace\Project\github\zp\SpringNotes\spring-security\spring-shiro\src\main\webapp;

        #�����ʽ
        charset utf-8;

        #�������ò���
        proxy_connect_timeout 180;
        proxy_send_timeout 180;
        proxy_read_timeout 180;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarder-For $remote_addr;

        #��������·������upstream�󶨣���location ��������ӳ���·��
        location / {
            proxy_pass http://my_server1;
        }

        #��̬�ļ���nginx�Լ�����
        location ~ ^/(images|javascript|js|css|flash|media|static)/ {
            root D:\01_Workspace\Project\github\zp\SpringNotes\spring-security\spring-shiro\src\main\webapp\views;
            #����30�죬��̬�ļ�����ô���£����ڿ������һ�㣬���Ƶ�����£���������õ�Сһ�㡣
            expires 30d;
        }

        #�趨�鿴Nginx״̬�ĵ�ַ
        location /NginxStatus {
            stub_status           on;
            access_log            on;
            auth_basic            "NginxStatus";
            auth_basic_user_file  conf/htpasswd;
        }

        #��ֹ���� .htxxx �ļ�
        location ~ /\.ht {
            deny all;
        }

        #������ҳ�棨��ѡ�������ã�
        error_page   404              /404.html;
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

ʵ������:  

1. ���� webapp��ע�������󶨵Ķ˿�Ҫ�� nginx �е� `upstream` ���õĶ˿ڱ���һ�£�
2. ���� host���� C:\Windows\System32\drivers\etc Ŀ¼�µ� host �ļ������һ�� DNS ��¼��`127.0.0.1 www.helloworld.com`
3. ����ǰ���� startup.bat ������
4. ��������з��� www.helloworld.com���������⣬�Ѿ����Է����ˡ�

## Https �������

������ http ����������һ����ֻ���� Server ����������Щ��ͬ�� 

```conf
  #HTTP������
  server {

      #����443�˿ڡ�443Ϊ֪���˿ںţ���Ҫ����HTTPSЭ��
      listen       443 ssl;

      #����ʹ��www.xx.com����
      server_name  www.helloworld.com;

      #ssl֤���ļ�λ��(����֤���ļ���ʽΪ��crt/pem)
      ssl_certificate      cert.pem;

      #ssl֤��keyλ��
      ssl_certificate_key  cert.key;

      #ssl���ò�����ѡ�������ã�
      ssl_session_cache    shared:SSL:1m;
      ssl_session_timeout  5m;

      #����ǩ�����˴�ʹ��MD5
      ssl_ciphers  HIGH:!aNULL:!MD5;
      ssl_prefer_server_ciphers  on;

      location / {
          root   /root;
          index  index.html index.htm;
      }
  }
```
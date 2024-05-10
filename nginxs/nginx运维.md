# nginx运维技巧

## 使用 docker 安装 nginx

官方镜像：[https://hub.docker.com/_/nginx/](https://hub.docker.com/_/nginx/)  

下载镜像  

```shell
docker pull nginx
```

启动容器  

```shell
docker run --name my-nginx -p 80:80 -v /data/docker/nginx/logs:/var/log/nginx -v /data/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx
```

停止服务

```shell
docker exec -it my-nginx nginx -s stop

# 或者

docker stop my-nginx
```

重启服务

```shell
docker restart my-nginx
```
---
title: "WSL2 踩坑指南"
category: 踩坑日志
subcategory: WSL2
level: 5
tags:
  - WSL2
  - 踩坑
---

# WSL2 踩坑指南

## 局域网无法正常访问WSL2的服务

一般在本机的PowerShell（管理员模式），使用这个命令就可以正常访问了。

`netsh interface portproxy add v4tov4 listenport=22 listenaddress=0.0.0.0 connectport=22 connectaddress=localhost`

- `listenport=22` : 监听外部连接的端口号
- `listenaddress=0.0.0.0` : 监听所有网络接口（即允许来自任何 IP 地址的外部连接）
- `connectport=22` : 将流量转发到目标机器的端口
- `connectaddress=localhost` : 将流量转发到本机

> [!warning] 注意
> ==connectaddress== 尽量绑定 wsl 中的内部IP，一般以 `172.x.x.x` 形式出现（可以使用 `hostname -I` 命令查询），否则无论是本机还是外部其他机器都可能无法访问到。
> 
> WSL2 的 IP 可能会变，可以写一个脚本自动更新端口转发
> 
> ```powershell
> $wsl_ip = (wsl hostname -I).Trim()
> # netsh interface portproxy reset
> netsh interface portproxy add v4tov4 listenport=3333
> listenaddress=0.0.0.0 connectport=3333 connectaddress=$wsl_ip
> ```
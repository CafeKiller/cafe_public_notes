---
category: 实操体验
tag:
    - WSL2
    - Linux
---

# WSL2 操作

> 本文使用的 Windows 版本限定为 ： windows11 23H2
> WSL2 算是一个比较新鲜的功能，很多地方不完善也不稳定，文档中的内容很可能会失效，请留意

> WSL2 是个轻量级的 Linux子系统，用来学习或者临时使用时OK的，但是想当作主机服务器去搞还是建议直接买台云服务器吧（或者自己组装服务器？）

## 开启 WSL2 

建议直接查看网上的教程，如 [博客园 - windows11 安装WSL2全流程](https://www.cnblogs.com/ubirdy/articles/18246999)

但还是更建议自己用 bing 或 google 搜索一下，避免版本问题或者其他问题

[bing 搜索（屏蔽csdn）](https://cn.bing.com/search?q=win11%E5%BC%80%E5%90%AF+wsl2+-site:csdn.net)

## WSL2 外网访问

WSL使用的自己的一套虚拟网络，通过桥接的方式与外部网络连通。如果需要使用其他主机访问则需要额外设置。

```shell
# 使用 超管模式下 的 powershell 输入以下命令即可转发 22 端口
netsh interface portproxy add v4tov4 listenport=22 listenaddress=0.0.0.0 connectport=22 connectaddress=localhost

# 查看 WSL2 被转发的所有接口
netsh interface portproxy show all

# 移除 22 端口的转发
netsh interface portproxy delete v4tov4 listenport=22 listenaddress=0.0.0.0
```

使用上面的方法可以让你的 WSL2 在局域网内直接暴露，但如果是想要公网（外网）访问，则必须要求你的 WindowsPC 也必须可以直接暴露公网，但这种很不安全。如果有这个需求还是更推荐用代理或者内网穿透。
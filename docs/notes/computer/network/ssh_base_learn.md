---
title: "SSH使用手册"
category: 通用计算机
subcategory: 网络
level: 5
zIndex: 150
tags:
  - Linux
  - SSH
  - 网络协议
---

# SSH使用手册

SSH（Secure Shell 的缩写）是一种网络协议，用于加密两台计算机之间的通信，并且支持各种身份验证机制。

实务中，它主要用于保证远程登录和远程通信的安全，任何网络服务都可以用这个协议来加密。


> [!tips]参考指南
>
> [阮一峰 - SSH教程](https://wangdoc.com/ssh/)
> 


## 基本使用

OpenSSH 的客户端是二进制程序 ssh。它在 Linux/Unix 系统的位置是 `/usr/local/bin/ssh`。

Linux 系统一般都自带 ssh，如果没有就需要安装。

*后续 Linux 环境将使用 Ubuntu 系统作为示例*

```shell
# 安装
sudo apt install openssh-client

# 查看版本
ssh -V

# 登录
ssh [hostname]

# 登录（指定用户名）
ssh [username]@[hostname]
# 同上
ssh -l [username] [hostname]

# 若目标未使用标准 22 端口，需要指定端口号
ssh [username]@[hostname] -p [port]
```

## Windows下安装

windows 同样也是支持 ssh 的，使用基本一致，但配置可能稍有不同。

> 此处使用 powershell 进行安装

1. 使用 `win + r` 打开「运行」窗口，键入 `powershell` 并按下 `ctrl + shift + enter` 此时将以管理员权限打开 PowerShell 命令行窗口。

2. 执行以下命令检查 openSSH 的安装状态

```shell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
# 若State返回 NotPresent 表示：未安装
# 若State返回 Installed  表示：已安装
```

3. 根据查询到的安装情况，选择安装 openSSH 的客服端or服务端组件

```shell
# 安装 OpenSSH 客户端
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0

# 安装 OpenSSH 服务器
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

*安装完毕后，可以再查询一次安装情况，确保正确安装*

### 配置

1. 同安装步骤一致，确保在管理员权限下运行 PowerShell 命令行窗口。

2. 设置 SSHD 服务自启动

```shell
Set-Service -Name sshd -StartupType 'Automatic'
```

3. 启动 SSHD 服务

```shell
Start-Service sshd
```

4. 检查 SSH 服务器是否在监听 22 端口

```shell
netstat -an | findstr /i ":22"
```

5. 确保 `WindowsDefender` 防火墙允许 TCP 22 端口的入站连接

```shell
Get-NetFirewallRule -Name *OpenSSH-Server* | select Name, DisplayName, Description, Enabled

# PS. 如果规则丢失or被禁用，可以创建新规则
New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

6. (可选) 如果需要修改配置，如设置用户访问权限，可以编辑 `sshd_config` 配置文件

```shell
# 使用 记事本 编辑
Start-Process Notepad "C:\Programdata\ssh\sshd_config"

# 使用 VSCode 编辑
Start-Process Code "C:\Programdata\ssh\sshd_config"

# 更改完毕后保存，记得重启 SSHD 服务
Restart-Service sshd
```




## 连接过程

ssh 连接远程服务器后，首先有一个验证过程，验证远程服务器是否为陌生地址。

如果是第一次连接某一台服务器，命令行会显示一段文字，表示不认识这台机器，提醒用户确认是否需要连接。

```log
The authenticity of host 'example.com (192.168.121.111)' can't be established.
ECDSA key fingerprint is SHA256:Vybt22mVXuNuB5unE++yowF7lgA/9/2bLSiO3qmYWBY.
Are you sure you want to continue connecting (yes/no)?
```

上面这段文字告诉用户，example.com 这台服务器的指纹是陌生的，让用户选择是否要继续连接（输入 yes 或 no）。

所谓“服务器指纹”，指的是 SSH 服务器公钥的哈希值。每台 SSH 服务器都有唯一一对密钥，用于跟客户端通信，其中公钥的哈希值就可以用来识别服务器。

可以通过这个命令来查看服务器的公钥

```shell
ssh-keygen -l -f /etc/ssh/ssh_host_ecdsa_key.pub
```
ssh 会将本机连接过的所有服务器公钥的指纹，都储存在本机的 `~/.ssh/known_hosts` 文件中。每次连接服务器时，通过该文件判断是否为陌生主机（陌生公钥）。

在上面这段文字后面，输入`yes`，就可以将当前服务器的指纹也储存在本机 `~/.ssh/known_hosts` 文件中，并显示下面的提示。以后再连接的时候，就不会再出现警告了。

```log
Warning: Permanently added 'foo.com (192.168.121.111)' (RSA) to the list of known hosts
```

然后，客户端就会跟服务器建立连接。接着，ssh 就会要求用户输入所要登录账户的密码。用户输入并验证密码正确以后，就能登录远程服务器的 Shell 了。


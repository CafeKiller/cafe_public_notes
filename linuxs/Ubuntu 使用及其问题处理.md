# Ubuntu 使用及其问题处理

> 注意，这并不是教程，而是我个人研究学习时使用到的一些命令和操作，并不代表一定正确，只能用做参考。

## 开启 ssh

```shell
# 安装服务端
sudo apt install openssh-server

# 启动服务
sudo service ssh start

# 查看服务运行状态
sudo service ssh status

# 打开开机自启ssh服务
sudo systemctl enable ssh

# 关闭开机自启ssh服务
sudo systemctl disable ssh
```

## 安装 git 

```shell
# 检查git
git --version

# 安装git 
apt-get install git
```

## ubuntu 为普通用户添加sudo权限

```shell
# 为用户username添加sudo权限
sudo usermod -a -G sudo username
 
# 去除用户username的sudo权限
sudo usermod -G usergroup username
```

## ubuntu安装curl命令

```shell
# 安装curl命令

apt-get install curl

# 如安装curl程序可能会出现命令无效，请继续往下看

# 方法一：
# 出现安装错误，看了很多资料，都是建议建议先做

apt-get update

# 但是执行了，还是不行，试试先安装如下命令

apt-get install sudo

# 执行了这个之后在执行安装curl就能正常安装了

# 方法二：还有一个方法就是先执行

dpkg –configure -a

# 然后在执行

apt-get install curl

# 就可以正常安装了

# 特么提醒：运用以上方法如果提示依赖包没有安装，可以用如下命令安装

sudo apt-get install -f

# ROOT模式下,代码前面不需要加sudo

# 然后回车会自动安装装依赖包，成功之后按循序单独运行如下代码：

apt-get update
apt-get install curl
# 现在就可以正常安装了
```

## ubuntu 防火墙操作

```shell
# 更新防火墙
# 安装ufw防火墙
sudo apt insatll ufw

# 查看ufw状态
sudo ufw status

# 查看ufw详细状态
sudo ufw status verbose

# 允许8080端口
sudo ufw allow 8080

# 拒绝8080端口
sudo ufw deny 8080

# 允许8080端口tcp协议
sudo ufw allow 8080/tcp

# 允许8080端口udp协议
sudo ufw allow 8080/udp

# 允许192.168.1.100访问8080端口
sudo ufw allow from 192.168.1.100 to any port 8080

# 允许192.168.1.100访问8080端口tcp协议
sudo ufw allow from 192.168.1.100 to any port 8080 proto tcp

# 启用ufw防火墙
ufw enable

# 禁用ufw防火墙
ufw disable

# 重新加载ufw防火墙
ufw reload

# 查看网络连接
netstat -aptn
```
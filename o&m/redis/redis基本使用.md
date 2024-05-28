# redis的基本使用

> 主要参考书/资料:   
> [redis学习教程](https://piaosanlang.gitbooks.io/redis/content/01_huan_jing_an_zhuang.html)  

## 安装

### linux 编译安装

```shell
sudo apt-get remove redis-server # 移除旧版本

sudo apt-get remove --purge redis-server # 移除相关配置

# 移除残留文件
sudo rm -rf var/lib/redis/
sudo rm -rf /var/log/redis
sudo rm -rf /etc/redis/
sudo rm -rf /usr/bin/redis-*
sudo rm -rf /usr/local/bin/redis-*
sudo rm -rf /usr/local/redis/

# 下载 redis 的安装包
wget http://download.redis.io/releases/redis-3.X.X.tar.gz

# 解压
tar -zxvf redis-3.2.3.tar.gz

# 转移到指定目录 (如果你一开始就解压到你指定的目录了, 请无视)
sudo mkdir -p /usr/local/redis/
sudo cp -r redis-3.2.3/* /usr/local/redis/
ls /usr/local/redis/

# 进入目录, 并测试一下编译
cd /usr/local/redis/
sudo make test # 出现 \o/ All tests passed without errors! 表示没什么问题

# 编译安装
cd src
sudo make install
```

### linux 快捷安装

> 如果你使用的是主流发行版的 linux, 如 Ubuntu, 可以直接使用他们的包管理器下载, 无需编译.

```shell
# 更新包管理器, 并安装 redis
sudo apt update
sudo apt install redis-server

# 安装完成后, redis 会自动启动, 通过该命令即可查看 redis 运行状态
sudo systemctl status redis-server

# 启动
redis-server

# 使用cli
redis-cli
```

### windows 安装

> redis 并不推荐在 windows 下安装使用, 所有 redis 官方也没有提供下载安装渠道, 只能使用第三方安装: https://github.com/tporadowski/redis/releases , 下载需要的版本 (使用.msi 和 zip 都是一样的)

```shell
# 进入 redis 的目录
cd D:/XXXX/XXXX/redis

# 打开 cmd 窗口, 运行以下命令即可. 
redis-server.exe redis.windows.conf

# 保留 cmd 窗口不用关, 另起一个 cmd 窗口, 执行cli
redis-cli.exe -h 127.0.0.1 -p 6379
```


## redis 基本类型

Redis支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。  

### 字符串

String 是redis最基本的类型，value 不仅可以是 String,也可以是数字。  

使用 Strings 类型,可以完全实现目前Memcached 的功能,并且效率更高。还可以享受 Redis 的定时持久化(可以选择 RDB 模式或者 AOF 模式)  

string类型是二进制安全的。意思是redis的string可以包含任何数据,比如jpg图片或者序列化的对象  

string类型是Redis最基本的数据类型，一个键最大能存储512MB。  

```shell
# set 设置 key对应的值为 string 类型的 value。
set name zhangsan

# setnx 将key设置值为value，如果key不存在，这种情况下等同 set 命令。 当key存在时，什么也不做。setnx 是 ”SET if Not eXists” 的简写。
get name # zhangsan
setnx name lisi # (integer) 0
get name # zhangsan
setnx name1 lisi
get name1 # lisi

# setrange 覆盖key对应的string的一部分，从指定的offset处开始，覆盖value的长度。
set email cafe123@qq.com
setrange email 8 163.com
get email # cafe123@163.com

# mset 一次设置多个key的值,成功返回ok表示所有的值都设置了,失败返回0表示没有任何值被设置。
mest k1 java k2 python

# mget 一次获取多个key的值,如果对应key不存在,则对应返回nil。
mget k1 k2 k3 # java python (nil)
```

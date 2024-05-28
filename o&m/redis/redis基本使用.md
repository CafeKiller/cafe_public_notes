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
get name                        # zhangsan
setnx name lisi                 # (integer) 0
get name                        # zhangsan
setnx name1 lisi
get name1                       # lisi

# setrange 覆盖key对应的string的一部分，从指定的offset处开始，覆盖value的长度。
set email cafe123@qq.com
setrange email 8 163.com
get email                       # cafe123@163.com

# mset 一次设置多个key的值,成功返回ok表示所有的值都设置了,失败返回0表示没有任何值被设置。
mest k1 java k2 python

# mget 一次获取多个key的值,如果对应key不存在,则对应返回nil。
mget k1 k2 k3                   # java python (nil)

# msetnx 对应给定的keys到他们相应的values上。只要有一个key已经存在，MSETNX一个操作都不会执行。
msetnx kk1 ‘Hello’ kk2 ‘World’  # (integer) 1
msetnx kk2 ‘World’ kk3 ‘Hi’     # (integer) 0
# 同时证明了：MSETNX是原子的，所以所有给定的keys是一次性set的。

# getset 设置key的值,并返回key的旧值
getset name lisi                # zhangsan

# getrange key start end ­­ 获取指定key的value值的子字符串。是由start和end位移决定的
getrange name 0 2               # lis

# incr 对key的值加1操作
set price 298
incr price                      # 299

# incrby ­­ 同incr类似,加指定值 ,key不存在时候会设置key,并认为原来的value是 0
incrby price 399                # 299
incrby age 25                   # (integer) 25
get age                         # 25

# decr 对key的值做的是减减操作,decr一个不存在key,则设置key为­1
# decrby 同decr,减指定值

# append 给指定key的字符串值追加value,返回新字符串值的长度.
get name                        # lisi
append name _zhangsan           # (integer) 14
get name                        # lisi_zhangsan
```

### hash 哈希

Redis hash 是一个string类型的field和value的映射表，hash特别适合用于存储对象。  

Redis 中每个 hash 可以存储 232 - 1 键值对（40多亿）。  

```shell
# hset key field value 设置 key 指定的哈希集中指定字段的值
hset myhash field1 Hello

# hget 获取指定的hash field。
hget myhash field1                          # Hello

# hsetnx key field value 只在 key 指定的哈希集中不存在指定的字段时，设置字段的值。如果 key 指定的哈希集不存在，会创建一个新的哈希集并与 key 关联。如果字段已存在，该操作无效果。
hsetnx myhash field "Hello"                 # (integer) 1
hsetnx myhash field "Hello"                 # (integer) 0

# hmset 同时设置hash的多个field。
hmset myhash field1 “hello” field2 “world”

# hmget 获取全部指定的hash filed。
hmget myhash field1 field2 field3           # hello world (nil)

# hincrby 指定的hash filed 加上给定值。
hset myhash field3 20
hget myhash field3                          # 20
hincrby myhash field3 -8                    # (integer) 20
hget myhash field3                          # 12

# hexists 测试指定field是否存在。
hexists myhash field1                       # (integer) 1
hexists myhash field999                     # (integer) 0

# hdel 从 key 指定的哈希集中移除指定的域
hkeys myhash                                # filed1 filed filed2 filed3 
hkeys myhash filed                          # filed1 filed2 filed3 

# hlen 返回指定hash的field数量。
hlen myhash                                 # (integer) 3

# hkeys 返回hash的所有field。
hkeys myhash                                # filed1 filed2 filed3 

# hvals 返回hash的所有value。
hvals myhash                                # "hello" "world" 12

# hgetall 获取某个hash中全部的filed及value。
hgetall myhahs                              # filed1 "hello" filed2 "world" filed3 12

# hstrlen 返回 hash指定field的value的字符串长度
hstrlen myhash field1                       # (integer) 5
```

### list 集合

Redis列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素导列表的头部（左边）或者尾部（右边）  

一个列表最多可以包含 232 - 1 个元素 (4294967295, 每个列表超过40亿个元素)。  

```shell
# rpush key value [value …]
# 向存于 key 的列表的尾部插入所有指定的值。如果 key 不存在，那么会创建一个空的列表然后再进行 push 操作
rpush mylist "hello"                # (integer) 1
rpush mylist "world"                # (integer) 2
lrange mylist 0 -1                  # "hello" "world"

# lpop 移除并且返回 key 对应的 list 的第一个元素。
rpush mylist1 "one"                 # (integer) 1
rpush mylist1 "two"                 # (integer) 2
rpush mylist1 "three"               # (integer) 3
lpop mylist1                        # "one"
lrange mylist1 0 -1                 # "two" "three"


```


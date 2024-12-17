# [笔记]__Linux命令

此处只记录本人在实操和学习过程中 `常用或个人认为比较有用` 的命令，并不全面。想要详细了解命令具体信息和其他使用方式，可以访问下面的网站：  

- [搜索 命令，Linux 搜索 命令详解：最专业的Linux命令大全，命令搜索引擎，内容包含Linux命令手册、详解、学习，值得收藏的Linux命令速查手册。 - Linux 命令搜索引擎 (wangchujiang.com)](https://wangchujiang.com/linux-command/hot.html)

# 文件操作类

```shell
ls # 展示当前目录下的文件
ls -a # 展示当前目录下的文件（包括隐藏）
ls -l # 展示当前目录下的文件及其详细信息
ls -hl # 展示当前目录下的文件及其详细信息（包括可读文件大小）
ls -al # 展示当前目录下的文件及其详细信息（包括隐藏）



mkdir <dirName> # 创建文件夹
mkdir -p <..dir/dirName> # 创建文件夹（如果上级目录不存在则一并创建）
mkdir -m 777 <dirName> # 创建文件夹，并指定其权限级别
# 常用权限数字：777 700 755 644 444 
# 具体见: https://zhuanlan.zhihu.com/p/35188058



rmdir <dirName> # 删除空文件夹
rmdir -p <..dir/dirName> # 删除空文件夹 (如果上级为空也一并删除)
rmdir -v <dirName> # 删除空文件夹 (并显示其执行过程)



cat <file> # 将文件内容打印到控制台
cat <file1> <file2> # 将多个文件的内容合并打印到控制台
cat -n <file> # 将文件内容打印到控制台 (并在行头添加序号)
cat -b <file> # 将文件内容打印到控制台 (并在非空行头添加序号)



mv <dir> <targetDir> # 将文件夹移动到目标文件夹下
mv <file> <targetDir> # 将文件移动到目标文件夹下
mv <fileName> <newFileName> # 重命名文件
mv <dirName/> <newDirName> # 重命名文件夹
mv -i <file> <targetDir> # 移动文件,并提示是否覆盖
mv -f <file> <targetDir> # 移动文件,并强制是否覆盖
mv -vn <file> <targetDir> # 移动文件,若文件存在也不会进行覆盖
mv -bv <file> <targetDir> # 移动文件,并备份



rm -i <file/dir> # 删除当前目录下的文件,并提示用户
rm -r <dir> # 递归删除目录下的所有文件和文件夹
rm -rf <dir> # 强制递归删除目录下的所有文件和文件夹 (f会忽略错误信息)
rm -r -i <dir> # 递归删除目录下的所有文件和文件夹, 但会提示用户



tar -zcvf /temp/test.tar.gz /home/test/ 
# 对/home/test/目录进行打包, 使用gzip算法, 保存为/temp/test.tar.gz

tar -zxvf /temp/test/log.tar.gz 
# 解压gz包到当前目录

tar -zxvf /temp/test/log.tar.gz -C /home/temp/
# 解压gz包到/home/temp/目录下

```

# 系统

```shell
whoami # 打印当前用户的名称


passwd # 设置当前用户的密码
passwd <username> # 设置或创建指定用户的密码
passwd -l <username> # 设置或创建指定用户的密码, 并锁定用户不能修改
```

# 网络

```shell
curl <URL> # 执行下载任务, 支持 http
curl https://ipv6.ddnspod.com # 获取本机 IPV6 地址



sshd -p 8022 # 以静默模式,开启openSSH,端口默认 8022



ping <www.baidu.com> # 测试网络
ping6 <www.baidu.com> # 测试网络（IPV6）
ip -6 addr list scope global |grep "inet6" | sed -n 's/.*inet6 \([0-9a-f:]\+\).*/\1/p' | head -n 1 # 获取本机 IPV6 地址



wget http://www.baidu.com/testfile.zip # 下载文件
wget -d http://www.baidu.com/testfile.zip # 后台下载文件
wget -c http://www.baidu.com/testfile.zip # 断点续传下载
wget -O test.zip http://www.baidu.com/download.php?id=1080 # 指定文件名下载文件
tail -f wget-log # 查看后台下载进度

```

# 包管理

 Liunx 不同的发行版使用的包管理器是不同的，各个版本系统之间的区别请前往该连接查看：[Linux 包管理基础：apt、yum、dnf 和 pkg - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/28562152) 

```shell
pkg install <packet> # 下载软件包
pkg install -f <packet> # 重新安装软件包
pkg upgrade # 将当前的软件包更新到最新版
pkg search <packet> # 搜索包
pkg info # 显示当前所有软件包
pkg remove <packet> # 删除软件包
pkg autoremove # 删除孤立包
pkg clean # 清除包缓存
```
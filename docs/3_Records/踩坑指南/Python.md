---
category: 踩坑指南
tag:
  - Python
---

# Python 踩坑

## Python 需要安装虚拟环境

```shell
# 安装 virtualenv
pip install virtualenv

# 检查是否安装成功
virtualenv --version

# 创建虚拟环境
virtualenv [ven_name]

# 创建后进入 虚拟环境 的脚本文件夹中
cd [ven_name]/Scripts

# 执行激化虚拟环境的脚本 windows 为 activate
source ./activate
# 后续你会发现你当前的命令行前缀会添加你当前的虚拟环境名，如: ([ven_name])
# 此时开始你的后续所有操作都是在虚拟环境中的了，不会对外部本机的 python 造成任何影响。
```
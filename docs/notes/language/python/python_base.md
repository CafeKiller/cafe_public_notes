---
title: Python 语言学习手记
category: 编程语言
subcategory: Python
level: 10
tags:
  - Python
---

## Python

Python 可以说是当前破圈能力最顶级的一门编程语言了，同时也在AI、深度学习、科学计算领域有非常大的优势，同时也同 Java 和 Nodejs 类似，在不断地扩展自己的领域。但 Python 的性能其实一直不是很好，使其流行的更多是其易用性。

学习难度：简单
应用领域：**AI开发**、**深度学习**、科学计算、辅助工具、Web开发...

> [!help] 参考资料
> 
> [在线文档 - 100天从新手到大师](https://github.com/jackfrued/Python-100-Days)


## 安装

### 虚拟环境安装

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
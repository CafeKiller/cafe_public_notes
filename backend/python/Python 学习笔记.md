# Python 学习笔记

> 主要参考资料/书籍/文章:  
> [Python - 100天从新手到大师](https://github.com/jackfrued/Python-100-Days)

该笔记为 Cafe 个人学习使用, 主要作用是复习, 且拥有其他语言相关知识, 非小白向

## 安装Python

- windows 安装 直接前往官网下载一个即可

- linux 安装
    
> 此处使用 ubuntu 发行版

```shell
apt update # 更新包目录

apt install software-properties-common # 安装依赖

add-apt-repository ppa:deadsnakes/ppa # 添加 deadsnakes PPA 源]

apt install python3.X  # 安装指定版本python
```

## Python 基础

> 相关代码放置在本仓库的 /codes/backend/python/master_100_day/ 下

### 变量和类型

- 整型
- 浮点型
- 布尔型
- 字符串型
- 复数: 这个说一下, 其他语言并不多见, 形如 `3+5j` ，跟数学上的复数表示一样，唯一不同的是虚部的 `i` 换成了 `j` 。

__变量的命名__
  
- 硬性规则：
    - 变量名由字母（广义的Unicode字符，不包括特殊字符）、数字和下划线构成，数字不能开头。
    - 大小写敏感（大写的a和小写的A是两个不同的变量）。
    - 不要跟关键字（有特殊含义的单词，后面会讲到）和系统保留字（如函数、模块等的名字）冲突。
- PEP 8要求：
    - 用小写字母拼写，多个单词用下划线连接。
    - 受保护的实例属性用单个下划线开头。
    - 私有的实例属性用两个下划线开头。

__基础类型的转换__

- `int()`：将一个数值或字符串转换成整数，可以指定进制。
- `float()`：将一个字符串转换成浮点数。
- `str()`：将指定的对象转换成字符串形式，可以指定编码。
- `chr()`：将整数转换成该编码对应的字符串（一个字符）。
- `ord()`：将字符串（一个字符）转换成对应的编码（整数）。

__运算符__

> 大体上和其他语言是类似的, 这里标注几个其他语言上没有, 未标注的则是和其他语言一致

- 下标、切片: `[]` `[:]`
- 指数: `**`
- 身份运算符: `is` `is not`
- 成员运算符: `in` `not in`
- 逻辑运算符: `or`(或) `not`(取反) `and`(且)

__分支__

> python 最常用的分支语句只有 if 语句, 不过在 python3.10 时学习 rust 等语言引入了 match 分支语句  
> 需要注意的这并不是 switch...case , 传统的 switch...case 语句其实局限性非常大(这点可以看看c语言上的switch)
> 不过现在很多语言的 switch 都重新优化过了就是. match 语句则是一个相当现代的分支语句, 可以说更优雅更强大.

```python
if 条件:
    pass
elif 条件二:
    pass
else:
    pass

# match...case 语句 示例
value = 1
match value:
    case 1:
        print("匹配到值为1")
    case 2:
        print("匹配到值为2")
    case _:
        print("匹配到其他值")
```


__补充__

- `type()`: 用于识别类型
- `input()`: 用于接收用户从命令行写入的参数
- `print()`: 用于打印, 和其他语言类似可以使用 % 进行占位, 但形式可能不太相同
    - 注意占位符的使用方式是: `print('%d + %d = %d' % (a, b, a + b))` 


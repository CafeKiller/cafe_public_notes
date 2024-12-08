# Windows Bat语法

> 本文为转载，源出处：https://www.cnblogs.com/zhaoqingqing/p/4620402.html

# 基础语法

1. 批处理文件是一个“.bat”结尾的文本文件，这个文件的每一行都是一条DOS命令。可以使用任何文本文件编辑工具创建和修改。
2. 批处理是一种简单的程序，可以用 if 和 goto 来控制流程，也可以使用 for 循环。
3. 批处理的编程能力远不如C语言等编程语言，也十分不规范。
4. 每个编写好的批处理文件都相当于一个DOS的外部命令，把它所在的目录放到DOS搜索路径(path)中，即可在任意位置运行。
5. C:\AUTOEXEC.BAT 是每次系统启动时都会自动运行的，可以将每次启动时都要运行的命令放入该文件中。
6. 大小写不敏感(命令符忽略大小写)
7. 批处理的文件扩展名为 .bat 或 .cmd。
8. 在命令提示下键入批处理文件的名称，或者双击该批处理文件，系统就会调用Cmd.exe来运行该文件。

# 参数

## 系统参数

```shell
%SystemRoot% === C:\WINDOWS # (%windir% 同样)

%ProgramFiles% === C:\Program Files

%USERPROFILE% === C:\Documents and Settings\Administrator # (子目录有“桌面”,“开始菜单”,“收藏夹”等)

%APPDATA% === C:\Documents and Settings\Administrator\Application Data

%TEMP% === C:\DOCUME~1\ADMINI~1\LOCALS~1\Temp # (%TEM% 同样)

%APPDATA% === C:\Documents and Settings\Administrator\Application Data

%OS% === Windows_NT # (系统)

%Path% === %SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem # (原本的设置)

%HOMEDRIVE% === C: # (系统盘)

%HOMEPATH% === \Documents and Settings\Administrator

# 枚举当前的环境变量

setlocal enabledelayedexpansion

FOR /F "usebackq delims==" %%i IN (set) DO @echo %%i !%%i!
```

## 传递参数

%[1-9]表示参数，参数是指在运行批处理文件时在文件名后加的以空格(或者Tab)分隔的字符串。

变量可以从%0到%9，%0表示批处理命令本身，其它参数字符串用 %1 到 %9 顺序表示。

```shell
call test2.bat "hello" "haha" # 执行同目录下的“test2.bat”文件，并输入两个参数

# 在“test2.bat”文件里写:

echo %1 # 打印: "hello"

echo %2 # 打印: "haha"

echo %0 # 打印: test2.bat

echo %19 # 打印: "hello"9
```

# 批处理基本命令

## help 命令

查看 bat 命令的帮助信息

语法：「命令」 /?

示例：
```shell
type /? # 查看 type 命令的帮助信息

type /? >>temp.txt # 将 type 命令的帮助信息写入 temp.txt 文件内

help type # 与  `type /?` 一致
```

## echo 命令

显示信息，或者控制信息的回显

语法: echo [{on|off}] [message]

echo off 表示在此语句后所有运行的命令都不显示命令行本身；默认是on，on时会显示如： C:\文件夹路径>命令行。

在实际应用中我们会把这条命令和重定向符号( 也称为管道符号，一般用 > >> ^ )结合来实现输入一些命令到特定格式的文件中。

```shell
echo off # 关闭回显

echo hello world # 输出文本

# 此前还没有 setupreg.reg 这个文件
echo Windows Registry Editor Version 5.00 > c:\setupreg.reg
# 追加内容进 setupreg.reg 这个文件
echo "SourcePath"="D:\Win2003\" >> c:\setupreg.reg  
```

## @ 命令

表示不显示@后面的命令，(在入侵过程中自然不能让对方看到你使用的命令啦)

@ 与 echo off 相象，但它是加在每个命令行的最前面，表示运行时不显示这一行的命令行(只能影响当前行)。

```shell
@echo off # (此语句常用于开头，表示不显示所有的命令行信息，包括此句)

@echo please wait a minite...

@format X: /q/u/autoset
# (format 这个命令是不可以使用/y这个参数的，可喜的是微软留了个autoset这个参数给我们，效果和/y是一样的。)
```

## goto 命令

语法：goto label (label是参数，指定所要转向的批处理程序中的行。)

指定跳转到标签行，找到标签行后，程序将处理从下一行开始的命令。

label 标签的名字可以随便起，但是最好是有意义的，字母前必须加个冒号 “:” 来表示这个字母是标签。

goto 命令就是根据这个冒号来寻找下一步跳到到那里。经常与 if 配合使用，根据不同的条件来执行不同的命令组。

## rem 命令

语法：Rem Message...

(小技巧：用::代替rem)

注释命令，在C语言中相当与/*...*/,它并不会被执行，只是起一个注释的作用，便于别人阅读和自己日后修改。

```shell
@Rem Here is the description.
```

## pause 命令

会暂停批处理的执行并在屏幕上显示Press any key to continue...的提示，等待用户按任意键后继续

```shell
@echo off

:begin

copy a:*.* d:\back

echo Please put a new disk into driver A

pause

goto begin
```

在这个例子中，驱动器 A 中磁盘上的所有文件均复制到d:\back中。

显示的信息提示您将另一张磁盘放入驱动器 A 时，pause 命令会使程序挂起，以便您更换磁盘，然后按任意键再次复制。

## call 命令

语法: call [[Drive:][Path] FileName [BatchParameters]] [:label [arguments]]

参数: [Drive:][Path] FileName 指定要调用的批处理程序的位置和名称。filename 参数必须具有 .bat 或 .cmd 扩展名。

调用另一个批处理程序，并且不终止父批处理程序。

如果不用call而直接调用别的批处理文件，那么执行完那个批处理文件后将无法返回当前文件并执行当前文件的后续命令。

call 命令接受用作调用目标的标签。如果在脚本或批处理文件外使用 Call，它将不会在命令行起作用。

```shell
call="%cd%\test2.bat" haha kkk aaa # (调用指定目录下的 test2.bat，且输入3个参数给他)

call test2.bat arg1 arg2 # (调用同目录下的 test2.bat，且输入2个参数给他)
```

注：可以调用自身(死循环、递归)

## start 命令

调用外部程序，所有的 DOS命令 和 命令行程序 都可以由 start命令 来调用。

入侵常用参数：

MIN 开始时窗口最小化

SEPARATE 在分开的空间内开始 16 位 Windows 程序

HIGH 在 HIGH 优先级类别开始应用程序

REALTIME 在 REALTIME 优先级类别开始应用程序

WAIT 启动应用程序并等候它结束

parameters 这些为传送到命令/程序的参数

```shell
start /MIN test2.bat arg1 arg2 # (调用同目录下的 test2.bat，且输入2个参数给他，且本窗口最小化)

e:\"program files"\极品列车时刻表\jpskb.exe # (文件路径名有空格时)
```

## if 命令

if 表示将判断是否符合规定的条件，从而决定执行不同的命令。

### if

语法: if [not] "参数" == "字符串" 待执行的命令

参数如果等于(not表示不等，下同)指定的字符串，则条件成立，运行命令，否则运行下一句。(注意是两个等号)

```shell
if "%1" == "a" format a:

if {%1} == {} goto noparms
```

### if exist

语法: if [not] exist [路径\]文件名 待执行的命令

如果有指定的文件，则条件成立，运行命令，否则运行下一句。

```shell
if exist config.sys edit config.sys # (表示如果存在这文件，则编辑它，用很难看的系统编辑器)
if exist config.sys type config.sys # (表示如果存在这文件，则显示它的内容)
```

### if errorlevel number

语法: if [not] errorlevel <数字> 待执行的命令

如果程序返回值等于指定的数字，则条件成立，运行命令，否则运行下一句。(返回值必须按照从大到小的顺序排列)

```shell
@echo off

XCOPY F:\test.bat D:\

IF ERRORLEVEL 1 (ECHO 文件拷贝失败

) Else IF ERRORLEVEL 0 ECHO 成功拷贝文件

pause
```

很多DOS程序在运行结束后会返回一个数字值用来表示程序运行的结果(或者状态)，称为错误码errorlevel或称返回码。

常见的返回码为0、1。通过if errorlevel命令可以判断程序的返回值，根据不同的返回值来决定执行不同的命令。

### else

语法： if 条件 (成立时执行的命令) else (不成立时执行的命令)

如果是多个条件，建议适当使用括号把各条件包起来，以免出错。

```shell
if 1 == 0 ( echo comment1 ) 
else if 1==0 ( echo comment2 ) 
else (echo comment3 )
```

注：如果 else 的语句需要换行，if 执行的行尾需用“^”连接，并且 if 执行的动作需用(括起来)，否则报错

```shell
if 1 == 0 ( echo comment1 ) 
else if 1==0 ( echo comment2 ) ^
else (echo comment3 )
```

### 比较运算符

- EQU - 等于 (一般使用“==”)
- NEQ - 不等于 (没有 “!=”,改用“ if not 1==1 ”的写法)
- LSS - 小于
- LEQ - 小于或等于
- GTR - 大于
- GEQ - 大于或等于

## choice 命令

choice 使用此命令可以让用户输入一个字符(用于选择)，从而根据用户的选择返回不同的 errorlevel，

然后配合 if errorlevel 选择运行不同的命令。

注意：choice命令为DOS或者Windows系统提供的外部命令，不同版本的choice命令语法会稍有不同，请用choice /?查看用法。

choice 使用此命令可以让用户输入一个字符，从而运行不同的命令。

使用时应该加/c:参数，c:后应写提示可输入的字符，之间无空格。它的返回码为1234……

```shell
choice /c:dme defrag,mem,end
```

将显示: `defrag,mem,end[D,M,E]?`

```shell
choice /c:dme defrag,mem,end

if errorlevel 3 goto defrag (应先判断数值最高的错误码)

if errorlevel 2 goto mem

if errotlevel 1 goto end
```

# 其他命令

## ping 命令

测试网络联接状况以及信息包发送和接收状况。但是不能够测试端口。

语法：ping IP地址或主机名 [-t] [-a] [-n count] [-l size]

参数含义：

-t 不停地向目标主机发送数据；

-a 以IP地址格式来显示目标主机的网络地址；

-n count 指定要Ping多少次，具体次数由count来指定；

-l size 指定发送到目标主机的数据包的大小。

```shell
ping 192.168.0.1 -t # (不停的测试192.168.0.1，按ctrl+c停止)

# (ping一下所有的局域网电脑)
for /L %%a in (0,1,255) do ping 192.168.0.%%a -n 1 >> tmp.txt 
```

##  telnet 命令

测试端口使用 telnet IP地址或主机名 端口，使用tcp协议的

```shell
telnet 192.168.0.1 80 # (测试192.168.0.1的80端口)
```

## color 命令

设置背景及字体颜色

语法： color bf

b 是指定背景色的十六进制数字； f 指定前景颜色(即字体颜色)。

颜色值: 0:黑色 1:蓝色 2:绿色 3:湖蓝 4:红色 5:紫色 6:** 7:白色

8:灰色 9:淡蓝 A:淡绿 B:浅绿 C:淡红 D:淡紫 E:淡黄 F:亮白

如果没有给定任何参数，该命令会将颜色还原到 CMD.EXE 启动时的颜色。

如果两参数一样，视为无效输入。只有一个参数时，设置字体。

## random 命令

产生随机数(正整数0~)

## exit 命令

结束程序。即时是被调用的程序，结束后也不会返回原程序

## shutdown命令

shutdown -s 关机

# 字符串处理

## 分割字符串，以查看时间为例

%源字符串:~起始值,截取长度% (起始值从0开始；截取长度是可选的，如果省略逗号和截取长度，将会从起始值截取到结尾；

截取长度如果是负数，表示截取到倒数第几个。)

"%time%" 显示如："11:04:23.03" (完整的时间"hh:mm:ss.tt")

"%time:~0,5%" 显示"hh:mm"(即"11:04")，其中0表示从右向左移位操作的个数，5表示从左向右移位操作的个数

"%time:~0,8%" 显示标准时间格式"hh:mm:ss"(即"11:04:23"，前8个字符串)

"%time:~3,-3%"显示"mm:ss"(即从第4个开始,截去最后3个的字符串)

"%time:~3%" 显示"04:23.03"(即去掉前4个字符串)

"%time:~-3%" 显示".tt"(即最后3个字符串)

上面的字串分割格式，也可以用于其它地方，如目录路径："%cd:~0,10%"

## 替换字符串

set a="abcd1234"

echo %a% 显示："abcd1234"

set a=%a:1=kk% 替换“1”为“kk”

echo %a% 显示："abcdkk234"

## 字符串合并

由于没有直接的字符串合并函数，只能用笨方法了。

set str1=%str1%%str2% (合并 str1 和 str2)

## 计算字符串长度

没有现成的函数。如下程序利用 goto形成循环，不断将字符串截短1，并记录截短的次数，到字符串变成空时的次数即长度。

```shell
set testStr=This is a test string

:: 将 testStr 复制到str，str 是个临时字符串

set str=%testStr%

:: 标签，用于goto跳转

:next1

:: 判断str是不是空，如果不是则执行下边的语句

if not "%str%"=="" (

:: 算术运算，使num的值自增1，相当于num++或者++num语句

set /a num+=1

:: 截取字符串，每次截短1

set "str=%str:~1%"

:: 跳转到next1标签: 这里利用goto和标签，构成循环结构

goto next1

)

:: 当以上循环结构执行完毕时，会执行下边的语句

echo testStr=%testStr%

echo testStr的长度为：%num%
```

## 截取字符串时，需要传递参数

直接 echo %args:~%num%,-5% 没办法想要的字符串，需要如下两步

setlocal enabledelayedexpansion

echo !args:~%num%,-5!

# 系统服务

停止服务：NET STOP 服务名

启动服务：NET Start 服务名

## 设置启动类型

自动： SC CONFIG 服务名 START= auto

手动： SC CONFIG 服务名 START= demand

已禁用：SC CONFIG 服务名 START= disabled

附：“START= ”等号后面必须要有一个空格。(start还有boot,system两个值)

```shell
SC CONFIG Spooler START= demand # (打印机加载项，设置成手动，默认自动)
```

## 查看系统服务：start %SystemRoot%\system32\services.msc /s
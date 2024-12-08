<template><div><h1 id="windows-bat语法" tabindex="-1"><a class="header-anchor" href="#windows-bat语法"><span>Windows Bat语法</span></a></h1>
<blockquote>
<p>本文为转载，源出处：https://www.cnblogs.com/zhaoqingqing/p/4620402.html</p>
</blockquote>
<h1 id="基础语法" tabindex="-1"><a class="header-anchor" href="#基础语法"><span>基础语法</span></a></h1>
<ol>
<li>批处理文件是一个“.bat”结尾的文本文件，这个文件的每一行都是一条DOS命令。可以使用任何文本文件编辑工具创建和修改。</li>
<li>批处理是一种简单的程序，可以用 if 和 goto 来控制流程，也可以使用 for 循环。</li>
<li>批处理的编程能力远不如C语言等编程语言，也十分不规范。</li>
<li>每个编写好的批处理文件都相当于一个DOS的外部命令，把它所在的目录放到DOS搜索路径(path)中，即可在任意位置运行。</li>
<li>C:\AUTOEXEC.BAT 是每次系统启动时都会自动运行的，可以将每次启动时都要运行的命令放入该文件中。</li>
<li>大小写不敏感(命令符忽略大小写)</li>
<li>批处理的文件扩展名为 .bat 或 .cmd。</li>
<li>在命令提示下键入批处理文件的名称，或者双击该批处理文件，系统就会调用Cmd.exe来运行该文件。</li>
</ol>
<h1 id="参数" tabindex="-1"><a class="header-anchor" href="#参数"><span>参数</span></a></h1>
<h2 id="系统参数" tabindex="-1"><a class="header-anchor" href="#系统参数"><span>系统参数</span></a></h2>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%SystemRoot%</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ===</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> C:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\W</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">INDOWS</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (%windir% 同样)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%ProgramFiles%</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ===</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> C:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\P</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">rogram</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Files</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%USERPROFILE%</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ===</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> C:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\D</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ocuments</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> and</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Settings</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\A</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">dministrator</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (子目录有“桌面”,“开始菜单”,“收藏夹”等)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%APPDATA%</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ===</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> C:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\D</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ocuments</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> and</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Settings</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\A</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">dministrator</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\A</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">pplication</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Data</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%TEMP%</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ===</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> C:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\D</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">OCUME~1</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\A</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">DMINI~1</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\L</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">OCALS~1</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\T</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">emp</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (%TEM% 同样)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%APPDATA%</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ===</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> C:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\D</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ocuments</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> and</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Settings</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\A</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">dministrator</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\A</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">pplication</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Data</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%OS%</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ===</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Windows_NT</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (系统)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%Path%</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ===</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> %SystemRoot%</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ystem32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%SystemRoot%</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%SystemRoot%\System32\Wbem</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (原本的设置)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%HOMEDRIVE%</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ===</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> C:</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (系统盘)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%HOMEPATH%</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ===</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \D</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ocuments</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> and</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Settings</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\A</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">dministrator</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 枚举当前的环境变量</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setlocal</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> enabledelayedexpansion</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">FOR</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /F</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "usebackq delims=="</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> %%i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> IN</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (set) DO @echo %%i !</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%%i!</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="传递参数" tabindex="-1"><a class="header-anchor" href="#传递参数"><span>传递参数</span></a></h2>
<p>%[1-9]表示参数，参数是指在运行批处理文件时在文件名后加的以空格(或者Tab)分隔的字符串。</p>
<p>变量可以从%0到%9，%0表示批处理命令本身，其它参数字符串用 %1 到 %9 顺序表示。</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">call</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> test2.bat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "hello"</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "haha"</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 执行同目录下的“test2.bat”文件，并输入两个参数</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 在“test2.bat”文件里写:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> %1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 打印: "hello"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> %2</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 打印: "haha"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> %0</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 打印: test2.bat</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> %19</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 打印: "hello"9</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="批处理基本命令" tabindex="-1"><a class="header-anchor" href="#批处理基本命令"><span>批处理基本命令</span></a></h1>
<h2 id="help-命令" tabindex="-1"><a class="header-anchor" href="#help-命令"><span>help 命令</span></a></h2>
<p>查看 bat 命令的帮助信息</p>
<p>语法：「命令」 /?</p>
<p>示例：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">type</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /?</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 查看 type 命令的帮助信息</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">type</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /?</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> >></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">temp.txt</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 将 type 命令的帮助信息写入 temp.txt 文件内</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">help</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> type</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 与  `type /?` 一致</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="echo-命令" tabindex="-1"><a class="header-anchor" href="#echo-命令"><span>echo 命令</span></a></h2>
<p>显示信息，或者控制信息的回显</p>
<p>语法: echo [{on|off}] [message]</p>
<p>echo off 表示在此语句后所有运行的命令都不显示命令行本身；默认是on，on时会显示如： C:\文件夹路径&gt;命令行。</p>
<p>在实际应用中我们会把这条命令和重定向符号( 也称为管道符号，一般用 &gt; &gt;&gt; ^ )结合来实现输入一些命令到特定格式的文件中。</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> off</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 关闭回显</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> hello</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> world</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 输出文本</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 此前还没有 setupreg.reg 这个文件</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Windows</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Registry</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Editor</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Version</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 5.00</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> > </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">c:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">etupreg.reg</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 追加内容进 setupreg.reg 这个文件</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "SourcePath"="D:\Win2003</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\"</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> >> c:\setupreg.reg</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="命令" tabindex="-1"><a class="header-anchor" href="#命令"><span>@ 命令</span></a></h2>
<p>表示不显示@后面的命令，(在入侵过程中自然不能让对方看到你使用的命令啦)</p>
<p>@ 与 echo off 相象，但它是加在每个命令行的最前面，表示运行时不显示这一行的命令行(只能影响当前行)。</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">@echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> off</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (此语句常用于开头，表示不显示所有的命令行信息，包括此句)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">@echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> please</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> wait</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> minite...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">@format</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> X:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /q/u/autoset</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># (format 这个命令是不可以使用/y这个参数的，可喜的是微软留了个autoset这个参数给我们，效果和/y是一样的。)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="goto-命令" tabindex="-1"><a class="header-anchor" href="#goto-命令"><span>goto 命令</span></a></h2>
<p>语法：goto label (label是参数，指定所要转向的批处理程序中的行。)</p>
<p>指定跳转到标签行，找到标签行后，程序将处理从下一行开始的命令。</p>
<p>label 标签的名字可以随便起，但是最好是有意义的，字母前必须加个冒号 “:” 来表示这个字母是标签。</p>
<p>goto 命令就是根据这个冒号来寻找下一步跳到到那里。经常与 if 配合使用，根据不同的条件来执行不同的命令组。</p>
<h2 id="rem-命令" tabindex="-1"><a class="header-anchor" href="#rem-命令"><span>rem 命令</span></a></h2>
<p>语法：Rem Message...</p>
<p>(小技巧：用::代替rem)</p>
<p>注释命令，在C语言中相当与/<em>...</em>/,它并不会被执行，只是起一个注释的作用，便于别人阅读和自己日后修改。</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">@Rem</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Here</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> is</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> the</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> description.</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="pause-命令" tabindex="-1"><a class="header-anchor" href="#pause-命令"><span>pause 命令</span></a></h2>
<p>会暂停批处理的执行并在屏幕上显示Press any key to continue...的提示，等待用户按任意键后继续</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">@echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> off</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">:begin</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">copy</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> a:</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">*</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">*</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> d:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\b</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ack</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Please</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> put</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> new</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> disk</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> into</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> driver</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> A</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pause</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">goto</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> begin</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，驱动器 A 中磁盘上的所有文件均复制到d:\back中。</p>
<p>显示的信息提示您将另一张磁盘放入驱动器 A 时，pause 命令会使程序挂起，以便您更换磁盘，然后按任意键再次复制。</p>
<h2 id="call-命令" tabindex="-1"><a class="header-anchor" href="#call-命令"><span>call 命令</span></a></h2>
<p>语法: call [[Drive:][Path] FileName [BatchParameters]] [:label [arguments]]</p>
<p>参数: [Drive:][Path] FileName 指定要调用的批处理程序的位置和名称。filename 参数必须具有 .bat 或 .cmd 扩展名。</p>
<p>调用另一个批处理程序，并且不终止父批处理程序。</p>
<p>如果不用call而直接调用别的批处理文件，那么执行完那个批处理文件后将无法返回当前文件并执行当前文件的后续命令。</p>
<p>call 命令接受用作调用目标的标签。如果在脚本或批处理文件外使用 Call，它将不会在命令行起作用。</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">call</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"%cd%\test2.bat"</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> haha</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> kkk</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> aaa</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (调用指定目录下的 test2.bat，且输入3个参数给他)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">call</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> test2.bat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> arg1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> arg2</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (调用同目录下的 test2.bat，且输入2个参数给他)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：可以调用自身(死循环、递归)</p>
<h2 id="start-命令" tabindex="-1"><a class="header-anchor" href="#start-命令"><span>start 命令</span></a></h2>
<p>调用外部程序，所有的 DOS命令 和 命令行程序 都可以由 start命令 来调用。</p>
<p>入侵常用参数：</p>
<p>MIN 开始时窗口最小化</p>
<p>SEPARATE 在分开的空间内开始 16 位 Windows 程序</p>
<p>HIGH 在 HIGH 优先级类别开始应用程序</p>
<p>REALTIME 在 REALTIME 优先级类别开始应用程序</p>
<p>WAIT 启动应用程序并等候它结束</p>
<p>parameters 这些为传送到命令/程序的参数</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">start</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /MIN</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> test2.bat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> arg1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> arg2</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (调用同目录下的 test2.bat，且输入2个参数给他，且本窗口最小化)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">e:\</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"program files"</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">\极品列车时刻表\jpskb.exe</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (文件路径名有空格时)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="if-命令" tabindex="-1"><a class="header-anchor" href="#if-命令"><span>if 命令</span></a></h2>
<p>if 表示将判断是否符合规定的条件，从而决定执行不同的命令。</p>
<h3 id="if" tabindex="-1"><a class="header-anchor" href="#if"><span>if</span></a></h3>
<p>语法: if [not] &quot;参数&quot; == &quot;字符串&quot; 待执行的命令</p>
<p>参数如果等于(not表示不等，下同)指定的字符串，则条件成立，运行命令，否则运行下一句。(注意是两个等号)</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> "%1"</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ==</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "a"</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> format</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> a:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%1}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ==</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> goto</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> noparms</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="if-exist" tabindex="-1"><a class="header-anchor" href="#if-exist"><span>if exist</span></a></h3>
<p>语法: if [not] exist [路径]文件名 待执行的命令</p>
<p>如果有指定的文件，则条件成立，运行命令，否则运行下一句。</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> exist</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config.sys</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> edit</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config.sys</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (表示如果存在这文件，则编辑它，用很难看的系统编辑器)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> exist</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config.sys</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> type</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config.sys</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (表示如果存在这文件，则显示它的内容)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="if-errorlevel-number" tabindex="-1"><a class="header-anchor" href="#if-errorlevel-number"><span>if errorlevel number</span></a></h3>
<p>语法: if [not] errorlevel &lt;数字&gt; 待执行的命令</p>
<p>如果程序返回值等于指定的数字，则条件成立，运行命令，否则运行下一句。(返回值必须按照从大到小的顺序排列)</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">@echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> off</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">XCOPY</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> F:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">est.bat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> D:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">IF </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ERRORLEVEL</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (ECHO </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">文件拷贝失败</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) Else IF ERRORLEVEL 0 ECHO 成功拷贝文件</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pause</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很多DOS程序在运行结束后会返回一个数字值用来表示程序运行的结果(或者状态)，称为错误码errorlevel或称返回码。</p>
<p>常见的返回码为0、1。通过if errorlevel命令可以判断程序的返回值，根据不同的返回值来决定执行不同的命令。</p>
<h3 id="else" tabindex="-1"><a class="header-anchor" href="#else"><span>else</span></a></h3>
<p>语法： if 条件 (成立时执行的命令) else (不成立时执行的命令)</p>
<p>如果是多个条件，建议适当使用括号把各条件包起来，以免出错。</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> 1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ( </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> comment1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ) </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">=0</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> (</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> comment2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ) </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> comment3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> )</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：如果 else 的语句需要换行，if 执行的行尾需用“^”连接，并且 if 执行的动作需用(括起来)，否则报错</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> 1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ( </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> comment1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ) </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">=0</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> (</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> comment2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ) ^</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> comment3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> )</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="比较运算符" tabindex="-1"><a class="header-anchor" href="#比较运算符"><span>比较运算符</span></a></h3>
<ul>
<li>EQU - 等于 (一般使用“==”)</li>
<li>NEQ - 不等于 (没有 “!=”,改用“ if not 1==1 ”的写法)</li>
<li>LSS - 小于</li>
<li>LEQ - 小于或等于</li>
<li>GTR - 大于</li>
<li>GEQ - 大于或等于</li>
</ul>
<h2 id="choice-命令" tabindex="-1"><a class="header-anchor" href="#choice-命令"><span>choice 命令</span></a></h2>
<p>choice 使用此命令可以让用户输入一个字符(用于选择)，从而根据用户的选择返回不同的 errorlevel，</p>
<p>然后配合 if errorlevel 选择运行不同的命令。</p>
<p>注意：choice命令为DOS或者Windows系统提供的外部命令，不同版本的choice命令语法会稍有不同，请用choice /?查看用法。</p>
<p>choice 使用此命令可以让用户输入一个字符，从而运行不同的命令。</p>
<p>使用时应该加/c:参数，c:后应写提示可输入的字符，之间无空格。它的返回码为1234……</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">choice</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /c:dme</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> defrag,mem,end</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>将显示: <code v-pre>defrag,mem,end[D,M,E]?</code></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">choice</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /c:dme</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> defrag,mem,end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> errorlevel</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> goto</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> defrag</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (应先判断数值最高的错误码)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> errorlevel</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> goto</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mem</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> errotlevel</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> goto</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> end</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="其他命令" tabindex="-1"><a class="header-anchor" href="#其他命令"><span>其他命令</span></a></h1>
<h2 id="ping-命令" tabindex="-1"><a class="header-anchor" href="#ping-命令"><span>ping 命令</span></a></h2>
<p>测试网络联接状况以及信息包发送和接收状况。但是不能够测试端口。</p>
<p>语法：ping IP地址或主机名 [-t] [-a] [-n count] [-l size]</p>
<p>参数含义：</p>
<p>-t 不停地向目标主机发送数据；</p>
<p>-a 以IP地址格式来显示目标主机的网络地址；</p>
<p>-n count 指定要Ping多少次，具体次数由count来指定；</p>
<p>-l size 指定发送到目标主机的数据包的大小。</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ping</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 192.168.0.1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -t</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (不停的测试192.168.0.1，按ctrl+c停止)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># (ping一下所有的局域网电脑)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /L %%a in (</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">0,1,255</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">do</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ping 192.168.0.%%a -n </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> >> tmp.txt</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="telnet-命令" tabindex="-1"><a class="header-anchor" href="#telnet-命令"><span>telnet 命令</span></a></h2>
<p>测试端口使用 telnet IP地址或主机名 端口，使用tcp协议的</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">telnet</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 192.168.0.1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 80</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (测试192.168.0.1的80端口)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="color-命令" tabindex="-1"><a class="header-anchor" href="#color-命令"><span>color 命令</span></a></h2>
<p>设置背景及字体颜色</p>
<p>语法： color bf</p>
<p>b 是指定背景色的十六进制数字； f 指定前景颜色(即字体颜色)。</p>
<p>颜色值: 0:黑色 1:蓝色 2:绿色 3:湖蓝 4:红色 5:紫色 6:** 7:白色</p>
<p>8:灰色 9:淡蓝 A:淡绿 B:浅绿 C:淡红 D:淡紫 E:淡黄 F:亮白</p>
<p>如果没有给定任何参数，该命令会将颜色还原到 CMD.EXE 启动时的颜色。</p>
<p>如果两参数一样，视为无效输入。只有一个参数时，设置字体。</p>
<h2 id="random-命令" tabindex="-1"><a class="header-anchor" href="#random-命令"><span>random 命令</span></a></h2>
<p>产生随机数(正整数0~)</p>
<h2 id="exit-命令" tabindex="-1"><a class="header-anchor" href="#exit-命令"><span>exit 命令</span></a></h2>
<p>结束程序。即时是被调用的程序，结束后也不会返回原程序</p>
<h2 id="shutdown命令" tabindex="-1"><a class="header-anchor" href="#shutdown命令"><span>shutdown命令</span></a></h2>
<p>shutdown -s 关机</p>
<h1 id="字符串处理" tabindex="-1"><a class="header-anchor" href="#字符串处理"><span>字符串处理</span></a></h1>
<h2 id="分割字符串-以查看时间为例" tabindex="-1"><a class="header-anchor" href="#分割字符串-以查看时间为例"><span>分割字符串，以查看时间为例</span></a></h2>
<p>%源字符串:~起始值,截取长度% (起始值从0开始；截取长度是可选的，如果省略逗号和截取长度，将会从起始值截取到结尾；</p>
<p>截取长度如果是负数，表示截取到倒数第几个。)</p>
<p>&quot;%time%&quot; 显示如：&quot;11:04:23.03&quot; (完整的时间&quot;hh:mm:ss.tt&quot;)</p>
<p>&quot;%time:~0,5%&quot; 显示&quot;hh:mm&quot;(即&quot;11:04&quot;)，其中0表示从右向左移位操作的个数，5表示从左向右移位操作的个数</p>
<p>&quot;%time:~0,8%&quot; 显示标准时间格式&quot;hh:mm:ss&quot;(即&quot;11:04:23&quot;，前8个字符串)</p>
<p>&quot;%time:~3,-3%&quot;显示&quot;mm:ss&quot;(即从第4个开始,截去最后3个的字符串)</p>
<p>&quot;%time:~3%&quot; 显示&quot;04:23.03&quot;(即去掉前4个字符串)</p>
<p>&quot;%time:~-3%&quot; 显示&quot;.tt&quot;(即最后3个字符串)</p>
<p>上面的字串分割格式，也可以用于其它地方，如目录路径：&quot;%cd:~0,10%&quot;</p>
<h2 id="替换字符串" tabindex="-1"><a class="header-anchor" href="#替换字符串"><span>替换字符串</span></a></h2>
<p>set a=&quot;abcd1234&quot;</p>
<p>echo %a% 显示：&quot;abcd1234&quot;</p>
<p>set a=%a:1=kk% 替换“1”为“kk”</p>
<p>echo %a% 显示：&quot;abcdkk234&quot;</p>
<h2 id="字符串合并" tabindex="-1"><a class="header-anchor" href="#字符串合并"><span>字符串合并</span></a></h2>
<p>由于没有直接的字符串合并函数，只能用笨方法了。</p>
<p>set str1=%str1%%str2% (合并 str1 和 str2)</p>
<h2 id="计算字符串长度" tabindex="-1"><a class="header-anchor" href="#计算字符串长度"><span>计算字符串长度</span></a></h2>
<p>没有现成的函数。如下程序利用 goto形成循环，不断将字符串截短1，并记录截短的次数，到字符串变成空时的次数即长度。</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> testStr=This</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> is</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> test</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> string</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">::</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 将</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> testStr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 复制到str，str</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 是个临时字符串</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> str=%testStr%</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">::</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 标签，用于goto跳转</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">:next1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">::</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 判断str是不是空，如果不是则执行下边的语句</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> not</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "%str%"==""</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">::</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 算术运算，使num的值自增1，相当于num++或者++num语句</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> num+=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">::</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 截取字符串，每次截短1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "str=%str:~1%"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">::</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 跳转到next1标签:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 这里利用goto和标签，构成循环结构</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">goto</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> next1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">::</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 当以上循环结构执行完毕时，会执行下边的语句</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> testStr=%testStr%</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> testStr的长度为：%num%</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="截取字符串时-需要传递参数" tabindex="-1"><a class="header-anchor" href="#截取字符串时-需要传递参数"><span>截取字符串时，需要传递参数</span></a></h2>
<p>直接 echo %args:~%num%,-5% 没办法想要的字符串，需要如下两步</p>
<p>setlocal enabledelayedexpansion</p>
<p>echo !args:~%num%,-5!</p>
<h1 id="系统服务" tabindex="-1"><a class="header-anchor" href="#系统服务"><span>系统服务</span></a></h1>
<p>停止服务：NET STOP 服务名</p>
<p>启动服务：NET Start 服务名</p>
<h2 id="设置启动类型" tabindex="-1"><a class="header-anchor" href="#设置启动类型"><span>设置启动类型</span></a></h2>
<p>自动： SC CONFIG 服务名 START= auto</p>
<p>手动： SC CONFIG 服务名 START= demand</p>
<p>已禁用：SC CONFIG 服务名 START= disabled</p>
<p>附：“START= ”等号后面必须要有一个空格。(start还有boot,system两个值)</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">SC</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> CONFIG</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Spooler</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> START=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> demand</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # (打印机加载项，设置成手动，默认自动)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="查看系统服务-start-systemroot-system32-services-msc-s" tabindex="-1"><a class="header-anchor" href="#查看系统服务-start-systemroot-system32-services-msc-s"><span>查看系统服务：start %SystemRoot%\system32\services.msc /s</span></a></h2>
</div></template>



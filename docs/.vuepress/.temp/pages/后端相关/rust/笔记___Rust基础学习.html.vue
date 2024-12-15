<template><div><h1 id="笔记-rust基础学习" tabindex="-1"><a class="header-anchor" href="#笔记-rust基础学习"><span>[笔记]__Rust基础学习</span></a></h1>
<h2 id="windows-安装" tabindex="-1"><a class="header-anchor" href="#windows-安装"><span>Windows 安装</span></a></h2>
<p>前往 <a href="https://www.rust-lang.org/zh-CN/tools/install" target="_blank" rel="noopener noreferrer">Rust 官方安装网站</a> 下载安装包，然后直接安装即可。</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 更新 rust</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">rustup</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> update</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">           </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 卸载 rust</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">rustup</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> self</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uninstall</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">   </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看本地文档</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">rustup</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> doc</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">              </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看 rust 当前版本</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">rustc</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -V</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">rustc</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --version</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 编译文件</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">rustc</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [filename]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vscode-安装-rust-analyzer" tabindex="-1"><a class="header-anchor" href="#vscode-安装-rust-analyzer"><span>VSCode 安装 rust-analyzer</span></a></h3>
<p><a href="https://blog.csdn.net/xiaojin21cen/article/details/129767672" target="_blank" rel="noopener noreferrer">参考教程</a></p>
<p>在 VSCode 中的插件市场直接搜索 <code v-pre>rust-analyzer</code> 进行安装。（如果安装好后，你的插件没有正常启动请进行以下操作）</p>
<blockquote>
<p>rust-analyzer 是一款 Rust 代码补全、检查、增强插件，常用于提升 Rust 程序开发效率。</p>
</blockquote>
<p>在使用官方下载的 <code v-pre>rustup-init.exe</code> 安装 Rust 时，请选择自定义安装 <code v-pre>2) Customize installation</code></p>
<p>并输入 <code v-pre>x86_64-pc-windows-gnu</code> 使用 64位的 gun 版本，其余配置全默认即可，随后等待下载。</p>
<blockquote>
<p>即使你已通过 <code v-pre>rustup-init.exe</code> 安装过 Rust 也没事，Rust 允许同时存在不同的版本。</p>
</blockquote>
<p>安装好后，请本机前往 <code v-pre>x86_64-pc-windows-gnu</code> 的 bin 目录下复制路径；</p>
<blockquote>
<p>如果你的 bin 目录下没有 <code v-pre>rust-analyzer.exe</code> 需要自行安装一下，在当前 bin 目录的命令行窗口内使用下面的命令进行安装<br>
<code v-pre>rustup component add rust-analyzer-preview</code></p>
</blockquote>
<p>返回 VSCode 进入 settings.json 配置文件中，添加 <code v-pre>&quot;rust-analyzer.server.path&quot;: &quot;C:/User/XXXXX/.rustup/toolchains/stable-x86_64-pc-windows-gnu/bin/rust-analyzer&quot;</code></p>
<p>此时就可以正常启动 <code v-pre>rust-analyzer</code> 了</p>
<h2 id="cargo-基础命令" tabindex="-1"><a class="header-anchor" href="#cargo-基础命令"><span>Cargo 基础命令</span></a></h2>
<p>创建一个后缀为 .rs 的文件</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 创建cargo项目</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">cargo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> new</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [projectName]     </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 构建cargo项目, 第一次运行时会生成 cargo.lock 文件;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># cargo.lock 文件负责追踪项目依赖的精确版本    </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">cargo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> build</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                 </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 构建并运行cargo项目</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">cargo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                   </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 检查代码, 该命令的运行速度比 build 快.</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">cargo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> check</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                 </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 同样是构建项目, 但主要用在即将发布最终版时的程序上; </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 编译时会对代码进行优化, 但编译时间会较长；</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">cargo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> build</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --release</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://crates.io/" target="_blank" rel="noopener noreferrer">Rust carte的管理网站</a></p>
<p>.toml 是cargo配置的文件格式</p>
<div class="language-toml line-numbers-mode" data-highlighter="shiki" data-ext="toml" data-title="toml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># [package] 区域标题, 保存着项目的一些基本信息</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">package</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> = </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"L2_Hello_Cargo"</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> = </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"0.1.0"</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">edition</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> = </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"2021"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># [dependencies] 区域标题, 这里会列出项目的依赖项</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">dependencies</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">rand</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> = </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"0.7.0"</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> ## 完整写法应该是: ^0.3.14, 表示只要兼容0.3.14相关API都允许</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="通用编程概念" tabindex="-1"><a class="header-anchor" href="#通用编程概念"><span>通用编程概念</span></a></h2>
<p>Rust 吸收了很多前辈的经验与知识，这些概念放在其他语言中也很实用。但是这里只讨论他们在 Rust 的环境下的表现，他们的表现可能和我们在其他语言那见到的完全不同。</p>
<p>在 Rust 中也存在着一系列的 <code v-pre>关键字</code></p>
<h3 id="变量与可变性" tabindex="-1"><a class="header-anchor" href="#变量与可变性"><span>变量与可变性</span></a></h3>
<p>在 Rust 中“变量”默然是 <code v-pre>不可变的</code>，这样是为了安全性考虑。但是我们还是将其转换为 <code v-pre>可变的</code>。</p>
<blockquote>
<p>如果你尝试在 Rust 强行修改 <code v-pre>不可变</code> 的变量，编译器会直接报错。</p>
</blockquote>
<div class="language-rust line-numbers-mode" data-highlighter="shiki" data-ext="rust" data-title="rust" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">x</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// cannot assign twice to immutable variable `x`</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>不可变</code> 这一特性虽然保证了程序的运行安全，但有时 <code v-pre>可变</code> 对于一个程序来说也是非常必要的。</p>
<p>使用 <code v-pre>mut</code> 关键字可以让变量转换为 <code v-pre>可变的</code>。</p>
<div class="language-rust line-numbers-mode" data-highlighter="shiki" data-ext="rust" data-title="rust" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> mut</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">x</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">; </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// OK</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常量-constant" tabindex="-1"><a class="header-anchor" href="#常量-constant"><span>常量（constant）</span></a></h3>
<p>虽然 Rust 中的变量默然就是 <code v-pre>不可变的</code>，但这并不意味着 Rust 没有类似其他语言的 <code v-pre>常量</code> 概念。</p>
<p>Rust 中的常量使用 <code v-pre>const</code> 关键字声明，同时不允许使用 <code v-pre>mut</code>，并且常量在 <strong>声明时必须注明值的数据类型</strong>。</p>
<p>和其他语言一样，常量不仅默然不可变，且自始至终都不可变。</p>
<p>命名规范：Rust里常量使用全大写字母，每个单词之间用下划线分开，例如：<code v-pre>MAX_POINTS</code></p>
<div class="language-rust line-numbers-mode" data-highlighter="shiki" data-ext="rust" data-title="rust" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> MAX_POINTS</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">u32</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 100_860</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在声明的作用域内，常量在程序运行的整个过程中都是有效的。</p>
<h3 id="shadowing" tabindex="-1"><a class="header-anchor" href="#shadowing"><span>Shadowing</span></a></h3>
<p>Shadowing 可以翻译为：「隐藏」或「遮蔽」</p>
<blockquote>
<p>在其他语言中，在同一作用域内声明同名变量通常是不被允许的，而这在 Rust 中却是允许的。</p>
</blockquote>
<p>Rust 允许使用相同的名字声明新的变量，新的变量就会 <code v-pre>shadow</code> 之前声明的同名变量；</p>
<p>在后续的代码中这个变量名代表的就是新的变量。</p>
<div class="language-rust line-numbers-mode" data-highlighter="shiki" data-ext="rust" data-title="rust" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> + </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 此时第一个变量就被 shadowing 了</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    let</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> * </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    println!</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"在代码块中的 x 变量是：{}"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 10</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println!</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"在代码块中的 x 变量是：{}"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 6</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 第三个 let 会 shadow 之前的 let，但只要离开了其作用范围 shadow 就会失效，恢复为原先的值。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是 <code v-pre>shadow</code> 重新声明变量，和把变量标记为 <code v-pre>mut</code> 是不一样的；</p>
<p><strong>如果不使用 <code v-pre>let</code> 关键字，那么重新给 <code v-pre>非mut</code> 的变量赋值会导致编译时错误；</strong></p>
<p>而使用 <code v-pre>let</code> 声明的同名新变量，虽然新变量也是 <code v-pre>不可变的</code>，但这样不会出现编译时错误；</p>
<p>我们甚至可以利用 <code v-pre>let</code> 声明的同名新变量，对变量的数据类型进行转换，转换后变量依旧是不可变的。</p>
<div class="language-rust line-numbers-mode" data-highlighter="shiki" data-ext="rust" data-title="rust" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> spaces</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "     "</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> spaces</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> spaces</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">len</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 如果在其他语言里可能就得声明两个变量： </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">/*</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">String spaces_str = "     "; </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">Int spaces_len = spaces_str.len();</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">*/</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> mut</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> spaces</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "     "</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">spaces</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> spaces</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">len</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(); </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 这样会导致一个编译时错误：</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// error: could not compile `variables` due to previous error</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型"><span>数据类型</span></a></h3>
<p>需要注意的时 Rust 是一种静态类型的编程语言，这就意味着它必须在编译期确定所有变量的数据类型；</p>
<p>通常编译可以根据 值 或者 值的使用方式 来推导出变量的使用类型（即隐式标注数据类型）；</p>
<p>而在值的类型可能存在多种情况的环境下，就必须显式标注数据类型了；否则会出现编译时错误。</p>
<div class="language-rust line-numbers-mode" data-highlighter="shiki" data-ext="rust" data-title="rust" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> guess</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">u32</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "42"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">parse</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">expect</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"这不是数字"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">); </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 此处语法会将 字符串42 转换为 整数42，此时如果不标注数据类型，会出现编译错误: </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// error: could not compile `no_type_annotations` due to previous error</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Rust 中，数据类型可分为两种: <code v-pre>标量</code> 和 <code v-pre>复合</code>;</p>
<h4 id="标量类型" tabindex="-1"><a class="header-anchor" href="#标量类型"><span>标量类型</span></a></h4>
<p>这基本和其他语言中的「基本数据类型」差不多，就不过多着墨介绍了。</p>
<ul>
<li>整数类型:
<ul>
<li>有符号：i8、i16、i32、i64、i128、isize</li>
<li>无符号：u8、u16、u32、u64、u128、usize</li>
</ul>
</li>
</ul>
<blockquote>
<p><code v-pre>isize</code> 和 <code v-pre>usize</code> 类型的取值范围是受操作系统影响的；</p>
<p><code v-pre>整数溢出</code> 是指当使用的整数值超过了标注类型的取值范围，就会发生 整数溢出；<br>
此时如果在 <code v-pre>debug模式</code> 下就会出现一个 <em><code v-pre>panic</code></em>；<br>
若处于 <code v-pre>release模式</code> 下，Rust 则会自动进行 <code v-pre>二进制补码包裹</code> 操作；简而言之，大于该类型最大值的数值会被“包裹”成该类型能够支持的对应数字的最小值。如：u8 变量取值 256 就会被自动转换为 0；</p>
</blockquote>
<ul>
<li>
<p>浮点类型: f32 f64</p>
</li>
<li>
<p>布尔类型: bool (true false)</p>
</li>
<li>
<p>字符类型: char</p>
</li>
</ul>
<blockquote>
<p>Rust 和其它比较严格的静态类型语言类似，char 使用 <code v-pre>''</code> 来表示字符，而 <code v-pre>&quot;&quot;</code> 表示字符串。</p>
</blockquote>
<h4 id="复合类型" tabindex="-1"><a class="header-anchor" href="#复合类型"><span>复合类型</span></a></h4>
<p><strong>元组</strong></p>
<p>元组是将多中类型的多个值组合成的一个复合类型。</p>
<p>元组的长度是固定的，声明后将无法增减。</p>
<div class="language-rust line-numbers-mode" data-highlighter="shiki" data-ext="rust" data-title="rust" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 元组 初始化</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> tup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: (</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">i32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">f64</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">char</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">233</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">6.66</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'牛'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 元组 取值(解构)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">v1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">v2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">v3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">} </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> tup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println!</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"v2 等于：{}"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">v2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 元组 取值(索引)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> v2</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> tup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和其他语言一样，元组的索引也是从 0 开始的。</p>
<p>不过，需要注意的是，没有任何值的元组 <code v-pre>()</code> 是一种特殊的类型，该类型被称为 <code v-pre>单元类型</code>，这种值也被称为 <code v-pre>单元值</code>。</p>
<p>如果表达式不返回任何其他值，就隐式的返回 <code v-pre>单元值</code>。</p>
<p><strong>数组类型</strong></p>
<p>数组和元组的用法差不多，同样是固定长度，但是存储的数据类型只能有一个。</p>
<blockquote>
<p>在 Rust 中还存在着另一种“数组”，<code v-pre>vector</code> 中文翻译为“向量”，在 Rust 中则表示一种可动态扩展长度的动态数组。
在你不知道该用 数组 还是 Vector 时，那就用 Vector 吧。</p>
</blockquote>
<div class="language-rust line-numbers-mode" data-highlighter="shiki" data-ext="rust" data-title="rust" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> arr</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">4</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">];</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> arr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: [</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">i32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">4</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 还有一种则是初始完全相同的值时</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> arr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: [</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">4</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]; </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// [1, 1, 1, 1]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 访问数组 下标</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"arr 的第三个元素是：{}"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">arr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>在 Rust 中如果你访问数组时，出现了下标越界的问题，那么 Rust 会直接在编译时触发一个 <em>panic</em></p>
</blockquote>
<h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数"><span>函数</span></a></h2>
<p>和其他语言类似，Rust 的入口函数也是 <code v-pre>main</code> 函数。</p>
<p>Rust 代码中的函数和变量名使用 <code v-pre>snake</code> 风格。也即蛇形命名法：<strong>所有字母都是小写并使用下划线分隔单词</strong>。</p>
<p>Rust 不关心函数定义于何处，只要定义了就行。</p>
<div class="language-rust line-numbers-mode" data-highlighter="shiki" data-ext="rust" data-title="rust" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// fn 关键字 定义函数</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">fn</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> get_user_age</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() -> </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">i32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // pass</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="语句和表达式" tabindex="-1"><a class="header-anchor" href="#语句和表达式"><span>语句和表达式</span></a></h3>
<p>函数是由一系列语句构成的，也可以选择使用表达式作为结尾。</p>
<p>Rust 是一门基于表达式的语言，所以需要区分一下「表达式」和「语句」的区别。</p>
<ul>
<li>表达式： 计算并产生一个值；</li>
<li>语句： 执行一些操作但不返回值；</li>
</ul>
<p>在 Rust 中可以直接将一个表达式放在函数的末尾，这样表达式产生的值就是函数的返回值（不用单独写 return）</p>
<p>不过需要注意的是用表示返回函数的值需要省略 <code v-pre>;</code> ；否则会直接出现错误。</p>
<div class="language-rust line-numbers-mode" data-highlighter="shiki" data-ext="rust" data-title="rust" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">fn</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">i32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">y</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">i32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) -> </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">i32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">++;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    y</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">++;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // return x + y;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> + </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">y</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // 最后一个表示式就是返回值</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 5</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>



<template><div><h1 id="前端-vue-相关" tabindex="-1"><a class="header-anchor" href="#前端-vue-相关"><span>前端 vue 相关</span></a></h1>
<h2 id="yarn-create-vite-报错-文件名、目录名或卷标语法不正确" tabindex="-1"><a class="header-anchor" href="#yarn-create-vite-报错-文件名、目录名或卷标语法不正确"><span>yarn create vite 报错：文件名、目录名或卷标语法不正确</span></a></h2>
<div class="language-info line-numbers-mode" data-highlighter="shiki" data-ext="info" data-title="info" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>$ yarn create vite cafe_cosmos --template vue</span></span>
<span class="line"><span>yarn create v1.22.22</span></span>
<span class="line"><span>[1/4] Resolving packages...</span></span>
<span class="line"><span>[2/4] Fetching packages...</span></span>
<span class="line"><span>[3/4] Linking dependencies...</span></span>
<span class="line"><span>[4/4] Building fresh packages...</span></span>
<span class="line"><span>success Installed "create-vite@5.2.3" with binaries:</span></span>
<span class="line"><span>      - create-vite</span></span>
<span class="line"><span>      - cva</span></span>
<span class="line"><span>The filename, directory name, or volume label syntax is incorrect.</span></span>
<span class="line"><span>error Command failed.</span></span>
<span class="line"><span>Exit code: 1</span></span>
<span class="line"><span>Command: D:\Devtool\NodeJS\node_global\bin\create-vite</span></span>
<span class="line"><span>Arguments: cafe_cosmos --template vue</span></span>
<span class="line"><span>Directory: D:\Project\Web</span></span>
<span class="line"><span>Output:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>info Visit https://yarnpkg.com/en/docs/cli/create for documentation about this command.</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>解决方案: https://segmentfault.com/a/1190000043503907</p>
</blockquote>
<h2 id="ts2307-cannot-find-module-app-vue-or-its-corresponding-type-declarations" tabindex="-1"><a class="header-anchor" href="#ts2307-cannot-find-module-app-vue-or-its-corresponding-type-declarations"><span>TS2307: Cannot find module './App.vue' or its corresponding type declarations.</span></a></h2>
<p>这个错误一般出现在 WebStorm 上, 原因是 vue 添加了 typescript 依赖后, 只认 .ts 不认 .vue</p>
<blockquote>
<p>解决方案: https://blog.csdn.net/peng2hui1314/article/details/135481952</p>
</blockquote>
</div></template>



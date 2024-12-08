<template><div><h1 id="计算机操作系统知识点统计" tabindex="-1"><a class="header-anchor" href="#计算机操作系统知识点统计"><span>计算机操作系统知识点统计</span></a></h1>
<h2 id="调度算法-多级反馈队列-mlfq" tabindex="-1"><a class="header-anchor" href="#调度算法-多级反馈队列-mlfq"><span>调度算法 - 多级反馈队列（MLFQ）</span></a></h2>
<ul>
<li>新任务默认进入优先级最高的队列；</li>
<li>若任务在某队列的配额用尽，则将其移动至优先级更低的队列。队列已用配额累计记录；</li>
<li>优先级高的任务先执行；</li>
<li>优先级相同的任务采用 Round-Robin 策略，按某个长度时间片执行；</li>
<li>没间隔一定时间，将所有任务移动至优先级最高的队列。</li>
</ul>
<blockquote>
<p><a href="https://www.bilibili.com/video/BV18T1FYMEiJ" target="_blank" rel="noopener noreferrer">冠以图灵奖之名的调度算法：MLFQ 多级反馈队列！</a></p>
</blockquote>
</div></template>



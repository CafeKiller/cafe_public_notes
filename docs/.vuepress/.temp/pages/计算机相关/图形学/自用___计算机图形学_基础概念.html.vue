<template><div><h1 id="计算机图形学基础概念" tabindex="-1"><a class="header-anchor" href="#计算机图形学基础概念"><span>计算机图形学基础概念</span></a></h1>
<ul>
<li><a href="https://www.bilibili.com/video/BV1X7411F744" target="_blank" rel="noopener noreferrer">视频链接</a></li>
<li><a href="https://iewug.github.io/book/GAMES101.html" target="_blank" rel="noopener noreferrer">笔记整理</a></li>
</ul>
<blockquote>
<p>本人并非图形专业学生或是从事图形学的专业工作者，<br>
学习计算图形学只是因为游戏开发这一兴趣而已，<br>
故此本篇笔记只记录计算机图形学的一些概念，<br>
可以说只是对这些概念进行扫盲罢了。</p>
</blockquote>
<h2 id="图形学数学基础-线性代数" tabindex="-1"><a class="header-anchor" href="#图形学数学基础-线性代数"><span>图形学数学基础 - 线性代数</span></a></h2>
<h3 id="_2d变换" tabindex="-1"><a class="header-anchor" href="#_2d变换"><span>2D变换</span></a></h3>
<ul>
<li>
<p>仿射变换</p>
<ul>
<li>线性变换</li>
<li>平移</li>
</ul>
</li>
<li>
<p>齐次坐标</p>
</li>
</ul>
<h3 id="_3d变换" tabindex="-1"><a class="header-anchor" href="#_3d变换"><span>3D变换</span></a></h3>
<ul>
<li>欧拉角</li>
<li>罗德里格斯旋转公式</li>
</ul>
<h2 id="相机-观测变换" tabindex="-1"><a class="header-anchor" href="#相机-观测变换"><span>相机 - 观测变换</span></a></h2>
<ul>
<li>
<p>视图变换</p>
</li>
<li>
<p>投影变换</p>
<ul>
<li>正交投影</li>
<li>透视投影</li>
</ul>
</li>
</ul>
<h2 id="光栅化" tabindex="-1"><a class="header-anchor" href="#光栅化"><span>光栅化</span></a></h2>
<ul>
<li>
<p>屏幕空间</p>
</li>
<li>
<p>视口变换</p>
</li>
<li>
<p>三角形-基本形状单元</p>
</li>
</ul>
<h3 id="采样" tabindex="-1"><a class="header-anchor" href="#采样"><span>采样</span></a></h3>
<ul>
<li>
<p>Inside函数</p>
</li>
<li>
<p>包围盒优化</p>
</li>
<li>
<p>采样的瑕疵</p>
<ul>
<li>锯齿</li>
<li>摩尔纹</li>
<li>车轮效应</li>
</ul>
</li>
<li>
<p>时域与频域</p>
</li>
<li>
<p>傅里叶级数展开</p>
</li>
<li>
<p>傅里叶频域图</p>
</li>
<li>
<p>滤波</p>
</li>
<li>
<p>卷积</p>
</li>
<li>
<p>频谱混叠</p>
</li>
</ul>
<h3 id="反走样-抗锯齿-算法" tabindex="-1"><a class="header-anchor" href="#反走样-抗锯齿-算法"><span>反走样（抗锯齿）算法</span></a></h3>
<ul>
<li>
<p>多重采样抗锯齿 MSAA</p>
<ul>
<li>这是一种在OpenGL中的特殊的超级采样抗锯齿（SSAA），MSAA主要是对 Z-Buffer 和 Stencil Buffer（模板缓冲）进行SSAA处理，其原理是通过提取像素界面周围的颜色信息，通过混合颜色信息来消除高对比界面所产生的锯齿。只对多边形的边缘进行抗锯齿处理。</li>
<li>缺点：资源耗费，画质上有些不如一般的SSAA。</li>
</ul>
</li>
<li>
<p>快速近似抗锯齿 FXAA</p>
<ul>
<li>是一种典型的边缘检查取样操作。FXAA原理与MSAA相同，其原理是通过提取像素界面周围的颜色信息，通过混合颜色信息来消除高对比界面所产生的锯齿。但是，FXAA将像素的提取和混合过程交由GPU 内的ALU（arithmetic and logic unit，算术逻辑单元）执行，所占用的显存带宽会 &lt;&lt; 传统的MSAA。</li>
<li>缺点：消耗低，速度快；但是是一种粗糙的模糊处理。</li>
</ul>
</li>
<li>
<p>子像素增强抗锯齿 SMAA</p>
<ul>
<li>SMAA 与 FXAA类似，性能消耗小，但是相比FXAA更清晰。SMAA是后处理抗锯齿技术的一种，它的基本处理流程建立在Jimenez优化改造后的MLAA（形态学抗锯齿）算法之上。原始的MLAA是由英特尔实验室提出的抗锯齿技术，这项技术代表着后处理式抗锯齿蓬勃发展的开端。最初，MLAA是为CPU设计的，Jimenez对其进行改造并移植到GPU上，使其适用于实时渲染。SMAA则是在此基础上进一步发展而来的。</li>
<li>缺点：动态画面时，锯齿抖动厉害。</li>
</ul>
</li>
<li>
<p>覆盖采样抗锯齿 CSAA</p>
<ul>
<li>这是一种覆盖的采样，它的原理是将边缘多边形里需要采样的子像素坐标覆盖掉，抒原像素坐标强制安置在硬件和驱动程序预告算好的坐标中。这就好比采样标准统一的MSAA，能够最高效率地执行边缘采样，交通提升非常明显，同时资源占用也比较低。</li>
<li>相比MSAA减少了带宽和存储开销。</li>
</ul>
</li>
<li>
<p>时间性抗锯齿 TXAA</p>
<ul>
<li>TXAA 抗锯齿比 MSAA和FXAA 以及 CSAA 的画质更高，制作CG电影的电影制片厂会在抗锯齿方面花费大量的计算资源，从而可确保观众不会因不逼真的锯齿状线条而分心。如果想要让游戏接近这种级别的保真度，那么开发商需要全新的抗锯齿技术，不但要减少锯齿状的线条，而且要减少锯齿状闪烁情形，同时还不降低性能。为了便于开发商实现这种保真度的提升，英伟达设计了画质更高的抗锯齿模式，名为TXAA.该模式专为直接集成到游戏引擎中而设计。</li>
<li>与CG电影中所采用的技术类似，TXAA集MSAA的强大功能与复杂的解析滤镜于一身，可呈现出更加平滑的图像效果，远远超越了所有同类技术。此外，TXAA还能够对帧之间的整个场景进行抖动采样，以减少闪烁情形，闪烁情形在技术上又称作时间性锯齿。</li>
<li>目前，TXAA有两种模式：TXAA 2X和TXAA 4X。TXAA 2X可提供堪比8X MSAA的视觉保真度，然而所需性能却与2X MSAA相类似；TXAA 4X的图像保真度胜过8XMSAA，所需性能仅仅与4X MSAA相当。</li>
</ul>
</li>
<li>
<p>可编程过滤抗锯齿 CFAA</p>
<ul>
<li>起源于 AMD 的 R600家庭。简单地说CFAA就是扩大取样面积的MSAA，比方说之前的 MSAA 是严格选取物体边缘像素进行缩放的，而 CFAA 则可以通过驱动和谐灵活地选择对影响锯齿效果较大的像素进行缩放，以较少的性能牺牲换取平滑效果。显卡资源占用也比较小。</li>
</ul>
</li>
<li>
<p>多帧采样抗锯齿 MFAA</p>
<ul>
<li>与MSAA基于像素采样有所不同，MFAA是基于帧采样的，我们大致可以这么理解，MFAA是在相邻的两帧上各执行一次抗锯齿采样，然后通过 NVIDIA 自行开发的图像合成处理技术来整合采样结果，最后输出完成抗锯齿运算的图像。</li>
</ul>
</li>
</ul>
<h3 id="其他抗锯齿处理" tabindex="-1"><a class="header-anchor" href="#其他抗锯齿处理"><span>其他抗锯齿处理</span></a></h3>
<ul>
<li>
<p>超分辨率</p>
</li>
<li>
<p>画家算法</p>
<ul>
<li>在三维场景中多个物体互相重叠时，需要确定哪些部分是可见的，哪部分是不可见的。</li>
<li>画家算法比较简单，但它只适合在场景内物体或面比较小的情况，且物体深度关系相较简单的环境下。</li>
<li>三个基本步骤
<ul>
<li><code v-pre>深度排序</code> 计算每个物体或每个物体的每个面的深度值。深度值可以通过物体或面的顶点坐标计算获得，通常是相对于视点的距离；</li>
<li><code v-pre>排序</code> 根据深度值对物体或面进行排序，顺序由小到大（小在前，大在后）；</li>
<li><code v-pre>绘制</code> 按照从后向前的顺序绘制物体或面，绘制顺序则是由大到小。</li>
</ul>
</li>
<li>缺点
<ul>
<li><code v-pre>排序开销</code> 排序算法需要消耗计算资源；</li>
<li><code v-pre>深度冲突</code> 当两个或多个物体的深度值非常接近或一致时，会导致绘制结果冲突；</li>
<li><code v-pre>不支持透明物体</code> 透明需要考虑光线的透射和折射，仅依赖深度是远远不够的。</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="深度缓冲-z-buffer" tabindex="-1"><a class="header-anchor" href="#深度缓冲-z-buffer"><span>深度缓冲（Z-Buffer）</span></a></h2>
<h2 id="着色" tabindex="-1"><a class="header-anchor" href="#着色"><span>着色</span></a></h2>
<ul>
<li>
<p>Blinn-Phong反射模型</p>
</li>
<li>
<p>漫反射</p>
</li>
<li>
<p>兰伯特余弦定律（Lambert）</p>
</li>
<li>
<p>光照衰减</p>
</li>
<li>
<p>朗伯着色器</p>
</li>
<li>
<p>高光</p>
</li>
<li>
<p>环境光照</p>
</li>
<li>
<p>着色频率</p>
</li>
</ul>
<h2 id="实时渲染管线" tabindex="-1"><a class="header-anchor" href="#实时渲染管线"><span>实时渲染管线</span></a></h2>
<ul>
<li>简化的流程
<ul>
<li>输入空间中一系列的点</li>
<li>顶点处理</li>
<li>三角形处理</li>
<li>光栅化</li>
<li>着色</li>
<li>片段（像素）处理</li>
<li>帧缓冲区处理</li>
<li>输出</li>
</ul>
</li>
</ul>
<h2 id="shader编程" tabindex="-1"><a class="header-anchor" href="#shader编程"><span>Shader编程</span></a></h2>
<h2 id="纹理映射" tabindex="-1"><a class="header-anchor" href="#纹理映射"><span>纹理映射</span></a></h2>
<ul>
<li>
<p>重心坐标</p>
</li>
<li>
<p>插值</p>
</li>
<li>
<p>定义与性质</p>
</li>
<li>
<p>应用材质</p>
</li>
<li>
<p>纹理太小 - 双线性插值</p>
</li>
<li>
<p>纹理太大 - Mipmap</p>
</li>
<li>
<p>过渡不平滑 - 三线性插值</p>
</li>
<li>
<p>过度模糊 - 各向异性过滤</p>
</li>
<li>
<p>纹理映射的应用</p>
</li>
<li>
<p>环境映射</p>
</li>
<li>
<p>位移贴图</p>
</li>
<li>
<p>三维纹理</p>
</li>
</ul>
<h3 id="凹凸-法线贴图" tabindex="-1"><a class="header-anchor" href="#凹凸-法线贴图"><span>凹凸/法线贴图</span></a></h3>
<ul>
<li>
<p>计算法线贴图（一维）</p>
</li>
<li>
<p>计算法线贴图（二维）</p>
</li>
</ul>
<h2 id="几何" tabindex="-1"><a class="header-anchor" href="#几何"><span>几何</span></a></h2>
<ul>
<li>
<p>隐式几何</p>
</li>
<li>
<p>距离函数</p>
</li>
<li>
<p>分型</p>
</li>
<li>
<p>点云</p>
</li>
<li>
<p>多边形网格</p>
</li>
</ul>
<h3 id="贝塞尔曲线" tabindex="-1"><a class="header-anchor" href="#贝塞尔曲线"><span>贝塞尔曲线</span></a></h3>
<ul>
<li>
<p>德卡斯特里奥算法</p>
</li>
<li>
<p>凸包</p>
</li>
<li>
<p>逐段贝塞尔曲线</p>
</li>
<li>
<p>CN连续</p>
</li>
<li>
<p>贝塞尔曲面</p>
</li>
</ul>
<h2 id="网格" tabindex="-1"><a class="header-anchor" href="#网格"><span>网格</span></a></h2>
<ul>
<li>
<p>网格操作的分类</p>
<ul>
<li>网格细分</li>
<li>网格简化</li>
<li>网格正规化</li>
</ul>
</li>
<li>
<p>Loop细分</p>
</li>
<li>
<p>Catmull-Clark细分</p>
</li>
<li>
<p>边坍缩算法</p>
</li>
<li>
<p>二次误差度量</p>
</li>
</ul>
<h2 id="阴影映射" tabindex="-1"><a class="header-anchor" href="#阴影映射"><span>阴影映射</span></a></h2>
<ul>
<li>软阴影</li>
</ul>
<h3 id="光线追踪" tabindex="-1"><a class="header-anchor" href="#光线追踪"><span>光线追踪</span></a></h3>
<ul>
<li>
<p>光栅化难以做好以下的效果</p>
<ul>
<li>软阴影</li>
<li>毛玻璃材质的反射</li>
<li>间接光照</li>
</ul>
</li>
<li>
<p>光线投射</p>
</li>
<li>
<p>Whitted-Style 光线追踪</p>
</li>
<li>
<p>递归光线追踪</p>
</li>
<li>
<p>光线方程</p>
</li>
<li>
<p>Möller Trumbore算法（射线三角相交算法）</p>
</li>
<li>
<p>轴对齐包围盒(AABB)</p>
</li>
<li>
<p>判定光线与包围盒的交点</p>
</li>
<li>
<p>空间划分</p>
<ul>
<li>AABB的均匀划分</li>
<li>八叉树</li>
<li>KD树</li>
<li>BSP树</li>
</ul>
</li>
<li>
<p>层次包围盒（BVH）</p>
</li>
<li>
<p>辐射度量学</p>
</li>
<li>
<p>立体角</p>
</li>
<li>
<p>微分立体角</p>
<ul>
<li>点光源</li>
</ul>
</li>
<li>
<p>双向反射分布函数(BRDF)</p>
</li>
<li>
<p>反射方程</p>
</li>
<li>
<p>渲染方程</p>
<ul>
<li>单个光源的反射方程</li>
<li>多个光源的反射方程</li>
<li>面光源的反射方程</li>
<li>面光源的渲染方程</li>
</ul>
</li>
<li>
<p>蒙特卡洛路径追踪</p>
<ul>
<li>蒙特卡洛积分</li>
<li>Witted-Style的问题</li>
<li>直接光照的算法</li>
<li>全局光照的算法</li>
<li>问题
<ul>
<li>反弹次数的上升产生射线数量爆炸</li>
<li>由于路径追踪递归产生的死循环</li>
<li>提高效率</li>
</ul>
</li>
</ul>
</li>
<li>
<p>光线追踪有很多类型</p>
<ul>
<li>（单向和双向）路径跟踪</li>
<li>光子映射</li>
<li>Metropolis light transport（MLT）</li>
<li>VCM / UPBP</li>
</ul>
</li>
<li>
<p>课程中光线追踪未涉及的部分</p>
<ul>
<li>函数采样理论</li>
<li>选择什么样的PDF（重要性采样）</li>
<li>随机数的生成</li>
<li>结合不同的采用结果（如光源和着色点）</li>
<li>像素发出多个路径，是否平均其着色效果即可（pixel reconstruction filter）</li>
<li>像素的radiance和color的区别（伽马矫正）</li>
</ul>
</li>
</ul>
<h2 id="材质与外观-brdf" tabindex="-1"><a class="header-anchor" href="#材质与外观-brdf"><span>材质与外观（BRDF）</span></a></h2>
<ul>
<li>
<p>漫反射材质</p>
</li>
<li>
<p>镜面反射</p>
</li>
<li>
<p>折射定律</p>
<ul>
<li>斯涅耳定律</li>
</ul>
</li>
<li>
<p>全反射</p>
</li>
<li>
<p>菲涅尔项</p>
</li>
<li>
<p>微表面材质</p>
</li>
</ul>
<h2 id="高级图形渲染" tabindex="-1"><a class="header-anchor" href="#高级图形渲染"><span>高级图形渲染</span></a></h2>
<ul>
<li>高级光线传播
<ul>
<li>无偏光线传播
<ul>
<li>双向路径追踪（BDPT）</li>
<li>Metropolis光线传播 (MLT)</li>
</ul>
</li>
<li>有偏光线传播
<ul>
<li>光子映射</li>
<li>Vertex connection and merging (VCM) -结合双向追踪和光子映射</li>
</ul>
</li>
<li>实时辐射度算法（IR）</li>
</ul>
</li>
</ul>
</div></template>



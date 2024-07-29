# React 揭秘

## React 理念

我们可以从官网看到React的理念：**我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。**

我们日常使用App，浏览网页时，有两类场景会制约快速响应：

- 当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。
- 发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。

这类场景可以大致分为两类：CPU的瓶颈、IO的瓶颈

### CPU的瓶颈

```javascript
// 当项目变得庞大、组件数量繁多时，就容易遇到CPU的瓶颈。
// 考虑如下Demo，我们向视图中渲染3000个li
function App() {
    const len = 3000;
    return (
        <ul>
            {Array(len).fill(0).map((_, i) => <li>{i}</li>)}
        </ul>
    );
}
const rootEl = document.querySelector("#root");
ReactDOM.render(<App/>, rootEl);
```

主流浏览器刷新频率为60Hz，即每（1000ms / 60Hz）16.6ms浏览器刷新一次。

我们知道，JS可以操作DOM，GUI渲染线程与JS线程是互斥的。所以JS脚本执行和浏览器布局、绘制不能同时执行。

在每16.6ms时间内，需要完成如下工作：`JS脚本执行 ----->  样式布局 -----> 样式绘制`

当JS执行时间过长，超出了16.6ms，这次刷新就没有时间执行样式布局和样式绘制了。

在Demo中，由于组件数量繁多（3000个），JS脚本执行时间过长，页面掉帧，造成卡顿。

如何解决这个问题呢？在浏览器每一帧的时间中，预留一些时间给JS线程，React利用这部分时间更新组件（通过查看React源码可以知道预留的初始时间是5ms）

当预留的时间不够用时，React将线程控制权交还给浏览器使其有时间渲染UI，React则等待下一帧时间到来继续被中断的工作。

> 这种将长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为时间切片（time slice）

接下来我们开启Concurrent Mode（后续章节会讲到，当前你只需了解开启后会启用时间切片）：

```javascript
// 通过使用ReactDOM.unstable_createRoot开启Concurrent Mode
// ReactDOM.render(<App/>, rootEl);  

ReactDOM.unstable_createRoot(rootEl).render(<App/>);
```

## React15 框架

React从v15升级到v16后重构了整个架构。本节我们聊聊v15，看看他为什么不能满足快速响应的理念，以至于被重构。

React15架构可以分为两层：
- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

### Reconciler（协调器）

在React中可以通过`this.setState`、`this.forceUpdate`、`ReactDOM.render` 等API触发更新。

每当有更新发生时，Reconciler会做如下工作：

- 调用函数组件、或class组件的render方法，将返回的JSX转化为虚拟DOM
- 将虚拟DOM和上次更新时的虚拟DOM对比
- 通过对比找出本次更新中变化的虚拟DOM
- 通知Renderer将变化的虚拟DOM渲染到页面上

### Renderer（渲染器）

由于React支持跨平台，所以不同平台有不同的Renderer。我们前端最熟悉的是负责在浏览器环境渲染的Renderer —— ReactDOM

除此之外，还有：

- ReactNative老的React架构 - 图3 (opens new window)渲染器，渲染App原生组件
- ReactTest老的React架构 - 图4 (opens new window)渲染器，渲染出纯Js对象用于测试
- ReactArt老的React架构 - 图5 (opens new window)渲染器，渲染到Canvas, SVG 或 VML (IE8)

在每次更新发生时，Renderer接到Reconciler通知，将变化的组件渲染在当前宿主环境。

### React15架构的缺点

在Reconciler中，mount的组件会调用mountComponent，update 的组件会调用 updateComponent。这两个方法都会递归更新子组件。

__递归更新的缺点__：由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。


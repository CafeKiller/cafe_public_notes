# Fiber架构

## 什么是代数效应

代数效应是函数式编程中的一个概念，用于将副作用从函数调用中分离。

```javascript
// 假设我们有一个函数getTotalPicNum，传入2个用户名称后，分别查找该用户在平台保存的图片数量，最后将图片数量相加后返回。
function getTotalPicNum(user1, user2) {
    const picNum1 = getPicNum(user1);
    const picNum2 = getPicNum(user2);
    return picNum1 + picNum2;
}
// 在getTotalPicNum中，我们不关注getPicNum的实现，只在乎“获取到两个数字后将他们相加的结果返回”这一过程。
```

## 代数效应与Generator

从React15到React16，协调器（Reconciler）重构的一大目的是：将老的同步更新的架构变为异步可中断更新。

异步可中断更新可以理解为：更新在执行过程中可能会被打断（浏览器时间分片用尽或有更高优任务插队），当可以继续执行时恢复之前执行的中间状态。

这就是代数效应中try...handle的作用。

其实，浏览器原生就支持类似的实现，这就是Generator。

但是Generator的一些缺陷使React团队放弃了他：

- 类似async，Generator也是传染性的，使用了Generator则上下文的其他函数也需要作出改变。这样心智负担比较重。
- Generator执行的中间状态是上下文关联的。

```javascript
function* doWork(A, B, C) {
    var x = doExpensiveWorkA(A);
    yield;
    var y = x + doExpensiveWorkB(B);
    yield;
    var z = y + doExpensiveWorkC(C);
    return z;
}
// 每当浏览器有空闲时间都会依次执行其中一个doExpensiveWork，当时间用尽则会中断，当再次恢复时会从中断位置继续执行。
// 只考虑“单一优先级任务的中断与继续”情况下Generator可以很好的实现异步可中断更新
// 但是当我们考虑“高优先级任务插队”的情况，如果此时已经完成doExpensiveWorkA与doExpensiveWorkB计算出x与y。
```

## 代数效应与Fiber

Fiber并不是计算机术语中的新名词，他的中文翻译叫做纤程，与进程（Process）、线程（Thread）、协程（Coroutine）同为程序执行过程。

在很多文章中将纤程理解为协程的一种实现。在JS中，协程的实现便是Generator。

所以，我们可以将纤程(Fiber)、协程(Generator)理解为代数效应思想在JS中的体现。

React Fiber可以理解为：React内部实现的一套状态更新机制。支持任务不同优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。

其中每个任务更新单元为React Element对应的Fiber节点。
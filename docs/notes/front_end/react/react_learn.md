---
title: "React 基础学习"
category: WEB前端
subcategory: React
level: 6
tags:
  - React
---

# React 基础学习

React 是一个用于构建用户界面的 JavaScript 库。它由 Facebook(现Meta) 开发和维护，并在2013年开源。React 的设计初衷是帮助开发者构建复杂的用户界面，同时保持代码的可维护性和可扩展性。

> [!tip] react的特点
>
> - **组件化**：React 通过将 UI 分解为独立的、可重用的组件，使得代码更易于管理和维护。每个组件只关注于自身的逻辑和视图。
> - **声明式编程**：React 采用声明式的编程风格，开发者只需描述 UI 应该是什么样子的，而不需要手动操作 DOM。React 会根据数据的变化自动更新 UI。
> - **虚拟 DOM**：React 使用虚拟 DOM（Virtual DOM）来优化 UI 的更新过程。当数据发生变化时，React 会创建一个新的虚拟 DOM，然后将其与之前的虚拟 DOM 进行比较，找出最小的变化，并将这些变化应用到实际的 DOM 中，从而提高性能。
> - **单向数据流**：React 采用单向数据流（也称为单向数据绑定），这意味着数据在组件之间通过 props 进行传递，使得数据的流动更加清晰和可预测。
> - **生态系统**：React 有一个庞大且活跃的社区，提供了大量的第三方库和工具，如 React Router（用于路由管理）、Redux（用于状态管理）等，帮助开发者构建复杂的应用。
> 
> ```jsx
> const arr = [
>     {
>         name: '小明',
>         age: 18
>     },
>     {
>         name: '小红',
>         age: 19
>     }
> ]
> const App  = () => {
>     return (arr.map(item => {
>         return <div>{item.name} {item.age} </div>
>     }))
> }
> ```

> [!tip] 参考资料
> 
> [React 快速入门](https://zh-hans.react.dev/learn)
> 
> [React 技术揭秘](https://github.com/BetaSu/just-react)
>  
> [ReactFiber 架构的原理和工作模式](https://segmentfault.com/a/1190000044468085)
>
> [React 教程](https://juejin.cn/post/7410313831271776256)

## 基础语法

使用 tsx 绑定变量 `{value}`

> 绑定 class 需要用 className

```tsx
function App() {
  const num: number = 333
  const fn = () => 'test'
  return (
    <>
      {'11' /** 字符串用法 */}
      {num /** 变量用法 */}
      {fn() /** 函数用法 */}
      {new Date().getTime() /** 日期用法 */}
    </>
  )
}
//绑定class(className) id 属性等等 都是一样的
function App() {
  const value:string = 'A'
  return (
    <>
      <div data-index={value} className={value} id={value}>{value}</div>
    </>
  )
}
//绑定多个class(className)
function App() {
  const a:string = 'A'
  return (
    <>
      <div className={`${a} class2`}>{value}</div>
    </>
  )
}
//绑定样式style
function App() {
  const styles = { color: 'red' }
  return (
    <>
      <div style={styles}>test</div>
    </>
  )
}
```

使用 tsx 绑定事件 `on[Click]{fn}` 小驼峰 其他事件也是一样的

```tsx
function App() {
  const value: string = '小满'
  const clickTap = (params: string) => console.log(params)
  return (
    <>
      <div onClick={() => clickTap(value)}>{value}</div>
    </>
  )
}
```

tsx 如何使用泛型

正常写泛型语法会跟 tsx 语法冲突，他会把泛型理解成是一个元素，解决方案后面加一个，即可

```tsx
function App() {
  const value: string = '小满'
  const clickTap = <T,>(params: T) => console.log(params)
  return (
    <>
      <div onClick={() => clickTap(value)}>{value}</div>
    </>
  )
}
```

tsx 如何渲染 html 代码片段(`dangerouslySetInnerHTML`)

`dangerouslySetInnerHTML` 的值是一个对象，该对象包含一个名为 `__html` 的属性，且值为你想要插入的 HTML 字符串

```tsx
function App() {
  const value: string = '<section style="color:red">小满</section>'
  return (
    <>
        <div dangerouslySetInnerHTML={{ __html: value }}></div>
    </>
  )
}
```

tsx 如何遍历 dom 元素

使用 map 遍历返回 html 标签即可

```tsx
function App() {
  const arr: string[] = ["小满","中满","大满"]
  return (
    <>
        {
            arr.map((item) => {
                return <div>{item}</div>
            })
        }
    </>
  )
}
```

tsx如何编写条件语句

使用三元表达式就可以了

```tsx
function App() {
  const flag:boolean = true
  return (
    <>
        {
           flag ? <div>真的</div> : <div>假的</div>
        }
    </>
  )
}
```

tsx注意事项

{} 插值语句内不允许编写 `switch` `if` `变量声明` 或者直接放入`对象本体`

```tsx
//错误用法
function App() {
  const obj = { name: '小满' }
  return (
    <>
      {obj}
    </>
  )
}
//正确用法
function App() {
  const obj = { name: '小满' }
  return (
    <>
      {obj.name}
      {JSON.stringify(obj)}
    </>
  )
}
```

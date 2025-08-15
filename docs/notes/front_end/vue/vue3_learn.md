---
title: "Vue3 学习日志"
category: WEB前端
subcategory: Vue
level: 5
tags:
  - Vue
  - Vue3
---

# Vue3 学习日志

Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web 世界是十分多样化的，不同的开发者在 Web 上构建的东西可能在形式和规模上会有很大的不同。考虑到这一点，Vue 的设计非常注重灵活性和“可以被逐步集成”这个特点。

> [!tip] 参考资料
>
> [Vue3.x 官方文档](https://cn.vuejs.org/guide/introduction.html)

> [!danger] 强烈建议
>
> 依旧强烈建议大家阅读官方文档。

## setup 函数

`setup()` 钩子是在组件中使用组合式 API 的入口，通常只在以下情况下使用：

- 需要在非单文件组件中使用组合式 API 时。
- 需要在基于选项式 API 的组件中集成基于组合式 API 的代码时。

我们可以使用响应式 API 来声明响应式的状态，在 `setup()` 函数中返回的对象会暴露给模板和组件实例。其他的选项也可以通过组件实例来获取 `setup()` 暴露的属性

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

在模板中访问从 `setup` 返回的 `ref` 时，它会自动浅层解包，因此你无须再在模板中为它写 .`value`。当通过 `this` 访问时也会同样如此解包。

`setup()` 自身并不含对组件实例的访问权，即在 `setup()` 中访问 `this` 会是 `undefined`。你可以在选项式 API 中访问组合式 API 暴露的值，但反过来则不行。

### 访问 Props​

setup 函数的第一个参数是组件的 props。和标准的组件一致，一个 setup 函数的 props 是响应式的，并且会在传入新的 props 时同步更新。

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

请注意如果你解构了 `props` 对象，解构出的变量将会丢失响应性。因此我们推荐通过 `props.xxx` 的形式来使用其中的 `props`。

如果你确实需要解构 `props` 对象，或者需要将某个 prop 传到一个外部函数中并保持响应性，那么你可以使用 `toRefs()` 和 `toRef()` 这两个工具函数：

```js
import { toRefs, toRef } from 'vue'

export default {
  setup(props) {
    // 将 `props` 转为一个其中全是 ref 的对象，然后解构
    const { title } = toRefs(props)
    // `title` 是一个追踪着 `props.title` 的 ref
    console.log(title.value)

    // 或者，将 `props` 的单个属性转为一个 ref
    const title = toRef(props, 'title')
  }
}
```

### Context 上下文​

传入 `setup` 函数的第二个参数是一个 `Setup` 上下文对象。上下文对象暴露了其他一些在 `setup` 中可能会用到的值：

```js
export default {
  setup(props, context) {
    // 透传 Attributes (非响应式的对象，等价于 $attrs)
    console.log(context.attrs)

    // 插槽(非响应式的对象，等价于 $slots)
    console.log(context.slots)

    // 触发事件(函数，等价于 $emit)
    console.log(context.emit)

    // 暴露公共属性(函数)
    console.log(context.expose)
  }
}
```

该上下文对象是非响应式的，可以安全地解构：

```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    // ...
  }
}
```

`attrs` 和 `slots` 都是有状态的对象，它们总是会随着组件自身的更新而更新。这意味着你应当避免解构它们，并始终通过 `attrs.x` 或 `slots.x` 的形式使用其中的属性。此外还需注意，和 `props` 不同，`attrs` 和 `slots` 的属性都不是响应式的。如果你想要基于 attrs 或 `slots` 的改变来执行副作用，那么你应该在 `onBeforeUpdate` 生命周期钩子中编写相关逻辑。

## 生命周期钩子

### onMounted()​

注册一个回调函数，在组件挂载完成后执行。

源码

```ts
function onMounted(callback: () => void, target?: ComponentInternalInstance | null): void
```

> [!tip] 详细信息
>
> 组件在以下情况下被视为已挂载：
> - 其所有同步子组件都已经被挂载 (不包含异步组件或 `<Suspense>` 树内的组件)。
> - 其自身的 DOM 树已经创建完成并插入了父容器中。注意仅当根容器在文档中时，才可以保证组件 DOM 树也在文档中。
> 
> 这个钩子通常用于执行需要访问组件所渲染的 DOM 树相关的副作用，或是在服务端渲染应用中用于确保 DOM 相关代码仅在客户端执行。
> 
> 这个钩子在服务器端渲染期间不会被调用。

```vue
<script setup>
import { ref, onMounted } from 'vue'

const el = ref()

onMounted(() => {
  el.value // <div>
})
</script>

<template>
  <div ref="el"></div>
</template>
```

### onUpdated()​

注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用。

源码

```ts
function onUpdated(callback: () => void, target?: ComponentInternalInstance | null): void
```

> [!tip] 详细信息
>
> 父组件的更新钩子将在其子组件的更新钩子之后调用。
> 
> 这个钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的，因为多个状态变更可以在同一个渲染周期中批量执行 (考虑到性能因素)。如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 `nextTick()` 作为替代。
> 
> 这个钩子在服务器端渲染期间不会被调用。

> [!WARNING] 注意
> 
> 不要在 updated 钩子中更改组件的状态，这可能会导致无限的更新循环！

```vue
<script setup>
import { ref, onUpdated } from 'vue'

const count = ref(0)

onUpdated(() => {
  // 文本内容应该与当前的 `count.value` 一致
  console.log(document.getElementById('count').textContent)
})
</script>

<template>
  <button id="count" @click="count++">{{ count }}</button>
</template>
```

### onBeforeMount()​

注册一个钩子，在组件被挂载之前被调用。

源码

```ts
function onBeforeMount(callback: () => void, target?: ComponentInternalInstance | null): void
```

> [!tip] 详细信息
> 
> 当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。它即将首次执行 DOM 渲染过程。
> 
> 这个钩子在服务器端渲染期间不会被调用。

### onBeforeUpdate()​

注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用。

源码

```ts
function onBeforeUpdate(callback: () => void, target?: ComponentInternalInstance | null): void
```

> [!tip] 详细信息
>
> 这个钩子可以用来在 Vue 更新 DOM 之前访问 DOM 状态。在这个钩子中更改状态也是安全的。
> 
> **这个钩子在服务器端渲染期间不会被调用。**

### onBeforeUnmount()​

注册一个钩子，在组件实例被卸载之前调用。

源码

```ts
function onBeforeUnmount(callback: () => void, target?: ComponentInternalInstance | null): void
```

> [!tip] 详细信息
>
> 当这个钩子被调用时，组件实例依然还保有全部的功能。
> 
> **这个钩子在服务器端渲染期间不会被调用。**
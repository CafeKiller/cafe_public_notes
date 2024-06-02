# Vue 扩展知识

## Vue.observable

> Vue.observable(object) 是vue2.6版本新增的全局API，它可以让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。  
> 返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景。  

> 在 Vue 2.x 中，被传入的对象会直接被 Vue.observable 改变；在 Vue 3.x 中，则会返回一个可响应的代理，而对源对象直接进行修改仍然是不可响应的。  
> 因此，为了向前兼容，官方推荐始终操作使用 Vue.observable 返回的对象，而不是传入源对象。  

```js
// 返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。也可以作为最小化的跨组件状态存储器
Vue.observable({ count : 1})
// 等效于
new vue({ count : 1})
```

### 使用场景

在非父子组件通信时，可以使用通常的bus或者使用vuex，但是实现的功能不是太复杂，而使用上面两个又有点繁琐。这时，observable就是一个很好的选择。

```js
// 引入vue
import Vue from 'vue
// 创建state对象，使用observable让state对象可响应
export let state = Vue.observable({
    name: '张三',
    'age': 38
})
// 创建对应的方法
export let mutations = {
    changeName(name) {
        state.name = name
    },
    setAge(age) {
        state.age = age
    }
}
```

```jsx
<template>
    <div>
        姓名：{{ name }}
        年龄：{{ age }}
        <button @click="changeName('李四')">改变姓名</button>
        <button @click="setAge(18)">改变年龄</button>
    </div>
</template>

import { state, mutations } from '@/store
export default {
    // 在计算属性中拿到值
    computed: {
        name() {
            return state.name
        },
        age() {
            return state.age
        }
    },
    // 调用mutations里面的方法，更新数据
    methods: {
        changeName: mutations.changeName,
        setAge: mutations.setAge
    }
}
```
> 和原生JS中的监听器API是类似的, 也算是监听者模式的优秀实践了.

> 参考:   
> https://vue3js.cn/interview/vue/observable.html   
> https://blog.csdn.net/qq_32682301/article/details/105419673  

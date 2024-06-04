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

## Vue2: 直接添加属性的问题

### 问题描述

```vue
// 我们从一个例子开始
// 定义一个p标签，通过v-for指令进行遍历
// 然后给 botton 标签绑定点击事件，我们预期点击按钮时，数据新增一个属性，界面也 新增一行

<template>
    <p v-for="(value,key) in item" :key="key">
        {{ value }}
    </p>
    <button @click="addProperty">动态添加新属性</button>
</template>

// 实例化一个vue实例，定义data属性和methods方法
<script>
    const app = new Vue ({
        el:"#app",
        data:()=>{
            item:{
                oldProperty:"旧属性"
            }
        },
        methods:{
            addProperty(){
                this.items.newProperty = "新属性"  // 为items添加新属性
                console.log(this.items)  // 输出带有newProperty的items
            }
        }
    })
</script>
// 点击按钮，发现结果不及预期，数据虽然更新了（console打印出了新属性），但页面并没有更新
```

### 原理分析

```js
// vue2是用过Object.defineProperty实现数据响应式
const obj = {}
Object.defineProperty(obj, 'foo', {
    get() {
        console.log(`get foo:${val}`);
        return val
    },
    set(newVal) {
        if (newVal !== val) {
            console.log(`set foo:${newVal}`);
            val = newVal
        }
    }
})

// 当我们访问foo属性或者设置foo值的时候都能够触发setter与getter
obj.foo
obj.foo = 'new'
// 但是我们为obj添加新属性的时候，却无法触发事件属性的拦截
obj.bar  = '新属性'
// 原因是一开始obj的foo属性被设成了响应式数据，而bar是后面新增的属性，并没有通过Object.defineProperty设置成响应式数据
```

### 解决方案

Vue 不允许在已经创建的实例上动态添加新的响应式属性, 若想实现数据与视图同步更新，可采取下面三种解决方案：

- `Vue.set()`
  - Vue.set( target, propertyName/index, value )
  - 参数: `{Object | Array} target` `{string | number} propertyName/index`  `{any} value`
  - 返回值：设置的值
  - 通过Vue.set向响应式对象中添加一个property，并确保这个新 property同样是响应式的，且触发视图更新

- `Object.assign()`
  - 直接使用Object.assign()添加到对象的新属性不会触发更新
  - 应创建一个新的对象，合并原对象和混入对象的属性
  - `this.someObject = Object.assign({},this.someObject,{newProperty1:1,newProperty2:2 ...})`

- `$forcecUpdated()`
  - 如果你发现你自己需要在 Vue中做一次强制更新，99.9% 的情况，是你在某个地方做错了事
  - `$forceUpdate` 迫使 Vue 实例重新渲染
  - __PS__：仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

> 参考链接:   
> https://vue3js.cn/interview/vue/data_object_add_attrs.html

## Vue3: `Treeshaking`

`Tree shaking` 是一种通过清除多余代码方式来优化项目打包体积的技术，专业术语叫 `Dead code elimination`

简单来讲，就是在保持代码运行结果不变的前提下，去除无用的代码

# Vue 相关问题

## 从0到1自己构架一个vue项目，说说有哪些步骤、哪些重要插件、目录结构你会怎么组织

> 源问题: https://github.com/haizlin/fe-interview/issues/983

回答:   

要看是vue.js还是vue cli项目，如果是vue.js可以按照普通web项目流程开发，只在代码架构上变为数据和模型分离的模式即可。  

如果是vue cli项目，不仅要分离数据和模型，还需要 vue-router、状态管理如 Vuex、国际化等相关组件配合开发了，多人团队开发的情况下还需要对项目规范进行约束，这时就需要用到如eslint、stylelint、typescript配合开发了。

> 相关解答:

## 你知道vue的模板语法用的是哪个web模板引擎的吗？说说你对这模板引擎的理解

> 源问题: https://github.com/haizlin/fe-interview/issues/561

> 相关解答: https://www.yinzhuoei.com/index.php/archives/110/

## 你知道v-model的原理吗？说说看

> 源问题: https://github.com/haizlin/fe-interview/issues/560

回答: 本质就是一个语法糖, 简单来说就是通过添加一个 input 或 change 事件,事实监听用户的输入, 从而修改对应属性来实现双向绑定.

> 相关解答: 
# 目标
为了解决以下问题：

> 当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏：
> 
> 1. 多个视图依赖于同一状态。
>
> 2. 来自不同视图的行为需要变更同一状态。
>
> 对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。
> 
> 因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？在这种模式下，我们的组件树构成了一个巨大的 “视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

包括：
- state，驱动应用的数据源；
- view，以声明方式将 state 映射到视图；
- actions，响应在 view 上的用户输入导致的状态变化。

 
# 使用

在一个模块化的打包系统中，必须显式地通过 `Vue.use()` 来调用 `Vuex`：

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

当使用全局 `script` 标签引用 `Vuex` 时，不需要以上安装过程。

# 基本概念
## store

> `store` 基本上就是一个容器，它包含着应用中大部分的 state

- state
通过 `store.state` 来获取状态对象

- mutation
 
通过 `store.commit` 方法触发状态变更

> 改变 `store` 中的状态的唯一途径就是显式地提交 (commit) `mutationS`

## state

1 在组件中获得 `vuex` 状态

> 由于 `Vuex` 的状态存储是响应式的，从 `store` 实例中读取状态最简单的方法就是在计算属性中返回某个状态
> 然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。

如：
```html
<div id="app">
    <p>{{count}}
        <button @click="inc">+</button>
        <button @click="dec">-</button>
        <container></container>
    </p>
</div>
<script>
    const store = new Vuex.Store({
        state: {
            count: 0
        },
        mutations: {
            inc(state) {
                state.count++
            },
            dec: state => state.count--
        }
    });


    var Counter = {
        template: `<div> {{count}} </div>`,
        computed: {
            count() {
                return store.state.count
            }
        }
    };


    const app = new Vue({
        el: '#app',
        computed: {
            count() {
                return store.state.count
            }
        },
        methods: {
            inc() {
                store.commit('inc')
            },
            dec() {
                store.commit('dec')
            }
        },
        components: {
            container: Counter
        }
    })
</script>
```
> Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到


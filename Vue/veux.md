# 1 目标
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

 
# 2 使用

在一个模块化的打包系统中，必须显式地通过 `Vue.use()` 来调用 `Vuex`：

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

当使用全局 `script` 标签引用 `Vuex` 时，不需要以上安装过程。

# 3 基本概念
## 3.1 store

> `store` 基本上就是一个容器，它包含着应用中大部分的 state

- state
通过 `store.state` 来获取状态对象

- mutation
 
通过 `store.commit` 方法触发状态变更

> 改变 `store` 中的状态的唯一途径就是显式地提交 (commit) `mutations`

## 3.2 state

### 组件中获取 `vuex` 状态

#### 1 `computed`属性返回状态
> 由于 `Vuex` 的状态存储是响应式的，从 `store` 实例中读取状态最简单的方法就是在计算属性中返回某个状态

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

> 然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。


#### 2 将状态从根组件注入到每一个子组件

```javascript
//  单独构建需要 Vue.use(Vuex)

// 注入
new Vue({
    el: '#app',
    // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    store,
    components: {},
    ......


// 使用
var Counter = {
    template: `<div> {{count}} </div>`,
    computed: {
        count() {
            return store.state.count
        }
    }
};
```

> Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到


##### 单独构建
有 `vue.js`  `vuex.js`, `html`中引入，然后 `Vue.use(Vuex)`:


#### 3 `mapState`
当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余，`mapState` 帮助生成计算属性，防止多次声明计算属性

> 如果有些状态严格属于单个组件，最好还是作为组件的局部状态

## 3.3 getter

## 3.4 mutation
**mutation 都是同步事务**
> 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
> 要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法


### Payload
可以向 `store.commit` 传入额外的参数，即 mutation 的 载荷（payload）
```javascript
// mutation中
inc(state, n) {
    state.count += n
}
// 提交
inc() {
store.commit('inc',10)
},
```

或者最好用对象放payload
```javascript
// mutation中
inc(state, payload) {
    state.count += payload.step;
},
// 提交
inc() {
store.commit('inc',{
        step:10
    })
},
```

或者直接用 `type` 指定类型，用对象方式提交
```javascript
store.commit({
    type:'inc', 
    step:10
})
```

**注意**：
1. 最好提前在你的 store 中初始化好所有所需属性
2. 在对象上添加新属性
`Vue.set(obj, 'newProp', 123)`
或者用新对象替换老对象
`state.obj = { ...state.obj, newProp: 123 }`

3. 可以使用常量替代 `Mutation` 事件类型
4.  `mutation` 必须是同步函数,任何在回调函数中进行的状态的改变都是不可追踪的。

### 组件提交 Mutation
组件中使用 `this.$store.commit('xxx')` 提交 mutation


## 3.5 action

**`Action` 提交的是 `mutation，而不是直接变更状态。`**
**`Action` 可以包含任意异步操作**














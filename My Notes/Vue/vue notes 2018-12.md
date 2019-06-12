# watch 和 computed

## computed

自动计算一段复杂逻辑并返回结果

同时，也可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。不同的是

**计算属性是基于它们的依赖进行缓存的**

其中的 `this` 指向 `vm` 实例，所以可以直接在 `computed` 中 `this.xxx` 来调用 `data` 中的属性

计算属性默认只有 **`getter`** ，不过在需要时你也可以提供一个 setter
 
```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

## watch

有一些数据需要随着其它数据变动而变动时，可以用 `watch`，最好用在 **需要在数据变化时执行异步或开销较大的操作**

# 生命周期钩子

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

> 生命周期钩子上不要使用箭头函数，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())` 因为箭头函数是和父级上下文绑定在一起的，`this` 不会是如你所预期的 `Vue` 实例

# Event

有时候要访问原始 DOM 事件，用 `$event` 传进去

```javascript
```

## `Modifiers`

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`
- `.lazy`
- `.number`
- `.trim`
- `.native`
- `.sync`

## 自定义事件

v-on 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 v-on:myEvent 将会变成 v-on:myevent——导致 myEvent 不可能被监听到

### 自定义组件的 `v-model`

> `v-model` 默认会利用名为 `value` 的 `prop` 和名为 `input` 的事件

可以用 `model` 选项自定义 `value` 特性的值：

```jsx
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
// 使用
<base-checkbox v-model="lovingVue"></base-checkbox>
```

### 原生事件绑定到组件

`$listeners`

## 全局方法

- `$emit(name, param)`

# Component

**组件直接在 `DOM` 中使用时，组件名最好遵循 `W3C规格`，即用 `短横线连接` **

全局注册

```javascript
Vue.component("tag-name", {
  // ... options ...
});
```

**全局注册完，就可以通过 `<tag-name><tag-name/>` 的形式引用此组件**
局部注册

```javascript
var ComponentA = {
  /* ... */
};
var ComponentB = {
  /* ... */
};

new Vue({
  el: "#app",
  components: {
    "component-a": ComponentA,
    "component-b": ComponentB
  }
});
```

**局部注册的组件只能挂载到执行注册的 Vue 实例内部的 `components` 属性上**

## Template

模版先声明，再注册，再到组件中使用：

```vue
<div id="app">
  <test-component></test-component>
</div>

<template id="testTemplate"></template>

Vue.component('test-component',{ template: '#testTemplate' })
```

还有这个，没想到吧。。

```
<script type="text/x-template" id="myComponent">
    <div>This is a component</div>
</script>

Vue.component('my-component',{
    template: '#myComponent'
})
```

## 通信

### Sub -> Sup

父组件通过 `props` 给实例子组件传值：

```javascript
Vue.component('blog-post', {
  //props:['title'],
  props: {
    title: String,
  }
  template: '<h3>{{ title }}</h3>'
})

<blog-post title="My journey with Vue"></blog-post>
```

也可以 `:bind`来动态传：

```javascript
<blog-post v-bind:title="post.title" />
```

**父级 prop 的更新会向下流动到子组件中 —— 单向数据流**

### Sup -> Sub

在子组件中`$emit(method)`,然后在调用此组件的位置上（父组件上）使用 `v-on:fromSub='supHandle'` 监听这个事件

也可以 `$emit(method, value)` 来带一个值过去，然后再用 `$event`取到

如果是通过一个方法传过去，那么这个值会被 **作为第一个参数传入这个方法**

父

```js
<component :sonValueName = "fatherName" @evtName = "doSth"></component>
export default ={
    data(){
        fatherName:{
            prop1:xxx,
            prop2:xxx,
        },
    }
    methods:{
        doSth(){},
    }
}
```

子

```js
//component 组件定义处：
export default = {
    data(){
        return{
            props:xxx,
        }
    },
    props: ["sonValueName"],
    methods:xxx(e){
        this.$emit("evtName", e.target.value);
    }
}
```
## 组件中使用 `v-model`

```js
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})


<custom-input v-model="searchText"></custom-input>
```


## Slot

## `is`特性

使用 is 特性来切换不同的组件

```javascript
<component v-bind:is="currentTabComponent" />
```

## `<keep-alive>`

```javascript
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

# Animation&Transition

## 元素过渡

用 `<transition></transition>`包裹起来的元素会被过渡处理

进入/离开的过渡中，会有 6 个 class 切换：

- `v-enter`
- `v-enter-active`
- `v-enter-to`
- `v-leave`
- `v-leave-active`
- `v-leave-to`

> 对于这些在过渡中切换的类名来说，如果你使用一个没有名字的`<transition>`，则 `v-` 是这些类名的默认前缀。如果你使用了 `<transition name="box">`，那么 `v-enter` 会替换为 `box-enter`

即，CSS 样式类名要写成：

```css
.box-enter {
  transition: all 0.3s ease;
}
```

比如常见的一个过渡：

```css
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter,
.modal-leave {
  opacity: 0;
}
```

要用第三方 CSS 动画库时，类名可以用这些特性来改：

- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class

比如：

```javascript
<transition
  name="custom-classes-transition"
  enter-active-class="animated tada"
  leave-active-class="animated bounceOutRight"
>
```

### 列表过渡

`<transition-group>` 组件

这个时候

- 过渡模式不可用，因为我们不再相互切换特有的元素
- 内部元素 **总是需要** 提供唯一的 `key` 属性值

### 排序过渡

因为位置突变，可以使用 `v-move` 特性，在元素的改变定位的过程中应用过渡，CSS 类名同上面 `name` 设置：

> 这里官方 demo 上面根本没见 `v-move` 特性。。。。。

### 过渡模式

因为 `<transition>` 的默认行为 - 进入和离开同时发生

- `in-out`：新元素先进行过渡，完成之后当前元素过渡离开
- `out-in`：当前元素先进行过渡，完成之后新元素过渡进入

```javascript
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```

### 多组件过渡

显式的使用 `key`或者动态组件：

```javascript
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
new Vue({
  el: '#transition-components-demo',
  data: {
    view: 'v-a'
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  }
})
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
```

### 其他特性

- `appear`:通过 `appear` 特性设置节点在初始渲染的过渡
- `type`

**同时使用过渡和动画时，可以使用 `type` 特性并设置 `animation` 或 `transition` 来明确声明你需要 Vue 监听的类型**

- `:duration`

```javascript
<transition :duration="1000">...</transition>
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

### Hook

```javascript
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

https://cn.vuejs.org/v2/guide/transitions.html

## 数据状态过渡

比如：

- 数字和运算
- 颜色的显示
- SVG 节点的位置
- 元素的大小和其他的属性

通过 `watch` 侦听器来监听任何数值属性的更新：

```javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>

<div id="animated-number-demo">
  <input v-model.number="number" type="number" step="20">
  <p>{{ animatedNumber }}</p>
</div>

new Vue({
  el: '#animated-number-demo',
  data: {
    number: 0,
    tweenedNumber: 0
  },
  computed: {
    animatedNumber: function() {
      return this.tweenedNumber.toFixed(0);
    }
  },
  watch: {
    number: function(newValue) {
      TweenLite.to(this.$data, 0.5, { tweenedNumber: newValue });
    }
  }
})
```

# Other

## 响应式规则

`data` 上的值，都可以直接通过 `this.xxx` 取到

要注意的是，最好提前初始化好所有所需属性，当需要在对象上新添加属性时，应该：
`Vue.set(obj, 'newProp', 123)`

或者用 `...` 扩展运算符来复制到一个新对象：

```javascript
state.obj = { ...state.obj, newProp: 123 };
```

> 所有的 DOM 操作都由 Vue 来处理，你编写的代码只需要关注逻辑层面即可

> 当一个 `Vue` 实例被创建时，`data`中的属性被注入到 `Vue`的响应式系统，但是只有当实例被创建时 `data` 中存在的属性才是响应式的

## 一些 `Directives`

- `v-html`
- `v-model`
- `v-show` : 切换元素的 `display`,带有 `v-show` 的元素**始终会被渲染并保留在 `DOM` 中**
- `v-if` : 真正的条件渲染,会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
- `v-else-if`
- `v-else`
- `v-once`
- `v-for`
- `v-move`

* `key` 来使元素不被复用

### 简写

- `v-bind:key="value"` => `:key="value"`
- `v-on:event="method"` => `@event="method"`

## `v-model`

> `v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` 特性的初始值而总是将 `Vue` 实例的数据作为数据来源。你应该通过 `JavaScript` 在组件的 `data` 选项中声明初始值。

其实

```javascript
<input v-model="searchText">
// 等价于：

<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

**需要注意的：**

> `v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` 特性的初始值而总是将 `Vue` 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。

### 怎么用

- `radio` 绑到一个变量（字符串类型）
  - 多选一
    每一项设置 `value`，然后绑定到同一个变量（字符串类型）
- `checkbox` 同上，但也可以设一个 `boolean`
  - 多选一
  ```javascript
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
    <label for="mike">Mike</label>
  ```
- `selected`
  还是绑到一个字符变量，然后要设置默认值，就给对应的 option `v-bind:value=''`
- `selected` 多选
  多选的话还是绑定的数组

### 自定义输入组件

`v-model`原本算是个银弹：

```javascript
<input v-model="searchText">
// 就是
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

因此，在自定义组件时，`v-model`就是这样子：

```javascript
<custom-input v-bind:value="searchText" v-on:input="searchText = $event" />
```

想一下，想让它正常工作，就要处理 `value` 这个 prop 还有把原生的 `input` 事件搞出来，于是需要：

- 将其 value 特性绑定到一个名叫 value 的 prop 上
- 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出

处理一下：

```javascript
<custom-input v-model="searchText" />;

Vue.component("custom-input", {
  props: ["value"],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
});
```

## `v-for`

1. 对于数组的以下不能直接检测到

   - 利用索引直接设置一个项时，如：`vm.items[indexOfItem] = newValue`
   - 当你修改数组的长度时，如：`vm.items.length = newLength`

   这样子解决： `Vue.set(vm.items, indexOfItem, newValue)` 或 `vm.$set(vm.items, indexOfItem, newValue)`

   第二个可以 `vm.items.splice(newLength)`

2. 不能检测对象属性的添加或删除
   可以使用 `Vue.set(object, key, value)` 方法向嵌套对象添加响应式属性

可以直接给 `v-for` 要遍历出来的对象加一个方法（或者计算属性）：

```javascript
<li v-for="n in even(numbers)">{{ n }}</li>
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

## nextTick

# 踩坑

## `<transition>`不出来

尝试调整 `<transition>` 的位置，比如之前这样子就不行：

```javascript
<template>
  <transition>
    <div class="modal-root" />
  </transition>
</template>
```

调整成了这样子就 OK 了：

```javascript
<template>
  <div class="root">
    <transition name="modal">
      <div
        v-show="modalShow"
        id="modalbg"
      >
        <div
          v-show="tipShow"
          class="tips"
        >
......
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
```

## `v-show/if` 的 `opacity`动画

退出动画不出现元素直接消失，css 里面要用 `-leave-to` 而不是 `-leave`

# VueRouter
`vue-router` 默认 `hash` 模式 —— 使用 `URL` 的 `hash` 来模拟一个完整的 `URL` ，于是当 `URL` 改变时，页面不会重新加载。

 history 模式:利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面
## use

1. 添加 `vuerouter`
2. 将组件 (components) 映射到路由 (routes)
3. 告诉 Vue Router 在哪里渲染它们

```javascript
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Tab1 = { template: "<div>foo</div>" };
const Tab2 = { template: "<div>bar</div>" };

const routes = [
  { path: "/foo", component: Tab1 },
  { path: "/bar", component: Tab2 }
];

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});

...
<router-link to="/foo">Tab1</router-link>
<router-link to="/bar">Tab2</router-link>


<router-view></router-view>
...
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Test)
})
```
通过注入路由器，可以在任何组件内通过 `this.$router` 访问路由器，也可以通过 `this.$route` 访问当前路由


## 嵌套
注意的是 `router-link` 中的 `to` 的路径要写全：
```javascript
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <p>
    <router-link to="/user/foo">/user/foo</router-link>
    <router-link to="/user/xxx/profile">/user/xxx/profile</router-link>
    <router-link to="/user/xxx/posts">/user/xxx/posts</router-link>
  </p>
  <router-view></router-view>
</div>
--------------------------------
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

const UserHome = { template: '<div>Home</div>' }
const UserProfile = { template: '<div>Profile</div>' }
const UserPosts = { template: '<div>Posts</div>' }

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        { path: '', component: UserHome },
				
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        { path: 'profile', component: UserProfile },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        { path: 'posts', component: UserPosts }
      ]
    }
  ]
})

const app = new Vue({ router }).$mount('#app')
```


## router hooks
全局的, 单个路由独享的, 或者组件级的。


**参数或查询的改变并不会触发进入/离开的导航守卫。可以通过观察 `$route` 对象来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫**




- 全局前置守卫： `router.beforeEach`
- 全局解析守卫：`router.beforeResolve` 
  导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
- 全局后置钩子：`router.afterEach((to, from) => {})`
- 路由内独享守卫：` beforeEnter (to, from, next)`
  
```javascript
router.beforeEach((to, from, next) => {
  if (!to.name) {
    console.log('void router')
    return false;
  }
  next();
})
```

单个路由的


- afterEach


组件内
- beforeRouteEnter
- beforeRouteUpdate
- beforeRouteLeave


`beforeRouteEnter` 守卫不能访问 `this`，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。

可以通过传一个回调给 `next` 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
```javascript
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

`beforeRouteUpdate` 和 `beforeRouteLeave` 可以直接用 `this` 已经可用了

全局前置守卫：
```javascript
router.beforeEach((to, from, next) => {
  // ...
})
```
next:
- next()
- next(false)
- next('/')
- next(error)

**守卫是异步解析执行**，此时导航在所有守卫 `resolve` 完之前一直处于 等待中。

**确保要调用 `next` 方法，否则钩子就不会被 `resolved`**

禁止用户在还未保存修改前突然离开可以通过 `next(false)` 来取消

或者给传一个 `return false`

https://router.vuejs.org/zh/guide/advanced/navigation-guards


## router object

- router.beforeEach
- router.beforeResolve
- router.afterEach
- router.push 向 history 栈添加一个新的记录
- router.replace 不会向 history 添加新记录，替换掉当前的 history 记录
- router.go
- router.back
- router.forward




```bash
[fullPath: "/users"
hash: ""
matched: [{…}]
meta: {}
name: "users"
params: {}
path: "/users"
query: {}]
```


## 命名视图
不想嵌套而是同级展示时，就可以给 `router-view` 命名：
`<router-view class="view three" name="b"></router-view>`

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件

同样可以继续嵌套


## 重定向 别名

重定向：当用户访问 `/a` 时，`URL` 将会被替换成 `/b` ，然后匹配路由为 `/b` 

别名: `/a` 的别名是 `/b` ，意味着，当用户访问 `/b` 时，`URL` 会保持为 `/b` ，但是路由匹配则为 `/a` ，就像用户访问 `/a` 一样

> “别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。


## 组件模式传参
```javascript
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

## 数据获取

当然导航完成前，或者导航完成后获取数据都是可以的

https://router.vuejs.org/zh/guide/advanced/data-fetching

# MVC MVVM

> MVC，MVP 和 MVVM 都是常见的软件架构设计模式（Architectural Pattern），它通过分离关注点来改进代码的组织方式。不同于设计模式（Design Pattern），只是为了解决一类问题而总结出的抽象方法，一种架构模式往往使用了多种设计模式。

`Model` 层用于封装和应用程序的业务逻辑相关的数据以及对数据的处理方法

控制器 `Controller` ：需要响应用户的操作、同步更新 `View` 和 `Model` ，定义用户界面对用户输入的响应方式，连接模型和视图，控制应用程序的流程，处理用户的行为和数据上的改变

`MVC` 模式的业务逻辑主要集中在 `Controller`

# lodash 引入及其优化

1. 全量引入

- 插入到 vue 中：
```javascript
import _ from './helpers.js'
Object.defineProperty(Vue.prototype, '$_', { value: _ });
```
**暂时有问题，不能生效**

2. 按需加载

`npm i babel-plugin-lodash lodash-webpack-plugin -D`

配置 .babelrc 文件

```javascript
"plugins": [
  "lodash"
]
```

https://juejin.im/post/5cd4d991e51d453a4a357e69#heading-12

3. 按需制作自己的 `utiles` 库

`helpers.js`:
```javascript
import _ from "lodash";
export default {
  cloneDeep: _.cloneDeep,
  debounce: _.debounce,
  throttle: _.throttle,
  size: _.size,
  pick: _.pick,
  isEmpty: _.isEmpty
};

```


`component.js`

```javascript
import _ from "lodash";

...
methods: {
    inputToEmit:_.throttle(function(e) {
        this.$emit("sendInput", e.target.value);
        console.log(e.target.value);
      }, 500),
  }
};
```

他们内部已经 apply 了函数的 context，所以对于箭头函数来说，它的 context 是 window，对于匿名函数来说，它的 context 是调用时的 context。

# 优化

https://juejin.im/post/5b7f7d886fb9a01a1e0203cb

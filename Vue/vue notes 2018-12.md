# watch 和 computed

## computed
自动计算一段复杂逻辑并返回结果

同时，也可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。不同的是

**计算属性是基于它们的依赖进行缓存的**

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


# 父子组件传值
==烦得很==
父
```js
<component v-bind:sonValueName = "fatherName" @reciveEvt = "doSth"></component>
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
export default = {
    data(){
        return{
            props:xxx,
        }
    },
    props: ["sonValueName"],
    methods:xxx(){
        this.$emit("evtName", this.props);
    }
}
```

# 生命周期钩子


- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed


> 生命周期钩子上不要使用箭头函数，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())` 因为箭头函数是和父级上下文绑定在一起的，this 不会是如你所预期的 Vue 实例


# Event
有时候要访问原始DOM事件，用 `$event` 传进去
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


# Component
**组件直接在 `DOM`中使用时，组件名最好遵循 `W3C规格`，即是用 `短横线连接` **


全局注册
```javascript
Vue.component('my-component-name', {
  // ... options ...
})
```

局部注册
```javascript
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }

new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```


## 通信
### Sub -> Sup
父组件通过 `props` 给实例子组件传值：
```javascript
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})

<blog-post title="My journey with Vue"></blog-post>
```

也可以 `:bind`来动态传：
```javascript
<blog-post v-bind:title="post.title"></blog-post>
```

**父级 prop 的更新会向下流动到子组件中 —— 单向数据流**

### Sup -> Sub
在子组件中`$.emit(method)`,然后在父组件上监听这个事件

也可以 `$.emit(method, value)` 来带一个值过去，然后再用 `$.event`取到，而这个值会被 **作为第一个参数传入这个方法**

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
<component v-bind:is="currentTabComponent"></component>
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

> 对于这些在过渡中切换的类名来说，如果你使用一个没有名字的` <transition>`，则 `v-` 是这些类名的默认前缀。如果你使用了 `<transition name="box">`，那么 `v-enter` 会替换为 `box-enter`

即，CSS 样式类名要写成：
```css
.box-enter{
 transition: all .3s ease;
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


要用第三方CSS动画库时，类名可以用这些特性来改：
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
因为位置突变，可以使用 `v-move`  特性，在元素的改变定位的过程中应用过渡，CSS类名同上面 `name` 设置：

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
要注意的是，最好提前初始化好所有所需属性，当需要在对象上新添加属性时，应该：
`Vue.set(obj, 'newProp', 123)`

或者用 `...` 扩展运算符来复制到一个新对象：
```javascript
state.obj = { ...state.obj, newProp: 123 }
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


- `key` 来使元素不被复用

### 简写
- `v-bind:key="value"`  => `:key="value"`
- `v-on:event="method"`  => `@event="method"`



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
   <div class='modal-root'>
   </div>
  </transition>
</template>
```

调整成了这样子就OK了：
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
退出动画不出现元素直接消失，css里面要用 `-leave-to` 而不是 `-leave`
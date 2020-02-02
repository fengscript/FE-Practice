

## style的scoped属性

https://www.jb51.net/article/129228.htm
> 总结一下scoped三条渲染规则
>
> 1. 给HTML的DOM节点加一个不重复data属性(形如：data-v-2311c06a)来表示他的唯一性
> 2. 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如[data-v-2311c06a]）来私有化样式
> 3. 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性
> 

---

> 使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响 



在 `from ` 放一个 `button` 元素点击会直接刷新页面，给 `button` 加一个  `type="button"` 即可



`Vue` 或者 `Vuex` 中对对象操作时，为了避开 Vue 不能检测到属性被删除的限制，保持对象的响应式， 需要 [Vue.set( target, key, value )](https://cn.vuejs.org/v2/api/#Vue-set)和 [Vue.delete( target, key )](https://cn.vuejs.org/v2/api/#Vue-delete)



## `vue-router` 

默认 `hash` 模式：使用 `URL` 的 `hash` 来模拟一个完整的 `URL` ，于是当 `URL` 改变时，页面不会重新加载。

 history 模式：利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面



# Base

要用

```js
const UserDetail1 = {
  template: `<h3>I'm details info 1</h3>`
};
```

若报错，需要手动建立一个文件： `vue.config.js` :

```json
module.exports = {
    runtimeCompiler: true
  }
```





## 响应式原理

Observer  dep watcher

使用 `bject.defineProperty` 做到对数据的监听， `Vue`中用`Observer`类来管理响应式`Object.defineProperty`的过程，通过重写对象属性的 `get` `set` 来实现对数据的响应式双向绑定



一个属性可能有多个依赖，每个响应式数据都有一个`Dep`来收集、管理它的依赖，记录了所有依赖于这个属性的 `Vue` 组件



数据有变化，再去通知 `view` 刷新，`Dep`就是收集要通知到哪里的，只收集要被渲染到页面的数据



`Watcher`类似中介，一个数据变化，就通知这个数据的中介，他们就去执行各自需要做的变化，即执行 `view` 的刷新

每一个 Vue 实例来说都有一个 `Watcher` 与之对应



`Observer`中进行响应式的绑定，在数据被读的时候，触发`get`方法，执行`Dep`来收集依赖，也就是收集`Watcher` ，在数据被改的时候，触发`set`方法，通过对应的所有依赖(`Watcher`)，去执行更新。比如`watch`和`computed`就执行开发者自定义的回调方法。



做 `setter` 操作时，会先判断赋的新值是否是一个对象，如果是对象的话会再次进行劫持，并添加观察者



一个 `Proxy`配合 `Reflect`  例子:

```js
let data = { a: 1 }

let vm = new Proxy(data, {
  get: function(target, key, receiver) {
    console.log('get')
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, value, receiver) {
    console.log('set')
    return Reflect.set(target, key, value, receiver);
  }
})
```





不能检测到对象属性的添加或删除，但是我们可以提前在 `data` 中声明好会用到的属性，这样子就会被监测

> Vue 不支持通过索引设置数组成员。对于这一点，其实直接通过下标来对数组进行劫持，是可以做到的

但是有性能问题



# vuex 中拉取数据后给view

因为拉取数据一般是异步，所以怎么在 view 里面
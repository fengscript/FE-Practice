

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



`vue-router` 

默认 `hash` 模式：使用 `URL` 的 `hash` 来模拟一个完整的 `URL` ，于是当 `URL` 改变时，页面不会重新加载。

 history 模式：利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面
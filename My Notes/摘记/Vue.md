
# 浅谈vue中慎用style的scoped属性
https://www.jb51.net/article/129228.htm
> 总结一下scoped三条渲染规则
>
> 1. 给HTML的DOM节点加一个不重复data属性(形如：data-v-2311c06a)来表示他的唯一性
> 2. 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如[data-v-2311c06a]）来私有化样式
> 3. 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性
> 

---

> 使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响 
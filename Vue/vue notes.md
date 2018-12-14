# watch 和 computed

## computed
自动计算一段复杂逻辑并返回结果


同时，也可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。不同的是

**计算属性是基于它们的依赖进行缓存的**


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

- create
- mounted
- updated
- destroyed


> 生命周期钩子上不要使用箭头函数，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())` 因为箭头函数是和父级上下文绑定在一起的，this 不会是如你所预期的 Vue 实例


# Other

> 所有的 DOM 操作都由 Vue 来处理，你编写的代码只需要关注逻辑层面即可

> 当一个 `Vue` 实例被创建时，`data`中的属性被注入到 `Vue`的响应式系统，但是只有当实例被创建时 `data` 中存在的属性才是响应式的
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




# 高性能 javascript
来自于：[http://div.io/topic/2067](http://div.io/topic/2067)

2018/1/20

## 1 内存泄漏
> 由于疏忽或错误造成程序未能释放已经不再使用的内存。

### 意外的全局变量
对于未声明变量，js会在全局对象上创建该变量的引用（可以 delete 掉）

如果未声明的变量缓存大量的数据，会导致这些数据只有在窗口关闭或重新刷新页面时才能被释放。这样会造成意外的内存泄漏。

1. 意外的全局变量
2. 错误的 this 创建了全局变量

如：
```javascript
function foo(arg) {
    bar = "this is a hidden global variable with a large of data";
}


function foo() {
    this.variable = "potential accidental global";
}

// 当在全局作用域中调用foo函数，此时this指向的是全局对象(window)，而不是'undefined'
foo();
```
**解决方式**
1. "use strict"
2. 使用全局变量时，显式声明：
```javascript
window.prop = "my prop"
```
3. 临时存储大量数据的全局变量，在处理完这些数据后将其设置为 null 或重新赋值

### console.log()
在传递给 `console.log` 的对象是不能被垃圾回收，因为在代码运行之后需要在开发工具能查看对象信息

发布时却忘记去掉 `console.log` 语句，这可能造成内存泄露。


### closure
> 由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。过度使用闭包可能会导致内存占用过多。

> 在相同作用域内创建的多个内部函数对象是共享同一个变量对象[variable object](http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/)。如果创建的内部函数没有被其他对象引用，不管内部函数是否引用外部函数的变量和函数，在外部函数执行完，对应变量对象便会被销毁。反之，如果内部函数中存在有对外部函数变量或函数的访问（可以不是被引用的内部函数），并且存在某个或多个内部函数被其他对象引用，那么就会形成闭包，外部函数的变量对象就会存在于闭包函数的作用域链中。这样确保了闭包函数有权访问外部函数的所有变量和函数

**只要去掉闭包对外部变量或者函数的引用，这样子就会自动回收内存**

### Dom 泄露

> JavaScript/ECMAScript引擎独立于渲染引擎，而DOM是位于渲染引擎，相互访问需要消耗一定的资源

> 为了减少DOM访问次数，一般情况下，当需要多次访问同一个DOM方法或属性时，会将DOM引用缓存到一个局部变量中。但如果在执行某些删除、更新操作后，可能会忘记释放掉代码中对应的DOM引用，这样会造成DOM内存泄露。
如
```javascript
var wrapper = document.querySelector('.wrapper');

document.querySelector('.remove').addEventListener('click', function () {
    document.querySelector('.container').removeChild(wrapper);
    wrapper = null;//在执行删除操作时，将wrapper对pre节点的引用释放掉
}, false);

```

**即，若使用了引用来缓存元素。则在 `remove` 掉元素以后，还需要手动解除对元素的引用**

### timers
没有 clear 的定时器会一直占用系统资源

### EventListener

> 做移动开发时，需要对不同设备尺寸做适配。如在开发组件时，有时需要考虑处理横竖屏适配问题。一般做法，在横竖屏发生变化时，需要将组件销毁后再重新生成。而在组件中会对其进行相关事件绑定，如果在销毁组件时，没有将组件的事件解绑，在横竖屏发生变化时，就会不断地对组件进行事件绑定。这样会导致一些异常，甚至可能会导致页面崩掉。

针对于命名函数，同一个元素节点注册了多个相同的EventListener，重复的实例会被抛弃，不会让EventListener被重复调用。

而匿名函数，浏览器会将其看做不同的EventListener，在需要销毁事件绑定时，没有调用所解绑方法，就可能造成事件绑定数量的不断增加，不断占据资源
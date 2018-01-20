# 高性能 javascript
来自于：[http://div.io/topic/2067](http://div.io/topic/2067)

2018/1/20

## 1 内存泄漏
> 由于疏忽或错误造成程序未能释放已经不再使用的内存。

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





















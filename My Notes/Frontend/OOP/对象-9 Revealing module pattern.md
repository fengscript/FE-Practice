将私有 共有变量、方法全部在 IIFE 中定义，但是将共有方法在返回对象中公布
```JS

var Module = (function() {
    // 现在所有函数直接互访
    var privateFunc = function() {
        privateFunc();
    };
   
    var publicFunc1 = function() {
        publicFunc1();
    };
   
    var publicFunc2 = function() {
        publicFunc2();
    };
   
    // 返回对象赋予Module
    return {
        publicFunc1: publicFunc1,
        publicFunc2: publicFunc2
    };
}());
```

这样子
- 所有函数的声明和实现都在同一个地方，从而制造较少的混乱。
- 私有函数现在可以访问公开函数，如果他们需要。
- 当一个公开函数需要调用另一个公开函数时，他们调用publicFunc2()，而不是用this.publicFunc2()，从而节省了几个字符。


**注意，自执行闭包的内部的 this 会指向全局**

即
```JS

var Module = (function() {
    this.prop = "props"
    // prop被加到了 window 上
}());
```
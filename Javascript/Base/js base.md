# H5新标签
- <article>
- <aside>
- <audio>
- <canvas>
- <command>
- <datalist>
- <details>
- <embed>
- <figcaption>
- <figure>
- <footer>
- <header>
- <hgroup> 
- <keygen> 
- <mark>
- <nav> 
- <output> 
- <progress> 
- <section> 
- <source> 
- <summary>
- <time> 
- <video>

# 闭包

简单来说，就是在一个函数内创建另外一个函数，于是函数的作用域链中就保持一个它本身在被定义的词法作用域的完整引用，于是它随时可以访问被定义的作用域中所有的变量和方法，这就形成了闭包。

# prototype
每个函数都有一个 `prototype` 属性（是一个指针），指向一个包含了想让实例共享的所有方法和属性的对象。

每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针（constructor），每个实例都包含一个指向原型对象的内部指针（_proto_）

实例属性会屏蔽原型属性
# 原型链
让原型对象指向另一个类型的实例，此时的原型对象就包含一个指向另一个原型的指针

# this
this 对象是运行时基于函数的执行环境绑定的

# new
经过4个步骤
1. 创建一个全新对象
2. 将新对象的内部 `[prototype]`,即 `_proto_` 链接到源对象
3. 这个新对象绑定到函数调用的 `this`
4. 如果函数没有返回其他对象，那么 new 调用的函数返回这个新对象

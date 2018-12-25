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

# Js
## 高阶函数
1. 函数作为参数传递
2. 函数作为值返回

### 应用
1. 柯里化
   接受一些参数不会立即求值而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中保存，直到函数被真正需要求值的时候，之前传入的参数会被一次性全部求值

## 函数节流
控制函数被短时间频繁调用的问题，比如 `window.onresize`、`mousemove`

## 闭包

简单来说，就是在一个函数内创建另外一个函数，于是函数的作用域链中就保持一个它本身在被定义的词法作用域的完整引用，于是它随时可以访问被定义的作用域中所有的变量和方法，这就形成了闭包。

## prototype
每个函数都有一个 `prototype` 属性（是一个指针），指向一个包含了想让实例共享的所有方法和属性的对象。

每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针（constructor），每个实例都包含一个指向其构造函数的原型对象的内部指针（_proto_）

实例属性会屏蔽原型属性
## 原型链
让原型对象指向另一个类型的实例，此时的原型对象就包含一个指向另一个原型的指针

## this
this 对象是运行时基于函数的执行环境绑定的

## new
经过4个步骤
1. 创建一个全新对象
2. 将新对象的内部 `[prototype]`,即 `_proto_` 链接到源对象
3. 这个新对象绑定到函数调用的 `this`
4. 如果函数没有返回其他对象，那么 new 调用的函数返回这个新对象


## 继承

## ES6
### 块作用域
1. ES6有块级作用域，内部声明的函数不会影响到作用域的外部：ES5 因为函数提升，无论是否进入if，因为函数提升，函数声明都会被提升到当前作用域的顶部而可能覆盖外部同名函数（除非声明严格模式则会报错）



2. `let`声明的变量，只在`let`所在的 代码块 内有效，为Js添加了 块级作用

- 不存在变量提升
- 不允许重复声明
- 不再需要 IIFE

### 类
`class` 定义一个类 `extends`实现继承

首先用`class`定义了一个“类”，可以看到里面有一个`constructor`方法，这就是构造方法，而`this`关键字则代表实例对象。简单地说，`constructor`内定义的方法和属性是实例对象自己的，而`constructor`外定义的方法和属性则是所有实例对象可以共享的。

Class之间可以通过`extends`关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

`super`关键字，它指代父类的实例（即父类的this对象）。子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类没有自己的`this`对象，而是继承父类的`this`对象，然后对其进行加工。如果不调用`super`方法，子类就得不到`this`对象。

ES6的继承机制，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。

### 剩余参数
哈哈，一个很有意思的问题，剩余参数跟 `arguments` 有什么区别？

- 剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参。
- arguments对象不是一个真正的数组，而剩余参数是真正的 Array实例，也就是说你能够在它上面直接使用所有的数组方法，比如 sort，map，forEach或pop。
- arguments对象还有一些附加的属性 （如callee属性）。

也可以被解构，于是就可以：
```javascript
function f(...[a, b, c]) {
  return a + b + c;
}
 
f(1)          // NaN (b and c are undefined)
f(1, 2, 3)    // 6
f(1, 2, 3, 4) // 6 (the fourth parameter is not destructured)
```


# HTTP协议
## GET和POST
`GET` 和 `POST` 本质上都是 `TCP` 链接

`GET` 产生一个 `TCP` 数据包； `POST` 产生两个 `TCP` 数据包。


对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；

而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。

其他：
- GET在浏览器回退时是无害的，而POST会再次提交请求。
- GET产生的URL地址可以被Bookmark，而POST不可以。
- GET请求会被浏览器主动cache，而POST不会，除非手动设置。
- GET请求只能进行url编码，而POST支持多种编码方式。
- GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
- GET请求在URL中传送的参数是有长度限制的，而POST么有。
- 对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
- GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
- GET参数通过URL传递，POST放在Request body中。

# ajAx原理
`XMRHttpRequest`对象


# Cookie
必须包含
其他选项包括：`expires`、`domain`、`path`、`secure`、`HttpOnly`

只有与创建了 `Cookie` 同级目录或者子目录的页面才可以访问 `Cookie`，如果要让其父级，或者父级的兄弟来访问，就需要设置 `path`，比如设置为 `path='/'` 来让其他目录可以访问


# Css
1. `position` 的所有值
- initial
- inherit
- unset
- static
- relative
- absolute 
- fixed 
- sticky

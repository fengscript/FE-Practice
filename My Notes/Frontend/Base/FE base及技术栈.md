# H5 新标签

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

箭头函数弃用了所有普通 this 绑定规则，取而代之的是用当前的词法作用域覆盖了 this 本来的值。

## 绑定丢失

1

```js
function foo(){
    console.log(this.a);
}

var obj = {
    a : 2，
    foo : foo　　　　
}

var bar = obj.foo;
var a = "happy new year";
bar ();//happy new yaer
```

2

```js
function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  fn();
}

var obj = {
  a: 2,
  foo: foo
};

var a = "hello world";

doFoo(obj.foo); //hello world
```

3

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
};
var a = "gril !";
setTimeout(obj.foo, 1000); //gril !
```

# Higher Function

## Throttle
或者 https://segmentfault.com/a/1190000014292298
参见 [随手记.md](My Notes\函数式\随手记.md)

```js
function throttle(fn, threshhold) {
  // 记录上次执行的时间
  var last;
  // 定时器
  var timer;
  // 默认间隔为 250ms
  threshhold || (threshhold = 250);
  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
  return function() {
    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this;
    var args = arguments;
    var now = +new Date();
    // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + threshhold) {
      clearTimeout(timer);
      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, threshhold);
      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
```

## debounce

```javascript
function debounce(fn, delay) {
  // 定时器，用来 setTimeout
  var timer;
  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function() {
    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this;
    var args = arguments;
    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer);
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}
```

## new

经过 4 个步骤

1. 创建一个全新对象
2. 将新对象的内部 `[prototype]`,即 `_proto_` 链接到源对象
3. 这个新对象绑定到函数调用的 `this`
4. 如果函数没有返回其他对象，那么 new 调用的函数返回这个新对象

## 继承

## ES6

- 模版字符串
- 箭头函数
- `let` `const`
- 函数默认参数
- 数组扩展 - `Array.isArray()`
- 对象扩展 - `Object.assign()` - `Object.is()`

### 块作用域

1. ES6 有块级作用域，内部声明的函数不会影响到作用域的外部：ES5 因为函数提升，无论是否进入 if，因为函数提升，函数声明都会被提升到当前作用域的顶部而可能覆盖外部同名函数（除非声明严格模式则会报错）

2) `let`声明的变量，只在`let`所在的 代码块 内有效，为 Js 添加了 块级作用

- 不存在变量提升
- 不允许重复声明
- 不再需要 IIFE

### 类

`class` 定义一个类 `extends`实现继承

首先用`class`定义了一个“类”，可以看到里面有一个`constructor`方法，这就是构造方法，而`this`关键字则代表实例对象。简单地说，`constructor`内定义的方法和属性是实例对象自己的，而`constructor`外定义的方法和属性则是所有实例对象可以共享的。

Class 之间可以通过`extends`关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

`super`关键字，它指代父类的实例（即父类的 this 对象）。子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类没有自己的`this`对象，而是继承父类的`this`对象，然后对其进行加工。如果不调用`super`方法，子类就得不到`this`对象。

ES6 的继承机制，实质是先创造父类的实例对象 this（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

### 剩余参数

哈哈，一个很有意思的问题，剩余参数跟 `arguments` 有什么区别？

- 剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参。
- arguments 对象不是一个真正的数组，而剩余参数是真正的 Array 实例，也就是说你能够在它上面直接使用所有的数组方法，比如 sort，map，forEach 或 pop。
- arguments 对象还有一些附加的属性 （如 callee 属性）。

也可以被解构，于是就可以：

```javascript
function f(...[a, b, c]) {
  return a + b + c;
}

f(1); // NaN (b and c are undefined)
f(1, 2, 3); // 6
f(1, 2, 3, 4); // 6 (the fourth parameter is not destructured)
```

# HTTP 协议

## GET 和 POST

`GET` 和 `POST` 本质上都是 `TCP` 链接

`GET` 产生一个 `TCP` 数据包； `POST` 产生两个 `TCP` 数据包。

对于 GET 方式的请求，浏览器会把 http header 和 data 一并发送出去，服务器响应 200（返回数据）；

而对于 POST，浏览器先发送 header，服务器响应 100 continue，浏览器再发送 data，服务器响应 200 ok（返回数据）。

其他：

- GET 在浏览器回退时是无害的，而 POST 会再次提交请求。
- GET 产生的 URL 地址可以被 Bookmark，而 POST 不可以。
- GET 请求会被浏览器主动 cache，而 POST 不会，除非手动设置。
- GET 请求只能进行 url 编码，而 POST 支持多种编码方式。
- GET 请求参数会被完整保留在浏览器历史记录里，而 POST 中的参数不会被保留。
- GET 请求在 URL 中传送的参数是有长度限制的，而 POST 么有。
- 对参数的数据类型，GET 只接受 ASCII 字符，而 POST 没有限制。
- GET 比 POST 更不安全，因为参数直接暴露在 URL 上，所以不能用来传递敏感信息。
- GET 参数通过 URL 传递，POST 放在 Request body 中。

# ajAx 原理

`XMRHttpRequest`对象

# Cookie

必须包含 key，value
其他选项包括：`expires`、`domain`、`path`、`secure`、`HttpOnly`

只有与创建了 `Cookie` 同级目录或者子目录的页面才可以访问 `Cookie`，如果要让其父级，或者父级的兄弟来访问，就需要设置 `path`，比如设置为 `path='/'` 来让其他目录可以访问

# Vue

## 双向绑定原理

通过`Object.defineProperty()`来实现数据劫持结合发布者-订阅者模式的方式来实现
`defineProperty` 来控制一个对象属性的一些特有操作，比如读写权、是否可以枚举，`set` 、 `get` 也是它的两个属性，通过重写 `set` 和`get`
比如

```js
var Book = {};
var name = "";
Object.defineProperty(Book, "name", {
  set: function(value) {
    name = value;
    console.log("你取了一个书名叫做" + value);
  },
  get: function() {
    return "《" + name + "》";
  }
});

Book.name = "vue权威指南";
//则在读取 name 属性时候会触发重写后的 set  get
console.log(Book.name);
```

一个双向绑定例如：

```js
var obj = {};
var bind = [];
//触发obj对象set和get方法的时候，趁机来输出或修改bind数组的内容
Object.defineProperty(obj, "observe", {
  set: function(val) {
    bind["observe"] = val;
  },
  get: function() {
    return bind["observe"];
  }
});
var demo = document.querySelector("#demo");
var display = document.querySelector("#display");
//#demo的value值与bind['observe']绑定，#display的innerHTML也与bind['observe']绑定。
demo.onkeyup = function() {
  obj["observe"] = demo.value; //触发了obj的set方法，等于#demo的value值赋值给bind['observe']。
  display.innerHTML = bind["observe"];
};
```



### 利用







## Router

hash 实现路由的时候，最本质的原理就是 hash 值的变化，会引发一个 hashchange 事件，可以根据这个 hash 值的变化，加载不同的 DOM

- hash 模式:

- history API

> 这里，我想到了 html 的锚点，即，从一个 `<a href='#name/id'>` 跳到页面一个 dom 上
> 有两种跳法，第一种是任意元素的 id 上，第二种是跳到另外一个 a 标签的 name 属性上去

# Css

##  position  的所有值

- initial
- inherit
- unset
- static
- relative
- absolute
- fixed
- sticky

##  Flex

- `flex-grow`: 只有在 `flex` 容器中有剩余空间时才会生效，定义项目的放大比例，如果存在剩余空间，不放大
- `flex-shrink`: 只有在 `flex` 容器空间不足时才会生效， 定义项目的缩小比例
- `flex-basis` ： 定义在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性来计算主轴是否有多余空间
- `flex` : `flex-grow`, `flex-shrink`, `flex-basis` 的缩写，

其他属性：

- `justify-content`
- `align-items` 项目在交叉轴上如何对齐
- `align-content` 定义多跟轴线对齐方式，一条轴线该属性不起作用
- `align-self` 允许单个项目与其他项目不一样的对齐方式，可覆盖align-items属性
- `order` 定义项目的排列顺序，数值越小，排列越靠前
- `flex-wrap`
- `flex-direction`
- `flex-flow` flex-direction 和  flex-wrap 的简写


## Other
1. box-sizing
2. 垂直居中
3. `unset` : `inherit` + `initial`
   比如，一个不可继承属性：`border`

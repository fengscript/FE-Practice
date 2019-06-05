# js 摘记

## 柯里化
如何衡量一个人的 JavaScript 水平<https://www.zhihu.com/question/22855484/answer/657320514>

> 柯里化，即 Currying，可以使函数变得更加灵活。我们可以一次性传入多个参数调用它；也可以只传入一部分参数来调用它，让它返回一个函数去处理剩下的参数

---

## PropertyDescriptor
`Object.getOwnPropertyDescriptor()` 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

```javascript
var o, d;

o = { get foo() { return 17; } };
d = Object.getOwnPropertyDescriptor(o, "foo");
// d {
//   configurable: true,
//   enumerable: true,
//   get: /*the getter function*/,
//   set: undefined
// }
```
在 Javascript 中， 属性 由一个字符串类型的“名字”（name）和一个“属性描述符”（property descriptor）对象构成

一个属性描述符是一个记录，由下面属性当中的某些组成的：
- value：该属性的值(仅针对数据属性描述符有效)
- writable：当且仅当属性的值可以被改变时为true。(仅针对数据属性描述有效)
- get：获取该属性的访问器函数（getter）。如果没有访问器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
- set：获取该属性的设置器函数（setter）。 如果没有设置器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
- configurable：当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为true。
- enumerable：当且仅当指定对象的属性可以被枚举出时，为 true。


https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty



# es6

> 大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号
>
> 将 JSX 分割成多行。我们推荐使用括号将 JSX 包裹起来，虽然这不是必须的，但这样做可以避免分号自动插入的陷阱。

> 由于现在 JavaScript 的发展，它变得可以调用一些系统底层的东西比如 WebGL。这些底层的操作需要直接访问内存，而 JavaScript 本身的 Array 在内存中是分散无法与底层操作对接，因此引入了这些强类型的数组



完整 `clone` 一个对象： *Es6 标准入门 P175*

```js
var clone = Object.assign(
	Object.create(Object.getPropotypeOf(obj))
  , obj)
```



## 对象
扩展运算符

可以用于合并两个对象

如果自定义属性放在扩展运算符后面，则会覆盖扩展运算符内部的同名属性

```js
let a = {a:1, x:2};
let c = {...a, x:3, y:4}
c// {a: 1, x: 3, y: 4}
```

如果放在前面，则相当于设置默认属性值

```js
let a = {a:1, x:2};
let c = { x:3, y:4, ...a}
c// {x: 2, y: 4, a: 1}
```






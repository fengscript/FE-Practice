# js 摘记

## 柯里化

如何衡量一个人的 JavaScript 水平<https://www.zhihu.com/question/22855484/answer/657320514>

> 柯里化，即 Currying，可以使函数变得更加灵活。我们可以一次性传入多个参数调用它；也可以只传入一部分参数来调用它，让它返回一个函数去处理剩下的参数

---

## PropertyDescriptor

`Object.getOwnPropertyDescriptor()` 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

```javascript
var o, d;

o = {
  get foo() {
    return 17;
  }
};
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
- writable：当且仅当属性的值可以被改变时为 true。(仅针对数据属性描述有效)
- get：获取该属性的访问器函数（getter）。如果没有访问器， 该值为 undefined。(仅针对包含访问器或设置器的属性描述有效)
- set：获取该属性的设置器函数（setter）。 如果没有设置器， 该值为 undefined。(仅针对包含访问器或设置器的属性描述有效)
- configurable：当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为 true。
- enumerable：当且仅当指定对象的属性可以被枚举出时，为 true。

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

# es6

> 大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号
>
> 将 JSX 分割成多行。我们推荐使用括号将 JSX 包裹起来，虽然这不是必须的，但这样做可以避免分号自动插入的陷阱。

> 由于现在 JavaScript 的发展，它变得可以调用一些系统底层的东西比如 WebGL。这些底层的操作需要直接访问内存，而 JavaScript 本身的 Array 在内存中是分散无法与底层操作对接，因此引入了这些强类型的数组

完整 `clone` 一个对象： _Es6 标准入门 P175_

```js
var clone = Object.assign(Object.create(Object.getPropotypeOf(obj)), obj);
```

## 对象

扩展运算符

可以用于合并两个对象

如果自定义属性放在扩展运算符后面，则会覆盖扩展运算符内部的同名属性

```js
let a = { a: 1, x: 2 };
let c = { ...a, x: 3, y: 4 };
c; // {a: 1, x: 3, y: 4}
```

如果放在前面，则相当于设置默认属性值

```js
let a = { a: 1, x: 2 };
let c = { x: 3, y: 4, ...a };
c; // {x: 2, y: 4, a: 1}
```

# Math

## 取整：

> 虽然 javascript 提供了很方便的一些取整方法，像 Math.floor，Math.ceil，parseInt，但是，国外友人做过测试，parseInt 这个方法做了一些额外的工作（比如检测数据是不是有效的数值，parseInt 甚至先将参数转换成了字符串!），所以，直接用 parseInt 的话相对来说比较消耗性能

```js
rounded = (0.5 + somenum) | 0;
rounded = ~~(0.5 + somenum);
rounded = (0.5 + somenum) << 0;
```

<https://www.cnblogs.com/rubylouvre/p/3570636.html>

## 循环取值

```javascript
const getIndex = () => dots.indexOf(dotActive);

const getPreIndex = () => (getIndex() - 1 + dots.length) % dots.length;

const getNextIndex = () => (getIndex() + 1) % dots.length;
```

# Tools

## 判断是否是 Array

```javascript
function isArray(arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
}
```

# Date

## 获取指定日期是周几

```js
var myDate = new Date();
myDate.setFullYear(y, m - 1, d);
var week = myDate.getDay();
```

# Regexp

## replace

```js
function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  return [p1, p2, p3].join(" - ");
}
var newString = "abc12345#$*%".replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString); // abc - 12345 - #$*%
```

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace

## match

```js
var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var regexp = /[A-E]/gi;
var matches_array = str.match(regexp);

console.log(matches_array);
// ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']
```

http://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match

# image 2 base64

1. canvas

```js
/**
 *
 * @param img html的img标签
 * @param ext 图片格式
 * @returns {string}
 */
function getImageBase64(img, ext) {
  var canvas = document.createElement("canvas"); //创建canvas DOM元素，并设置其宽高和图片一样
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height); //使用画布画图
  var dataURL = canvas.toDataURL("image/" + ext); //返回的是一串Base64编码的URL并指定格式
  canvas = null; //释放
  return dataURL;
  // use
  var user_icon = document.getElementById("icon");
  user_icon.src = img_path; //指定图片路径
  user_icon.onload = function() {
    base64 = getImageBase64(user_icon, fileExt); //base64编码
  };
}
```

or

```javascript
/**
 *
 * @param url 图片路径
 * @param ext 图片格式
 * @param callback 结果回调
 */
function getUrlBase64(url, ext, callback) {
  var canvas = document.createElement("canvas"); //创建canvas DOM元素
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = url;
  img.onload = function() {
    canvas.height = 60; //指定画板的高度,自定义
    canvas.width = 85; //指定画板的宽度，自定义
    ctx.drawImage(img, 0, 0, 60, 85); //参数可自定义
    var dataURL = canvas.toDataURL("image/" + ext);
    callback.call(this, dataURL); //回掉函数获取Base64编码
    canvas = null;
  };
}
//use
getUrlBase64(path, ext, function(base64) {
  console.log(base64); //base64编码值
});
```

2. fileReader

```javascript
function getBase64(file, callback) {
  const reader = new FileReader();

  reader.addEventListener("load", () => callback(reader.result));

  reader.readAsDataURL(file);
}
// Usage Ex:

getBase64(fileObjectFromInput, function(base64Data) {
  console.log("base 64 of file is", base64Data); //here you can have your code which uses base64 for its operation,//file to base64 by oneshubh
});
```

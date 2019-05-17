---
title: this 绑定丢失及修复
date: 2019-1-06 00:22:28
tags:
  - 前端
  - javascript
categories: 前端
---

在 `Javascript` 中， `this` 关键字经常在我们不注意的时候就被错误引用，得到意料之外的结果，所以我自己对 `this` 引用丢失及修复的方式整理总结一下。

# 1 指向哪儿？

首先明确一下， `this` 是一个指向函数被调用时候的`执行上下文`的指针。

`执行上下文`中包含了函数的调用栈、函数调用方式、传入的参数等信息

**`this` 的绑定发生在`运行时`，它指向什么完全取决于函数在哪里被调用**

<!-- more -->

# 2 `this` 绑定

## 2.1 默认绑定
当在独立函数中使用 `this` 时，指向全局对象（ `window` / `global` ）：

```javascript
function foo() {
    console.log(this.a);
}
var a = 1;
foo(); //1
```

> 但是 `严格模式` 下。 `this` 绑定到 `undefined`

## 2.2 隐式绑定
 函数引用有上下文对象时，`this` 会隐式被绑定到 **这个上下文对象**，而且 **对象属性引用链中只有最后一层在调用位置中起作用**：

 ```javascript
 function foo() {
   console.log(this.a);
 }

 var obj = {
   a: 0,
   foo: foo
 };

 var obj2 = {
   a: 1,
   obj: obj
 };

 obj1.obj.foo(); // 0
 ```

## 2.3 `new` 绑定
 使用 `new` 实例化一个构造函数时，会有以下步骤：
 1. 创建一个新对象
 2. 把新对象内部的 `[[Prototype]]` 链接到构造函数的原型对象
 3. **将新对象绑定到函数调用的 `this`**
 4. 返回新对象或者返回指定的对象

比如：

```javascript
function Foo(a) {
  this.a = a;
}
var bar = new Foo(2);
console.log(bar.a); // 2
```

# 3 绑定丢失

在 `隐式绑定` 中，有些情况下会发生引用丢失的问题

## 3.1 引用函数时丢失

```javascript
function foo() {
  console.log(this.a);
}

var obj = {
  a: 0,
  foo: foo
};
var a = "global";
var baz = obj.foo;
baz(); // 'global' on browser   undefined on node
```

`var baz = obj.foo` 的引用，实际上是引用了 `foo` 函数自身，因此在调用函数 `baz` 时候，相当于在 `全局环境` 调用了 `foo`

## 3.2 传入回调函数丢失

```javascript
function foo() {
  console.log(this.a);
}

function bar(fn) {
  // fn 实际上引用的是 foo
  fn();
}

var obj = {
  a: 0,
  foo: foo
};
var a = "global";
bar(obj.foo); // 'global' on browser   undefined on node
```

## 3.3 `setTimeout`

   `setTimeout`的回调函数会在全局环境（ `window` / `global` ）被执行，即：

```javascript
var obj2 = {
  timer() {
    setTimeout(function() {
      console.log(this); //window
    }, 1000);
  }
};
obj2.timer();
```

# 4 修改指向

为了纠正以上 `隐式传递` 产生的绑定丢失，我们可以用以下方式来纠正 / 修改 `this` 指向

## 4.1 显式绑定（ `call`,`apply`,`bind`）
即手动、明确的给函数指定一个执行上下文：

比如上面函数传递丢失：

```javascript
function foo() {
  console.log(this.a);
}

var obj = {
  a: 0,
  foo: foo
};
var a = "global";
var baz = obj.foo;
baz.call(obj); // 0
```

`call`,`apply`,`bind` 也是很好玩的三个方法，有空再另写一篇详细区分一下

*`call`,`apply` 第一个参数传入 `null` 时，函数指向全局*

## 4.2 `arrow function`

   `Es6` 的 `arrow function` 会根据外层作用域来决定 `this` 的指向，从而避免 `this` 指向丢失：

```javascript
var obj3 = {
  timer() {
    setTimeout(() => {
      console.log(this); //function timer
    }, 1000);
  }
};
obj3.timer();
```

## 4.3 保存引用
这种是 `Es6` 之前我们常用的方式，即先手动保存一份需要的执行环境的 `this`，后面再使用：

```javascript
var self = {
  a: 0,
  selfFn() {
    var _self = this;
    setTimeout(function() {
      console.log(_self.a); //0
    }, 1000);
  }
};

self.selfFn();
```

因为 `this` 引用丢失在 `Vue` 或者 `React` 中也存在同样问题并且有多种解决方式，另外放在 `Vue` 和 `React` 的笔记里面好了。
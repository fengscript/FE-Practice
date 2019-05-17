Session Prepare

- this
- es6 module
- es6 promise
- es6 generator async await
- call bind apply
- 柯里化
  this

# 1 Pre

- 编译时
- 运行时
- JS Engine (JS 引擎)
- Runtime (执行上下文)
- Call Stack (调用栈)
- Event Loop (事件循环)
- JIT AOT
- 声明 / 定义

```javascript
console.log("before: " + a);
var a = 1;
console.log("after: " + a);
```

预编译时，只声明。执行时，才赋值

# 2 What & Where

## 2.1 what

`this -> 执行上下文`

- 函数的调用栈
- 函数调用方式
- 传入的参数等信息

`this` 的绑定发生在 `运行时` ，**它指向什么完全取决于函数在哪里被调用**

## 2.2 where

- 无论是否在严格模式下，在全局执行环境中（在任何函数体外部）this 都指向全局对象
- 在函数内部，this 的值取决于函数被调用的方式
  - 默认绑定
  - 隐式绑定
  - 显式绑定
  - new 绑定

### 2.2.1 默认绑定

```javascript
// 'use strict';
function foo() {
  console.log(this.a);
}
var a = 1;
foo();
```

### 2.2.2 隐式绑定

函数引用有上下文对象时，`this` 会隐式被绑定到 **这个上下文对象** ，而且，对象属性引用链中 **只有最后一层在调用位置中起作用**：

```javascript
function foo() {
  console.log(this.a);
}

var obj1 = {
  a: 0,
  foo: foo
};

var obj2 = {
  a: 1,
  obj: obj
};

obj1.obj.foo(); // 0
```

### 2.2.3 显式绑定

- bind
- call
- apply
  构造函数`Function`实例化

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
baz.bind(obj); // 0
```

### 2.2.4 `new` 绑定

```javascript
function Foo(a) {
  this.a = a;
}
var bar = new Foo(2);
console.log(bar.a); // 2
```

# 3 Missing & Fixed

## 3.1 Missing

### 3.1.1 引用函数时丢失

```javascript
function foo() {
  console.log(this.a);
}

var obj = {
  a: 0,
  method: foo
};
var a = "global";
var handSomething = obj.method;
handSomething(); // 'global' on browser   undefined on node
```

`var handSomething = obj.method` 的引用，实际上是引用了 `foo` 函数自身，因此在调用函数 `handSomething` 时候，相当于在 全局环境 调用了 `foo`

### 3.1.2 传入回调函数丢失

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

### 3.1.3 `setTimeout` / `map` / `forEach`

`setTimeout`

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

`map` / `forEach`

```javascript
var arrObj = {
  a: 0,
  arr: [1, 2, 3, 4]
};
arrObj.arr.map(function(value, index) {
  console.log(this.a);
});
arrObj.arr.forEach(function(value, index) {
  console.log(this.a);
});
// arrObj.arr.forEach(function(value, index) {
//   console.log(this.a);
// }, arrObj);
```

```javascript
function Outline(opt) {
  this.outLineArr = [];
}
Outline.prototype = {
  constructor: Outline,
  remove(meshes) {
    console.log(this); // this 指向Outline
    var _this = this; // 所以在这里搞事
    if (Array.isArray(meshes)) {
      meshes.forEach(i => {
        scene.getMeshByName(i).renderOutline = 0;
      });
    } else if (arguments.length > 1) {
      arguments.forEach(function(item) {
        console.log(this); //这里 this会指向 Window 而不是 Outline
        console.log(_this.outLineArr); //搞事以后就正常了
      });
    }
  }
};
```

## 3.2 Fixed

### 3.2.1 保存引用

```javascript
var self = {
  a: 0,
  selfFn() {
    var _this = this;
    setTimeout(function() {
      console.log(_this.a); //0
    }, 1000);
  }
};

self.selfFn();
```

### 3.2.2 bind / call / apply

- call
- apply

`call`,`apply` 第一个参数传入 `null` 时，函数指向全局

### 3.2.3 arrow function

Es6 的 arrow function 会根据外层作用域来决定 this 的指向，从而避免 this 指向丢失：

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

# 4 React & Vue

## React

```javascript
class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.handClick = this.handClick.bind(this)
    }

    handClick(){//do something}

    render() {
        return (
            <div onClick = {this.handClick}></div>
        );
    }
}

```

```javascript
class MyComponent extends Component {
    handClick(){}
    render() {
        return (
            <div onClick = {(e) => {this.handClick(e)}></div>
        );
    }
}

```

# 5 Other

- 《你不知道的 Javascript》
- 阮一峰《ES6》
- MDN forEach

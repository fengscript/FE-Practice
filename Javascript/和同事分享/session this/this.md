Session Prepare

- this
- es6 module
- es6 promise
- es6 generator async await

# this

## Pre

- 编译时
- 运行时
- JS Engine (JS 引擎)
- Runtime (执行上下文)
- Call Stack (调用栈)
- Event Loop (事件循环)
- JIT AOT
- 声明 / 定义

```javascript
console.log("before: " + a); // ①
var a = 1;                   // ②
console.log("after: " + a);  // ③
```

预编译时，只声明。执行时，才赋值

## What & Where

### what
`this -> 执行上下文`

- 函数的调用栈
- 函数调用方式
- 传入的参数等信息

`this` 的绑定发生在 `运行时` ，**它指向什么完全取决于函数在哪里被调用**


### where

- 默认绑定
- 隐式绑定
- 显式绑定
- new 绑定

## Wrong & How

## React & Vue

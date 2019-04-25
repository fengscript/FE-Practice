# 1 type annoation
## format
```javascript
let varName : varType = varValue;
```

## basic type
```
number,string,boolean,null,undefined,symbol(ES6)
```

- `any` ：变量声明但未赋值时未指定类型，默认为 `any` 类型

- 类型推断：如果变量声明的时候有赋值，则会根据值的类型推断出一个具体的类型

### void
用 `void` 表示没有任何返回值的函数
```typescript
function methodName () : void {}
```

声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`

`undefined` 和 `null` 是所有类型的子类型, 比如`undefined` 类型的变量，可以赋值给 `number` 类型的变

> 但是 `void` 类型的变量不能赋值给 `number` 类型的变量

## Type Inference

时机：推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时


## Union Types

多种类型之间可以组合  `let numOrStr: number | string; `

** `TypeScript` 不确定一个联合类型的变量到底是哪个类型的时候，只能访问此联合类型的所有类型里共有的属性或方法：**
比如：
```typescript
function getLength(something: string | number): number {
    return something.length;
}

// 类型“string | number”上不存在属性“length”。
// 类型“number”上不存在属性“length”。ts(2339)

```




# interface
`interface` 用来定义形状和约束，描述对象的类型

除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述

赋值的时候，变量的形状必须和接口的形状保持一致

## 可选属性
不完全匹配时：
```typescript
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};
```


## 任意属性
```typescript
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}
```
要注意的是：**定义的任意属性，确定属性和可选属性都必须是它的子属性**

## 只读属性
用 `readonly` 特性

```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}
```

# Array
```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5];
```


## Array Generic
数组泛型 `Array<Type>`

`let fibonacci: Array<number> = [1, 1, 2, 3, 5];`


## interface
接口也可以用来描述数组

## Array-Like
常见的 `Array-like` 都有自己的接口定义：
- `IArguments`
- `NodeList`
- `HTMLCollection`

比如：
```typescript
function sum() {
    let args: IArguments = arguments;
}
```

# function
函数的类型声明，输入、输出都要考虑：
```typescript
function sum(x: number, y: number): number {
    return x + y;
}
```

如果是函数表达式，就需要：
```typescript
let myFun:(x:number ,y:number ) => number = function(x:number ,y:number ):number {
    return x+y
}
```
。。。怎么说呢，写的累得不行

`=>`表示函数的定义，而不是 `ES6`的箭头函数

## interface

当然，也可以上接口
```typescript
interface Search {
  (sources: string, searchStr: string): boolean;
}


let searchOuter: Search;
searchOuter = function(sources: string ,searchStr: string ){
    return sources.search(searchStr) !== -1;
}
```

## 可选参数
还是继续用 `?` 来表示可选参数：
```typescript
function getName(firstName:string , lastName?:string ) {
    if (lastName) {
        return firstName +" "+ lastName
    }else{
        return firstName
    }
}
```

**可选参数后面不允许再出现必须参数了**

## 参数默认值
```typescript
function getName(firstName:string , lastName:string = 'Cat') {
    if (lastName) {
        return firstName +" "+ lastName
    }else{
        return firstName
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```


**`TypeScript` 会将添加了默认值的参数识别为可选参数**


## `rest`参数
`rest`参数也是一个数组，所以用数组类型来定义：
```typescript
function fn(x:number, ...other:any[])
```

## Union & 重载
比如一个 `reverse` 函数对 `number` 、 `string` 参数返回对应类型，而要是直接写成：
```typescript
function reverse(param:string | number): string | number{}
```
这时候，类型并不精确，比如传进去 `string`，返回了 `number` 也是符合类型的，所以要表达的更精确的话，需要进行 **重载**

```typescript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {}
```

> `TypeScript` 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。


# Type Assertion
手动指定一个值的类型：
```typescript
<Type> value
// 或者
value as Type
```
比如：
```typescript
function getLength(aim: string | number):number{
    if ((<string>aim).length) {
        return (<string>aim).length;
    }else{
        return aim.toString().length;
    }
} 
```

**不能断言成一个 `union type` 中不存在的类型**


# declear
引用第三方库时， `ts`不能识别，需要用 `declear`关键字来指明类型：
```typescript
declear var $:(selector:string ) => any;
let dom = $('#dom');
```

类型声明放到一个文件里 `.d.ts`，以 三斜线指令 `///` 来引用：
```typescript
/// <reference path='./jQuery.d.ts' />
jQuery('#dom')
```

# Build-in Objects
内置对象可以在 `TypeScript` 中当做定义好了的类型直接用：

`ECMAScript`提供的内置对象有：`Boolean`、`Error`、`Date`、`RegExp`等
`DOM` 提供的内置对象：`Document`、`HTMLElement`、`Event`、`NodeList`等

用法：
```typescript
let b: Boolean = new Boolean(1);
let e: Error = new Error('occured error')

let body:HTMLElement = document.body;
let addDiv : NodeList = document.getElementsByTagName('div');
```

# Advanced
## Generics

# Brief & Cheatsheet
## Type
6种基本类型：
- `number`
- `string`
- `boolean`
- `null`
- `undefined`
- ` Symble`

```typescript
function getLength(something: string | number): number {
    return something.length;
}
```


## Interface
```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}
```

## Array


## Function
- **可选参数后面不允许再出现必须参数了**
- **`TypeScript` 会将添加了默认值的参数识别为可选参数**


# Ts + React
引入模块时候需要用别名：
```javascript
import * as React from react
```
否则类型推断不出来
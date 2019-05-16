# Pre

参考：
https://ts.xcatliu.com

## 编译使用

```bash
npm install -g typescript
```

以后，会在全局环境下安装 `tsc` 命令用来编译一个 `TypeScript` 文件：

```bash
tsc hello.ts
```

# 1 type annoation

## format

```javascript
let varName: varType = varValue;
```

## basic type

```
number, string, boolean, null, undefined, symbol(ES6)
```

- `any` ：变量声明但未赋值时未指定类型，默认为 `any` 类型

- 类型推断：如果变量声明的时候有赋值，则会根据值的类型推断出一个具体的类型

### void

用 `void` 表示没有任何返回值的函数

```typescript
function methodName(): void {}
```

声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`

`undefined` 和 `null` 是所有类型的子类型, 比如`undefined` 类型的变量，可以赋值给 `number` 类型的变

> 但是 `void` 类型的变量不能赋值给 `number` 类型的变量

### Array

```javascript
let list: number[] = [1, 2, 3];

// 泛型
let list: Array<number> = [1, 2, 3];
```

### Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同

```javascript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

> 访问元组中一个越界的元素，会使用联合类型替代

### Enum

枚举类型可以为一组数值赋予友好的名字

枚举类型提供的一个便利是你可以由枚举的值得到它的名字

### Never

`never` 类型表示的是那些永不存在的值的类型。 例如，总是会抛出异常，或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型

变量也可能是 `never` 类型

> `never` 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 `never` 的子类型或可以赋值给 `never` 类型（除了 never 本身之外）。 即使 `any` 也不可以赋值给 `never`

### 类型断言

- `<>`
- `as`

```javascript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

let strLength: number = (someValue as string).length;
```

## Type Inference

时机：推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型

## Union Types

多种类型之间可以组合 `let numOrStr: number | string;`

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

在面向对象语言中，接口（Interfaces）是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）。

TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述，定义形状和约束，描述对象的类型。

赋值的时候，变量的形状必须和接口的形状保持一致

假如不用接口，就得这么写：

```javascript
function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

呕。。。要是用了接口，那就可以这样子：

```javascript
interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

## 可选属性

不完全匹配时：

```typescript
interface Person {
  name: string;
  age?: number;
}

let tom: Person = {
  name: "Tom"
};
```

## 索引类型

比如 `a[10]` 或 `ageMap["daniel"]` 。 可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型

```typescript
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

`[index: indexType]: valueType;`

`indexType` 只能是 `string` 或者 `number`

数字索引的返回值必须是字符串索引返回值类型的子类型

## 额外属性检查 / 任意属性

```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}
```

[propName: string] 定义了任意属性取 string 类型的值

要注意的是：**定义的任意属性，确定属性和可选属性都必须是它的子属性**

比如此处要表示的是：`Person` 可以有任意数量的属性，并且只要它们不是 `name` 和 `age` ，那么就无所谓它们的类型是什么

## 只读属性

用 `readonly` 特性

只能在对象刚刚创建的时候修改/设置一次其值，后面就再不行了

```typescript
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
```

类似的，数组有 `ReadonlyArray<T>`

> 做为变量使用的话用 const，若做为属性则使用 readonly

## 描述类

```javascript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}
```

**接口不会帮你检查类是否具有某些私有成员**

用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误，因为 **当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor 存在于类的静态部分，所以不在检查的范围内**。

```javascript
interface ClockConstructor {
    new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
//类“Clock”错误实现接口“ClockConstructor”。
//类型“Clock”提供的内容与签名“new (hour: number, minute: number): any”不匹配。ts(2420)
```

可以通过直接操作类的静态部分实现：

```typescript
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick(): void;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

或者用类表达式：

```typescript
interface ClockConstructor {
  new (hour: number, minute: number);
}

interface ClockInterface {
  tick();
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
};
```

## 接口继承

通过 `extends`

```typescript
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
```

你可以随随便便继承：

```typescript
interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
```

# Array

```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5];
```

## Array Generic

数组泛型 `Array<Type>`

`let fibonacci: Array<number> = [1, 1, 2, 3, 5];`

## Interface

```javascript
interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

## ReadonlyArray

`ReadonlyArray<T>` 与 `Array<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
```

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

# Function

函数的类型声明，输入、输出都要考虑：

```typescript
function sum(x: number, y: number): number {
  return x + y;
}
```

如果是函数表达式，就需要：

```typescript
let myFun: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y;
};
```

。。。怎么说呢，写的累得不行

`=>`表示函数的定义，而不是 `ES6` 的箭头函数

对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配

箭头函数应该这样子？

```typescript
const add = (a: number, b: number): number => a + b;
```

## Interface describtion

```typescript
interface Search {
  (sources: string, searchStr: string): boolean;
}

let searchOuter: Search;
searchOuter = function(sources: string, searchStr: string) {
  return sources.search(searchStr) !== -1;
};
```

甚至可以直接写，类型系统会推断出参数类型，返回值类型会通过其返回值推断出来：

```javascript
et searchOuter: Search;
searchOuter = function(){
    let result = src.search(sub);
    return result > -1;
}
```

## 可选参数

还是继续用 `?` 来表示可选参数：

```typescript
function getName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}
```

**可选参数后面不允许再出现必须参数了**

## 参数默认值

```typescript
function getName(firstName: string, lastName: string = "Cat") {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName("Tom", "Cat");
let tom = buildName("Tom");
```

**`TypeScript` 会将添加了默认值的参数识别为可选参数**

## `rest`参数

`rest`参数也是一个数组，所以用数组类型来定义：

```typescript
function fn(x: number, ...other: any[]);
```

## Union & 重载

重载：允许一个函数接受不同数量或类型的参数时，作出不同的处理

比如一个 `reverse` 函数对 `number` 、 `string` 参数返回对应类型，而要是直接写成：

```typescript
function reverse(param: string | number): string | number {}
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

- `<Type>value`
- `value as Type`
  在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种

```typescript
<Type>value;
// 或者
value as Type;
```

比如：

```typescript
function getLength(aim: string | number): number {
  if ((<string>aim).length) {
    return (<string>aim).length;
  } else {
    return aim.toString().length;
  }
}
```

可用于将一个联合类型的变量指定为一个更加具体的类型

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
jQuery("#dom");
```

# Build-in Objects

内置对象可以在 `TypeScript` 中当做定义好了的类型直接用：

`ECMAScript`提供的内置对象有：`Boolean`、`Error`、`Date`、`RegExp`等
`DOM` 提供的内置对象：`Document`、`HTMLElement`、`Event`、`NodeList`等

用法：

```typescript
let b: Boolean = new Boolean(1);
let e: Error = new Error("occured error");

let body: HTMLElement = document.body;
let addDiv: NodeList = document.getElementsByTagName("div");
```

# Generics

使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据

# annotation file

如，`jquery`：

```typescript
declare var jQuery: (selector: string) => any;

jQuery("#foo");
```

一般会把所有声明语句集中放到 `xxx.d.ts` 文件中

要么使用 `@types` 引入第三方声明文件：

```bash
npm install @types/jquery --save-dev
```

---

# Cheatsheet

## Type

6 种基本类型：

- `number`
- `string`
- `boolean`
- `null`
- `undefined`
- `Symble`

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

- `type + []` : `let fibonacci: number[] = [1, 1, 2, 3, 5]`
- `Array<number>`
- interface：

  ```javascript
  interface NumberArray {
    [index: number]: number;
  }
  ```

- `ReadonlyArray<T>`
- ArrayLike：
  - `IArguments`
  - `NodeList`
  - `HTMLCollection`

## Function

- **可选参数后面不允许再出现必须参数了**
- **`TypeScript` 会将添加了默认值的参数识别为可选参数**

# Ts + React

引入模块时候需要用别名：

```javascript
import * as React from react
```

否则类型推断不出来

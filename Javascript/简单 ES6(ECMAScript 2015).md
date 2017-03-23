ES6(ECMAScript 2015)

常用ES6特性

let, const, class, extends, super, arrow functions, template string, destructuring, default, rest arguments

# 1 let,const

## 1.1 let

 `let`为JavaScript新增了块级作用域

在如下场景，ES5 只有全局作用域和局部作用域，两次都会输出 `obama`

```javascript
			var name = 'obama'
			
			while(true){
				var name = 'obama'
				console.log('1--'+name);
				break
			}
			
			console.log('2--'+name)
```

而换成 `let`

```javascript
		let name = 'FYG'
			while(true){
				let name = 'obama'
				console.log('3--'+name);
				break
			}
			
			console.log('4--'+name)
```

则`let`声明的变量，只在`let`所在的 代码块 内有效，为Js添加了 块级作用

- 不存在变量提升
- 不允许重复声明
- 不再需要 IIFE

如

```js
(function () {
  var tmp = ...;
  ...
}());
```

可以替换为

```js
{
  let tmp = ...;
  ...
}
```



## 1.2 块级作用域

 ES6规定，函数本身的作用域，在其所在的块级作用域之内

如

```js
function f() { console.log('I am outside!'); }
(function () {
  if(false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
```

ES5 因为函数提升，无论是否进入if，因为函数提升，函数声明都会被提升到当前作用域的顶部，是的 f()得到执行



而 ES6有块级作用域，内部声明的函数不会影响到作用域的外部：

```js
{
  let a = 'secret';
  function f() {
    return a;
  }
}
f(); // 报错
```



> ES5的严格模式规定，函数只能在顶层作用域和函数内声明，其他情况（比如if代码块、循环代码块）的声明都会报错
>
> ```js
> 'use strict';
> if (true) {
>   function f() {} // 报错
> }
> ```

而这种情况在  ES6 中，函数在块级作用域内声明，所以不会报错，但是f() 在if外面就不可用



## 1.3 const

`const`声明常量，一旦声明，值就不能在改变。则，一旦声明，就要立即初始化（即赋值）

其他块级作用域特性和 `let` 相同



对于引用类型的变量，`const`保证存储的地址不变，而对象本身还是可变的，依然可以为其添加新属性。。

```js
const a = [];
a.push("Hello"); // 可执行
a.length = 0;    // 可执行
a = ["Dave"];    // 报错 
```



> ES6一共有6种声明变量的方法： `var` `function` `let` `const`  `import`  `export`

## 1.3 全局对象

ES6规定， `let`命令、`const`命令、`class`命令声明的全局变量，不属于全局对象的属性

`var`命令和`function`命令声明的全局变量，依旧是全局对象的属性

```js
let b = 1;
window.b // undefined
```



# 2 class、extends 、super

## class定义一个类 `extends`实现继承

```javascript
class Animal {
    constructor(){
        this.type = 'animal'
    }
    says(say){
        console.log(this.type + ' says ' + say)
    }
}

let animal = new Animal()
animal.says('hello') //animal says hello

class Cat extends Animal {
    constructor(){
        super()
        this.type = 'cat'
    }
}

let cat = new Cat()
cat.says('hello') //cat says hello
```

首先用`class`定义了一个“类”，可以看到里面有一个`constructor`方法，这就是构造方法，而`this`关键字则代表实例对象。简单地说，`constructor`内定义的方法和属性是实例对象自己的，而`constructor`外定义的方法和属性则是所有实例对象可以共享的。

Class之间可以通过`extends`关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。上面定义了一个Cat类，该类通过`extends`关键字，继承了Animal类的所有属性和方法。

`super`关键字，它指代父类的实例（即父类的this对象）。子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类没有自己的`this`对象，而是继承父类的`this`对象，然后对其进行加工。如果不调用`super`方法，子类就得不到`this`对象。

ES6的继承机制，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。

# 3 arrow function



函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。箭头函数根本没有自己的this，它的this是继承外面的，因此内部的this就是外层代码块的this。



# 4 template string

插入大段 `html`到文档时，之前需要

```javascript
$("#result").append(
  "There are <b>" + basket.count + "</b> " +
  "items in your basket, " +
  "<em>" + basket.onSale +
  "</em> are on sale!"
);
```

用 模版字符串可以

```javascript
$("#result").append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

用反引号`（\）`来标识起始，用`${}`来引用变量，而且所有的空格和缩进都会被保留在输出之中

# 5 destruring 解构

## 5.1 数组的解构赋值

### 基本用法

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

等号右边的值不是对象，就先将其转为对象

如对于

```js
var a = 1;
var b = 2;
var c = 3;
```

可以写成

```js
var [a, b, c] = [1, 2, 3];
```

- ES6 会从数组中提取值，按照对应位置，对变量赋值。

> 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值

- 解构不成功时，变量的值就等于`undefined`。

- 不完全解构，也可以成功

  ```js
  let [x, y] = [1, 2, 3];
  x // 1
  y // 2
  ```

- 等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错

- 解构赋值适用于 `var`  `let`  `const`  `Set`,只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值

### 默认值

- 解构赋值允许指定默认值，如

```js
var [foo = true] = [];
foo // true
```


```js
[x, y = 'b'] = ['a']; // x='a', y='b'
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'
//ES6内部使用严格相等运算符（===），判断一个位置是否有值。所
//以，如果一个数组成员不严格等于undefined，默认值是不会生效的

如
var [x = 1] = [null];
x // null
默认值不会生效，因为 null 不严格等于 undefined
```



- 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值

```js
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
// f() 不会执行，因为 x 会取到值 1
//相当于
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```



## 5.2 对象的解构赋值

对象的属性没有次序，变量必须与属性同名，才能取到正确的值

```js
let cat = 'ken'
let dog = 'lili'
let zoo = {cat: cat, dog: dog}
console.log(zoo)  //Object {cat: "ken", dog: "lili"}
// ES6 解构赋值
let zoo = {cat, dog}
console.log(zoo)  //Object {cat: "ken", dog: "lili"}
```

而

```js
var { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```

**对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量**

```js
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
//真正被赋值的是变量baz，而不是模式foo。
```



对象的解构也可以指定默认值：

```js
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5
```

要将一个已经声明的变量用于解构赋值，必须非常小心：

```js
// 错误的写法

var x;
{x} = {x: 1};
// SyntaxError: syntax error
```

JavaScript引擎会将`{x}`理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免JavaScript将其解释为代码块，才能解决这个问题。

```js
// 正确的写法
({x} = {x: 1});
```

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```js
let { pow, sin, cos } = Math;
  console.log(pow(2,3))		//8	
```



## 5.3 字符串解构赋值

字符串解构赋值时被转换成了一个类似数组的对象。

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

- 还可以对`length`属性解构赋值。

```js
let {length : len} = 'hello';
len // 5
```



## 5.4 Number Boolean

如果等号右边是数值和布尔值，则会先转为对象。

```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```



`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。

```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```



## 5.5 parameters

函数参数也可以解构赋值：

```js
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

函数`add`的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量`x`和`y`。对于函数内部的代码来说，它们能感受到的参数就是`x`和`y`

```js
[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```



使用默认值：

```js
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```



`undefined`就会触发函数参数的默认值。

```js
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```













# 6 default ,rest

`default`，如调用`animal()`方法时忘了传参数，传统的做法就是加上这一句`type = type || 'cat' `来指定默认值

```javascript
function animal(type){
    type = type || 'cat'  
    console.log(type)
}
animal()
```

如果用ES6我们可以直接这么写：

```javascript
function animal(type = 'cat'){
    console.log(type)
}
animal()
```



`reset`

```javascript
function animals(...types){
    console.log(types)
}
animals('cat', 'dog', 'fish') //["cat", "dog", "fish"]
```





# 7 import export

ES6自带了 `module`功能

> 模块化为了解决：
>
> 无法将一个庞大的js工程拆分成一个个功能相对独立但相互依赖的小工程
>
> 1. 一方面js代码变得很臃肿，难以维护
> 2. 另一方面得很注意每个script标签在html中的位置，因为它们通常有依赖关系，顺序错了可能就会出bug
>
>  CommonJS(服务器端) 和 AMD（浏览器端，如require.js）

例如：要在`index.js`中使用`content.js`返回的结果

**require.js**

首先定义：

```javascript
//content.js
define('content.js', function(){
    return 'A cat';
})
```

然后require：

```javascript
//index.js
require(['./content.js'], function(animal){
    console.log(animal);   //A cat
})
```

**Common.js**

```js
//index.js
var animal = require('./content.js')

//content.js
module.exports = 'A cat'
```

**ES6**

```js
//index.js
import animal from './content'

//content.js
export default 'A cat'
```

**ES6其他用法**

export命令除了输出变量，还可以输出函数，甚至是类（react的模块基本都是输出类）

```js
//content.js

export default 'A cat'    
export function say(){
    return 'Hello!'
}    
export const type = 'dog' 
```

```js
//index.js

import { say, type } from './content'  
let says = say()
console.log(`The ${type} says ${says}`)  //The dog says Hello
//大括号里面的变量名，必须与被导入模块（content.js）对外接口的名称相同。
```

**`as`修改变量名**

es6中可以用`as`实现一键换名

```js
//index.js

import animal, { say, type as animalType } from './content'  
let says = say()
console.log(`The ${animalType} says ${says} to ${animal}`)  
//The dog says Hello to A cat
```

**模块整体加载**

除了指定加载某个输出值，还可以使用整体加载，即用星号 `*` 指定一个对象，所有输出值都加载在这个对象上面。

```js
//index.js

import animal, * as content from './content'  
let says = content.say()
console.log(`The ${content.type} says ${says} to ${animal}`)  
//The dog says Hello to A cat
//通常星号*结合as一起使用比较合适。
```
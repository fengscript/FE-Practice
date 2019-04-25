# 1 Type & Value

## inner type

**null**

`typeof null === 'object'`

`null` 是唯一一个 `falsy` 值

检测：
```javascript
let a = null;
(!a && typeof a === 'object')
```

** 对变量执行 `typeof` 操作时，得到的结果不是该变量的类型，而是该变量 *持有的值的类型* **

`function`、 `array` 等都是 `object` 的子类型，所以 `typeof` 都会得到 `object`
但是 `typeof function(){} === "function"`

函数的 `legth` 属性是其 *声明的参数个数*

变量没有类型，只有值才有类型，变量随时可以持有任何类型的值，变量在未持有值的时候是 `undefined`

### undefined & undeclared

作用域中未声明过的变量就是 `undeclared` ，声明过还没赋值的就是`undefined`
`undeclared` 的就会报错 `ReferenceError:xxx is not defined`

但是对于 `typeof`， `undeclared` 和 `undefined`的都会返回 `undefined`，所以我们只需要检测
`typeof xxx === 'undefined'` 就能保证变量可用

所以： ` if(typeof xxx !== 'undefined') ` 就比 ` if( xxx ) ` 安全

** `undefined` 是从未赋值， `null` 是曾赋过值，但是目前没有值 **

非安全模式下，`undefined` 可以被重新赋值。。。

## Value
1. `delete` 从数组中删除不会改变数组长度，被删掉的位置的值会成为 `undefined`
2. 数组也是对象，所以可以包含字符串键值和属性
3. 字符串是不可变的，数组是可变的
    不可变指 字符串的成员函数不会改变其原始值，而是会创建并返回一个新的字符串

    而数组成员函数都是在其原始值上操作
   - str.toUpperCase()
   - arr.push()

    他们之间彼此可以借用成员函数，比如反转一个字符串：
    ```javascript
    let str = 'a,b,c';
                //split成字符数组
    let reverse = str.split(',')
                    //数组的 reverse 方法
                    .reverse()
                    //再转回去
                    .join();
    ```
    
    `join()`可以将字符数组转换成字符串

### Number

#### 语法
`.` 会被 *优先* 识别为数字常量的一部分，然后才是对象属性访问运算符
于是：
```javascript
23.toFixed(2)  //SyntaxError
//but
(23).toFixed(2)  //OK
23..toFixed(2)  //OK
```

#### 机器精度 machine epsilon 
Js 的精度为`2^-52`，被定义在 `Number.EPSILON` 上， polyfill：
```javascript
if (!Number.EPSILON) {
    Number.EPSILON = Math.pow(2, -52)
}
```

所以，能够被 “安全” 呈现的最大整数为 `2^53 - 1`

可以用来比较两个数字相等：
```javascript
function closeEqual(x, y){
    return Math.abs(x - y) < Number.EPSILION
}
```

### 特殊值
**void**
返回值为 `undefined` 而不是不让表达式不返回值，并不会改变表达式的结果

**NaN**
唯一一个非自反的值，即 `NaN !== NaN // true ` 就是 `x === x` 不成立

**Infinity**

` Infinity / Infinity ` 是一个未定义操作，所以是 `NaN`

**0**
`(-0).toString()  // 0 `

`JSON.stringfy(-0)  // 0 `

`JSON.parse(-0)  // -0 `

`Object.is(a, b)` 可以 handle `NaN` , `-0` 跟自己相比时候的这些恶心情况


### 值和引用
简单值总是通过 **复制** 的方式来赋值/传递

复合值（object, function）总是通过引用复制的方式来赋值/传递

比如函数传参时候
```javascript
let a = [1,2,3];

function foo(x) {
    x.push(4);      // x : [1,2,3,4]

    x = [4,5,6]
    x.push(7)       // x: [4,5,6,7]
}
foo(a)      // x : [1,2,3,4]
```
因为向函数传递参数时候，实际上是将引用 `a` 的一个副本赋值给 `x` ，而 `a` 仍然指向 `[1,2,3]`

我们无法决定使用值复制还是引用复制，由值得类型来决定

- 要通过值复制的方式来传递复合值（数组，对象），就需要为其创建一个副本，这样子传递的就不再是原始值：
`foo(a.slice())`

> `.slice()` 不带参数会返回一个浅副本

- 要将标量基本类型值传递到函数内部并修改，就要将该值封装到一个复合值中，然后通过引用复制的方式传递：
  ```javascript
  let obj = {a:2}
  function foo (wrapper) {
      wrapper.a = 42;
  }
  foo(obj) // obj.a : 42
  ```

**标量基本类型值是不可更改的**：  ==p31==
```javascript
function foo (x) {
    x = x + 1; //x :3
}
var a = 2;
var b = new Number(a);

foo(b)
console.log(b);   //2 而不是 3
```

# 2 native function

一些 native function / build-in function
- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- Regexp()
- Date()
- Error()
- Symbol()









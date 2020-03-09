Es6 Class

```javascript
class Animal {
    //es7 实例属性 this.xxx 直接用 xxx 代替
    id = `animanal`;
    //es7 静态属性
    static age = 27;
  constructor(name) {
    // es6 实例属性
    this.name = name;
    // 调用 es7实例属性
    console.log(this.id)
  }
	//公有方法
  sayHi() {
    return `Hi, ${this.name}`;
  }
  get name(){
      return `cat`
  }
  set name(value){
      console.log(`setter: ${value}`);
  }
  //静态方法
	//不需要实例化，而是直接通过类来调用：
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);//子类中使用 super 关键字来调用父类的构造函数和方法
    console.log(this.name);
  }

  sayHi() {
    return `Hi, ${super.sayHi()}`;
  }
}
```



# class

## 定义

两种方法：

- 类声明：使用 `class` 关键字
- 类表达式：

```javascript
//匿名类。。。
let Rectangle = class {...}

let Rectangle = class Rectangle {...}
```

- **不会提升**
- `constructor` 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。
- 一个类必须有 `constructor` 方法，如果没有显式定义，一个空的 `constructor` 方法会被默认添加。
- **方法之间不需要逗号分隔**
- 当一个对象调用静态或原型方法时，如果该对象没有 `this` 值 ，那么 `this` 值在被调用的函数内部将为 `undefined` 。不会发生自动包装。
- **类的所有方法都定义在类的 `prototype` 属性上面**
- 类的内部所有定义的方法，都是不可枚举的（`non-enumerable`）
- 在 `class` 中。同时具有 `__proto__` 和 `prototype` 两个属性，存在两条继承链。
- 子类的 `__proto__` 属性，表示构造函数的继承，总是指向父类。
- 子类的 prototype 的 `__proto__` 属性表示方法的继承，总是指向父类的 `prototype` 属性。



## 实例对象

- `constructor` 方法默认返回实例对象（`this`），完全可以指定返回另外一个对象。
- 实例的属性除非显式定义，否则都是定义在原型对象上
- 类的所有实例共享一个原型对象
- 类相当于实例的原型，所有在类中定义的方法都会被实例继承





## 私有方法

没提供私有方法，而且 **模块内部的所有方法都是对外可见**，所以可以这样子移出去来模拟私有方法：

```javascript
class Widget {
  foo(baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return (this.snaf = baz);
}
```

或者使用 `Symbol` 值的唯一性，将私有方法的名字命名为一个 `Symbol` 值。

```javascript
const bar = Symbol("bar");
const snaf = Symbol("snaf");

export default class myClass {
  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return (this[snaf] = baz);
  }

  // ...
}
```

## 静态方法

类相当于实例的原型，**所有在类中定义的方法，都会被实例继承**

如果在一个方法前，加上 `static` 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```javascript
class Foo {
  static classMethod() {
    return "hello";
  }
}

Foo.classMethod(); // 'hello'

var foo = new Foo();
foo.classMethod();
// TypeError: foo.classMethod is not a function
```

- 父类的静态方法，可以被子类继承。
- 静态方法也是可以从 `super` 对象上调用的。




## 实例属性

写在类的定义中即可，调用时候 `this.xxx`

```javascript
class MyClass {
  myProp = 40;
  constructor() {
    console.log(this.myProp);
    //或者写在构造函数里面：
    this.myProp = 40;
  }
  
}
```

## 静态属性
静态属性是 `Class` 本身的属性，而不是 实例对象 `this` 上的属性，在实例属性前面加上 `static` 即可

ES6 规定 `Class` 内部只有静态方法，没有静态属性，所以

```javascript
class Foo(){
  static prop = 0; //是OK的
  innerProp : 0; // 不OK
  static innerProp : 0; // 不OK
}
Foo.innerProp = 1; //也是OK的 旧写法
```




## 表达式

`const myClass = class Me()`

这样子定义的类，名字是 `myClass ` ，`Me`只在 `Class`的内部可用



## this

类的方法内部如果含有 `this`，那么它将指向 **类的实例**

但是在外面单独使用这个方法时 `this` 就会指向该刚发运行时所在的环境而找不到方法报错，解决方式是在构造方法 `constructor` 中绑定一下，或者使用箭头函数：

```js
class Logger{
  printName(name='init'){
    this.print(name)
  }
	print(name){
    console.log(name)
  }
}

const logger = new Logger();
const {printName} = logger;
printName(); // TypeError:Cannot read property 'print' of undefined;


//绑定一下：
class Logger{
  constructor(){
    this.printName = this.printName.bind(this);
  }
  //...
}

//或者使用箭头函数
class Logger{
  constructor(){
    this.printName = (name='init') => {
      this.print(name)
    }
  }
  //...
}
```



## getter setter

拦截 `set` 和 `get` 属性的默认行为：

```javascript
class Person {
  constructor (arguments) {
    //...
  }
  set prop(value){
    this.id = value;
  }
  get prop(){
    return this.id;
  }
}
```




## 继承

`class ColorPoint extends Point {}`

子类必须在 `constructor` 方法中调用 `super` 方法，否则新建实例时会报错。这是因为子类没有自己的 `this` 对象，而是继承父类的 `this` 对象，然后对其加工

### super

*`es6` 要求，**子类**的构造函数内部必须执行一次 `super` 函数*
`super` 关键字表示父类的构造函数，用来新建父类的 `this` 对象，所以 *在调用 super 之前使用 this 的话会报错*

`super` 虽然代表了父类的构造函数，但是返回的是子类的实例，即 `super` 内部的 `this` 指的是子类，因此 `super()` 在这里相当于 `Father.prototype.constructor.call(this, props)`

`super` 既可以当 `函数` 使用，也可以当 `对象` 使用

- 在 `constructor` 中当函数使用时代表父类的构造函数（**此时只能在子类的构造函数中使用，用在其他地方将报错**）
- 当普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```javascript
class A {
  c() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.c()); // 2
  }
}

let b = new B();
```

**通过 super 调用父类的方法时，super 会绑定子类的 this。**

```javascript
class A {
  constructor {
    this.x = 1;
  }
  s() {
    console.log(this.x);
  }
}

class B extends A {
  constructor {
    super();
    this.x = 2;
  }
  m() {
    super.s();
  }
}

let b = new B();
b.m(); // 2
```

由于绑定子类的 this ，所以如果通过 super 对某个属性赋值，这时 super 就是 this，赋值的属性会变成子类实例的属性：

```javascript
class A {
  constructor {
    this.x = 1;
  }
}

class B extends A {
  constructor {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}

let b = new B();
```

摘自：https://www.jianshu.com/p/fc79756b1dc0
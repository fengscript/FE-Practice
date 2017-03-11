### 1 函数

#### 1.1 arguments 和 rest

函数允许接收任意个参数，用`arguments`来获取所有参数

ES6标准引入了`rest`参数，获取除过正常定义之外的参数，rest参数只能写在最后，前面用`...`标识

```js
function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

foo(1, 2, 3, 4, 5);
// 结果:
// a = 1
// b = 2
// Array [ 3, 4, 5 ]

foo(1);
// 结果:
// a = 1
// b = undefined
// Array []
```

#####  作用域

`JavaScript`的函数在查找变量时从自身函数定义开始，从“内”向“外”查找。如果内部函数定义了与外部函数重名的变量，则内部函数的变量将“屏蔽”外部函数的变量。

JavaScript的变量作用域实际上是函数内部，我们在`for`循环等语句块中是无法定义具有局部作用域的变量的：

```
function foo() {
    for (var i=0; i<100; i++) {
        //
    }
    i += 100; // 仍然可以引用变量i
}
```

ES6引入了新的关键字`let`，用`let`替代`var`可以申明一个块级作用域的变量

`const`来定义常量，`const`与`let`都具有块级作用域

##### this

如果以对象的方法形式调用，该函数的`this`指向被调用的对象。

如果单独调用函数，该函数的`this`指向全局对象，也就是`window`。

要保证`this`指向正确，必须用`obj.xxx()`的形式调用

###### apply

虽然在一个独立的函数调用中，根据是否是strict模式，`this`指向`undefined`或`window`，不过，可以通过：

1. `var that = this`
2. apply

控制`this`的指向，要指定函数的`this`指向哪个对象，可以用函数本身的`apply`方法，它接收两个参数，第一个参数就是需要绑定的`this`变量，第二个参数是`Array`，表示函数本身的参数。

如

```js
function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25
getAge.apply(xiaoming, []); // 25, this指向xiaoming, 参数为空
```

另一个与`apply()`类似的方法是`call()`，唯一区别是：

- `apply()`把参数打包成`Array`再传入；
- `call()`把参数按顺序传入。

比如调用`Math.max(3, 5, 4)`，分别用`apply()`和`call()`实现如下：

```js
Math.max.apply(null, [3, 5, 4]); // 5
Math.max.call(null, 3, 5, 4); // 5
```

普通函数调用，通常把`this`绑定为`null`。

#### 1.2 Map 和 Set

##### Map

JavaScript的默认对象表示方式`{}`可以视为其他语言中的`Map`或`Dictionary`的数据结构，即一组键值对。

ES6 引入了新的数据类型 `Map` 和 `Set`

`Map`是一组键值对的结构，具有极快的查找速度。

初始化`Map`需要一个二维数组，或者直接初始化一个空`Map`。`Map`具有以下方法：

```js
var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined
```

由于一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉：

```js
var m = new Map();
m.set('Adam', 67);
m.set('Adam', 88);
m.get('Adam'); // 88
```

##### Set

`Set`和`Map`类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在`Set`中，没有重复的key。

通过`add(key)`方法可以添加元素到`Set`中，可以重复添加，但不会有效果：

```js
>>> s.add(4)
>>> s
{1, 2, 3, 4}
>>> s.add(4)
>>> s
{1, 2, 3, 4}
```

通过`delete(key)`方法可以删除元素：

```js
var s = new Set([1, 2, 3]);
s; // Set {1, 2, 3}
s.delete(3);
s; // Set {1, 2}
```

要取出来时候，需要遍历

```
for(let item in s)

forEach(function(){
  
})
```







#### 1.3 for...of

遍历`Array`可以采用下标循环，遍历`Map`和`Set`就无法使用下标。为了统一集合类型，ES6标准引入了新的`iterable`类型，`Array`、`Map`和`Set`都属于`iterable`类型。

具有`iterable`类型的集合可以通过新的`for ... of`循环来遍历。

#### 1.4 Higher-order function

Js的函数都指向某个变量，	函数的参数接受变量。

一个函数接收另外一个函数作为参数时候，这个函数称为  高阶函数。

##### map/reduce

- `map(para)` 对一个数组每一项进行函数 para() 运算

```js
function pow(x) {
    return x * x;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
```



- Array的`reduce()`把一个函数作用在这个`Array`的`[x1, x2, x3...]`上，这个函数必须接收两个参数，`reduce()`把结果继续和序列的下一个元素做累积计算，等于

  ```
  [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
  ```



##### filter

`filter()`把传入的函数依次作用于每个元素，然后根据返回值是`true`还是`false`决定保留还是丢弃该元素。如

把一个`Array`中的空字符串删掉，可以这么写：

```
var arr = ['A', '', 'B', null, undefined, 'C', '  '];
var r = arr.filter(function (s) {
    return s && s.trim(); // IE9以下的版本没有trim()方法
});
r; // ['A', 'B', 'C']
```

**`filter()`这个高阶函数，关键在于正确实现一个“筛选”函数。 **

回调函数还可以接收另外两个参数，表示元素的位置和数组本身：

```
var arr = ['A', 'B', 'C'];
var r = arr.filter(function (element, index, self) {
    console.log(element); // 依次打印'A', 'B', 'C'
    console.log(index); // 依次打印0, 1, 2
    console.log(self); // self就是变量arr
    return true;
});
```

如：

```js
var
    r,
    arr = ['A', 'B', 'C', 'D', 'A', 'B', 'E', 'F'];
r = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
});

document.write("</br>")
document.write(r)
```

- indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。



##### sort(fn(para1, para2))

可以传入一个比较函数，比较函数应该具有两个参数 a 和 b，其返回值如下：

- 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
- 若 a 等于 b，则返回 0。
- 若 a 大于 b，则返回一个大于 0 的值。

如

```js
var c = [10,20,1,2]
c.sort(function(x,y){
	return x-y
})
document.write(c)// 1,2,10,20
```



#### 1.5 arrow fun

即：

```
x => x * x
```

相当于：

```
function (x) {
    return x * x;
}
```

- 箭头函数相当于匿名函数，并且简化了函数定义。箭头函数有两种格式，一种像上面的，只包含一个表达式，连`{ ... }`和`return`都省略掉了。还有一种可以包含多条语句，这时候就不能省略`{ ... }`和`return`：

```
// 两个参数:
(x, y) => x * x + y * y

// 无参数:
() => 3.14

// 可变参数:
(x, y, ...rest) => {
    var i, sum = x + y;
    for (i=0; i<rest.length; i++) {
        sum += rest[i];
    }
    return sum;
}
```

- 如果要返回一个对象，就要注意，如果是单表达式，这么写的话会报错：

```
// SyntaxError:
x => { foo: x }
```

因为和函数体的`{ ... }`有语法冲突，所以要改为：

```
// ok:
x => ({ foo: x })
```

##### this

**箭头函数和匿名函数有个明显的区别：箭头函数内部的`this`是词法作用域，由上下文确定。**

箭头函数完全修复了`this`的指向，`this`总是指向词法作用域，也就是外层调用者`obj`，如

```js
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = function () {
            return new Date().getFullYear() - this.birth; // this指向window或undefined
        };
        return fn();
    }
};
//而将 fn 换成以下 就正确
var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象

//就不需要 var that = this 的hack了
```

由于`this`在箭头函数中已经按照词法作用域绑定了，所以，用`call()`或者`apply()`调用箭头函数时，无法对`this`进行绑定，即传入的第一个参数被忽略：

```js
var obj = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        var fn = (y) => y - this.birth; // this.birth仍是1990
        return fn.call({birth:2000}, year);
    }
};
obj.getAge(2015); // 25
```



#### 1.6 generator

generator（生成器）是ES6标准引入的新的数据类型。一个generator看上去像一个函数，但可以返回多次。

函数末尾如果没有`return`，就是隐含的`return undefined;`

generator由`function*`定义，并且，除了`return`语句，还可以用`yield`返回多次。如

```javascript
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
```

调用generator对象有两个方法，一是不断地调用generator对象的`next()`方法：

```
var f = fib(5);
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
```

`next()`方法会执行generator的代码，然后，每次遇到`yield x;`就返回一个对象`{value: x, done: true/false}`，然后“暂停”。返回的`value`就是`yield`的返回值，`done`表示这个generator是否已经执行结束了。如果`done`为`true`，则`value`就是`return`的返回值。



第二个方法是直接用`for ... of`循环迭代generator对象，这种方式不需要我们自己判断`done`：

```
for (var x of fib(5)) {
    console.log(x); // 依次输出0, 1, 1, 2, 3
}
```

因为generator可以在执行过程中多次返回，所以它看上去就像一个可以记住执行状态的函数，利用这一点，写一个generator就可以实现需要用面向对象才能实现的功能。



### 2 对象

#### 创建对象

##### 1 构造函数模式

```
function Student(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
}
```

这是一个普通函数，但是在JavaScript中，可以用关键字`new`来调用这个函数，并返回一个对象：

```
var xiaoming = new Student('小明');
xiaoming.name; // '小明'
xiaoming.hello(); // Hello, 小明!

```

*注意*，如果不写`new`，这就是一个普通函数，它返回`undefined`。但是，如果写了`new`，它就变成了一个构造函数，它绑定的`this`指向新创建的对象，并默认返回`this`，也就是说，不需要在最后写`return this;`。













#### 2.1 包装对象

包装对象用`new`创建：

```
var n = new Number(123); // 123,生成了新的包装类型
var b = new Boolean(true); // true,生成了新的包装类型
var s = new String('str'); // 'str',生成了新的包装类型
```

包装类型全部变成了对象。

使用`Number`、`Boolean`和`String`时，没有写`new`时，`Number()`、`Boolean`和`String()`被当做普通函数，把任何类型的数据转换为`number`、`boolean`和`string`类型而不是其包装类型

```
var n = Number('123'); // 123，相当于parseInt()或parseFloat()
typeof n; // 'number'

var b = Boolean('true'); // true
typeof b; // 'boolean'

var b2 = Boolean('false'); // true! 'false'字符串转换结果为true！因为它是非空字符串！
var b3 = Boolean(''); // false

var s = String(123.45); // '123.45'
typeof s; // 'string'
```



#### 2.2 RegExp

- `\d`可以匹配一个数字，`\w`可以匹配一个字母或数字，`\s`可以匹配一个空格

- `'\d\d\d'`可以匹配`'010'`

- `*`表示任意个字符（包括0个），用`+`表示至少一个字符，用`?`表示0个或1个字符，用`{n}`表示n个字符，用`{n,m}`表示n-m个字符

- 更精确地匹配，可以用`[]`表示范围

- `^`表示行的开头，`^\d`表示必须以数字开头。

- `$`表示行的结束，`\d$`表示必须以数字结束。

- `A|B`可以匹配A或B，所以`(J|j)ava(S|s)cript`可以匹配`'JavaScript'`、`'Javascript'`、`'javaScript'`或者`'javascript'`。

- `[0-9a-zA-Z\_]`可以匹配一个数字、字母或者下划线；

- `[a-zA-Z\_\$][0-9a-zA-Z\_\$]{0, 19}`更精确地限制了变量的长度是1-20个字符（前面1个字符+后面最多19个字符）。

- 正则表达式还有提取子串的强大功能。用`()`表示的就是要提取的分组（Group）

  如果正则表达式中定义了组，就可以在`RegExp`对象上用`exec()`方法提取出子串来。

  `exec()`方法在匹配成功后，会返回一个`Array`，第一个元素是正则表达式匹配到的整个字符串，后面的字符串表示匹配成功的子串。

  `exec()`方法在匹配失败时返回`null`。

  ```js
  var re = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
  re.exec('19:05:30'); // ['19:05:30', '19', '05', '30']
  ```

Js 创建正则表达式：

第一种方式是直接通过`/正则表达式/`写出来，第二种方式是通过`new RegExp('正则表达式')`创建一个RegExp对象。

```js
var re1 = /ABC\-001/;
var re2 = new RegExp('ABC\\-001');

re1; // /ABC\-001/
re2; // /ABC\-001/
```

如果使用第二种写法，因为字符串的转义问题，字符串的两个`\\`实际上是一个`\`。



#### 2.3 JSON

1. 序列化

```js
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};

JSON.stringify(xiaoming); // '{"name":"小明","age":14,"gender":true,"height":1.65,"grade":null,"middle-school":"\"W3C\" Middle School","skills":["JavaScript","Java","Python","Lisp"]}'
```

第二个参数控制筛选，可以以数组传入要筛选的 key 或者一个处理函数：

```
JSON.stringify(xiaoming, ['name', 'skills'], '  ');
得到
//{
//  "name": "小明",
//  "skills": [
//    "JavaScript",
//    "Java",
//    "Python",
//    "Lisp"
//]
//}

//或者一个处理函数
function convert(key, value) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    return value;
}

JSON.stringify(xiaoming, convert, '  ');
```

2 反序列化

`JSON.parse()`

同样可以接收一个函数做处理：

```
JSON.parse('{"name":"小明","age":14}', function (key, value) {
    // 把number * 2:
    if (key === 'name') {
        return value + '同学';
    }
    return value;
}); // Object {name: '小明同学', age: 14}
```

#### 2.4 继承

##### 原型继承：

若直接修改原型链：

```
PrimaryStudent.prototype = Student.prototype;
```

`PrimaryStudent`和`Student`共享一个原型对象，新对象无意义。

借助一个中间对象：

```
// PrimaryStudent构造函数:
function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 空函数F:
function F() {
}

// 把F的原型指向Student.prototype:
F.prototype = Student.prototype;

// 把PrimaryStudent的原型指向一个新的F对象，F对象的原型正好指向Student.prototype:
PrimaryStudent.prototype = new F();

// 把PrimaryStudent原型的构造函数修复为PrimaryStudent:
PrimaryStudent.prototype.constructor = PrimaryStudent;

// 继续在PrimaryStudent原型（就是new F()对象）上定义方法：
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};

// 创建xiaoming:
var xiaoming = new PrimaryStudent({
    name: '小明',
    grade: 2
});
xiaoming.name; // '小明'
xiaoming.grade; // 2

// 验证原型:
xiaoming.__proto__ === PrimaryStudent.prototype; // true
xiaoming.__proto__.__proto__ === Student.prototype; // true

// 验证继承关系:
xiaoming instanceof PrimaryStudent; // true
xiaoming instanceof Student; // true
```

![js-proto-extend](http://www.liaoxuefeng.com/files/attachments/001439872160923ca15925ec79f4692a98404ddb2ed5503000/l)

可以进行封装：

```
function inherits(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}
```

JavaScript的原型继承实现方式就是：

1. 定义新的构造函数，并在内部用`call()`调用希望“继承”的构造函数，并绑定`this`；
2. 借助中间函数`F`实现原型链继承，最好通过封装的`inherits`函数完成；
3. 继续在新的构造函数的原型上定义新方法。

##### class继承

###### class 定义对象

```
class Student{
  constructor(name){
  this.name = name;
  }
  hello(){
  document.write('Hello, '+this.name)
  }
}

var me = new Student('FYG')
me.hello();
```

`class`的定义包含了构造函数`constructor`和定义在原型对象上的函数`hello()`（注意没有`function`关键字），这样就避免了`Student.prototype.hello = function () {...}`这样分散的代码。

###### class继承

```js
class PrimaryStudent extends Student {
    constructor(name, grade) {
        super(name); // 记得用super调用父类的构造方法!
        this.grade = grade;
    }

    myGrade() {
        alert('I am at grade ' + this.grade);
    }
}
```

- `extends`则表示原型链对象来源
- `super(para)`来调用父类的构造函数



# 3 BOM & DOM

## BOM & DOM

### navigator

`navigator`的信息可以很容易地被用户修改，所以JavaScript读取的值不一定是正确的。

但这样既可能判断不准确，也很难维护代码。正确的方法是充分利用JavaScript对不存在属性返回`undefined`的特性，直接用短路运算符`||`计算：

```
var width = window.innerWidth || document.body.clientWidth;
```

为了解决这个问题，服务器在设置Cookie时可以使用`httpOnly`，设定了`httpOnly`的Cookie将不能被JavaScript读取。

### DOM

DOM节点是指`Element`，但是DOM节点实际上是`Node`，在HTML中，`Node`包括`Element`、`Comment`、`CDATA_SECTION`等很多种，以及根节点`Document`类型。

根节点`Document`已经自动绑定为全局变量`document`。



##### 改

用`innerHTML`时要注意，是否需要写入HTML。如果写入的字符串是通过网络拿到了，要注意对字符编码来避免XSS攻击

`innerText`不返回隐藏元素的文本，而`textContent`返回所有文本。另外注意IE<9不支持`textContent`。

##### 删

删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的`removeChild`把自己删掉

**删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置。**

**删除多个节点时，要注意`children`属性时刻都在变化**



##### 增

若把文档中一个元素插入到另一个位置，插入的`js`节点已经存在于当前的文档树，因此这个节点首先会从原先的位置删除，再插入到新的位置



## 表单

### 提交

1：通过`<form>`元素的`submit()`方法提交一个表单：

```
<!-- HTML -->
<form id="test-form">
    <input type="text" name="test">
    <button type="button" onclick="doSubmitForm()">Submit</button>
</form>

<script>
function doSubmitForm() {
    var form = document.getElementById('test-form');
    // 可以在此修改form的input...
    // 提交form:
    form.submit();
}
</script>
```

这种方式的缺点是扰乱了浏览器对form的正常提交。浏览器默认点击`<button type="submit">`时提交表单，或者用户在最后一个输入框按回车键。第二种方式是响应`<form>`本身的`onsubmit`事件，在提交form时作修改：

```
<!-- HTML -->
<form id="test-form" onsubmit="return checkForm()">
    <input type="text" name="test">
    <button type="submit">Submit</button>
</form>

<script>
function checkForm() {
    var form = document.getElementById('test-form');
    // 可以在此修改form的input...
    // 继续下一步:
    return true;
}
</script>

```

注意要`return true`来告诉浏览器继续提交，如果`return false`，浏览器将不会继续提交form，这种情况通常对应用户输入有误，提示用户错误信息后终止提交form。

**检查和修改`<input>`时，要充分利用`<input type="hidden">`来传递数据。**

登录表单希望用户输入用户名和口令，但是，安全考虑，提交表单时不传输明文口令，而是口令的MD5

直接修改`<input>`：

```
<!-- HTML -->
<form id="login-form" method="post" onsubmit="return checkForm()">
    <input type="text" id="username" name="username">
    <input type="password" id="password" name="password">
    <button type="submit">Submit</button>
</form>

<script>
function checkForm() {
    var pwd = document.getElementById('password');
    // 把用户输入的明文变为MD5:
    pwd.value = toMD5(pwd.value);
    // 继续下一步:
    return true;
}
</script>

```

这个做法用户输入了口令提交时，口令框的显示会突然从几个`*`变成32个`*`（因为MD5有32个字符）。

要想不改变用户的输入，可以利用`<input type="hidden">`实现：

```
<!-- HTML -->
<form id="login-form" method="post" onsubmit="return checkForm()">
    <input type="text" id="username" name="username">
    <input type="password" id="input-password">
    <input type="hidden" id="md5-password" name="password">
    <button type="submit">Submit</button>
</form>

<script>
function checkForm() {
    var input_pwd = document.getElementById('input-password');
    var md5_pwd = document.getElementById('md5-password');
    // 把用户输入的明文变为MD5:
    md5_pwd.value = toMD5(input_pwd.value);
    // 继续下一步:
    return true;
}
</script>
```

注意到`id`为`md5-password`的`<input>`标记了`name="password"`，而用户输入的`id`为`input-password`的`<input>`没有`name`属性。没有`name`属性的`<input>`的数据不会被提交。



## 文件

**当一个表单包含`<input type="file">`时，表单的`enctype`必须指定为`multipart/form-data`，`method`必须指定为`post`，浏览器才能正确编码并以`multipart/form-data`格式发送表单的数据。**

用JavaScript对`<input type="file">`的`value`赋值是没有任何效果的。当用户选择了上传某个文件后，JavaScript也无法获得该文件的真实路径

上传的文件都由后台服务器处理，JavaScript可以在提交表单时对文件扩展名做检查，以便防止用户上传无效格式的文件：

```
var f = document.getElementById('test-file-upload');
var filename = f.value; // 'C:\fakepath\test.png'
if (!filename || !(filename.endsWith('.jpg') || filename.endsWith('.png') || filename.endsWith('.gif'))) {
    alert('Can only upload image file.');
    return false;
}
```

HTML5的File API提供了`File`和`FileReader`两个主要对象，可以获得文件信息并读取文件

DataURL的形式读取到的文件是一个字符串，类似于`data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...`，常用于设置图像。如果需要服务器端处理，把字符串`base64,`后面的字符发送给服务器并用Base64解码就可以得到原始文件的二进制内容。

# 4 Ajax 和 CORS

跨域： 

- 1  Flash 插件发送 HTTP 请求


- 2 在同源域名下架设一个代理服务器进行转发，js将请求发送到代理服务器

  ```
  '/proxy?url=http://www.sina.com.cn'
  ```

代理服务器再把结果返回，这样就遵守了浏览器的同源策略，需要服务器做额外开发

- 3 JSONP
- 4 CORS





## Ajax

```
var request;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject('Microsoft.XMLHTTP');
}

```

通过检测`window`对象是否有`XMLHttpRequest`属性来确定浏览器是否支持标准的`XMLHttpRequest`。注意，*不能*根据浏览器的`navigator.userAgent`来检测浏览器是否支持某个JavaScript特性，一是因为这个字符串本身可以伪造，二是通过IE版本判断JavaScript特性将非常复杂。

一个例子

```
var request = new ActiveXObject('Microsoft.XMLHTTP'); // 新建Microsoft.XMLHTTP对象

request.onreadystatechange = function () { // 状态发生变化时，函数被回调
    if (request.readyState === 4) { // 成功完成
        // 判断响应结果:
        if (request.status === 200) {
            // 成功，通过responseText拿到响应的文本:
            return success(request.responseText);
        } else {
            // 失败，根据响应码判断失败原因:
            return fail(request.status);
        }
    } else {
        // HTTP请求还在继续...
    }
}

// 发送请求:
request.open('GET', '/api/categories');
request.send();

alert('请求已发送，请等待响应...');
```

#### JSONP 跨域

**JSONP通常以函数调用的形式返回**

在页面中先准备好要返回的函数，然后给页面动态加一个`<script>`节点，相当于动态读取外域的JavaScript资源，最后就等着接收回调了。



```
// 1 准备回调函数  如
function refreshPrice(data) {
    var p = document.getElementById('test-jsonp');
    p.innerHTML = '当前价格：' +
        data['0000001'].name +': ' + 
        data['0000001'].price + '；' +
        data['1399001'].name + ': ' +
        data['1399001'].price;
}


// 2 触发JSONP
function getPrice() {
    var
        js = document.createElement('script'),
        head = document.getElementsByTagName('head')[0],
        self = document.getElementById('dynamic-jsonp');
    if (self) {
        var parent = self.parentElement;    
        parent.removeChild(self);
    }
    js.id = 'dynamic-jsonp';
    js.src = 'http://api.money.126.net/data/feed/0000001,1399001?callback=refreshPrice';
    head.appendChild(js);
}
```



#### CORS 

Cross-Origin Resource Sharing，是HTML5规范定义的如何跨域访问资源。



JavaScript向外域（如sina.com）发起请求后，浏览器收到响应后，首先检查`Access-Control-Allow-Origin`是否包含本域，如果是，则此次跨域请求成功，如果不是，则请求失败，JavaScript将无法获取到响应的任何数据。



假设本域是`my.com`，外域是`sina.com`，只要响应头`Access-Control-Allow-Origin`为`http://my.com`，或者是`*`，本次请求就可以成功。

可见，跨域能否成功，取决于对方服务器是否愿意给你设置一个正确的`Access-Control-Allow-Origin`



上面这种跨域请求，称之为“简单请求”。简单请求包括GET、HEAD和POST（POST的Content-Type类型
仅限`application/x-www-form-urlencoded`、`multipart/form-data`和`text/plain`），并且不能出现任何自定义头（例如，`X-Custom: 12345`），通常能满足90%的需求



对于PUT、DELETE以及其他类型如`application/json`的POST请求，在发送AJAX请求之前，浏览器会先发送一个`OPTIONS`请求（称为preflighted请求）到这个URL上，询问目标服务器是否接受：

```
OPTIONS /path/to/resource HTTP/1.1
Host: bar.com
Origin: http://my.com
Access-Control-Request-Method: POST

```

服务器必须响应并明确指出允许的Method：

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://my.com
Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS
Access-Control-Max-Age: 86400

```

浏览器确认服务器响应的`Access-Control-Allow-Methods`头确实包含将要发送的AJAX请求的Method，才会继续发送AJAX，否则，抛出一个错误。

由于以`POST`、`PUT`方式传送JSON格式的数据在REST中很常见，所以要跨域正确处理`POST`和`PUT`请求，服务器端必须正确响应`OPTIONS`请求。



# 5 promise


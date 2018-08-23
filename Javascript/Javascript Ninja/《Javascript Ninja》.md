# 1 函数
## 基本属性
### 作用域
变量声明的作用域开始于声明的地方，结束于所在函数的结尾，与代码嵌套无关

命名函数的作用域是声明该函数的整个函数范围，与代码嵌套无关

### 调用
**函数有四种调用方式**
- 函数调用
- 方法调用
- 构造器调用，创建一个新对象
- apply(), call()

1. 使用 `()` 操作符调用函数，不会将函数作为对象的一个属性，函数的上下文是 'window'，于是，**函数中使用 this 也指到了 window**

2. 将函数作为对象的一个方法调用时，**该对象就成了函数上下文**，并且在函数内部可以以 `this` 参数的形式访问该对象

> 可以在任意方法中，通过 `this` 引用该方法所属的对象——面向对象编程的基本概念

3. 构造器的目的是通过函数调用初始化**创建新的对象**
虽然这样子的函数也可以赋值给对象属性并且作为方法调用
如
```js
var object = Constructor()
```
但是最终结果是在 `window` 上创建了相关的属性和方法，并将返回的 `window` 对象赋值给了 `object`


**函数调用之间的主要差异是：作为 `this` 参数传递给执行函数的上下文对象的区别**

如
```js
function test () {
    this.prop = "a";
    var prop = "b";
    return this
}
console.log(test());
// 很明显，this.prop 被添加到 window了 因为this定义的，只会被函数的调用方式决定！！！
```
#### 方法调用（将函数视为对象）
js 中的函数可以和对象一样，拥有属性和方法，可以将函数赋值给对象的一个属性，从而创建一个方法调用。

```javascript {cmd="node"}
//  给函数添加属性
var fn = function () {
    console.log("I'm a function");
    fn.prop = "a prop";
    // console.log(fn.prop)
    document.write('<br>')
    document.write(fn.prop)
}
fn.otherProp = "other prop"
fn();
document.write('<br>')
document.write(fn.otherProp)
document.write('<br>')
```

### 参数列表
声明的形参数量大于实际传递进函数的数量，则没有对应参数的形参会被赋值为 `undefined`

#### 可变长度的参数列表

```javascript
function smallest (array) {
    return Math.min.apply(Math, array)
}

document.write(smallest([1,3,2], [3,4,5]))

// 即，用 apply 传入数组参数，就可以不需要在手动对数组做处理
```

注意，`Math.min.apply(Math, array)` 中，将上下文指定为 `Math` 不是必须的，但是可以使代码更清晰

### closure

1. 闭包是函数在创建时允许该自身函数访问并操作该自身函数之外的变量所创建的作用域，闭包可以让函数访问所有存在于该函数声明时所处的作用域中所有的变量和函数。
2. 作用域之外的所有变量，即使是函数声明之后的那些声明，也会包含在闭包之内。
3. 相同作用域内，尚未声明的变量不能提前引用
4. 函数在闭包里面执行的时候，不仅可以在闭包创建的时刻点上看到所有变量的值，还可以对其更新，只要闭包存在，就可以对其修改
```javascript
var outerValue = "outerValue";
var innerFn;
function outer (  ) {
    function inner (para) {
        console.log(para);

        console.log(laterVal);  // undefined 相同作用域内，尚未声明的变量不能提前引用

        var laterVal = "laterVal";
    };
    innerFn = inner
}
var later = "later";
outer();
innerFn(later)
```

## 函数重载
通过对传入的参数特性和个数进行检测，进行不同的操作实现函数重载
### 利用参数个数函数重载

首先 `arguments` 和 `length`

### `arguments` 和 `length`
如，一个合并属性的方法：
```javascript
function merge (root) {
    console.log(root);
    // 将参数列表中从第二项开始的对象都合并到第一项中去
    // 所以，索引从 1 开始
    for (let index = 1; index < arguments.length; index++) {
        for (const key in arguments[index]) {
if (arguments[index].hasOwnProperty(key)) {
    // 而 root ，只是第一个参数（对象），所以，这里 root[key] 会给第一个参数添加新的 key ，并且 这个 key 的 value 为arguments[index][key]
    root[key] = arguments[index][key];
}
        }
    }

    return root
}

var merged = merge(
    {name:"fyg"},
    {age:"25"}
)
```


检测参数有没有传入：
`paramName === undefined`


**`length`** 
obviously， `length` 就是定义时候 声明的命名参数个数

`arguments.length` 就是调用时候传入的参数个数

```javascript
function argTest (argument1, argument2) {
    console.log(`实参 arguments.length :${arguments.length} `);
    console.log(`arguments: ${argument1}, ${argument2}`);
    console.log(`形参 parameter  function.length - argTest.length:${argTest.length} `);
}
argTest("a")
```

如
```javascript
function addMethod(obj, name, fn) {
    var old = obj[name];
    obj[name] = () => {
        if (fn.length == arguments.length) {
 // 这个 arguments.length 是 obj[name] 的，而不是外面那个 addMethod 的
return fn.apply(this, arguments)
        }else if (typeof old == "function") {
return old.apply(this, arguments)
        }
    }
}
// 使用
var ninja = {
    values:["html", "css", "javascript", "feng yanggang"]
}

addMethod(ninja, "find", function () {
    return this.values
});
addMethod(ninja, "find", function ( name ) {
    var ret = [];
    for (let i = 0; i < this.values.length; i++) {
        if (this.values[i].indexOf(name) == 0) {
ret.push(this.values[i]);
        }
    }
    return ret;
});
// 到这里时候，ninja的find上存的是 上面obj[name]那个原来的函数, find 的闭包里面存了 fn 和 old， fn 里面存的是 f(name)，old里面是 obj[name],
// old 的闭包里面存了 第一次传进去的函数
console.log(ninja);
addMethod(ninja, "find", function ( first, last ) {
    var ret = [];
    for (let i = 0; i < this.values.length; i++) {
        if (this.values[i] == (first + " " + last)) {
ret.push(this.values[i]);
        }
    }
    return ret;
});

console.log(ninja);
// 到这里时候，ninja的find上存的是 上面obj[name]那个原来的函数, find 的闭包里面存了 fn 和 old， fn 里面存的是 f(first, last)，old 里面继续是 obj[name],
// old 的闭包里面存了 第二次传进去的函数即 fn(name) 和 old (obj[name]) ，这里套的这个old的闭包里面才是第一次的f() 和 old (undefined)
console.log(ninja.find());
console.log(ninja.find("css"));
console.log(ninja.find("feng","yanggang"));
```

### 函数判定
1 `typeof`
`typeof`：在某些浏览器上表现不一致，如 safari会认为：
`typeof document.body.childNodes == function`

2 toString()

```javascript
function isFunction (fn) {
    return Object.prototype.isString.call(fn) === "[Object Function]";
}
```
`isString()` 会返回 **表示一个对象的内部描述的字符串**
> 不仅仅可以判断是不是函数，还可以判断是不是 String/RegExp/Date 或其他对象


## 缓存 memoring
### 将函数视为对象
```javascript
// 存储一组函数

var store = {
    nextId: 1,
    cache: {},
    add: function (fn) {
        if (!fn.id) {
fn.id = this.nextId++;
(store.cache[fn.id] = fn)
return `function ${fn.name} is added`
        }
    }
};

function ninja() {
    document.write('<br>')
    document.write(ninja.name)
}
ninja()
document.write('<br>')

document.write(store.add(ninja))
document.write('<br>')
document.write(store.add(ninja))
// 只会添加一次 所以报了 undefined
```

### 自记忆函数
```javascript
// 对上面的应用 —— 自记忆函数 memorization
function isPrime(value) {
    if (!isPrime.answer) isPrime.answer = {};
    if (isPrime.answer[value] != null) {
        console.log(isPrime.answer);
        return isPrime.answer[value];
    }
// 前面这两句的意义在于，例如已经运行了一次 isPrime(5),则会将一个 isPrime.answer(5) = true 保存在内存里（从下面的 return 得到），第二次 再次运行isPrime(5)，会直接从上面的 return 取出上次保存的值，而不需要再次计算
    var prime = value != 1;
    for (var i = 2; i < value; i++) {
        if (value % i == 0) {
prime = false;
break;
        }
    }
    return isPrime.answer[value] = prime;
}

document.write("<br>")
document.write(isPrime(5))
```
使用变量也可以缓存

```javascript
function isPrime2(value) {
    if (!cache) var cache;
        if (cache != null) {
return cache;
        }

    var prime = value != 1;
    for (var i = 2; i < value; i++) {
        if (value % i == 0) {
prime = false;
break;
        }
    }
    return cache = prime;
}

console.log(isPrime2(5))
```
上面的记忆方式，都是修改了原函数

或者，**通过不修改原函数来记住现有函数的返回值**

```javascript
 //  memorized
Function.prototype.memorized = function (key) {
    this._value = this._value || {};
    return this._value[key] !== undefined ? this._value[key] : this._value[key] = this.apply(this,
arguments)
}

// 使用
function isPrime(num) {
    var prime = num != 1;
    for (let i = 2; i < num; i++) {
if (num % i === 0) {
    prime = false;
    break
}
    }
    return prime;
}

console.log(isPrime(5))
console.log(isPrime.memorized(5))
console.log(isPrime._value)


// 使用闭包来自动记忆
Function.prototype.momerize = function () {
    var fn = this;
    return function () {
return fn.memorized.apply(fn, arguments)
    }
}

// 使用
var isPrime2 = (function (num) {
    var prime = num != 1;
    for (let i = 2; i < num; i++) {
if (num % i === 0) {
    prime = false;
    break
}
    }
    return prime;
}).momerize();
```



#### 缓存dom
```javascript
// 缓存 dom
function getElements (name) {
    if (!getElements.cache) getElements.cache = {};
    return getElements.cache[name] = getElements.cache[name] || document.getElementsByClassName(name);
}
```

### 伪造数组方法

当除了集合本身，还有别的数据需要保存时，就可以使用对象来伪造数组
```html
<input id="first" type="text" name="" value="">
<input id="second" type="text" name="" value="">

<script>
    var elems = {
        len: 0,
        add(elem) {
Array.prototype.push.call(this, "1")
// push 方法根据 length 属性来决定从哪里开始插入给定的值。如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时。当 length 不存在时，将会创建它。
        },

        // 请千万注意，这里如果这样写
        // gathergather : id => {},
        // 因为箭头函数 封闭了 作用域，所以是访问不到前面的 add 方法的！

        gather(id) {
this.add(document.getElementById(id))
        },
    };

    elems.gather("first");
    console.log(elems.len)
    console.log(elems.length)
    // obviously， push 让length 属性增加了

    elems.gather("second");
    console.log(elems.len)
    console.log(elems.length)

    console.log(elems)
    // 可以看到，创建了索引 0 、 1 并将 push 的值赋给了 0 、1
</script>
```

** `push` 的通用性**
> push 方法有意具有通用性。该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。push 方法根据 length 属性来决定从哪里开始插入给定的值。如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时。当 length 不存在时，将会创建它。

> 唯一的原生类数组（array-like）对象是 Strings，尽管如此，它们并不适用该方法，因为字符串是不可改变的。

> 尽管 obj 不是数组，但是 push 方法成功地使 obj 的 length 属性增长了，就像我们处理一个实际的数组一样
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push


## recursing

判断素数
```js
function isPalindrome(text) {
    if (text.length <= 1) return true;
    if (text.charAt(0) != text.charAt(text.length - 1)) return false;
    return isPalindrome(text.substr(1, text.length - 2))
}


console.log(isPalindrome("calac"));
```

### 方法中的递归
在对象里用方法名字做递归，会有引用丢失的风险：
```js {cmd="node"}
var obj = {
    chirp: function (n) {
        // 注意 这里用的是 obj.chirp 而不是 this.chirp 来自我引用
        return n > 1 ? obj.chirp(n - 1) + (n - 1) + "-chrip" : "chirp-1\n"
    }
}
console.log(obj.chirp(3));
// 于是，做以下操作时，会有引用丢失
var obj2 = {
    chirp: obj.chirp
}
obj = {};
try {
    console.log(obj2.chirp(3))

} catch (error) {
    console.log(error);
}
// 重新给 obj 定义为一个空对象时候，匿名函数仍然存在，而且可以通过 obj2.chirp 引用，但是 obj.chirp 属性已经没有了，而这个函数是通过原来的 obj.chirp 进行递归自我调用的，所以会报错
```
当然，可以用 `this`

```js
var obj3 = {
    chirp: function (n) {
        return n > 1 ? this.chirp(n - 1) + (n - 1) + "-chrip" : "chirp-1\n"
    }
}
var obj4 = {
    chirp: obj3.chirp
}
obj3 = {};
console.log(obj4.chirp(3))
```

或者，用 
#### 内联命名函数
```js {cmd="node"}
var obj5 = {
    chirp: function mark(n) {
        return n > 1 ? mark(n - 1) + (n - 1) + "-chrip" : "chirp-1\n"
    }
}
console.log(obj5.chirp(3));
var obj6 = {
    chirp: obj5.chirp
}
// 于是，做以下操作，清空 obj5对象的 chirp 属性，并不会影响给内联函数取的用于递归调用的名字
obj5 = {};
try {
    console.log(obj6.chirp(3))

} catch (error) {
    console.log(error);
}
```




## currying

> 柯里化是这样的一个转换过程，把接受多个参数的函数变换成接受一个单一参数(译注：最初函数的第一个参数)的函数，如果其他的参数是必要的，返回接受余下的参数且返回结果的新函数
> http://blog.jobbole.com/77956/

```javascript
Function.prototype.curry = function () {
var fn = this,
    args = Array.prototype.slice.call(arguments);

return function () {
    return fn.apply(this, args.concat(
        Array.prototype.slice.call(arguments)
    ))
}
        }


        // 一个更复杂的 分部函数

Function.prototype.partical = function () {
var fn = this,
    args = Array.prototype.slice.call(arguments);
    return function () {
        var arg = 0;
        for (let i = 0; i < args.length && arg < arguments.length; i++) {
            if (args[i] === undefined) {
                args[i] = arguments[arg++];
            }
        }

        return fn.apply(this, args)
    }
}


var delay = setTimeout.partical(undefined, 1000);
  delay(() => {
  console.log("delay for 1s");
})
```


**更多相关的在 curry.md 里面**



## IIFE

来一个奇形怪状的 `IIFE` 展览一下：
```javascript
document.addEventListener('click', (function (e) {
    var numClicks = 0;
    return function () {
        console.log(++numClicks)
    }
})(), false);
```




---

从18-6-12开始

---



# 事件处理
## 事件处理函数
浏览器的事件处理系统会认为函数调用的上下文是事件的**目标元素**，如
```javascript
var btn = {
_click : false,

click : function(){ 
    this._click = true
    console.log(this);
    }
}

var aim = document.getElementById('click');
aim.addEventListener("click", btn.click, false);
// this 打印出来 是 <button> 元素，而非 btn 对象
```

## 集中管理自定义属性
```javascript
<div id="test1" class="test">1</div>
<div id="test2" class="test">2</div>
<div id="test3" class="test">3</div>

(function () {
var cache = {},
    guidCounter = 1,
    expando = 'data'+ (new Date).getTime();

this.getData = function(elem) {
    var guid = elem[expando];
        // elem 上此时还没有 expando 属性，所以是 undefined
    if (!guid) {
        guid = elem[expando] = guidCounter++;
        cache[guid] = {};
    }
    return cache[guid];
};

this.removeData = function(elem) {
    var guid = elem[expando];
    if (!guid) return ;
    delete cache[guid];
    try {
        delete cache[expando];
        
    } catch (error) {
        if (elem.removeAttribute) {
elem.removeAttribute(expando);
        };
    };
};
})()


var a = document.getElementById('test1');

var elems = document.getElementsByTagName('div');

for (var n = 0 ; n<elems.length ;n++ ) {
getData(elems[n]).test = "test by fyg"
}
for (var n = 0 ; n<elems.length ;n++ ) {
console.log("elems"+[n]+" - " + getData(elems[n]).test) 
}
```

## 一个自定义的事件绑定程序
自定义的事件绑定程序可以在处理流程中进行一些拦截操作
```javascript
(function () {
    var nextGuid = 1;
    this.addEvt = function (elem, type, fn) {
        var data = getData(elem);
        if (!data.handlers) {
            data.handlers = {};
        }
        if (!data.handlers[type]) {
            data.handlers[type] = []
        }
        if (!fn.guid) {
            fn.guid = nextGuid++;
        }

        data.handlers[type].push(fn);

        if (!data.dispatcher) {
            data.disabled = false;
            data.dispatcher = function (event) {
                if (data.disabled) return;
                event = event || window.event;
                var handlers = data.handlers[event.type];
                if (handlers) {
                    for (var n = 0; n < handlers.length; n++) {
                        handlers[n].call(elem, event)
                    }
                }
            }
        }

        if (data.handlers[type].length == 1) {
            if (document.addEventListener) {
                document.addEventListener(type, data.dispatcher, false);
            } else if (document.attachEvent) {
                document.attachEvent("on" + type, data.dispatcher)
            }
        }
    }
})()
```

## 手动触发冒泡事件
```javascript
function triggerEvt (parent, event) {
    if(parent && !event.isStopPropagationStopped()){
        triggerEvt(parent, event)
    }
}
```
原理就是除非显式停止冒泡，否则不断递归调用


# ExpReg
`match` 会返回一个包含了所有成功匹配的字符串的数组
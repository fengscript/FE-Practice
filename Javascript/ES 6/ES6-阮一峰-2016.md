# 1 语法提案

任何人都可以向TC39标准委员会提案。一种新的语法从提案到变成正式标准，需要经历五个阶段。每个阶段的变动都需要由TC39委员会批准。

- Stage 0 - Strawman（展示阶段）
- Stage 1 - Proposal（征求意见阶段）
- Stage 2 - Draft（草案阶段）
- Stage 3 - Candidate（候选人阶段）
- Stage 4 - Finished（定案阶段）

[Github.com/tc39/ecma262](https://github.com/tc39/ecma262)

# 2 babel

Babel的配置文件是`.babelrc`，存放在项目的根目录下。

基本格式：

```
{
  "presets": [],
  "plugins": []
}
```

`presets`字段设定转码规则，官方提供以下的规则集，可以根据需要安装。

```
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```

然后，将这些规则加入`.babelrc`。

```
  {
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
  }
```

## 命令行转码

Babel提供`babel-cli`工具，用于命令行转码。

```
$ npm install --global babel-cli

# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

上面代码是在全局环境下，进行Babel转码。这意味着，如果项目要运行，全局环境必须有Babel，也就是说项目产生了对环境的依赖。另一方面，这样做也无法支持不同项目使用不同版本的Babel。

一个解决办法是将`babel-cli`安装在项目之中。

```
# 安装
$ npm install --save-dev babel-cli
```

然后，改写`package.json`。

```
{
  // ...
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel src -d lib"
  },
}
```

转码：

```
$ npm run build
```
## babel-node

`babel-cli`工具自带一个`babel-node`命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。



# 3 let, const

## let

块级作用域内，不存在变量提升，不允许重复声明

严格模式下，ES5 规定函数只能在顶层作用域和函数内声明，其他（if块，循环块）内的声明都会报错

而ES6这种情况可以理解为函数在块级作用域内声明，不会报错



## const

const声明一个只读的常量，所以，一旦声明就要立刻初始化，不能以后赋值

但是 const 声明了一个对象时，只是保证保存的，变量名指向的地址不变，而该地址的数据是可变的

要冻结对象，应 Object.freeze

```
const foo = Object.freeze({})
```



ES6 有6种声明变量的方式： var ，function ，let ，const ，import ，class



# 4 解构赋值

按照一定模式，从数组和对象中提取值，对变量进行赋值

## 变量解构赋值

```
//ES5 
var a=1;
var b=2....

//ES6
var [a,b,c] = [1,2,3]
```



解构不成功时，变量值为 undefined



允许指定默认值：

```
var [foo =true] = [];
foo //true
```

## 对象解构赋值

```
var {foo, bar} = {foo: 'aaa', bar: 'bbb'}
foo // 'aaa'
```

对象的属性没有次序，所以变量必须与属性同名才会取到正确的值



## 函数参数解构赋值

```
function add([x, y]){
  return x+y
}

add([1, 2]); //3
```



## 其他用途

 交换值

```
[x, y] = [y, x]
```

函数返回多个值

```
function name(){
  return [1,2,3];
}
var [a,b,c] = name()
```

提取 JSON

```
var jsonData={
  id:1,
  data:[1,2]
}
let{id, data:num} = jsonData;
console.log(id, num)	//1, [1,2]
```

函数参数默认值

```
jQuery.ajax=function(url, {
  async = true,
  cache = true
}){
  // do sth
}
```

遍历 Map

```
var map = new Map();
map.set('a', 'b')

for(let[key, value] of map){
  //
}
```





# 5 函数扩展

## 指定默认参数

```
// ES5
function log(x,y){
  y=y || 'something'
}

// ES6
function log(x, y='something')
```

也可以与解构赋值默认值结合：

```
function move({x=0, y=1} = {}){
  return [x+y]
}
move({x:3}); //[3,0]
```



## reset参数

形式为： ...name

获取多余参数，将多余参数放入数组，如

```js
	function add(...values){
		let sum = 0;

		for( var val of values){
			sum += val;
		}

		return sum;

	}

	document.write(add(1,2,3))//6
```

rest参数必须放在参数列表最后面



## `...`

rest 参数的逆运算，将一个数组转换为逗号分隔的参数列表

```
function add(x,y){
  return x+y
}
var numbers = [1,2]
add(...numbers) //3
```

## name

function.name 返回函数的函数名



## arrow function

```
var f = v => v;
//
var f = function(v){
  return v;
}
//不需要参数时
var f = () =>v
```

可以与变量结构结合使用：

```
const foo = ({first, last}) => first+' '+last;
```



可以简化表达式：

```
const isEven = n => n%2==0;

[1,2,3].map(x => x*x)
```

**函数体内的 this，会绑定在 定义处的对象上，而不是使用处的对象**



## 函数绑定（ES7)

用来取代(call, apply, bind)

对象 :: 函数

双冒号运算符，会将左边对象作为上下文（this对象），绑给右边的函数，返回原对象

```
foo::bar;
//
bar.bind(foo)
```

因为返回了原对象，可以链式调用



## 尾调用优化

尾调用：函数式编程，某个函数的最后一步调用另一个函数：

```
function f(x){
  return g(x)
}
```

> 函数调用会在内存形成一个调用记录——call frame，保存调用位置和内部变量等信息，如果在A函数内部调用B，那么在A的调用帧上方，会形成一个B的调用帧。
>
> 尾调用是函数的最后一步操作，所以不需要保留外部函数的调用帧，直接用内层函数的调用帧取代外层函数调用帧即可

只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层的调用帧，进行尾调用优化



......





# 6 对象扩展

允许直接写入变量和函数作为对象的属性和方法：

```
var foo = 'bar'
var baz = {foo}
baz //{ foo: 'bar'}
```



方法简写：

```
var o = {
  method(){
    return ..
  }
}
//
..
method:function(){
  return ..
}

```



允许对象字面量时也使用表达式作为属性名：

```
let obj = {
  [a]:1
}
```



方法的name属性，返回函数名



## Object.is()

严格求等

## Object.assign()

合并对象，对属性进行浅复制：

```
Object.assign(target, source1, source2)
```



用途：1. 为对象添加属性

```
calss Point{
  constructor(x, y){
    Object.assign(this. {x, y})
  }
}
```

2. 为对象添加方法

3. 克隆对象

   ```
   function clone(origin){
     return Object.assign({}, origin)
   }
   ```



## 属性遍历

1. for ... in
2. Object.keys(obj)
3. Object.getOwnPropertyNames(obj)
4. Object.getOwnPropertySymbols(pbj)
5. Reflect.ownKeys(obj)
6. Reflect.enumerate(obj)





# 7 Symbal

















# 其他

## 字符串扩展

将unicode字符 将码点放入大括号，就能正确解读超出\u0000——\uFFFF范围的字符

```
"\u{20BB7}"
// "𠮷"
```



# 数组扩展

## Array.from()

将类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）转换为真正的数组

如对

```
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
```

进行转换：

```
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```



实际中，用来将 NodeList 集合 或者 `argument`对象转换为数组：

```
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
  console.log(p);
});
```

**凡是有 Iterator 接口的数据结构都可以进行转换**



## Array.of()

将一组值转换为数组，弥补参数个数不同时，Array() 的行为差异，如

```
new Array(2)		//被认为指定了数组长度
new Array(2,3,4)	//返回由 2,3,4 组成的新数组
```

现在用Array.of():

```
Array.of(2)		//返回新数组 [2]
Array.of(2,3,4)	//返回新数组 [2，3，4]
Array.of(2).length	// 1
```

原理：相当于

```
function ArrayOf(){
  return [].slice.call(arguments);
}
```



## copyWithin()

```
Array.prototype.copyWithin(target, start = 0, end = this.length)
```

当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组



## find()、findIndex()

```
find(function(value, index, arr){
  //
})
```

find(): 返回第一个符合条件的数组成员，找不到则返回 undefined

```
[1, 4, -5, 10].find((n) => n < 0)
// -5
```



findIndex() :找不到则返回 -1

这两个方法都可以发现NaN，弥补了数组的IndexOf方法的不足。

```
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0
```



## fill()

```
new Array(n).fill(endNum, startIndex, endIndex)
```

使用给定值，填充一个数组，数组中已有的元素，会被全部抹去

```
new Array(3).fill(7)
// [7, 7, 7]
```



## entries() 、 keys()、 values()

遍历数组，返回一个 遍历器对象

entries() 遍历键值对，keys() 遍历键名， values() 遍历键值

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```



## includes()

`Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持



# Promise

Promise 里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

从语法上说，Promise是一个对象，从它可以获取异步操作的消息



Promise对象代表一个异步操作，有三种状态：

- Pending（进行中）

- Resolved（已完成，又称Fulfilled）

- Rejected（已失败）。

只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态

无法取消Promise，一旦新建它就会立即执行，无法中途取消

### 基本用法

创建一个 Promise 实例

```
var promise = new Promise(function(resove, reject){
  //Promise 新建后，立即执行
  if(/*异步操作成功*/){
    resolve(value)	//将异步操作的结果作为参数传递出去
  }else{
    reject(error)	
  }
})

/*指定回调函数*/
promise.then(function(value){
 // resolved
}, function(error){
  // reject
})
//其中， reject 部分回调可以省略
```
**`then` 指定的回调，会在当前脚本所有 同步任务执行完才会执行**

就是说：

```
let promise = new Promise(function(resolve, reject) {
	document.write('Set'+"<br>");
	resolve();
});

promise.then(function(){
	document.write('Resolved'+"<br>")
})

document.write('hi'+"<br>")
```

打印的顺序依次为：

```
Set
hi
Resolved
```



### Promise的Ajax

```js
 var getJSON = function (url) { 
  var promise=  new Promise(function (resolve, reject) { 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = handler;
    xhr.responseType = 'json';
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();

    function handler() {
      if(this.readyState !== 4){return}
      if(this.status == 200){
        resolve(this.response);
      }else{
        reject(new Error(this.statusText))
      }
    }
   });
   return promise;
 }
getJSON("???").then(function (json) { 
   console.log('Content:'+json)
 }, function (Error) { 
   console.error('出错',error)
 })
```


### Promise.prototype.then

then() 是定义在原型上的，返回的是一个新的 Promise 实例，所以可以链式调用：

```
getJSON('?.json').then(function(json){
  return getJSON(post.commentURL);
}).then(function(post){
  //
});
```

一个 then 指定的回调函数，返回的是另外一个 Promise 对象时，后面的 then 方法指定的回调函数就会新的 Promise 对象状态发生变化时，再调用自己的回调函数。



### Promise.prototype.catch

是then(null, reject) 的别名，指定发生错误时的回调：

```
getJSON('?.json').then(function(json){
  return getJSON(post.commentURL);
}).catch(function(error){
  //
});
```

then 指定的回调函数运行中抛出错误，也会被 catch 捕获

```js
var promise = new Promiese(function(resolve, reject){
  throw new Error('test')
});
promise.catch(function(error){
  console.log(error)
})

//下面2种等价
var promise = new Promiese(function(resolve, reject){
  try{
    throw new Error('test')
  }catch(e){
    reject(e)
  }
  
});
promise.catch(function(error){
  console.log(error)
})
//2
var promise = new Promiese(function(resolve, reject){
    reject(new Error('test'))
});
promise.catch(function(error){
  console.log(error)
})
```



蛋是，如果 Promise 状态已经变成 Resolved ，即，catch放在 resolve 后面，则抛出错误无效

Promise 对象的错误会 冒泡，一直向后传递，直到被捕获为止，即，总会被下一个 catch 语句捕获，但是如果没有指定 catch，则外层代码不会对错误有反应。

catch返回的是一个新的 Promise 对象，可以继续链式调用 then



### Promise.all()

将多个 Promise 实例，包装成一个新的Promise实例

```
var p = Promise.all([p1, p2, p3])
// 参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是Promise实例
// 若参数不是Promise对象的实例，就会调用Promise.resolve 将参数转为Promise实例，再处理
```

参数中，全部 Resolved， p 才会Resolved，若有任意一个 rejected，p就会rejected



### Promise.race()

```
var p = Promise.race([p1, p2, p3])
```

同all()，不过参数列表中第一个改变状态的 Promise 实例会被传递给 p 的回调函数

如

```js
var p = Promise.race([
fetch('/resource'),
new Promise(function(resolve, reject){
	setTimeout(()=> reject(new Error('request timeout')),
	5000)
	})
])

p.then(response => console.log(response));
p.catch(error => console.log(error))
```



### Promise.resolve() / reject()

将一个对象转化为 Promise 对象，如

```
var jsPromise = Promise.resolve($.ajax('./something.json'))
//等价于
var jsPromise = new Promise(resolve => resolve($.ajax('./something.json')))
```



### 附加方法

#### done()

对 Promise 对象的回调链，不管以 then 还是 catch 结尾，最后要是跑出错误，因为 promise 内部的错误不会冒泡到全局，都有可能无法捕捉到，因此可以自己在回调链的尾端附加一个 done()

```
Promise.prototype.done = function(onFulfilled, onRejected){
  this.then(onFulfilled, onRejected)
 	 .catch(function(reason){
  	//抛出错误
 	 setTimeout(() => { throw reason}, 0);
  });
}
// 使用
asyncFunc().then(f1)
  .catch(r1)
  .then(f2)
  .done()
```



#### finally()

接受一个普通回调函数作为参数，无论 Promise  对象状态如何都必须执行

实现：

```
Promise.prototype.finally = function(callback){
	let P = this.constructor;
	return this.then(
		value => P.resolve(callback()).then(() => value),
		reason => P.resolve(callback()).then(() => {throw	reason})
	)
}
// 使用
server.listen(0)
	.then(function(){
      //
	})
	.finally(server.stop)
```
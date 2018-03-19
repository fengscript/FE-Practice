# Callback
Node.js 异步编程的直接体现就是回调。

异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了。

回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。

例如，我们可以一边读取文件，一边执行其他命令，在文件读取完成后，将文件内容作为回调函数的参数返回。这样在执行代码时就没有阻塞或等待文件 I/O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。


# EventEmitter
Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。

Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。

Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。

Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.

Node.js 使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。

当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。

这个模型非常高效可扩展性非常强，因为webserver一直接受请求而不等待任何读写操作。（这也被称之为非阻塞式IO或者事件驱动IO）

## EventEmitter Class
events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。
- 1 引入模块
- 2 创建事件处理器
- 3 用 on() 来绑定事件
- 4 用 emit() 来触发事件


```javascript
'use strict';
// 1 引入模块
var evt = require('events');
// 2 创建事件处理器
var evtEmitter = new evt.EventEmitter()

var handle = function create() {
    console.log("创建事件")
    evtEmitter.emit("respond")
}

var respondEvt = function () {
    console.log("开启连接");
}
// 3 用 on() 来绑定事件
evtEmitter.on("createEvt",handle)
evtEmitter.on("respond",respondEvt)

// 也可以匿名绑定事件
evtEmitter.on("stop",() => {
    console.log("断开连接");
})
// 4 用 emit() 来触发事件
evtEmitter.emit("createEvt")
evtEmitter.emit("stop")

```

在 Node 应用程序中，执行异步操作的函数将回调函数作为最后一个参数， 回调函数接收错误对象作为第一个参数。

**每个监听器，可以绑定多个事件。监听器触发时，上面的事件依次触发。**

### EventEmitter 的属性
- on(event, listener)
- emit(event, [arg1], [arg2], [...])
- once(event, listener)
- addListner(event, listener)
- removeListener(event, listener)
- removeAllListeners([event])
- listeners(event)

### 类方法

listenerCount(emitter, event) 返回指定事件的监听器数量。


### error
```javascript
var events = require('events'); 
var emitter = new events.EventEmitter(); 
emitter.emit('error'); 
```
如果没有设置遇到 `error` 时要抛出的事件，那么 Node 会把它当作异常，退出程序并输出错误信息

大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，**只要是支持事件响应的核心模块都是 EventEmitter 的子类**。


# Buffer
在处理像 `TCP` 流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 `Buffer` 类，该类用来创建一个专门存放二进制数据的缓存区。

使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。

## 创建 `Buffer` 对象
- Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
- Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
- Buffer.allocUnsafeSlow(size)
- Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
- Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
- Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
- Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例

```javascript
const buf = Buffer.from('runoob', 'ascii');

// 输出 72756e6f6f62
console.log(buf.toString('hex'));

// 输出 cnVub29i
console.log(buf.toString('base64'));
```

支持的字符编码：ascii、utf8、utf16le 、ucs2、base64、latin1、binary、hex


## Read Write
写入缓冲区
`buf.write(string[, offset[, length]][, encoding])`
返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。

从缓冲区读取数据
`buf.toString(string[, offset[, length]][, encoding])`
解码缓冲区数据并使用指定的编码返回字符串。

## 转换
`buf.toJSON()`
将 Node Buffer 转换为 JSON 对象

> 当字符串化一个 Buffer 实例时，JSON.stringify() 会隐式地调用该 toJSON()。
```javascript
const buf3 = Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
    buf3[i] = i + 97;
}

console.log(buf3.toString());
console.log(buf3.toJSON());
console.log(JSON.stringify(buf3.toJSON()));
```


## 其他操作

- `buf.length`
- `Buffer.concat(list[, totalLength])`
- `buf.compare(otherBuffer);` 返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。
- `buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])`
- `buf.slice([start[, end]])`


# Stream
Stream 是一个抽象接口

有四种流类型
- Readable - 可读操作。
- Writable - 可写操作。
- Duplex - 可读可写操作.
- Transform - 操作被写入数据，然后读出结果。

**所有的 Stream 对象都是 EventEmitter 的实例**
常用事件：
- on
- end 没有更多的数据可读时触发。
- error
- finish 所有数据已被写入到底层系统时触发。

无论读写，都要先创建一个流
```javascript
var fs = require("fs``)
var writeStream = fs.createWriteStream(location, 'utf-8');
writeStream.write(Data, Encoding)
// 要打上结束标记
writeStream.end()
//
var readStream = fs.createReadStream(location, encoding)
```

## pipe stream

利用 `pipe` ，可以从一个流中获取数据并将数据传递到另外一个流中
```javascript
var fs=require('fs')

var rs = fs.createReadStream('./a.txt');
var ws = fs.createWriteStream('copied from a.txt')

rs.pipe(ws)
```

管道操作可以链式
```javascript
rs.pipe(fn1)
  .pipe(fn2)
```

# Module
>  Node.js 中存在原生模块和3种文件模块(文件模块缓存区，文件模块缓存，原生模块缓存区) 4 类模块

> 一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。

> node.js 默认后缀为 js

只封装一个对象的话
```javascript
module.exports = function() {
  // ...
}
```

来个图片:![Node 模块系统](http://www.runoob.com/wp-content/uploads/2014/03/nodejs-require.jpg)


# Route

`http` 要为路由提供请求的 URL 和其他需要的 GET 及 POST 参数，随后路由需要根据这些数据来执行相应的代码。

我偷偷摸摸打印了一下：
```javascript
url.parse(req.url)
//
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: null,
  pathname: '/',
  path: '/',
  href: '/'
  }

```

？？？ 毛都没啊


# 全局对象
`Node.js` 中的全局对象是 `global` ( window ),是所有 `全局变量` 的宿主

定义一个全局变量时，这个变量同时也会成为全局对象的属性


## 内置全局变量？

### `__filename`
`__filename` 表示当前正在执行的脚本的文件名。
它将输出文件所在位置的 `绝对路径`，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。

### `__dirname`
`__dirname` 表示当前执行脚本所在的目录。

### `console`
    - .log()
    - .info() 蓝色!
    - .error() 红色×
    - .warn() 黄色!
    - .dir() 
    - .trace() 向标准错误流输出当前的调用栈
    - .assert() 

### `process`
描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口
- `stdout` 标准输出流
- `stderr` 标准错误流
- `stdin` 标准输入流
- `argv` argv 属性返回一个数组，由命令行执行脚本时的各个参数组成。
- `execPath` 返回执行当前脚本的 Node 二进制文件的绝对路径。
- `execArgv` 返回一个数组，成员是命令行下执行脚本时，在Node可执行文件与脚本文件之间的命令行参数。
- `env` 返回一个对象，成员为当前 shell 的环境变量
- `exitCode` 进程退出时的代码，如果进程优通过 process.exit() 退出，不需要指定退出码。
- `version`
- `versions`  node 的版本和依赖
- `config` 包含用来编译当前 node 执行文件的 javascript 配置选项的对象。它与运行 ./configure 脚本生成的 "config.gypi" 文件相同。
- `pid` 进程号
- `title` 进程名，默认值为"node"，可以自定义
- `arch` 当前 CPU 的架构：'arm'、'ia32' 或者 'x64'
- `platform` 运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'
- `mainModule` require.main 的备选方法

方法：
- `abort()` node 退出并生成一个核心文件
- `chdir(directory)`
- `cwd()` 返回当前进程的工作目录
- `getgid()`
- `setgid(id)`
- `getuid()`
- `setuid(id)`
- `getgroups()`
- `setgroups(groups)`
- `initgroups(user, extra_group)`
- `kill(pid[, signal])`
- `memoryUsage()`
- `nextTick(callback)`
- `umask([mask])`
- `uptime()`
- `hrtime()`
- `exit()`
- `beforeExit()`
- `Signal`


# 常用工具

## `util` 
util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心JavaScript 的功能 过于精简的不足。
### `util.inherits`

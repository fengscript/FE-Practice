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


# 常用工具及模块

## `util` 
util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心JavaScript 的功能 过于精简的不足。

### `util.inherits`
实现对象间原型继承的函数

`util.inherits(Sub, Base)`
给 `Sub` 继承 `Base` 在 `原型中` 定义的函数, 构造函数内部创造的属性和函数都不被继承

如：
```javascript
var ut = require('util');

function Base() {
    this.name = "fyg";
    this.age = 26;
    this.sayHi = function () {
        console.log("Hi " + this.name);
    }
}
Base.prototype.showAge = function  () {
    console.log(this.age);
}
function Sub () {
    this.name = "sub"
}

ut.inherits(Sub, Base)

var objBase = new Base();
objBase.showAge();
objBase.sayHi();
console.log(objBase);

var objSub = new Sub();
// objSub.sayHi()
console.log(objSub);
```


### `util.inspect`

`util.inspect(object,[showHidden],[depth],[colors])` 将任意对象转换 为字符串，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。
- showHidden:Boolean
- depth 最大递归的层数,默认为 2 ，null 不限递归层数完整遍历对象
- color:Boolean

```javascript
console.log(ut.inspect(objSub,true,4,true));
```
### `util.isArray(object)`

### `util.isRegExp(object)`

### `util.isDate(object)`

### `util.isError(object)`



## 其他常用模块
### `os`
#### `os.tmpdir()`

#### `os.endianness()`
返回 CPU 的字节序，可能的是 "BE" 或 "LE"

#### `os.type()`

#### `os.platform()`

#### `os.arch()`

#### `os.release()`

#### `os.uptime()`

返回操作系统运行的时间，以秒为单位
#### `os.loadavg()`
返回一个包含 1、5、15 分钟平均负载的数组。

#### `os.totalmem()`

#### `os.freemem()`

#### `os.cpus()`

#### `os.networkInterfaces()`

#### `os.EOL`
定义了操作系统的行尾符的常量


### `path`
提供了一些用于处理文件路径的工具
#### `path.normalize(path)`

#### `path.join([path1][, path2][, ...])`
该方法的主要用于正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。
#### `path.resolve([from ...], to)`
将 to 参数解析为绝对路径。

#### `path.isAbsolute(path)`

#### `path.resolve(from, to)`
将相对路径转为绝对路径

#### `path.dirname(p)`
返回路径中代表文件夹的部分，同 Unix 的 dirname 命令

#### `path.basename(p[, ext])`
返回路径中的最后一部分。同 Unix 命令 bashname

#### `path.extname(p)`
返回路径中文件的后缀名

#### `path.parse(pathString)`
返回路径字符串的对象

#### `path.format(pathObject)`
从对象中返回路径字符串，和 path.parse 相反

#### `path.sep`
平台的文件路径分隔符，'\\' 或 '/'

#### `path.delimiter`
平台的分隔符, `;` 或者 `:`

#### `path.posix`
以 posix 兼容的方式交互提供上述 path 方法

#### `path.win32`
以 win32 兼容的方式交互提供上述 path 方法


### `net`

#### `net.createServer([options][, connectionListener])`
创建一个 TCP 服务器, `connectionListener` 自动给 'connection' 事件创建监听器

#### `net.connect(options[, connectionListener])`
返回一个新的 `net.Socket`，并连接到指定的地址和端口。
当 socket 建立的时候，将会触发 'connect' 事件

#### `net.createConnection(options[, connectionListener])`
创建一个到端口 port 和 主机 host的 TCP 连接。 host 默认为 'localhost'

#### `net.connect(port[, host][, connectListener])`
创建一个端口为 port 和主机为 host的 TCP 连接 。host 默认为 'localhost'。参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'

#### `net.createConnection(port[, host][, connectListener])`
创建一个端口为 port 和主机为 host的 TCP 连接 。host 默认为 'localhost'。参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'

#### `net.connect(path[, connectListener])`
创建连接到 path 的 unix socket 。参数 connectListener 将会作为监听器添加到 'connect' 事件上。返回 'net.Socket'

#### `net.createConnection(path[, connectListener])`
创建连接到 path 的 unix socket 。参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'

#### `net.isIP(input)`
检测输入的是否为 IP 地址。 IPV4 返回 4， IPV6 返回 6，其他情况返回 0

#### `net.isIPv4(input)`
#### `net.isIPv6(input)`


#### `net.Server`
用于创建一个 TCP 或本地服务器

##### `server.listen(port[, host][, backlog][, callback])`
监听指定端口 port 和 主机 host 连接, port 为 0 时，随机分配。

##### `server.listen(handle[, callback])`
##### `server.listen(options[, callback])`
options：端口 port, 主机 host, 和 backlog, 可选 callback
他们在一起调用server.listen(port, [host], [backlog], [callback])。还有，参数 path 可以用来指定 UNIX socket

##### `server.close([callback])`
服务器停止接收新的连接，保持现有连接。
异步，当所有连接结束的时候服务器会关闭，并会触发 'close' 事件

##### `server.address()`
操作系统返回绑定的地址，协议族名和服务器端口

##### `server.unref()`
如果这是事件系统中唯一一个活动的服务器，调用 unref 将允许程序退出。

##### `server.ref()`
如果这是唯一的服务器，在之前被 unref 了的服务器上调用 ref 将不会让程序退出（默认行为）。如果服务器已经被 ref，则再次调用 ref 并不会产生影响。

##### `server.getConnections(callback(err, count))`
异步获取服务器当前活跃连接的数量。当 socket 发送给子进程后才有效

##### 事件
- listening
当服务器调用 server.listen 绑定后会触发。
- connection
当新连接创建后会被触发。socket 是 net.Socket 实例。
- close
服务器关闭时会触发。注意，如果存在连接，这个事件不会被触发直到所有的连接关闭。
- error
发生错误时触发。'close' 事件将被下列事件直接调用。

#### `net.Socket`
net.Socket 对象是 TCP 或 UNIX Socket 的抽象。net.Socket 实例实现了一个双工流接口。
可以在用户创建客户端(使用 connect())时使用, 或者由 Node 创建它们，并通过 connection 服务器事件传递给用户。

##### 事件

- lookup
在解析域名后，但在连接前，触发这个事件。对 UNIX sokcet 不适用。
- connect
成功建立 socket 连接时触发。
- data
当接收到数据时触发。
- end
当 socket 另一端发送 FIN 包时，触发该事件。
- timeout
当 socket 空闲超时时触发，仅是表明 socket 已经空闲。用户必须手动关闭连接。
- drain
当写缓存为空得时候触发。可用来控制上传。
- error
错误发生时触发。
- close
当 socket 完全关闭时触发。参数 had_error 是布尔值，它表示是否因为传输错误导致 socket 关闭。

##### 属性
- socket.bufferSize
该属性显示了要写入缓冲区的字节数。
- socket.remoteAddress
远程的 IP 地址字符串，例如：'74.125.127.100' or '2001:4860:a005::68'。
- socket.remoteFamily
远程IP协议族字符串，比如 'IPv4' or 'IPv6'。
- socket.remotePort
远程端口，数字表示，例如：80 or 21。
- socket.localAddress
网络连接绑定的本地接口 远程客户端正在连接的本地 IP 地址，字符串表示。例如，如果你在监听'0.0.0.0'而客户端连接在'192.168.1.1'，这个值就会是 '192.168.1.1'。
- socket.localPort
本地端口地址，数字表示。例如：80 or 21。
- socket.bytesRead
接收到得字节数。
- socket.bytesWritten
发送的字节数。

##### 方法
- new net.Socket([options])
构造一个新的 socket 对象。
- socket.connect(port[, host][, connectListener])
指定端口 port 和 主机 host，创建 socket 连接 。参数 host 默认为 localhost。通常情况不需要使用 net.createConnection 打开 socket。只有你实现了自己的 socket 时才会用到。
- socket.connect(path[, connectListener])
打开指定路径的 unix socket。通常情况不需要使用 net.createConnection 打开 socket。只有你实现了自己的 socket 时才会用到。
- socket.setEncoding([encoding])
设置编码
- socket.write(data[, encoding][, callback])
在 socket 上发送数据。第二个参数指定了字符串的编码，默认是 UTF8 编码。
- socket.end([data][, encoding])
半关闭 socket。例如，它发送一个 FIN 包。可能服务器仍在发送数据。
- socket.destroy()
确保没有 I/O 活动在这个套接字上。只有在错误发生情况下才需要。（处理错误等等）。
- socket.pause()
暂停读取数据。就是说，不会再触发 data 事件。对于控制上传非常有用。
- socket.resume()
调用 pause() 后想恢复读取数据。
- socket.setTimeout(timeout[, callback])
socket 闲置时间超过 timeout 毫秒后 ，将 socket 设置为超时。
- socket.setNoDelay([noDelay])
禁用纳格（Nagle）算法。默认情况下 TCP 连接使用纳格算法，在发送前他们会缓冲数据。将 noDelay 设置为 true 将会在调用 socket.write() 时立即发送数据。noDelay 默认值为 true。
- socket.setKeepAlive([enable][, initialDelay])
禁用/启用长连接功能，并在发送第一个在闲置 socket 上的长连接 probe 之前，可选地设定初始延时。默认为 false。 设定 initialDelay （毫秒），来设定收到的最后一个数据包和第一个长连接probe之间的延时。将 initialDelay 设为0，将会保留默认（或者之前）的值。默认值为0.
- socket.address()
操作系统返回绑定的地址，协议族名和服务器端口。返回的对象有 3 个属性，比如{ port: 12346, family: 'IPv4', address: '127.0.0.1' }。
- socket.unref()
如果这是事件系统中唯一一个活动的服务器，调用 unref 将允许程序退出。如果服务器已被 unref，则再次调用 unref 并不会产生影响。
- socket.ref()
与 unref 相反，如果这是唯一的服务器，在之前被 unref 了的服务器上调用 ref 将不会让程序退出（默认行为）。如果服务器已经被 ref，则再次调用 ref 并不会产生影响。
















# File System
提供一组类似 `UNIX（POSIX）` 标准的文件操作API
```javascript
var fs = require("fs")
```
`fs` 模块中的所有方法都有同步、异步模式

异步的最后一个参数都是回调函数，回调一般有两个参数：`(err,data)`
- `fs.readFile()`
- `fs.readFileSync()`

## `fs.open()` 打开文件
`fs.open(path, flags[, mode], callback(err,fd))`

- flags - 文件打开的行为
- mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)

flags:
- r     读
- r+    读写
- rs    同步读
- rs+   同步读写
- w     写入，不存在则创建
- wx    若路径存在则创建失败
- w+    读写，不存在则创建  
- wx+   读写，不存在则创建，路径不存在则创建失败   
- a     追加模式，不存在则创建
- ax    同上，路径存在则追加失败
- a+    读取追加，不存在就创建
- ax+   同上，路径存在则追加失败

## `fs.stat()` 获取文件信息
`fs.stat(path, callback(err, stats))`

`stats` 是 `fs.Stats` 对象，里面包含了文件属性，可以通过stats类中的提供方法判断文件的相关属性

如判断是否为文件：
```javascript
fs.stat('a.txt', (err, stats) => {
    console.log(stats.isFile());
})
```

### `stats`类的方法

- `stats.isFile()`
- `stats.isDirectory()`
- `stats.isBlockDevice()`
- `stats.isCharacterDevice()`
- `stats.isSymbolicLink()`
- `stats.isFIFO()`
- `stats.isSocket()`


## `fs.writeFile()` 写入文件
`fs.writeFile(file, data[, options], callback)`

- options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
**默认以 `w` 模式打开文件，若文件存在，则会直接覆盖旧内容**

取决于打开文件时带的 `flags` ，也可以通过 `open` 打开文件指定模式，然后通过 `writeFile` 来写文件
如：
```javascript
fs.open(fileName, "a+", function(err, fd){
    if (err) {
        return console.error(err);
    }
    fs.writeFile(fd, "bb", function(err){
        if (err){
            return console.error(err);
        }
    });
});
```


## `fs.read()` 异步读取
`fs.read(fd, buffer, offset, length, position, callback)`

- fd - 通过 fs.open() 方法返回的文件描述符。
- buffer - 数据写入的缓冲区。
- offset - 缓冲区写入的写入偏移量。
- length - 要从文件中读取的字节数。
- position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
- callback - 三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。


## `fs.close()` 异步关闭
`fs.close(fd, callback)`


```javascript
var buf = new Buffer(256);
console.log("先open");
var open = fs.open("a.txt", 'r+', (err, fd) => {
    if (err) {
        return console.error(err)
    }
    console.log("open成功，开始 read");
    fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
        if (err) {
            return console.error(err)
        }
        console.log("读取了：" + bytes + " bytes")

        // 输出
        if (bytes > 0) {
            console.log(buf.slice(0, bytes).toString())
        }

        // 关闭
        fs.close(fd,err => {
            if (err) {
                return console.error(err)
            }
            console.log("关闭文件");
        })
    })
})
```

### `fs.ftruncate()` 异步截取
`fs.ftruncate(fd, len, callback)`

### `fs.unlink()` 删除
`fs.unlink(path, callback)`

### `fs.mkdir()` 创建目录
`fs.mkdir(path[, mode], callback)`
- mode ：目录权限，默认 0777


### `fs.readdir()` 读取目录
`fs.readdir(path, callback(err, files))`
- files 是目录下文件数组列表


### `fs.rmdir()` 删除目录
`fs.rmdir(path, callback)`
- files 是目录下文件数组列表


# GET/POST
## 获取 `GET` 请求内容

`GET` 请求直接被嵌入在路径中，URL 是完整的请求路径，包括了 ? 后面的部分，因此可以手动解析后面的内容作为 GET 请求的参数, `url` 模块中的 `parse` 函数提供了这个功能

```javascript
url.parse(req.url, true))
```

### 解析 URL 的参数
```javascript
var http = require('http');
var url = require('url');
var ut = require('util');
http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain;charset = utf-8"
    });
    // res.end(ut.inspect(url.parse(req.url, true)))
    var params = url.parse(req.url, true).query;
    res.write("name：" + params.name);
    res.write("\n");
    res.write("age :" + params.age);
    console.log(params);

    res.end();
}).listen(8080)
```


## 获取 `POST` 请求内容
> POST 请求的内容全部的都在请求体中，`http.ServerRequest` 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。
>比如上传文件，而很多时候我们可能并不需要理会请求体的内容，恶意的POST请求会大大消耗服务器的资源，所以 node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。

通过 `req` 的 `data` 事件监听，每次接收到请求体，就累加到 `post` 中
```javascript
var post = '';
req.on('data', chunk => {
    post += chunk;
})
```















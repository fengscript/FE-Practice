1 preview

检查版本

    node -v



在服务器环境下，如果有很多JavaScript文件，每个文件都写上'use strict';很麻烦。我们可以给Nodejs传递一个参数，让Node直接为所有js文件开启严格模式：

    node --use_strict 1.js

2 Module

    module.exports = name;
    // 暴露模块
    
    var newMoudle = require('./name')

如果不加相对目录，只写模块名：

    var greet = require('name');

则Node会依次在内置模块、全局模块和当前模块下查找name.js

CommonJS规范

要在模块中对外输出变量，用：

    module.exports = variable;
    

输出的变量可以是任意对象、函数、数组等等。

要引入其他模块输出的对象，用：

    var foo = require('other_module');

引入的对象具体是什么，取决于引入模块输出的对象。

原理是：把一段JavaScript代码用一个函数包装起来，这段代码的所有“全局”变量就变成了函数内部的局部变量。

多个模块输出：

    function hello() {
        console.log('Hello, world!');
    }
    
    function greet(name) {
        console.log('Hello, ' + name + '!');
    }
    
    module.exports = {
        hello: hello,
        greet: greet
    };

不能直接对 exports 赋值：

    // 代码可以执行，但是模块并没有输出任何变量:
    exports = {
        hello: hello,
        greet: greet
    };

因为，默认情况下，Node准备的exports变量和module.exports变量实际上是同一个变量，并且初始化为空对象{}，可以写：

    exports.foo = function () { return 'foo'; };
    exports.bar = function () { return 'bar'; };

也可以写：

    module.exports.foo = function () { return 'foo'; };
    module.exports.bar = function () { return 'bar'; };

但是，如果要输出的是一个函数或数组，那么，只能给module.exports赋值：

    module.exports = function () { return 'foo'; };
    

给exports赋值是无效的，因为赋值后，module.exports仍然是空对象{}。



3 基本模块

Node.js内置的常用模块就是为了实现基本的服务器功能。这些模块在浏览器环境中是无法被执行的，因为它们的底层代码是用C/C++在Node.js运行环境中实现的。

- 唯一的全局对象： global
- process也是Node.js提供的一个对象，它代表当前Node.js进程，有以下属性和方法：
      process.version;
      'v5.2.0'
      process.platform;
      'darwin'
      process.arch;
      'x64'
      process.cwd(); //返回当前工作目录
      '/Users/michael'
      process.chdir('/private/tmp'); // 切换当前工作目录
      undefined
      process.cwd();
      '/private/tmp'



JavaScript程序是由事件驱动执行的单线程模型，Node.js也不例外。Node.js不断执行响应事件的JavaScript函数，直到没有任何响应事件的函数可以执行时，Node.js就退出了。



要在下一次事件响应中执行代码，可以调用process.nextTick()：

    // process.nextTick()将在下一轮事件循环中调用:
    process.nextTick(function () {
        console.log('nextTick callback!');
    });
    console.log('nextTick was set!');



Node.js进程本身的事件就由process对象来处理。如果我们响应exit事件，就可以在程序即将退出时执行某个回调函数：

    // 程序即将退出时的回调函数:
    process.on('exit', function (code) {
        console.log('about to exit with code: ' + code);
    });

判断javascript执行环节

有很多JavaScript代码既能在浏览器中执行，也能在Node环境执行，但有些时候，程序本身需要判断自己到底是在什么环境下执行的，常用的方式就是根据浏览器和Node环境提供的全局变量名称来判断：

    if (typeof(window) === 'undefined') {
        console.log('node.js');
    } else {
        console.log('browser');
    }



3.1 fs

fs模块就是文件系统模块，负责读写文件，同时提供了异步和同步的方法

异步读取文件

文本文件

按照JavaScript的标准，异步读取一个文本文件的代码如下：

    'use strict';
    
    var fs = require('fs');
    
    fs.readFile('sample.txt', 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });

异步读取时，传入的回调函数接收两个参数

- 正常读取时，err参数为null，data参数为读取到的String。
- 读取发生错误时，err参数代表一个错误对象，data为undefined。

这也是Node.js标准的回调函数：第一个参数代表错误信息，第二个参数代表结果



由于err是否为null就是判断是否出错的标志，所以通常的判断逻辑总是：

    if (err) {
        // 出错了
    } else {
        // 正常
    }



二进制文件

当读取二进制文件时，不传入文件编码时，回调函数的data参数将返回一个Buffer对象。在Node.js中，Buffer对象就是一个包含零个或任意个字节的数组（和Array不同）。

如读取一个图片文件：

    'use strict';
    
    var fs = require('fs');
    
    fs.readFile('sample.png', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            console.log(data.length + ' bytes');
        }
    });



Buffer对象可以和String作转换，例如，把一个Buffer对象转换成String：

    // Buffer -> String
    var text = data.toString('utf-8');
    console.log(text);

或者把一个String转换成Buffer：

    // String -> Buffer
    var buf = new Buffer(text, 'utf-8');
    console.log(buf);



同步读取文件

readFileSync() 不接收回调函数，函数直接返回结果。

用fs模块同步读取一个文本文件的代码如下：

    'use strict';
    
    var fs = require('fs');
    
    var data = fs.readFileSync('sample.txt', 'utf-8');
    console.log(data);

可见，原异步调用的回调函数的data被函数直接返回，函数名需要改为readFileSync，其它参数不变。

如果同步读取文件发生错误，则需要用try...catch捕获该错误：

    try {
        var data = fs.readFileSync('sample.txt', 'utf-8');
        console.log(data);
    } catch (err) {
        // 出错了
    }



写文件

通过fs.writeFile()实现的：

    'use strict';
    
    var fs = require('fs');
    
    var data = 'Hello, Node.js';
    fs.writeFile('output.txt', data, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('ok.');
        }
    });

如果传入的数据是String，默认按UTF-8编码写入文本文件，如果传入的参数是Buffer，则写入的是二进制文件。回调函数由于只关心成功与否，因此只需要一个err参数。

和readFile()类似，writeFile()也有一个同步方法，叫writeFileSync()：

    'use strict';
    
    var fs = require('fs');
    
    var data = 'Hello, Node.js';
    fs.writeFileSync('output.txt', data);

stat

fs.stat()，返回一个Stat对象，能告诉文件或目录的详细信息

    'use strict';
    
    var fs = require('fs');
    
    fs.stat('sample.txt', function (err, stat) {
        if (err) {
            console.log(err);
        } else {
            // 是否是文件:
            console.log('isFile: ' + stat.isFile());
            // 是否是目录:
            console.log('isDirectory: ' + stat.isDirectory());
            if (stat.isFile()) {
                // 文件大小:
                console.log('size: ' + stat.size);
                // 创建时间, Date对象:
                console.log('birth time: ' + stat.birthtime);
                // 修改时间, Date对象:
                console.log('modified time: ' + stat.mtime);
            }
        }
    });

method

- state.isFile()
- state.isDirectory()

property

- state.size
- state.birthtime     // 创建时间
- state.mtime  // 修改时间

同样有一个 stateSync()

由于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，必须使用异步代码，否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。

服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。



3.2 stream

stream是Node.js提供的又一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。

流的特点是数据是有序的，而且必须依次读取，或者依次写入，不能像Array那样随机定位。

有些流用来读取数据，比如从文件读取数据时，可以打开一个文件流，然后从文件流中不断地读取数据。有些流用来写入数据，比如向文件写入数据时，只需要把数据不断地往文件流中写进去就可以了。



在Node.js中，流也是一个对象，只需要响应流的事件就可以：

- data事件表示流的数据已经可以读取了
- end事件表示这个流已经到末尾了，没有数据可以读取了
- error事件表示出错了

createReadStream()

如， 从文件流读取

    'use strict';
    
    var fs = require('fs');
    
    // 打开一个流:
    var rs = fs.createReadStream('sample.txt', 'utf-8');
    
    rs.on('data', function (chunk) {
        console.log('DATA:')
        console.log(chunk);
    });
    
    rs.on('end', function () {
        console.log('END');
    });
    
    rs.on('error', function (err) {
        console.log('ERROR: ' + err);
    });

data事件可能会有多次，每次传递的chunk是流的一部分数据。

createWriteStream

以流的形式写入文件，只需要不断调用write()方法，最后以end()结束：

    'use strict';
    
    var fs = require('fs');
    
    var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
    ws1.write('使用Stream写入文本数据...\n');
    ws1.write('END.');
    ws1.end();
    
    var ws2 = fs.createWriteStream('output2.txt');
    ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
    ws2.write(new Buffer('END.', 'utf-8'));
    ws2.end();

所有可以读取数据的流都继承自stream.Readable，所有可以写入的流都继承自stream.Writable。



pipe

两个流也可以串起来。一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流，这种操作叫pipe，使用Readable流的pipe()方法

用pipe()把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序：

    'use strict';
    
    var fs = require('fs');
    
    var rs = fs.createReadStream('sample.txt');
    var ws = fs.createWriteStream('copied.txt');
    
    rs.pipe(ws);

当Readable流的数据读取完毕，end事件触发后，将自动关闭Writable流。如果我们不希望自动关闭Writable流，需要传入参数：

    readable.pipe(writable, { end: false });

4 http

4.1 httpServer

request对象封装了HTTP请求，我们调用request对象的属性和方法就可以拿到所有HTTP请求的信息

response对象封装了HTTP响应，我们操作response对象的方法，就可以把HTTP响应返回给浏览器

开一个http服务器：

    'use strict';
    
    // 导入http模块:
    var http = require('http');
    
    // 创建http server，并传入回调函数:
    var server = http.createServer(function (request, response) {
        // 回调函数接收request和response对象,
        // 获得HTTP请求的method和url:
        console.log(request.method + ': ' + request.url);
        // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
        response.writeHead(200, {'Content-Type': 'text/html'});
        // 将HTTP响应的HTML内容写入response:
        response.end('<h1>Hello world!</h1>');
    });
    
    // 让服务器监听8080端口:
    server.listen(8080);
    
    console.log('Server is running at http://127.0.0.1:8080/');



4.2 fileServer

可以设定一个目录，上 http server 变为 file server，需要解析request.url中的路径，然后在本地找到对应的文件，把文件内容发送出去就可以了。

url模块，它使用起来非常简单，通过parse()将一个字符串解析为一个Url对象

    'use strict';
    
    var url = require('url');
    
    console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

path 模块构造目录，解析本地文件目录

    'use strict';
    
    var path = require('path');
    
    // 解析当前目录:
    var workDir = path.resolve('.'); // '/Users/michael'
    
    // 组合完整的文件路径:当前目录+'pub'+'index.html':
    var filePath = path.join(workDir, 'pub', 'index.html');
    // '/Users/michael/pub/index.html'
    

实现：

    'use strict';
    //导入HTTP模块
    var
      http = require('http'),
      fs = require('fs'),
      url = require('url'),
      path = require('path');
      
      //从命令行参数获取 root 目录
      var root = path.resolve(process.argv[2] || '.');
      console.log('获取到静态目录： '+root);
      //创建服务器
    var server = http.createServer(function (request, response) { 
        console.log(request.method + ':' + request.url);
      //获取URL的Path 
        var pathname = url.parse(request.url).pathname;
      //获取对应的本地文件路径
        var filePath = path.join(root, pathname);
      //获取文件状态
        fs.stat(filePath, function (err, stats) {
          if (!err && stats.isFile()) {
            console.log('200'+ request.url);
    
            response.writeHead(200)
            fs.createReadStream(filePath).pipe(response)
          }else{
            console.log('404'+request.url)
            response.writeHead(404)
            response.end('404 NOT FOUND')
          }
        })
     })
    
     server.listen(8080)
     console.log('Server is running now at:http://127.0.0.1:8080/');



5 crypto

提供通用的加密和哈希算法

MD5

用一个十六进制的字符串给任意数据一个“签名”

    const crypto = require('crypto');
    
    const hash = crypto.createHash('md5');
    
    // 可任意多次调用update():
    hash.update('Hello, world!');
    hash.update('Hello, nodejs!');
    
    console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544

update()方法默认字符串编码为UTF-8，也可以传入Buffer。

createHash() 也可以指定为更安全的 sha256 、sha512



Hmac

Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥

    const crypto = require('crypto');
    
    const hmac = crypto.createHmac('sha256', 'secret-key');
    
    hmac.update('Hello, world!');
    hmac.update('Hello, nodejs!');
    
    console.log(hmac.digest('hex')); // 80f7e22570...

只要密钥发生了变化，那么同样的输入数据也会得到不同的签名

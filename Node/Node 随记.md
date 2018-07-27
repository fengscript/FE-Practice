# Preview

1. 查找进程对应的 `pid`
```
ps -ef | greep node
kill xxxx
```

2. 同一时间、同一端口只能运行一个 `Node` 应用程序

3. `require` 引入模块




# API
## Modules
### HTTP
#### init
```js
var http = require('http')
```
#### createServer

## Server



# 随记
2018-7-19-22:00

玩钉钉的机器人，给了一个 带`token`的 `API` ，给那个 `API` 发 `utf-8` 的 `POST`（当然有固定格式参数），就可以在钉钉群里面发送通知、消息，然后我开了 `windows` 的 `计划任务`，哈哈哈，就可以定时在群里发消息

1. 计划任务里面， 要执行一个 `node.js` ，`程序或脚本` 填 `powershell`， 参数写的是打开 `powershell`以后做什么，所以我填的是 ：`node E:\工作\post.js`，试了一下，搞定！
2. 用 `node` 发一个 `POST` 时候，恶心了一下午，一直报错，搞了半天，试了 `request`都不行，最后灵机一动，对照钉钉官方给的错误码，检查了一下说是 `未给定参数或者编码错误`，最后把处理数据的从 `node` 自己的 `uerystring.stringify()` 换成了 `JSON.stringify()` ，我擦，成功！

完整如下：
```javascript
var http = require('https');
var querystring = require('querystring');

//  querystring.stringify()
var post_data = JSON.stringify({
    "msgtype": "markdown",
    "markdown": {
        "title": "别发呆了！该发日报了！",
        "text": `# 快点发日报！（提醒双连发）`
    },
    "at": {
        "isAtAll": true
    }
});

// my test token d460dc5698b76fb138cba2f19ee16b4c2c5b1297f84977e6041e55bea8c84abf

const options = {
    hostname: 'oapi.dingtalk.com',
    path: '/robot/send?access_token=7229c29cfbeb1be4f782696cf9cceb1ac7c9f8e067cbc52cd1b95c4fda1762d',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        // 'Content-Length': Buffer.byteLength(post_data)
    },
    data: post_data
};

const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`响应主体: ${chunk}`);
    });
    res.on('end', () => {
        console.log('响应中已无数据。');
    });
});

req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
    console.log(e);
});


for (let index = 0; index < 2; index++) {
    setTimeout(function () {

        const req = http.request(options, (res) => {
            console.log(`状态码: ${res.statusCode}`);
            console.log(`响应头: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`响应主体: ${chunk}`);
            });
            res.on('end', () => {
                console.log('响应中已无数据。');
            });
        });

        // 写入数据到请求主体
        req.write(post_data);
        req.end();
    }, index * 1000);
}
```




## require
require 的过程是同步的，所以这样是错误的:
```javascript
setTimeout(() => {
  module.exports = { a: 'hello' }
}, 0)
```

require 过的文件会加载到缓存，所以多次 require 同一个文件（模块）不会重复加载 

判断是否是程序的入口文件有两种方式: require.main === module（推荐） module.parent === null

### 注意循环引用
循环引用（或循环依赖）简单点来说就是 a 文件 require 了 b 文件，然后 b 文件又反过来 require 了 a 文件。我们用 a->b 代表 b require 了 a。

循环引用并不会报错，导致的结果是 require 的结果是空对象 {}，原因是 b require 了 a，a 又去 require 了 b，**此时 b 还没初始化好，所以只能拿到初始值 {}**。

当产生循环引用时一般有两种方法解决： 
1. 通过分离共用的代码到另一个文件解决，如上面简单的情况，可拆出共用的代码到 c 中，如下:
 c->a 
 c->b 
 
2. 不在最外层 require，在用到的地方 require，通常在函数的内部 

 > 要时刻注意你项目的依赖关系不要过于复杂，哪天你发现一个你明明已经 exports 了的方法报 undefined is not a function，我们就该提醒一下自己：哦，也许是它来了。 -.-
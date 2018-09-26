# 换源加速
```
npm config set registry https://registry.npm.taobao.org 
npm info underscore （如果上面配置正确这个命令会有字符串response）
```

去掉ssl验证 （对Atom下载插件有帮助）

```
npm config set strict-ssl false
```

淘宝源https://npm.taobao.org/



## 换源工具——nrm

```
npm install nrm -g
```

# 一些模块
## 管理不同版本——nvm

```
npm install nvm -g
```

# 踩坑
## `node-gyp` 报错

安装 `sass`、`nodejieba`容易遇到，其中 `nodejieba` 是编译python失败，电脑也装了 `python3.7` 加了环境变量，还是不行，最后靠以下解决：
```bash
npm install -g node-gyp
npm install --global --production windows-build-tools
# 注意第二个需要admin权限，cmd命令需要run as admin。同时第二个的安装时间会比较久
```
注意，需要的时间不是比较久，是 `非常久`，网速良好，安装了大概1 - 1.5个小时，装了一堆 `windows` 开发模块，出来 `python success` 和 `Visual Studio Build Tools success`后才OK，

```bash
---------- Visual Studio Build Tools ----------
Successfully installed Visual Studio Build Tools.
------------------- Python --------------------
Still waiting for installer log file...

Now configuring the Visual Studio Build Tools and Python...

All done!

+ windows-build-tools@5.0.0
added 144 packages from 95 contributors in 40.438s
```





# 随记
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

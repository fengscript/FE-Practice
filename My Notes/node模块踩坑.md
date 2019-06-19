# init
```bash
npm init -y
// 这个 -y 是自己替你回答一堆 yes  不然 init 会问你一堆问题
然后
npm install -S json-server
```




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


# packages.json
## run
```bash
npm run xxx
```
运行写在 `"scripts:{}"`中的指令，如：
```javascript
  "scripts": {
    "start": "react-scripts start",
    "test": "react-scripts test",
    "fyg": "mocha"
  },
```
则：`npm run fyg`

## 勾子
`prexxx` 和 `postxxx`：
```javascript
"scripts": {
    "prefyg": "echo \"xxx \" "
    "fyg": "mocha"
    "postfyg": "xxx"
  },
```

## 版本号信息

major.minor.patch

主版本号.次版本号.修补版本号

version

必须匹配某个版本

如：1.1.2，表示必须依赖1.1.2版

 

>version

必须大于某个版本

如：>1.1.2，表示必须大于1.1.2版

 

>=version

可大于或等于某个版本

如：>=1.1.2，表示可以等于1.1.2，也可以大于1.1.2版本

 

<version

必须小于某个版本 

如：<1.1.2，表示必须小于1.1.2版本

 

<=version

可以小于或等于某个版本

如：<=1.1.2，表示可以等于1.1.2，也可以小于1.1.2版本

 

~version

大概匹配某个版本

如果minor版本号指定了，那么minor版本号不变，而patch版本号任意

如果minor和patch版本号未指定，那么minor和patch版本号任意

如：~1.1.2，表示>=1.1.2 <1.2.0，可以是1.1.2，1.1.3，1.1.4，.....，1.1.n 

如：~1.1，表示>=1.1.0 <1.2.0，可以是同上

如：~1，表示>=1.0.0 <2.0.0，可以是1.0.0，1.0.1，1.0.2，.....，1.0.n，1.1.n，1.2.n，.....，1.n.n

 

^version

兼容某个版本

版本号中最左边的非0数字的右侧可以任意

如果缺少某个版本号，则这个版本号的位置可以任意

如：^1.1.2 ，表示>=1.1.2 <2.0.0，可以是1.1.2，1.1.3，.....，1.1.n，1.2.n，.....，1.n.n

如：^0.2.3 ，表示>=0.2.3 <0.3.0，可以是0.2.3，0.2.4，.....，0.2.n

如：^0.0，表示 >=0.0.0 <0.1.0，可以是0.0.0，0.0.1，.....，0.0.n

 

x-range

x的位置表示任意版本

如：1.2.x，表示可以1.2.0，1.2.1，.....，1.2.n

 

*-range

任意版本，""也表示任意版本

如：*，表示>=0.0.0的任意版本

 

version1 - version2

大于等于version1，小于等于version2

如：1.1.2 - 1.3.1，表示包括1.1.2和1.3.1以及他们件的任意版本

 

range1 || range2

满足range1或者满足range2，可以多个范围

如：<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0，表示满足这3个范围的版本都可以



# Yarn
```bash
yarn                #npm install
yarn add xxx        #npm i xxx --save
yarn global add xxx #npm i -g xxx
yarn remove xxx     #npm uninstall xxx --save
yarn add xxx -dev   #npm i xxx --save-dev
yarn upgrade        #npm update --save
yarn init           #npm init
yarn run            #npm run
yarn cache clean    #npm cache clean
yarn --production  #npm install --production
```




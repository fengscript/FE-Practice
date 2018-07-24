# 准备
这里只记遇到的问题，其他的来自：
http://wiki.jikexueyuan.com/project/express-mongodb-setup-blog/simple-blog.html


## 模版引擎
```javascript
app.set('view engine', 'pug');
```
改了以后会报错说找不到 `error` 视图了，绝望，先这样 。。。
> 建立一个 `error` 模版就OK了


然后建一个 `modles` 文件夹放 和数据库链接、操作的文件 （MVC中的M）


后来我还是换成了 `ejs`。。。。

`ejs` 一样，一定要有一个 `error` 模版让他来吐槽你


## 连接数据库
~~引入mysql模块，然后使用mysql.createPool()创建连接~~
后来我还是换成了 `MongDB`。。。。

## 安装 `MongDB`
安装完以后在 `MongoDB` 主目录下建一个文件夹，然后到 `MongDB > bin` 中命令行运行 `.\mongod --dbpath name` （powershell，所以 `.\` 了）设置刚才那个文件夹为存储目录并启动数据库服务器


## session 配置
`express` 提供了 会话中间件，默认情况下是把用户信息存储在内存中，这里直接存到 `MongoDB`，需要借助 `express-session` 和 `connect-mongo` 这两个第三方中间件，从 `npm` 安装搭配 `--save`

装完以后，`app.js` 插入：
```javascript
// Session
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port
  })
}));
```
`secret` 用来防止篡改 `cookie`

> 18-7-22 这里完了会报错 ` Connection strategy not found` ，是 `Mongodb` 的 store 有问题，按照 mongodb 文档 添加了 ` url: "mongodb://localhost/ForreallKnowledge",`  后貌似可以跑了


## 重写路由

> **官方给出的写法是在 app.js 中实现了简单的路由分配，然后再去 index.js 中找到对应的路由函数，最终实现路由功能。我们不妨把路由控制器和实现路由功能的函数都放到 index.js 里，app.js 中只有一个总的路由接口。**


路由主要有以下规则：
- req.query： 处理 get 请求，获取 get 请求参数
- req.params： 处理 /:xxx 形式的 get 或 post 请求，获取请求参数
- req.body： 处理 post 请求，获取 post 请求体
- req.param()： 处理 get 和 post 请求，但查找优先级由高到低为 req.params→req.body→req.query


## hot-reload
`supervisor` 这个模块可以保存修改的文件时自动重启应用

安装 supervisor 。使用 supervisor 命令启动 app.js： 
`$ supervisor app`



## `crypto` 模块加密密码生成md5

```javascript
 var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
```


用户信息存储在了 `session` 里，以后就可以通过 `req.session.user` 读取用户信息。


## express res.redirect 遇到ajax post失效

所以登录、注册时候用前端的来跳转



----

**我估计是版本问题，这个教程错误百出，实在扛不住，换一份**

----


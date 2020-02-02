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



控制台报错
```bash
Tue, 24 Jul 2018 21:23:31 GMT express-session deprecated undefined resave option; provide resave option at app.js:40:9
Tue, 24 Jul 2018 21:23:31 GMT express-session deprecated undefined saveUninitialized option; provide saveUninitialized option at app.js:40:9
```
给 `app.js`  session 控制添加了


```javascript

  resave: true,
  saveUninitialized: true,


//即
app.use(session({
  secret: env.cookieSecret,
  resave: true,
  saveUninitialized: true,
  key: env.db, //cookie name
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30
  }, //30 days
  store: new MongoStore({
    url: 'mongodb://localhost/' + env.db,
    db: env.db,
    host: env.host,
    port: env.port
  })
}));
```
resave ——重新保存：强制会话保存即使是未修改的。
saveUninitialized——强制“未初始化”的会话保存到存储。



# Other

## environment
`windows` 设置环境变量
```bash
set DEBUG=*
set NODE_ENV=test
node app
```
或者使用 `corss-env`
```bash
npm i cross-env -g
#使用方式：
cross-env NODE_ENV=test node app
```
# config-lite
`config-lite` 是一个轻量的读取配置文件的模块。

实际开发时我们会有许多环境，如本地开发环境、测试环境和线上环境等，不同环境的配置不同（如：MongoDB 的地址）

`config-lite` 会根据环境变量（`NODE_ENV`）的不同加载 `config` 目录下不同的配置文件。如果不设置 `NODE_ENV`，则读取默认的 `default` 配置文件，如果设置了 `NODE_ENV`，则会**合并指定的配置文件和 `default` 配置文件作为配置**，`config-lite` 支持 `.js`、`.json`、`.node`、`.yml`、`.yaml` 后缀的文件。 

> 如果程序以 `NODE_ENV=test node app` 启动，则 `config-lite` 会依次降级查找 `config/test.js`、`config/test.json`、`config/test.node`、`config/test.yml`、`config/test.yaml` 并合并 default 配置;

> 如果程序以 `NODE_ENV=production node app` 启动，则 `config-lite` 会依次降级查找 `config/production.js`、`config/production.json`、`config/production.node`、`config/production.yml`、`config/production.yaml` 并合并 `default` 配置。 

`config-lite` 还支持冒泡查找配置，即从传入的路径开始，从该目录不断往上一级目录查找 config 目录，直到找到或者到达根目录为止。


# app.locals 和 res.locals

express 合并了 3 处的结果后传入要渲染的模板，优先级： `res.render` > `res.locals` > `app.locals`，所以 `app.locals` 和 `res.locals` 几乎没有区别，都用来渲染模板

区别在于： `app.locals `上通常挂载常量信息（如博客名、描述、作者这种不会变的信息），`res.locals` 上通常挂载变量信息，即每次请求可能的值都不一样（如请求者信息，res.locals.user = req.session.user）。
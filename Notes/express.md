
# Router
## 占位符
在路由中
```javascript
router.get("/index:xxx",function(){})
```
时，`:xxx` 就可作为占位符，从页面以 `localhost:3000/users/newParams`的路径访问，可以通过 `req.params.xxx` 取到实际的值。


## redirect
重定向 
   res.redirect('/reg')
- 


# middleware
`middleware` 用来处理请求

一个中间件处理完，可以通过调用 `next()` 传递给下一个中间件，如果没有调用 `next()`，则请求不会往下传递

`express@4` 之前的版本基于 `connect` 这个模块实现的中间件的架构，`express@4` 及以上的版本则移除了对 `connect` 的依赖自己实现了

> 中间件的加载顺序很重要


# session
 `HTTP` 无状态,在服务器记录记录用户状态

- cookie 存储在浏览器（有大小限制），session 存储在服务端（没有大小限制）
- 通常 session 的实现是基于 cookie 的，session id 存储于 cookie 中
- session 更安全，cookie 可以直接在浏览器查看甚至编辑

通过引入 `express-session` 中间件实现对会话的支持：
`app.use(session(options))`

> session 中间件会在 req 上添加 session 对象，即 req.session 初始值为 {}，当我们登录后设置 req.session.user = 用户信息，返回浏览器的头信息中会带上 set-cookie 将 session id 写到浏览器 cookie 中，那么该用户下次请求时，通过带上来的 cookie 中的 session id 我们就可以查找到该用户，并将用户信息保存到 req.session.user。


# flash
用来给用户显示一个操作状态的通知

`connect-flash` 中间件


> connect-flash 是基于 session 实现的，它的原理很简单：设置初始值 req.session.flash={}，通过 req.flash(name, value) 设置这个对象下的字段和值，通过 req.flash(name) 获取这个对象下的值，同时删除这个字段，实现了只显示一次刷新后消失的功能。









# error
`express` 内置了一个默认的错误处理器









## 3.X 环境配置
`app.configure([env], callback)`
当 env 和 app.get('env') (也就是 process.env.NODE_ENV) 匹配时, 调用 callback 。保留这个方法是出于历史原因，后面列出的 if 语句的代码其实更加高效、直接。使用 app.set 配合其它一些配置方法后,没有必要再使用这个方法。
```js
// 所有环境
app.configure(function(){
  app.set('title', 'My Application');
})

// 开发环境
app.configure('development', function(){
  app.set('db uri', 'localhost/dev');
})

// 只用于生产环境
app.configure('production', function(){
  app.set('db uri', 'n.n.n.n/prod');
})
```
更高效且直接的代码如下：
```js
// 所有环境
app.set('title', 'My Application');

// 只用于开发环境
if ('development' == app.get('env')) {
  app.set('db uri', 'localhost/dev');
}

// 只用于生产环境
if ('production' == app.get('env')) {
  app.set('db uri', 'n.n.n.n/prod');
}
```


## 环境变量设为生产环境

将NODE_ENV设置为 "production"
NODE_ENV环境变量指明了应用当前的运行环境（开发或生产）。你可以做的为你的Express提升性能的最简单的事情之一，就是将NODE_ENV设置为“production”。

通过process.env.NODE_ENV 设为 "production"

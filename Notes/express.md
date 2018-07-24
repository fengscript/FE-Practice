# 路由常用API

- 重定向 
   res.redirect('/reg')
- 


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
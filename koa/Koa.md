# preview
1. 安装
```
npm init
npm install koa -g
npm install koa --save
```
或者也可以在 `package.json`
```
{
    "name": "hello-koa2",
    。。。
    "dependencies": {
        "koa": "2.0.0"
    }
}
然后 npm install 补全
```
2. Koa 2.0 使用了 ES7 的 async、next 关键字，需要 babel 转译：
```
npm install babel-cli --save-dev
npm install babel-preset-stage-3 --save-dev
npm install babel-preset-es2015 --save-dev
```
然后修改 `package.json`
```
"scripts": {
	"start": "node app.js",
	"build": "babel -d lib/ src/"
},
```
注意，要在项目文件夹下建立 `src/`来放原始 js文件， `lib/` 放转译后的文件

3. npm run build 会将 src 下的所有 ES6的 js 文件 转译 到 lib

# Koa
koa 是基于 Node的 web 框架，对node的 http进行了封装
Express => Koa 1.0 => Koa 2.0

koa2完全使用Promise并配合async来实现异步。

## 处理请求
```js
async (ctx, next) => {
    await next();
    // 设置response的Content-Type:
		// 可以简写为 ctx.type
    ctx.response.type = 'text/html';
    // 设置response的内容:
    ctx.response.body = '<h1>Hello, koa2!</h1>';
}
```

`ctx`是由 koa 传入的封装了 `request` 和 `response` 的变量

koa把很多 `async` 函数组成一个处理链，每个 `async` 函数都可以做一些自己的事情，然后用 `await next()` 来调用下一个`async`函数。

把每个async函数称为`middleware`，这些`middleware`可以组合起来，完成很多有用的功能。 如：

```js
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});
```
如果一个middleware没有调用await next()，后续的middleware将不再执行

## 处理 url——koa-router
1.
```
npm install koa-router -g
npm install koa-router
```
修改 app.js
```
// require('koa-router')返回的是函数:
const router = require('koa-router')();
```

2.
导入koa-router的语句最后的()是函数调用：
```js
const router = require('koa-router')();
相当于
const fn_router = require('koa-router');
const router = fn_router();
```
### get

使用`router.get('/path', async fn)`来注册一个GET请求。可以在请求路径中使用带变量的 ``/hello/:name`，变量可以通过`ctx.params.name`访问。
```js
const Koa=require('koa');

const router = require('koa-router')();

const app = new Koa();

app.use(async(ctx, next)=>{
	console.log(`Process ${ctx.request.method}, ${ctx.request.url}...`);
	await next();
});

//add url-router
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

//add router middleware
app.use(router.routes());
```

### post
`router.post('/path', async fn)`

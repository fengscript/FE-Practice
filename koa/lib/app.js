function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use((() => {
    var _ref = _asyncToGenerator(function* (ctx, next) {
        yield next();
        ctx.response.type = 'text/html';
        ctx.response.body = '<h1>Hello, koa2!</h1>';
    });

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
})());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
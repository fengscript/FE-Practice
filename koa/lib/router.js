function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Koa = require('koa');

const router = require('koa-router')();

const app = new Koa();

app.use((() => {
	var _ref = _asyncToGenerator(function* (ctx, next) {
		console.log(`Process ${ctx.request.method}, ${ctx.request.url}...`);
		yield next();
	});

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
})());

//add url-router
router.get('/hello/:name', (() => {
	var _ref2 = _asyncToGenerator(function* (ctx, next) {
		var name = ctx.params.name;
		ctx.body = '<h1>Hello ,${name}</h1>';
	});

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
})());

router.get('/', (() => {
	var _ref3 = _asyncToGenerator(function* (ctx, next) {
		ctx.body = '<h1>Index</h1>';
	});

	return function (_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
})());

//add router middleware
app.use(router.routes());

app.listen(3000);
console.log('开启 3000 端口');
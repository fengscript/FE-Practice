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
    ctx.body =`<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

//add router middleware
app.use(router.routes());

app.listen(3000);
console.log('开启 3000 端口');

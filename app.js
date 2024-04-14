const Koa = require('koa');
const { koaBody } = require('koa-body');

const app = new Koa();

// 使用koaBody中间件并传递合适的配置参数
app.use(koaBody());
app.use(async (ctx)=>{
    console.log('=====>',ctx.request.body);
    ctx.body='hello'
})

app.listen(3000);

const Koa=require('koa')
const app=new Koa()
const router=require('./router')

app.use(router.routes())

app.use(ctx=>{
    ctx.body='ok'
})

app.listen(8888,()=>console.log('ok'))
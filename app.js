const Koa=require('koa')

const app=new Koa()

// 3.创建中间件
app.use(ctx=>{
    ctx.response.body='hellow world'
})

app.listen(3000,()=>{
    console.log("当前服务成功");
})
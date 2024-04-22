const Koa=require('koa')
const app=new Koa()
const Redis=require("ioredis")

const redis=new Redis({
    port:6379,
    host:'127.0.0.1'
})
app.use(async ctx=>{
 let result=  await  redis.get("arrList")
   if (!result) {
    const arr=   [
        {id:1,name:'zs'},
        {id:2,name:'ls'},
        {id:3,name:'ws'}
    ]
    result=arr
await redis.set("arrList",JSON.stringify(arr))
   }else{
    result=JSON.parse(result)
   }

   ctx.body= result
})

app.listen(3000,()=>{
    console.log('3000');
})
const Koa=require('koa')

const app=new Koa()

// 3.创建中间件
app.use(ctx=>{
    // get解析
    console.log('=====',ctx.request.query);
    console.log('=====',ctx.query);
    console.log('=====',ctx.request.querystring);

    ctx.response.body='hellow world'
    // post
    let paramsStr=''
    // 1监听原生nnodejs request对象中的data
    // 每次数据都回触发，数据大，触发多次
    ctx.req.on('data',(data)=>{
        paramsStr += data
    })

    // 2 监听 原生nodejs request 对象的end事件
    // 请求结束
    ctx.req.on('end',()=>{
        // console.log(paramsStr);
        const params=new URLSearchParams(paramsStr)
        console.log(params);
        console.log(params.get('phoneNum'));
        console.log(params.has('desc'));
        console.log(params.keys());
    })
})

app.listen(3000,()=>{
    console.log("当前服务成功");
})


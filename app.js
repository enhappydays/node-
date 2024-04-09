const Koa=require('koa')
const path=require('path')
const app=new Koa()
// 导入文件读取
const fs=require('fs')
// 封装读html的函数
function getHtmlFile(filePath){
    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,filePath),(err,data)=>{
            if (err) return reject(err)
            console.log(data.toString());
           resolve(data.toString())      
        })
    })
}
// 读取静态资源
function getimageFile(filePath){
    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,filePath),(err,data)=>{
            if (err) return reject(err)
            console.log(data);
           resolve(data)      
        })
    })
}
// 3.创建中间件
app.use(async(ctx)=>{
    // get解析
    console.log('=====',ctx.request.query);
    console.log('=====',ctx.query);
    console.log('=====',ctx.request.querystring);
   
    // ctx.response.body=await getHtmlFile('./test.html')
    ctx.set('Content-type','image/jpeg')
    ctx.response.body=await getimageFile('./static/1712676580221.png')
    // ctx.response.body=''
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


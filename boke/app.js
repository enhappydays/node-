// 创建基础服务
const Koa = require("koa");
const { default: koaBody } = require("koa-body");//处理post
const router=require('./router') //导入路由
const mongoMiddleWare=require('./middleware/mongodb')//自定义中间件
const koaStatic=require('koa-static') //导入处理静态资源-托管中间件 
const koaCors=require('@koa/cors') //处理跨域问题
const koaError=require('koa-json-error')//统一错误处理和错误输出
// 创建Koa 实例
const app = new Koa();
// 中间件：cors 跨域处理
app.use(koaCors())
// 中间件：静态资源服务
app.use(koaStatic('./static'))
// 中间件：请求体参数处理
app.use(koaBody({
    // 支持文件上传
    multipart: true,
    formidable: {
      //   上传文件保存目录
      uploadDir: "./static/uploads",
      // 保留上传文件原来的后缀名
      keepExtensions: true,
    },
  })
);
// 中间件：统一错误处理和错误输出
app.use(koaError({
    // 自定义接口返回的错误格式
    format(err,obj){
        return {
          code:obj.code||50000,
          message:obj.message||err.message
        }
    }
}))
// 中间件：MongoDB数据库操作辅助  （将mongoClient挂到ctx上）
app.use(mongoMiddleWare())
// 中间件：路由相关
app.use(router.routes())
app.use(router.allowedMethods()) //便于提示的
app.listen(8000, () => {
  console.log("ok");
});

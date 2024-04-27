// 创建基础服务
const Koa = require("koa");
const { default: koaBody } = require("koa-body");//处理post
const router=require('./router') //导入路由
const mongoMiddleWare=require('./middleware/mongodb')
// 创建Koa 实例
const app = new Koa();
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
// 中间件：MongoDB数据库操作辅助  （将mongoClient挂到ctx上）
app.use(mongoMiddleWare())
// 中间件：路由相关
app.use(router.routes())
app.use(router.allowedMethods()) //便于提示的
app.listen(8000, () => {
  console.log("ok");
});

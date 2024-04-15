const Koa = require("koa");
const { koaBody } = require("koa-body");
const koaStatic = require("koa-static");
const views = require("koa-views");
// const Router=require('@koa/router')
const router=require('./router')
const app = new Koa();
// const router=new Router()
// 配置koa-views中间件
// 静态资源
app.use(koaStatic("./public"));
app.use(
  koaBody({
    // 开启上传文件
    multipart: true,
    formidable: {
      // 上传目录
      uploadDir: "./public/upload",
      // 保留后缀
      keepExtensions: true,
    },
  })
);


app.use(router.routes())
app.listen(3000, () => {
  console.log("服务在3000");
});

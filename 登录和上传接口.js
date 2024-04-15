const Koa = require("koa");
const { koaBody } = require("koa-body");
const koaStatic = require("koa-static");
const views = require("koa-views");

const app = new Koa();
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
// 上传接口
app.use((ctx) => {
  if (ctx.method === "POST" && ctx.url === "/login") {
    console.log("dddddd",ctx.request.body);
    const {userName,password}=ctx.request.body
    if (userName=='root') {
        ctx.body = {
            status: 200,
            msg: "登录成功",
           
          };
    }else{
        ctx.body = {
            status: 401,
            msg: "登录失败",
           
          };
    }
  
  }
  if (ctx.method === "POST" && ctx.url === "/upload") {
    console.log("uuuuuu");
    console.log(ctx.request.files.photo.filepath.replace("public", ""));
    const filePath = ctx.request.files.photo.filepath;
    const fileNames = filePath.match(/[^\\]+$/)[0];
   const fileName='/upload/'+fileNames
    // console.log("路径去除文件名后：", pathWithoutFileName);
    console.log("文件名：", fileName);
    // console.log("不带扩展名的文件名：", fileNameWithoutExtension);
    ctx.body = {
      status: 200,
      msg: "上传接口成功",
      imgUrl: fileName,
    };
  }
});

app.use(views(__dirname + "/views", { extension: "ejs" }));

app.use(async (ctx) => {
  const obj = {
    name: "1",
    age: "18",
    friends: ["2", "3", "4"],
  };
  await ctx.render("test1.ejs", obj);
});

app.listen(3000, () => {
  console.log("服务在3000");
});

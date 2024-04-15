const Router=require('@koa/router')

const router=new Router()
router.post('/login',(ctx)=>{
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
  })
  router.post('/upload',(ctx)=>{
    console.log(ctx);
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
  })
  module.exports=router
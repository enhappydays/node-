// controller 中用于提供，路由的处理函数




module.exports={

    async upload(ctx){
        console.log('mongoClient',ctx);
        // 1.原生的抛出错误
        // throw new Error('error')
        // 2.koa封装的抛出错误的函数
        // return ctx.throw({
        //     code:40011,message:'error2'
        // })
    //  解析上传的文件信息
    console.log('ffffff====================',ctx.request.files);
    const file=ctx.request.files.file
    const location=file.filepath.split('static')[1]
        ctx.body={
            code:0,
            message:'上传成功',
            data:{
                location
            }
          }
    }
}
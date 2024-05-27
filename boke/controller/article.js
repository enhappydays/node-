const { createArticle, listArticles, getArticleById, removeArticleById,editArticleById } = require("../service/article");

module.exports={
    // 路由处理函数
    async create(ctx){
        // console.log('mongoClient',ctx.mongoClient);
        // 1.原生的抛出错误
        // throw new Error('error')
        // 2.koa封装的抛出错误的函数
        // return ctx.throw({
        //     code:40011,message:'error2'
        // })
        ctx.verifyParams({
            categoryId:'string',
            title:'string',
            summary:'string',
            content:'string',
        })
        console.log(ctx);
        await createArticle(ctx,ctx.request.body)
    //   const result=await getCurrentUserProfile(ctx)
        ctx.body={
          code:0,
          message:'文章录入成功',
          data:true
        }
    },
    // 分页
    async list(ctx) {
        // 查询文章
        const result = await listArticles(ctx, ctx.query)
    
        // 返回成功的数据
        ctx.body = {
          code: 0,
          message: '获取文章分页数据成功',
          data: result
        }
      },
    // 详情
    async detail(ctx){
   
        const id=ctx.params.id
        const result=await getArticleById(ctx,id)
          // 返回成功的数据
          ctx.body = {
            code: 0,
            message: '获取文章详情成功',
            data: result
          }
    },
    // 删除
    async remove(ctx){
        const id=ctx.params.id
        const result=await removeArticleById(ctx,id)
          // 返回成功的数据
          ctx.body = {
            code: 0,
            message: '删除文章详情成功',
            data: result
          }
    },
    async edit(ctx){
        ctx.verifyParams({
            categoryId:'string',
            title:'string',
            summary:'string',
            content:'string',
        })
        const id=ctx.params.id
        const result=await editArticleById(ctx,id,ctx.request.body)
          // 返回成功的数据
          ctx.body = {
            code: 0,
            message: '编辑文章成功',
            data: result
          }
    }
}
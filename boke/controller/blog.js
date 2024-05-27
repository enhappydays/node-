const { getArticleById } = require("../service/article")
const { listArticleByCategorys } = require("../service/blog")

module.exports={
    // 路由处理函数
    async listArticleByCategory(ctx){
   
        
    const result=await listArticleByCategorys(ctx,ctx.query)
        ctx.body={
          code:0,
          message:'获取分类下的文章成功',
          data:result
        }
    },
 
    // 详情
    async getArticleDetail(ctx){
        
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

const { listArticleByCategorys ,getArticleById} = require("../service/blog")

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
  
}
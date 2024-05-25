
const {getCurrentUserProfile} = require("../service/profile")

module.exports={
    // 路由处理函数
    async getProfile(ctx){
        console.log('mongoClient',ctx.mongoClient);
        // 1.原生的抛出错误
        // throw new Error('error')
        // 2.koa封装的抛出错误的函数
        // return ctx.throw({
        //     code:40011,message:'error2'
        // })
        // ctx.verifyParams({
        //     username:'sss'
        // })
      const result=await getCurrentUserProfile(ctx)
        ctx.body={
          code:0,
          message:'获取个人资料成功',
          data:result
        }
    }
}
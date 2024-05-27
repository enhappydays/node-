
const {getCurrentUserProfile,updateProfileBaseinfo, updateProfilePassWord,updateProfileAvatar} = require("../service/profile")

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
    },
    async updateProfileBaseInfo(ctx){
        console.log('mongoClient',ctx.mongoClient);
        // 1.原生的抛出错误
        // throw new Error('error')
        // 2.koa封装的抛出错误的函数
        // return ctx.throw({
        //     code:40011,message:'error2'
        // })
        ctx.verifyParams({
          nickname:'string'
        })
      const result=await updateProfileBaseinfo(ctx,ctx.request.body)
        ctx.body={
          code:0,
          message:'修改个人资料成功',
          data:result
        }
    },
    async updateProfilePassword(ctx){
        console.log('mongoClient',ctx.mongoClient);
        // 1.原生的抛出错误
        // throw new Error('error')
        // 2.koa封装的抛出错误的函数
        // return ctx.throw({
        //     code:40011,message:'error2'
        // })
        ctx.verifyParams({
          oldPassword:'string',
          newPassword:'string'
        })
    
      await updateProfilePassWord(ctx,ctx.request.body)
        ctx.body={
          code:0,
          message:'修改登录密码成功',
          data:true
        }
    },
    
    async updateProfileAvatar(ctx){
        console.log('mongoClient',ctx.mongoClient);
        // 1.原生的抛出错误
        // throw new Error('error')
        // 2.koa封装的抛出错误的函数
        // return ctx.throw({
        //     code:40011,message:'error2'
        // })
        ctx.verifyParams({
          avatar:'string',
          
        })
    
      await updateProfileAvatar(ctx,ctx.request.body)
        ctx.body={
          code:0,
          message:'修改头像成功',
          data:true
        }
    },

}
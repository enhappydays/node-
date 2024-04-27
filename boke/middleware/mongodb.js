// 自定义中间件：将mongodb 客户端实例，挂载到ctx对象上

// 导入 mongodb 客户端实例
const mongoClient=require('../database/mongodb')

/**
 * 中间件工厂函数
 * 作用：调用该工厂函数，得到一个中间件，可以在任意地方，通过ctx，获取mongoClient 。来操作数据库
 */
module.exports=()=>{
    // 返回真正的中间件函数
    return async (ctx,next)=>{
        ctx.mongoClient=mongoClient
        await next()
    }
}
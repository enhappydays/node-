// controller 中用于提供，路由的处理函数

module.exports={
    // 路由处理函数
    async test(ctx){
        // console.log(ctx.mongoClient);
        // 1.原生的抛出错误
        // throw new Error('error')
        // 2.koa封装的抛出错误的函数
        // return ctx.throw({
        //     code:40011,message:'error2'
        // })
        ctx.verifyParams({
            username:'sss'
        })
        ctx.body={
            msg:'hello test'
        }
    }
}
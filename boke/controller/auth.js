// controller 中用于提供，路由的处理函数

const { doRegister } = require("../service/auth")


module.exports={
    // 路由处理函数
    async register(ctx){
        ctx.verifyParams({
            username:'string',
            nickname:'string',
            password:'string',
        })
console.log('=========',ctx.request);
        // 封装service，统一处理逻辑
        await doRegister(ctx,ctx.request.body)
        ctx.body={
            msg:'hello success'
        }
    }
}


// controller 中用于提供，路由的处理函数

const { doRegister ,generateCaptcha,doLogin} = require("../service/auth")


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
    },

    async captcha(ctx){
        // 生成验证码，将验证码存入数据库
        const result= await generateCaptcha(ctx)
        // 返回成功状态
        ctx.body={
            code:0,
            msg:'验证码获取成功',
            data:result
        }
    },
    async login(ctx){
        // 参数校验
        ctx.verifyParams({
            username:'string',
            password:'string',
            captchaKey:'string',
            captchaCode:'string',
        })
        // 登录，获取token
        const token= await doLogin(ctx,ctx.request.body)

        // 返回成功状态
        ctx.body={
            code:0,
            msg:'登录成功',
            data:token
        }
    }
}


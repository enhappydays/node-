// controller 中用于提供，路由的处理函数

module.exports={
    // 路由处理函数
    async test(ctx){
        ctx.body={
            msg:'hello test'
        }
    }
}
// controller 中用于提供，路由的处理函数

const { getAllCategories } = require("../service/categories");


module.exports={

    async list(ctx){
        console.log('mongoClient',ctx);
        // 1.原生的抛出错误
        // throw new Error('error')
        // 2.koa封装的抛出错误的函数
        // return ctx.throw({
        //     code:40011,message:'error2'
        // })
const result=await getAllCategories(ctx)

        ctx.body={
            code:0,
            message:'获取分类成功',
            data:result
          }
    }
}
const Vue = require('vue')

// 创建vue根实例 工厂函数
module.exports=function createApp(ctx){
    return new Vue({
        // 模板
        template:`
        <div>
        <h1>测试页面: {{pageUrl}}</h1>
        </div>
        `,
        data:{
            pageUrl:ctx.url
        }
    })
}
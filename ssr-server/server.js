// 运行服务
const Koa=require('koa')
const Router= require('@koa/router')
const createAPP=require('./app')
const server=new Koa()
const router=new Router()
// 1导入插件
const Vue = require('vue')
const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer({
  // template 模板: 配置成从 index.template.html 中读取的字符串
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

// 挂载路由，创建一个可以接收任何路径的路由
router.get('/(.*?)',async ctx=>{
    // 2.vue实例 状态单例
    const app=createAPP(ctx)
    // 3.vue渲染成html
    try {
        ctx.body = await renderer.renderToString(app, {
            pageTitle: '服务器测试-pageTitle',
            pageMetas: `
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            `
          })
    } catch (error) {
        console.log('errorerror',error);
        ctx.status=500
        ctx.body='Internal Server Error'
    }
 
})
server.use(router.routes())
server.use(router.allowedMethods())
server.listen(8888)
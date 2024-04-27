// 导入router
const Router=require('@koa/router')
// 导入controller
const homeCtrl=require('../controller/home')
// 创建实例
const router=new Router()

// 配置路由
router.get('/api/test',homeCtrl.test)

// 导出

module.exports=router
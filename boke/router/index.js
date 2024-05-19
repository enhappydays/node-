// 导入router
const Router=require('@koa/router')
// 导入controller
const homeCtrl=require('../controller/home')
const authCtrl=require('../controller/auth')
// 创建实例
const router=new Router()

// 配置路由
router.get('/api/test',homeCtrl.test)
router.post('/api/register',authCtrl.register)


// 导出

module.exports=router
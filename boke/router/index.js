// 导入router
const Router=require('@koa/router')
// 导入controller
const homeCtrl=require('../controller/home')
const authCtrl=require('../controller/auth')
const profileCtrl=require('../controller/profile')
const categoryCtrl=require('../controller/categories')
const uploadCtrl=require('../controller/upload')
// 创建实例
const router=new Router()

// 配置路由
router.get('/api/test',homeCtrl.test)
// 注册登录
router.post('/api/register',authCtrl.register)
router.get('/api/captcha',authCtrl.captcha)
router.post('/api/login',authCtrl.login)
// 通用接口模块
router.get('/api/categories',categoryCtrl.list)
router.post('/api/user/image/upload',uploadCtrl.upload)
// 导出

// 个人信息模块
router.get('/api/user/profile',profileCtrl.getProfile)
module.exports=router
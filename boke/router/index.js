// 导入router
const Router=require('@koa/router')
// 导入controller
const homeCtrl=require('../controller/home')
const authCtrl=require('../controller/auth')
const profileCtrl=require('../controller/profile')
const categoryCtrl=require('../controller/categories')
const uploadCtrl=require('../controller/upload')
const articleCtrl=require('../controller/article')
const blogCtrl=require('../controller/blog')
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
// 文章管理模块
router.post('/api/user/articles',articleCtrl.create)
router.get('/api/user/articles',articleCtrl.list)
router.get('/api/user/articles/:id',articleCtrl.detail)
router.delete('/api/user/articles/:id',articleCtrl.remove)
router.put('/api/user/articles/:id',articleCtrl.edit)
// 导出

// 个人信息模块
router.get('/api/user/profile',profileCtrl.getProfile)
router.put('/api/user/profile/baseinfo',profileCtrl.updateProfileBaseInfo)
router.put('/api/user/profile/password',profileCtrl.updateProfilePassword)
router.post('/api/user/profile/avatar',profileCtrl.updateProfileAvatar)
// 公告博客展示页
router.get('/api/articles',blogCtrl.listArticleByCategory)
router.get('/api/articles/:id',blogCtrl.getArticleDetail)
module.exports=router
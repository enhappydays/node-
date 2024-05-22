import BlogLayoutVue from '../layout/blogLayout.vue'
import MyLayoutVue from '../layout/myLayout.vue'
import SignLayoutVue from '../layout/signLayout.vue'

// 定义路由规则
const routes = [
  // 登录注册是一个架子
  {
    path: '/sign',
    component: SignLayoutVue,
    children: [
      {
        path: 'login',
        component: () => import('@/views/pub/Login/index.vue')
      },
      {
        path: 'register',
        component: () => import('@/views/pub/Register/index.vue')
      }
    ]
  },

  // 首页文章列表 和 文章详情是一个架子
  {
    path: '/',
    component: BlogLayoutVue,
    children: [
      {
        path: '',
        component: () => import('@/views/pub/Home/index.vue')
      },
      {
        path: 'categories/:id',
        component: () => import('@/views/pub/Home/index.vue')
      },
      {
        path: 'articles/:id',
        component: () => import('@/views/pub/ArticleDetail/index.vue')
      }
    ]
  },

  // 我的文章列表 和 我的个人中心是一个架子
  {
    path: '/my',
    component: MyLayoutVue,
    children: [
      {
        path: 'articles',
        component: () => import('@/views/my/ArticleList/index.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/my/UserProfile/index.vue')
      }
    ]
  }
]

// 导出路由
export default routes

import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)

const router = new Router({
  // 预渲染: hash不会带到服务器, 路由信息, 如果用hash会丢失
  // 易错点: 必须用 history 模式
  mode: 'history',
  routes: [
    { path: '/', component: () => import('@/pages/Home')},
    { path: '/about', component: () => import('@/pages/About')}
  ]
})

export default router
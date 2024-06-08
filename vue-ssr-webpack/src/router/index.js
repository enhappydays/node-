import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 也是一个工厂方法, 也需要返回一个新的 Router 实例
export function createRouter() {
  return new Router({
    // 注意: 必须使用 history模式, 兼容前后端
    mode: 'history',

    routes: [
      { path: '/', component: () => import('../views/Home.vue') },
      { path: '/item/:id', component: () => import('../views/Item.vue')}
    ]
  })
}
// 创建 App 实例
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

// 导出一个工厂函数, 用于创建新的应用程序实例
export function createApp() {
  const router = createRouter()
  const store = createStore()

  // 将路由的状态同步到 Vuex store身上
  sync(store, router)

  const app = new Vue({
    render: h => h(App),
    router,
    store
  })

  // 暴露app, router 和 store
  return { app, router, store }
}
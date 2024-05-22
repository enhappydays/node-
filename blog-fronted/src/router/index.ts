import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 导出路由实例
export default router
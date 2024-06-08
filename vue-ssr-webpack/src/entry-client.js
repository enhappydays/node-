// 仅仅运行于浏览器 (将结构挂载到 dom 中去)
import Vue from 'vue'
import { createApp } from './app'

const { app, router, store } = createApp()

// 全局 Mixin
// 作用: 在路由组件的参数变化时, 自调用调用组件的 asyncData 方法
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

// 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中。
// 而在客户端，在挂载到应用程序之前，store 就应该获取到状态
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}


// 调用 router.onReady
// 目的: 我们使用了异步组件, 而路由必须要提前解析配置中的异步组件, 才能正确的匹配组件中可能存在的路由钩子
router.onReady(() => {

  // 添加路由钩子, 处理 asyncData
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const preMatched = router.getMatchedComponents(from)

    // 假定没有不同, 如果真的是多路径匹配下, 组件都是一致的, 直接复用, 无需二次预取
    let diffed = false

    // 记录不同, 记录变化的组件
    // 按照下标, 一一对匹配的组件, 进行比较, 一旦发现不相等, 不一样, 需要重新进行预取
    const actived = matched.filter((c, i) => {
      return diffed || (diffed = (preMatched[i] !== c))
    })

    // 如果确实完全相同, 直接放行
    if(!actived.length) {
      return next()
    }

    // 有组件切换, 重新预渲染解析
    Promise.all(actived.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      next()
    }).catch(next)
  })


  app.$mount('#app')
})
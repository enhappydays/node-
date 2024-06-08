// entry-server.js
import { createApp } from './app'

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    // 设置服务器端 router 的位置
    router.push(context.url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 对于所有匹配的路由组件, 调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有的预取钩子 resolve 后, 我们的 store 已经填充入渲染所需要的状态
        // 这里将状态附加到上下文, 使用 template选项用于renderer, 
        // 状态会自动被序列化成 window.__INITIAL_STATE__, 并注入 HTML
        context.state = store.state
          
        // Promise 应该 resolve 应用程序实例，以便它可以渲染
        resolve(app)
      }).catch(reject)

    }, reject)
  })
}
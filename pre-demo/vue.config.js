const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer // 导入渲染构造函数
const path = require('path')

module.exports = {
  configureWebpack: () => {
    if (process.env.NODE_ENV !== 'production') return

    // 如果是生产环境 (需要预渲染)
    return {
      plugins: [
        new PrerenderSPAPlugin({
          // 生成文件的路径, 预渲染, 将文件生成到哪里去
          // 下面这句话非常重要, 不能配错, 配错就会卡死
          // 注意点: 目录只能有一级, 一旦目录层级多级, 生成时就会卡着不动
          staticDir: path.join(__dirname, 'dist'),
          // 预渲染哪个页面路径, 支持传参, 如果有路由参数, 可以 /about/xx
          routes: ['/', '/about'],
          // 下面这个也很重要, 必须配置 (renderer实例化)
          renderer: new Renderer({
            // 配置渲染时, 显示浏览器, 便于调试
            headless: false,
            // 在 main.js 中, 会触发事件, 在这里定义事件名(需要对应起来)
            // render-event触发, 就意味着, 结构渲染完成了, 解析生成需要生成预渲染文件了
            renderAfterDocumentEvent: 'render-event' 
          })
        })
      ]
    }
  }
}
// 起node服务, 运行打包后的前后端同构代码的
const Koa = require('koa')
const Router = require('@koa/router')

// vue 服务器渲染库
const { createBundleRenderer } = require('vue-server-renderer')

// 处理静态文件的中间件
const serve = require('koa-static')
const mount = require('koa-mount')


// 导入基于webpack构建出的服务器和客户端文件
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

// 模板文件
const template = require('fs').readFileSync('./src/index.template.html', 'utf-8')
// 创建 renderer
const renderer = createBundleRenderer(serverBundle, { template, clientManifest })

const router = new Router()

router.get('/(.*?)', async ctx => {
  try {
    ctx.body = await renderer.renderToString({
      title: '测试SSR代码',
      url: ctx.url
    })
  } catch (err) {
    if (err.code === 404) {
      ctx.status = 404
      ctx.body = 'page not found'
    } else {
      ctx.status = 500
      ctx.body = 'Internal Server Error'
    }
  }
})

const server = new Koa()

// 配置静态文件处理中间件, 将 dist 目录 和 public 目录作为静态资源目录
server.use(mount('/dist', serve('./dist')))
server.use(mount('/public', serve('./public')))

server.use(router.routes())
server.use(router.allowedMethods())

server.listen(8888)
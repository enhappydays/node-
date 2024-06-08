// 后台处理文件, 基于node, 基于vue, 是可以进行结构解析 => 生成 htmlStr => 返回给前端
// 1. 引入 vue
const Vue = require('vue')

// 2. 引入 vue-server-renderer
const { createRenderer } = require('vue-server-renderer')

// 3. 创建服务端的渲染器实例
const renderer = createRenderer()

// 4. 编写 vue 实例, 编写 template 结构
const app = new Vue({
  template: `
    <div>{{ msg }}</div>
  `,
  data: {
    msg: '我是服务器渲染'
  }
})

// 5. 使用渲染器渲染 vue 实例
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.log(err)
})
const baseConfig = require('./webpack.base.config.js')
const { merge } = require('webpack-merge')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  // 将 entry 指向应用程序的 client entry 文件
  entry: './src/entry-client.js',

  plugins: [
    // 此插件会在输出目录中生成 `vue-ssr-client-manifest.json`。
    // 描述客户端依赖信息
    new VueSSRClientPlugin()
  ],
  // 将 webpack 运行时 分割到一个 引导 chunk中
  // 以便可以在之后正确注入异步 chunk
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
})
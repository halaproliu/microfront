const StatsPlugin = require('stats-webpack-plugin')
const prefixer = require('postcss-prefix-selector')
const projectName = 'singleVue2'
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : 'http://localhost:9002',
  css: {
    extract: false,
    loaderOptions: {
      postcss: {
        plugins: [
          prefixer({
            prefix: `#${projectName}`
          })
        ]
      }
    }
  },
  configureWebpack: {
    devtool: 'none', // 不打包sourcemap
    output: {
      library: projectName, // 导出名称
      libraryTarget: 'umd' // 挂载目标,window.singleVue2
    },
    devServer: {
      port: '9002',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
      // disabledHost: true
    },
    plugins: [
      new StatsPlugin('asset-manifest.json', {
        chunkModules: false,
        entryPoints: true,
        source: false,
        chunks: false,
        modules: false,
        assets: false,
        children: false,
        exclude: [/node_modules/]
      })
    ]
  },
  chainWebpack: config => {
    config.externals(['single-spa'])
  }
}
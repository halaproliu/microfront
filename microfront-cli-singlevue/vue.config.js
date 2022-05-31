// const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const StatsPlugin = require('stats-webpack-plugin')
// const packageJson = require('./package.json')
// const projectName = packageJson.name
// const projectVersion = packageJson.version
const projectName = 'singleVue'
module.exports = {
  publicPath: '//localhost:9001',
  css: {
    extract: false
  },
  configureWebpack: {
    // devtool: 'none', // 不打包sourcemap
    output: {
      library: projectName, // 导出名称
      libraryTarget: 'umd' // 挂载目标,window.singleVue
    },
    devServer: {
      port: '9001',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      allowedHosts: 'all'
    },
    plugins: [
      new StatsPlugin('asset-manifest.json', {
        chunkModules: false,
        entryPoints: true,
        source: false,
        chunks:false,
        modules: false,
        assets: false,
        children: false,
        exclude: [/node_modules/]
      })
      // new WebpackManifestPlugin({
      //   fileName: 'asset-manifest.json',
      //   publicPath: './',
      //   generate: (seed, files) => {
      //     const manifestFiles = files.reduce((manifest, file) => {
      //       manifest[file.name] = file.path
      //       return manifest
      //     }, seed)
      //     const entrypoints = []
      //     for (let file of files) {
      //       if (!file.isAsset) {
      //         entrypoints.push(file.path.slice(2))
      //       }
      //     }
      //     return {
      //       build: {
      //         name: projectName,
      //         version: projectVersion
      //       },
      //       files: manifestFiles,
      //       entrypoints
      //     }
      //   }
      // })
    ]
  }
}
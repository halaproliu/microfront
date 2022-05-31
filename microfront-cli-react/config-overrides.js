const { override, addWebpackPlugin, addPostcssPlugins, overrideDevServer } = require('customize-cra')
const StatsPlugin = require('stats-webpack-plugin')
const prefixer = require('postcss-prefix-selector')
const projectName = 'react'
const customizePlugin = () => config => {
  config.output.publicPath = 'http://localhost:9003/'
  config.output.library = projectName
  config.output.libraryTarget = 'umd'
  return config
}

module.exports = {
  webpack: override(
    addWebpackPlugin(new StatsPlugin('asset-manifest.json', {
      chunkModules: false,
      entryPoints: true,
      source: false,
      chunks: false,
      modules: false,
      assets: false,
      children: false,
      exclude: [/node_modules/]
    })),
    addPostcssPlugins([
      prefixer({
        prefix: '#singleReact'
      })
    ]),
    customizePlugin()
  ),
  devServer: overrideDevServer(
    config => {
      config.port = '9003'
      config.headers = config.headers || {}
      config.headers['Access-Control-Allow-Origin'] = '*'
      return config
    }
  )
}
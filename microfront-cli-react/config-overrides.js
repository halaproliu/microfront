const { override, addWebpackPlugin, overrideDevServer } = require('customize-cra')
const StatsPlugin = require('stats-webpack-plugin')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const projectName = 'singleReact'
const customizePlugin = () => config => {
  require("react-app-rewire-postcss")(config, {
    plugins: () => {
      return [
        require("postcss-selector-namespace")({
          namespace() {
            // 前缀，如果有全局样式不需要添加的，也可以在这里过滤
            return `#${projectName}`;
          },
        }),
      ]
    }
  });
  config.output.publicPath = 'http://localhost:9003/'
  config.output.library = projectName
  config.output.libraryTarget = 'umd'
  return config
}

module.exports = {
  webpack: override(
    addWebpackPlugin(
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
    ),
    addWebpackPlugin(
      new ModuleFederationPlugin({
        name: 'singleReact',
        remotes: {
          'commonUtils': 'commonUtils@http://localhost:9004/remoteEntry.js'
        }
      })
    ),
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
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
  config.output.publicPath = `${process.env.REACT_APP_HOST}:${process.env.PORT}/`
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
          'commonUtils': `commonUtils@${process.env.REACT_APP_HOST}:9004/remoteEntry.js`
        }
      })
    ),
    customizePlugin()
  ),
  devServer: overrideDevServer(
    config => {
      config.port = process.env.PORT
      config.headers = config.headers || {}
      config.headers['Access-Control-Allow-Origin'] = '*'
      config.historyApiFallback = true
      return config
    }
  )
}
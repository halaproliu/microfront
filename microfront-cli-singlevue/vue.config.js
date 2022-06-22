const StatsPlugin = require('stats-webpack-plugin')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const projectName = 'singleVue'
// const deps = require('./package.json').dependencies
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : `${process.env.VUE_APP_BASE_URL}:${process.env.VUE_APP_PORT}`,
  css: {
    extract: false
  },
  configureWebpack: {
    output: {
      library: {
        name: projectName, // 导出名称
        type: 'umd' // 挂载目标,window.singleVue
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-react'],
          },
        }
      ]
    },
    devServer: {
      port: process.env.VUE_APP_PORT,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      historyApiFallback: true,
      allowedHosts: 'all'
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'singleVue',
        remotes: {
          'commonUtils': `commonUtils@${process.env.NODE_ENV ? 'http://124.223.2.144' : 'http://localhost'}:9004/remoteEntry.js`
        },
        // shared: {
        //   ...deps,
        //   react: {
        //     singleton: true,
        //     requiredVersion: deps.react,
        //   },
        //   'react-dom': {
        //     singleton: true,
        //     requiredVersion: deps['react-dom'],
        //   },
        // }
      }),
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
}
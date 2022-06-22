const StatsPlugin = require('stats-webpack-plugin')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const projectName = 'singleVue'
// const deps = require('./package.json').dependencies
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'http://124.223.2.144:9001' : 'http://localhost:9001',
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
      port: '9001',
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
          'commonUtils': 'commonUtils@http://localhost:9004/remoteEntry.js'
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
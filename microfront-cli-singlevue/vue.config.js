const StatsPlugin = require('stats-webpack-plugin')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const projectName = 'singleVue'
// const deps = require('./package.json').dependencies
module.exports = {
  publicPath: '//localhost:9001',
  css: {
    extract: false
  },
  configureWebpack: {
    output: {
      library: projectName, // 导出名称
      libraryTarget: 'umd' // 挂载目标,window.singleVue
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
        chunks:false,
        modules: false,
        assets: false,
        children: false,
        exclude: [/node_modules/]
      })
    ]
  },
}
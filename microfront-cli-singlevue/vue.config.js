const path = require('path')
const StatsPlugin = require('stats-webpack-plugin')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const esbuild = require('esbuild')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const projectName = 'singleVue'
// const deps = require('./package.json').dependencies
const prefixer = require('postcss-prefix-selector')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : `${process.env.VUE_APP_BASE_URL}:${process.env.VUE_APP_PORT}`,
  css: {
    extract: false,
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            prefixer({
              prefix: '.singleVue'
            })
          ]
        }
      }
    }
  },
  configureWebpack: {
    output: {
      library: {
        name: projectName, // 导出名称
        type: 'umd' // 挂载目标,window.singleVue
      }
    },
    optimization: {
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2015',
          legalComments: 'none', // 去除注释
          css: true, // 压缩 css
          implementation: esbuild // 自定义 esbuild instance 实现
        })
      ]
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
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
          'commonUtils': `commonUtils@${process.env.VUE_APP_REMOTE_URL}/remoteEntry.js`
        }
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
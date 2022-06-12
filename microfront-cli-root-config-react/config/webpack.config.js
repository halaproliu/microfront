const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const esbuild = require('esbuild')
const { ESBuildMinifyPlugin } = require('esbuild-loader')

const resolve = (dir) => {
  return path.resolve(process.cwd(), dir)
}

module.exports = {
  entry: path.join(process.cwd(), 'src/index'),
  cache: false,

  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: 'http://localhost:9000/',
    filename: '[name].js',
    path: resolve('dist')
  },
  optimization: {
    minimize: true,
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
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  devServer: {
    port: 9000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(mjs|jsx?|tsx?)$/,
        exclude: /node-modules/,
        include: [
          resolve('src')
        ],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx']
    }),
    new WebpackBar(),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin()
  ]
}

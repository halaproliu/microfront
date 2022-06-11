const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const resolve = (dir) => {
  return path.resolve(process.cwd(), dir)
}

module.exports = {
  entry: path.join(__dirname, 'src/index'),
  cache: false,

  mode: 'development',
  devtool: 'source-map',

  optimization: {
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    usedExports: true,
    // splitChunks: {
    //   cacheGroups: {//缓存组，这里是我们表演的舞台，抽取公共模块什么的，都在这个地方
    //     defaultVendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,//优先级
    //       reuseExistingChunk: true,
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true,
    //     },
    //   }
    // }
  },
  output: {
    publicPath: 'http://localhost:9000/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
  devServer: {
    port: 9000,
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
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new WebpackBar(),
    new FriendlyErrorsPlugin(),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin()
  ]
}

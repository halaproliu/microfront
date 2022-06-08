const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index',
  cache: false,

  mode: 'development',
  devtool: "source-map",

  optimization: {
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    usedExports: true
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
    filename: '[name].js'
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"]
  },
  devServer: {
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("@babel/preset-react")]
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
}
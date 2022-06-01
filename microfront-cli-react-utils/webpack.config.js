const path = require('path')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const deps = require('./package.json').dependencies
module.exports = {
  entry: './src/index',
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false
  },
  output: {
    publicPath: 'http://localhost:9004/',
    filename: '[name].js'
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
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
    new HtmlWebpackPlugin({ template: './public/index.ejs' }),
    new ModuleFederationPlugin({
      name: "commonUtils",
      // library: { type: "var" },
      filename: "remoteEntry.js",
      exposes: {
        './MyButton': './src/components/Button'
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
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '.' }
      ]
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: '9004',
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
}
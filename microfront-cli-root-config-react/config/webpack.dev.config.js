const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.js')
const webpack = require('webpack')

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: 'static/js/bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
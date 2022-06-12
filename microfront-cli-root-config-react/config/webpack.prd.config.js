const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.js')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[contenthash:8].js'
  }
})
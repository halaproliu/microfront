module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : 'http://localhost:9000',
  devServer: {
    port: 9000,
    historyApiFallback: true
  }
}
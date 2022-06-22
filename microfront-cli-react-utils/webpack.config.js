const path = require('path')
const minimist = require('minimist')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EslintPlugin = require('eslint-webpack-plugin')
// const deps = require('./package.json').dependencies
const cwd = process.cwd()
const rawArgv = process.argv.slice(2)
const argv = minimist(rawArgv)
const mode = argv.mode
const isPrd = mode === 'production'
const basePath = path.resolve(cwd, `.env${mode ? `.${mode}` : ``}`)
const localPath = `${basePath}.local`
const loadEnv = envPath => {
  try {
    const env = dotenv.config({ path: envPath })
    dotenvExpand(env)
  } catch (err) { }
}

if (mode) {
  const commonPath = path.resolve(cwd, '.env')
  loadEnv(commonPath)
}
loadEnv(basePath)
loadEnv(localPath)
module.exports = {
  entry: './src/index',
  cache: false,

  mode,
  devtool: 'source-map',

  optimization: {
    minimize: false,
  },
  output: {
    publicPath: isPrd ? './' : `http://localhost:${process.env.PORT}/`,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
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
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.ejs' }),
    new ModuleFederationPlugin({
      name: 'commonUtils',
      // library: { type: "var" },
      filename: 'remoteEntry.js',
      exposes: {
        './MyButton': './src/components/Button',
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
    // new EslintPlugin({ fix: true }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true
  },
}

module.exports = {
  compact: false,
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3',
        modules: false
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css' // `style: true` 会加载 less 文件
      }
    ]
  ]
}

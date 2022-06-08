module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
				corejs: "3",
        modules: false
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    ["import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css" // `style: true` 会加载 less 文件
      }
    ]
  ]
}
module.exports = {
  root: true,
  env: {
    browser: true
  },
  parser: '@typescript-eslint/parser', // 指定ESLint解析器
  // extends: [
  //   'plugin:react/recommended', // 使用来自 @eslint-plugin-react 的推荐规则
  //   'plugin:@typescript-eslint/recommended', // 使用来自@typescript-eslint/eslint-plugin的推荐规则
  // ],
  parserOptions: {
    ecmaVersion: 2020, // 允许解析最新的 ECMAScript 特性
    sourceType: 'module', // 允许使用 import
    ecmaFeatures: {
      jsx: true // 允许对JSX进行解析
    }
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'comma-dangle': ['error', 'never'],
    'no-extra-semi': 2,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // console在生产模式不生效
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    indent: [2, 2], // 相同的缩进2
    semi: [0]
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  globals: {}
}

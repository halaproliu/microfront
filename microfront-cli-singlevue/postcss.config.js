module.exports = {
  plugins: {
    'postcss-selector-namespace': {
      namespace(css) {
        console.log(css)
        if (css.includes('element-variables.scss')) return ''
        return '#singleVue'
      }
    }
  }
}
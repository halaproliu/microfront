import Vue from 'vue'
import App from './App.vue'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false
// el 为子项目待挂载到父项目的DOM节点
const vueOptions = {
  el: '#singleVue2',
  render: (h) => h(App),
}

// 主应用注册成功后会在window下挂载singleSpaNavigate方法
// 为了独立运行，避免子项目页面为空，
// 判断如果不在微前端环境下进行独立渲染html
if (!window.singleSpaNavigate) {
  new Vue({
    render: (h) => h(App),
  }).$mount('#app')
}

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: vueOptions,
  handleInstance(app, props) {
    Vue.prototype.$eventBus = props.EventBus
  },
})

let el
export const bootstrap = [
  vueLifecycles.bootstrap,
  () => {
    el = document.getElementById('singleVue2')
    el.classList.add('application-wrappers')
    return Promise.resolve()
  },
]

export const mount = [
  vueLifecycles.mount,
  () => {
    window.requestAnimationFrame(() => el.classList.add('application-mounting'))
    return Promise.resolve()
  },
  
]
export function unmount(props) {
  el.classList.remove('application-mounting')
  return vueLifecycles.unmount(props)
}

export default vueLifecycles

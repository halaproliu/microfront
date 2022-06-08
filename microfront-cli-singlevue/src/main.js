import { h, createApp } from 'vue'
import singleSpaVue from 'single-spa-vue'

import App from './App.vue'
import router from './router'

const appOptions = {
  el: '#singleVue', // 若提供el属性，则挂载在el上，否则是，single-spa-application:${name}上，name为基座项目注册子应用设置的name
  render() {
    return h(App, {
      // single-spa props are available on the "this" object. Forward them to your component as needed.
      // https://single-spa.js.org/docs/building-applications#lifecycle-props
      // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
      /*
      name: this.name,
      mountParcel: this.mountParcel,
      singleSpa: this.singleSpa,
      */
      name: this.name,
      singleSpa: this.singleSpa,
      EventBus: this.EventBus,
    })
  },
}

if (!window.singleSpaNavigate) {
  createApp(App).use(router).mount('#app')
}

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions,
  handleInstance(app) {
    app.use(router)
  },
})

export const bootstrap = [vueLifecycles.bootstrap]

export const mount = [vueLifecycles.mount]
export const unmount = [vueLifecycles.unmount]

export default vueLifecycles

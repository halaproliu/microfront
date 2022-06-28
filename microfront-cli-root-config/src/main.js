import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import App from './App.vue'
import './single-spa-config'
import { getMountedApps, navigateToUrl } from 'single-spa'

Vue.use(ElementUI)
Vue.config.productionTip = false

navigateToUrl('/vue');

    // 切换子系统的时候给body加上对应子系统的 class namespace
window.addEventListener('single-spa:app-change', () => {
  const app = getMountedApps().pop();
  if (app) document.body.className = app;
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

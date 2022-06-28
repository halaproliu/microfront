import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { getMountedApps, navigateToUrl } from 'single-spa'
import './single-spa.config'

navigateToUrl('/vue');

    // 切换子系统的时候给body加上对应子系统的 class namespace
window.addEventListener('single-spa:app-change', () => {
  const app = getMountedApps().pop();
  if (app) document.body.className = app;
});

createApp(App).use(ElementPlus).mount('#app')

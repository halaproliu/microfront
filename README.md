# 基于single-spa的微前端demo项目

# microfront-cli-root-config

基座项目
地址：http://localhost:9000

# microfront-cli-react

react子项目
地址：http://localhost:9003

# microfront-cli-singlevue

vue3.0子项目
地址：http://localhost:9001

# microfront-cli-singlevue2

vue2.0子项目
地址：http://localhost:9002

# 子项目接入

### vue3子项目接入

- 安装依赖

```js
npm install single-spa single-spa-vue
npm install stats-webpack-plugin -D

or

yarn add single-spa single-spa-vue
yarn add stats-webpack-plugin -D
```

- 修改src/main.js

```js
import { h, createApp } from 'vue';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';
import router from './router';

const appOptions = {
  el: '#singleVue', // 微应用在基座应用挂载的dom节点
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
    });
  }
}

// 当在微前端模式时，window.singleSpaNavigate存在
if (!window.singleSpaNavigate) {
  createApp(App).use(router).mount('#app')
}

// 导出生命周期
const vueLifecycles = singleSpaVue({
  createApp,
  appOptions,
  handleInstance(app) {
    app.use(router);
  },
});


export const bootstrap = [
  vueLifecycles.bootstrap
]

export const mount = [
  vueLifecycles.mount
]
export const unmount = [
  vueLifecycles.unmount
];

export default vueLifecycles;

```

- 生成manifest.json

```js
npm install stats-webpack-plugin -D
or
yarn add stats-webpack-plugin -D
```

- 修改vue.config.js

  - 修改publicPath为指定地址：http://localhost:{port}
  - 修改output.library


```js
const StatsPlugin = require('stats-webpack-plugin')
const projectName = 'singleVue'
module.exports = {
  publicPath: '//localhost:9001',
  css: {
    extract: false
  },
  configureWebpack: {
    output: {
      library: {
        name: projectName, // 导出名称
        type: 'umd' // 挂载目标,window.singleVue
      }
    },
    devServer: {
      port: '9001',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      allowedHosts: 'all'
    },
    plugins: [
      new StatsPlugin('asset-manifest.json', {
        chunkModules: false,
        entryPoints: true,
        source: false,
        chunks:false,
        modules: false,
        assets: false,
        children: false,
        exclude: [/node_modules/]
      })
    ]
  },
}
```

- css隔离

```js
npm install postcss-selector-namespace -D
or
yarn add postcss-selector-namespace -D
```

```js
// postcss.config.js
module.exports ={
  plugins:{
    'postcss-selector-namespace':{
      namespace(){
        return '#singleVue' // 为所有css添加#singleVue前缀
      }
    }
  }
}
```

- 在基座项目添加配置

  - microfront-cli-root-config/src/appConfig.js
  - microfront-cli-root-config/src/App.vue
    template添加子应用挂载的dom对应id
  - microfront-cli-root-config/src/router/index.js
    添加子应用对应的路由（否则无法正确展示子应用）


### 部署云服务器

# 创建docker network
docker network create microapp
cd microfront-cli-root-config
docker build -t root-config .
docker run -d --network microapp -p 9000:80 root-config

docker build -t singlevue .
docker run -d --network microapp -p 9001:80 singlevue

### 更新配置
docker cp nginx/default.conf root-config:/etc/nginx/conf.d
docker cp dist root-config:/usr/share/nginx/html/
docker restart root-config
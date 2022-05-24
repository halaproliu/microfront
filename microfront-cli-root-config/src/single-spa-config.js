import { registerApplication, start } from 'single-spa'; //导入single-spa
import axios from 'axios'
import AppConfig from './appConfig'

/**
 * @name 加载异步js
 * @description 一个promise同步方法。可以代替创建一个script标签，然后加载服务
 * @param {*} url 
 * @returns 
 */
const runScript = async (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  });
};

const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 加载子应用
 * @param {*} host 
 * @param {*} globalVar 
 * @returns 
 */
const loadApp = (host, globalVar, bundle) => {
  return async () => {
    await getManifest(`${host}/asset-manifest.json`, bundle, host)
    // await runScript(`${host}/js/chunk-vendors.js`)
    // await runScript(`${host}/js/app.js`)Z
    return window[globalVar]
  }
}

/**
 * @description 加载子应用使用
 * @param {*} url stats-webpack-plugin插件生成的manifest文件
 * @param {*} bundle
 * @param {*} host 子应用host+port
 */
const getManifest = async (url, bundle, host) => {
  const { data } = await axios.get(url);
  const { entrypoints } = data;
  let assets = []
  if (Array.isArray(entrypoints)) {
    assets = entrypoints
  } else {
    assets = entrypoints[bundle].assets
    assets = assets.map(obj => {
      if (isObject(obj)) {
        return obj.name
      }
      return obj
    })
  }

  for (let i = 0; i < assets.length; i++) {
    await runScript(`${host}/${assets[i]}`)
  }
}

AppConfig.forEach(app => {
  // 注册微服务（子应用）
  registerApplication({
    name: app.projectName,
    app: loadApp(app.host, app.projectName, app.bundle),
    activeWhen: app.activeWhen,
    customProps: app.customProps
  })
})

// registerApplication( //注册微前端服务
//     'singleVue',
//     async () => {
//         const HOST = 'http://localhost:9001'
//         await getManifest(`${HOST}/asset-manifest.json`, 'app', HOST)
//         return window.singleVue;
//     },
//     location => location.pathname.startsWith('/vue') // 配置前缀
// );

// registerApplication( //注册微前端服务
//     'singleVue2',
//     async () => {
//         const HOST = 'http://localhost:9002'
//         await getManifest(`${HOST}/asset-manifest.json`, 'app', HOST)
//         return window.singleVue2;
//     },
//     location => location.pathname.startsWith('/vue2') // 配置前缀
// );

// registerApplication( //注册微前端服务
//     'react',
//     async () => {
//         const HOST = 'http://localhost:9003'
//         await getManifest(`${HOST}/asset-manifest.json`, '', HOST)
//         return window.react;
//     },
//     location => location.pathname.startsWith('/react') // 配置前缀
// );



start(); // 启动
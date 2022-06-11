import { registerApplication, start } from 'single-spa' //导入single-spa
import axios from 'axios'
import AppConfig from './appConfig'

/**
 * @name 加载异步js
 * @description 一个promise同步方法。可以代替创建一个script标签，然后加载服务
 * @param {*} url
 * @returns
 */
const runScript = async (url: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = (res) => {
      resolve(res)
    }
    script.onerror = (err) => {
      console.log(err)
      reject()
    }
    const firstScript: HTMLElement = document.getElementsByTagName('script')[0]
    firstScript?.parentNode?.insertBefore(script, firstScript)
  })
}

const isObject = (obj: object) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 加载子应用
 * @param {*} host
 * @param {*} globalVar
 * @returns
 */
const loadApp = (host: string, globalVar: string, bundle: string) => {
  return async () => {
    await getManifest(`${host}/asset-manifest.json`, bundle, host)
    return (window as any)[globalVar]
  }
}

/**
 * @description 加载子应用
 * @param {*} url stats-webpack-plugin或者webpack-manifest-plugin插件生成的manifest文件
 * @param {*} bundle
 * @param {*} host 子应用host+port
 */
const getManifest = async (url: string, bundle: string, host: string) => {
  const { data } = await axios.get(url)
  const { entrypoints } = data
  let assets = []
  if (Array.isArray(entrypoints)) {
    assets = entrypoints
  } else {
    assets = entrypoints[bundle].assets
    assets = assets.map((obj: any) => {
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

AppConfig.forEach((app) => {
  // 注册微服务（子应用）
  registerApplication({
    name: app.projectName,
    app: loadApp(app.host, app.projectName, app.bundle), // 子应用为umd包，挂载在window下
    activeWhen: app.activeWhen, // 当url匹配时展示子应用
    customProps: app.customProps
  })
})

start() // 启动

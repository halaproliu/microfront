/**
 * 加载模块
 * @param {*} scope 服务名
 * @param {*} module 子应用导出模块路径
 */
export const loadComponent = (scope, module) => {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");

    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}
// 加载 打包好后得 js 文件
export const useDynamicScript = (url) => {
  return new Promise((resolve, reject) => {
    const element = document.createElement("script")
    element.src = url
    element.type = "text/javascript"
    element.async = true
    element.onload = () => {
      resolve(true)
    }
    element.onerror = () => {
      reject(false)
    }
    document.head.appendChild(element)
  })
}
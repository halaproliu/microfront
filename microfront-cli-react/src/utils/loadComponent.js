const useDynamicScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script)
  })
}

const loadComponent = (scope, module) => {
  return async () => {
    // 初始化共享作用域。使用此版本和所有远程提供的已知模块填充它
    await __webpack_init_sharing__('default')
    const container = window[scope] // 或者到别的地方去拿容器
    // 初始化容器，它可以提供共享模块
    await container.init(__webpack_share_scopes__.default)
    const factory = await window[scope].get(module)
    const Module = factory()
    return Module
  }
}

export {
  useDynamicScript,
  loadComponent
}
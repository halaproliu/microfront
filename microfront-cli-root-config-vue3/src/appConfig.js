const apps = [{
  host: 'http://localhost:9001',
  projectName: 'singleVue',
  activeWhen: location => location.pathname.startsWith('/vue'),
  customProps: {},
  bundle: 'app'
}, {
  host: 'http://localhost:9002',
  projectName: 'singleVue2',
  activeWhen: location => location.pathname.startsWith('/vue2'),
  customProps: {},
  bundle: 'app'
}, {
  host: 'http://localhost:9003',
  projectName: 'singleReact',
  activeWhen: location => location.pathname.startsWith('/react'),
  customProps: {},
  bundle: 'main'
}]

export default apps
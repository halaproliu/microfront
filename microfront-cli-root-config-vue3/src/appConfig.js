import EventBusService from './libs/rxjs'

export const EventBus = new EventBusService()

const apps = [{
  host: 'http://localhost:9001',
  projectName: 'singleVue',
  activeWhen: location => location.pathname.startsWith('/vue'),
  customProps: { EventBus },
  bundle: 'app'
}, {
  host: 'http://localhost:9002',
  projectName: 'singleVue2',
  activeWhen: location => location.pathname.startsWith('/vue2'),
  customProps: { EventBus },
  bundle: 'app'
}, {
  host: 'http://localhost:9003',
  projectName: 'singleReact',
  activeWhen: location => location.pathname.startsWith('/react'),
  customProps: { EventBus },
  bundle: 'main'
}]

export default apps
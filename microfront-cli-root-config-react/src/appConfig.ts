import EventBusService from './libs/rxjs'

export const EventBus = new EventBusService()

const type = 'history'

const activeWhen = (location: any, key: string) => {
  if (type === 'history') {
    return location.pathname.startsWith(key)
  } else {
    return location.hash.startsWith(`#${key}`)
  }
}
const apps = [
  {
    host: 'http://localhost:9001',
    projectName: 'singleVue',
    activeWhen: (location: any) => activeWhen(location, '/vue'),
    customProps: { EventBus },
    bundle: 'app'
  },
  {
    host: 'http://localhost:9002',
    projectName: 'singleVue2',
    activeWhen: (location: any) => activeWhen(location, '/vue2'),
    customProps: { EventBus },
    bundle: 'app'
  },
  {
    host: 'http://localhost:9003',
    projectName: 'singleReact',
    activeWhen: (location: any) => activeWhen(location, '/react'),
    customProps: { EventBus },
    bundle: 'main'
  }
]

export default apps

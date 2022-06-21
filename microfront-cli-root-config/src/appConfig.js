import EventBusService from './libs/rxjs'

export const EventBus = new EventBusService()

const type = 'history'
const isPrd = process.env.NODE_ENV === 'production'

const activeWhen = (location, key) => {
  if (type === 'history') {
    return location.pathname.startsWith(key)
  } else {
    return location.hash.startsWith(`#${key}`)
  }
}
const getHost = (port) => {
  return isPrd ? `http://124.223.2.144:${port}` : `http://localhost:${port}`
}
const apps = [
  {
    host: getHost(9001),
    projectName: 'singleVue',
    activeWhen: (location) => activeWhen(location, '/vue'),
    customProps: { EventBus },
    bundle: 'app'
  },
  {
    host: getHost(9002),
    projectName: 'singleVue2',
    activeWhen: (location) => activeWhen(location, '/vue2'),
    customProps: { EventBus },
    bundle: 'app'
  },
  {
    host: getHost(9003),
    projectName: 'singleReact',
    activeWhen: (location) => activeWhen(location, '/react'),
    customProps: { EventBus },
    bundle: 'main'
  }
]

export default apps

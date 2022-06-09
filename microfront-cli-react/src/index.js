import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import singleSpaReact from 'single-spa-react';

function rootComponent () {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

if (!window.singleSpaNavigate) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(rootComponent());
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: rootComponent,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  renderType: 'createRoot',
  domElementGetter: () => document.getElementById('singleReact')
})

let el
export const bootstrap = async props => {
  el = document.getElementById('singleReact')
  el.classList.add('application-wrappers')
  return lifecycles.bootstrap(props)
}

export const mount = async props => {
  window.requestAnimationFrame(() => el.classList.add('application-mounting'))
  return lifecycles.mount(props)
}

export const unmount = async props => {
  el.classList.remove('application-mounting')
  return lifecycles.unmount(props)
}
// export const bootstrap = [lifecycles.bootstrap]
// export const mount = [lifecycles.mount]
// export const unmount = [lifecycles.unmount]

// export const { bootstrap, mount, unmount } = lifecycles;
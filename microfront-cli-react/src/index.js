import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import singleSpaReact from 'single-spa-react';

function rootComponent () {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
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
  rootComponent: App,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  domElementGetter: () => document.getElementById('react-app')
})

export const bootstrap = [lifecycles.bootstrap]
export const mount = [lifecycles.mount]
export const unmount = [lifecycles.unmount]

// export const { bootstrap, mount, unmount } = lifecycles;
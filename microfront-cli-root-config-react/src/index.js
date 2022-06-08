import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './single-spa-config'

const rootComponent = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(rootComponent())
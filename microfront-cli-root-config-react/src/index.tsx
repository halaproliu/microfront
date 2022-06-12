import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './single-spa-config'

const runApp = (): void => {
  const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
  root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  )
}

runApp()

if ((module as any).hot) {
  (module as any).hot.accept('./App', () => {
    runApp()
  })
}
import React, { useContext, useEffect } from "react"
import { SingleSpaContext } from 'single-spa-react'
import './App.css';

// const MyButton = React.lazy(() => import('commonUtils/MyButton'))
function App() {
  const ctx = useContext(SingleSpaContext)
  useEffect(() => {
    ctx?.EventBus?.on('msgFromRoot', data => {
      console.log(data)
    })
  }, [ctx])
  return (
    <div className="App">
      react
      <React.Suspense fallback="loading">
        {/* <MyButton></MyButton> */}
      </React.Suspense>
    </div>
  );
}

export default App;

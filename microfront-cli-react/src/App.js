import React from "react"
import './App.css';

// const MyButton = React.lazy(() => import('commonUtils/MyButton'))
function App() {
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

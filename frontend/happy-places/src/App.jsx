import { useState } from 'react'
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
// import { Switch } from "react-router-dom";
// https://stackoverflow.com/questions/69843615/switch-is-not-exported-from-react-router-dom
// https://reactrouter.com/en/6.9.0/upgrading/v5#upgrade-all-switch-elements-to-routes
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      hallo Super locations
    </>
  )
}

export default App

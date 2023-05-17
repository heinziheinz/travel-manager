import React, { useState } from 'react'
import AppContext from './AppContext';
export const LogginInContext = React.createContext();
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn)
  return (
    < LogginInContext.Provider value={{ loggedIn, setLoggedIn }}>
      <AppContext />
    </ LogginInContext.Provider>
  )
}

export default App

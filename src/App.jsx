import React from 'react'
import Game from './pages/Game'
import {BrowserRouter,Router,Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='' element={<Signup/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/Game' element={<Game/>}></Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App

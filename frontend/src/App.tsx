import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import SignIn from './components/SignIn'
import Dash from './components/Dash'
import Home from './components/Home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
           <Route path='/signup' element={<Signup/>}></Route>
           <Route path='/signin' element={<SignIn/>}></Route>
           <Route path='/dash' element={<Dash></Dash>}></Route>
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App

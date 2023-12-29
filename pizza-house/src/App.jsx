import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pizzas from './Pizzas'
import Cart from './Cart'
import AdminPanel from './AdminPanel'
import Login from './Login'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' ></Route>
        <Route path='/pizzas' element={<Pizzas/>}>Pizzas</Route>
        <Route path='/cart' element={<Cart/>}>Cart</Route>
        <Route path='/admin panel' element={<AdminPanel/>}>AdminPanel</Route>
        <Route path='/login' element={<Login/>}>Login</Route>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

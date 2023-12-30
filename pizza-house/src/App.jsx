import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pizzas from './Pizzas';
import Cart from './Cart';
import AdminPanel from './AdminPanel';
import Login from './Login';
import PizzaShow from './PizzaShow';
import ValidateOrder from './ValidateOrder';
function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' ></Route>
        <Route path='/pizzas' element={<Pizzas/>}>Pizzas</Route>
        <Route path='/pizzas/:id' element={<PizzaShow/>}>Pizza detail</Route>
        <Route path='/checkout' element={<ValidateOrder/>}>Checkout</Route>

        <Route path='/cart' element={<Cart/>}>Cart</Route>
        <Route path='/admin panel' element={<AdminPanel/>}>AdminPanel</Route>
        <Route path='/login' element={<Login/>}>Login</Route>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

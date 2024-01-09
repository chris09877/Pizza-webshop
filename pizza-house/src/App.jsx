import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Homepng from './assets/pizza-house.png';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pizzas from './Pizzas';
import Cart from './Cart';
import AdminPanel from './AdminPanel';
import Home from './Home.jsx';
import Login from './Login';
import PizzaShow from './PizzaShow';
import ValidateOrder from './ValidateOrder';
import OrderShow from './OrderShow.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoutes';
import Navbar from "./components/NavBar";

function App() {

  return (
    <div>
      <AuthProvider>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/pizzas' element={<Pizzas />}>Pizzas</Route>
            <Route path='/pizzas/:id' element={<PizzaShow />}>Pizza detail</Route>
            <Route path='/checkout' element={<ValidateOrder />}>Checkout</Route>
            {/* <Route path='/cart' element={<Cart/>}>Cart</Route> */}

            <Route element={<ProtectedRoute />}>
              <Route path='/cart' element={<Cart />}>Cart</Route>
              <Route path='/admin panel' element={<AdminPanel />}>AdminPanel</Route>
              <Route path='/order/:id' element={<OrderShow />} />
              {/*RAJOUTE ROUTE POUR SPECIFIC ORER*/}
            </Route>
            {/* <ProtectedRoute path="/" element={<Cart />} /> */}

            {/* <ProtectedRoute exact path="/cart" component={<Cart/>} /> */}
            <Route path='/login' element={<Login />}>Login</Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </div>
  )
}

export default App

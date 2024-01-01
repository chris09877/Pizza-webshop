import React from 'react';
import { Routes, Route, NavLink, BrowserRouter } from 'react-router-dom';
import Pizzas from '../Pizzas';
import PizzaShow from '../PizzaShow';
import ValidateOrder from '../ValidateOrder';
import Cart from '../Cart';
import AdminPanel from '../AdminPanel';
import OrderShow from '../OrderShow';
import Login from '../Login';
import ProtectedRoute from './ProtectedRoutes'; // Import your ProtectedRoute component
import { AuthProvider } from './AuthContext'; // Assuming the AuthProvider is available

const Navbar = () => {
  // Check if token exists in cookies or local storage
  const tokenExists = localStorage.getItem('token') || document.cookie.includes('token');

  return (
    <div>
      {/* <AuthProvider>
        <BrowserRouter> */}
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/pizzas">Pizzas</NavLink>
              </li>
              <li>
                <NavLink to="/checkout">Checkout</NavLink>
              </li>
              {tokenExists && (
                <>
                  <li>
                    <NavLink to="/cart">Cart</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin panel">Admin Panel</NavLink>
                  </li>
                  {/* Add more protected routes as needed */}
                </>
              )}
              {!tokenExists && (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
            </ul>
          </nav>
{/* 
          <Routes>
            {/* <Route path="/" element={<Home />} /> 
            <Route path="/pizzas" element={<Pizzas />} />
            <Route path="/pizzas/:id" element={<PizzaShow />} />
            <Route path="/checkout" element={<ValidateOrder />} />
            {!tokenExists && <Route path="/login" element={<Login />} />}
            
            {tokenExists && (
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/order/:id" element={<OrderShow />} />
              </Route>
            )}
          </Routes>
        </BrowserRouter>
      </AuthProvider> */}
    </div>
  );
};

export default Navbar;

import React from 'react';
import { Routes, Route, NavLink, BrowserRouter } from 'react-router-dom';
import Pizzas from '../Pizzas';
import PizzaShow from '../PizzaShow';
import ValidateOrder from '../ValidateOrder';
import Cart from '../Cart';
import AdminPanel from '../AdminPanel';
import OrderShow from '../OrderShow';
import Login from '../Login';
import ProtectedRoute from './ProtectedRoutes';
import { AuthProvider } from './AuthContext';
import LogoutBtn from './LogoutBtn';
const Navbar = () => {
  // Check if token exists in cookies or local storage
  const tokenExists = localStorage.getItem('token');// || document.cookie.includes('token');

  return (

    <div className="flex justify-center">

      <nav >
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/" className="text-blue-500 hover:text-blue-700">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pizzas" className="text-blue-500 hover:text-blue-700">Menu</NavLink>
          </li>
          <li>
            <NavLink to="/checkout" className="text-blue-500 hover:text-blue-700">Checkout</NavLink>
          </li>
          {tokenExists && (
            <>

              <li>
                <NavLink to="/admin panel" className="text-blue-500 hover:text-blue-700">Admin Panel</NavLink>
              </li>
              <div>
                <LogoutBtn />
              </div>
            </>
          )}
          {tokenExists === null && (
            <div >
              <button className="flex justify-end ml-10">
                <NavLink to="/login" className="text-blue-500 hover:text-blue-700 ">Login</NavLink>
              </button>
            </div>
          )}
        </ul>

      </nav>


    </div>
  );
};

export default Navbar;

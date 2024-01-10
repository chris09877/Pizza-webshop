import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Homepng from './assets/pizza-house.png';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pizzas from './Pizzas';
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
  console.log(localStorage.getItem('token'));
  console.log(document.cookie.includes('token'));
  return (

    <div className="min-h-screen flex flex-col items-center">
      <Navbar className="w-full" />

      <div className="flex-grow flex items-center justify-center">
        <img
          src="../public/pizza-house.png"
          alt="pizza-house home"
          className="rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
        />
      </div>
    </div>

  )
}

export default App

import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import {useAuth}  from './components/AuthContext.jsx';
// import { useAuth } from '../dist/components/AuthContext.js';
// const useAuth = require('../dist/components/AuthContext.js');
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from "../config";
import Cookies from 'js-cookie';

const Login = () => {
//   const history = useHistory();
  const { setAuthInfo } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

const redirect =()=>{
    
            navigate('/admin panel');
}
  const handleLogin = async () => {
    try {
        console.log(`${config.apiUrl}}/users/login`);
        console.log(credentials);
        const response = await axios.post(`${config.apiUrl}/users/login`,
        {
            headers: {
            //   "Content-Type": "application/json",
             credentials,
            },
            // body: JSON.stringify({ credentials }),
            credentials: "include",
          }
        );
        // .then(response => {
        //     const token = response.data.token;
        //     setAuthInfo({ token: {token}, isAuthenticated: true });
        //     redirect();

        // });
       
            const token = response.data.token;
             setAuthInfo({ token: {token}, isAuthenticated: true });
             Cookies.set("token", token, { expires: 1 })
             window.location = '/admin panel';
             //redirect();
            //  console.log("navigate");
            //  let navigate = useNavigate();
            //  navigate('/pizzas');
        
        
    } catch (error) {
        console.log(error);
    }
    
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    // <div>
    //   <h2>Login</h2>
    //   <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
    //     <input
    //       type="text"
    //       placeholder="Username"
    //       name="username"
    //       value={credentials.username}
    //       onChange={handleChange}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       name="password"
    //       value={credentials.password}
    //       onChange={handleChange}
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>

    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="flex flex-col space-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          className="p-3 border rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          className="p-3 border rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="py-3 px-6 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

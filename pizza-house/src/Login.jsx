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
             redirect();
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
    <div>
      <h2>Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

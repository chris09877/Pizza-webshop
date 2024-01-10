import React, { createContext, useState, useContext } from 'react';


//CREATING AUTH CONTEXT
export const AuthContext = createContext();

//AUTH PROVIDE WILL KEEP TRACK OF THE AUTH CONTEXT AND PROVIDE IT TO HANDLE WHAT NEEDS TO BE HANLE ACCORDING SITUATION
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token') || null,
    isAuthenticated: localStorage.getItem('token') ? true : false,
  });

  const setAuthInfo = ({ token, isAuthenticated }) => {
    if (isAuthenticated) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    setAuthState({ token, isAuthenticated });
  };

  const logout = () => {
    console.log(localStorage.getItem('token'));
    setAuthInfo({ token: null, isAuthenticated: false });
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//AUTH CONTEXT TO MANGAE THE STATE OF THE AUTH CONTEXT THROUGH THE APP
export const useAuth = () => {
  return useContext(AuthContext);
};

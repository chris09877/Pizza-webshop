import React from 'react';
import { useAuth } from './AuthContext';

const LogoutBtn = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location = '/';

  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutBtn;

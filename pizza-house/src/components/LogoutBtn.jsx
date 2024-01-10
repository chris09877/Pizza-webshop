import React from 'react';
import { useAuth } from './AuthContext'; // Update with the correct path to your AuthContext

const LogoutBtn = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location = '/';

    // Call the logout function from the AuthContext
    // Optionally, you can redirect the user to the login page or perform any other action after logout
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutBtn;

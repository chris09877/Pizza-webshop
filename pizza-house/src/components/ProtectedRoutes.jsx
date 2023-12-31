// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const ProtectedRoute = ({component: Component, ...rest }) => {
//   const { authState } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         authState.isAuthenticated ? (
//           <element {...props} />
//         ) : (
//           <Navigate to="/login" />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;


// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const ProtectedRoute = ({ element, ...props }) => {
//   // Your logic to check if the route is protected goes here
//   const { authState } = useAuth();

//   // If the user is authenticated, render the provided element (component)
//   // If not, redirect the user to a login page or another route
//   return  authState.isAuthenticated ? (
//     <Route {...props} element={element} />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default ProtectedRoute;

import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";
// import { useAuth } from './AuthContext';
// const { authState } = useAuth();

const ProtectedRoute = () => {
//   return authState.isAuthenticated ? <Outlet /> : <Navigate to={"/"} />;

  let auth = localStorage.getItem('token');
  let cook = Cookies.get('token');
   console.log(cook);
console.log(JSON.stringify(auth));
  return auth ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;


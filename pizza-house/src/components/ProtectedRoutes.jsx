import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";


const ProtectedRoute = () => {

  let auth = localStorage.getItem('token');
  let cook = Cookies.get('token');
  console.log(cook);
  console.log(JSON.stringify(auth));
  return auth ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;


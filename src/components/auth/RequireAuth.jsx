import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ children }) => {
  const accessToken = Cookies.get("accessToken");
  return accessToken ? children : <Navigate to="/auth/login" replace />;
};

export default RequireAuth;

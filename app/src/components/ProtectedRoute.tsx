import { Navigate, Outlet } from "react-router-dom";
import useStore from "../store";

const ProtectedRoute = () => {
  const { isAuthenticated } = useStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

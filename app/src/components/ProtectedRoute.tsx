import { Navigate, Outlet } from "react-router-dom";
import useStore from "../store";

const ProtectedRoute = () => {
  const { accessToken } = useStore();

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

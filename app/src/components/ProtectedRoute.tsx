import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../store/authSlice";

const ProtectedRoute = () => {
  const accessToken = useSelector(selectAccessToken);

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

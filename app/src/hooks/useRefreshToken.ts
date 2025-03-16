import axios from "../config/axios.config";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    const { data } = await axios.get("/refresh");
    dispatch(loginUser({ accessToken: data.accessToken, userId: data._id }));
    console.log("Access token refreshed");
    return data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;

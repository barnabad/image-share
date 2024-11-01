import useStore from "../store";
import axios from "../config/axios.config";

const useRefreshToken = () => {
  const { authUser } = useStore();

  const refresh = async () => {
    const res = await axios.get("/refresh");
    authUser(res.data.accessToken, res.data._id);
    console.log("Access token refreshed");
    return res.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;

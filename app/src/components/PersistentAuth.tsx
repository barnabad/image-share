import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useStore from "../store";
import { Outlet } from "react-router-dom";

const PersistentAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { accessToken } = useStore();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`access token: ${accessToken}`);
  }, [isLoading]);

  return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>;
};

export default PersistentAuth;

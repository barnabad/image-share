import { useEffect } from "react";
import useStore from "../store";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../config/axios.config";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { accessToken } = useStore();

  useEffect(() => {
    const responseIntercept = axiosPrivate.interceptors.response.use(
      // On response fulfilled: return response
      (res) => res,
      // On response reject: handle error
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;

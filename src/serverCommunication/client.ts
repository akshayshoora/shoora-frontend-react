import axios from "axios";
import { setUserId, setUserToken } from "utils/localStorage";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  responseType: "json",
});

client.interceptors.request.use(
  function (config: any) {
    const token = localStorage.getItem("token");
    // const { data } = config;
    // console.log(config);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      setUserId("");
      setUserToken("");
      //window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default client;

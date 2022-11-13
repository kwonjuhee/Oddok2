/* eslint-disable no-param-reassign */
import axios from "axios";
import { getNewToken } from "./auth/auth-api";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({
  timeout: 30000,
  header: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  async (res) => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
    return res.data;
  },
  async (error) => {
    const { config, response } = error;
    if (response.status === 401 && response.data.message === "로그인이 되어 있지 않습니다.") {
      await getNewToken();
      return axiosInstance.request(config);
    }
    throw new Error(error.response.data.massage, error.response.status);
  },
);

export default axiosInstance;

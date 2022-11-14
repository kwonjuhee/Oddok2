import axios from "axios";
import { getNewToken } from "./auth/auth-api";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  timeout: 30000,
  header: {
    "Content-Type": "application/json",
  },
});

let isTokenReissuing = false;
let tokenReissueSubsribers = [];

const subscribe = (callback) => {
  tokenReissueSubsribers.push(callback);
};

const unsubscribeAll = () => {
  tokenReissueSubsribers = [];
};

const onTokenReissued = () => {
  tokenReissueSubsribers.forEach((callback) => callback());
};

const handleTokenReissue = async (config) => {
  try {
    const retryOriginalRequest = new Promise((resolve) => {
      subscribe(() => {
        resolve(axiosInstance.request(config));
      });
    });

    if (!isTokenReissuing) {
      isTokenReissuing = true;
      await getNewToken();
      isTokenReissuing = false;

      onTokenReissued();
      unsubscribeAll();
    }

    return retryOriginalRequest;
  } catch (error) {
    return Promise.reject(error);
  }
};

axiosInstance.interceptors.response.use(
  async (res) => res.data,
  async (error) => {
    const { config, response } = error;

    if (response.status === 401 && response.data.message === "로그인이 되어 있지 않습니다.") {
      // eslint-disable-next-line no-return-await
      return await handleTokenReissue(config);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

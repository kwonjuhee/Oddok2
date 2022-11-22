/* eslint-disable no-use-before-define */
import axios from "axios";
import { kakaoConfig } from "@api/auth/kakao";
import axiosInstance from "@api/axios-config";

const JWT_EXPIRY_TIME = 6 * 3600 * 1000; // JWT AccessToken 만료시간 (6시간)

const formUrlEncoded = (x) => Object.keys(x).reduce((p, c) => `${p}&${c}=${encodeURIComponent(x[c])}`, "");

export const getKakaoToken = (code) =>
  axios.post(
    "https://kauth.kakao.com/oauth/token",
    formUrlEncoded({
      grant_type: "authorization_code",
      client_id: kakaoConfig.clientId,
      redirect_uri: kakaoConfig.redirectURL,
      code,
      client_secret: kakaoConfig.clientSecret,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

export const getAuthToken = (token) => axios.get(`/auth?token=${token}`, { withCredentials: true });

export const login = async (code) => {
  const tokens = await getKakaoToken(code);
  const response = await getAuthToken(tokens.data.access_token);
  onLoginSuccess(response);
};

export const getNewToken = async () => {
  const response = await axios.get("/auth/refresh", {
    withCredentials: true,
  });
  onLoginSuccess(response);
};

const onLoginSuccess = (response) => {
  const accessToken = response.data.accessToken;
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`; // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정

  setTimeout(getNewToken, JWT_EXPIRY_TIME - 60000); // 토큰 만료되기 1분 전에 새로운 토큰 발급 요청
};

export const logout = () => axiosInstance.get("/auth/logout");

export const deleteAccount = () => axiosInstance.get("/auth/leave");

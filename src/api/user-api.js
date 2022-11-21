import axiosInstance from "./axios-config";

export const getNickname = () => axiosInstance({ url: "/user/nickname" });

export const editNickname = (nickname) => axiosInstance({ url: "/user/nickname", data: { nickname } }, {});

export const getUserInfo = () => axiosInstance({ url: "/user/info" });

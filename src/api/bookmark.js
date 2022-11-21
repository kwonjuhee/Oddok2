import axiosInstance from "./axios-config";

export const getBookmark = () => axiosInstance({ url: "/bookmark" });

export const saveBookmark = (roomId) => axiosInstance({ url: `/bookmark/${roomId}`, method: "POST" });

export const removeBookmark = () => axiosInstance({ url: "/bookmark", method: "DELETE" });

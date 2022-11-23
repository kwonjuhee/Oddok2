import axiosInstance from "./axios-config";

export const getPopluarHashtag = (name) =>
  axiosInstance({
    url: "/hashtag/popular",
    params: { name } /** 값이 null인 경우 params에서 제외된다. */,
  });

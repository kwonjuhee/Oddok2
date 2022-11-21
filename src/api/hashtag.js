import axiosInstance from "./axios-config";

export const getPopluarHashtag = (studyroomName) =>
  axiosInstance({
    url: "/hashtag/popular",
    params: { studyroomName } /** 값이 null인 경우 params에서 제외된다. */,
  });

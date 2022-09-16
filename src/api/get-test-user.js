/* eslint-disable import/prefer-default-export */
import axiosInstance from "./axios-config";

export const getTestUser = async () => {
  const response = await axiosInstance({
    url: "/study-room/user-create",
  });
  return response;
};

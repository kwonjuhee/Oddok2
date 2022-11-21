import axiosInstance from "./axios-config";

export const getProfile = () =>
  axiosInstance({
    url: "/profile",
  });

export const getTimeRecordList = (date) =>
  axiosInstance({
    url: "/time-record",
    params: { date },
  });

export const getMyRoom = () =>
  axiosInstance({
    url: "/user/my-study-room",
  });

export const createProfile = (data) =>
  axiosInstance({
    url: "/profile",
    method: "POST",
    data,
  });

export const updateProfile = (data) =>
  axiosInstance({
    url: "/profile",
    method: "PUT",
    data,
  });

export const deleteStudyRoom = (roomId) =>
  axiosInstance({
    url: `/study-room/${roomId}`,
    method: "DELETE",
  });

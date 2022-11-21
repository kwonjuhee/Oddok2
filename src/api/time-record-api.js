import axiosInstance from "./axios-config";

export const saveTime = async (timeInfo) =>
  axiosInstance({
    url: "/time-record",
    method: "POST",
    data: { timeInfo },
  });

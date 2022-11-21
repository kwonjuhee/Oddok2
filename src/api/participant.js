import axiosInstance from "./axios-config";

export const getTotalParticipant = () => axiosInstance({ url: "/participant/count" });

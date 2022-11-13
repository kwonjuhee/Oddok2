import axios from "axios";
import axiosInstance from "@api/axios-config";

export const createStudyRoom = async (roomInfo) => {
  const response = await axiosInstance({
    url: "/study-room",
    method: "POST",
    data: roomInfo,
  });
  return response;
};

export const joinStudyRoom = async (roomId) => {
  const response = await axiosInstance({
    url: `/study-room/join/${roomId}`,
  });
  return response;
};

export const startStudyRoom = async (roomInfo) => {
  const { id } = await createStudyRoom(roomInfo);
  const { token } = await joinStudyRoom(id);
  return { id, token };
};

export const updateStudyRoom = async (roomId, newRoomInfo) => {
  const response = await axiosInstance({
    url: `/study-room/${roomId}`,
    method: "PUT",
    data: newRoomInfo,
  });
  return response;
};

export const leaveStudyRoom = async (roomId) => {
  const response = await axiosInstance({
    url: `/study-room/leave/${roomId}`,
  });
  return response;
};

export const getStudyRoom = async (roomId) => {
  const response = await axiosInstance({
    url: `/study-room/${roomId}`,
  });
  return response;
};

export const getStudyRoomList = async (searchParams, page) => {
  const response = await axios.get("/study-room", {
    params: {
      sort: searchParams.get("sort"),
      isPublic: searchParams.get("isPublic"),
      category: searchParams.get("category"),
      name: searchParams.get("name"),
      hashtag: searchParams.get("hashtag"),
      page,
    },
  });
  return response.data;
};

export const checkPassword = async (roomId, password) => {
  const response = await axiosInstance.post(`/study-room/check/${roomId}`, {
    password,
  });
  return response;
};

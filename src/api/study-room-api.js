import axiosInstance from "@api/axios-config";

export const createStudyRoom = (roomInfo) =>
  axiosInstance({
    url: "/study-room",
    method: "POST",
    data: roomInfo,
  });

export const joinStudyRoom = (roomId) =>
  axiosInstance({
    url: `/study-room/join/${roomId}`,
  });

export const startStudyRoom = async (roomInfo) => {
  const { id } = await createStudyRoom(roomInfo);
  const { token } = await joinStudyRoom(id);
  return { id, token };
};

export const updateStudyRoom = (roomId, newRoomInfo) =>
  axiosInstance({
    url: `/study-room/${roomId}`,
    method: "PUT",
    data: newRoomInfo,
  });

export const leaveStudyRoom = (roomId) =>
  axiosInstance({
    url: `/study-room/leave/${roomId}`,
  });

export const getStudyRoom = (roomId) =>
  axiosInstance({
    url: `/study-room/${roomId}`,
  });

export const getStudyRoomList = (searchParams, page) =>
  axiosInstance.get("/study-room", {
    params: {
      sort: searchParams.get("sort"),
      isPublic: searchParams.get("isPublic"),
      category: searchParams.get("category"),
      name: searchParams.get("name"),
      hashtag: searchParams.get("hashtag"),
      page,
    },
  });

export const checkPassword = (roomId, password) =>
  axiosInstance({
    url: `/study-room/check/${roomId}`,
    method: "POST",
    data: { password },
  });

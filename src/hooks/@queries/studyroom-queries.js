import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getStudyRoom,
  getStudyRoomList,
  createStudyRoom,
  joinStudyRoom,
  updateStudyRoom,
  leaveStudyRoom,
  checkPassword,
} from "@api/study-room-api";
import { useToast } from "@hooks/useToast";
import { useLoading } from "@hooks/useLoading";
import { useHandleError } from "@hooks/useHandleError";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@utils/constants/messages";

export const useStudyRoomQuery = (studyroomId) => {
  const { isLoading, data } = useQuery({
    queryKey: ["studyroomInfo", studyroomId],
    queryFn: () => getStudyRoom(studyroomId),
  });

  return {
    isLoading,
    studyroomData: data ?? {},
  };
};

export const useStudyRoomList = (searchParams, tagFilter) => {
  const {
    isLoading,
    data: studyroomListData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "studyroomList",
      {
        sort: searchParams.get("sort"),
        isPublic: searchParams.get("isPublic"),
        category: searchParams.get("category"),
        name: searchParams.get("name"),
        hashtag: searchParams.get("hashtag"),
      },
    ],
    queryFn: ({ pageParam = 0 }) => getStudyRoomList(searchParams, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.flatMap((e) => e).length < 16 ? undefined : Math.ceil(allPages.flatMap((e) => e).length / 16),
    select: (data) => data.pages.flatMap((e) => e),
  });

  return {
    isLoading: isLoading || isFetchingNextPage,
    studyroomListData:
      (tagFilter.length > 0
        ? studyroomListData.filter(({ hashtags }) => tagFilter.every((e) => hashtags.includes(e)))
        : studyroomListData) ?? [],
    fetchNextPage,
    hasNextPage,
  };
};

export const useCreateStudyRoom = () => {
  const { showLoading, hideLoading } = useLoading();
  const { setError } = useHandleError();

  return useMutation({
    mutationFn: async (roomInfo) => {
      const { id } = await createStudyRoom(roomInfo);
      const { token } = await joinStudyRoom(id);
      return { id, token };
    },
    onMutate: () => {
      showLoading();
    },
    onSettled: () => {
      hideLoading();
    },
    onError: (error) => {
      setError(error);
    },
  });
};

export const useJoinStudyRoom = () => {
  const { showLoading, hideLoading } = useLoading();
  const { setError } = useHandleError();

  return useMutation({
    mutationFn: (roomId) => joinStudyRoom(roomId),
    onMutate: () => {
      showLoading();
    },
    onSettled: () => {
      hideLoading();
    },
    onError: (error) => {
      setError(error);
    },
  });
};

export const useUpdateStudyRoom = () => {
  const queryClient = useQueryClient();
  const { displayToast } = useToast();

  return useMutation({
    mutationFn: ({ roomId, newRoomInfo }) => updateStudyRoom(roomId, newRoomInfo),
    onSuccess: (newRoomInfo, { roomId }) => {
      queryClient.setQueryData(["studyroomInfo", roomId], newRoomInfo);
      displayToast({ message: SUCCESS_MESSAGES.STUDYROOM_EDIT });
    },
    onError: () => {
      displayToast({ message: ERROR_MESSAGES.COMMON });
    },
  });
};

export const useLeaveStudyRoom = () => {
  const { setError } = useHandleError();

  return useMutation({
    mutationFn: (roomId) => leaveStudyRoom(roomId),
    onError: (error) => {
      setError(error);
    },
  });
};

export const useCheckStudyRoomPassword = (roomId) =>
  useMutation({
    mutationFn: (enteredPassword) => checkPassword(roomId, enteredPassword),
  });

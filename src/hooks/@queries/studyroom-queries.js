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
import { useSetRecoilState } from "recoil";
import { errorState } from "@recoil/error-state";
import { loadingState } from "@recoil/loading-state";

export const useStudyRoomQuery = (studyroomId) => {
  const { isLoading, data } = useQuery({
    queryKey: ["studyroomInfo", studyroomId],
    queryFn: () => getStudyRoom(studyroomId),
    staleTime: 30000,
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
  const setIsLoading = useSetRecoilState(loadingState);
  const setError = useSetRecoilState(errorState);

  return useMutation({
    mutationFn: async (roomInfo) => {
      const { id } = await createStudyRoom(roomInfo);
      const { token } = await joinStudyRoom(id);
      return { id, token };
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onError: (error) => {
      setError(error);
    },
  });
};

export const useJoinStudyRoom = () => {
  const setIsLoading = useSetRecoilState(loadingState);
  const setError = useSetRecoilState(errorState);

  return useMutation({
    mutationFn: (roomId) => joinStudyRoom(roomId),
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onError: (error) => {
      setError(error);
    },
  });
};

export const useUpdateStudyRoom = (studyroomId) => {
  const queryClient = useQueryClient();
  const setError = useSetRecoilState(errorState);

  return useMutation({
    mutationFn: ({ roomId, newRoomInfo }) => updateStudyRoom(roomId, newRoomInfo),
    onSuccess: (newRoomInfo) => {
      queryClient.setQueryData(["studyroomInfo", studyroomId], newRoomInfo);
    },
    onError: (error) => {
      setError(error);
    },
  });
};

export const useLeaveStudyRoom = () => {
  const setError = useSetRecoilState(errorState);

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

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { getBookmark, saveBookmark, removeBookmark } from "@api/bookmark-api";
import { useToast } from "@hooks/useToast";
import { ERROR_MESSAGES } from "@utils/constants/messages";

export const useBookmarkQuery = () => {
  const { isLogin } = useRecoilValue(userState);

  const { isLoading, data: bookmarkData } = useQuery({
    queryKey: ["bookmark"],
    queryFn: getBookmark,
    enabled: !!isLogin,
    select: (data) =>
      data
        ? {
            ...data,
            participant: data.participant.map((e) => ({
              ...e,
              joinTime: e.joinTime.split(/[T, .]/)[1],
            })),
          }
        : null,
  });

  return { isLoading, bookmarkData };
};

export const useAddBookmark = () => {
  const queryClient = useQueryClient();
  const { displayToast } = useToast();

  return useMutation({
    mutationFn: saveBookmark,
    onMutate: async (newBookmark) => {
      const prevBookmark = queryClient.getQueryData(["bookmark"]);
      queryClient.setQueryData(["bookmark"], newBookmark);

      return { prevBookmark };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bookmark"]);
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["bookmark"], context.prevBookmark);
      displayToast({ message: ERROR_MESSAGES.COMMON });
    },
  });
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();
  const { displayToast } = useToast();

  return useMutation({
    mutationFn: removeBookmark,
    onMutate: async () => {
      const prevBookmark = queryClient.getQueryData(["bookmark"]);
      queryClient.setQueryData(["bookmark"], null);

      return { prevBookmark };
    },
    onSuccess: () => {
      queryClient.setQueryData(["bookmark"], null);
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["bookmark"], context.prevBookmark);
      displayToast({ message: ERROR_MESSAGES.COMMON });
    },
  });
};

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
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: saveBookmark,
    onSuccess: () => {
      queryclient.invalidateQueries(["bookmark"]);
    },
  });
};

export const useDeleteBookmark = () => {
  const queryclient = useQueryClient();
  const { displayToast } = useToast();

  return useMutation({
    mutationFn: removeBookmark,
    onSuccess: () => {
      queryclient.setQueryData(["bookmark"], null);
    },
    onError: () => {
      displayToast({ message: ERROR_MESSAGES.COMMON });
    },
  });
};

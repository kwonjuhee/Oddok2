import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { getBookmark } from "@api/bookmark-api";

export const useBookmarkQuery = () => {
  const { isLogin } = useRecoilValue(userState);

  const { isLoading, data: bookmarkData } = useQuery({
    queryKey: ["bookmark"],
    queryFn: getBookmark,
    staleTime: 30000,
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

import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPopluarHashtag } from "@api/hashtag-api";

export const useGetPopularHashtag = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const studyroomName = searchParams.get("name");

  const { data: popularHashtagList, isLoading } = useQuery({
    queryKey: ["popularHashtagList", studyroomName],
    queryFn: () => getPopluarHashtag(studyroomName),
  });

  return { popularHashtagList, isLoading };
};

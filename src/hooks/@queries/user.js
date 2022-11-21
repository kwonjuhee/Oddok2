import { useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user";
import { errorState } from "@recoil/error";
import { getUserInfo } from "@api/user";
import { login, logout } from "@api/auth/auth";

export const useFetchUserInfo = () => {
  const { isLogin } = useRecoilValue(userState);

  const { data } = useQuery(["userInfo"], getUserInfo, {
    refetchOnWindowFocus: false,
    staleTime: 600000,
    enabled: !!isLogin,
  });

  return {
    isLogin,
    userId: data?.id,
    nickname: data?.nickname,
  };
};

export const useOAuthLogin = () => {
  const [user, setUserState] = useRecoilState(userState);
  const setError = useSetRecoilState(errorState);

  return useMutation({
    mutationFn: (authCode) => login(authCode),
    onSuccess: () => {
      localStorage.setItem("isLogin", true);
      setUserState({ ...user, isLogin: JSON.parse(localStorage.getItem("isLogin")) });
    },
    onError: (error) => {
      setError(error);
    },
  });
};

export const useOAuthLogout = () => {
  const [user, setUserState] = useRecoilState(userState);
  const setError = useSetRecoilState(errorState);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.setItem("isLogin", false);
      setUserState({ ...user, isLogin: JSON.parse(localStorage.getItem("isLogin")) });
    },
    onError: (error) => {
      setError(error);
    },
  });
};

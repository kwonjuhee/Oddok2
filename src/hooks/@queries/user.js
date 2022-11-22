import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "@recoil/user";
import { getUserInfo, editNickname } from "@api/user";
import { login, logout } from "@api/auth/auth";
import { useToast } from "@hooks/useToast";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "@utils/constants/messages";

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

export const useEditNickname = () => {
  const queryClient = useQueryClient();
  const { displayToast } = useToast();

  return useMutation({
    mutationFn: (nickname) => editNickname(nickname),
    onSuccess: () => {
      displayToast({ message: SUCCESS_MESSAGES.NICKNAME_EDIT });
      queryClient.invalidateQueries(["userInfo"]);
    },
    onError: () => {
      displayToast({ message: ERROR_MESSAGES.COMMON });
    },
  });
};

export const useOAuthLogin = () => {
  const navigate = useNavigate();
  const [user, setUserState] = useRecoilState(userState);
  const { displayToast } = useToast();

  return useMutation({
    mutationFn: (authCode) => login(authCode),
    onSuccess: () => {
      localStorage.setItem("isLogin", true);
      setUserState({ ...user, isLogin: JSON.parse(localStorage.getItem("isLogin")) });
    },
    onError: () => {
      navigate("/login", { replace: true });
      displayToast({ message: ERROR_MESSAGES.LOGIN, duration: 5000 });
    },
  });
};

export const useOAuthLogout = () => {
  const navigate = useNavigate();
  const [user, setUserState] = useRecoilState(userState);
  const { displayToast } = useToast();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.setItem("isLogin", false);
      setUserState({ ...user, isLogin: JSON.parse(localStorage.getItem("isLogin")) });
    },
    onError: () => {
      navigate("/", { replace: true });
      displayToast({ message: ERROR_MESSAGES.LOGOUT, duration: 5000 });
    },
  });
};

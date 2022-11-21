import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Modal, Loading } from "@components/@commons";
import { deleteAccount } from "@api/auth/auth";
import useAsync from "@hooks/useAsync";
import { userState } from "@recoil/user";
import { errorState } from "@recoil/error";

function AccountDeleteModal({ onClose }) {
  const [user, setUserState] = useRecoilState(userState);
  const setError = useSetRecoilState(errorState);

  const { loading: isLoading, request: onDeleteAccount } = useAsync({
    requestFn: deleteAccount,
    onSuccess: () => {
      localStorage.setItem("isLogin", false);
      setUserState({ ...user, isLogin: JSON.parse(localStorage.getItem("isLogin")) });
      window.location.replace("/");
    },
    onError: (error) => setError(error),
  });

  return (
    <>
      <Modal title="계정 삭제" onClose={onClose} onAction={{ text: "삭제하기", action: onDeleteAccount }}>
        ODDOK 계정을 삭제하시겠습니까?
      </Modal>
      {isLoading && <Loading />}
    </>
  );
}

export default AccountDeleteModal;
